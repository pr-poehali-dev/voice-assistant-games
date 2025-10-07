import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ColoringGameProps {
  onBack: () => void;
}

const ColoringGame = ({ onBack }: ColoringGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(10);

  const colors = [
    { name: 'Красный', value: '#FF6B6B' },
    { name: 'Синий', value: '#4ECDC4' },
    { name: 'Жёлтый', value: '#FFE66D' },
    { name: 'Зелёный', value: '#95E1D3' },
    { name: 'Фиолетовый', value: '#A78BFA' },
    { name: 'Оранжевый', value: '#FCA311' },
    { name: 'Розовый', value: '#F72585' },
    { name: 'Коричневый', value: '#8B4513' },
    { name: 'Чёрный', value: '#000000' },
    { name: 'Белый', value: '#FFFFFF' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-softWhite via-coral/5 to-yellow/5 p-4">
      <div className="max-w-6xl mx-auto">
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
            🎨 Раскраски
          </h1>
          <Button
            onClick={clearCanvas}
            variant="outline"
            className="rounded-3xl border-2 border-yellow text-yellow hover:bg-yellow hover:text-white"
          >
            <Icon name="Trash2" size={20} className="mr-2" />
            Очистить
          </Button>
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-6 mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-[500px] border-4 border-gray-200 rounded-3xl cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
          />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white rounded-4xl border-0 shadow-lg p-6">
            <h3 className="text-2xl font-fredoka text-gray-800 mb-4">
              Выбери цвет
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setCurrentColor(color.value)}
                  className={`h-16 rounded-3xl transition-all hover:scale-110 ${
                    currentColor === color.value ? 'ring-4 ring-mint scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.value, border: '2px solid #ddd' }}
                  title={color.name}
                />
              ))}
            </div>
          </Card>

          <Card className="bg-white rounded-4xl border-0 shadow-lg p-6">
            <h3 className="text-2xl font-fredoka text-gray-800 mb-4">
              Размер кисти
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="2"
                max="30"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FF6B6B, #FEC664, #95E1D3)`
                }}
              />
              <div className="flex justify-center">
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: `${brushSize * 2}px`,
                    height: `${brushSize * 2}px`,
                    backgroundColor: currentColor,
                    border: '2px solid #ddd'
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColoringGame;
