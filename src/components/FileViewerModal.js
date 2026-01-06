/**
 * File Viewer Modal Component
 * Modal for displaying file contents with syntax highlighting and copy functionality
 */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FileViewerModal = ({ show, onHide, filePath, fileName }) => {
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [copied, setCopied] = useState(false);

  // Determine file type and language for syntax highlighting
  const getFileInfo = (fileName) => {
    if (!fileName) return { extension: '', contentType: 'text', language: 'text' };

    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    let contentType = 'text';
    let language = 'text';

    // Determine content type and language for syntax highlighting
    switch (extension) {
      case 'md':
      case 'markdown':
        contentType = 'text';
        language = 'markdown';
        break;
      case 'js':
      case 'mjs':
        contentType = 'text';
        language = 'javascript';
        break;
      case 'jsx':
        contentType = 'text';
        language = 'jsx';
        break;
      case 'ts':
        contentType = 'text';
        language = 'typescript';
        break;
      case 'tsx':
        contentType = 'text';
        language = 'tsx';
        break;
      case 'py':
        contentType = 'text';
        language = 'python';
        break;
      case 'json':
        contentType = 'text';
        language = 'json';
        break;
      case 'yml':
      case 'yaml':
        contentType = 'text';
        language = 'yaml';
        break;
      case 'toml':
        contentType = 'text';
        language = 'toml';
        break;
      case 'xml':
        contentType = 'text';
        language = 'xml';
        break;
      case 'html':
        contentType = 'text';
        language = 'html';
        break;
      case 'css':
        contentType = 'text';
        language = 'css';
        break;
      case 'scss':
      case 'sass':
        contentType = 'text';
        language = 'scss';
        break;
      case 'sh':
      case 'bash':
        contentType = 'text';
        language = 'bash';
        break;
      case 'rb':
        contentType = 'text';
        language = 'ruby';
        break;
      case 'go':
        contentType = 'text';
        language = 'go';
        break;
      case 'rs':
        contentType = 'text';
        language = 'rust';
        break;
      case 'java':
        contentType = 'text';
        language = 'java';
        break;
      case 'c':
        contentType = 'text';
        language = 'c';
        break;
      case 'cpp':
      case 'cc':
      case 'cxx':
        contentType = 'text';
        language = 'cpp';
        break;
      case 'cs':
        contentType = 'text';
        language = 'csharp';
        break;
      case 'php':
        contentType = 'text';
        language = 'php';
        break;
      case 'sql':
        contentType = 'text';
        language = 'sql';
        break;
      case 'dockerfile':
        contentType = 'text';
        language = 'dockerfile';
        break;
      case 'txt':
      case 'log':
        contentType = 'text';
        language = 'text';
        break;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        contentType = 'image';
        break;
      case 'pdf':
        contentType = 'pdf';
        break;
      default:
        contentType = 'text';
        language = 'text';
    }

    return { extension, contentType, language };
  };

  // Load file content when modal opens
  useEffect(() => {
    if (show && filePath && fileName) {
      loadFileContent();
    }
  }, [show, filePath, fileName]);

  // Reset state when modal closes
  useEffect(() => {
    if (!show) {
      setFileContent('');
      setError(null);
      setFileSize(null);
      setCopied(false);
    }
  }, [show]);

  const loadFileContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Get file size from response headers
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        setFileSize(parseInt(contentLength));
      }

      // Check if file is too large (>500KB)
      if (contentLength && parseInt(contentLength) > 500000) {
        throw new Error('File too large to display (>500KB). Download to view.');
      }

      const content = await response.text();
      setFileContent(content);

      // If it's a JSON file, try to format it
      if (fileName.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          setFileContent(JSON.stringify(parsed, null, 2));
        } catch (e) {
          // Keep original content if JSON parsing fails
        }
      }

    } catch (err) {
      setError(err.message);
      setFileContent(`Error loading file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Copy content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download file
  const downloadFile = () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const fileInfo = getFileInfo(fileName);

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: 'var(--ifm-background-color)',
          color: 'var(--ifm-heading-color)'
        }}
      >
        <Modal.Title className="d-flex align-items-center gap-2">
          <span>{fileName}</span>
          {fileSize && (
            <Badge bg="light" text="muted" style={{ fontSize: '0.7rem' }}>
              {formatFileSize(fileSize)}
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          minHeight: '400px'
        }}
      >
        {loading ? (
          <div className="text-center p-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="mt-2">Loading file content...</div>
          </div>
        ) : error ? (
          <Alert variant="danger">
            <Alert.Heading>Error Loading File</Alert.Heading>
            <p>{error}</p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => window.open(filePath, '_blank')}
            >
              Try Direct Link
            </Button>
          </Alert>
        ) : fileInfo.contentType === 'image' ? (
          <div className="text-center">
            <img
              src={filePath}
              alt={fileName}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
              onError={(e) => {
                e.target.style.display = 'none';
                setError('Unable to load image');
              }}
            />
          </div>
        ) : fileInfo.contentType === 'pdf' ? (
          <div className="text-center p-4">
            <Alert variant="info">
              <h6>PDF File</h6>
              <p>PDF files cannot be displayed inline.</p>
              <Button
                variant="primary"
                onClick={() => window.open(filePath, '_blank')}
              >
                Open PDF in New Tab
              </Button>
            </Alert>
          </div>
        ) : (
          <SyntaxHighlighter
            language={fileInfo.language}
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              maxHeight: '500px',
              fontSize: '0.875rem',
              borderRadius: '4px',
              margin: 0
            }}
          >
            {fileContent}
          </SyntaxHighlighter>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: 'var(--ifm-background-color)' }}>
        <Button
          variant="outline-secondary"
          onClick={downloadFile}
          disabled={loading || error || !fileContent}
        >
          📥 Download
        </Button>
        <Button
          variant="primary"
          onClick={copyToClipboard}
          disabled={loading || error || !fileContent}
        >
          {copied ? '✓ Copied' : '📋 Copy Content'}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileViewerModal;