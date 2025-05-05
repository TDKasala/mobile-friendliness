
import React from "react";

interface DiscountInfoProps {
  remainingDiscounts: number;
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ remainingDiscounts }) => {
  return (
    <section className="py-8 pb-16 bg-gray-50 dark:bg-sa-blue/80">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4 text-sa-blue dark:text-white">
            About Our Launch Discount
          </h2>
          <p className="text-sa-gray dark:text-gray-300 mb-6">
            To celebrate our launch, we're offering a 50% discount on our Premium plan for the first 500 subscribers. 
            That's only R100/month instead of R200/month! Subscribe now to secure your discount!
          </p>
          <div className="flex justify-center">
            <div className="bg-white dark:bg-sa-blue/50 p-4 rounded-lg shadow-sm inline-block">
              <div className="text-sa-blue dark:text-white font-medium">Discount Remaining</div>
              <div className="text-2xl font-bold text-sa-green dark:text-sa-yellow">{remainingDiscounts}/500</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountInfo;
