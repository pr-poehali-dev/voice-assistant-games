import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface GameSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}

const Index = () => {
  const [userProgress] = useState({
    name: 'Максим',
    level: 5,
    stars: 87,
    achievements: 12
  });

  const gameSections: GameSection[] = [
    {
      id: 'coloring',
      name: 'Раскраски',
      icon: 'Palette',
      color: 'text-coral',
      bgColor: 'bg-coral/10 hover:bg-coral/20',
      description: 'Раскрашивай картинки'
    },
    {
      id: 'learning',
      name: 'Обучающие задания',
      icon: 'BookOpen',
      color: 'text-yellow',
      bgColor: 'bg-yellow/10 hover:bg-yellow/20',
      description: 'Учись играя'
    },
    {
      id: 'profile',
      name: 'Мой профиль',
      icon: 'User',
      color: 'text-mint',
      bgColor: 'bg-mint/10 hover:bg-mint/20',
      description: 'Твои достижения'
    },
    {
      id: 'music',
      name: 'Музыкальные игры',
      icon: 'Music',
      color: 'text-coral',
      bgColor: 'bg-coral/10 hover:bg-coral/20',
      description: 'Играй мелодии'
    },
    {
      id: 'puzzles',
      name: 'Пазлы',
      icon: 'Puzzle',
      color: 'text-yellow',
      bgColor: 'bg-yellow/10 hover:bg-yellow/20',
      description: 'Собирай картинки'
    },
    {
      id: 'voice',
      name: 'Голосовой помощник',
      icon: 'Mic',
      color: 'text-mint',
      bgColor: 'bg-mint/10 hover:bg-mint/20',
      description: 'Поговори с поездом'
    },
    {
      id: 'games',
      name: 'Игры',
      icon: 'Gamepad2',
      color: 'text-coral',
      bgColor: 'bg-coral/10 hover:bg-coral/20',
      description: 'Мини-игры'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-mint/5 to-yellow/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl text-coral mb-2">
                Привет, {userProgress.name}! 👋
              </h1>
              <p className="text-xl text-gray-600">Во что поиграем сегодня?</p>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Badge className="bg-yellow text-white text-lg px-4 py-2 rounded-3xl">
                <Icon name="Star" size={20} className="mr-1" />
                {userProgress.stars} звёзд
              </Badge>
              <Badge className="bg-coral text-white text-lg px-4 py-2 rounded-3xl">
                <Icon name="Trophy" size={20} className="mr-1" />
                Уровень {userProgress.level}
              </Badge>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-coral to-yellow p-6 rounded-4xl border-0 shadow-xl animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="bg-white/90 rounded-full p-4 animate-bounce-slow">
                <div className="text-5xl">🚂</div>
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-2xl md:text-3xl font-fredoka mb-2">
                  Поезд Фредди готов к приключениям!
                </h2>
                <p className="text-lg opacity-90">
                  Нажми на меня, чтобы я помог тебе выбрать игру
                </p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all hover:scale-110">
                <Icon name="Play" size={32} />
              </button>
            </div>
          </Card>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Badge className="bg-mint text-white text-base px-6 py-3 rounded-3xl whitespace-nowrap cursor-pointer hover:scale-105 transition-transform">
            🎯 Все игры
          </Badge>
          <Badge variant="outline" className="text-base px-6 py-3 rounded-3xl whitespace-nowrap cursor-pointer hover:scale-105 transition-transform border-2 border-mint text-mint">
            🎨 Творчество
          </Badge>
          <Badge variant="outline" className="text-base px-6 py-3 rounded-3xl whitespace-nowrap cursor-pointer hover:scale-105 transition-transform border-2 border-yellow text-yellow">
            🧠 Обучение
          </Badge>
          <Badge variant="outline" className="text-base px-6 py-3 rounded-3xl whitespace-nowrap cursor-pointer hover:scale-105 transition-transform border-2 border-coral text-coral">
            🎮 Развлечения
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gameSections.map((section, index) => (
            <Card
              key={section.id}
              className={`${section.bgColor} border-0 p-6 rounded-4xl cursor-pointer transition-all hover:scale-105 hover:shadow-xl animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`${section.color} bg-white rounded-3xl p-6 shadow-lg`}>
                  <Icon name={section.icon as any} size={48} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-fredoka mb-2 text-gray-800">
                    {section.name}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {section.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-4xl p-6 md:p-8 shadow-lg animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-coral">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-coral to-yellow text-white text-2xl font-fredoka">
                  {userProgress.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-fredoka text-gray-800 mb-1">
                  {userProgress.name}
                </h3>
                <p className="text-gray-600">
                  Уровень {userProgress.level} • {userProgress.achievements} достижений
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-4xl font-fredoka text-coral mb-1">
                  {userProgress.stars}
                </div>
                <div className="text-sm text-gray-600">Звёзд собрано</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-fredoka text-yellow mb-1">
                  {userProgress.achievements}
                </div>
                <div className="text-sm text-gray-600">Достижений</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-fredoka text-mint mb-1">
                  {userProgress.level}
                </div>
                <div className="text-sm text-gray-600">Уровень</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🔒 Безопасно • 🎯 Без рекламы • 📱 Работает офлайн</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
