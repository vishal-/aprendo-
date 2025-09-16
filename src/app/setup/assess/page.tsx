"use client";

import { useState } from "react";
import { Toast } from "@/components/ui/Toast";

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
  const [tests] = useState(mockTests);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Logic to update a test
      Toast.success(`Test "${formData.name}" updated successfully!`);
    } else {
      // Logic to add a new test
      Toast.success(`Test "${formData.name}" created successfully!`);
    }
    // Reset form
    setFormData({ name: "", description: "" });
    setIsEditing(null);
  };

  const handleEdit = (test: (typeof mockTests)[0]) => {
    setIsEditing(test.id);
    setFormData({ name: test.name, description: test.description });
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

      {/* Form to Add/Edit Test */}
      <div className="p-6 bg-gray-800 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          {isEditing ? "Edit Test" : "Create New Test"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white mb-2">
              Test Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded"
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
