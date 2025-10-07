import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MusicGameProps {
  onBack: () => void;
}

const MusicGame = ({ onBack }: MusicGameProps) => {
  const [playing, setPlaying] = useState<string | null>(null);
  const [recording, setRecording] = useState<string[]>([]);

  const notes = [
    { note: 'До', color: 'bg-coral', emoji: '🎵', freq: 261.63 },
    { note: 'Ре', color: 'bg-yellow', emoji: '🎶', freq: 293.66 },
    { note: 'Ми', color: 'bg-mint', emoji: '🎼', freq: 329.63 },
    { note: 'Фа', color: 'bg-coral', emoji: '🎹', freq: 349.23 },
    { note: 'Соль', color: 'bg-yellow', emoji: '🎸', freq: 392.00 },
    { note: 'Ля', color: 'bg-mint', emoji: '🎺', freq: 440.00 },
    { note: 'Си', color: 'bg-coral', emoji: '🎻', freq: 493.88 },
  ];

  const playSound = (note: string, freq: number) => {
    setPlaying(note);
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    setRecording([...recording, note]);
    
    setTimeout(() => setPlaying(null), 300);
  };

  const clearRecording = () => {
    setRecording([]);
  };

  const playRecording = async () => {
    for (let i = 0; i < recording.length; i++) {
      const noteData = notes.find(n => n.note === recording[i]);
      if (noteData) {
        playSound(noteData.note, noteData.freq);
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }
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
            🎵 Музыка
          </h1>
          <div className="w-24" />
        </div>

        <Card className="bg-white rounded-4xl border-0 shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-coral to-mint rounded-full p-4 animate-bounce-slow mb-4">
              <div className="text-5xl">🎹</div>
            </div>
            <h2 className="text-2xl font-fredoka text-gray-800">
              Создай свою мелодию!
            </h2>
            <p className="text-gray-600">Нажимай на ноты и играй</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {notes.map((item) => (
              <button
                key={item.note}
                onClick={() => playSound(item.note, item.freq)}
                className={`${item.color} ${
                  playing === item.note ? 'scale-95' : 'hover:scale-105'
                } text-white rounded-3xl p-6 transition-all shadow-lg`}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="text-2xl font-fredoka">{item.note}</div>
              </button>
            ))}
          </div>

          {recording.length > 0 && (
            <Card className="bg-gradient-to-r from-yellow/10 to-mint/10 border-0 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-fredoka text-gray-800">
                  Твоя мелодия ({recording.length} нот)
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={playRecording}
                    size="sm"
                    className="bg-mint text-white rounded-3xl hover:scale-105"
                  >
                    <Icon name="Play" size={16} className="mr-1" />
                    Играть
                  </Button>
                  <Button
                    onClick={clearRecording}
                    size="sm"
                    variant="outline"
                    className="rounded-3xl border-2 border-coral text-coral hover:bg-coral hover:text-white"
                  >
                    <Icon name="Trash2" size={16} className="mr-1" />
                    Очистить
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {recording.map((note, index) => (
                  <span
                    key={index}
                    className="bg-white px-4 py-2 rounded-full text-lg font-fredoka text-gray-800 shadow"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-coral/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🎼</div>
            <div className="font-nunito text-sm text-gray-600">Композитор</div>
          </Card>
          <Card className="bg-yellow/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🎤</div>
            <div className="font-nunito text-sm text-gray-600">Музыкант</div>
          </Card>
          <Card className="bg-mint/10 border-0 rounded-3xl p-4 text-center">
            <div className="text-3xl mb-2">🎧</div>
            <div className="font-nunito text-sm text-gray-600">Слух</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicGame;
