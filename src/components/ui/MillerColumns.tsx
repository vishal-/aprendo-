"use client";

import { useState, useEffect } from "react";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}

interface MillerColumnsProps {
  data: TreeNode[];
  onSelectionChange?: (path: TreeNode[]) => void;
  onAddNode?: (parentPath: TreeNode[], level: number, name: string) => void;
}

export default function MillerColumns({ data, onSelectionChange, onAddNode }: MillerColumnsProps) {
  const [selectedPath, setSelectedPath] = useState<TreeNode[]>([]);
  const [columns, setColumns] = useState<TreeNode[][]>([data]);
  const [inputValues, setInputValues] = useState<string[]>(['', '', '', '']);

  // Update columns when data changes
  useEffect(() => {
    setColumns([data]);
    setSelectedPath([]);
  }, [data]);

  // Update columns when selectedPath changes to maintain proper column display
  useEffect(() => {
    if (selectedPath.length === 0) {
      setColumns([data]);
      return;
    }

    const newColumns = [data];
    let currentNodes = data;
    
    for (let i = 0; i < selectedPath.length; i++) {
      const selectedNode = currentNodes.find(node => node.id === selectedPath[i].id);
      if (selectedNode && selectedNode.level < 3) {
        currentNodes = selectedNode.children || [];
        newColumns.push(currentNodes);
      }
    }
    
    setColumns(newColumns);
  }, [selectedPath, data]);

  const handleNodeSelect = (node: TreeNode, columnIndex: number) => {
    const newPath = selectedPath.slice(0, columnIndex).concat(node);
    setSelectedPath(newPath);
    
    // Update columns - always show next level if not at max depth
    const newColumns = columns.slice(0, columnIndex + 1);
    if (node.level < 3) {
      newColumns.push(node.children || []);
    }
    setColumns(newColumns);
    
    onSelectionChange?.(newPath);
  };

  const handleAddClick = (columnIndex: number) => {
    const inputValue = inputValues[columnIndex]?.trim();
    if (!inputValue) return;
    
    const parentPath = selectedPath.slice(0, columnIndex);
    onAddNode?.(parentPath, columnIndex, inputValue);
    
    // Clear input after adding
    const newInputValues = [...inputValues];
    newInputValues[columnIndex] = '';
    setInputValues(newInputValues);
  };

  const handleInputChange = (columnIndex: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[columnIndex] = value;
    setInputValues(newInputValues);
  };

  const handleKeyPress = (e: React.KeyboardEvent, columnIndex: number) => {
    if (e.key === 'Enter') {
      handleAddClick(columnIndex);
    }
  };

  return (
    <div className="flex h-96 border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 min-w-48 border-r border-gray-600 last:border-r-0"
        >
          <div className="h-full flex flex-col">
            <div className="p-3 bg-gray-700 border-b border-gray-600">
              <span className="text-sm font-medium text-gray-200">
                {columnIndex === 0 && "Courses"}
                {columnIndex === 1 && "Subjects"}
                {columnIndex === 2 && "Topics"}
                {columnIndex === 3 && "Subtopics"}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {column.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeSelect(node, columnIndex)}
                  className={`p-3 cursor-pointer border-b border-gray-600 hover:bg-gray-700 transition-colors ${
                    selectedPath[columnIndex]?.id === node.id
                      ? "bg-primary/20 border-l-4 border-l-primary"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">{node.name}</span>
                    {node.children && node.children.length > 0 && (
                      <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded-full">
                        {node.children.length}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-700 border-t border-gray-600">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValues[columnIndex] || ''}
                  onChange={(e) => handleInputChange(columnIndex, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, columnIndex)}
                  placeholder={`Add ${columnIndex === 0 ? 'course' : columnIndex === 1 ? 'subject' : columnIndex === 2 ? 'topic' : 'subtopic'}...`}
                  className="flex-1 text-sm px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={() => handleAddClick(columnIndex)}
                  disabled={!inputValues[columnIndex]?.trim()}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <span className="text-lg">+</span>
                  <span className="text-sm">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}