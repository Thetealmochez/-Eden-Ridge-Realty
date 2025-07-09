// Data Retention and Cleanup Policies
import { supabase } from '@/integrations/supabase/client';

export interface RetentionPolicy {
  table: 'leads' | 'properties'; // Use specific table names
  retentionDays: number;
  dateColumn: string;
  conditions?: Record<string, any>;
}

// Data retention policies for different types of data
export const RETENTION_POLICIES: RetentionPolicy[] = [
  {
    table: 'leads',
    retentionDays: 365 * 2, // Keep leads for 2 years
    dateColumn: 'created_at',
    conditions: { status: 'completed' }
  },
  // Add more retention policies as needed
];

class DataRetentionManager {
  // Clean up old data based on retention policies
  async cleanupOldData(): Promise<void> {
    for (const policy of RETENTION_POLICIES) {
      try {
        await this.applyRetentionPolicy(policy);
      } catch (error) {
        console.error(`Failed to apply retention policy for ${policy.table}:`, error);
      }
    }
  }

  private async applyRetentionPolicy(policy: RetentionPolicy): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - policy.retentionDays);

    try {
      // For leads table specifically
      if (policy.table === 'leads') {
        let query = supabase
          .from('leads')
          .delete()
          .lt(policy.dateColumn, cutoffDate.toISOString());

        // Apply additional conditions if specified  
        if (policy.conditions?.status) {
          query = query.eq('status', policy.conditions.status);
        }

        const { error } = await query;
        if (error) throw error;
      }
      // Add other table handling as needed
    } catch (error) {
      throw error;
    }
  }

  // Archive old data instead of deleting (for compliance)
  async archiveOldData(policy: RetentionPolicy): Promise<void> {
    // This is a simplified version - in production you'd add archive tables
    console.log(`Archive policy for ${policy.table} would be applied here`);
  }

  // Get data retention statistics
  async getRetentionStats(): Promise<{
    table: string;
    totalRecords: number;
    eligibleForCleanup: number;
    oldestRecord: string | null;
  }[]> {
    const stats = [];

    for (const policy of RETENTION_POLICIES) {
      try {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - policy.retentionDays);

        if (policy.table === 'leads') {
          // Get total records for leads
          const { count: totalRecords } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });

          // Get records eligible for cleanup
          let cleanupQuery = supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .lt(policy.dateColumn, cutoffDate.toISOString());

          if (policy.conditions?.status) {
            cleanupQuery = cleanupQuery.eq('status', policy.conditions.status);
          }

          const { count: eligibleForCleanup } = await cleanupQuery;

          // Get oldest record
          const { data: oldestData } = await supabase
            .from('leads')
            .select(policy.dateColumn)
            .order(policy.dateColumn, { ascending: true })
            .limit(1);

          stats.push({
            table: policy.table,
            totalRecords: totalRecords || 0,
            eligibleForCleanup: eligibleForCleanup || 0,
            oldestRecord: oldestData?.[0]?.[policy.dateColumn] || null,
          });
        }
        // Add handling for other tables as needed
      } catch (error) {
        console.error(`Failed to get retention stats for ${policy.table}:`, error);
        stats.push({
          table: policy.table,
          totalRecords: 0,
          eligibleForCleanup: 0,
          oldestRecord: null,
        });
      }
    }

    return stats;
  }
}

export const dataRetentionManager = new DataRetentionManager();

// Run cleanup monthly in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Check if cleanup should run (once per month)
  const lastCleanup = localStorage.getItem('last_data_cleanup');
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  if (!lastCleanup || now - parseInt(lastCleanup) > oneMonth) {
    dataRetentionManager.cleanupOldData().then(() => {
      localStorage.setItem('last_data_cleanup', now.toString());
    });
  }
}