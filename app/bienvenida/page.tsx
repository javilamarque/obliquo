import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, Home, RotateCcw } from "lucide-react"

export default function BienvenidaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center">
          {/* Icono de trofeo */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Título de bienvenida */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido!</h1>

          <h2 className="text-2xl font-semibold text-green-600 mb-6">🎉 ¡Rompecabezas Completado! 🎉</h2>

          {/* Imagen completada */}
          <div className="mb-8">
            <div className="inline-block border-4 border-gradient-to-r from-yellow-400 to-orange-500 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/obliquo.jpg"
                alt="Rompecabezas completado"
                width={400}
                height={267}
                className="object-cover"
              />
            </div>
          </div>

          {/* Mensaje de felicitación */}
          <div className="mb-8 space-y-4">
            <p className="text-lg text-gray-700">
              ¡Excelente trabajo! Has demostrado gran habilidad y paciencia para completar este desafío.
            </p>
            <p className="text-gray-600">
              El rompecabezas de Obliquo ha sido resuelto exitosamente. Tu perseverancia y destreza han dado sus frutos.
            </p>
          </div>

          {/* Estadísticas del juego */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Piezas</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3×4</div>
              <div className="text-sm text-gray-600">Cuadrícula</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-sm text-gray-600">Completado</div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3">
                <RotateCcw className="w-4 h-4 mr-2" />
                Jugar de Nuevo
              </Button>
            </Link>
            <Button variant="outline" className="px-6 py-3">
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
          </div>

          {/* Mensaje final */}
          <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-sm text-gray-700 italic">
              "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
