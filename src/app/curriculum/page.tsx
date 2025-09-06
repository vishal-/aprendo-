"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface Subject {
  name: string;
  course: string;
}

interface Topic extends Subject {
  subject: string;
}

interface Subtopic extends Topic {
  topic: string;
}

// Dummy data for dropdowns (replace with API data)
const initialCourses = ["Grade 1", "Grade 2", "Grade 3"];
const initialSubjects: Subject[] = [
  { name: "Mathematics", course: "Grade 1" },
  { name: "Science", course: "Grade 1" },
  { name: "Mathematics", course: "Grade 2" }
];
const initialTopics: Topic[] = [
  { name: "Operations", course: "Grade 1", subject: "Mathematics" },
  { name: "Geometry", course: "Grade 1", subject: "Mathematics" },
  { name: "Biology", course: "Grade 1", subject: "Science" }
];
const initialSubtopics: Subtopic[] = [
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
  const handleAddCourse = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (courseName && !courses.includes(courseName)) {
      setCourses([...courses, courseName]);
      setCourseName("");
    }
  };

  const handleAddSubject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subjectName && subjectCourse) {
      setSubjects([...subjects, { name: subjectName, course: subjectCourse }]);
      setSubjectName("");
      setSubjectCourse("");
    }
  };

  const handleAddTopic = (e: FormEvent<HTMLFormElement>) => {
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

  const handleAddSubtopic = (e: FormEvent<HTMLFormElement>) => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Curriculum Management</h1>
        <p className="text-gray-600 mb-8">
          Create and manage your curriculum structure by adding courses,
          subjects, topics, and subtopics.
        </p>

        <div className="space-y-8">
          {/* Current Items */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Current Courses
              </h3>
              <div className="flex flex-wrap gap-2">
                {courses.map((course) => (
                  <span
                    key={course}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Current Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject.name + subject.course}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {subject.name} ({subject.course})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Add Course */}
          <form
            onSubmit={handleAddCourse}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4">Add Course (Grade)</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Course Name
                </label>
                <input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCourseName(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Grade 1"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Add Course
              </Button>
            </div>
          </form>

          {/* Add Subject */}
          <form
            onSubmit={handleAddSubject}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4">Add Subject</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="subjectName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject Name
                </label>
                <input
                  id="subjectName"
                  type="text"
                  value={subjectName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSubjectName(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Mathematics"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subjectCourse"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Course
                </label>
                <select
                  id="subjectCourse"
                  value={subjectCourse}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSubjectCourse(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Add Subject
              </Button>
            </div>
          </form>

          {/* Add Topic */}
          <form
            onSubmit={handleAddTopic}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4">Add Topic</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="topicName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Topic Name
                </label>
                <input
                  id="topicName"
                  type="text"
                  value={topicName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTopicName(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Operations"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="topicCourse"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Course
                </label>
                <select
                  id="topicCourse"
                  value={topicCourse}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTopicCourse(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="topicSubject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Subject
                </label>
                <select
                  id="topicSubject"
                  value={topicSubject}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTopicSubject(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects
                    .filter((s) => s.course === topicCourse)
                    .map((s) => (
                      <option key={s.name + s.course} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Add Topic
              </Button>
            </div>
          </form>

          {/* Add Subtopic */}
          <form
            onSubmit={handleAddSubtopic}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4">Add Subtopic</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="subtopicName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subtopic Name
                </label>
                <input
                  id="subtopicName"
                  type="text"
                  value={subtopicName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSubtopicName(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Addition"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subtopicCourse"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Course
                </label>
                <select
                  id="subtopicCourse"
                  value={subtopicCourse}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSubtopicCourse(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subtopicSubject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Subject
                </label>
                <select
                  id="subtopicSubject"
                  value={subtopicSubject}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSubtopicSubject(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects
                    .filter((s) => s.course === subtopicCourse)
                    .map((s) => (
                      <option key={s.name + s.course} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subtopicTopic"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Topic
                </label>
                <select
                  id="subtopicTopic"
                  value={subtopicTopic}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSubtopicTopic(e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a topic</option>
                  {topics
                    .filter(
                      (t) =>
                        t.course === subtopicCourse &&
                        t.subject === subtopicSubject
                    )
                    .map((t) => (
                      <option
                        key={t.name + t.subject + t.course}
                        value={t.name}
                      >
                        {t.name}
                      </option>
                    ))}
                </select>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Add Subtopic
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
