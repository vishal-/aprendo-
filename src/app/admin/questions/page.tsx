"use client";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase";
import { apiService } from "@/lib/api";

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

  useEffect(() => {
    if (userDetails && userDetails.role !== "admin") {
      router.push("/");
    }
  }, [userDetails, router]);

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

      const result = await apiService.createProblems(user, questions);
      toast.success(`${result.count} questions uploaded successfully!`);
      setJsonInput("");
    } catch (error) {
      toast.error("Invalid JSON format. Please check the console for more details.");
      console.error(error);
    }
  };


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
