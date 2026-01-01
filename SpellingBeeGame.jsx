'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Trophy, Star, Mic, MicOff } from 'lucide-react';

const SpellingBeeGame = () => {
  const words = {
    easy: [
      { word: 'success', definition: 'a good result when you try or win' },
      { word: 'lantern', definition: 'a light you can carry' },
      { word: 'garage', definition: 'a building for keeping cars' },
      { word: 'waltz', definition: 'a slow dance with three steps' },
      { word: 'tower', definition: 'a tall building or structure' },
      { word: 'pillow', definition: 'a soft cushion for resting your head' },
      { word: 'twice', definition: 'two times' },
      { word: 'phone', definition: 'a tool used to talk to people far away' },
      { word: 'storm', definition: 'a violent weather event with strong wind and rain' },
      { word: 'mango', definition: 'a tropical fruit with yellow-red flesh' },
    ],
    average: [
      { word: 'pretend', definition: 'to make believe' },
      { word: 'frozen', definition: 'when something changes to ice because it was very cold' },
      { word: 'endless', definition: 'having no final part; boundless' },
      { word: 'scared', definition: 'sudden fear; frightened' },
      { word: 'church', definition: 'a place of worship or religious service' },
      { word: 'prepare', definition: 'to make something ready for future use' },
      { word: 'exciting', definition: 'absorbingly interesting; thrilling' },
      { word: 'elephant', definition: 'a mammal with a trunk, tusks, and large ears' },
      { word: 'baseball', definition: 'a game played with a ball, bat, and gloves' },
      { word: 'rainbow', definition: 'colorful arc in the sky after the rain' },
    ],
    difficult: [
      { word: 'disappoint', definition: 'fail to fulfil the hopes or expectations of' },
      { word: 'mosquito', definition: 'a small insect that sucks blood' },
      { word: 'genuine', definition: 'truly what something is said to be; authentic' },
      { word: 'gesture', definition: 'a movement to express an idea or meaning' },
      { word: 'forest', definition: 'a big area with lots of trees' },
      { word: 'experiment', definition: 'a test made to demonstrate a truth' },
      { word: 'temperature', definition: 'degree of hotness or coldness' },
      { word: 'leopard', definition: 'a large strong cat' },
      { word: 'fragrant', definition: 'having a pleasant smell or odor' },
      { word: 'warrior', definition: 'a man engaged or experienced in warfare' },
    ],
  };

  const [gameState, setGameState] = useState('menu');
  const [difficulty, setDifficulty] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentWordList, setCurrentWordList] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      rec.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interim += event.results[i][0].transcript;
        }
        setTranscript(interim);
        setUserAnswer(interim.toLowerCase().trim());
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const getWordList = (level) => {
    return [...words[level]].sort(() => Math.random() - 0.5);
  };

  const startGame = (diff, mode) => {
    const wordList = getWordList(diff);
    setCurrentWordList(wordList);
    setDifficulty(diff);
    setGameMode(mode);
    setGameState('playing');
    setCurrentWordIndex(0);
    setScore(0);
    setStreak(0);
    setUserAnswer('');
    setTranscript('');
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please try again! 📝');
      setShowFeedback(true);
      return;
    }

    const currentWord = currentWordList[currentWordIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentWord.word.toLowerCase();

    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      setFeedback('🎉 Awesome! You nailed it!');
    } else {
      setStreak(0);
      setFeedback(`Not quite! The word is: ${currentWord.word}`);
    }

    setShowFeedback(true);
    setTimeout(() => {
      nextWord();
    }, 2000);
  };

  const nextWord = () => {
    if (currentWordIndex < currentWordList.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setUserAnswer('');
      setTranscript('');
      setShowFeedback(false);
    } else {
      setGameState('results');
    }
  };

  const speakWord = (text) => {
    if (typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      setUserAnswer('');
      setTranscript('');
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-12 animate-bounce" style={{ animationDuration: '2s' }}>
            <h1 className="title-font text-6xl mb-4 text-white drop-shadow-lg">
              Spelling Bee 🐝
            </h1>
            <p className="text-2xl text-white drop-shadow-md font-bold">
              Let's Learn to Spell!
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setGameState('difficulty')}
              className="w-full py-6 px-6 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white text-2xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 drop-shadow-md"
            >
              🚀 Start Playing!
            </button>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-purple-600 mb-4">📚 How to Play:</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ Pick your difficulty level</li>
                <li>🎤 Choose to Type or Speak</li>
                <li>🔊 Listen to the word</li>
                <li>⌨️ Type OR 🎙️ Speak the answer</li>
                <li>⭐ Earn points for correct answers</li>
                <li>🏆 Try to get the highest score!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'difficulty') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setGameState('menu')}
            className="mb-6 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
          >
            ← Back
          </button>

          <h1 className="title-font text-5xl text-white text-center mb-12 drop-shadow-lg">
            Pick Your Level! 🎯
          </h1>

          <div className="space-y-4">
            {[
              { level: 'easy', emoji: '🌟', label: 'Easy', color: 'from-green-400 to-green-500' },
              { level: 'average', emoji: '⚡', label: 'Medium', color: 'from-blue-400 to-blue-500' },
              { level: 'difficult', emoji: '🔥', label: 'Hard', color: 'from-red-400 to-red-500' },
            ].map((item) => (
              <button
                key={item.level}
                onClick={() => {
                  setDifficulty(item.level);
                  setGameState('gameMode');
                }}
                className={`w-full py-6 px-6 bg-gradient-to-r ${item.color} hover:shadow-2xl text-white text-2xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <span className="text-4xl mr-3">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameMode') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setGameState('difficulty')}
            className="mb-6 px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all"
          >
            ← Back
          </button>

          <h1 className="title-font text-4xl text-white text-center mb-12 drop-shadow-lg">
            How to Play? 🎮
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => startGame(difficulty, 'type')}
              className="w-full py-6 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl mr-3">✍️</span>
              Type the Spelling
            </button>

            <button
              onClick={() => startGame(difficulty, 'speak')}
              className="w-full py-6 px-6 bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <span className="text-3xl mr-3">🎙️</span>
              Speak the Word
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && currentWordList.length > 0) {
    const currentWord = currentWordList[currentWordIndex];
    const progress = ((currentWordIndex + 1) / currentWordList.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-400 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-300" size={32} fill="currentColor" />
              <span className="text-3xl font-bold text-white drop-shadow-md">{score}</span>
            </div>
            <button
              onClick={() => setGameState('menu')}
              className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded-lg transition-all"
            >
              Exit
            </button>
          </div>

          <div className="mb-8">
            <div className="w-full bg-white rounded-full h-4 shadow-lg overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white text-center mt-2 font-bold">
              Word {currentWordIndex + 1} of {currentWordList.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4 font-semibold">
                Definition:
              </p>
              <p className="text-2xl text-gray-800 font-bold mb-8">
                "{currentWord.definition}"
              </p>

              <button
                onClick={() => speakWord(currentWord.word)}
                className="inline-flex items-center gap-3 mx-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Volume2 size={28} />
                Listen to the Word
              </button>
            </div>

            {gameMode === 'type' ? (
              <>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  placeholder="Type the word here..."
                  className="w-full px-6 py-4 border-2 border-purple-300 rounded-2xl text-2xl mb-6 focus:outline-none focus:border-purple-500 font-bold"
                  autoFocus
                />
              </>
            ) : (
              <>
                <div className="mb-6">
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`w-full py-6 px-6 text-white text-2xl font-bold rounded-2xl shadow-lg transform transition-all duration-200 flex items-center justify-center gap-3 ${
                      isListening
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:scale-105'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff size={28} />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic size={28} />
                        Click & Speak
                      </>
                    )}
                  </button>
                </div>

                {transcript && (
                  <div className="bg-blue-100 border-2 border-blue-300 rounded-2xl p-4 mb-6">
                    <p className="text-gray-600 text-sm font-semibold mb-2">You said:</p>
                    <p className="text-2xl font-bold text-blue-800">{transcript}</p>
                  </div>
                )}
              </>
            )}

            {showFeedback && (
              <div className={`p-6 rounded-2xl text-center text-xl font-bold mb-6 ${
                feedback.includes('🎉')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {feedback}
              </div>
            )}

            <button
              onClick={checkAnswer}
              disabled={showFeedback}
              className={`w-full py-4 px-6 text-white text-2xl font-bold rounded-2xl shadow-lg transform transition-all duration-200 ${
                showFeedback
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 hover:scale-105'
              }`}
            >
              Check Answer ✓
            </button>
          </div>

          {streak > 0 && (
            <div className="text-center">
              <p className="text-white text-2xl font-bold drop-shadow-lg">
                🔥 {streak} in a row!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'average' ? 1.5 : 2;
    const finalScore = Math.round(score * difficultyMultiplier);
    const percentage = Math.round((score / (currentWordList.length * 10)) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 animate-bounce" style={{ animationDuration: '1s' }}>
            <Trophy className="w-24 h-24 mx-auto text-yellow-600 drop-shadow-lg" fill="currentColor" />
          </div>

          <h1 className="title-font text-5xl text-white mb-6 drop-shadow-lg">Great Job!</h1>

          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
            <p className="text-gray-600 text-lg mb-4">Your Score</p>
            <p className="text-6xl font-bold text-purple-600 mb-4">{finalScore}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">
              {percentage}% Correct! 🎯
            </p>

            <div className="mb-6">
              {percentage >= 90 && <p className="text-3xl mb-2">🏆 Perfect! You're a spelling champion!</p>}
              {percentage >= 70 && percentage < 90 && <p className="text-3xl mb-2">⭐ Excellent work! Keep it up!</p>}
              {percentage >= 50 && percentage < 70 && <p className="text-3xl mb-2">👍 Good effort! Practice more!</p>}
              {percentage < 50 && <p className="text-3xl mb-2">💪 Don't give up! Try again!</p>}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setGameState('difficulty')}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Try Another Level
            </button>

            <button
              onClick={() => startGame(difficulty, gameMode)}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Play Again
            </button>

            <button
              onClick={() => setGameState('menu')}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Main Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SpellingBeeGame;
