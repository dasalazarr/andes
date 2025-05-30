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
      <Card className="border shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Solicita tu Plan Personalizado Beta
          </CardTitle>
          <CardDescription className="text-center">
            Completa el formulario a continuación para recibir un plan de
            entrenamiento adaptado a tus necesidades y objetivos.
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
              title="Formulario de solicitud de plan personalizado"
              className="w-full h-full"
            >
              Cargando formulario...
            </iframe>
          </div>

          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Al enviar este formulario, aceptas que utilicemos tus datos para
              crear tu plan personalizado y contactarte con información
              relevante.
            </p>
            <Button
              variant="outline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-2"
            >
              Volver arriba
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanRequestForm;
