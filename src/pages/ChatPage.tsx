import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { chatConversations } from '@/data/mockData';
import { Search, Check, CheckCheck, Store, Trash2, XCircle, Image as ImageIcon, AlertTriangle, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  // Local state for cleared/deleted chats demo
  const [clearedChats, setClearedChats] = useState<string[]>([]);
  const [deletedChats, setDeletedChats] = useState<string[]>([]);

  const selectedConversation = chatConversations.find((c) => c.id === selectedChat);

  const handleClearChat = () => {
    if (selectedChat) {
        setClearedChats([...clearedChats, selectedChat]);
        toast.success("Chat cleared");
    }
  };

  const handleDeleteChat = () => {
    if (selectedChat) {
        setDeletedChats([...deletedChats, selectedChat]);
        setSelectedChat(null);
        toast.success("Chat deleted");
    }
  };

  const handleSendPhoto = () => {
      toast.info("Opening gallery...");
  };

  // Chat list view
  if (!selectedChat) {
    return (
      <AppLayout title="Messages">
        <div className="space-y-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
             <AlertTriangle className="h-4 w-4 shrink-0" />
             Chat will be Remove after 12AM everyday except 6 chats
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="h-11 rounded-xl border-0 bg-muted pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <Badge variant="default" className="cursor-pointer px-3 py-1.5">All</Badge>
            <Badge variant="secondary" className="cursor-pointer px-3 py-1.5">People</Badge>
            <Badge variant="secondary" className="cursor-pointer px-3 py-1.5">Venues</Badge>
          </div>

          {/* Conversations */}
          <div className="space-y-2">
            {chatConversations.filter(c => !deletedChats.includes(c.id)).map((chat) => (
              <Card
                key={chat.id}
                className="flex items-center gap-3 p-3 cursor-pointer hover:shadow-soft transition-all"
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {chat.isVenue && (
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Store className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Individual chat view
  return (
    <AppLayout showHeader={false}>
      {/* Chat Header */}
      <div className="sticky -top-4 -mx-4 mb-4 flex items-center gap-3 border-b border-border bg-card/95 backdrop-blur-lg p-4 z-10">
        <Button variant="ghost" size="iconSm" onClick={() => setSelectedChat(null)}>
          ←
        </Button>
        <img
          src={selectedConversation?.avatar}
          alt={selectedConversation?.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium">{selectedConversation?.name}</h3>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="iconSm">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive" onClick={handleDeleteChat}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Chat
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClearChat}>
                    <XCircle className="mr-2 h-4 w-4" /> Clear Chat
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 pb-20">
        {!clearedChats.includes(selectedChat!) ? (
            <>
                {/* Sample messages */}
                <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2">
                    <p className="text-sm">Hey! How's it going? 👋</p>
                    <span className="text-[10px] text-muted-foreground">2:30 PM</span>
                </div>
                </div>

                <div className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">
                    <p className="text-sm">Hi! I'm good, thanks! Just browsing some cafes nearby.</p>
                    <div className="flex items-center justify-end gap-1">
                    <span className="text-[10px] opacity-80">2:32 PM</span>
                    <CheckCheck className="h-3 w-3" />
                    </div>
                </div>
                </div>

                <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2">
                    <p className="text-sm">{selectedConversation?.lastMessage}</p>
                    <span className="text-[10px] text-muted-foreground">Just now</span>
                </div>
                </div>
            </>
        ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                Chat cleared
            </div>
        )}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-24 left-4 right-4 max-w-md mx-auto">
        <div className="flex items-center gap-2 rounded-2xl bg-card border border-border p-2 shadow-soft">
          <Button variant="ghost" size="iconSm" onClick={handleSendPhoto}>
             <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0"
          />
          <Button variant="hero" size="icon" disabled={!message.trim()}>
            →
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
