import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";

const ServerChat = () => {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  // Mock messages - In a real app, these would come from your backend
  const messages = [
    { id: 1, sender: "Player1", message: "Hello everyone!", timestamp: "10:30" },
    { id: 2, sender: "Player2", message: "Hi there!", timestamp: "10:31" },
    { id: 3, sender: "CurrentUser", message: "How's the game going?", timestamp: "10:32", isCurrentUser: true },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Here you would typically send the message to your backend
    setMessage("");
  };

  return (
    <Card className="bg-solo-dark/90 border-solo-purple/30 backdrop-blur-sm p-4">
      <h3 className="text-lg font-bold mb-4 text-white">{t('serverChat')}</h3>
      <ScrollArea className="h-[200px] mb-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              sender={msg.sender}
              message={msg.message}
              timestamp={msg.timestamp}
              isCurrentUser={msg.isCurrentUser}
            />
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('typeMessage')}
          className="bg-solo-dark/50 border-solo-purple/30"
        />
        <Button type="submit" className="bg-solo-purple hover:bg-solo-purple/80">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
};

export default ServerChat;