
import React from "react";
import { Link } from "react-router-dom";

interface SectionCalloutProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor?: string;
  textColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  borderColor?: string;
}

const SectionCallout = ({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor = "bg-white",
  textColor = "text-sa-gray",
  buttonBgColor = "bg-sa-green",
  buttonTextColor = "text-white",
  borderColor = "border-sa-green/10",
}: SectionCalloutProps) => {
  return (
    <section className={`py-8 ${bgColor} border-y ${borderColor}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-sa-blue mb-3">{title}</h2>
          <p className={`${textColor} mb-4`}>
            {description}
          </p>
          <Link 
            to={buttonLink} 
            className={`inline-block ${buttonBgColor} hover:${buttonBgColor}/90 ${buttonTextColor} py-2 px-6 rounded-lg transition-colors font-medium`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionCallout;
