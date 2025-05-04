
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/dashboard");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Create Account | ATSBoost</title>
        <meta name="description" content="Sign up for ATSBoost to optimize your CV for South African job market with our affordable tools" />
      </Helmet>

      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SignUpForm />
          <div className="mt-6 text-center text-sm text-sa-gray">
            <p>
              Experience the most affordable CV optimization tools for the South African market at{" "}
              <a href="https://atsboost.co.za" className="text-sa-green font-medium">
                atsboost.co.za
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
