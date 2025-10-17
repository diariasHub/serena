"use client";

import {Card, CardHeader, CardBody, Image} from "@heroui/react";

export default function TestHeroUI() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Prueba HeroUI</h1>
        
        <Card className="py-4 bg-white">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Daily Mix</p>
            <small className="text-default-500">12 Tracks</small>
            <h4 className="font-bold text-large">Frontend Radio</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Si ves una card moderna con imagen, HeroUI funciona correctamente.
          </p>
        </div>
      </div>
    </div>
  );
}