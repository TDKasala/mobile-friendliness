
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const PaymentFailure = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Failed | ATSBoost</title>
        <meta name="description" content="Your payment could not be processed. Please try again or contact support." />
      </Helmet>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-sa-blue/20 rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-sa-blue dark:text-white mb-2">
            Payment Failed
          </h1>
          
          <p className="text-sa-gray dark:text-gray-300 mb-6">
            We couldn't process your payment. Please check your payment details and try again.
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
    </div>
  );
};

export default PaymentFailure;
