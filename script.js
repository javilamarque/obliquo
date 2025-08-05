// ✅ VARIABLES GLOBALES DEL ROMPECABEZAS
let pieces = []
const correctPositions = [0, 1, 2, 3, 4, 5] // Posiciones correctas
let currentPositions = [] // Posiciones actuales
let draggedElement = null
let draggedIndex = null

// ✅ CONFIGURACIÓN DEL ROMPECABEZAS
const PUZZLE_COLS = 3
const PUZZLE_ROWS = 2
const PIECE_WIDTH = 150
const PIECE_HEIGHT = 100

// ✅ INICIALIZAR JUEGO
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 Iniciando Rompecabezas Obliquo...")
  initializePuzzle()
  setupEventListeners()
  // Mezclar después de un pequeño delay para que se vea la imagen completa primero
  setTimeout(() => {
    shufflePieces()
  }, 1500)
})

// ✅ CREAR PIEZAS DEL ROMPECABEZAS
function initializePuzzle() {
  const puzzleGrid = document.getElementById("puzzleGrid")
  puzzleGrid.innerHTML = ""
  pieces = []
  currentPositions = [0, 1, 2, 3, 4, 5]

  // Crear 6 piezas (2 filas x 3 columnas)
  for (let i = 0; i < 6; i++) {
    const piece = document.createElement("div")
    piece.className = "puzzle-piece"
    piece.draggable = true
    piece.dataset.pieceId = i
    piece.dataset.currentPosition = i

    // Calcular posición de la imagen de fondo para cada pieza
    const col = i % PUZZLE_COLS
    const row = Math.floor(i / PUZZLE_COLS)

    // Calcular el desplazamiento de la imagen de fondo
    const bgPosX = -(col * PIECE_WIDTH)
    const bgPosY = -(row * PIECE_HEIGHT)

    // Aplicar la imagen de fondo con la posición correcta
    piece.style.backgroundImage = "url('obliquo.jpg')"
    piece.style.backgroundSize = `${PUZZLE_COLS * PIECE_WIDTH}px ${PUZZLE_ROWS * PIECE_HEIGHT}px`
    piece.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`
    piece.style.backgroundRepeat = "no-repeat"

    // Event listeners para drag & drop
    piece.addEventListener("dragstart", handleDragStart)
    piece.addEventListener("dragover", handleDragOver)
    piece.addEventListener("drop", handleDrop)
    piece.addEventListener("dragend", handleDragEnd)

    pieces.push(piece)
    puzzleGrid.appendChild(piece)
  }

  updateProgress()
  console.log("🧩 Rompecabezas inicializado con 6 piezas")
}

// ✅ CONFIGURAR EVENT LISTENERS
function setupEventListeners() {
  const shuffleBtn = document.getElementById("shuffleBtn")
  const resetBtn = document.getElementById("resetBtn")

  shuffleBtn.addEventListener("click", shufflePieces)
  resetBtn.addEventListener("click", resetPuzzle)

  console.log("🎛️ Event listeners configurados")
}

// ✅ DRAG & DROP HANDLERS
function handleDragStart(e) {
  draggedElement = e.target
  draggedIndex = Number.parseInt(e.target.dataset.currentPosition)
  e.target.classList.add("dragging")

  console.log(`🖱️ Arrastrando pieza desde posición ${draggedIndex}`)
}

function handleDragOver(e) {
  e.preventDefault()
  e.target.classList.add("drag-over")
}

function handleDrop(e) {
  e.preventDefault()
  e.target.classList.remove("drag-over")

  if (e.target.classList.contains("puzzle-piece") && e.target !== draggedElement) {
    const targetIndex = Number.parseInt(e.target.dataset.currentPosition)
    swapPieces(draggedIndex, targetIndex)
    console.log(`🔄 Intercambiando piezas: ${draggedIndex} ↔ ${targetIndex}`)
  }
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging")
  document.querySelectorAll(".puzzle-piece").forEach((piece) => {
    piece.classList.remove("drag-over")
  })
  draggedElement = null
  draggedIndex = null
}

// ✅ INTERCAMBIAR PIEZAS
function swapPieces(index1, index2) {
  const piece1 = pieces.find((p) => Number.parseInt(p.dataset.currentPosition) === index1)
  const piece2 = pieces.find((p) => Number.parseInt(p.dataset.currentPosition) === index2)

  if (piece1 && piece2) {
    // Intercambiar posiciones en el array
    const pieceId1 = Number.parseInt(piece1.dataset.pieceId)
    const pieceId2 = Number.parseInt(piece2.dataset.pieceId)

    currentPositions[index1] = pieceId2
    currentPositions[index2] = pieceId1

    // Actualizar dataset
    piece1.dataset.currentPosition = index2
    piece2.dataset.currentPosition = index1

    // Intercambiar en el DOM
    const puzzleGrid = document.getElementById("puzzleGrid")
    const tempNextSibling = piece1.nextSibling
    puzzleGrid.insertBefore(piece1, piece2.nextSibling)
    puzzleGrid.insertBefore(piece2, tempNextSibling)

    updateProgress()
    checkCompletion()
  }
}

// ✅ MEZCLAR PIEZAS
function shufflePieces() {
  console.log("🔀 Mezclando piezas...")

  // Crear array de índices y mezclarlo
  const shuffledIndices = [0, 1, 2, 3, 4, 5]

  // Algoritmo Fisher-Yates para mezclar
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]]
  }

  // Reorganizar piezas en el DOM según el nuevo orden
  const puzzleGrid = document.getElementById("puzzleGrid")
  puzzleGrid.innerHTML = ""

  shuffledIndices.forEach((pieceId, position) => {
    const piece = pieces[pieceId]
    piece.dataset.currentPosition = position
    currentPositions[position] = pieceId
    puzzleGrid.appendChild(piece)
  })

  updateProgress()
  console.log("✅ Piezas mezcladas")
}

// ✅ REINICIAR ROMPECABEZAS
function resetPuzzle() {
  console.log("🔄 Reiniciando rompecabezas...")
  currentPositions = [0, 1, 2, 3, 4, 5]

  const puzzleGrid = document.getElementById("puzzleGrid")
  puzzleGrid.innerHTML = ""

  pieces.forEach((piece, index) => {
    piece.dataset.currentPosition = index
    puzzleGrid.appendChild(piece)
  })

  updateProgress()
  checkCompletion()
  console.log("✅ Rompecabezas reiniciado")
}

// ✅ ACTUALIZAR PROGRESO
function updateProgress() {
  let correctPieces = 0

  currentPositions.forEach((pieceId, position) => {
    if (pieceId === position) {
      correctPieces++
    }
  })

  const progressText = document.getElementById("progressText")
  const progressFill = document.getElementById("progressFill")

  progressText.textContent = `${correctPieces} / 6`
  progressFill.style.width = `${(correctPieces / 6) * 100}%`

  console.log(`📊 Progreso: ${correctPieces}/6 piezas correctas`)
}

// ✅ VERIFICAR COMPLETACIÓN
function checkCompletion() {
  const isComplete = currentPositions.every((pieceId, position) => pieceId === position)

  if (isComplete) {
    console.log("🎉 ¡Rompecabezas completado!")
    setTimeout(() => {
      showCelebrationModal()
    }, 500)
  }
}

// ✅ MOSTRAR MODAL DE CELEBRACIÓN
function showCelebrationModal() {
  const modal = document.getElementById("celebrationModal")
  modal.classList.remove("hidden")

  // Crear confetti
  createConfetti()

  // Esperar 3 segundos y mostrar video
  setTimeout(() => {
    modal.classList.add("hidden")
    showCompletionVideo()
  }, 3000)

  console.log("🎊 Modal de celebración mostrado")
}

// ✅ MOSTRAR VIDEO DE COMPLETACIÓN CON CONTROLES Y SONIDO
function showCompletionVideo() {
  const videoModal = document.getElementById("videoModal")
  const video = document.getElementById("completionVideo")
  const skipBtn = document.getElementById("skipVideoBtn")
  const muteBtn = document.getElementById("muteBtn")

  videoModal.classList.remove("hidden")

  // ✅ CONFIGURAR VIDEO CON SONIDO
  video.currentTime = 0
  video.volume = 0.7 // Volumen al 70%
  video.muted = false // ✅ HABILITAR SONIDO

  // ✅ CONFIGURAR BOTÓN DE SALTAR
  skipBtn.addEventListener("click", () => {
    console.log("⏭️ Usuario saltó el video")
    redirectToBienvenida()
  })

  // ✅ CONFIGURAR BOTÓN DE MUTE/UNMUTE
  muteBtn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false
      muteBtn.innerHTML = '<span class="icon">🔊</span>'
      console.log("🔊 Video desmutado")
    } else {
      video.muted = true
      muteBtn.innerHTML = '<span class="icon">🔇</span>'
      console.log("🔇 Video muteado")
    }
  })

  // ✅ REPRODUCIR VIDEO
  video.play().catch((error) => {
    console.log("Error al reproducir video:", error)
    // Si hay error, mostrar botón para continuar manualmente
    setTimeout(() => {
      redirectToBienvenida()
    }, 2000)
  })

  // ✅ CUANDO TERMINE EL VIDEO, REDIRIGIR AUTOMÁTICAMENTE
  video.addEventListener("ended", () => {
    console.log("🎬 Video terminado, redirigiendo...")
    setTimeout(() => {
      redirectToBienvenida()
    }, 1000)
  })

  // ✅ PERMITIR DOBLE CLICK PARA SALTAR
  video.addEventListener("dblclick", () => {
    console.log("🖱️ Doble click en video, redirigiendo...")
    redirectToBienvenida()
  })

  // ✅ TECLA ESC PARA SALTAR
  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      console.log("⌨️ ESC presionado, redirigiendo...")
      redirectToBienvenida()
      document.removeEventListener("keydown", handleEscKey)
    }
  }
  document.addEventListener("keydown", handleEscKey)

  console.log("🎬 Video de completación iniciado con controles")
}

// ✅ REDIRIGIR A BIENVENIDA
function redirectToBienvenida() {
  const videoModal = document.getElementById("videoModal")
  const video = document.getElementById("completionVideo")

  // Pausar y limpiar video
  if (video) {
    video.pause()
    video.currentTime = 0
  }

  // Efecto de transición
  if (videoModal) {
    videoModal.style.transition = "opacity 0.5s ease"
    videoModal.style.opacity = "0"
  }

  setTimeout(() => {
    console.log("🏠 Redirigiendo a bienvenida.html...")
    window.location.href = "bienvenida.html"
  }, 500)
}

// ✅ CREAR EFECTO CONFETTI
function createConfetti() {
  const colors = ["#a3e635", "#84cc16", "#65a30d", "#4ade80", "#22c55e", "#16a34a"]

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.top = "-10px"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = "50%"
      confetti.style.pointerEvents = "none"
      confetti.style.zIndex = "9999"
      confetti.style.transition = "all 3s ease-out"

      document.body.appendChild(confetti)

      setTimeout(() => {
        confetti.style.top = "100vh"
        confetti.style.transform = "rotate(720deg)"
        confetti.style.opacity = "0"
      }, 100)

      setTimeout(() => {
        if (document.body.contains(confetti)) {
          document.body.removeChild(confetti)
        }
      }, 3000)
    }, i * 50)
  }

  console.log("🎊 Confetti creado")
}

console.log("🚀 Script del rompecabezas cargado correctamente")

