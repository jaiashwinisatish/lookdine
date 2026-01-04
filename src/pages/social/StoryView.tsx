
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

export default function StoryView() {
  const { id } = useParams();

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center relative">
       <div className="text-white text-center">
         <h1 className="text-xl">Viewing Story {id}</h1>
         {/* Story content implementation */}
       </div>
    </div>
  );
}
