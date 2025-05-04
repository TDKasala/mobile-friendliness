
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Cancelled | ATSBoost</title>
        <meta name="description" content="Your payment was cancelled. You can try again whenever you're ready." />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-sa-blue/20 rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20 mb-4">
            <AlertCircle className="h-10 w-10 text-sa-yellow" />
          </div>
          
          <h1 className="text-2xl font-bold text-sa-blue dark:text-white mb-2">
            Payment Cancelled
          </h1>
          
          <p className="text-sa-gray dark:text-gray-300 mb-6">
            Your payment was cancelled. No worries! You can try again whenever you're ready.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-sa-blue hover:bg-sa-blue/90">
              <Link to="/subscription">Try Again</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentCancel;
