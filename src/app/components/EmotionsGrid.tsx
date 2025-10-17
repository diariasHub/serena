"use client";

import { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

interface EmotionsGridProps {
  onBack: () => void;
}

const emotions = [
  {
    name: "Alegría",
    description: "Un estado de felicidad y satisfacción que surge cuando experimentamos algo positivo. Se manifiesta con sonrisas, risa y una sensación de ligereza. Para cultivarla, practica la gratitud diaria y comparte momentos especiales con otros.",
    color: "bg-yellow-200",
    textColor: "text-yellow-800"
  },
  {
    name: "Amor",
    description: "Un sentimiento profundo de afecto, cuidado y conexión hacia otra persona o actividad. Se identifica por la calidez en el pecho y el deseo de proteger y cuidar. Cultívalo expresando afecto y practicando actos de bondad.",
    color: "bg-pink-200",
    textColor: "text-pink-800"
  },
  {
    name: "Admiración",
    description: "Respeto y aprecio hacia alguien o algo excepcional. Se siente como una elevación del espíritu y deseo de emular. Para desarrollarla, busca cualidades positivas en otros y reconoce sus logros sinceramente.",
    color: "bg-purple-200",
    textColor: "text-purple-800"
  },
  {
    name: "Agradecimiento",
    description: "Reconocimiento y apreciación por lo que tenemos o hemos recibido. Se manifiesta como calidez en el corazón y deseo de reciprocidad. Practícalo llevando un diario de gratitud y expresando gracias regularmente.",
    color: "bg-green-200",
    textColor: "text-green-800"
  },
  {
    name: "Aprecio",
    description: "Reconocimiento del valor y la importancia de algo o alguien. Se siente como una valoración consciente y positiva. Cultívalo prestando atención a los detalles y expresando reconocimiento verbal.",
    color: "bg-blue-200",
    textColor: "text-blue-800"
  },
  {
    name: "Calma",
    description: "Estado de tranquilidad y serenidad mental y física. Se identifica por la relajación muscular y respiración pausada. Para mantenerla, practica técnicas de respiración profunda y meditación mindfulness.",
    color: "bg-cyan-200",
    textColor: "text-cyan-800"
  },
  {
    name: "Confianza",
    description: "Sensación de seguridad en uno mismo o en otros. Se manifiesta con postura erguida y toma de decisiones clara. Fortalécela celebrando pequeños logros y desafiándote gradualmente.",
    color: "bg-indigo-200",
    textColor: "text-indigo-800"
  },
  {
    name: "Curiosidad",
    description: "Deseo de aprender, explorar y descubrir. Se siente como una energía inquieta hacia lo desconocido. Alimentarla haciendo preguntas, explorando nuevos temas y manteniendo una mente abierta.",
    color: "bg-orange-200",
    textColor: "text-orange-800"
  },
  {
    name: "Entusiasmo",
    description: "Emoción intensa de interés y emoción hacia algo. Se identifica por energía elevada y deseo de participar. Manténelo estableciendo metas emocionantes y rodeándote de personas positivas.",
    color: "bg-red-200",
    textColor: "text-red-800"
  },
  {
    name: "Esperanza",
    description: "Creencia positiva en posibilidades futuras. Se siente como una luz en la oscuridad y motivación para continuar. Cultívala visualizando resultados positivos y tomando pequeñas acciones hacia tus metas.",
    color: "bg-teal-200",
    textColor: "text-teal-800"
  },
  {
    name: "Satisfacción",
    description: "Sensación de plenitud y contentamiento con lo logrado. Se manifiesta como una sensación de completitud y paz interior. Alcánzala estableciendo expectativas realistas y celebrando el progreso.",
    color: "bg-lime-200",
    textColor: "text-lime-800"
  },
  {
    name: "Placer",
    description: "Sensación agradable derivada de experiencias sensoriales o emocionales positivas. Se identifica por relajación y bienestar físico. Disfrútalo con moderación y siendo consciente del momento presente.",
    color: "bg-rose-200",
    textColor: "text-rose-800"
  },
  {
    name: "Euforia",
    description: "Estado de felicidad intensa y energía elevada. Se siente como estar en las nubes con excitación extrema. Gestiónala canalizando la energía productivamente y manteniéndote conectado a tierra.",
    color: "bg-fuchsia-200",
    textColor: "text-fuchsia-800"
  },
  {
    name: "Deseo",
    description: "Anhelo fuerte hacia algo específico. Se manifiesta como una atracción intensa y motivación dirigida. Manéjalo identificando si es saludable y dirigiendo la energía hacia metas constructivas.",
    color: "bg-violet-200",
    textColor: "text-violet-800"
  },
  {
    name: "Ilusión",
    description: "Expectativa positiva y emocionante hacia el futuro. Se siente como anticipación alegre y energía esperanzadora. Manténla equilibrando optimismo con realismo y preparándote para diferentes resultados.",
    color: "bg-sky-200",
    textColor: "text-sky-800"
  },
  {
    name: "Orgullo",
    description: "Satisfacción por logros propios o de seres queridos. Se identifica por una sensación de elevación y validación personal. Gestiónalo celebrando logros humildemente y usándolo como motivación para crecer.",
    color: "bg-amber-200",
    textColor: "text-amber-800"
  },
  {
    name: "Vergüenza",
    description: "Sentimiento de incomodidad sobre uno mismo o las propias acciones. Se manifiesta como deseo de esconderse y rubor facial. Manéjala recordando que todos cometen errores y practicando autocompasión.",
    color: "bg-red-300",
    textColor: "text-red-900"
  },
  {
    name: "Culpa",
    description: "Remordimiento por acciones que causaron daño. Se siente como peso en el pecho y pensamientos repetitivos. Abórdala disculpándote sinceramente, reparando el daño y aprendiendo de la experiencia.",
    color: "bg-gray-300",
    textColor: "text-gray-900"
  },
  {
    name: "Envidia",
    description: "Resentimiento hacia lo que otros poseen. Se identifica por amargura y comparación constante. Transformala enfocándote en tu propio crecimiento y usando la admiración como motivación positiva.",
    color: "bg-green-300",
    textColor: "text-green-900"
  },
  {
    name: "Celos",
    description: "Miedo a perder algo valioso ante una amenaza percibida. Se manifiesta como ansiedad y posesividad. Gestiónanos comunicándote abiertamente y trabajando en la autoestima y confianza.",
    color: "bg-yellow-300",
    textColor: "text-yellow-900"
  },
  {
    name: "Ira",
    description: "Respuesta emocional intensa ante una injusticia percibida. Se identifica por tensión muscular, calor y deseo de confrontar. Manéjala respirando profundo, tomando tiempo antes de reaccionar y expresando asertivamente.",
    color: "bg-red-400",
    textColor: "text-red-900"
  },
  {
    name: "Odio",
    description: "Aversión intensa y duradera hacia algo o alguien. Se siente como rechazo profundo y deseo de distancia. Abórdalo explorando las causas subyacentes y buscando ayuda profesional si interfiere con tu vida.",
    color: "bg-slate-400",
    textColor: "text-slate-900"
  },
  {
    name: "Desprecio",
    description: "Sensación de superioridad y falta de respeto hacia otros. Se manifiesta como desdén y desvalorización. Transformalo practicando empatía, buscando comprender otras perspectivas y cultivando humildad.",
    color: "bg-stone-400",
    textColor: "text-stone-900"
  },
  {
    name: "Aburrimiento",
    description: "Falta de interés o estimulación en la situación actual. Se identifica por inquietud y deseo de cambio. Úsalo como oportunidad para explorar nuevas actividades, hobbies o desafíos personales.",
    color: "bg-neutral-300",
    textColor: "text-neutral-900"
  },
  {
    name: "Soledad",
    description: "Sensación de aislamiento y falta de conexión social. Se siente como vacío emocional y anhelo de compañía. Abórdala conectando con otros, uniéndote a grupos de interés y practicando autocomcompañía.",
    color: "bg-blue-300",
    textColor: "text-blue-900"
  },
  {
    name: "Tristeza",
    description: "Respuesta natural a la pérdida o decepción. Se manifiesta como pesadez emocional y ganas de llorar. Permítela fluir, busca apoyo en otros, expresa tus sentimientos y recuerda que es temporal.",
    color: "bg-indigo-300",
    textColor: "text-indigo-900"
  },
  {
    name: "Miedo",
    description: "Respuesta de supervivencia ante una amenaza percibida. Se identifica por aceleración cardíaca y tensión. Manéjalo respirando profundo, evaluando la realidad de la amenaza y tomando acciones graduales.",
    color: "bg-purple-300",
    textColor: "text-purple-900"
  },
  {
    name: "Ansiedad",
    description: "Preocupación excesiva sobre eventos futuros inciertos. Se siente como inquietud mental y física constante. Gestiónala practicando mindfulness, cuestionando pensamientos catastróficos y buscando ayuda profesional si es necesario.",
    color: "bg-orange-300",
    textColor: "text-orange-900"
  },
  {
    name: "Dolor",
    description: "Sufrimiento emocional profundo, a menudo por pérdida o trauma. Se manifiesta como ache en el pecho y llanto. Permítete sentirlo, busca apoyo, practica autocuidado y considera ayuda profesional para procesarlo.",
    color: "bg-gray-400",
    textColor: "text-gray-900"
  },
  {
    name: "Desconsuelo",
    description: "Pena profunda sin posibilidad aparente de consuelo. Se siente como desesperanza y aislamiento emocional. Abórdalo buscando conexiones humanas, permitiendo el proceso de duelo y encontrando pequeñas fuentes de esperanza.",
    color: "bg-slate-300",
    textColor: "text-slate-900"
  },
  {
    name: "Decepción",
    description: "Tristeza cuando las expectativas no se cumplen. Se identifica por desilusión y pérdida de motivación. Manéjala ajustando expectativas, aprendiendo de la experiencia y encontrando nuevas oportunidades.",
    color: "bg-zinc-300",
    textColor: "text-zinc-900"
  },
  {
    name: "Frustración",
    description: "Irritación cuando algo impide alcanzar un objetivo. Se siente como energía bloqueada y tensión. Canalízala tomando descansos, reevaluando el enfoque y dividiendo objetivos grandes en pasos pequeños.",
    color: "bg-pink-300",
    textColor: "text-pink-900"
  },
  {
    name: "Impotencia",
    description: "Sensación de no poder cambiar o controlar una situación. Se manifiesta como resignación y falta de energía. Abórdala identificando qué sí puedes controlar, buscando apoyo y enfocándote en pequeñas acciones.",
    color: "bg-emerald-300",
    textColor: "text-emerald-900"
  },
  {
    name: "Inseguridad",
    description: "Falta de confianza en uno mismo o en una situación. Se identifica por dudas constantes y necesidad de validación. Fortalece la autoestima celebrando logros, desafiando pensamientos negativos y desarrollando habilidades.",
    color: "bg-teal-300",
    textColor: "text-teal-900"
  },
  {
    name: "Nostalgia",
    description: "Anhelo sentimental por el pasado. Se siente como una mezcla agridulce de alegría y tristeza. Disfrútala con moderación, aprovecha las lecciones aprendidas y mantén el equilibrio viviendo el presente.",
    color: "bg-cyan-300",
    textColor: "text-cyan-900"
  },
  {
    name: "Serenidad",
    description: "Estado de paz interior profunda y estabilidad emocional. Se identifica por claridad mental y equilibrio. Cultívala a través de prácticas contemplativas, conexión con la naturaleza y aceptación del momento presente.",
    color: "bg-blue-100",
    textColor: "text-blue-800"
  },
  {
    name: "Compasión",
    description: "Empatía profunda combinada con deseo de ayudar a aliviar el sufrimiento. Se siente como calidez hacia otros y motivación para actuar. Desarrollarla practicando bondad amorosa y voluntariado.",
    color: "bg-pink-100",
    textColor: "text-pink-800"
  },
  {
    name: "Empatía",
    description: "Capacidad de sentir y comprender las emociones de otros. Se manifiesta como resonancia emocional y conexión profunda. Cultívala escuchando activamente y poniéndote en el lugar de otros.",
    color: "bg-purple-100",
    textColor: "text-purple-800"
  },
  {
    name: "Comprensión",
    description: "Claridad mental sobre una situación o concepto. Se siente como iluminación y conexión de ideas. Desarrollarla a través de la reflexión, el diálogo abierto y la curiosidad genuina.",
    color: "bg-indigo-100",
    textColor: "text-indigo-800"
  },
  {
    name: "Perdón",
    description: "Liberación del resentimiento hacia quien nos ha lastimado. Se identifica por paz interior y liberación emocional. Practícalo por tu propio bienestar, comenzando con pequeños agravios y siendo paciente contigo mismo.",
    color: "bg-green-100",
    textColor: "text-green-800"
  },
  {
    name: "Libertad",
    description: "Sensación de autonomía y capacidad de elegir. Se siente como expansión y ligereza en el ser. Cultívala tomando decisiones conscientes, estableciendo límites saludables y siguiendo tus valores auténticos.",
    color: "bg-sky-100",
    textColor: "text-sky-800"
  },
  {
    name: "Felicidad",
    description: "Estado general de bienestar y satisfacción con la vida. Se manifiesta como alegría duradera y contenimiento. Cultívala a través de relaciones significativas, propósito personal y práctica de gratitud.",
    color: "bg-yellow-100",
    textColor: "text-yellow-800"
  }
];

export default function EmotionsGrid({ onBack }: EmotionsGridProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="flat"
            onPress={onBack}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium border border-purple-200"
            startContent={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-purple-600">Biblioteca de Emociones</h1>
            <p className="text-sm text-gray-600">Explora y comprende tus sentimientos</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {emotions.map((emotion, index) => (
            <motion.div
              key={emotion.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative h-48"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-full h-full cursor-pointer"
                onClick={() => handleCardClick(index)}
                animate={{ rotateY: flippedCard === index ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Frente de la carta */}
                <Card
                  className={`absolute inset-0 ${emotion.color} ${emotion.textColor} backface-hidden`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <CardBody className="flex items-center justify-center text-center p-4">
                    <h3 className="text-xl font-bold">{emotion.name}</h3>
                    <p className="text-sm mt-2 opacity-75">Toca para explorar</p>
                  </CardBody>
                </Card>

                {/* Reverso de la carta */}
                <Card
                  className={`absolute inset-0 ${emotion.color} ${emotion.textColor} backface-hidden`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <CardBody className="p-4 text-center overflow-y-auto">
                    <h3 className="text-lg font-bold mb-2">{emotion.name}</h3>
                    <p className="text-xs leading-relaxed">{emotion.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}