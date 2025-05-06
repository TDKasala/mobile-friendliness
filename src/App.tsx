
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WhatsAppSupport from "./components/WhatsAppSupport";
import { AuthProvider } from "./contexts/AuthContext";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const ATSSimulator = lazy(() => import("./pages/ATSSimulator"));
const JobFitQuiz = lazy(() => import("./pages/JobFitQuiz"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Templates = lazy(() => import("./pages/Templates"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const Toolkit = lazy(() => import("./pages/Toolkit"));
const WhatsAppWebhook = lazy(() => import("./pages/WhatsAppWebhook"));
const Jobs = lazy(() => import("./pages/Jobs"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ"));
const CVGuide = lazy(() => import("./pages/CVGuide"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const Pricing = lazy(() => import("./pages/Pricing"));

// Payment pages
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));

// Auth pages
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Simple loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sa-blue mx-auto mb-4"></div>
      <p className="text-sa-gray">Loading...</p>
    </div>
  </div>
);

// Configure QueryClient with settings for mobile optimization
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetch on window focus for mobile
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (replaces deprecated cacheTime)
      retry: 1, // Fewer retries on mobile to save bandwidth
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/ats-simulator" element={<ATSSimulator />} />
              <Route path="/job-fit-quiz" element={<JobFitQuiz />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/toolkit" element={<Toolkit />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/about" element={<About />} />
              <Route path="/whatsapp-webhook" element={<WhatsAppWebhook />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/cv-guide" element={<CVGuide />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/legal/:tab" element={<Legal />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Payment Routes - Updated to match edge function redirect URLs */}
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppSupport />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
