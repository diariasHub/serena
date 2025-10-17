"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

interface EmotionSelectionProps {
  onEmotionSelected: () => void;
}

const emotions = [
  { id: 'mal', emoji: '😵', label: 'Mal', color: 'bg-red-100 hover:bg-red-200' },
  { id: 'triste', emoji: '😢', label: 'Triste', color: 'bg-blue-100 hover:bg-blue-200' },
  { id: 'neutro', emoji: '😐', label: 'Neutro', color: 'bg-gray-100 hover:bg-gray-200' },
  { id: 'feliz', emoji: '😊', label: 'Feliz', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { id: 'emocionado', emoji: '🤩', label: 'Emocionado', color: 'bg-green-100 hover:bg-green-200' }
];

export default function EmotionSelection({ onEmotionSelected }: EmotionSelectionProps) {
  const handleEmotionSelect = (emotionId: string) => {
    // Guardar la emoción seleccionada en localStorage con la fecha actual
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const existingEmotions = JSON.parse(localStorage.getItem('emocionario-emotions') || '{}');
    
    existingEmotions[dateString] = emotionId;
    localStorage.setItem('emocionario-emotions', JSON.stringify(existingEmotions));
    
    console.log('Emoción guardada:', dateString, emotionId); // Para debug
    
    onEmotionSelected();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-2">¿Cómo te sientes hoy?</h2>
          <p className="text-gray-600">Selecciona la emoción que mejor describe tu estado actual</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {emotions.map((emotion, index) => (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${emotion.color} border-2 border-transparent hover:border-purple-300 hover:shadow-lg`}
                isPressable
                onPress={() => handleEmotionSelect(emotion.id)}
              >
                <CardBody className="flex flex-row items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{emotion.emoji}</span>
                    <span className="text-xl font-semibold text-gray-700">{emotion.label}</span>
                  </div>
                  <div className="text-purple-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="light"
            color="default"
            onPress={onEmotionSelected}
            className="text-gray-500"
          >
            Omitir por hoy
          </Button>
        </div>
      </div>
    </div>
  );
}