"use client";

import { useState } from "react";
import MillerColumns from "@/components/ui/MillerColumns";
import { Toast } from "@/components/ui/Toast";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}

// Sample hierarchical data
const initialData: TreeNode[] = [
  {
    id: "grade1",
    name: "Grade 1",
    level: 0,
    children: [
      {
        id: "math1",
        name: "Mathematics",
        level: 1,
        children: [
          {
            id: "operations1",
            name: "Operations",
            level: 2,
            children: [
              { id: "addition1", name: "Addition", level: 3 },
              { id: "subtraction1", name: "Subtraction", level: 3 }
            ]
          },
          {
            id: "geometry1",
            name: "Geometry",
            level: 2,
            children: [{ id: "shapes1", name: "Basic Shapes", level: 3 }]
          }
        ]
      },
      {
        id: "science1",
        name: "Science",
        level: 1,
        children: [
          {
            id: "biology1",
            name: "Biology",
            level: 2,
            children: [{ id: "plants1", name: "Plants", level: 3 }]
          }
        ]
      }
    ]
  },
  {
    id: "grade2",
    name: "Grade 2",
    level: 0,
    children: [
      {
        id: "math2",
        name: "Mathematics",
        level: 1,
        children: [
          {
            id: "operations2",
            name: "Operations",
            level: 2,
            children: [
              { id: "multiplication2", name: "Multiplication", level: 3 }
            ]
          }
        ]
      }
    ]
  }
];

export default function CurriculumPage() {
  const [data, setData] = useState<TreeNode[]>(initialData);
  const [selectedPath, setSelectedPath] = useState<TreeNode[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    parentPath: [] as TreeNode[],
    level: 0
  });

  const handleSelectionChange = (path: TreeNode[]) => {
    setSelectedPath(path);
  };

  const handleAddNode = (parentPath: TreeNode[], level: number) => {
    setAddFormData({ name: "", parentPath, level });
    setShowAddForm(true);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFormData.name.trim()) return;

    const newNode: TreeNode = {
      id: `${addFormData.name.toLowerCase().replace(/\s+/g, "")}_${Date.now()}`,
      name: addFormData.name,
      level: addFormData.level,
      children: addFormData.level < 3 ? [] : undefined
    };

    const updateData = (
      nodes: TreeNode[],
      path: TreeNode[],
      targetLevel: number
    ): TreeNode[] => {
      if (targetLevel === 0) {
        return [...nodes, newNode];
      }

      return nodes.map((node) => {
        if (path.length > 0 && node.id === path[0].id) {
          return {
            ...node,
            children: updateData(
              node.children || [],
              path.slice(1),
              targetLevel - 1
            )
          };
        }
        return node;
      });
    };

    setData(updateData(data, addFormData.parentPath, addFormData.level));
    setShowAddForm(false);
    setAddFormData({ name: "", parentPath: [], level: 0 });
    Toast.success("Item added successfully!");
  };

  const getLevelName = (level: number) => {
    const names = ["Course", "Subject", "Topic", "Subtopic"];
    return names[level] || "Item";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Curriculum Management
        </h1>
        <p className="text-gray-300">
          Navigate through the curriculum hierarchy using the column view.
          Select items to explore deeper levels.
        </p>
      </div>

      {/* Selected Path Breadcrumb */}
      {selectedPath.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            Selected Path:
          </h3>
          <div className="flex items-center space-x-2 text-white">
            {selectedPath.map((node, index) => (
              <div key={node.id} className="flex items-center">
                <span className="text-sm">{node.name}</span>
                {index < selectedPath.length - 1 && (
                  <span className="mx-2 text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Miller Columns */}
      <div className="mb-8">
        <MillerColumns
          data={data}
          onSelectionChange={handleSelectionChange}
          onAddNode={handleAddNode}
        />
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New {getLevelName(addFormData.level)}
            </h3>
            <form onSubmit={handleSubmitAdd}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getLevelName(addFormData.level)} Name
                </label>
                <input
                  type="text"
                  value={addFormData.name}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary text-gray-900"
                  placeholder={`Enter ${getLevelName(
                    addFormData.level
                  ).toLowerCase()} name`}
                  required
                />
              </div>
              {addFormData.parentPath.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    Adding to:{" "}
                    {addFormData.parentPath.map((p) => p.name).join(" → ")}
                  </p>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                >
                  Add {getLevelName(addFormData.level)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
