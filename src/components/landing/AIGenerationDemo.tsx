import { useState, useEffect } from 'react';
import { Sparkles, Brain, Calculator, Grid3x3, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demos = [
  {
    icon: <Brain size={32} />,
    title: 'Memory Match',
    description: 'Uji memori visualmu',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Calculator size={32} />,
    title: 'Math Quiz',
    description: 'Latih kemampuan matematika',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Grid3x3 size={32} />,
    title: 'Pattern Match',
    description: 'Temukan pola yang hilang',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Type size={32} />,
    title: 'Word Puzzle',
    description: 'Susun kata dengan cepat',
    gradient: 'from-orange-500 to-red-500',
  }
];

// Memory Match Game Component
const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const emojis = ['🧠', '🎯', '🚀', '⭐', '🎨', '🎮'];
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-2xl font-bold">Score: {score}</div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`aspect-square text-4xl rounded-lg transition-all ${
              flipped.includes(index) || matched.includes(index)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {(flipped.includes(index) || matched.includes(index)) ? card : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};

// Math Quiz Component
const MathQuiz = () => {
  const [question, setQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    setQuestion({ a, b, answer: a + b });
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 10);
      setFeedback('✅ Benar!');
      setTimeout(generateQuestion, 1000);
    } else {
      setFeedback('❌ Coba lagi!');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-2xl font-bold">Score: {score}</div>
      <div className="text-4xl font-bold">
        {question.a} + {question.b} = ?
      </div>
      <div className="flex gap-4 justify-center items-center">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-24 px-4 py-2 rounded-lg bg-muted text-foreground text-center text-2xl"
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
        <Button onClick={checkAnswer}>Check</Button>
      </div>
      {feedback && <div className="text-xl">{feedback}</div>}
    </div>
  );
};

// Pattern Match Component
const PatternMatch = () => {
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generatePattern();
  }, []);

  const generatePattern = () => {
    const shapes = ['🔵', '🟢', '🔴', '🟡', '🟣'];
    const size = 4;
    const newPattern = Array(size).fill(0).map(() => shapes[Math.floor(Math.random() * shapes.length)]);
    const correctAnswer = shapes[Math.floor(Math.random() * shapes.length)];
    newPattern.push('?');
    
    const newOptions = [...shapes].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!newOptions.includes(correctAnswer)) {
      newOptions[Math.floor(Math.random() * 3)] = correctAnswer;
    }
    
    setPattern(newPattern);
    setOptions(newOptions);
    setFeedback('');
  };

  const checkAnswer = (answer: string) => {
    setScore(score + 10);
    setFeedback('✅ Bagus!');
    setTimeout(generatePattern, 1000);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-2xl font-bold">Score: {score}</div>
      <div className="flex gap-4 justify-center text-5xl">
        {pattern.map((item, i) => (
          <div key={i} className="w-16 h-16 flex items-center justify-center rounded-lg bg-muted">
            {item}
          </div>
        ))}
      </div>
      <div className="text-lg">Pilih bentuk yang tepat:</div>
      <div className="flex gap-4 justify-center">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => checkAnswer(option)}
            className="w-16 h-16 text-4xl rounded-lg bg-primary hover:bg-primary/80 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <div className="text-xl">{feedback}</div>}
    </div>
  );
};

// Word Puzzle Component
const WordPuzzle = () => {
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const words = ['BRAIN', 'THINK', 'SMART', 'LEARN', 'FOCUS', 'LOGIC', 'SOLVE', 'BOOST'];

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = newWord.split('').sort(() => Math.random() - 0.5).join('');
    setWord(newWord);
    setScrambled(scrambled);
    setUserAnswer('');
    setFeedback('');
  };

  const checkAnswer = () => {
    if (userAnswer.toUpperCase() === word) {
      setScore(score + 10);
      setFeedback('✅ Benar!');
      setTimeout(generateWord, 1000);
    } else {
      setFeedback('❌ Coba lagi!');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="text-2xl font-bold">Score: {score}</div>
      <div className="text-lg">Susun huruf ini menjadi kata yang benar:</div>
      <div className="text-4xl font-bold tracking-widest">{scrambled}</div>
      <div className="flex gap-4 justify-center items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="px-4 py-2 rounded-lg bg-muted text-foreground text-center text-2xl uppercase"
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
        <Button onClick={checkAnswer}>Check</Button>
      </div>
      {feedback && <div className="text-xl">{feedback}</div>}
    </div>
  );
};

export const AIGenerationDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const renderGame = () => {
    switch (activeDemo) {
      case 0:
        return <MemoryGame />;
      case 1:
        return <MathQuiz />;
      case 2:
        return <PatternMatch />;
      case 3:
        return <WordPuzzle />;
      default:
        return <MemoryGame />;
    }
  };

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="text-primary" size={24} />
          <h2 className="text-3xl font-bold">Permainan Asah Otak</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Latih otakmu dengan berbagai permainan sederhana yang menyenangkan
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {demos.map((demo, index) => (
          <div
            key={index}
            onClick={() => setActiveDemo(index)}
            className={`glass-panel p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
              activeDemo === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${demo.gradient} text-white mb-4`}>
              {demo.icon}
            </div>
            <h3 className="font-semibold mb-2">{demo.title}</h3>
            <p className="text-sm text-muted-foreground">{demo.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
        {renderGame()}
      </div>
    </div>
  );
};