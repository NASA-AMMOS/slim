/**
 * File Browser Component for SLIM Marketplace
 * Displays an expandable tree view of files and directories within skills/MCP servers
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import FileTreeNode from './FileTreeNode';
import FileViewerModal from './FileViewerModal';

const FileBrowser = ({ itemType = 'skill', itemName, basePath }) => {
  const [fileTree, setFileTree] = useState(null);
  const [expandedDirs, setExpandedDirs] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // File viewer modal state
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Build file tree structure from centralized manifest
  const buildFileTree = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the centralized marketplace manifest
      const manifestResponse = await fetch('/slim/data/marketplace-files.json');

      if (!manifestResponse.ok) {
        throw new Error('Unable to load marketplace file index.');
      }

      const allManifests = await manifestResponse.json();

      // Determine the correct category and get the item's manifest
      const category = itemType === 'skill' ? 'skills' : 'mcp-servers';
      const itemManifest = allManifests[category]?.[itemName];

      if (!itemManifest) {
        throw new Error(`File listing not available for this ${itemType}.`);
      }

      // Add full paths to all nodes in the tree
      const baseUrl = `/slim/marketplace/${category}/${itemName}`;

      const addFullPaths = (node) => {
        // Construct the full path for this node
        const fullPath = node.path
          ? `${baseUrl}/${node.path}`
          : baseUrl;

        return {
          ...node,
          fullPath,
          children: node.children
            ? node.children.map(child => addFullPaths(child))
            : undefined
        };
      };

      const treeWithPaths = addFullPaths(itemManifest);
      setFileTree(treeWithPaths);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [itemType, itemName]);

  // Load file tree on component mount
  useEffect(() => {
    if (itemName) {
      buildFileTree();
    }
  }, [itemName, buildFileTree]);

  // Handle directory expansion/collapse
  const handleExpand = useCallback((dirPath, isExpanded) => {
    const newExpandedDirs = new Set(expandedDirs);

    if (isExpanded) {
      // Collapse directory
      newExpandedDirs.delete(dirPath);
    } else {
      // Expand directory
      newExpandedDirs.add(dirPath);
    }

    setExpandedDirs(newExpandedDirs);
  }, [expandedDirs]);

  // Handle file selection
  const handleFileClick = useCallback((filePath, fileName) => {
    setSelectedFile({ path: filePath, name: fileName });
    setShowFileModal(true);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
        <span className="ms-2">Loading files...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <Alert variant="warning" className="mb-3">
        <Alert.Heading>Unable to load file structure</Alert.Heading>
        <p>{error}</p>
        <p>Files may still be accessible via direct links.</p>
        <Button
          variant="outline-warning"
          size="sm"
          onClick={() => window.open(`/slim/marketplace/${itemType}s/${itemName}/${itemType.toUpperCase()}.md`, '_blank')}
        >
          View Main Documentation
        </Button>
      </Alert>
    );
  }

  // Render file tree
  if (!fileTree || !fileTree.children || fileTree.children.length === 0) {
    return (
      <Alert variant="info" className="mb-3">
        <small>No files found for this {itemType}.</small>
      </Alert>
    );
  }

  return (
    <>
      <div
        className="file-browser"
        style={{
          backgroundColor: 'var(--ifm-code-background)',
          borderRadius: '6px',
          border: '1px solid var(--ifm-toc-border-color)',
          padding: '0.75rem',
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      >
        <ListGroup variant="flush">
          {fileTree.children.map((node, index) => (
            <FileTreeNode
              key={`${node.name}-${index}`}
              node={node}
              level={0}
              onExpand={handleExpand}
              onFileClick={handleFileClick}
              isExpanded={expandedDirs.has(node.fullPath || node.path)}
              expandedDirs={expandedDirs}
            />
          ))}
        </ListGroup>
      </div>

      {/* File Viewer Modal */}
      <FileViewerModal
        show={showFileModal}
        onHide={() => setShowFileModal(false)}
        filePath={selectedFile?.path}
        fileName={selectedFile?.name}
      />
    </>
  );
};

export default FileBrowser;