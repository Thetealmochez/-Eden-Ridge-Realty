
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface UserData {
  preference?: 'rent' | 'buy';
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
  bedrooms?: number;
  name?: string;
  phone?: string;
  email?: string;
  timeline?: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState('greeting');
  const [userData, setUserData] = useState<UserData>({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello! I'm Eden, your AI assistant from Eden Ridge Realty. I'm here to help you find your dream property in Kenya. Are you looking to rent or buy a property?");
    }
  }, [isOpen]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        content,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue.trim().toLowerCase();
    addUserMessage(inputValue);
    setInputValue('');

    // Process user input based on current step
    await processUserInput(userInput);
  };

  const processUserInput = async (input: string) => {
    switch (currentStep) {
      case 'greeting':
        if (input.includes('rent')) {
          setUserData(prev => ({ ...prev, preference: 'rent' }));
          setCurrentStep('location');
          addBotMessage("Great! I'll help you find a rental property. Which area in Kenya are you interested in? (e.g., Karen, Westlands, Kilimani, Mombasa, etc.)");
        } else if (input.includes('buy')) {
          setUserData(prev => ({ ...prev, preference: 'buy' }));
          setCurrentStep('location');
          addBotMessage("Excellent! I'll help you find a property to purchase. Which area in Kenya are you interested in? (e.g., Karen, Westlands, Kilimani, Mombasa, etc.)");
        } else {
          addBotMessage("I'd be happy to help! Please let me know if you're looking to rent or buy a property.");
        }
        break;

      case 'location':
        setUserData(prev => ({ ...prev, location: input }));
        setCurrentStep('budget');
        addBotMessage(`Perfect! ${input} is a great area. What's your budget range? Please provide minimum and maximum amounts (e.g., "50,000 to 150,000" or "5M to 15M")`);
        break;

      case 'budget':
        const budgetMatch = input.match(/(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|m|million|thousand)?\s*(?:to|-)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|m|million|thousand)?/i);
        if (budgetMatch) {
          let min = parseFloat(budgetMatch[1].replace(/,/g, ''));
          let max = parseFloat(budgetMatch[2].replace(/,/g, ''));
          
          // Handle K and M multipliers
          if (input.includes('k') || input.includes('thousand')) {
            min *= 1000;
            max *= 1000;
          } else if (input.includes('m') || input.includes('million')) {
            min *= 1000000;
            max *= 1000000;
          }
          
          setUserData(prev => ({ ...prev, budgetMin: min, budgetMax: max }));
          setCurrentStep('bedrooms');
          addBotMessage("Got it! How many bedrooms are you looking for?");
        } else {
          addBotMessage("I didn't quite catch your budget range. Could you please specify it like '50,000 to 150,000' or '5M to 15M'?");
        }
        break;

      case 'bedrooms':
        const bedroomsMatch = input.match(/(\d+)/);
        if (bedroomsMatch) {
          setUserData(prev => ({ ...prev, bedrooms: parseInt(bedroomsMatch[1]) }));
          setCurrentStep('name');
          addBotMessage("Perfect! Now, may I have your name so I can assist you better?");
        } else {
          addBotMessage("Please let me know how many bedrooms you need (e.g., 1, 2, 3, etc.)");
        }
        break;

      case 'name':
        setUserData(prev => ({ ...prev, name: input }));
        setCurrentStep('phone');
        addBotMessage(`Nice to meet you, ${input}! Could you please share your phone number so our team can contact you with suitable properties?`);
        break;

      case 'phone':
        setUserData(prev => ({ ...prev, phone: input }));
        setCurrentStep('email');
        addBotMessage("Great! And what's your email address?");
        break;

      case 'email':
        setUserData(prev => ({ ...prev, email: input }));
        setCurrentStep('timeline');
        addBotMessage("Almost done! When are you looking to move? (e.g., immediately, within 1 month, within 3 months, etc.)");
        break;

      case 'timeline':
        setUserData(prev => ({ ...prev, timeline: input }));
        await saveLead({ ...userData, timeline: input });
        setCurrentStep('complete');
        addBotMessage(`Thank you ${userData.name}! I've saved all your details. Our team will contact you soon with properties that match your criteria. Is there anything else I can help you with today?`);
        break;

      case 'complete':
        addBotMessage("I'm here if you need any more assistance with your property search. You can also browse our featured properties on the website while you wait for our team to contact you!");
        break;

      default:
        addBotMessage("I'm here to help you find your perfect property. Let's start fresh - are you looking to rent or buy?");
        setCurrentStep('greeting');
    }
  };

  const saveLead = async (data: UserData) => {
    try {
      // Convert messages to a JSON-serializable format
      const serializedMessages = messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        isBot: msg.isBot,
        timestamp: msg.timestamp.toISOString()
      }));

      const leadData = {
        name: data.name || '',
        email: data.email || '',
        phone: data.phone,
        preference: data.preference,
        location_preference: data.location,
        budget_min: data.budgetMin,
        budget_max: data.budgetMax,
        bedrooms_preference: data.bedrooms,
        timeline: data.timeline,
        source: 'ai_assistant',
        conversation_data: {
          messages: serializedMessages,
          userData: data
        },
        lead_score: calculateLeadScore(data)
      };

      const { error } = await supabase
        .from('leads')
        .insert(leadData);

      if (error) {
        console.error('Error saving lead:', error);
        toast({
          title: "Error",
          description: "There was an issue saving your information. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Your information has been saved successfully!",
        });
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const calculateLeadScore = (data: UserData): number => {
    let score = 0;
    if (data.name) score += 20;
    if (data.email) score += 20;
    if (data.phone) score += 20;
    if (data.preference) score += 10;
    if (data.location) score += 10;
    if (data.budgetMin && data.budgetMax) score += 15;
    if (data.timeline) score += 5;
    return score;
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep('greeting');
    setUserData({});
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'} shadow-xl border-2 border-primary/20`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">E</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Eden AI Assistant</h3>
              <p className="text-xs opacity-80">Online now</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="h-64 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {currentStep === 'complete' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={resetChat}
                >
                  Start New Conversation
                </Button>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;
