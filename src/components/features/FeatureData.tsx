
import {
  Upload,
  BarChart,
  FileText,
  Star,
  Smartphone,
  MessageSquare,
  Clock,
  Award,
  Users
} from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  isPremium?: boolean;
}

export const featureItems: FeatureItem[] = [
  {
    icon: <Upload size={24} />,
    title: "Multiple CV Upload Formats",
    description: "Upload your CV in PDF, DOCX, TXT, or ODT formats. You can even send it via WhatsApp for easy mobile access."
  },
  {
    icon: <BarChart size={24} />,
    title: "ATS Scoring System",
    description: "Get an overall ATS score (0-100) and understand how well your CV performs against applicant tracking systems.",
    isPremium: false
  },
  {
    icon: <FileText size={24} />,
    title: "Job Description Matching",
    description: "Paste a job posting to extract keywords and receive tailored suggestions to align your CV with specific opportunities."
  },
  {
    icon: <Star size={24} />,
    title: "AI-Powered Recommendations",
    description: "Receive intelligent suggestions to improve keyword matching, formatting, and content, including B-BBEE compliance tips.",
    isPremium: true
  },
  {
    icon: <Smartphone size={24} />,
    title: "Mobile Optimization",
    description: "Access ATSBoost on any device with our fully responsive design optimized for South Africa's mobile-first internet users."
  },
  {
    icon: <MessageSquare size={24} />,
    title: "WhatsApp Integration",
    description: "Get job alerts, CV tips, and support via WhatsApp, South Africa's most popular messaging platform.",
    isPremium: true
  },
  {
    icon: <Clock size={24} />,
    title: "Pay-As-You-Use Option",
    description: "Need a one-time deep analysis? Pay only R30 for comprehensive CV feedback without a subscription."
  },
  {
    icon: <Award size={24} />,
    title: "Gamified CV Improvement",
    description: "Complete our 'CV Quest' to earn points and badges while improving your CV, with a 3-day premium trial as a reward."
  },
  {
    icon: <Users size={24} />,
    title: "Refer-a-Friend Program",
    description: "Earn a free deep analysis for every three friends who sign up. Help your network while getting rewards."
  }
];
