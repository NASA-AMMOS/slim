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

  // Handle external-only entries
  if (skill.external_only) {
    return (
      <div
        className="p-3 text-center"
        style={{
          backgroundColor: "var(--ifm-background-surface-color)",
          borderRadius: "6px",
          border: "1px solid var(--ifm-toc-border-color)",
        }}
      >
        <div className="mb-3">
          <span style={{ fontSize: "2rem" }}>🔗</span>
        </div>
        <h6 className="mb-2" style={{ color: "var(--ifm-heading-color)" }}>
          External Resource
        </h6>
        <p className="mb-3 text-muted" style={{ fontSize: "0.9rem" }}>
          This {skill.type === 'mcp' ? 'MCP server' : skill.type} is hosted externally.
          View the source code and documentation at the official repository.
        </p>
        {skill.repository?.url && (
          <a
            href={skill.repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
            style={{ fontSize: "0.85rem" }}
          >
            📂 View Repository
          </a>
        )}
      </div>
    );
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