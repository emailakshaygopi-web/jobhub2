import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Maximize2, Minimize2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatbotProps {
  isFloating?: boolean;
  onClose?: () => void;
}

export default function AIChatbot({ isFloating = false, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m your AI assistant for JobHub. I can help you with job searching strategies, resume optimization, interview preparation, salary negotiation, and more. What can I help you with today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(!isFloating);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest('POST', '/api/ai-chat', { message });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString() + '_assistant',
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: () => {
      toast({
        title: "Chat Error",
        description: "Unable to get response. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    sendMessageMutation.mutate(input);
  };

  const quickQuestions = [
    "How do I optimize my resume?",
    "What are good interview questions to prepare?",
    "How should I negotiate salary?",
    "Tips for job searching?",
    "How to write a cover letter?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  if (isFloating && !isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-blue-600 hover:bg-blue-700 shadow-lg"
          data-testid="button-open-chat"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </div>
    );
  }

  const containerClass = isFloating 
    ? "fixed bottom-4 right-4 z-50 w-96 h-[500px] shadow-2xl" 
    : "w-full h-[600px]";

  return (
    <div className={containerClass}>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              AI Assistant
              <Badge variant="secondary" className="text-xs">Pro</Badge>
            </CardTitle>
            <div className="flex gap-1">
              {isFloating && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    data-testid="button-minimize-chat"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    data-testid="button-close-chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 gap-4">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                    data-testid={`message-${message.role}-${message.id}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              {sendMessageMutation.isPending && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs"
                    data-testid={`button-quick-question-${index}`}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about job searching..."
              disabled={sendMessageMutation.isPending}
              data-testid="input-chat-message"
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={!input.trim() || sendMessageMutation.isPending}
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}