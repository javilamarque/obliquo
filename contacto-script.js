document.addEventListener("DOMContentLoaded", () => {
  // Configurar el formulario de contacto
  setupContactForm()

  // Configurar navegación
  setupNavigation()

  // Crear efectos de partículas
  createBackgroundParticles()
})

// Configurar formulario de contacto
function setupContactForm() {
  const form = document.getElementById("contactForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener datos del formulario
    const formData = new FormData(form)
    const nombre = form.querySelector('input[placeholder="Nombre"]').value
    const apellido = form.querySelector('input[placeholder="Apellido"]').value
    const email = form.querySelector('input[type="email"]').value
    const mensaje = form.querySelector("textarea").value

    // Simular envío del formulario
    const submitBtn = form.querySelector(".submit-btn")
    const originalText = submitBtn.textContent

    submitBtn.textContent = "ENVIANDO..."
    submitBtn.disabled = true

    setTimeout(() => {
      submitBtn.textContent = "¡ENVIADO!"
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)"

      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.background = "linear-gradient(135deg, #8e44ad, #9b59b6)"
        form.reset()
      }, 2000)
    }, 1500)

    console.log("Formulario enviado:", { nombre, apellido, email, mensaje })
  })

  // Efectos de focus en los inputs
  const inputs = form.querySelectorAll(".form-input, .form-textarea")

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", () => {
      input.parentElement.style.transform = "scale(1)"
    })
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
          window.location.href = "bienvenida.html"
          break
        case "TRABAJOS":
          e.preventDefault()
          window.location.href = "bienvenida.html"
          break
        case "CONTACTO":
          e.preventDefault()
          // Ya estamos en contacto, no hacer nada
          break
      }
    })
  })
}

// Crear efectos de partículas de fondo
function createBackgroundParticles() {
  const particleCount = 20
  const colors = ["#a3e635", "#fbbf24", "#8e44ad", "#06b6d4"]

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle(colors[Math.floor(Math.random() * colors.length)])
    }, i * 300)
  }

  // Crear nuevas partículas cada 10 segundos
  setInterval(() => {
    createParticle(colors[Math.floor(Math.random() * colors.length)])
  }, 10000)
}

function createParticle(color) {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = "6px"
  particle.style.height = "6px"
  particle.style.backgroundColor = color
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.zIndex = "1"
  particle.style.opacity = "0.7"

  // Posición inicial aleatoria
  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = Math.random() * window.innerHeight + "px"

  // Animación de movimiento
  particle.style.transition = "all 12s linear"

  document.body.appendChild(particle)

  // Animar la partícula
  setTimeout(() => {
    particle.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 300}px) rotate(720deg)`
    particle.style.opacity = "0"
  }, 100)

  // Remover la partícula después de la animación
  setTimeout(() => {
    if (document.body.contains(particle)) {
      document.body.removeChild(particle)
    }
  }, 12000)
}

// Efecto de hover en el icono de Instagram
document.addEventListener("DOMContentLoaded", () => {
  const instagramIcon = document.querySelector(".instagram-link")

  if (instagramIcon) {
    instagramIcon.addEventListener("mouseenter", () => {
      instagramIcon.style.transform = "translateY(-5px) rotate(5deg)"
    })

    instagramIcon.addEventListener("mouseleave", () => {
      instagramIcon.style.transform = "translateY(0) rotate(0deg)"
    })
  }
})
