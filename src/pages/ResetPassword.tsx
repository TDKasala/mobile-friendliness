
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResetPasswordForm from "@/components/auth/ResetPassword";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Reset Password | ATSBoost</title>
        <meta name="description" content="Create a new password for your ATSBoost account" />
      </Helmet>

      <Header />

      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <ResetPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;
