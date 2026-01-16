
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

export default function HotelProfile() {
  const { id } = useParams();

  return (
    <AppLayout title="Hotel Profile">
      <div className="p-4 space-y-4">
        <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
        <h1 className="text-2xl font-bold">Hotel {id}</h1>
        <p className="text-muted-foreground">Mock Hotel Details</p>
      </div>
    </AppLayout>
  );
}
