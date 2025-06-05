// Funciones para los botones de la página de bienvenida

function playAgain() {
  // Redirigir de vuelta al juego principal
  window.location.href = "index.html"
}

function goHome() {
  // Redirigir a la página principal (puedes cambiar esto por tu página de inicio)
  window.location.href = "index.html"
}

// Animación de entrada para la página
document.addEventListener("DOMContentLoaded", () => {
  const welcomeCard = document.querySelector(".welcome-card")

  // Agregar clase de animación
  welcomeCard.style.opacity = "0"
  welcomeCard.style.transform = "translateY(30px)"
  welcomeCard.style.transition = "all 0.6s ease"

  // Animar la entrada
  setTimeout(() => {
    welcomeCard.style.opacity = "1"
    welcomeCard.style.transform = "translateY(0)"
  }, 100)

  // Animar las estadísticas
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.4s ease"

    setTimeout(
      () => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      },
      800 + index * 200,
    )
  })

  // Animar los botones
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button, index) => {
    button.style.opacity = "0"
    button.style.transform = "translateY(20px)"
    button.style.transition = "all 0.4s ease"

    setTimeout(
      () => {
        button.style.opacity = "1"
        button.style.transform = "translateY(0)"
      },
      1400 + index * 200,
    )
  })
})

// Efecto de confeti (opcional)
function createConfetti() {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"]

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
        document.body.removeChild(confetti)
      }, 3000)
    }, i * 100)
  }
}

// Ejecutar confeti al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(createConfetti, 500)
})
