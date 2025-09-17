import { TreeNode } from "@/types/Curriculum";

interface CompactMillerColumnsProps {
  data: TreeNode[];
  selectedPath: TreeNode[];
  onSelectionChange: (path: TreeNode[]) => void;
}

export default function CompactMillerColumns({
  data,
  selectedPath,
  onSelectionChange
}: CompactMillerColumnsProps) {
  const handleNodeClick = (node: TreeNode, level: number) => {
    const newPath = selectedPath.slice(0, level);
    newPath.push(node);
    onSelectionChange(newPath);
  };

  const getDataForLevel = (level: number): TreeNode[] => {
    if (level === 0) return data;
    if (level === 1) return selectedPath[0]?.children || [];
    if (level === 2) return selectedPath[1]?.children || [];
    if (level === 3) return selectedPath[2]?.children || [];
    return [];
  };

  const levels = ["Course", "Subject", "Topic / Lesson", "Subtopic"];

  return (
    <div className="grid grid-cols-4 gap-4">
      {levels.map((levelName, level) => {
        const levelData = getDataForLevel(level);
        const selectedNode = selectedPath[level];

        return (
          <div key={level} className="space-y-1">
            <h3 className="text-sm font-medium text-center text-gray-300">
              {levelName}
            </h3>
            <div className="bg-gray-700 rounded border border-gray-600 max-h-24 overflow-y-auto">
              {levelData.length > 0 ? (
                levelData.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node, level)}
                    className={`w-full text-left px-3 py-1 text-sm hover:bg-gray-600 transition-colors ${
                      selectedNode?.id === node.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {node.name}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-gray-500">
                  {level === 0
                    ? "No courses"
                    : "Select " + levels[level - 1].toLowerCase()}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
