
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <AppLayout title="Settings">
      <div className="p-4">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
            <TabsTrigger value="bookings">My Booking</TabsTrigger>
            <TabsTrigger value="address">My Address</TabsTrigger>
            <TabsTrigger value="favs">Fav Hotels</TabsTrigger>
            <TabsTrigger value="prefs">App Preference</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">No bookings yet.</TabsContent>
          <TabsContent value="address">No saved addresses.</TabsContent>
          <TabsContent value="favs">No favorite hotels.</TabsContent>
          <TabsContent value="prefs">
             <div className="space-y-4">
               <h3 className="font-medium">Theme</h3>
               {/* Toggle theme logic here */}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
