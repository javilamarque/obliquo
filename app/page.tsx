"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shuffle, RotateCcw } from "lucide-react"

interface PuzzlePiece {
  id: number
  currentPosition: number
  correctPosition: number
  x: number
  y: number
}

export default function PuzzleGame() {
  const router = useRouter()
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const ROWS = 3
  const COLS = 4
  const PIECE_WIDTH = 150
  const PIECE_HEIGHT = 100

  // Inicializar las piezas del rompecabezas
  useEffect(() => {
    const initialPieces: PuzzlePiece[] = []
    for (let i = 0; i < ROWS * COLS; i++) {
      const row = Math.floor(i / COLS)
      const col = i % COLS
      initialPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        x: col * PIECE_WIDTH,
        y: row * PIECE_HEIGHT,
      })
    }
    shufflePieces(initialPieces)
  }, [])

  // Mezclar las piezas
  const shufflePieces = (piecesToShuffle: PuzzlePiece[]) => {
    const shuffled = [...piecesToShuffle]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffled[i].currentPosition
      shuffled[i].currentPosition = shuffled[j].currentPosition
      shuffled[j].currentPosition = temp
    }
    setPieces(shuffled)
  }

  // Verificar si el rompecabezas está completo
  useEffect(() => {
    if (pieces.length > 0) {
      const complete = pieces.every((piece) => piece.currentPosition === piece.correctPosition)
      if (complete && !isComplete) {
        setIsComplete(true)
        setShowCelebration(true)
        setTimeout(() => {
          router.push("/bienvenida")
        }, 3000)
      }
    }
  }, [pieces, isComplete, router])

  // Manejar el inicio del arrastre
  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId)
    e.dataTransfer.effectAllowed = "move"
  }

  // Manejar el soltar
  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault()
    if (draggedPiece === null) return

    const newPieces = [...pieces]
    const draggedIndex = newPieces.findIndex((p) => p.id === draggedPiece)
    const targetIndex = newPieces.findIndex((p) => p.currentPosition === targetPosition)

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Intercambiar posiciones
      const temp = newPieces[draggedIndex].currentPosition
      newPieces[draggedIndex].currentPosition = newPieces[targetIndex].currentPosition
      newPieces[targetIndex].currentPosition = temp
    }

    setPieces(newPieces)
    setDraggedPiece(null)
  }

  // Permitir el drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  // Reiniciar el juego
  const resetGame = () => {
    setIsComplete(false)
    setShowCelebration(false)
    const resetPieces = pieces.map((piece) => ({ ...piece }))
    shufflePieces(resetPieces)
  }

  // Obtener la pieza en una posición específica
  const getPieceAtPosition = (position: number) => {
    return pieces.find((piece) => piece.currentPosition === position)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Rompecabezas Obliquo</h1>
          <p className="text-gray-300 mb-6">Arrastra las piezas para completar la imagen</p>

          <div className="flex gap-4 justify-center mb-6">
            <Button
              onClick={resetGame}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Mezclar
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Imagen de referencia */}
            <div className="flex-shrink-0">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">Imagen Original</h3>
              <div className="border-2 border-white/30 rounded-lg overflow-hidden">
                <Image src="/obliquo.jpg" alt="Imagen original" width={300} height={200} className="object-cover" />
              </div>
            </div>

            {/* Área del rompecabezas */}
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">Rompecabezas</h3>
              <div
                className="grid grid-cols-4 gap-1 bg-white/20 p-4 rounded-lg mx-auto"
                style={{ width: "fit-content" }}
              >
                {Array.from({ length: ROWS * COLS }, (_, position) => {
                  const piece = getPieceAtPosition(position)
                  const row = Math.floor(position / COLS)
                  const col = position % COLS

                  return (
                    <div
                      key={position}
                      className="relative border-2 border-white/30 rounded bg-white/10"
                      style={{ width: PIECE_WIDTH, height: PIECE_HEIGHT }}
                      onDrop={(e) => handleDrop(e, position)}
                      onDragOver={handleDragOver}
                    >
                      {piece && (
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, piece.id)}
                          className="w-full h-full cursor-move hover:opacity-80 transition-opacity"
                          style={{
                            backgroundImage: `url(/obliquo.jpg)`,
                            backgroundSize: `${COLS * PIECE_WIDTH}px ${ROWS * PIECE_HEIGHT}px`,
                            backgroundPosition: `-${piece.x}px -${piece.y}px`,
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mensaje de progreso */}
          <div className="mt-6 text-center">
            <div className="text-white text-sm">
              Progreso: {pieces.filter((p) => p.currentPosition === p.correctPosition).length} / {ROWS * COLS} piezas
              correctas
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(pieces.filter((p) => p.currentPosition === p.correctPosition).length / (ROWS * COLS)) * 100}%`,
                }}
              />
            </div>
          </div>
        </Card>

        {/* Celebración */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 bg-white text-center max-w-md mx-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">¡Felicitaciones!</h2>
              <p className="text-gray-600 mb-4">Has completado el rompecabezas exitosamente</p>
              <p className="text-sm text-gray-500">Redirigiendo a la página de bienvenida...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
