import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Story {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
}

// Mock stories data
const stories: Story[] = [
  { id: '1', name: 'Your Story', avatar: 'https://github.com/shadcn.png', hasStory: false },
  { id: '2', name: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', hasStory: true },
  { id: '3', name: 'Rahul', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', hasStory: true },
  { id: '4', name: 'Ananya', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', hasStory: true },
  { id: '5', name: 'Arjun', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', hasStory: true },
  { id: '6', name: 'La Trattoria', avatar: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100', hasStory: true },
  { id: '7', name: 'Sakura', avatar: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100', hasStory: true },
];

export function Stories() {
  return (
    <div className="w-full border-b border-border/50 py-3">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              to={story.name === 'Your Story' ? '/stories/create' : `/stories/view/${story.id}`}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
            <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer">
              <div className={cn(
                "rounded-full p-[2px]",
                story.hasStory ? "bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500" : "bg-transparent"
              )}>
                <Avatar className="h-14 w-14 border-2 border-background">
                  <AvatarImage src={story.avatar} alt={story.name} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {story.name.split(' ')[0]}
              </span>
            </Link>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}
