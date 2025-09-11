"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { TreeNode } from "@/types/Curriculum";
import { Toast } from "@/components/ui/Toast";
import Feedback from "@/components/ui/Feedback";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";
import SetupNav from "@/components/setup/SetupNav";
import CompactMillerColumns from "@/components/setup/CompactMillerColumns";
import { ProblemDifficulty } from "@/types/Problem";
import { ProblemType } from "@/types/Problem.type";

export default function SetupQuestionsPage() {
  const { user } = useAuthStore();
  const [curriculum, setCurriculum] = useState<TreeNode[]>([]);
  const [problemTypes, setProblemTypes] = useState<ProblemType[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TreeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TreeNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TreeNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TreeNode | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [validationError, setValidationError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    typeCode: "",
    statement: "",
    answer: "",
    explanation: "",
    difficulty: ProblemDifficulty.MEDIUM,
    suggestedPoints: 1,
    suggestedTime: 5,
    isPublic: false,
    isActive: true
  });

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();

        // Load curriculum
        const curriculumResponse = await fetch("/api/curriculum", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (curriculumResponse.ok) {
          const result = await curriculumResponse.json();
          setCurriculum(result.data || []);
        }

        // Load problem types
        const typesResponse = await fetch("/api/problem-types", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (typesResponse.ok) {
          const result = await typesResponse.json();
          setProblemTypes(result.data || []);
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

  const validateFormData = (data: {
    typeCode?: string;
    statement?: string;
    answer?: string;
    explanation?: string;
  }) => {
    if (!data.typeCode) return "Question type is required";
    if (!data.statement) return "Question statement is required";
    if (!data.answer) return "Answer is required";
    if (!data.explanation) return "Explanation is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!user || !selectedSubtopic) return;

    const error = validateFormData(formData);
    if (error) {
      setValidationError(error);
      return;
    }

    const questionData = {
      ...formData,
      subtopicId: parseInt(selectedSubtopic.id.replace("subtopic_", "")),
      media: {},
      metadata: {}
    };

    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(questionData)
      });

      if (response.ok) {
        Toast.success("Question added successfully!");
        setFormData({
          typeCode: "",
          statement: "",
          answer: "",
          explanation: "",
          difficulty: ProblemDifficulty.MEDIUM,
          suggestedPoints: 1,
          suggestedTime: 5,
          isPublic: false,
          isActive: true
        });
        setValidationError("");
      } else {
        Toast.danger("Failed to add question");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      Toast.danger("Error adding question");
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

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Setup Questions</h1>

        <SetupNav />
      </div>

      {/* Curriculum Selection */}
      <div className="my-4 p-5 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2 text-center">
          Select Curriculum for question
        </h2>

        <CompactMillerColumns
          data={curriculum}
          selectedPath={selectedPath}
          onSelectionChange={handlePathChange}
        />

        <CurriculumBreadcrumb selectedPath={selectedPath} />
      </div>

      {/* Question Form */}
      {selectedSubtopic && (
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Add New Question
          </h2>

          {validationError && (
            <Feedback message={validationError} variant="danger" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <>
              <div>
                <label className="block text-white mb-2">Question Type</label>
                <select
                  value={formData.typeCode}
                  onChange={(e) =>
                    setFormData({ ...formData, typeCode: e.target.value })
                  }
                  required
                  className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                >
                  <option value="">Select Type</option>
                  {problemTypes.map((type) => (
                    <option key={type.code} value={type.code}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">
                  Question Statement
                </label>
                <textarea
                  value={formData.statement}
                  onChange={(e) =>
                    setFormData({ ...formData, statement: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Answer</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Explanation</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) =>
                    setFormData({ ...formData, explanation: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as ProblemDifficulty
                      })
                    }
                    className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Points</label>
                  <input
                    type="number"
                    value={formData.suggestedPoints}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        suggestedPoints: parseInt(e.target.value)
                      })
                    }
                    min="1"
                    className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">
                    Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.suggestedTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        suggestedTime: parseInt(e.target.value)
                      })
                    }
                    min="1"
                    className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Public
                </label>
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Active
                </label>
              </div>
            </>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
            >
              Add Question
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
