import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Heart, 
  MessageCircle, 
  Share2,
  Camera,
  Grid,
  Bookmark,
  User as UserIcon,
  Settings,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface PublicUser {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
  coverPhoto: string;
  location: string;
  joinedDate: string;
  interests: string[];
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing: boolean;
}

interface Post {
  id: string;
  user: PublicUser;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const PublicUserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Mock data - in real app, this would be API calls
        const mockUser: PublicUser = {
          id: id!,
          name: "Sarah Johnson",
          username: "sarahj",
          email: "sarah.johnson@example.com",
          bio: "Food enthusiast 🍕 | Travel lover ✈️ | Coffee addict ☕ | Sharing my culinary adventures around the world",
          avatar: "https://ui-avatars.com/api/?name=Sarah&background=random",
          coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
          location: "New York, NY",
          joinedDate: "January 2023",
          interests: ["Food", "Travel", "Photography", "Coffee", "Music"],
          stats: {
            posts: 156,
            followers: 2847,
            following: 892
          },
          isFollowing: false
        };

        const mockPosts: Post[] = [
          {
            id: "1",
            user: mockUser,
            content: "Just discovered this amazing Italian restaurant in downtown! The pasta was absolutely divine 🍝",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db2?w=600",
            likes: 234,
            comments: 45,
            timestamp: "2 hours ago",
            isLiked: false
          },
          {
            id: "2",
            user: mockUser,
            content: "Weekend coffee vibes at my favorite spot ☕ Nothing beats a good cappuccino and a book",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
            likes: 189,
            comments: 23,
            timestamp: "1 day ago",
            isLiked: true
          },
          {
            id: "3",
            user: mockUser,
            content: "Travel tip: Always ask locals for their favorite restaurants. You'll discover the best hidden gems! 🗺️",
            likes: 567,
            comments: 89,
            timestamp: "3 days ago",
            isLiked: false
          }
        ];

        setUser(mockUser);
        setPosts(mockPosts);
        setIsFollowing(mockUser.isFollowing);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id, toast]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setUser(prev => prev ? {
      ...prev,
      isFollowing: !isFollowing,
      stats: prev ? {
        ...prev.stats,
        followers: isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1
      } : { posts: 0, followers: 0, following: 0 }
    } : null);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: user?.name
    });
  };

  const handleMessage = () => {
    navigate(`/chat?user=${id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user?.name}'s Profile`,
        text: `Check out ${user?.name}'s profile on LookDine!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard"
      });
    }
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo and Profile Header */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gray-200">
          <img
            src={user.coverPhoto}
            alt={`${user.name}'s cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16 mb-6">
            {/* Avatar */}
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
              <p className="text-gray-700 mt-2 max-w-md">{user.bio}</p>
              
              {/* Location and Join Date */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinedDate}</span>
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-2 mt-3">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "default"}
                className="min-w-24"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="icon" onClick={handleMessage}>
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 max-w-4xl mb-6">
        <div className="grid grid-cols-3 gap-4 py-4 border-y bg-white">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 max-w-4xl">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{post.user.name}</h4>
                        <span className="text-sm text-gray-600">@{post.user.username}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post image"
                        className="mt-3 rounded-lg w-full max-w-md object-cover"
                      />
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={post.isLiked ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="about" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Member Since</h4>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span>{user.joinedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  <Button onClick={handleMessage} className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PublicUserProfile;
