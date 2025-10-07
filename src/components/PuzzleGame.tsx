import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

interface PuzzleGameProps {
  onBack: () => void;
}

const PuzzleGame = ({ onBack }: PuzzleGameProps) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const emojis = ['🐶', '🐱', '🐼', '🦁', '🐸', '🐰', '🦊', '🐻'];

  const initGame = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const checkWin = (newTiles: number[]) => {
    return newTiles.every((tile, index) => tile === index + 1 || (tile === 0 && index === 8));
  };

  const moveTile = (index: number) => {
    if (isWon) return;

    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);

      if (checkWin(newTiles)) {
        setIsWon(true);
        toast({
          title: "Поздравляю! 🎉",
          description: `Ты собрал пазл за ${moves + 1} ходов!`,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-mint/5 to-coral/5 p-4">
      <div className="max-w-2xl mx-auto">
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
            🧩 Пазлы
          </h1>
          <Button
            onClick={initGame}
            variant="outline"
            className="rounded-3xl border-2 border-coral text-coral hover:bg-coral hover:text-white"
          >
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Новая
          </Button>
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-8 mb-6">
          <div className="mb-6 text-center">
            <div className="text-4xl font-fredoka text-gray-800 mb-2">
              Ходов: {moves}
            </div>
            {isWon && (
              <div className="text-2xl text-mint font-fredoka animate-bounce-slow">
                🎉 Победа! 🎉
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            {tiles.map((tile, index) => (
              <button
                key={index}
                onClick={() => moveTile(index)}
                disabled={tile === 0}
                className={`aspect-square rounded-3xl text-6xl font-fredoka transition-all ${
                  tile === 0
                    ? 'bg-gray-100 cursor-default'
                    : 'bg-gradient-to-br from-mint to-yellow text-white hover:scale-105 shadow-lg cursor-pointer'
                } ${isWon ? 'animate-bounce-slow' : ''}`}
              >
                {tile !== 0 && emojis[tile - 1]}
              </button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-mint/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🧠</div>
            <div className="font-nunito text-sm text-gray-600">Логика</div>
          </Card>
          <Card className="bg-yellow/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-nunito text-sm text-gray-600">Скорость</div>
          </Card>
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-nunito text-sm text-gray-600">Внимание</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
