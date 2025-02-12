import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

const ChatMessage = ({ sender, message, timestamp, isCurrentUser }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 mb-4", isCurrentUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${sender}`} />
        <AvatarFallback>{sender[0]}</AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col max-w-[70%]", isCurrentUser && "items-end")}>
        <div className={cn(
          "rounded-lg px-3 py-2",
          isCurrentUser ? "bg-solo-purple text-white" : "bg-solo-dark/50 text-white"
        )}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-solo-gray mt-1">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;