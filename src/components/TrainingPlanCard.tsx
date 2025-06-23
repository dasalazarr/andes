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
  onDownloadClick?: () => void; // Prop to override default download behavior
}

const TrainingPlanCard = ({
  title = "5K Training Plan",
  description = "Perfect for beginners looking to complete their first 5K race. Includes gradual build-up with walk/run intervals.",
  duration = "8 weeks",
  difficulty = "Beginner",
  pdfUrl = "#",
  onDownloadClick,
}: TrainingPlanCardProps) => {
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
            {title}
          </CardTitle>
          <Badge variant="outline" className={`whitespace-nowrap ${getDifficultyColor(difficulty)}`}>{difficulty}</Badge>
        </div>
        <CardDescription className="text-sm text-gray-400 pt-1">
          {duration}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          variant="default"
          className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
          onClick={() => {
            if (onDownloadClick) {
              onDownloadClick();
            } else {
              trackPlanDownload(title);
              window.open(pdfUrl, "_blank");
            }
          }}
        >
          <Download className="mr-2 h-4 w-4" /> Descargar Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingPlanCard;
