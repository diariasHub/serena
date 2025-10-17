"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import Calendar from "./Calendar";
import DailyPhrase from "./DailyPhrase";
import EmotionsGrid from "./EmotionsGrid";

type User = {
  id: string;
  name: string;
  email: string;
} | null;

interface MainDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function MainDashboard({ user, onLogout }: MainDashboardProps) {
  const [emotions, setEmotions] = useState<Record<string, string>>({});
  const [showEmotions, setShowEmotions] = useState(false);
  const [isPhraseOpen, setIsPhraseOpen] = useState(false);

  useEffect(() => {
    // Cargar emociones guardadas
    const savedEmotions = JSON.parse(localStorage.getItem('emocionario-emotions') || '{}');
    setEmotions(savedEmotions);
  }, []);

  const handleEmotionUpdate = (date: string, emotion: string) => {
    const updatedEmotions = { ...emotions, [date]: emotion };
    setEmotions(updatedEmotions);
    localStorage.setItem('emocionario-emotions', JSON.stringify(updatedEmotions));
  };

  const openPhraseModal = () => {
    console.log('Abriendo modal de frase diaria');
    setIsPhraseOpen(true);
    console.log('Estado del modal después de setear:', true);
  };

  const closePhraseModal = () => {
    console.log('Cerrando modal de frase diaria');
    setIsPhraseOpen(false);
  };

  console.log('Estado actual del modal isPhraseOpen:', isPhraseOpen); // Para debug

  if (showEmotions) {
    return <EmotionsGrid onBack={() => setShowEmotions(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-purple-600">Emocionario</h1>
            <p className="text-sm text-gray-600">Hola, {user?.name}</p>
          </div>
          <Button
            variant="flat"
            color="danger"
            onPress={onLogout}
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium border border-red-200"
          >
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Calendario */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tu seguimiento emocional</h2>
            <Calendar emotions={emotions} onEmotionUpdate={handleEmotionUpdate} />
          </CardBody>
        </Card>

        {/* Cards de acciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frase diaria */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={openPhraseModal}>
            <CardBody className="p-6 text-center">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Frase diaria</h3>
              <p className="text-gray-600 text-sm">Descubre tu mensaje de bienestar</p>
            </CardBody>
          </Card>

          {/* Explorar emociones */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" isPressable onPress={() => setShowEmotions(true)}>
            <CardBody className="p-6 text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Emociones</h3>
              <p className="text-gray-600 text-sm">Explora y comprende tus sentimientos</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Modal de frase diaria - Versión simplificada para debug */}
      {isPhraseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 backdrop-blur-md"
            onClick={closePhraseModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Frase del día</h2>
                <button
                  onClick={closePhraseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Body */}
            <div className="p-6">
              <DailyPhrase emotions={emotions} />
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <Button 
                color="primary" 
                onPress={closePhraseModal}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}