/**
 * React Hook for Branding Configuration
 *
 * Custom hook that provides easy access to branding configuration
 * throughout the application. Uses Docusaurus context to access
 * the site configuration and returns branding helpers.
 */

import { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getBrandingConfig } from '../utils/brandingUtils';

/**
 * Hook to access branding configuration
 * @returns {Object} Branding configuration helpers
 */
export const useBrandingConfig = () => {
  const { siteConfig } = useDocusaurusContext();

  // Memoize the branding config to avoid unnecessary recalculations
  const brandingConfig = useMemo(() => {
    return getBrandingConfig(siteConfig);
  }, [siteConfig]);

  return brandingConfig;
};

export default useBrandingConfig;