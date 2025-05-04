
import React from "react";
import { Check } from "lucide-react";

const PremiumFeatures = () => {
  return (
    <div className="mt-12 bg-sa-blue dark:bg-sa-green/90 rounded-xl shadow-lg p-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:max-w-xl">
          <h3 className="text-2xl font-bold mb-3">
            Premium Features for Serious Job Seekers
          </h3>
          <p className="mb-4 text-white/90">
            Unlock our full suite of tools to maximize your employment opportunities in the competitive South African job market.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check size={16} className="mr-2 text-sa-yellow" />
              <span>Unlimited CV analyses and detailed reports</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="mr-2 text-sa-yellow" />
              <span>10 premium South African CV templates</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="mr-2 text-sa-yellow" />
              <span>Weekly job alerts via WhatsApp</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="mr-2 text-sa-yellow" />
              <span>Priority support and B-BBEE compliance tips</span>
            </li>
          </ul>
        </div>
        <div className="bg-white/10 p-6 rounded-lg text-center">
          <p className="text-sa-yellow font-semibold mb-2">Premium Subscription</p>
          <div className="text-3xl font-bold mb-2">R100<span className="text-lg font-normal">/month</span></div>
          <p className="text-sm mb-4 text-white/80">Cancel anytime</p>
          <button className="w-full bg-sa-yellow hover:bg-sa-yellow/90 text-sa-blue font-semibold py-2 px-4 rounded">
            Upgrade Now
          </button>
          <p className="text-xs mt-2 text-white/80">50% off first month for new users!</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;
