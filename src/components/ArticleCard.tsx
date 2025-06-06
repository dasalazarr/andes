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
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  readMoreUrl: string;
  date?: string;
  author?: string;
  onClick?: () => void;
}

const ArticleCard = ({
  title = "How to prepare for your first marathon",
  excerpt = "Essential tips for beginners who want to complete their first 42km race successfully and without injuries.",
  imageUrl = "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
  readMoreUrl = "#",
  date = "May 15, 2023",
  author = "Andes Coach",
  onClick,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full bg-white border border-gray-200">
      <div className="w-full h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
      </div>
      <CardHeader className="pb-2 flex-1">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>{date}</span>
          <span>{author}</span>
        </div>
        <CardTitle className="text-lg md:text-xl line-clamp-2 text-gray-900 mb-2">
          {title}
        </CardTitle>
        <CardContent className="p-0">
          <CardDescription className="line-clamp-3 text-gray-600 text-sm">
            {excerpt}
          </CardDescription>
        </CardContent>
      </CardHeader>
      <CardFooter className="pt-0">
        {onClick ? (
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            onClick={onClick}
          >
            <span className="flex items-center text-black font-medium">
              Read more <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
            asChild
          >
            <a
              href={readMoreUrl}
              className="flex items-center text-black font-medium"
            >
              Read more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
