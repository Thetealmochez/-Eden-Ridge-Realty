
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbNavProps {
  customPaths?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ customPaths, className = "" }) => {
  const location = useLocation();
  
  // Generate breadcrumb paths from URL if no custom paths provided
  const generatePaths = () => {
    if (customPaths) return customPaths;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const paths = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable format
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Handle special cases
      if (segment === 'properties') {
        label = 'Properties';
      } else if (segment === 'property') {
        label = 'Property';
      } else if (segment === 'locations') {
        label = 'Locations';
      } else if (segment === 'agent') {
        label = 'Agent';
      } else if (segment === 'about') {
        label = 'About Us';
      } else if (segment === 'contact') {
        label = 'Contact';
      } else if (segment === 'services') {
        label = 'Services';
      } else if (segment === 'blog') {
        label = 'Blog';
      }
      
      // For the last segment, don't include href (it's the current page)
      const isLast = index === pathSegments.length - 1;
      paths.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });
    
    return paths;
  };
  
  const paths = generatePaths();
  
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {path.href ? (
                <BreadcrumbLink asChild>
                  <Link 
                    to={path.href} 
                    className="flex items-center text-luxury-slate hover:text-luxury-navy transition-colors"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {path.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-luxury-navy font-medium flex items-center">
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {path.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
