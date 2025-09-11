"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { TreeNode } from "@/types/Curriculum";
import { Toast } from "@/components/ui/Toast";
import Feedback from "@/components/ui/Feedback";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";
import CompactMillerColumns from "@/components/setup/CompactMillerColumns";
import AuthGuard from "@/components/auth/AuthGuard";
import { useRouter } from "next/navigation";

function AdminQuestionsPage() {
  const { user } = useAuthStore();
  const { userDetails } = useUserDetailsStore();
  const router = useRouter();

  const [curriculum, setCurriculum] = useState<TreeNode[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TreeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TreeNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TreeNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TreeNode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [jsonInput, setJsonInput] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (userDetails && userDetails.role !== 'admin') {
      router.push("/user/dashboard");
    }
  }, [userDetails, router]);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const curriculumResponse = await fetch("/api/curriculum", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (curriculumResponse.ok) {
          const result = await curriculumResponse.json();
          setCurriculum(result.data || []);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!user || !selectedSubtopic) {
      setValidationError("Please select a curriculum path.");
      return;
    }

    let questionsData;
    try {
      questionsData = JSON.parse(jsonInput);
      if (!Array.isArray(questionsData)) {
        setValidationError("Input must be a JSON array of questions.");
        return;
      }
    } catch (error) {
      console.error("Invalid JSON:", error);
      setValidationError("Invalid JSON format.");
      return;
    }

    const subtopicId = parseInt(selectedSubtopic.id.replace("subtopic_", ""));
    const questionsWithSubtopic = questionsData.map((q) => ({
      ...q,
      subtopicId
    }));

    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(questionsWithSubtopic)
      });

      if (response.ok) {
        const result = await response.json();
        Toast.success(`${result.count} questions added successfully!`);
        setJsonInput("");
        setValidationError("");
      } else {
        const errorData = await response.json();
        Toast.danger(`Failed to add questions: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding questions:", error);
      Toast.danger("Error adding questions");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (userDetails && userDetails.role !== 'admin') {
    return (
        <div className="flex items-center justify-center h-96">
            <div className="text-center">
                <p className="text-gray-300">You are not authorized to view this page.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Admin - Batch Add Questions
        </h1>
      </div>

      <div className="my-4 p-5 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2 text-center">
          Select Curriculum for questions
        </h2>
        <CompactMillerColumns
          data={curriculum}
          selectedPath={selectedPath}
          onSelectionChange={handlePathChange}
        />
        <CurriculumBreadcrumb selectedPath={selectedPath} />
      </div>

      {selectedSubtopic && (
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Add New Questions (JSON)
          </h2>

          {validationError && (
            <Feedback message={validationError} variant="danger" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="question-json-input">
              <label className="block text-white mb-2">
                Questions JSON Array
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`
[
  {
    "typeCode": "mcq_single",
    "statement": "What is 2+2?",
    "answer": "4",
    "explanation": "Basic addition",
    "difficulty": "easy",
    "suggestedPoints": 1,
    "suggestedTime": 2,
    "isPublic": false,
    "isActive": true
  },
  {
    "typeCode": "mcq_single",
    "statement": "What is the capital of France?",
    "answer": "Paris",
    "explanation": "It is a well-known fact.",
    "difficulty": "easy",
    "suggestedPoints": 1,
    "suggestedTime": 1,
    "isPublic": true,
    "isActive": true
  }
]`}
                rows={20}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
            >
              Add Questions
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function GuardedAdminQuestionsPage() {
    return (
        <AuthGuard>
            <AdminQuestionsPage />
        </AuthGuard>
    )
}