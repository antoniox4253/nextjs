import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
}

const MessageInbox = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Mock messages - In a real app, these would come from your backend
  const messages: Message[] = [
    {
      id: 1,
      sender: "GuildMaster",
      subject: "Guild Invitation",
      preview: "Would you like to join our guild?",
      timestamp: "2024-02-20",
      read: false,
    },
    {
      id: 2,
      sender: "Trader",
      subject: "Trade Offer",
      preview: "I have some rare items for sale",
      timestamp: "2024-02-19",
      read: true,
    },
  ];

  const handleNewMessage = () => {
    toast({
      title: t('comingSoon'),
      description: t('featureInDevelopment'),
    });
  };

  return (
    <Card className="bg-solo-dark/90 border-solo-purple/30 backdrop-blur-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">{t('messages')}</h3>
        <Button onClick={handleNewMessage} className="bg-solo-purple hover:bg-solo-purple/80">
          <Send className="h-4 w-4 mr-2" />
          {t('newMessage')}
        </Button>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                message.read ? "bg-solo-dark/50" : "bg-solo-purple/20"
              } hover:bg-solo-purple/30`}
            >
              <div className="flex items-center gap-2">
                <Mail className={`h-4 w-4 ${message.read ? "text-solo-gray" : "text-solo-purple"}`} />
                <span className="font-medium text-white">{message.sender}</span>
                <span className="text-xs text-solo-gray ml-auto">{message.timestamp}</span>
              </div>
              <h4 className="text-sm font-medium text-white mt-1">{message.subject}</h4>
              <p className="text-xs text-solo-gray mt-1">{message.preview}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default MessageInbox;