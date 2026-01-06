/**
 * SLIM Skills Browser
 * Adapted from aitmpl.com marketplace (MIT License)
 * Enhanced with dual navigation: search + category tree
 * Styled to match SLIM branding
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Badge,
  Button,
  Dropdown,
  ListGroup,
  Modal,
  Nav,
  Tab,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "bootstrap/dist/css/bootstrap.min.css";
import "@site/src/css/markdown-modal.css";
import FileBrowserSection from "./FileBrowserSection";

const SkillCard = ({ skill, onTagClick, isHighlighted, currentFilters }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showInstall, setShowInstall] = useState(false);
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);
  const [installMode, setInstallMode] = useState("claude-code");
  const [copied, setCopied] = useState({
    marketplace: false,
    plugin: false,
    content: false,
    git: false,
    link: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(false);
  const cardRef = React.useRef(null);

  // Scroll to card when highlighted
  useEffect(() => {
    if (isHighlighted && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isHighlighted]);

  // Determine border color based on type
  const getBorderColor = (type) => {
    switch (type) {
      case "agent":
        return "#dc3545"; // red
      case "mcp":
        return "#28a745"; // green
      default:
        return "var(--ifm-color-primary)"; // blue for skills
    }
  };

  // Get type badge properties
  const getTypeBadge = (type) => {
    switch (type) {
      case "mcp":
        return { text: "MCP Server", bg: "success", color: "white" };
      case "agent":
        return { text: "Agent", bg: "danger", color: "white" };
      default:
        return { text: "Skill", bg: "primary", color: "white" };
    }
  };

  // Get local install path
  const getLocalPath = (skill) => {
    // For localhost development, show the actual marketplace path
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      return `/path/to/slim-ai/marketplace/skills/${skill.name}`;
    }
    return `./marketplace/skills/${skill.name}`;
  };

  const copyToClipboard = (text, platform) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [platform]: true });
    setTimeout(() => setCopied({ ...copied, [platform]: false }), 2000);
  };

  const copySkillLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?search=${encodeURIComponent(skill.displayName)}`;
    navigator.clipboard.writeText(url);
    setCopied({ ...copied, link: true });
    setTimeout(() => setCopied({ ...copied, link: false }), 2000);
  };

  // Generate zip download URL for localhost
  const getZipDownloadUrl = (itemName) => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      return `${window.location.origin}/slim/assets/zip/${itemName}.zip`;
    }
    return null;
  };

  // Get install directory path (Claude Code tab vs Manual tab)
  // Only returns Claude-specific paths when explicitly on Claude Code tab
  // For Manual tab, returns generic home directory to support other tools
  const getInstallPath = (item, isClaudeCodeTab = false) => {
    if (isClaudeCodeTab) {
      if (item.type === "skill") {
        return "~/.claude/skills/";
      } else if (item.type === "agent") {
        return "~/.claude/agents/";
      } else if (item.type === "mcp") {
        return "~/.claude/skills/";
      }
    }
    // Default to home directory for flexibility with other tools
    return "~/";
  };

  // Generate Claude Code install command for localhost (single-step with curl)
  const getClaudeCodeInstallCommand = (item) => {
    // For external-only entries, Claude Code can't install them directly
    if (item.external_only) {
      return `# External ${item.type} - install manually using: ${getManualInstallCommand(item)}`;
    }

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      const zipUrl = getZipDownloadUrl(item.name);
      const installPath = getInstallPath(item, true); // Pass true for Claude Code tab

      return `curl -L ${zipUrl} | tar -xf - -C ${installPath}`;
    } else {
      // Deployed: Return dynamically generated plugin install command
      return getClaudeCodeCommand(item);
    }
  };

  // Generate manual install command for localhost
  const getManualInstallCommand = (item) => {
    // For external-only entries, use npm or direct repository instructions
    if (item.external_only) {
      if (item.type === 'mcp' && item.npm_package) {
        return `npm install -g ${item.npm_package}`;
      } else if (item.repository?.url) {
        return `git clone ${item.repository.url}`;
      }
      return `# Visit ${item.repository?.url || 'the official repository'} for installation instructions`;
    }

    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      const zipUrl = getZipDownloadUrl(item.name);
      const defaultPath = getInstallPath(item, false); // Pass false for Manual tab (returns ~/)
      return `curl -L ${zipUrl} | tar -xf - -C ${defaultPath}`;
    } else {
      // Deployed: Return existing git clone command
      return getGitCloneCommand(item);
    }
  };

  // Generate Claude Code slash command dynamically based on type
  const getClaudeCodeCommand = (item) => {
    if (item.type === "skill") {
      // Generate skill install command
      return `/plugin install ${item.name}@slim-marketplace`;
    } else if (item.type === "mcp") {
      // Extract package name from npm_package and generate command
      if (item.npm_package) {
        // Remove scope prefix if present for command
        const pkgName = item.npm_package.replace(/^@[\w-]+\//, '');
        return `/plugin install ${pkgName}@slim-marketplace`;
      }
      // Fallback to name-based command
      return `/plugin install ${item.name}@slim-marketplace`;
    }
    // Default for other types
    return `/plugin install ${item.name}@slim-marketplace`;
  };

  // Generate marketplace command with proper path handling
  const getMarketplaceCommand = (skill) => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      // For localhost, use local path with user-fillable placeholder
      return "/plugin marketplace add [YOUR_SLIM_REPO_PATH]/static/marketplace";
    }

    // For deployed sites, use GitHub command
    return "/plugin marketplace add https://github.com/nasa-ammos/slim/tree/main/static/marketplace";
  };

  // Generate command for manual installation
  const getGitCloneCommand = (item) => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const pathType = item.type === "mcp" ? "mcp-servers" : "skills";

    if (isLocalhost) {
      // For localhost, use local file system path with user-fillable placeholder
      return `cp -r [YOUR_SLIM_REPO_PATH]/static/marketplace/${pathType}/${item.name} ./`;
    } else {
      // For deployed version, use GitHub sparse-checkout
      return `git clone --depth 1 --filter=blob:none --sparse https://github.com/nasa-ammos/slim.git && cd slim && git sparse-checkout set static/marketplace/${pathType}/${item.name}`;
    }
  };

  const copyContentToClipboard = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied({ ...copied, content: true });
    setTimeout(() => setCopied({ ...copied, content: false }), 2000);
  };

  const handleViewInstructions = async () => {
    setShowModal(true);
    setLoading(true);
    try {
      const response = await fetch(skill.skill_file_url);
      if (response.ok) {
        const text = await response.text();
        // Remove YAML frontmatter if present
        const contentWithoutFrontmatter = text.replace(
          /^---\n[\s\S]*?\n---\n/,
          "",
        );
        setMarkdownContent(contentWithoutFrontmatter);
      } else {
        setMarkdownContent("# Error\n\nFailed to load documentation.");
      }
    } catch (error) {
      setMarkdownContent(
        "# Error\n\nFailed to load documentation: " + error.message,
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Card
        ref={cardRef}
        className="mb-4 skill-card"
        style={{
          borderLeft: `8px solid ${getBorderColor(skill.type)}`,
          overflow: "hidden",
          boxShadow: isHighlighted ? "0 0 0 3px var(--ifm-color-primary-light), 0 4px 12px rgba(0,0,0,0.15)" : undefined,
          backgroundColor: isHighlighted ? "var(--ifm-background-surface-color)" : undefined,
          transition: "box-shadow 0.3s ease, background-color 0.3s ease",
        }}
      >
        <Card.Header
          as="h5"
          className="d-flex justify-content-between align-items-center"
          style={{
            backgroundColor: "var(--ifm-background-color)",
            color: "var(--ifm-heading-color)",
            borderBottom: "1px solid var(--ifm-toc-border-color)",
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <span style={{ color: "var(--ifm-heading-color)" }}>
              {skill.displayName}
            </span>
            <Badge
              bg={getTypeBadge(skill.type).bg}
              text={getTypeBadge(skill.type).color}
              style={{ fontSize: "0.65rem", fontWeight: "500" }}
            >
              {getTypeBadge(skill.type).text}
            </Badge>
          </div>
          <Badge
            bg="light"
            text="dark"
            style={{ fontSize: "0.7rem", fontWeight: "normal" }}
          >
            {new Date(skill.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Card.Text
            className="mb-3"
            style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
          >
            {skill.description}
          </Card.Text>

          {/* Action Buttons */}
          <div className="mb-3 d-flex gap-2 flex-wrap">
            <Button
              variant={showInstall ? "primary" : "outline-primary"}
              size="sm"
              onClick={() => setShowInstall(!showInstall)}
              style={{ fontSize: "0.85rem" }}
            >
              📦 Install
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleViewInstructions}
              style={{ fontSize: "0.85rem" }}
            >
              📄 Instructions
            </Button>
            <Button
              variant={showFileBrowser ? "secondary" : "outline-secondary"}
              size="sm"
              onClick={() => setShowFileBrowser(!showFileBrowser)}
              style={{ fontSize: "0.85rem" }}
            >
              📁 Files
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={copySkillLink}
              style={{ fontSize: "0.85rem" }}
              title="Copy link to this skill"
            >
              {copied.link ? "✓ Copied" : "🔗 Copy Link"}
            </Button>
            {(skill.dependencies?.skills?.length > 0 || skill.dependencies?.mcp?.length > 0) && (
              <Button
                variant={showDependencies ? "warning" : "outline-warning"}
                size="sm"
                onClick={() => setShowDependencies(!showDependencies)}
                style={{ fontSize: "0.85rem" }}
              >
                ⚠️ Dependencies
              </Button>
            )}
          </div>

          {/* Install Section */}
          {showInstall && (
            <div
              className="mb-3 p-3"
              style={{
                backgroundColor: "var(--ifm-background-surface-color)",
                borderRadius: "6px",
                border: "1px solid var(--ifm-toc-border-color)",
              }}
            >
              <Tab.Container
                activeKey={installMode}
                onSelect={(k) => setInstallMode(k)}
              >
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link
                    eventKey="claude-code"
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png"
                      alt="Claude AI"
                      width="16"
                      height="16"
                    />
                    Claude Code
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="manual"
                    className="d-flex align-items-center gap-2"
                  >
                    ⚙️ Manual
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="claude-code">
                  {(() => {
                    const isLocalhost =
                      typeof window !== "undefined" &&
                      (window.location.hostname === "localhost" ||
                        window.location.hostname === "127.0.0.1");

                    if (isLocalhost) {
                      // Localhost: Single-step installation via curl
                      return (
                        <div>
                          <small className="text-muted d-block mb-2">
                            <strong>Install this {skill.type} directly:</strong>
                          </small>
                          <div
                            className="p-2 mb-3"
                            style={{
                              backgroundColor: "var(--ifm-code-background)",
                              borderRadius: "4px",
                            }}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <code
                                style={{
                                  fontSize: "0.8rem",
                                  flex: 1,
                                  wordBreak: "break-all",
                                }}
                              >
                                {getClaudeCodeInstallCommand(skill)}
                              </code>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() =>
                                  copyToClipboard(
                                    getClaudeCodeInstallCommand(skill),
                                    "plugin",
                                  )
                                }
                                style={{
                                  fontSize: "0.75rem",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {copied.plugin ? "✓ Copied" : "Copy"}
                              </Button>
                            </div>
                          </div>
                          {skill.example && (
                            <div>
                              <small className="text-muted d-block mb-2">
                                <strong>Example usage:</strong>
                              </small>
                              <div
                                className="p-2"
                                style={{
                                  backgroundColor: "var(--ifm-background-surface-color)",
                                  borderRadius: "4px",
                                  borderLeft: "3px solid var(--ifm-color-primary)",
                                }}
                              >
                                <small style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                                  {skill.example}
                                </small>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Deployed: Two-step marketplace installation
                      return (
                        <>
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">
                              <strong>Step 1:</strong> Add marketplace (one-time
                              setup)
                            </small>
                            <div
                              className="p-2"
                              style={{
                                backgroundColor: "var(--ifm-code-background)",
                                borderRadius: "4px",
                              }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <code
                                  style={{
                                    fontSize: "0.8rem",
                                    flex: 1,
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {getMarketplaceCommand(skill)}
                                </code>
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() =>
                                    copyToClipboard(
                                      getMarketplaceCommand(skill),
                                      "marketplace",
                                    )
                                  }
                                  style={{
                                    fontSize: "0.75rem",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {copied.marketplace ? "✓ Copied" : "Copy"}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">
                              <strong>Step 2:</strong> Install this {skill.type}
                            </small>
                            <div
                              className="p-2"
                              style={{
                                backgroundColor: "var(--ifm-code-background)",
                                borderRadius: "4px",
                              }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <code
                                  style={{
                                    fontSize: "0.8rem",
                                    flex: 1,
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {getClaudeCodeCommand(skill)}
                                </code>
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() =>
                                    copyToClipboard(
                                      getClaudeCodeCommand(skill),
                                      "plugin",
                                    )
                                  }
                                  style={{
                                    fontSize: "0.75rem",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {copied.plugin ? "✓ Copied" : "Copy"}
                                </Button>
                              </div>
                            </div>
                          </div>

                          {skill.example && (
                            <div>
                              <small className="text-muted d-block mb-2">
                                <strong>Step 3: Try it out</strong>
                              </small>
                              <div
                                className="p-2"
                                style={{
                                  backgroundColor: "var(--ifm-background-surface-color)",
                                  borderRadius: "4px",
                                  borderLeft: "3px solid var(--ifm-color-primary)",
                                }}
                              >
                                <small style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                                  {skill.example}
                                </small>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    }
                  })()}
                </Tab.Pane>

                <Tab.Pane eventKey="manual">
                  <div>
                    <small className="text-muted d-block mb-2">
                      <strong>
                        {skill.type === "skill"
                          ? "Download and install:"
                          : "Install globally:"}
                      </strong>
                    </small>
                    <div
                      className="p-2 mb-3"
                      style={{
                        backgroundColor: "var(--ifm-code-background)",
                        borderRadius: "4px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <code
                          style={{
                            fontSize: "0.8rem",
                            flex: 1,
                            wordBreak: "break-all",
                          }}
                        >
                          {getManualInstallCommand(skill)}
                        </code>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() =>
                            copyToClipboard(
                              getManualInstallCommand(skill),
                              "git",
                            )
                          }
                          style={{
                            fontSize: "0.75rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {copied.git ? "✓ Copied" : "Copy"}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <small className="text-muted d-block mb-2">
                        <strong>Example usage:</strong>
                      </small>
                      <ul style={{ fontSize: "0.85rem", marginBottom: 0 }}>
                        <li>Manually review the instructions and follow along</li>
                      </ul>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
          )}

          {/* File Browser Section */}
          <div className="mb-3">
            <FileBrowserSection skill={skill} isOpen={showFileBrowser} />
          </div>

          {/* Dependencies Section */}
          {showDependencies && (skill.dependencies?.skills?.length > 0 || skill.dependencies?.mcp?.length > 0) && (
            <div className="mb-3 p-3" style={{
              backgroundColor: "var(--ifm-background-surface-color)",
              borderRadius: "6px",
              border: "1px solid var(--ifm-color-warning-dark)",
              borderLeft: "4px solid var(--ifm-color-warning)"
            }}>
              <div className="d-flex align-items-start gap-2">
                <span style={{ fontSize: "0.9rem" }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: "0.85rem", color: "var(--ifm-color-warning-darker)" }}>
                    Dependencies Required:
                  </strong>
                  <div className="mt-2 d-flex flex-column gap-2">
                    {skill.dependencies?.skills?.length > 0 && (
                      <div>
                        <small className="text-muted d-block mb-1" style={{ fontSize: "0.75rem" }}>
                          Required Skills:
                        </small>
                        <div className="d-flex gap-2 flex-wrap">
                          {skill.dependencies.skills.map((dep, idx) => {
                            // Find the actual skill to get its displayName
                            const depSkill = window.allMarketplaceItems?.find(item => item.name === dep);
                            const depDisplayName = depSkill?.displayName || dep;
                            return (
                              <Badge
                                key={idx}
                                bg="primary"
                                as="a"
                                href={`${window.location.pathname}?search=${encodeURIComponent(depDisplayName)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
                                  padding: "0.3rem 0.6rem",
                                  cursor: "pointer",
                                  textDecoration: "none"
                                }}
                                title={`Open ${depDisplayName} in new tab`}
                              >
                                {dep} 🔗
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {skill.dependencies?.mcp?.length > 0 && (
                      <div>
                        <small className="text-muted d-block mb-1" style={{ fontSize: "0.75rem" }}>
                          Required MCP Servers:
                        </small>
                        <div className="d-flex gap-2 flex-wrap">
                          {skill.dependencies.mcp.map((dep, idx) => {
                            // Find the actual MCP server to get its displayName
                            const depMcp = window.allMarketplaceItems?.find(item => item.name === dep);
                            const depDisplayName = depMcp?.displayName || dep;
                            return (
                              <Badge
                                key={idx}
                                bg="success"
                                as="a"
                                href={`${window.location.pathname}?search=${encodeURIComponent(depDisplayName)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "0.75rem",
                                  fontWeight: "500",
                                  padding: "0.3rem 0.6rem",
                                  cursor: "pointer",
                                  textDecoration: "none"
                                }}
                                title={`Open ${depDisplayName} in new tab`}
                              >
                                {dep} 🔗
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 d-flex gap-2 align-items-center flex-wrap">
            <Badge
              bg="light"
              text="muted"
              style={{ fontSize: "0.7rem", fontWeight: "500" }}
            >
              {skill.category}
            </Badge>
            {skill.tags.slice(0, 5).map((tag, idx) => (
              <Badge
                key={idx}
                bg="secondary"
                className="me-0"
                style={{
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  fontWeight: "400",
                }}
                onClick={() => onTagClick(tag)}
              >
                {prettifyTag(tag)}
              </Badge>
            ))}
            {skill.tags.length > 5 && (
              <Badge
                bg="light"
                text="muted"
                style={{ fontSize: "0.7rem", fontWeight: "400" }}
              >
                +{skill.tags.length - 5} more
              </Badge>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        scrollable
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "var(--ifm-background-color)",
            color: "var(--ifm-heading-color)",
          }}
        >
          <Modal.Title>{skill.displayName} - Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
          }}
        >
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "var(--ifm-background-color)" }}
        >
          <Button
            variant="primary"
            onClick={copyContentToClipboard}
            disabled={loading}
          >
            {copied.content ? "✓ Copied" : "📋 Copy Content"}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const FilterPills = ({
  selectedType,
  selectedTags,
  onRemoveType,
  onRemoveTag,
}) => {
  const activeFilters = [];

  if (selectedType !== "All") {
    activeFilters.push({
      type: "type",
      value: selectedType,
      label: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
    });
  }

  Object.entries(selectedTags).forEach(([tag, selected]) => {
    if (selected) {
      activeFilters.push({
        type: "tag",
        value: tag,
        label: prettifyTag(tag),
      });
    }
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="mb-3 d-flex gap-2 align-items-center flex-wrap">
      <small className="text-muted" style={{ fontWeight: "500" }}>
        Active filters:
      </small>
      {activeFilters.map((filter, idx) => (
        <Badge
          key={idx}
          bg={filter.type === "type" ? "primary" : "info"}
          className="d-flex align-items-center gap-2"
          style={{
            fontSize: "0.85rem",
            padding: "0.4rem 0.6rem",
            cursor: "pointer",
          }}
          onClick={() =>
            filter.type === "type" ? onRemoveType() : onRemoveTag(filter.value)
          }
        >
          <span>{filter.label}</span>
          <span style={{ fontWeight: "bold" }}>×</span>
        </Badge>
      ))}
    </div>
  );
};

const CategoryTree = ({ items, selectedCategory, onCategorySelect }) => {
  const categoryCounts = useMemo(() => {
    const counts = {};
    items.forEach((item) => {
      const category = item.category;
      if (!counts[category]) counts[category] = 0;
      counts[category]++;
    });
    return counts;
  }, [items]);

  const categoryLabels = {
    governance: "🏛 Governance",
    documentation: "📚 Documentation",
    collaboration: "🤝 Collaboration",
    testing: "✅ Testing",
    security: "🔒 Security",
    integrations: "🔌 Integrations",
    "project-setup": "🛠 Project Setup",
  };

  return (
    <div className="category-tree" style={{ position: "sticky", top: "20px" }}>
      <h6 className="mb-3">Browse by Category</h6>
      <ListGroup>
        <ListGroup.Item
          active={selectedCategory === "All"}
          onClick={() => onCategorySelect("All")}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          All Best Practices ({items.length})
        </ListGroup.Item>
        {Object.entries(categoryCounts)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, count]) => (
            <ListGroup.Item
              key={category}
              active={selectedCategory === category}
              onClick={() => onCategorySelect(category)}
              style={{ cursor: "pointer" }}
            >
              {categoryLabels[category] || prettifyTag(category)} ({count})
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

const SkillBrowser = ({ searchTerm, setSearchTerm, isSearchActive }) => {
  const [allItems, setAllItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedTags, setSelectedTags] = useState({});
  const [allTags, setAllTags] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [baseUrl, setBaseUrl] = useState("https://nasa-ammos.github.io");
  const [localMarketplacePath, setLocalMarketplacePath] = useState("");
  const [highlightedSkill, setHighlightedSkill] = useState(null);

  useEffect(() => {
    // Set base URL from window if available
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);

      // Parse all URL parameters to restore filter state
      const urlParams = new URLSearchParams(window.location.search);

      const searchParam = urlParams.get("search");
      if (searchParam) {
        setSearchTerm(searchParam);
        setHighlightedSkill(searchParam);
      }

      const categoryParam = urlParams.get("category");
      if (categoryParam) {
        setSelectedCategory(categoryParam);
      }

      const typeParam = urlParams.get("type");
      if (typeParam) {
        setSelectedType(typeParam);
      }

      const tagsParam = urlParams.get("tags");
      if (tagsParam) {
        const tagArray = tagsParam.split(",");
        const tagObject = {};
        tagArray.forEach(tag => {
          tagObject[tag] = true;
        });
        setSelectedTags(tagObject);
      }

      const sortParam = urlParams.get("sort");
      if (sortParam) {
        setSortBy(sortParam);
      }

      const sortOrderParam = urlParams.get("order");
      if (sortOrderParam) {
        setSortOrder(sortOrderParam);
      }
    }

    // Load registry from static JSON
    fetch("/slim/data/registry.json")
      .then((res) => res.json())
      .then((data) => {
        // Get the base URL for install commands (safe for SSR)
        const currentBaseUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : "https://nasa-ammos.github.io";

        // Process install commands to replace {baseUrl} placeholder
        // Enhanced environment detection
        const getEnvironment = () => {
          const isLocalhost =
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1";
          const isLocal = isLocalhost || window.location.protocol === "file:";

          return {
            isLocal,
            isGitHub: window.location.hostname === "nasa-ammos.github.io",
            baseUrl: isLocal
              ? "http://localhost:3000"
              : "https://nasa-ammos.github.io",
          };
        };

        // Dynamic marketplace path calculation for local development
        const getLocalMarketplacePath = () => {
          // Use the actual path injected by the build script, or fall back to template
          return (
            localMarketplacePath ||
            "[YOUR_PROJECT_PATH]/static/marketplace"
          );
        };

        // Combine all types into one array - no need to process install commands
        const skills = (data.skills || []).map((s) => ({ ...s, type: s.type || "skill" }));
        const agents = (data.agents || []).map((a) => ({ ...a, type: a.type || "agent" }));
        const mcps = (data.mcp || []).map((m) => ({ ...m, type: m.type || "mcp" }));
        const combined = [...skills, ...agents, ...mcps];

        setAllItems(combined);
        // Store in window for access by dependency links
        window.allMarketplaceItems = combined;
        const tags = [...new Set(combined.flatMap((item) => item.tags || []))];
        setAllTags(tags);

        // Set the actual local marketplace path from registry data
        if (data.local_marketplace_path) {
          setLocalMarketplacePath(data.local_marketplace_path);
        }
      })
      .catch((err) => {
        console.error("Failed to load registry:", err);
      });
  }, []);

  // Update URL when any filter state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location);

      // Update search parameter
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      } else {
        url.searchParams.delete("search");
      }

      // Update category parameter
      if (selectedCategory && selectedCategory !== "All") {
        url.searchParams.set("category", selectedCategory);
      } else {
        url.searchParams.delete("category");
      }

      // Update type parameter
      if (selectedType && selectedType !== "All") {
        url.searchParams.set("type", selectedType);
      } else {
        url.searchParams.delete("type");
      }

      // Update tags parameter
      const activeTags = Object.entries(selectedTags)
        .filter(([_, selected]) => selected)
        .map(([tag, _]) => tag);
      if (activeTags.length > 0) {
        url.searchParams.set("tags", activeTags.join(","));
      } else {
        url.searchParams.delete("tags");
      }

      // Update sort parameter
      if (sortBy && sortBy !== "date") {
        url.searchParams.set("sort", sortBy);
      } else {
        url.searchParams.delete("sort");
      }

      // Update sort order parameter
      if (sortOrder && sortOrder !== "desc") {
        url.searchParams.set("order", sortOrder);
      } else {
        url.searchParams.delete("order");
      }

      window.history.replaceState({}, "", url);
    }
  }, [searchTerm, selectedCategory, selectedType, selectedTags, sortBy, sortOrder]);

  const handleTagChange = (tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const handleTagClick = (tag) => {
    setSelectedTags({ [tag]: true });
  };

  const handleRemoveType = () => {
    setSelectedType("All");
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag]: false,
    }));
  };

  const filteredItems = useMemo(() => {
    let filtered = allItems.filter((item) => {
      const matchesType = selectedType === "All" || item.type === selectedType;

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const matchesTags = Object.entries(selectedTags).every(
        ([tag, selected]) =>
          !selected || (item.tags && item.tags.includes(tag)),
      );

      const matchesSearch =
        item.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags &&
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ));

      return matchesType && matchesCategory && matchesTags && matchesSearch;
    });

    // Sort
    if (sortBy === "name") {
      filtered.sort((a, b) => {
        const comparison = a.displayName.localeCompare(b.displayName);
        return sortOrder === "asc" ? comparison : -comparison;
      });
    } else if (sortBy === "date") {
      filtered.sort((a, b) => {
        const comparison = new Date(b.lastUpdated) - new Date(a.lastUpdated);
        return sortOrder === "asc" ? -comparison : comparison;
      });
    }

    return filtered;
  }, [
    allItems,
    selectedType,
    selectedCategory,
    selectedTags,
    searchTerm,
    sortBy,
    sortOrder,
  ]);

  return (
    <Container fluid className={isSearchActive ? "" : "mt-4"} style={isSearchActive ? { marginTop: "-20px", paddingTop: "0" } : {}}>
      <Row className={isSearchActive ? "mb-4 mt-0" : "mb-5"}>
        <Col>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                Category:{" "}
                {selectedType === "All"
                  ? "All"
                  : selectedType.charAt(0).toUpperCase() +
                    selectedType.slice(1)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedType("All")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedType("skill")}>
                  Skills
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedType("agent")}>
                  Agents
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedType("mcp")}>
                  MCP Servers
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="outline-success">
                {Object.values(selectedTags).filter(Boolean).length > 0
                  ? `Tags (${Object.values(selectedTags).filter(Boolean).length})`
                  : "Tags"}
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="tag-filter-dropdown"
                style={{
                  minWidth: "320px",
                  maxWidth: "400px",
                  maxHeight: "500px",
                  overflowY: "auto",
                  padding: "10px 0",
                }}
              >
                {allTags.sort().map((tag, idx) => (
                  <div key={idx} style={{ padding: "0 20px" }}>
                    <Form.Check
                      type="checkbox"
                      label={prettifyTag(tag)}
                      checked={selectedTags[tag] || false}
                      onChange={() => handleTagChange(tag)}
                      className="py-2"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                      }}
                    />
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Sort: {sortBy === "name" ? "Alphabetical" : "Date"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy("date")}>
                  Date
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy("name")}>
                  Alphabetical
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary">
                Order: {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOrder("asc")}>
                  ↑ Ascending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder("desc")}>
                  ↓ Descending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <CategoryTree
            items={allItems}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </Col>
        <Col md={9}>
          <FilterPills
            selectedType={selectedType}
            selectedTags={selectedTags}
            onRemoveType={handleRemoveType}
            onRemoveTag={handleRemoveTag}
          />
          <h4 className="mb-3">
            {filteredItems.length} best practice
            {filteredItems.length !== 1 ? "s" : ""} available
          </h4>
          {filteredItems.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <h5>No best practices found</h5>
                <p className="text-muted">
                  Try adjusting your search or filters
                </p>
              </Card.Body>
            </Card>
          ) : (
            filteredItems.map((item, idx) => (
              <SkillCard
                key={idx}
                skill={item}
                onTagClick={handleTagClick}
                isHighlighted={highlightedSkill === item.name || highlightedSkill === item.displayName}
                currentFilters={{
                  selectedCategory,
                  selectedType,
                  selectedTags,
                  sortBy,
                  sortOrder
                }}
              />
            ))
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <small className="text-muted">
            UI components adapted from{" "}
            <a
              href="https://aitmpl.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              aitmpl.com
            </a>{" "}
            (MIT License) | Maintained by{" "}
            <a
              href="https://github.com/NASA-AMMOS"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA AMMOS
            </a>
          </small>
        </Col>
      </Row>
    </Container>
  );
};

function prettifyTag(tag) {
  // Define acronyms and special cases that should be all uppercase
  const acronyms = new Set([
    'ai', 'api', 'mcp', 'ci', 'cd', 'ui', 'ux', 'sdk', 'cli', 'ide',
    'git', 'sql', 'nosql', 'html', 'css', 'js', 'ts', 'json', 'yaml',
    'xml', 'rest', 'http', 'https', 'ssh', 'ssl', 'tls', 'url', 'uri'
  ]);

  // Define special cases with specific capitalization
  const specialCases = {
    'github': 'GitHub',
    'gitlab': 'GitLab',
    'devops': 'DevOps',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript'
  };

  return tag
    .split("-")
    .map((word) => {
      const lowerWord = word.toLowerCase();

      // Check if it's a special case
      if (specialCases[lowerWord]) {
        return specialCases[lowerWord];
      }

      // Check if it's an acronym
      if (acronyms.has(lowerWord)) {
        return word.toUpperCase();
      }

      // Default: capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default SkillBrowser;
