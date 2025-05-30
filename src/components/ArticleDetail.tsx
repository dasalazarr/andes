import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface ArticleDetailProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ title, content, onClose }) => {
  // Función para manejar el clic en el fondo oscuro (para cerrar el modal)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Añadir un event listener para tecla Escape
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    // Prevenir el scroll del body mientras el modal está abierto
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          {content}
        </div>
        <div className="p-4 border-t sticky bottom-0 bg-white">
          <Button onClick={onClose} className="w-full" variant="outline">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
