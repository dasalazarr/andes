import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanRequestFormProps {
  formUrl?: string;
}

const PlanRequestForm = ({
  formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdCxm5jtOQmhzQMlEQ3XYq9iUfSHXZN1zC_z7JqQKwgVPtHfg/viewform?embedded=true",
}: PlanRequestFormProps) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-background">
      <Card className="border border-gray-200 shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Request Your Beta Personalized Plan
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Complete the form below to receive a training plan tailored to your
            needs and goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full h-[600px] overflow-hidden">
            <iframe
              src={formUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Personalized plan request form"
              className="w-full h-full"
            >
              Loading form...
            </iframe>
          </div>

          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-4">
              By submitting this form, you agree that we may use your data to
              create your personalized plan and contact you with relevant
              information.
            </p>
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back to top
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanRequestForm;
