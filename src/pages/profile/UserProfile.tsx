
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

export default function UserProfile() {
  const { id } = useParams();

  return (
    <AppLayout title="User Profile">
      <div className="p-4 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-24 w-24 rounded-full bg-gray-200"></div>
          <h1 className="text-2xl font-bold">User {id}</h1>
          <p className="text-muted-foreground">Mock User Bio</p>
        </div>
      </div>
    </AppLayout>
  );
}
