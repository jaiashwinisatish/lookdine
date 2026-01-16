
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileEdit() {
  return (
    <AppLayout title="Edit Profile">
      <div className="p-4 space-y-4 max-w-md mx-auto">
        <div className="space-y-2">
          <label>Name</label>
          <Input defaultValue="Current User" />
        </div>
        <div className="space-y-2">
          <label>Bio</label>
          <Input defaultValue="I love traveling!" />
        </div>
        <Button className="w-full">Save Changes</Button>
      </div>
    </AppLayout>
  );
}
