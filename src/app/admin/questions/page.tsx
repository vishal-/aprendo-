"use client";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase";
import { apiService } from "@/lib/api";
import CompactMillerColumns from "@/components/setup/CompactMillerColumns";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";
import { TreeNode } from "@/types/Curriculum";

interface Question {
  typeCode: string;
  statement: string;
  answer: string;
  explanation: string;
  difficulty: string;
  suggestedPoints: number;
  suggestedTime: number;
  isPublic: boolean;
  isActive: boolean;
  subtopicId: number;
}

const AdminQuestionsPage = () => {
  const { userDetails } = useUserDetailsStore();
  const router = useRouter();
  const [jsonInput, setJsonInput] = useState(`[
  {
    "typeCode": "MCQ",
    "statement": "What is the capital of France?",
    "answer": "Paris",
    "explanation": "Paris is the capital of France.",
    "difficulty": "Easy",
    "suggestedPoints": 10,
    "suggestedTime": 60,
    "isPublic": true,
    "isActive": true,
    "subtopicId": 1
  }
]`);
  const [curriculum, setCurriculum] = useState<TreeNode[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TreeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TreeNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TreeNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TreeNode | null>(null);

  useEffect(() => {
    if (userDetails && userDetails.role !== "admin") {
      router.push("/");
    }
  }, [userDetails, router]);

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await apiService.getCurriculum(user) as unknown as { data: TreeNode[] };
          setCurriculum(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching curriculum:", error);
      }
    };
    fetchCurriculum();
  }, []);

  const handleJsonUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const questions = JSON.parse(jsonInput);
      if (!Array.isArray(questions)) {
        toast.error("Invalid JSON format. Please provide an array of questions.");
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        toast.error("You are not authorized to perform this action.");
        return;
      }

      // Create problems one by one since we don't have a bulk create API
      let successCount = 0;
      for (const question of questions) {
        try {
          await apiService.createProblem(user, question);
          successCount++;
        } catch (error) {
          console.error('Error creating problem:', error);
        }
      }
      toast.success(`${successCount} questions uploaded successfully!`);
      setJsonInput("");
    } catch (error) {
      toast.error("Invalid JSON format. Please check the console for more details.");
      console.error(error);
    }
  };

  const handlePathChange = (path: TreeNode[]) => {
    setSelectedCourse(path[0] || null);
    setSelectedSubject(path[1] || null);
    setSelectedTopic(path[2] || null);
    setSelectedSubtopic(path[3] || null);
  };

  const selectedPath = [
    selectedCourse,
    selectedSubject,
    selectedTopic,
    selectedSubtopic
  ].filter((node): node is TreeNode => node !== null);




  if (!userDetails) {
    return <div>Loading...</div>;
  }

  if (userDetails.role !== "admin") {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminNav />
      <h1 className="text-2xl font-bold mb-4">Admin Questions</h1>
      <div className="">
        <p>Here you can manage the questions.</p>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Select Curriculum Path</h2>
          <CompactMillerColumns
            data={curriculum}
            selectedPath={selectedPath}
            onSelectionChange={handlePathChange}
          />
          <div className="mt-4">
            <CurriculumBreadcrumb selectedPath={selectedPath} />
          </div>
        </div>

        <form onSubmit={handleJsonUpload} className="mt-4">
          <textarea
            className="w-full h-64 p-2 border rounded bg-gray-800 text-white"
            placeholder='Enter JSON array of questions...'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          <Button type="submit" variant="primary" className="mt-4">
            Upload Questions
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminQuestionsPage;
