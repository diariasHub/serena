"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

interface CalendarProps {
  emotions: Record<string, string>;
  onEmotionUpdate: (date: string, emotion: string) => void;
}

const emotionEmojis: Record<string, string> = {
  mal: '😵',
  triste: '😢',
  neutro: '😐',
  feliz: '😊',
  emocionado: '🤩'
};

export default function Calendar({ emotions, onEmotionUpdate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Primer día del mes
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDate = (day: number): string => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const isToday = (day: number): boolean => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const isFutureDate = (day: number): boolean => {
    const dayDate = new Date(year, month, day);
    return dayDate > today;
  };

  // Crear array de días para mostrar
  const calendarDays = [];
  
  // Días vacíos al inicio
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="light"
          size="sm"
          onPress={goToPreviousMonth}
          isIconOnly
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        
        <h3 className="text-lg font-semibold text-gray-800">
          {monthNames[month]} {year}
        </h3>
        
        <Button
          variant="light"
          size="sm"
          onPress={goToNextMonth}
          isIconOnly
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Nombres de los días */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((dayName) => (
          <div key={dayName} className="text-center text-sm font-medium text-gray-500 py-2">
            {dayName}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square"></div>;
          }

          const dateString = formatDate(day);
          const emotion = emotions[dateString];
          const isTodayDate = isToday(day);
          const isFuture = isFutureDate(day);

          return (
            <div
              key={`${year}-${month}-${day}-${index}`}
              className={`
                aspect-square flex flex-col items-center justify-center border rounded-lg cursor-pointer transition-all
                ${isTodayDate ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200'}
                ${isFuture ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-50'}
              `}
            >
              <span className={`text-sm ${isTodayDate ? 'font-bold text-purple-600' : 'text-gray-700'}`}>
                {day}
              </span>
              {emotion && (
                <span className="text-lg">{emotionEmojis[emotion]}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Toca un día para agregar o cambiar tu emoción
      </div>
    </div>
  );
}