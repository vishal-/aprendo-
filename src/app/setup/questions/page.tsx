"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { TreeNode } from "@/types/Curriculum";
import { Toast } from "@/components/ui/Toast";
import Feedback from "@/components/ui/Feedback";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";
import SetupNav from "@/components/setup/SetupNav";
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
  const [activeTab, setActiveTab] = useState<"form" | "json">("form");
  const [jsonInput, setJsonInput] = useState("");
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

  const handleCourseChange = (courseId: string) => {
    const course = curriculum.find((c) => c.id === courseId) || null;
    setSelectedCourse(course);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };

  const handleSubjectChange = (subjectId: string) => {
    const subject =
      selectedCourse?.children?.find((s) => s.id === subjectId) || null;
    setSelectedSubject(subject);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
  };

  const handleTopicChange = (topicId: string) => {
    const topic =
      selectedSubject?.children?.find((t) => t.id === topicId) || null;
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
  };

  const handleSubtopicChange = (subtopicId: string) => {
    const subtopic =
      selectedTopic?.children?.find((st) => st.id === subtopicId) || null;
    setSelectedSubtopic(subtopic);
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

    let questionData;

    if (activeTab === "form") {
      const error = validateFormData(formData);
      if (error) {
        setValidationError(error);
        return;
      }
      questionData = {
        ...formData,
        subtopicId: parseInt(selectedSubtopic.id.replace("subtopic_", "")),
        media: {},
        metadata: {}
      };
    } else {
      try {
        const parsed = JSON.parse(jsonInput);
        const error = validateFormData(parsed);
        if (error) {
          setValidationError(error);
          return;
        }
        questionData = {
          ...parsed,
          subtopicId: parseInt(selectedSubtopic.id.replace("subtopic_", "")),
          media: parsed.media || {},
          metadata: parsed.metadata || {}
        };
      } catch (error) {
        console.error("Invalid JSON:", error);
        setValidationError("Invalid JSON format");
        return;
      }
    }

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
        setJsonInput("");
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
        <a
          href="/setup/curriculum"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Update Curriculum
        </a>
      </div>

      {/* Curriculum Selection */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Select Curriculum Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={selectedCourse?.id || ""}
            onChange={(e) => handleCourseChange(e.target.value)}
            className="p-3 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="">Select Course</option>
            {curriculum.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubject?.id || ""}
            onChange={(e) => handleSubjectChange(e.target.value)}
            disabled={!selectedCourse}
            className="p-3 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-50"
          >
            <option value="">Select Subject</option>
            {selectedCourse?.children?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            value={selectedTopic?.id || ""}
            onChange={(e) => handleTopicChange(e.target.value)}
            disabled={!selectedSubject}
            className="p-3 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-50"
          >
            <option value="">Select Topic</option>
            {selectedSubject?.children?.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubtopic?.id || ""}
            onChange={(e) => handleSubtopicChange(e.target.value)}
            disabled={!selectedTopic}
            className="p-3 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-50"
          >
            <option value="">Select Subtopic</option>
            {selectedTopic?.children?.map((subtopic) => (
              <option key={subtopic.id} value={subtopic.id}>
                {subtopic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start space-x-4 mb-4">
          <CurriculumBreadcrumb selectedPath={selectedPath} />
          <SetupNav />
        </div>
      </div>

      {/* Question Form */}
      {selectedSubtopic && (
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Add New Question
          </h2>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-700">
            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 font-medium ${
                activeTab === "form"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Form Input
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("json")}
              className={`px-4 py-2 font-medium ml-4 ${
                activeTab === "json"
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              JSON Input
            </button>
          </div>

          {validationError && (
            <Feedback message={validationError} variant="danger" />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "form" ? (
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
            ) : (
              <div className="question-json-input">
                <label className="block text-white mb-2">Question JSON</label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder={`
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
                  }`}
                  rows={12}
                  className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 font-mono text-sm"
                />
              </div>
            )}

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
