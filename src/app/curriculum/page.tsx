"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import MillerColumns from "@/components/ui/MillerColumns";
import { Toast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}

export default function CurriculumPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<TreeNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<TreeNode[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing curriculum on mount
  useEffect(() => {
    const loadCurriculum = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/curriculum", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const result = await response.json();
          setData(result.data || []);
        }
      } catch (error) {
        console.error("Error loading curriculum:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurriculum();
  }, [user]);

  const handleSelectionChange = (path: TreeNode[]) => {
    setSelectedPath(path);
  };

  const handleAddNode = (
    parentPath: TreeNode[],
    level: number,
    name: string
  ) => {
    if (!name.trim()) return;

    const newNode: TreeNode = {
      id: `${name.toLowerCase().replace(/\s+/g, "")}_${Date.now()}`,
      name: name.trim(),
      level: level,
      children: level < 3 ? [] : undefined
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

    setData(updateData(data, parentPath, level));
  };

  const handleSaveCurriculum = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/curriculum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ curriculum: data })
      });

      if (response.ok) {
        Toast.success("Curriculum saved successfully!");
      } else {
        Toast.danger("Failed to save curriculum. Please try again.");
      }
    } catch (error) {
      console.error("Error saving curriculum:", error);
      Toast.danger("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Curriculum Management
          </h1>
          <p className="text-gray-300">
            Navigate through the curriculum hierarchy. Add items using the input
            fields at the bottom of each column.
          </p>
        </div>
        <Button
          onClick={handleSaveCurriculum}
          disabled={isSaving}
          variant="info"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>Save Curriculum</>
          )}
        </Button>
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
        {isLoading ? (
          <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-300">Loading curriculum...</p>
            </div>
          </div>
        ) : (
          <MillerColumns
            data={data}
            onSelectionChange={handleSelectionChange}
            onAddNode={handleAddNode}
          />
        )}
      </div>
    </div>
  );
}
