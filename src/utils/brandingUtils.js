/**
 * Branding Configuration Utilities
 *
 * Helper functions for managing SLIM branding configuration.
 * These utilities provide a clean interface for accessing branding
 * settings from the Docusaurus configuration.
 */

/**
 * Get branding configuration with sensible defaults
 * @param {Object} siteConfig - Docusaurus site configuration
 * @returns {Object} Branding configuration helpers
 */
export const getBrandingConfig = (siteConfig) => {
  const brandingConfig = siteConfig.customFields?.brandingConfig || {};

  return {
    // Project Identity (use standard Docusaurus fields)
    getProjectName: () => siteConfig.title,
    getTagline: () => brandingConfig.hero?.customTagline || siteConfig.tagline,

    // Visual Assets
    getLogoPath: () => brandingConfig.logoPath || "/img/logo.svg",
    getFaviconPath: () => siteConfig.favicon || "/img/favicon.ico",

    // Hero Section Configuration
    shouldShowCorners: () => brandingConfig.hero?.showCornerFeatures !== false,
    getCornerFeatures: () => {
      const features = brandingConfig.hero?.cornerFeatures || getDefaultCornerFeatures();
      return features.filter(f => f.enabled !== false);
    },

    // Marketplace Configuration
    shouldShowEmptyState: () => brandingConfig.marketplace?.showEmptyState !== false,

    // External registries are handled by siteConfig.customFields.slimConfig.registries
    getExternalRegistries: () => siteConfig.customFields?.slimConfig?.registries?.filter(url => url.startsWith('http')) || [],

    // Organization Details (use standard Docusaurus fields)
    getOrganizationName: () => siteConfig.organizationName,
    getProjectRepoName: () => siteConfig.projectName,
    getBaseUrl: () => siteConfig.baseUrl,
    getSiteUrl: () => siteConfig.url,
  };
};

/**
 * Default corner features configuration
 * @returns {Array} Default corner features
 */
export const getDefaultCornerFeatures = () => [
  {
    position: "top-left",
    icon: "ai-centric.png",
    text: "AI-powered automation for instant best practice infusion",
    enabled: true
  },
  {
    position: "bottom-left",
    icon: "community.svg",
    text: "Made by the community for the community",
    enabled: true
  },
  {
    position: "top-right",
    icon: "iterative.svg",
    text: "Fully open source and free of charge",
    enabled: true
  },
  {
    position: "bottom-right",
    icon: "scope.svg",
    text: "Skills, agents, and MCP servers for governance, lifecycle, and communication",
    enabled: true
  }
];

/**
 * Update external registries in slimConfig
 * @param {Object} existingConfig - Current Docusaurus configuration
 * @param {Array} newRegistries - Array of registry URLs
 * @returns {Object} Updated configuration
 */
export const updateExternalRegistries = (existingConfig, newRegistries) => {
  const localRegistries = existingConfig.customFields?.slimConfig?.registries?.filter(url => !url.startsWith('http')) || [];

  return {
    ...existingConfig,
    customFields: {
      ...existingConfig.customFields,
      slimConfig: {
        ...existingConfig.customFields?.slimConfig,
        registries: [...localRegistries, ...newRegistries]
      }
    }
  };
};

/**
 * Apply branding configuration to Docusaurus config
 * Updates both standard Docusaurus fields and custom brandingConfig
 *
 * @param {Object} existingConfig - Current Docusaurus configuration
 * @param {Object} newBranding - New branding settings
 * @returns {Object} Updated configuration
 */
export const applyBrandingToConfig = (existingConfig, newBranding) => {
  return {
    ...existingConfig,

    // Update standard Docusaurus fields (don't duplicate in brandingConfig)
    title: newBranding.projectName || existingConfig.title,
    tagline: newBranding.tagline || existingConfig.tagline,
    url: newBranding.url || existingConfig.url,
    baseUrl: newBranding.baseUrl || existingConfig.baseUrl,
    organizationName: newBranding.organizationName || existingConfig.organizationName,
    projectName: newBranding.repoName || existingConfig.projectName,

    // Update brandingConfig for additional customizations
    customFields: {
      ...existingConfig.customFields,
      brandingConfig: {
        ...existingConfig.customFields?.brandingConfig,

        // Visual Assets
        logoPath: newBranding.logoPath,

        // Hero Section
        hero: {
          ...existingConfig.customFields?.brandingConfig?.hero,
          showCornerFeatures: newBranding.showCornerFeatures,
          cornerFeatures: newBranding.cornerFeatures,
          customTagline: newBranding.heroTagline
        },

        // Marketplace
        marketplace: {
          ...existingConfig.customFields?.brandingConfig?.marketplace,
          showEmptyState: newBranding.showEmptyState
          // Note: External registries are handled via slimConfig.registries
        }
      }
    }
  };
};

/**
 * Validate branding configuration
 * @param {Object} brandingConfig - Configuration to validate
 * @returns {Object} Validation result with errors array
 */
export const validateBrandingConfig = (brandingConfig) => {
  const errors = [];

  // Validate logo path
  if (brandingConfig.logoPath && typeof brandingConfig.logoPath !== 'string') {
    errors.push('logoPath must be a string');
  }

  // Validate hero configuration
  if (brandingConfig.hero) {
    if (brandingConfig.hero.showCornerFeatures !== undefined &&
        typeof brandingConfig.hero.showCornerFeatures !== 'boolean') {
      errors.push('hero.showCornerFeatures must be a boolean');
    }

    if (brandingConfig.hero.cornerFeatures && !Array.isArray(brandingConfig.hero.cornerFeatures)) {
      errors.push('hero.cornerFeatures must be an array');
    }

    // Validate individual corner features
    if (Array.isArray(brandingConfig.hero.cornerFeatures)) {
      brandingConfig.hero.cornerFeatures.forEach((feature, index) => {
        if (!feature.position || !['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(feature.position)) {
          errors.push(`hero.cornerFeatures[${index}].position must be one of: top-left, top-right, bottom-left, bottom-right`);
        }
        if (!feature.icon || typeof feature.icon !== 'string') {
          errors.push(`hero.cornerFeatures[${index}].icon is required and must be a string`);
        }
        if (!feature.text || typeof feature.text !== 'string') {
          errors.push(`hero.cornerFeatures[${index}].text is required and must be a string`);
        }
      });
    }
  }

  // Validate marketplace configuration
  if (brandingConfig.marketplace) {
    if (brandingConfig.marketplace.showEmptyState !== undefined &&
        typeof brandingConfig.marketplace.showEmptyState !== 'boolean') {
      errors.push('marketplace.showEmptyState must be a boolean');
    }

    // Note: External registries are validated as part of slimConfig.registries
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate minimal brandingConfig for migration
 * Helps existing projects add basic configuration
 * @returns {Object} Minimal brandingConfig
 */
export const generateMinimalBrandingConfig = () => ({
  logoPath: "/img/logo.svg",
  hero: {
    showCornerFeatures: true,
    cornerFeatures: getDefaultCornerFeatures(),
    customTagline: null
  },
  marketplace: {
    showEmptyState: true
  }
});