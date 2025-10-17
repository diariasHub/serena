"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DailyPhraseProps {
  emotions: Record<string, string>;
}

const phrases = {
  mal: [
    "Recuerda que los días difíciles también pasan. Eres más fuerte de lo que crees.",
    "Cada tormenta emocional es temporal. Tu bienestar es importante.",
    "Está bien no estar bien. Buscar ayuda es un acto de valentía.",
    "Tus sentimientos son válidos. Tómate el tiempo que necesites para sanar."
  ],
  triste: [
    "La tristeza es parte de la experiencia humana. Permítete sentir y luego soltar.",
    "Incluso en los momentos más oscuros, hay una luz esperándote.",
    "Tu tristeza no te define. Eres mucho más de lo que sientes en este momento.",
    "Es normal sentirse triste. Hablar con alguien puede ayudarte a sentirte mejor."
  ],
  neutro: [
    "La tranquilidad es un estado valioso. Disfruta de estos momentos de equilibrio.",
    "Los días neutros te dan espacio para reflexionar y planear.",
    "La estabilidad emocional es un regalo. Aprovecha esta calma interior.",
    "No todos los días necesitan ser extraordinarios. La normalidad también es hermosa."
  ],
  feliz: [
    "¡Qué maravilloso verte brillar! Comparte tu alegría con el mundo.",
    "Tu felicidad es contagiosa. Sigue irradiando esa energía positiva.",
    "Celebra estos momentos de alegría. Te los mereces completamente.",
    "La felicidad que sientes hoy puede ser la semilla de un mañana aún mejor."
  ],
  emocionado: [
    "¡Tu entusiasmo es inspirador! Canaliza esa energía hacia tus sueños.",
    "La emoción que sientes es combustible para grandes logros.",
    "¡Que increíble verte tan lleno de vida! El mundo necesita tu energía.",
    "Tu emoción es una fuerza poderosa. Úsala para crear algo extraordinario."
  ]
};

export default function DailyPhrase({ emotions }: DailyPhraseProps) {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [dominantEmotion, setDominantEmotion] = useState("neutro");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    console.log('DailyPhrase emociones recibidas:', emotions); // Para debug
    
    // Calcular la emoción predominante del mes
    const emotionCounts: Record<string, number> = {};
    const emotionValues = Object.values(emotions);
    
    // Si no hay emociones, usar neutro por defecto
    if (emotionValues.length === 0) {
      setDominantEmotion("neutro");
      const emotionPhrases = phrases.neutro;
      const randomPhrase = emotionPhrases[Math.floor(Math.random() * emotionPhrases.length)];
      setCurrentPhrase(randomPhrase);
      return;
    }
    
    emotionValues.forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });

    let dominant = "neutro";
    let maxCount = 0;
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = emotion;
      }
    });

    // Si solo hay una emoción, usarla directamente
    if (emotionValues.length === 1) {
      dominant = emotionValues[0];
    }

    setDominantEmotion(dominant);

    // Seleccionar una frase aleatoria para la emoción predominante
    const emotionPhrases = phrases[dominant as keyof typeof phrases] || phrases.neutro;
    const randomPhrase = emotionPhrases[Math.floor(Math.random() * emotionPhrases.length)];
    setCurrentPhrase(randomPhrase);
    
    console.log('Emoción dominante:', dominant, 'Frase:', randomPhrase); // Para debug
  }, [emotions]);

  const generateNewPhrase = () => {
    // Generar una nueva frase aleatoria para la emoción dominante
    const emotionPhrases = phrases[dominantEmotion as keyof typeof phrases] || phrases.neutro;
    let newPhrase;
    
    // Asegurar que la nueva frase sea diferente a la actual
    do {
      newPhrase = emotionPhrases[Math.floor(Math.random() * emotionPhrases.length)];
    } while (newPhrase === currentPhrase && emotionPhrases.length > 1);
    
    setCurrentPhrase(newPhrase);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNewPhrase = () => {
    setIsRevealed(false);
    generateNewPhrase();
  };

  const emotionEmojis: Record<string, string> = {
    mal: '😵',
    triste: '😢',
    neutro: '😐',
    feliz: '😊',
    emocionado: '🤩'
  };

  const emotionColors: Record<string, string> = {
    mal: 'from-red-400 to-red-600',
    triste: 'from-blue-400 to-blue-600',
    neutro: 'from-gray-400 to-gray-600',
    feliz: 'from-yellow-400 to-yellow-600',
    emocionado: 'from-green-400 to-green-600'
  };

  if (!isRevealed) {
    return (
      <div className="text-center py-8">
        <motion.div
          className="relative mx-auto w-32 h-32 mb-6 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReveal}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${emotionColors[dominantEmotion]} shadow-lg flex items-center justify-center`}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              🎁
            </motion.div>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white shadow-inner"></div>
        </motion.div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Cajita sorpresa del día
        </h3>
        <p className="text-gray-600 mb-4">
          Basada en tu estado emocional predominante
        </p>
        <p className="text-sm text-purple-600 font-medium">
          Toca la cajita para descubrir tu mensaje
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-8"
    >
      <div className="text-6xl mb-4">
        {emotionEmojis[dominantEmotion]}
      </div>
      
      <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${emotionColors[dominantEmotion]}`}>
        Emoción predominante: {dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}
      </div>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
      >
        <p className="text-lg leading-relaxed text-gray-700 italic">
          &ldquo;{currentPhrase}&rdquo;
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={handleNewPhrase}
        className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium underline"
      >
        Ver otra cajita sorpresa
      </motion.button>
    </motion.div>
  );
}