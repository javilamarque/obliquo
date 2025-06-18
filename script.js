class PuzzleGame {
  constructor() {
    this.ROWS = 2
    this.COLS = 3
    this.TOTAL_PIECES = 6 // 6 piezas en total
    this.PIECE_WIDTH = 150
    this.PIECE_HEIGHT = 150
    this.pieces = []
    this.draggedElement = null
    this.draggedPieceId = null

    this.init()
  }

  init() {
    this.createPuzzlePieces()
    this.renderPuzzle()
    this.shufflePieces()
    this.setupEventListeners()
    this.updateProgress()
  }

  createPuzzlePieces() {
    this.pieces = []
    for (let i = 0; i < this.TOTAL_PIECES; i++) {
      const row = Math.floor(i / this.COLS)
      const col = i % this.COLS
      this.pieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        x: col * this.PIECE_WIDTH,
        y: row * this.PIECE_HEIGHT,
      })
    }
  }

  renderPuzzle() {
    const puzzleGrid = document.getElementById("puzzleGrid")
    puzzleGrid.innerHTML = ""

    for (let position = 0; position < this.ROWS * this.COLS; position++) {
      const slot = document.createElement("div")
      slot.className = "puzzle-piece"
      slot.dataset.position = position

      const piece = this.getPieceAtPosition(position)
      if (piece) {
        const pieceImage = document.createElement("div")
        pieceImage.className = "piece-image"
        pieceImage.dataset.pieceId = piece.id
        pieceImage.draggable = true

        // Calcular la posición de fondo correcta
        const bgX = -piece.x
        const bgY = -piece.y

        pieceImage.style.backgroundPosition = `${bgX}px ${bgY}px`

        slot.appendChild(pieceImage)
      }

      puzzleGrid.appendChild(slot)
    }
  }

  getPieceAtPosition(position) {
    return this.pieces.find((piece) => piece.currentPosition === position)
  }

  shufflePieces() {
    // Crear una copia del array de posiciones
    const positions = Array.from({ length: this.TOTAL_PIECES }, (_, i) => i)

    // Mezclar las posiciones usando Fisher-Yates
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[positions[i], positions[j]] = [positions[j], positions[i]]
    }

    // Asignar las posiciones mezcladas a las piezas
    this.pieces.forEach((piece, index) => {
      piece.currentPosition = positions[index]
    })

    this.renderPuzzle()
    this.updateProgress()
  }

  setupEventListeners() {
    const puzzleGrid = document.getElementById("puzzleGrid")
    const shuffleBtn = document.getElementById("shuffleBtn")
    const resetBtn = document.getElementById("resetBtn")

    // Eventos de arrastrar y soltar
    puzzleGrid.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("piece-image")) {
        this.draggedElement = e.target
        this.draggedPieceId = Number.parseInt(e.target.dataset.pieceId)
        e.target.parentElement.classList.add("dragging")
        e.dataTransfer.effectAllowed = "move"
      }
    })

    puzzleGrid.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("piece-image")) {
        e.target.parentElement.classList.remove("dragging")
        this.draggedElement = null
        this.draggedPieceId = null
      }
    })

    puzzleGrid.addEventListener("dragover", (e) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "move"
    })

    puzzleGrid.addEventListener("dragenter", (e) => {
      if (e.target.classList.contains("puzzle-piece")) {
        e.target.classList.add("drag-over")
      }
    })

    puzzleGrid.addEventListener("dragleave", (e) => {
      if (e.target.classList.contains("puzzle-piece")) {
        e.target.classList.remove("drag-over")
      }
    })

    puzzleGrid.addEventListener("drop", (e) => {
      e.preventDefault()
      const targetSlot = e.target.closest(".puzzle-piece")
      if (targetSlot && this.draggedPieceId !== null) {
        targetSlot.classList.remove("drag-over")
        const targetPosition = Number.parseInt(targetSlot.dataset.position)
        this.swapPieces(this.draggedPieceId, targetPosition)
      }
    })

    // Botones de control
    shuffleBtn.addEventListener("click", () => this.shufflePieces())
    resetBtn.addEventListener("click", () => this.resetGame())
  }

  swapPieces(draggedPieceId, targetPosition) {
    const draggedPiece = this.pieces.find((p) => p.id === draggedPieceId)
    const targetPiece = this.getPieceAtPosition(targetPosition)

    if (draggedPiece && targetPiece) {
      // Intercambiar posiciones
      const temp = draggedPiece.currentPosition
      draggedPiece.currentPosition = targetPiece.currentPosition
      targetPiece.currentPosition = temp
    }

    this.renderPuzzle()
    this.updateProgress()
    this.checkCompletion()
  }

  updateProgress() {
    const correctPieces = this.pieces.filter((piece) => piece.currentPosition === piece.correctPosition).length

    const progressText = document.getElementById("progressText")
    const progressFill = document.getElementById("progressFill")

    progressText.textContent = `${correctPieces} / ${this.TOTAL_PIECES}`

    const percentage = (correctPieces / this.TOTAL_PIECES) * 100
    progressFill.style.width = `${percentage}%`
  }

  checkCompletion() {
    const isComplete = this.pieces.every((piece) => piece.currentPosition === piece.correctPosition)

    if (isComplete) {
      this.showCelebration()
    }
  }

  showCelebration() {
    const modal = document.getElementById("celebrationModal")
    modal.classList.remove("hidden")

    // Redirigir después de 3 segundos con detección de entorno
    setTimeout(() => {
      this.redirectToWelcome()
    }, 3000)
  }

  // Función para manejar la redirección según el entorno
  redirectToWelcome() {
    // Detectar si estamos en Vercel o servidor local
    const hostname = window.location.hostname
    const isVercel = hostname.includes("vercel.app") || hostname.includes("vercel.com")
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1"

    if (isVercel) {
      // En Vercel, usar rutas sin extensión
      window.location.href = "/bienvenida"
    } else if (isLocalhost) {
      // En localhost, usar archivos HTML
      window.location.href = "bienvenida.html"
    } else {
      // Fallback: intentar ambas opciones
      window.location.href = "bienvenida.html"
    }
  }

  resetGame() {
    this.createPuzzlePieces()
    this.shufflePieces()
  }
}

// Inicializar el juego cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  new PuzzleGame()
})

// Función para cerrar el modal si se hace clic fuera de él
document.addEventListener("click", (e) => {
  const modal = document.getElementById("celebrationModal")
  if (e.target === modal) {
    modal.classList.add("hidden")
  }
})
