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
import { Download, Construction } from "lucide-react";

interface UnderConstructionPlanCardProps {
  title: string | { en: string; es: string };
  description: string | { en: string; es: string };
  duration: string | { en: string; es: string };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const UnderConstructionPlanCard = ({
  title,
  description,
  duration,
  difficulty,
}: UnderConstructionPlanCardProps) => {
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
    <div className="relative w-full max-w-md h-full">
      {/* The base card, which will be blurred */}
      <Card className="w-full h-full bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden flex flex-col blur-sm pointer-events-none">
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
            <p className="text-sm text-gray-400">{getText(duration)}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-300">{getText(description)}</p>
        </CardContent>
        <CardFooter className="pt-4">
          <Button disabled className="w-full bg-gray-700 text-gray-300 cursor-not-allowed">
            <Construction className="mr-2 h-4 w-4" />
            {language === 'es' ? 'En Construcción' : 'Coming Soon'}
          </Button>
        </CardFooter>
      </Card>

      {/* "Coming Soon" Overlay */}
      <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center z-10 p-4 text-center">
        <Construction className="w-10 h-10 text-purple-400 mb-4" />
        <h3 className="text-lg font-bold text-white mb-1">Próximamente</h3>
        <p className="text-sm text-gray-300">
          Este plan de entrenamiento está en desarrollo.
        </p>
      </div>
    </div>
  );
};

export default UnderConstructionPlanCard;
