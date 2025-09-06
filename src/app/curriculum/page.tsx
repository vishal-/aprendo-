"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

// Dummy data for dropdowns (replace with API data)
const initialCourses = ["Grade 1", "Grade 2", "Grade 3"];
const initialSubjects = [
  { name: "Mathematics", course: "Grade 1" },
  { name: "Science", course: "Grade 1" },
  { name: "Mathematics", course: "Grade 2" }
];
const initialTopics = [
  { name: "Operations", course: "Grade 1", subject: "Mathematics" },
  { name: "Geometry", course: "Grade 1", subject: "Mathematics" },
  { name: "Biology", course: "Grade 1", subject: "Science" }
];
const initialSubtopics = [
  {
    name: "Addition",
    course: "Grade 1",
    subject: "Mathematics",
    topic: "Operations"
  },
  {
    name: "Subtraction",
    course: "Grade 1",
    subject: "Mathematics",
    topic: "Operations"
  }
];

export default function CurriculumPage() {
  // Course
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState(initialCourses);

  // Subject
  const [subjectName, setSubjectName] = useState("");
  const [subjectCourse, setSubjectCourse] = useState("");
  const [subjects, setSubjects] = useState(initialSubjects);

  // Topic
  const [topicName, setTopicName] = useState("");
  const [topicCourse, setTopicCourse] = useState("");
  const [topicSubject, setTopicSubject] = useState("");
  const [topics, setTopics] = useState(initialTopics);

  // Subtopic
  const [subtopicName, setSubtopicName] = useState("");
  const [subtopicCourse, setSubtopicCourse] = useState("");
  const [subtopicSubject, setSubtopicSubject] = useState("");
  const [subtopicTopic, setSubtopicTopic] = useState("");
  const [subtopics, setSubtopics] = useState(initialSubtopics);

  // Add handlers
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseName && !courses.includes(courseName)) {
      setCourses([...courses, courseName]);
      setCourseName("");
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (subjectName && subjectCourse) {
      setSubjects([...subjects, { name: subjectName, course: subjectCourse }]);
      setSubjectName("");
      setSubjectCourse("");
    }
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (topicName && topicCourse && topicSubject) {
      setTopics([
        ...topics,
        { name: topicName, course: topicCourse, subject: topicSubject }
      ]);
      setTopicName("");
      setTopicCourse("");
      setTopicSubject("");
    }
  };

  const handleAddSubtopic = (e) => {
    e.preventDefault();
    if (subtopicName && subtopicCourse && subtopicSubject && subtopicTopic) {
      setSubtopics([
        ...subtopics,
        {
          name: subtopicName,
          course: subtopicCourse,
          subject: subtopicSubject,
          topic: subtopicTopic
        }
      ]);
      setSubtopicName("");
      setSubtopicCourse("");
      setSubtopicSubject("");
      setSubtopicTopic("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Curriculum</h1>
      {/* Add Course */}
      <form
        onSubmit={handleAddCourse}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-2">Add Course (Grade)</h2>
        <div>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Grade 1"
            required
          />
        </div>
        <Button type="submit" variant="primary">
          Add Course
        </Button>
      </form>
      {/* Add Subject */}
      <form
        onSubmit={handleAddSubject}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-2">Add Subject</h2>
        <div>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Mathematics"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Select Course</label>
          <select
            value={subjectCourse}
            onChange={(e) => setSubjectCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="secondary">
          Add Subject
        </Button>
      </form>
      {/* Add Topic */}
      <form
        onSubmit={handleAddTopic}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-2">Add Topic</h2>
        <div>
          <input
            type="text"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Operations"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Select Course</label>
          <select
            value={topicCourse}
            onChange={(e) => setTopicCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Subject</label>
          <select
            value={topicSubject}
            onChange={(e) => setTopicSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option
                key={s.name + s.course}
                value={s.name}
              >{`${s.name} (${s.course})`}</option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="info">
          Add Topic
        </Button>
      </form>
      {/* Add Subtopic */}
      <form
        onSubmit={handleAddSubtopic}
        className="space-y-4 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-2">Add Subtopic</h2>
        <div>
          <input
            type="text"
            value={subtopicName}
            onChange={(e) => setSubtopicName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="e.g. Addition"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Select Course</label>
          <select
            value={subtopicCourse}
            onChange={(e) => setSubtopicCourse(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Subject</label>
          <select
            value={subtopicSubject}
            onChange={(e) => setSubtopicSubject(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option
                key={s.name + s.course}
                value={s.name}
              >{`${s.name} (${s.course})`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Topic</label>
          <select
            value={subtopicTopic}
            onChange={(e) => setSubtopicTopic(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Topic</option>
            {topics.map((t) => (
              <option
                key={t.name + t.subject + t.course}
                value={t.name}
              >{`${t.name} (${t.subject}, ${t.course})`}</option>
            ))}
          </select>
        </div>
        <Button type="submit" variant="success">
          Add Subtopic
        </Button>
      </form>
    </div>
  );
}
