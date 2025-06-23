import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  pdfUrl: string;
}

const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose, planTitle, pdfUrl }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "leadMagnet", name, email, planTitle })
    })
      .then(() => {
        console.log('Form successfully submitted to Netlify');
        setIsSubmitted(true);
        // Opcional: iniciar la descarga del PDF automáticamente
        setTimeout(() => {
          window.open(pdfUrl, '_blank');
        }, 500);
      })
      .catch(error => {
        console.error('Error submitting form to Netlify:', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">¡Casi listo para correr!</DialogTitle>
          <DialogDescription>
            Recibe gratis el plan "{planTitle}" en tu correo y empieza tu entrenamiento hoy.
          </DialogDescription>
        </DialogHeader>
        {!isSubmitted ? (
          <form name="leadMagnet" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
            {/* Campo oculto para el nombre del formulario en Netlify */}
            <input type="hidden" name="form-name" value="leadMagnet" />
            {/* Campo oculto para el título del plan, que también queremos capturar */}
            <input type="hidden" name="planTitle" value={planTitle} />
            {/* Campo honeypot para Netlify (opcional pero recomendado) */}
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name" // Added name attribute
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu primer nombre"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email" // Added name attribute
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white">
                Obtener mi Plan Gratis
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-4 text-center">
            <h3 className="text-lg font-semibold">¡Excelente!</h3>
            <p className="text-gray-600 mt-2">
              Hemos enviado el plan a tu correo. La descarga también comenzará en breve.
            </p>
            <Button onClick={onClose} className="mt-4">
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;
