
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CVUpload from "@/components/CVUpload";
import SubscriptionStatus from "@/components/SubscriptionStatus";

const ATSSimulator = () => {
  // Simulated subscription data - in a real app, this would come from a database
  const userSubscription = {
    tier: "free" as const
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <section className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50 dark:from-sa-blue dark:to-sa-blue/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 text-sa-blue dark:text-white">
                ATS Simulator
              </h1>
              <p className="text-sa-gray dark:text-gray-300">
                Upload your CV to see how Applicant Tracking Systems evaluate it. Get a score and actionable feedback
                tailored for South African job applications.
              </p>
              <p className="text-sa-gray dark:text-gray-300 mt-2">
                <strong>NEW:</strong> Add a job description to get personalized recommendations on how to tailor your CV for specific positions.
              </p>
            </div>
          </div>
        </section>
        
        {/* Subscription Status */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <SubscriptionStatus 
                tier={userSubscription.tier}
                showUpgradeButton={true}
              />
            </div>
          </div>
        </section>
        
        <CVUpload />
        <section className="py-16 bg-gray-50 dark:bg-sa-blue/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-sa-blue dark:text-white text-center">
                How Our ATS Simulator Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-sa-blue/20 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-sa-blue/10 dark:bg-sa-blue/30 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sa-blue dark:text-sa-green font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-sa-blue dark:text-white">Upload Your CV</h3>
                  <p className="text-sa-gray dark:text-gray-300">
                    Upload your CV in PDF, DOCX, TXT, or ODT format through our secure platform.
                  </p>
                </div>
                <div className="bg-white dark:bg-sa-blue/20 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-sa-blue/10 dark:bg-sa-blue/30 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sa-blue dark:text-sa-green font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-sa-blue dark:text-white">ATS Analysis</h3>
                  <p className="text-sa-gray dark:text-gray-300">
                    Our system parses your CV just like an ATS would, analyzing keywords, formatting, and structure.
                  </p>
                </div>
                <div className="bg-white dark:bg-sa-blue/20 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-sa-blue/10 dark:bg-sa-blue/30 rounded-full flex items-center justify-center mb-4">
                    <span className="text-sa-blue dark:text-sa-green font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-sa-blue dark:text-white">Get Results</h3>
                  <p className="text-sa-gray dark:text-gray-300">
                    Receive an instant ATS score with detailed feedback and improvement suggestions.
                  </p>
                </div>
              </div>
              
              {/* Job Description Matching Info */}
              <div className="mt-12 bg-white dark:bg-sa-blue/20 p-6 rounded-lg shadow-sm border-l-4 border-sa-yellow">
                <h3 className="text-lg font-semibold mb-2 text-sa-blue dark:text-white">
                  Job Description Matching
                </h3>
                <p className="text-sa-gray dark:text-gray-300 mb-4">
                  Paste a specific job description when uploading your CV to get tailored feedback on how well your CV matches the requirements.
                  Our AI will analyze the job posting for key skills and qualifications and compare them to your CV.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-sa-green/10 dark:bg-sa-green/30 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-sa-green dark:text-sa-yellow font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sa-blue dark:text-white">Identify Missing Keywords</h4>
                      <p className="text-sm text-sa-gray dark:text-gray-300">
                        See which important keywords from the job posting are missing in your CV
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-sa-green/10 dark:bg-sa-green/30 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-sa-green dark:text-sa-yellow font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sa-blue dark:text-white">Tailored Recommendations</h4>
                      <p className="text-sm text-sa-gray dark:text-gray-300">
                        Get specific suggestions to improve your CV for that particular job
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ATSSimulator;
