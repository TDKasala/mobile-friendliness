
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Pricing from './pages/Pricing';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Subscription from './pages/Subscription';
import Jobs from './pages/Jobs';
import ATSSimulator from './pages/ATSSimulator';
import SuccessStories from './pages/SuccessStories';
import CVGuide from './pages/CVGuide';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Templates from './pages/Templates';
import Toolkit from './pages/Toolkit';
import JobFitQuiz from './pages/JobFitQuiz';
import WhatsAppWebhook from './pages/WhatsAppWebhook';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import PaymentFailure from './pages/PaymentFailure';
import ATSScorePage from './pages/ATSScore';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/ats-score" element={<ATSScorePage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/ats-simulator" element={<ATSSimulator />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/cv-guide" element={<CVGuide />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/job-fit-quiz" element={<JobFitQuiz />} />
              <Route path="/whatsapp-webhook" element={<WhatsAppWebhook />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/payment/failure" element={<PaymentFailure />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
