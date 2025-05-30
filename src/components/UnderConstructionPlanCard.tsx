import React from "react";
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

interface UnderConstructionPlanCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  pdfUrl: string;
}

const UnderConstructionPlanCard = ({
  title,
  description,
  duration,
  difficulty,
  pdfUrl,
}: UnderConstructionPlanCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Advanced":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Card className="w-full max-w-md bg-white overflow-hidden transition-all hover:shadow-lg border border-gray-200 relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-yellow-100 bg-opacity-70 flex flex-col items-center justify-center z-10 p-4">
        <div className="bg-yellow-400 text-yellow-800 font-bold py-1 px-3 rounded-md transform -rotate-12 mb-2">
          COMING SOON
        </div>
        <p className="text-center text-yellow-800 font-medium mb-2">This training plan is under development</p>
        <div className="flex items-center justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="h-2 w-2 bg-yellow-600 rounded-full animate-bounce" 
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
      
      {/* Original Card Content (blurred) */}
      <div className="blur-[2px]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-gray-900">
              {title}
            </CardTitle>
            <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
          </div>
          <CardDescription className="text-sm text-gray-500">
            {duration}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{description}</p>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white"
            onClick={() => window.open(pdfUrl, "_blank")}
          >
            <Download size={16} />
            Download PDF
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default UnderConstructionPlanCard;
