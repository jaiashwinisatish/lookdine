import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { stories } from "@/components/social/Stories";

const StoryPage = () => {
  const { id } = useParams();

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="flex flex-col h-screen bg-black text-white items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
        <Link to="/">
          <Button variant="outline" className="text-black">
            Go Back
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="p-4 flex items-center justify-between absolute top-0 w-full z-10">
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
             <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Avatar className="h-24 w-24 mb-4 border-2 border-white">
          <AvatarImage src={story.avatar} alt={story.name} />
          <AvatarFallback>{story.name[0]}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{story.name}</h1>
          <p className="text-gray-400">Viewing story content for {story.name}.</p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
