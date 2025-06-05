// Script para la página de Obliquo

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar mensaje de éxito brevemente
  showSuccessMessage()

  // Agregar interactividad a las tarjetas del equipo
  setupTeamCards()

  // Configurar navegación
  setupNavigation()
})

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage")

  // Mostrar el mensaje
  setTimeout(() => {
    successMessage.classList.add("show")
  }, 500)

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    successMessage.classList.remove("show")
  }, 4000)
}

function setupTeamCards() {
  const teamCards = document.querySelectorAll(".team-card")

  teamCards.forEach((card, index) => {
    // Efecto hover mejorado
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })

    // Click en las tarjetas
    card.addEventListener("click", () => {
      const memberName = card.querySelector(".member-name").textContent
      const memberRole = card.querySelector(".member-role").textContent

      // Efecto de click
      card.style.transform = "translateY(-5px) scale(0.98)"
      setTimeout(() => {
        card.style.transform = "translateY(-15px) scale(1.02)"
      }, 150)

      // Aquí puedes agregar más funcionalidad, como mostrar un modal
      console.log(`Clicked on ${memberName} - ${memberRole}`)
    })
  })
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()

      const linkText = link.textContent

      // Efecto visual en el enlace clickeado
      link.style.color = "#a3e635"
      setTimeout(() => {
        link.style.color = ""
      }, 300)

      // Manejar navegación
      switch (linkText) {
        case "HOME":
          // Redirigir al rompecabezas
          window.location.href = "index.html"
          break
        case "NOSOTROS":
          // Scroll suave a la sección del equipo
          document.querySelector(".team-section").scrollIntoView({
            behavior: "smooth",
          })
          break
        case "TRABAJOS":
          // Aquí puedes agregar funcionalidad para mostrar trabajos
          showComingSoon("Sección de Trabajos")
          break
        case "CONTACTO":
          // Aquí puedes agregar funcionalidad de contacto
          showComingSoon("Sección de Contacto")
          break
      }
    })
  })
}

function showComingSoon(section) {
  // Crear y mostrar un mensaje temporal
  const message = document.createElement("div")
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    text-align: center;
    font-size: 1.1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

  message.innerHTML = `
    <div style="font-size: 2rem; margin-bottom: 10px;">🚧</div>
    <div><strong>${section}</strong></div>
    <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">Próximamente...</div>
  `

  document.body.appendChild(message)

  // Mostrar con animación
  setTimeout(() => {
    message.style.opacity = "1"
  }, 100)

  // Ocultar después de 2 segundos
  setTimeout(() => {
    message.style.opacity = "0"
    setTimeout(() => {
      document.body.removeChild(message)
    }, 300)
  }, 2000)
}

// Efecto parallax sutil en el scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const teamCards = document.querySelectorAll(".team-card")

  teamCards.forEach((card, index) => {
    const speed = 0.1 + index * 0.05
    card.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Efecto de partículas en el fondo (opcional)
function createFloatingShapes() {
  const shapes = ["◆", "●", "▲", "■"]
  const colors = ["#a3e635", "#ef4444", "#ec4899", "#06b6d4"]

  for (let i = 0; i < 20; i++) {
    const shape = document.createElement("div")
    shape.textContent = shapes[Math.floor(Math.random() * shapes.length)]
    shape.style.cssText = `
      position: fixed;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      font-size: ${Math.random() * 20 + 10}px;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      opacity: 0.1;
      pointer-events: none;
      z-index: -1;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
    `

    document.body.appendChild(shape)
  }
}

// CSS para la animación de las formas flotantes
const style = document.createElement("style")
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(100vh) rotate(0deg);
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
    }
  }
`
document.head.appendChild(style)

// Inicializar efectos adicionales
setTimeout(createFloatingShapes, 1000)
