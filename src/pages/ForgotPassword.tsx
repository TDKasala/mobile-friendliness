
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForgotPasswordForm from "@/components/auth/ForgotPassword";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Forgot Password | ATSBoost</title>
        <meta name="description" content="Reset your ATSBoost account password" />
      </Helmet>

      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <ForgotPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
