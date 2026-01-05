import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const PrivacyAndSafetySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  return (
    <AppLayout title="Privacy and Safety">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Privacy & Safety</h1>
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Profile Visibility</h2>
              <p className="text-sm text-muted-foreground">Control who can see your profile.</p>
            </div>
            <Switch checked={profileVisibility} onCheckedChange={setProfileVisibility} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Location Sharing</h2>
              <p className="text-sm text-muted-foreground">Allow others to see your location.</p>
            </div>
            <Switch checked={locationSharing} onCheckedChange={setLocationSharing} />
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PrivacyAndSafetySettings;
