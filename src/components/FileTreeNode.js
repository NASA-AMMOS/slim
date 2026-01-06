/**
 * File Tree Node Component
 * Recursive component for rendering individual files and directories in the file tree
 */

import React from 'react';
import { ListGroup } from 'react-bootstrap';

const FileTreeNode = ({ node, level = 0, onExpand, onFileClick, isExpanded = false, expandedDirs = new Set() }) => {
  // Get file icon based on file extension
  const getFileIcon = (fileName) => {
    if (!fileName) return '📄';

    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap = {
      'md': '📝',
      'txt': '📄',
      'json': '📋',
      'js': '📜',
      'jsx': '📜',
      'ts': '📜',
      'tsx': '📜',
      'py': '🐍',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️',
      'svg': '🖼️',
      'pdf': '📕',
      'yml': '⚙️',
      'yaml': '⚙️',
      'toml': '⚙️',
      'xml': '📋',
      'html': '🌐',
      'css': '🎨',
      'scss': '🎨',
      'env': '🔐',
      'log': '📜',
      'zip': '📦',
      'tar': '📦',
      'gz': '📦'
    };

    return iconMap[ext] || '📄';
  };

  // Get directory icon and expand/collapse indicator
  const getDirectoryIcon = (isExpanded) => {
    return isExpanded ? '📂' : '📁';
  };

  const getExpandIcon = (isExpanded) => {
    return isExpanded ? '▼' : '▶';
  };

  // Handle node click
  const handleNodeClick = () => {
    if (node.type === 'directory') {
      onExpand(node.fullPath || node.path, isExpanded);
    } else {
      onFileClick(node.fullPath || node.path, node.name);
    }
  };

  // Calculate indentation
  const indentationStyle = {
    paddingLeft: `${level * 1.5 + 0.5}rem`
  };

  const isDirectory = node.type === 'directory';

  return (
    <>
      <ListGroup.Item
        action={true}
        onClick={handleNodeClick}
        style={{
          ...indentationStyle,
          border: 'none',
          padding: '0.375rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        className="file-tree-node"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {/* Expand/collapse icon for directories */}
        {isDirectory && (
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--ifm-color-emphasis-600)',
              minWidth: '12px',
              display: 'inline-block'
            }}
          >
            {getExpandIcon(isExpanded)}
          </span>
        )}

        {/* File/directory icon */}
        <span style={{ fontSize: '0.875rem' }}>
          {isDirectory ? getDirectoryIcon(isExpanded) : getFileIcon(node.name)}
        </span>

        {/* File/directory name */}
        <span
          style={{
            color: isDirectory ? 'var(--ifm-color-primary)' : 'var(--ifm-font-color-base)',
            fontWeight: isDirectory ? '500' : '400'
          }}
        >
          {node.name}
        </span>

        {/* File size or item count (if available) */}
        {node.size && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--ifm-color-emphasis-600)',
              marginLeft: 'auto'
            }}
          >
            {formatFileSize(node.size)}
          </span>
        )}

        {isDirectory && node.children && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--ifm-color-emphasis-600)',
              marginLeft: node.size ? '0.5rem' : 'auto'
            }}
          >
            ({node.children.length})
          </span>
        )}
      </ListGroup.Item>

      {/* Render children if directory is expanded */}
      {isDirectory && isExpanded && node.children && node.children.length > 0 && (
        <>
          {node.children.map((childNode, index) => (
            <FileTreeNode
              key={`${childNode.name}-${index}-${level}`}
              node={childNode}
              level={level + 1}
              onExpand={onExpand}
              onFileClick={onFileClick}
              isExpanded={expandedDirs.has(childNode.fullPath || childNode.path)}
              expandedDirs={expandedDirs}
            />
          ))}
        </>
      )}
    </>
  );
};

// Helper function to format file sizes
const formatFileSize = (bytes) => {
  if (!bytes) return '';

  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);

  return `${formattedSize} ${sizes[i]}`;
};

export default FileTreeNode;