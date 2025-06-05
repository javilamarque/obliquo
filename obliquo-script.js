// Variables globales
let currentSection = 0
const totalSections = 2
let isScrolling = false

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar mensaje de éxito
  showSuccessMessage()

  // Configurar scroll horizontal
  setupHorizontalScroll()

  // Configurar navegación
  setupNavigation()

  // Configurar indicadores de scroll
  setupScrollIndicators()

  // Configurar eventos de las tarjetas del equipo
  setupTeamCardEvents()

  // Configurar eventos de servicios
  setupServiceEvents()

  // Crear efectos de partículas
  createBackgroundParticles()
})

// Mostrar mensaje de éxito
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage")
  if (successMessage) {
    setTimeout(() => {
      successMessage.classList.add("show")
    }, 500)

    setTimeout(() => {
      successMessage.classList.remove("show")
    }, 4000)
  }
}

// Configurar scroll horizontal
function setupHorizontalScroll() {
  // Scroll con rueda del mouse
  document.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return

      e.preventDefault()

      if (e.deltaY > 0) {
        // Scroll hacia la derecha
        nextSection()
      } else {
        // Scroll hacia la izquierda
        prevSection()
      }
    },
    { passive: false },
  )

  // Scroll con teclas de flecha
  document.addEventListener("keydown", (e) => {
    if (isScrolling) return

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault()
        nextSection()
        break
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault()
        prevSection()
        break
    }
  })

  // Touch events para móviles
  let startX = 0
  let startY = 0

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  })

  document.addEventListener("touchend", (e) => {
    if (isScrolling) return

    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const diffX = startX - endX
    const diffY = startY - endY

    // Solo procesar si el movimiento horizontal es mayor que el vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSection()
      } else {
        prevSection()
      }
    }
  })
}

// Ir a la siguiente sección
function nextSection() {
  if (currentSection < totalSections - 1) {
    currentSection++
    updateScroll()
  }
}

// Ir a la sección anterior
function prevSection() {
  if (currentSection > 0) {
    currentSection--
    updateScroll()
  }
}

// Actualizar el scroll
function updateScroll() {
  if (isScrolling) return

  isScrolling = true
  const container = document.querySelector(".horizontal-container")
  const translateX = -currentSection * 100

  container.style.transform = `translateX(${translateX}vw)`

  // Actualizar indicadores
  updateScrollIndicators()

  // Resetear flag después de la animación
  setTimeout(() => {
    isScrolling = false
  }, 800)
}

// Configurar indicadores de scroll
function setupScrollIndicators() {
  const dots = document.querySelectorAll(".dot")

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (isScrolling) return
      currentSection = index
      updateScroll()
    })
  })
}

// Actualizar indicadores de scroll
function updateScrollIndicators() {
  const dots = document.querySelectorAll(".dot")

  dots.forEach((dot, index) => {
    if (index === currentSection) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

// Configurar navegación
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.textContent.trim()

      switch (href) {
        case "HOME":
          e.preventDefault()
          window.location.href = "index.html"
          break
        case "NOSOTROS":
          e.preventDefault()
          currentSection = 0
          updateScroll()
          break
        case "TRABAJOS":
          e.preventDefault()
          currentSection = 1
          updateScroll()
          break
        case "CONTACTO":
          e.preventDefault()
          window.location.href = "contacto.html"
          break
      }
    })
  })
}

// Configurar eventos de las tarjetas del equipo
function setupTeamCardEvents() {
  const teamCards = document.querySelectorAll(".team-card")

  teamCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      // Efecto de pulso
      card.style.transform = "scale(0.95)"
      setTimeout(() => {
        card.style.transform = "translateY(-10px)"
      }, 150)

      console.log(`Clicked on team member ${index + 1}`)
    })
  })
}

// Configurar eventos de servicios
function setupServiceEvents() {
  const serviceItems = document.querySelectorAll(".service-item")

  serviceItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const serviceName = item.dataset.service
      console.log(`Clicked on service: ${serviceName}`)

      // Efecto de pulso
      item.style.transform = "scale(0.98)"
      setTimeout(() => {
        item.style.transform = "scale(1.02)"
      }, 150)
    })
  })
}

// Crear efectos de partículas de fondo
function createBackgroundParticles() {
  const particleCount = 15
  const colors = ["#a3e635", "#ef4444", "#ec4899", "#06b6d4"]

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle(colors[Math.floor(Math.random() * colors.length)])
    }, i * 200)
  }

  // Crear nuevas partículas cada 8 segundos
  setInterval(() => {
    createParticle(colors[Math.floor(Math.random() * colors.length)])
  }, 8000)
}

function createParticle(color) {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = "4px"
  particle.style.height = "4px"
  particle.style.backgroundColor = color
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.zIndex = "1"
  particle.style.opacity = "0.6"

  // Posición inicial aleatoria
  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = Math.random() * window.innerHeight + "px"

  // Animación de movimiento
  particle.style.transition = "all 10s linear"

  document.body.appendChild(particle)

  // Animar la partícula
  setTimeout(() => {
    particle.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(360deg)`
    particle.style.opacity = "0"
  }, 100)

  // Remover la partícula después de la animación
  setTimeout(() => {
    if (document.body.contains(particle)) {
      document.body.removeChild(particle)
    }
  }, 10000)
}

// Funciones para volver al rompecabezas
function playAgain() {
  window.location.href = "index.html"
}

function goHome() {
  window.location.href = "index.html"
}

// Efecto de confeti al cargar la página
function createConfetti() {
  const colors = ["#a3e635", "#ef4444", "#ec4899", "#06b6d4", "#fbbf24"]

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.top = "-10px"
      confetti.style.width = "8px"
      confetti.style.height = "8px"
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
}

// Ejecutar confeti al cargar la página
setTimeout(createConfetti, 1000)
