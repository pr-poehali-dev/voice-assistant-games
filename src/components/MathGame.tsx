import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

interface MathGameProps {
  onBack: () => void;
}

const MathGame = ({ onBack }: MathGameProps) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const generateNewProblem = () => {
    const newNum1 = Math.floor(Math.random() * 20) + 1;
    const newNum2 = Math.floor(Math.random() * 20) + 1;
    const newOperation = Math.random() > 0.5 ? '+' : '-';
    
    if (newOperation === '-' && newNum2 > newNum1) {
      setNum1(newNum2);
      setNum2(newNum1);
    } else {
      setNum1(newNum1);
      setNum2(newNum2);
    }
    
    setOperation(newOperation);
    setAnswer('');
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  const checkAnswer = () => {
    const correctAnswer = operation === '+' ? num1 + num2 : num1 - num2;
    const userAnswer = parseInt(answer);

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Правильно! 🎉",
        description: "Ты молодец! Следующий пример...",
      });
      generateNewProblem();
    } else {
      toast({
        title: "Попробуй ещё раз 🤔",
        description: `Правильный ответ: ${correctAnswer}`,
        variant: "destructive"
      });
    }
    
    setAttempts(attempts + 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer) {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-yellow/5 to-mint/5 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-3xl border-2 border-yellow text-yellow hover:bg-yellow hover:text-white"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl md:text-4xl text-yellow font-fredoka">
            🧮 Математика
          </h1>
          <div className="flex gap-3">
            <div className="bg-mint text-white px-4 py-2 rounded-3xl font-fredoka">
              ⭐ {score}
            </div>
          </div>
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-8 md:p-12 mb-6">
          <div className="text-center space-y-8">
            <div className="inline-block bg-gradient-to-r from-yellow to-mint rounded-full p-4 animate-bounce-slow">
              <div className="text-5xl">🎓</div>
            </div>

            <div className="flex items-center justify-center gap-6 text-6xl md:text-8xl font-fredoka">
              <span className="text-coral animate-scale-in">{num1}</span>
              <span className="text-yellow">{operation}</span>
              <span className="text-mint animate-scale-in">{num2}</span>
              <span className="text-gray-400">=</span>
              <span className="text-coral">?</span>
            </div>

            <div className="max-w-xs mx-auto space-y-4">
              <Input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введи ответ"
                className="h-20 text-4xl text-center rounded-3xl border-4 border-gray-200 focus:border-yellow font-fredoka"
                autoFocus
              />

              <Button
                onClick={checkAnswer}
                disabled={!answer}
                className="w-full h-16 text-2xl font-fredoka bg-gradient-to-r from-yellow to-mint text-white rounded-3xl hover:scale-105 transition-transform"
              >
                Проверить ✓
              </Button>
            </div>

            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-4xl font-fredoka text-mint">{score}</div>
                <div className="text-gray-600">Правильно</div>
              </div>
              <div>
                <div className="text-4xl font-fredoka text-coral">{attempts - score}</div>
                <div className="text-gray-600">Ошибок</div>
              </div>
              <div>
                <div className="text-4xl font-fredoka text-yellow">{attempts}</div>
                <div className="text-gray-600">Всего</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🌟</div>
            <div className="font-fredoka text-coral">Легко</div>
          </Card>
          <Card className="bg-yellow/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-fredoka text-yellow">Быстро</div>
          </Card>
          <Card className="bg-mint/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-fredoka text-mint">Точно</div>
          </Card>
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-fredoka text-coral">Победа</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MathGame;
