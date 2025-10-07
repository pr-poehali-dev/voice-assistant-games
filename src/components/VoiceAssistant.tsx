import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

interface VoiceAssistantProps {
  onBack: () => void;
}

const VoiceAssistant = ({ onBack }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Привет! Я Поезд Фредди! 🚂 Нажми на микрофон и задай мне вопрос!', isBot: true }
  ]);

  const responses = [
    'Отличный вопрос! Давай поиграем вместе! 🎮',
    'Ты молодец! Продолжай в том же духе! ⭐',
    'Как интересно! Расскажи мне больше! 🤔',
    'Ух ты! Это здорово! 🎉',
    'Я рад тебя слышать! Поехали дальше! 🚂',
    'Супер! Ты настоящий исследователь! 🔍',
    'Вау! Ты очень умный! 🧠',
    'Какая замечательная идея! 💡'
  ];

  const startListening = () => {
    setIsListening(true);
    
    setTimeout(() => {
      setIsListening(false);
      const userMessage = 'Привет, Фредди!';
      setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
      
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
      }, 500);
    }, 2000);

    toast({
      title: "Слушаю... 🎤",
      description: "Говори сейчас!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-mint/5 to-yellow/5 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-3xl border-2 border-mint text-mint hover:bg-mint hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl md:text-4xl text-mint font-fredoka">
            🎤 Поезд Фредди
          </h1>
          <div className="w-24" />
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-6 mb-6 h-[500px] overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-3xl ${
                    message.isBot
                      ? 'bg-gradient-to-r from-mint to-yellow text-white'
                      : 'bg-coral text-white'
                  }`}
                >
                  {message.isBot && (
                    <div className="text-2xl mb-2">🚂</div>
                  )}
                  <p className="text-lg">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-center">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`relative w-32 h-32 rounded-full transition-all ${
              isListening
                ? 'bg-coral animate-pulse scale-110'
                : 'bg-gradient-to-r from-mint to-yellow hover:scale-105'
            } shadow-2xl`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                name={isListening ? 'Radio' : 'Mic'}
                size={48}
                className="text-white"
              />
            </div>
            {isListening && (
              <div className="absolute -inset-2 rounded-full border-4 border-coral animate-ping" />
            )}
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xl font-fredoka text-gray-600">
            {isListening ? 'Слушаю тебя... 👂' : 'Нажми, чтобы говорить'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <Card className="bg-mint/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🗣️</div>
            <div className="font-nunito text-sm text-gray-600">Говори</div>
          </Card>
          <Card className="bg-yellow/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">👂</div>
            <div className="font-nunito text-sm text-gray-600">Слушай</div>
          </Card>
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">💬</div>
            <div className="font-nunito text-sm text-gray-600">Общайся</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
