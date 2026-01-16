
import { AppLayout } from "@/components/layout/AppLayout";
import { Bell } from "lucide-react";

const notifications = [
    { id: 1, title: "New Message", desc: "You have a new message from Priya", time: "2m ago" },
    { id: 2, title: "Booking Confirmed", desc: "Your booking at Hotel A is confirmed", time: "1h ago" },
    { id: 3, title: "New Feature", desc: "Check out the new stories feature!", time: "1d ago" },
];

export default function NotificationsPage() {
  return (
    <AppLayout title="Notifications">
      <div className="p-4 space-y-4">
        {notifications.map(n => (
            <div key={n.id} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Bell className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">{n.title}</h3>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{n.time}</span>
                </div>
            </div>
        ))}
      </div>
    </AppLayout>
  );
}
