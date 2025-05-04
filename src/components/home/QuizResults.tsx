
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CVTip } from "@/lib/types";

const QuizResults = () => {
  const [quizData, setQuizData] = useState<{
    completed: boolean;
    timestamp: string;
    tips: CVTip[];
  } | null>(null);

  useEffect(() => {
    const savedQuizData = localStorage.getItem("jobFitQuizResults");
    if (savedQuizData) {
      setQuizData(JSON.parse(savedQuizData));
    }
  }, []);

  if (!quizData || !quizData.completed) {
    return null;
  }

  const date = new Date(quizData.timestamp);
  const formattedDate = date.toLocaleDateString();

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-green-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-sa-blue">Your CV Optimization Tips</h3>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      
      <div className="space-y-2 mb-3">
        {quizData.tips.slice(0, 3).map((tip) => (
          <div key={tip.id} className="flex items-start">
            <div className={`h-4 w-4 rounded-full mr-2 mt-1 flex-shrink-0 ${
              tip.priority === 'high' ? 'bg-red-400' : 
              tip.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
            }`} />
            <p className="text-sm text-gray-600">{tip.text}</p>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Link
          to="/job-fit-quiz"
          className="text-sm text-sa-green hover:underline"
        >
          View all tips
        </Link>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => {
            localStorage.removeItem("jobFitQuizResults");
            setQuizData(null);
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Clear results
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
