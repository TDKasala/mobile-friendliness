
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactSection: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-sa-blue mb-3">Questions About Our Legal Policies?</h2>
      <p className="text-sa-gray mb-4">
        If you have any questions or concerns about our Terms of Service, Privacy Policy, or Cookies Policy, please don't hesitate to get in touch with us.
      </p>
      <Button className="bg-sa-blue hover:bg-sa-blue/90 text-white">
        <Link to="/contact">Contact Us</Link>
      </Button>
    </div>
  );
};

export default ContactSection;
