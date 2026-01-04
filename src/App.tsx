import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppModeProvider } from "@/context/AppModeContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NearbyPage from "./pages/NearbyPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import BookingPage from "./pages/BookingPage";
import DecorationPage from "./pages/DecorationPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";

// Profile & Settings
import UserProfile from "./pages/profile/UserProfile";
import HotelProfile from "./pages/profile/HotelProfile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import SettingsPage from "./pages/settings/SettingsPage";
import DataPolicy from "./pages/policies/DataPolicy";
import SecurityPolicy from "./pages/policies/SecurityPolicy";

// Social
import StoryView from "./pages/social/StoryView";
import CreateStory from "./pages/social/CreateStory";
import NotificationsPage from "./pages/NotificationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppModeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nearby" element={<NearbyPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/decorate" element={<DecorationPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/stories/:id" element={<StoryPage />} />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/set-password" element={<SetPassword />} />

            {/* Profile & Settings */}
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/hotel/:id" element={<HotelProfile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/policies/data" element={<DataPolicy />} />
            <Route path="/policies/security" element={<SecurityPolicy />} />

            {/* Social */}
            <Route path="/stories/view/:id" element={<StoryView />} />
            <Route path="/stories/create" element={<CreateStory />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </AppModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
