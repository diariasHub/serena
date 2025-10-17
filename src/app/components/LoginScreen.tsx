"use client";

import { useState } from "react";
import { Button, Card, CardHeader, CardBody, Input, Link, Form, Image } from "@heroui/react";
import { motion } from "framer-motion";

type User = {
  id: string;
  name: string;
  email: string;
};

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || (!isRegisterMode && !password) || (isRegisterMode && !name)) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        name: name || "Usuario",
        email
      };
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        name: "Usuario Google",
        email: "usuario@gmail.com"
      };
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Card principal con la nueva estructura */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border border-gray-100">
            <CardHeader className="pb-0 pt-6 px-8 flex-col items-center">
              {/* Logo/Icon */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">🧠</span>
              </div>
              
              {/* Titulo principal */}
              <p className="text-tiny uppercase font-bold text-purple-600">Bienestar Emocional</p>
              <small className="text-default-500">Tu espacio personal</small>
              <h4 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Emocionario
              </h4>
              
              {/* Subtítulo del formulario */}
              <div className="text-center mt-4 mb-2">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {isRegisterMode ? "Crear cuenta" : "Iniciar sesión"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isRegisterMode ? "Únete a nuestra comunidad" : "Bienvenido de vuelta"}
                </p>
              </div>
            </CardHeader>
            
            <CardBody className="overflow-visible px-8 pb-8">
              {/* Formulario con los nuevos componentes */}
              <Form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                {/* Campo Nombre (solo en registro) */}
                {isRegisterMode && (
                  <Input
                    isRequired
                    errorMessage="Por favor ingresa tu nombre completo"
                    label="Nombre completo"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Ingresa tu nombre completo"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    classNames={{
                      label: "text-gray-700 font-medium",
                      input: "text-gray-900",
                      inputWrapper: "border-2 border-gray-300 hover:border-purple-400 focus-within:!border-purple-500 shadow-sm bg-white"
                    }}
                    startContent={<span className="text-gray-400">👤</span>}
                  />
                )}

                {/* Campo Email */}
                <Input
                  isRequired
                  errorMessage="Por favor ingresa un email válido"
                  label="Correo electrónico"
                  labelPlacement="outside"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="bordered"
                  size="lg"
                  radius="lg"
                  classNames={{
                    label: "text-gray-700 font-medium",
                    input: "text-gray-900",
                    inputWrapper: "border-2 border-gray-300 hover:border-purple-400 focus-within:!border-purple-500 shadow-sm bg-white"
                  }}
                  startContent={<span className="text-gray-400">📧</span>}
                />

                {/* Campo Contraseña (solo en login) */}
                {!isRegisterMode && (
                  <Input
                    isRequired
                    errorMessage="Por favor ingresa tu contraseña"
                    label="Contraseña"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    classNames={{
                      label: "text-gray-700 font-medium",
                      input: "text-gray-900",
                      inputWrapper: "border-2 border-gray-300 hover:border-purple-400 focus-within:!border-purple-500 shadow-sm bg-white"
                    }}
                    startContent={<span className="text-gray-400">🔒</span>}
                  />
                )}

                {/* Botones */}
                <div className="flex flex-col gap-3 mt-4">
                  {/* Botón Google */}
                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 hover:shadow-md text-gray-700 font-semibold"
                    variant="bordered"
                    onPress={handleGoogleLogin}
                    isLoading={isLoading}
                    startContent={
                      <div className="w-5 h-5 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">G</span>
                      </div>
                    }
                  >
                    Continuar con Google
                  </Button>

                  {/* Botón Principal */}
                  <Button
                    type="submit"
                    size="lg"
                    color="primary"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold shadow-lg hover:shadow-xl"
                    isLoading={isLoading}
                    isDisabled={!email || (!isRegisterMode && !password) || (isRegisterMode && !name)}
                  >
                    {isLoading 
                      ? (isRegisterMode ? "Creando cuenta..." : "Iniciando sesión...") 
                      : (isRegisterMode ? "Crear cuenta" : "Iniciar sesión")
                    }
                  </Button>
                </div>
              </Form>

              {/* Enlaces de registro/login y olvido de contraseña */}
              <div className="mt-6 text-center space-y-3">
                <Link
                  className="text-purple-600 hover:text-purple-700 cursor-pointer text-sm font-medium"
                  onPress={() => setIsRegisterMode(!isRegisterMode)}
                >
                  {isRegisterMode 
                    ? "¿Ya tienes cuenta? Inicia sesión" 
                    : "¿No tienes cuenta? Regístrate"
                  }
                </Link>
                
                {!isRegisterMode && (
                  <div>
                    <Link className="text-gray-500 hover:text-gray-700 cursor-pointer text-sm">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-gray-600 mt-6 leading-relaxed"
        >
          Al continuar, aceptas nuestros{" "}
          <span className="text-purple-600 font-medium">términos</span> y{" "}
          <span className="text-purple-600 font-medium">política de privacidad</span>
        </motion.p>
      </motion.div>
    </div>
  );
}