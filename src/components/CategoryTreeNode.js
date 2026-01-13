/**
 * CategoryTreeNode - Hierarchical category tree node with expand/collapse functionality
 * Based on FileTreeNode pattern for consistency
 */

import React from "react";
import { ListGroup } from "react-bootstrap";

const CategoryTreeNode = ({
  node,
  selectedCategory,
  onCategorySelect,
  onToggleExpand,
  expandedCategories,
}) => {
  const isExpanded = expandedCategories.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedCategory === node.id;

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    onCategorySelect(node.id);
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  return (
    <>
      <ListGroup.Item
        active={isSelected}
        onClick={handleCategoryClick}
        style={{
          cursor: "pointer",
          marginLeft: `${node.level * 20}px`,
          paddingLeft: hasChildren ? "8px" : "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        {hasChildren && (
          <span
            onClick={handleToggleClick}
            style={{
              cursor: "pointer",
              userSelect: "none",
              fontSize: "12px",
              color: "#6c757d",
              minWidth: "12px",
              textAlign: "center"
            }}
            title={isExpanded ? "Collapse category" : "Expand category"}
          >
            {isExpanded ? "▼" : "▶"}
          </span>
        )}
        <span style={{ flexGrow: 1 }}>
          {node.icon} {node.name} ({node.count})
        </span>
      </ListGroup.Item>

      {hasChildren && isExpanded &&
        node.children.map(child => (
          <CategoryTreeNode
            key={child.id}
            node={child}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
            onToggleExpand={onToggleExpand}
            expandedCategories={expandedCategories}
          />
        ))
      }
    </>
  );
};

export default CategoryTreeNode;