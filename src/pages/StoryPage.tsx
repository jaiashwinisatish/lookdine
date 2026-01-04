import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const StoryPage = () => {
  const { id } = useParams();

  // Mock finding the story (in a real app, you'd fetch it)
  // Reusing the mock data from Stories.tsx would be better if exported,
  // but for now I'll just show the ID to verify routing.

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="p-4 flex items-center justify-between absolute top-0 w-full z-10">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
             <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story {id}</h1>
          <p className="text-gray-400">This is a placeholder for story content.</p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
