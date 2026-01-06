/**
 * File Browser Section Component
 * Wrapper component for integrating the file browser into SkillCard panels
 * Controlled by parent component's state
 */

import React from 'react';
import FileBrowser from './FileBrowser';

const FileBrowserSection = ({ skill, isOpen }) => {
  // Determine the item type for the file browser
  const itemType = skill?.type === 'mcp' ? 'mcp-server' : 'skill';

  // Don't render if we don't have the required skill info or if not open
  if (!skill?.name || !skill?.type || !isOpen) {
    return null;
  }

  return (
    <div>
      <FileBrowser
        itemType={skill.type}
        itemName={skill.name}
        basePath={`/slim/marketplace/${itemType}s/${skill.name}`}
      />
    </div>
  );
};

export default FileBrowserSection;