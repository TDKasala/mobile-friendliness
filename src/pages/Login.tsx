
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
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
        <title>Login | ATSBoost</title>
        <meta name="description" content="Log in to your ATSBoost account to optimize your CV for the South African job market" />
      </Helmet>

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default Login;
