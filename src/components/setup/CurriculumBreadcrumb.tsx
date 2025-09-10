import { TreeNode } from "@/types/Curriculum";
import { FaArrowRightLong } from "react-icons/fa6";

interface CurriculumBreadcrumbProps {
  selectedPath: TreeNode[];
}

export default function CurriculumBreadcrumb({
  selectedPath
}: CurriculumBreadcrumbProps) {
  if (selectedPath.length === 0) return <div className="flex-1"></div>;

  return (
    <div className="flex my-4 p-2 bg-gray-700 rounded">
      <h3 className="font-medium text-gray-300 me-6">Selected curriculum : </h3>

      <div className="flex items-center space-x-2 text-white">
        {selectedPath.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <span className="text-sm">{node.name}</span>
            {index < selectedPath.length - 1 && (
              <FaArrowRightLong className="mx-2 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
