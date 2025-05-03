
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion, QuizAnswer, CVTip } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, BookOpen, Cpu, Award, Target } from "lucide-react";

const JobFitQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [email, setEmail] = useState("");
  const [tips, setTips] = useState<CVTip[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: "industry",
      text: "What industry are you targeting with your CV?",
      type: "select",
      options: ["Technology", "Finance", "Healthcare", "Education", "Retail", "Manufacturing", "Other"]
    },
    {
      id: "experience",
      text: "How many years of work experience do you have?",
      type: "select",
      options: ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"]
    },
    {
      id: "jobLevel",
      text: "What job level are you applying for?",
      type: "radio",
      options: ["Entry-level", "Mid-level", "Senior", "Management", "Executive"]
    },
    {
      id: "skills",
      text: "What are your top technical skills? (comma separated)",
      type: "text"
    },
    {
      id: "challenges",
      text: "What's your biggest challenge when applying for jobs?",
      type: "select",
      options: [
        "Getting past ATS systems", 
        "Standing out from other candidates", 
        "Highlighting relevant experience", 
        "Explaining employment gaps", 
        "Other"
      ]
    }
  ];

  // Handle answer changes
  const handleAnswer = (questionId: string, value: string) => {
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex] = { questionId, answer: value };
      setAnswers(updatedAnswers);
    } else {
      setAnswers([...answers, { questionId, answer: value }]);
    }
  };

  // Navigate to next question
  const nextStep = () => {
    const currentQuestionId = questions[step].id;
    const hasAnswered = answers.some(a => a.questionId === currentQuestionId);
    
    if (!hasAnswered) {
      toast({
        title: "Please answer the question",
        description: "We need your answer to provide personalized tips",
        variant: "destructive"
      });
      return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Fixed: Show the email form when all questions are answered
      setStep(questions.length);
    }
  };

  // Navigate to previous question
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Get the current answer for a question
  const getCurrentAnswer = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.answer : "";
  };

  // Generate personalized tips based on quiz answers
  const generateTips = () => {
    // Simplified tip generation based on answers
    // In a real implementation, this would call an API
    const industry = answers.find(a => a.questionId === "industry")?.answer || "";
    const experience = answers.find(a => a.questionId === "experience")?.answer || "";
    const jobLevel = answers.find(a => a.questionId === "jobLevel")?.answer || "";
    const skills = answers.find(a => a.questionId === "skills")?.answer || "";
    const challenges = answers.find(a => a.questionId === "challenges")?.answer || "";
    
    const generatedTips: CVTip[] = [
      {
        id: "1",
        title: `Tailor for ${industry}`,
        description: `Use industry-specific keywords for ${industry} roles to improve ATS matching.`,
        text: "Use industry-specific keywords",
        category: "keywords",
        priority: "high"
      },
      {
        id: "2",
        title: "Experience highlighting",
        description: `With ${experience} experience, focus on quantifiable achievements rather than just responsibilities.`,
        text: "Focus on achievements",
        category: "content",
        priority: "medium"
      },
      {
        id: "3",
        title: `${jobLevel} formatting`,
        description: `For ${jobLevel} positions, ensure your CV is concise and emphasizes leadership skills.`,
        text: "Emphasize leadership",
        category: "formatting",
        priority: "medium"
      },
      {
        id: "4",
        title: "Skills optimization",
        description: `Highlight these key skills prominently: ${skills}`,
        text: "Highlight key skills",
        category: "skills",
        priority: "high"
      },
      {
        id: "5",
        title: "Address challenges",
        description: `To overcome "${challenges}", focus on targeted customization for each application.`,
        text: "Customize for each application",
        category: "strategy",
        priority: "medium"
      }
    ];
    
    return generatedTips;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to view your personalized tips",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        const generatedTips = generateTips();
        setTips(generatedTips);
        setQuizCompleted(true);
        setIsSubmitting(false);
        
        toast({
          title: "Quiz completed!",
          description: "Your personalized CV tips are ready",
        });
        
        // In a real app, we would send this data to Supabase
        console.log("Quiz data to be saved:", { email, answers });
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate your tips. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Render the current question
  const renderQuestion = (question: QuizQuestion) => {
    const currentAnswer = getCurrentAnswer(question.id);
    
    switch (question.type) {
      case "select":
        return (
          <Select
            value={currentAnswer}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => handleAnswer(question.id, value)}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mt-2"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "text":
      default:
        return (
          <Input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Type your answer here"
            className="w-full"
          />
        );
    }
  };

  // Get the icon for the current question
  const getQuestionIcon = (index: number) => {
    const icons = [
      <Briefcase key="industry" className="h-6 w-6 text-sa-blue" />,
      <BookOpen key="experience" className="h-6 w-6 text-sa-blue" />,
      <Award key="jobLevel" className="h-6 w-6 text-sa-blue" />,
      <Cpu key="skills" className="h-6 w-6 text-sa-blue" />,
      <Target key="challenges" className="h-6 w-6 text-sa-blue" />
    ];
    return icons[index] || icons[0];
  };

  // Render tips after quiz completion
  const renderTips = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-sa-blue">Your Personalized CV Tips</h3>
      
      {tips.map((tip) => (
        <div 
          key={tip.id} 
          className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex items-start">
            <div className={`
              h-8 w-8 flex items-center justify-center rounded-full mr-3
              ${tip.priority === 'high' ? 'bg-red-100 text-red-500' : 
                tip.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
                'bg-blue-100 text-blue-500'}
            `}>
              {tip.priority === 'high' ? '!' : tip.priority === 'medium' ? '!!' : 'i'}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sa-blue">{tip.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-4">
        <Button 
          variant="outline"
          onClick={() => {
            setStep(0);
            setQuizCompleted(false);
          }}
          className="mr-2"
        >
          Retake Quiz
        </Button>
        <Button>Upload Your CV</Button>
      </div>
    </div>
  );

  // Render email capture form
  const renderEmailForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-sa-blue mb-2">
          One last step - where should we send your tips?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Enter your email to view your personalized CV optimization tips
        </p>
        
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full"
          required
        />
      </div>
      
      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
        >
          Back
        </Button>
        
        <Button 
          type="submit" 
          className="bg-sa-green hover:bg-sa-green/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Get My Tips"}
        </Button>
      </div>
    </form>
  );

  // Render progress indicator
  const renderProgress = () => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-sa-blue font-medium">Question {step + 1} of {questions.length}</span>
        <span className="text-sm text-sa-gray">{Math.round(((step + 1) / questions.length) * 100)}% complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-2 bg-sa-blue rounded-full transition-all" 
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-sa-blue/30 rounded-lg p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-sa-blue/70 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-sa-blue dark:text-white mb-4">Job Fit Quiz</h2>
      <p className="text-sa-gray dark:text-gray-300 mb-6">
        Answer 5 quick questions to get personalized CV optimization tips for your job search
      </p>
      
      {!quizCompleted ? (
        step < questions.length ? (
          <div className="space-y-6">
            {renderProgress()}
            
            <div className="flex items-center gap-3 mb-4">
              {getQuestionIcon(step)}
              <h3 className="text-lg font-medium text-sa-blue dark:text-white">
                {questions[step].text}
              </h3>
            </div>
            
            {renderQuestion(questions[step])}
            
            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 0}
              >
                Back
              </Button>
              
              <Button 
                onClick={nextStep} 
                className="bg-sa-blue hover:bg-sa-blue/90 text-white dark:bg-sa-green dark:hover:bg-sa-green/90"
              >
                {step === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        ) : (
          renderEmailForm()
        )
      ) : (
        renderTips()
      )}
    </div>
  );
};

export default JobFitQuiz;
