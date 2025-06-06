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
import { trackPlanDownload } from "../lib/analytics";

interface TrainingPlanCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  pdfUrl: string;
  onDownload?: () => void;
}

const TrainingPlanCard = ({
  title = "5K Training Plan",
  description = "Perfect for beginners looking to complete their first 5K race. Includes gradual build-up with walk/run intervals.",
  duration = "8 weeks",
  difficulty = "Beginner",
  pdfUrl = "#",
  onDownload,
}: TrainingPlanCardProps) => {
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
    <Card className="w-full max-w-md bg-white overflow-hidden transition-all hover:shadow-lg border border-gray-200">
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
          onClick={() => {
            trackPlanDownload(title);
            if (onDownload) onDownload();
            window.open(pdfUrl, "_blank");
          }}
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingPlanCard;
