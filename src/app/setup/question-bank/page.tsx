"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth";
import { TreeNode } from "@/types/Curriculum";
import { Problem } from "@/types/Problem";
import { apiService } from "@/lib/api";
import CompactMillerColumns from "@/components/setup/CompactMillerColumns";
import CurriculumBreadcrumb from "@/components/setup/CurriculumBreadcrumb";
import Button from "@/components/ui/Button";

export default function QuestionBankPage() {
  const { user } = useAuthStore();
  const [curriculum, setCurriculum] = useState<TreeNode[]>([]);
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TreeNode | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TreeNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TreeNode | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<TreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  };

  const selectedPath = [
    selectedCourse,
    selectedSubject,
    selectedTopic,
    selectedSubtopic
  ].filter((node): node is TreeNode => node !== null);

  const loadQuestions = useCallback(async (page: number) => {
    if (!user || (!selectedCourse && !selectedSubject && !selectedTopic && !selectedSubtopic)) {
      setQuestions([]);
      setTotalPages(0);
      return;
    }

    setIsLoadingQuestions(true);
    try {
      const token = await user.getIdToken();
      const params = new URLSearchParams({ page: page.toString() });
      
      if (selectedSubtopic) {
        params.append('subtopicId', selectedSubtopic.id.replace('subtopic_', ''));
      } else if (selectedTopic) {
        params.append('topicId', selectedTopic.id.replace('topic_', ''));
      } else if (selectedSubject) {
        params.append('subjectId', selectedSubject.id.replace('subject_', ''));
      } else if (selectedCourse) {
        params.append('courseId', selectedCourse.id.replace('course_', ''));
      }

      const response = await fetch(`/api/problems?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const result = await response.json();
        setQuestions(result.data || []);
        setTotalPages(result.totalPages || 0);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  }, [user, selectedCourse, selectedSubject, selectedTopic, selectedSubtopic]);

  useEffect(() => {
    setCurrentPage(1);
    loadQuestions(1);
  }, [loadQuestions]);

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
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Question Bank</h2>
        <p className="text-gray-300">Browse questions by curriculum segment.</p>
      </div>

      <div className="mb-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Select Curriculum Path</h3>
        <CompactMillerColumns
          data={curriculum}
          selectedPath={selectedPath}
          onSelectionChange={handlePathChange}
        />
        <div className="mt-4">
          <CurriculumBreadcrumb selectedPath={selectedPath} />
        </div>
      </div>

      {selectedPath.length > 0 && (
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Questions {isLoadingQuestions ? "(Loading...)" : `(${questions.length})`}
          </h3>
          
          {questions.length === 0 && !isLoadingQuestions ? (
            <p className="text-gray-400">No questions found for this curriculum segment.</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {questions.map((question) => (
                  <div key={question.id} className="p-4 bg-gray-700 rounded border border-gray-600">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-400">{question.typeCode}</span>
                      <div className="flex space-x-2 text-sm text-gray-400">
                        <span>{question.difficulty}</span>
                        <span>•</span>
                        <span>{question.suggestedPoints} pts</span>
                        <span>•</span>
                        <span>{question.suggestedTime} min</span>
                      </div>
                    </div>
                    <p className="text-white mb-2">{question.statement}</p>
                    <p className="text-green-400 text-sm mb-2">Answer: {question.answer}</p>
                    <p className="text-gray-300 text-sm">{question.explanation}</p>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                  <Button
                    onClick={() => loadQuestions(currentPage - 1)}
                    disabled={currentPage === 1 || isLoadingQuestions}
                    size="sm"
                  >
                    Previous
                  </Button>
                  <span className="text-white px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => loadQuestions(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoadingQuestions}
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}