import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

interface MemoryGameProps {
  onBack: () => void;
}

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = ({ onBack }: MemoryGameProps) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const emojis = ['🐶', '🐱', '🐼', '🦁', '🐸', '🐰', '🦊', '🐻'];

  const initGame = () => {
    const gameCards = emojis.flatMap((emoji, index) => [
      { id: index * 2, emoji, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
    ]);
    
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          
          if (matches + 1 === emojis.length) {
            toast({
              title: "Поздравляю! 🎉",
              description: `Ты нашёл все пары за ${moves + 1} ходов!`,
            });
          }
        }, 600);
      } else {
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(cards.map(c => c.id === id ? { ...c, isFlipped: true } : c));
    setFlippedCards([...flippedCards, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-coral/5 to-mint/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-3xl border-2 border-coral text-coral hover:bg-coral hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl md:text-4xl text-coral font-fredoka">
            🎮 Память
          </h1>
          <Button
            onClick={initGame}
            variant="outline"
            className="rounded-3xl border-2 border-yellow text-yellow hover:bg-yellow hover:text-white"
          >
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Новая
          </Button>
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-8 mb-6">
          <div className="flex justify-around mb-6 text-center">
            <div>
              <div className="text-4xl font-fredoka text-coral">{moves}</div>
              <div className="text-gray-600">Ходов</div>
            </div>
            <div>
              <div className="text-4xl font-fredoka text-mint">{matches}</div>
              <div className="text-gray-600">Пар найдено</div>
            </div>
            <div>
              <div className="text-4xl font-fredoka text-yellow">{emojis.length}</div>
              <div className="text-gray-600">Всего пар</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched || card.isFlipped}
                className={`aspect-square rounded-3xl text-5xl transition-all ${
                  card.isFlipped || card.isMatched
                    ? 'bg-gradient-to-br from-mint to-yellow text-white shadow-lg'
                    : 'bg-gradient-to-br from-coral to-yellow hover:scale-105'
                } ${card.isMatched ? 'opacity-50' : ''}`}
              >
                {card.isFlipped || card.isMatched ? card.emoji : '❓'}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🧠</div>
            <div className="font-nunito text-sm text-gray-600">Память</div>
          </Card>
          <Card className="bg-yellow/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">👀</div>
            <div className="font-nunito text-sm text-gray-600">Внимание</div>
          </Card>
          <Card className="bg-mint/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-nunito text-sm text-gray-600">Реакция</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
