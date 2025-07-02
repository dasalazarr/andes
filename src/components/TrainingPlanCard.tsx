import React from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { trackPlanDownload } from "../lib/analytics";

interface TrainingPlanCardProps {
  title: string | { en: string; es: string };
  description: string | { en: string; es: string };
  duration: string | { en: string; es: string };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  pdfUrl: string;
  onDownloadClick?: () => void;
}

const TrainingPlanCard = ({
  title = { en: "5K Training Plan", es: "Plan de 5K" },
  description = {
    en: "Perfect for beginners looking to complete their first 5K race.",
    es: "Perfecto para principiantes que buscan completar su primera carrera de 5K."
  },
  duration = { en: "8 weeks", es: "8 semanas" },
  difficulty = "Beginner",
  pdfUrl = "#",
  onDownloadClick,
}: TrainingPlanCardProps) => {
  const location = useLocation();
  const language = location.pathname.startsWith('/es') ? 'es' : 'en';
  
  // Helper function to get the correct language text
  const getText = (text: string | { en: string; es: string }) => {
    return typeof text === 'string' ? text : text[language];
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "border-green-500/30 bg-green-500/10 text-green-400";
      case "Intermediate":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      case "Advanced":
        return "border-purple-500/30 bg-purple-500/10 text-purple-400";
      default:
        return "border-gray-500/30 bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <Card className="w-full max-w-md bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-xl font-bold text-gray-100">
            {getText(title)}
          </CardTitle>
          <Badge className={`${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-400 pt-1">
          {getText(duration)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-300">{getText(description)}</p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          variant="default"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onDownloadClick || (() => {
            trackPlanDownload(getText(title));
            window.open(pdfUrl, "_blank");
          })}
        >
          <Download className="mr-2 h-4 w-4" />
          {language === 'es' ? 'Descargar Plan' : 'Download Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingPlanCard;
