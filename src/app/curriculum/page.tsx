"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CurriculumPage() {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with actual API call to add curriculum relation
    alert(
      `Added: Course=${course}, Subject=${subject}, Topic=${topic}, Subtopic=${subtopic}`
    );
    setCourse("");
    setSubject("");
    setTopic("");
    setSubtopic("");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Curriculum</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow"
      >
        <div>
          <label className="block font-medium mb-1">Course (Grade)</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Grade 1"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Mathematics"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Operations"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Subtopic</label>
          <input
            type="text"
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Addition"
            required
          />
        </div>
        <Button type="submit" variant="primary" className="w-full">
          Add Curriculum Entry
        </Button>
      </form>
      {/* TODO: List and edit existing curriculum entries here */}
    </div>
  );
}
