import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAppMode } from '@/context/AppModeContext';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Settings,
  Heart,
  Calendar,
  MapPin,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Camera,
  Edit2,
  FileText,
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { mode, setMode, isTeenMode } = useAppMode();
  const { user, isAuthenticated, logout } = useAuth();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [visibilityEnabled, setVisibilityEnabled] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/login');
    }
  };

  const menuItems = [
    {
      icon: Heart,
      label: 'Favorites',
      description: '12 saved places',
      action: () => navigate('/favorites'),
    },
    {
      icon: Calendar,
      label: 'My Bookings',
      description: '3 upcoming',
      action: () => navigate('/bookings'),
    },
    {
      icon: MapPin,
      label: 'My Addresses',
      description: '2 saved locations',
      action: () => navigate('/addresses'),
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: notificationsEnabled ? 'Enabled' : 'Disabled',
      action: () => {},
      toggle: {
        value: notificationsEnabled,
        onChange: setNotificationsEnabled,
      },
    },
    {
      icon: Shield,
      label: 'Privacy & Safety',
      description: 'Manage your data',
      action: () => navigate('/policies/data'),
    },
    {
      icon: FileText,
      label: 'Terms & Conditions',
      description: 'Read our terms',
      action: () => navigate('/policies/terms'),
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'App preferences',
      action: () => navigate('/settings'),
    },
  ];

  return (
    <AppLayout title="Profile">
      <div className="space-y-5">
        {/* User Info Card */}
        {isAuthenticated && user && (
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-2">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </Badge>
              </div>
            </div>
          </Card>
        )}
        {/* Profile Header */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 h-20 gradient-primary opacity-80" />
          <div className="relative px-4 pb-4">
            <div className="flex items-end gap-4 pt-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
                  alt="Profile"
                  className="h-20 w-20 rounded-2xl border-4 border-card object-cover shadow-soft"
                />
                <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">Alex Johnson</h2>
                  <Badge variant={isTeenMode ? 'teen' : 'default'}>
                    {isTeenMode ? '16 yrs' : '24 yrs'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Food lover • Coffee addict</p>
              </div>
              <Button variant="outline" size="iconSm" onClick={() => navigate('/profile/edit')}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Mode Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isTeenMode ? 'gradient-teen' : 'gradient-primary'}`}>
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">
                  {isTeenMode ? 'Teen Mode (13-17)' : 'Adult Mode (18+)'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isTeenMode 
                    ? 'Safe & age-appropriate experience' 
                    : 'Full social features enabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={isTeenMode}
              onCheckedChange={(checked) => setMode(checked ? 'teen' : 'adult')}
            />
          </div>

          {isTeenMode && (
            <div className="mt-3 rounded-xl bg-teen-primary/10 p-3">
              <p className="text-xs text-teen-primary">
                👋 Teen Mode is active. Dating features are disabled for your safety. 
                You can connect with friends and discover great places!
              </p>
            </div>
          )}
        </Card>

        {/* Location & Visibility */}
        <Card className="divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Location Services</p>
                <p className="text-xs text-muted-foreground">Share approximate location</p>
              </div>
            </div>
            <Switch checked={locationEnabled} onCheckedChange={setLocationEnabled} />
          </div>
          
          {!isTeenMode && (
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Profile Visibility</p>
                  <p className="text-xs text-muted-foreground">Let others see you nearby</p>
                </div>
              </div>
              <Switch checked={visibilityEnabled} onCheckedChange={setVisibilityEnabled} />
            </div>
          )}
        </Card>

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {menuItems.map((item) => (
            item.toggle ? (
              <div
                key={item.label}
                className="flex w-full items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={item.toggle.value}
                  onCheckedChange={item.toggle.onChange}
                />
              </div>
            ) : (
              <button
                key={item.label}
                onClick={item.action}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            )
          ))}
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/5" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground">
          LookDine v1.0.0 • Made with ❤️ in India
        </p>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
