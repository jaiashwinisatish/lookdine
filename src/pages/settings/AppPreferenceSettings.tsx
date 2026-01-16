import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const AppPreferenceSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <AppLayout title="App Preferences">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">App Preferences</h1>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Dark Mode</h2>
              <p className="text-sm text-muted-foreground">Enable or disable dark mode.</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">Enable or disable notifications.</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AppPreferenceSettings;
