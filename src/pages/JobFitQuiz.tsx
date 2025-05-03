
import { Helmet } from "react-helmet";
import JobFitQuiz from "@/components/JobFitQuiz";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JobFitQuizPage = () => {
  return (
    <>
      <Helmet>
        <title>Job Fit Quiz | ATSBoost</title>
        <meta name="description" content="Take our job fit quiz to get personalized CV optimization tips" />
      </Helmet>

      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-sa-blue dark:text-white mb-4">
              Personalized CV Tips Quiz
            </h1>
            <p className="text-lg text-sa-gray dark:text-gray-300">
              Discover how to optimize your CV for your specific industry and career level
            </p>
          </div>
          
          <JobFitQuiz />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default JobFitQuizPage;
