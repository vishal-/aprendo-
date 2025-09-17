"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Toast } from "@/components/ui/Toast";
import { TreeNode } from "@/types/Curriculum";
import { Assessment, AssessmentMode, AssessmentStatus } from "@/types/Assessment";
import { apiService } from "@/lib/api";
import CompactMillerColumns from "@/components/setup/CompactMillerColumns";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";

// Mock data for tests
const mockTests = [
  {
    id: 1,
    name: "Algebra Basics",
    description: "A test on basic algebraic concepts.",
    numberOfQuestions: 20,
    duration: 30
  },
  {
    id: 2,
    name: "Geometry Fundamentals",
    description: "A test on fundamental geometric principles.",
    numberOfQuestions: 15,
    duration: 25
  },
  {
    id: 3,
    name: "Calculus I - Midterm",
    description: "Midterm exam for Calculus I.",
    numberOfQuestions: 25,
    duration: 60
  }
];

export default function SetupAssessPage() {
  const { user } = useAuthStore();
  const [tests] = useState(mockTests);
  const [curriculum, setCurriculum] = useState<TreeNode[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<TreeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TreeNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TreeNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Assessment>>({
    title: "",
    description: "",
    instructions: "",
    duration: 60,
    maximumMarks: 100,
    mode: 'online' as AssessmentMode,
    status: 'draft' as AssessmentStatus,
    isPublic: false,
    start: "",
    end: ""
  });

  useEffect(() => {
    const loadCurriculum = async () => {
      if (!user) return;

      try {
        const result = await apiService.getCurriculum(user) as unknown as { data: TreeNode[] };
        setCurriculum(result.data || []);
      } catch (error) {
        console.error("Error loading curriculum:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCurriculum();
  }, [user]);

  const handlePathChange = (path: TreeNode[]) => {
    setSelectedCourse(path[0] || null);
    setSelectedSubject(path[1] || null);
    setSelectedTopic(path[2] || null);
    setSelectedSubtopic(path[3] || null);
    
    if (path[0]) {
      setFormData(prev => ({
        ...prev,
        courseId: parseInt(path[0].id.replace('course_', ''))
      }));
    }
  };

  const selectedPath = [
    selectedCourse,
    selectedSubject,
    selectedTopic,
    selectedSubtopic
  ].filter((node): node is TreeNode => node !== null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) {
      Toast.danger("Please select a course");
      return;
    }
    
    if (isEditing) {
      Toast.success(`Test "${formData.title}" updated successfully!`);
    } else {
      Toast.success(`Test "${formData.title}" created successfully!`);
    }
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      instructions: "",
      duration: 60,
      maximumMarks: 100,
      mode: 'online' as AssessmentMode,
      status: 'draft' as AssessmentStatus,
      isPublic: false,
      start: "",
      end: ""
    });
    setIsEditing(null);
  };

  const handleEdit = (test: (typeof mockTests)[0]) => {
    setIsEditing(test.id);
    setFormData({ title: test.name, description: test.description });
  };

  const handleDelete = (testId: number) => {
    // Logic to delete a test
    Toast.danger(`Test with id ${testId} deleted.`);
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Tests</h2>
        <p className="text-gray-300">Create and manage assessments for your curriculum.</p>
      </div>

      {/* Curriculum Selection */}
      <div className="mb-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Select Course</h3>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <CompactMillerColumns
              data={curriculum}
              selectedPath={selectedPath}
              onSelectionChange={handlePathChange}
            />
            <div className="mt-4">
              <CurriculumBreadcrumb selectedPath={selectedPath} />
            </div>
          </>
        )}
      </div>

      {/* Form to Add/Edit Test */}
      <div className="p-6 bg-gray-800 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          {isEditing ? "Edit Test" : "Create New Test"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-white mb-2">
                Test Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title || ""}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="mode" className="block text-white mb-2">
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={formData.mode || "online"}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
            />
          </div>
          
          <div>
            <label htmlFor="instructions" className="block text-white mb-2">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="duration" className="block text-white mb-2">
                Duration (minutes)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration || 60}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="maximumMarks" className="block text-white mb-2">
                Maximum Marks
              </label>
              <input
                id="maximumMarks"
                name="maximumMarks"
                type="number"
                value={formData.maximumMarks || 100}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-white mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status || "draft"}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start" className="block text-white mb-2">
                Start Date & Time
              </label>
              <input
                id="start"
                name="start"
                type="datetime-local"
                value={formData.start instanceof Date ? formData.start.toISOString().slice(0, 16) : formData.start || ""}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="end" className="block text-white mb-2">
                End Date & Time
              </label>
              <input
                id="end"
                name="end"
                type="datetime-local"
                value={formData.end instanceof Date ? formData.end.toISOString().slice(0, 16) : formData.end || ""}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              checked={formData.isPublic || false}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="isPublic" className="text-white">
              Make this test public
            </label>
          </div>
          
          <button
            type="submit"
            disabled={!selectedCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded"
          >
            {isEditing ? "Update Test" : "Create Test"}
          </button>
        </form>
      </div>

      {/* List of Existing Tests */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Existing Tests
        </h2>
        <div className="space-y-4">
          {tests.map((test) => (
            <div
              key={test.id}
              className="p-4 bg-gray-700 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-white">{test.name}</h3>
                <p className="text-gray-300 text-sm">{test.description}</p>
                <div className="text-xs text-gray-400 mt-2">
                  <span>{test.numberOfQuestions} questions</span>
                  <span className="mx-2">|</span>
                  <span>{test.duration} minutes</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(test)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
