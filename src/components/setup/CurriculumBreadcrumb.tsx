import { TreeNode } from "@/types/Curriculum";

interface CurriculumBreadcrumbProps {
  selectedPath: TreeNode[];
}

export default function CurriculumBreadcrumb({
  selectedPath
}: CurriculumBreadcrumbProps) {
  if (selectedPath.length === 0) return <div className="flex-1"></div>;

  return (
    <div className="flex-1 px-4 py-2 bg-gray-700 rounded">
      <h3 className="text-sm font-medium text-gray-300 mb-1">Selected Path:</h3>

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
  );
}
