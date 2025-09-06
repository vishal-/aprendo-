"use client";

import { useState } from "react";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}

interface MillerColumnsProps {
  data: TreeNode[];
  onSelectionChange?: (path: TreeNode[]) => void;
  onAddNode?: (parentPath: TreeNode[], level: number) => void;
}

export default function MillerColumns({ data, onSelectionChange, onAddNode }: MillerColumnsProps) {
  const [selectedPath, setSelectedPath] = useState<TreeNode[]>([]);
  const [columns, setColumns] = useState<TreeNode[][]>([data]);

  const handleNodeSelect = (node: TreeNode, columnIndex: number) => {
    const newPath = selectedPath.slice(0, columnIndex).concat(node);
    setSelectedPath(newPath);
    
    // Update columns
    const newColumns = columns.slice(0, columnIndex + 1);
    if (node.children && node.children.length > 0) {
      newColumns.push(node.children);
    }
    setColumns(newColumns);
    
    onSelectionChange?.(newPath);
  };

  const handleAddClick = (columnIndex: number) => {
    const parentPath = selectedPath.slice(0, columnIndex);
    onAddNode?.(parentPath, columnIndex);
  };

  return (
    <div className="flex h-96 border border-gray-300 rounded-lg overflow-hidden bg-white">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 min-w-48 border-r border-gray-200 last:border-r-0"
        >
          <div className="h-full flex flex-col">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {columnIndex === 0 && "Courses"}
                {columnIndex === 1 && "Subjects"}
                {columnIndex === 2 && "Topics"}
                {columnIndex === 3 && "Subtopics"}
              </span>
              <button
                onClick={() => handleAddClick(columnIndex)}
                className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-secondary"
              >
                + Add
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {column.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeSelect(node, columnIndex)}
                  className={`p-3 cursor-pointer border-b border-gray-100 hover:bg-blue-50 ${
                    selectedPath[columnIndex]?.id === node.id
                      ? "bg-blue-100 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{node.name}</span>
                    {node.children && node.children.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {node.children.length}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}