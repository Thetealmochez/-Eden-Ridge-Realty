/**
 * Data Retention and PII Protection Utilities
 * Manages secure handling of personally identifiable information
 */

import { supabase } from '@/integrations/supabase/client';
import { secureLogger } from './secure-logger';

export interface PIIField {
  table: string;
  column: string;
  retentionDays: number;
  isRequired: boolean;
}

export const PII_FIELDS: PIIField[] = [
  { table: 'leads', column: 'email', retentionDays: 730, isRequired: true }, // 2 years
  { table: 'leads', column: 'phone', retentionDays: 730, isRequired: false },
  { table: 'leads', column: 'name', retentionDays: 730, isRequired: true },
  { table: 'leads', column: 'message', retentionDays: 365, isRequired: true }, // 1 year
];

export class DataRetentionManager {
  /**
   * Validate PII data before storage
   */
  static validatePIIData(data: Record<string, any>, tableName: string): {
    isValid: boolean;
    errors: string[];
    sanitizedData: Record<string, any>;
  } {
    const errors: string[] = [];
    const sanitizedData = { ...data };
    const tableFields = PII_FIELDS.filter(field => field.table === tableName);

    for (const field of tableFields) {
      const value = data[field.column];
      
      // Check required fields
      if (field.isRequired && (!value || value.trim() === '')) {
        errors.push(`${field.column} is required`);
        continue;
      }

      // Sanitize and validate specific field types
      if (value) {
        switch (field.column) {
          case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errors.push('Invalid email format');
            } else {
              sanitizedData[field.column] = value.toLowerCase().trim();
            }
            break;
          
          case 'phone':
            // Remove all non-digit characters and validate
            const cleanPhone = value.replace(/\D/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 15) {
              errors.push('Invalid phone number format');
            } else {
              sanitizedData[field.column] = cleanPhone;
            }
            break;
          
          case 'name':
            // Remove potential XSS and limit length
            const cleanName = value.trim().replace(/<[^>]*>/g, '');
            if (cleanName.length < 2 || cleanName.length > 100) {
              errors.push('Name must be between 2 and 100 characters');
            } else {
              sanitizedData[field.column] = cleanName;
            }
            break;
          
          case 'message':
            // Remove potential XSS and limit length
            const cleanMessage = value.trim().replace(/<[^>]*>/g, '');
            if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
              errors.push('Message must be between 10 and 1000 characters');
            } else {
              sanitizedData[field.column] = cleanMessage;
            }
            break;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData,
    };
  }

  /**
   * Log PII access for audit purposes
   */
  static async logPIIAccess(
    tableName: string,
    action: 'read' | 'write' | 'update' | 'delete',
    recordId?: string,
    userId?: string
  ): Promise<void> {
    try {
      secureLogger.info('PII access logged', {
        component: 'DataRetentionManager',
        action: 'logPIIAccess',
        table: tableName,
        operation: action,
        recordId: recordId ? '[REDACTED]' : undefined,
        userId: userId ? '[REDACTED]' : undefined,
        timestamp: new Date().toISOString(),
      });

      // In a real application, you might want to store this in a separate audit table
      // For now, we're using the security monitor
    } catch (error) {
      secureLogger.error('Failed to log PII access', {
        component: 'DataRetentionManager',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Check if data should be retained based on retention policies
   */
  static shouldRetainData(createdAt: string, tableName: string): boolean {
    const tableFields = PII_FIELDS.filter(field => field.table === tableName);
    if (tableFields.length === 0) return true;

    const maxRetentionDays = Math.max(...tableFields.map(field => field.retentionDays));
    const createdDate = new Date(createdAt);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - maxRetentionDays);

    return createdDate > cutoffDate;
  }

  /**
   * Anonymize expired PII data
   */
  static async anonymizeExpiredData(tableName: string): Promise<{
    success: boolean;
    anonymizedCount: number;
    error?: string;
  }> {
    try {
      const tableFields = PII_FIELDS.filter(field => field.table === tableName);
      if (tableFields.length === 0) {
        return { success: true, anonymizedCount: 0 };
      }

      const minRetentionDays = Math.min(...tableFields.map(field => field.retentionDays));
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - minRetentionDays);

      // Find records that need anonymization (only works with 'leads' table for now)
      if (tableName !== 'leads') {
        throw new Error(`Table ${tableName} is not supported for anonymization`);
      }
      
      const { data: expiredRecords, error: fetchError } = await supabase
        .from('leads')
        .select('id, created_at')
        .lt('created_at', cutoffDate.toISOString());

      if (fetchError) {
        throw fetchError;
      }

      if (!expiredRecords || expiredRecords.length === 0) {
        return { success: true, anonymizedCount: 0 };
      }

      // Anonymize the data
      const anonymizedData: Record<string, any> = {};
      for (const field of tableFields) {
        anonymizedData[field.column] = '[ANONYMIZED]';
      }

      const { error: updateError } = await supabase
        .from('leads')
        .update(anonymizedData)
        .in('id', expiredRecords.map(record => record.id));

      if (updateError) {
        throw updateError;
      }

      await this.logPIIAccess(tableName, 'update', undefined, 'system');

      return {
        success: true,
        anonymizedCount: expiredRecords.length,
      };
    } catch (error) {
      secureLogger.error('Failed to anonymize expired data', {
        component: 'DataRetentionManager',
        table: tableName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return {
        success: false,
        anonymizedCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const dataRetention = DataRetentionManager;