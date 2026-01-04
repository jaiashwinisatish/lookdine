
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Camera } from "lucide-react";

export default function CreateStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative">
       {stream ? (
         <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
       ) : (
         <Button onClick={startCamera}>
           <Camera className="mr-2 h-4 w-4" /> Open Camera
         </Button>
       )}

       <div className="absolute bottom-10 w-full flex justify-center gap-4">
          <Button variant="secondary">Upload Photo</Button>
          {stream && <Button variant="destructive" className="rounded-full h-16 w-16"></Button>}
       </div>
    </div>
  );
}
