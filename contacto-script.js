// ✅ JAVASCRIPT PARA EFECTOS VISUALES Y FORMSPREE
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Página cargada - Formspree configurado")
  setupFormspreeForm()
  setupNavigation()
  createBackgroundParticles()
  setupFormEffects()
  setupSocialIcons() // ✅ NUEVO: Configurar iconos sociales
})

// ✅ CONFIGURAR FORMULARIO FORMSPREE
function setupFormspreeForm() {
  const form = document.getElementById("contactForm")
  const submitBtn = form.querySelector(".submit-btn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")
  const formStatus = document.getElementById("formStatus")

  form.addEventListener("submit", (e) => {
    // Mostrar estado de carga
    btnText.classList.add("hidden")
    btnLoading.classList.remove("hidden")
    submitBtn.disabled = true
    submitBtn.classList.add("loading")

    // Ocultar mensajes anteriores
    formStatus.classList.add("hidden")

    console.log("📧 Enviando formulario a Formspree...")

    // Formspree manejará el envío automáticamente
    // Si hay error, lo mostramos
    setTimeout(() => {
      // Este timeout es solo para mostrar el estado de carga
      // Formspree redirigirá automáticamente si todo está bien
    }, 1000)
  })

  // Manejar errores de Formspree (si el usuario vuelve a la página)
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get("error")) {
    showFormStatus("Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.", "error")
  }
}

// ✅ MOSTRAR ESTADO DEL FORMULARIO
function showFormStatus(message, type) {
  const formStatus = document.getElementById("formStatus")
  formStatus.textContent = message
  formStatus.className = `form-status ${type}`
  formStatus.classList.remove("hidden")

  // Auto-ocultar después de 5 segundos
  setTimeout(() => {
    formStatus.classList.add("hidden")
  }, 5000)
}

// ✅ EFECTOS VISUALES DEL FORMULARIO
function setupFormEffects() {
  const form = document.querySelector(".contact-form")
  const inputs = form.querySelectorAll(".form-input, .form-textarea, .form-select")
  const submitBtn = form.querySelector(".submit-btn")

  // Efectos de focus en los inputs
  inputs.forEach((input, index) => {
    input.addEventListener("focus", () => {
      input.style.transform = "scale(1.02)"
      input.style.boxShadow = "0 0 0 3px rgba(163, 230, 53, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)"
      // Efecto de onda
      createRippleEffect(input, index)
    })

    input.addEventListener("blur", () => {
      input.style.transform = "scale(1)"
      input.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
    })

    // Validación en tiempo real
    input.addEventListener("input", () => {
      validateField(input)
    })
  })

  // Efecto hover en el botón
  submitBtn.addEventListener("mouseenter", () => {
    if (!submitBtn.disabled) {
      submitBtn.style.transform = "translateY(-3px) scale(1.02)"
      submitBtn.style.boxShadow = "0 12px 24px rgba(142, 68, 173, 0.4)"
    }
  })

  submitBtn.addEventListener("mouseleave", () => {
    if (!submitBtn.disabled) {
      submitBtn.style.transform = "translateY(0) scale(1)"
      submitBtn.style.boxShadow = "0 6px 12px rgba(142, 68, 173, 0.3)"
    }
  })
}

// ✅ CREAR EFECTO DE ONDA
function createRippleEffect(element, index) {
  const ripple = document.createElement("div")
  ripple.style.position = "absolute"
  ripple.style.width = "10px"
  ripple.style.height = "10px"
  ripple.style.background = `hsl(${120 + index * 30}, 70%, 60%)`
  ripple.style.borderRadius = "50%"
  ripple.style.pointerEvents = "none"
  ripple.style.zIndex = "1000"
  ripple.style.opacity = "0.7"

  const rect = element.getBoundingClientRect()
  ripple.style.left = rect.left + Math.random() * rect.width + "px"
  ripple.style.top = rect.top + Math.random() * rect.height + "px"

  document.body.appendChild(ripple)

  // Animar la onda
  ripple.style.transition = "all 1s ease-out"
  setTimeout(() => {
    ripple.style.transform = "scale(10)"
    ripple.style.opacity = "0"
  }, 10)

  // Remover después de la animación
  setTimeout(() => {
    if (document.body.contains(ripple)) {
      document.body.removeChild(ripple)
    }
  }, 1000)
}

// ✅ VALIDAR CAMPOS
function validateField(field) {
  const value = field.value.trim()

  // Remover clases anteriores
  field.classList.remove("valid", "invalid")

  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && emailRegex.test(value)) {
      field.classList.add("valid")
      field.style.borderLeft = "4px solid #10b981"
    } else if (value) {
      field.classList.add("invalid")
      field.style.borderLeft = "4px solid #ef4444"
    } else {
      field.style.borderLeft = "none"
    }
  } else if (field.required) {
    if (value.length >= 2) {
      field.classList.add("valid")
      field.style.borderLeft = "4px solid #10b981"
    } else if (value) {
      field.classList.add("invalid")
      field.style.borderLeft = "4px solid #ef4444"
    } else {
      field.style.borderLeft = "none"
    }
  }
}

// ✅ NAVEGACIÓN
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
          break
      }
    })

    // Efecto hover mejorado
    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-2px) scale(1.05)"
    })

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0) scale(1)"
    })
  })
}

// ✅ PARTÍCULAS DE FONDO MEJORADAS
function createBackgroundParticles() {
  const particleCount = 20
  const colors = ["#a3e635", "#fbbf24", "#8e44ad", "#06b6d4", "#f59e0b"]

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle(colors[Math.floor(Math.random() * colors.length)], i)
    }, i * 500)
  }

  // Crear nuevas partículas cada 15 segundos
  setInterval(() => {
    createParticle(colors[Math.floor(Math.random() * colors.length)])
  }, 15000)
}

function createParticle(color, index = 0) {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = Math.random() * 8 + 4 + "px"
  particle.style.height = particle.style.width
  particle.style.backgroundColor = color
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.zIndex = "1"
  particle.style.opacity = "0.4"
  particle.style.filter = "blur(1px)"

  // Posición inicial aleatoria
  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = Math.random() * window.innerHeight + "px"

  // Animación de movimiento
  particle.style.transition = `all ${15 + Math.random() * 10}s linear`

  document.body.appendChild(particle)

  // Animar la partícula
  setTimeout(() => {
    const moveX = (Math.random() - 0.5) * 600
    const moveY = (Math.random() - 0.5) * 600
    const rotation = Math.random() * 1440 // 0-4 rotaciones completas

    particle.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg) scale(${Math.random() * 2 + 0.5})`
    particle.style.opacity = "0"
  }, 100)

  // Remover la partícula después de la animación
  setTimeout(() => {
    if (document.body.contains(particle)) {
      document.body.removeChild(particle)
    }
  }, 25000)
}

// ✅ CONFIGURAR ICONOS SOCIALES - INSTAGRAM Y ARTSTATION
function setupSocialIcons() {
  const instagramIcon = document.querySelector(".instagram-link")
  const artstationIcon = document.querySelector(".artstation-link")

  // ✅ EFECTOS INSTAGRAM
  if (instagramIcon) {
    instagramIcon.addEventListener("mouseenter", () => {
      instagramIcon.style.transform = "translateY(-10px) rotate(15deg) scale(1.2)"
      instagramIcon.style.color = "#a3e635"
      // Crear partículas alrededor del icono
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createSocialParticle(instagramIcon, "#a3e635")
        }, i * 100)
      }
    })

    instagramIcon.addEventListener("mouseleave", () => {
      instagramIcon.style.transform = "translateY(0) rotate(0deg) scale(1)"
      instagramIcon.style.color = "#a3e635"
    })
  }

  // ✅ EFECTOS ARTSTATION
  if (artstationIcon) {
    artstationIcon.addEventListener("mouseenter", () => {
      artstationIcon.style.transform = "translateY(-10px) rotate(-15deg) scale(1.2)"
      artstationIcon.style.filter = "brightness(1.3) drop-shadow(0 0 10px #fbbf24)"
      // Crear partículas alrededor del icono
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createSocialParticle(artstationIcon, "#fbbf24")
        }, i * 100)
      }
    })

    artstationIcon.addEventListener("mouseleave", () => {
      artstationIcon.style.transform = "translateY(0) rotate(0deg) scale(1)"
      artstationIcon.style.filter = "brightness(1) drop-shadow(0 0 5px rgba(163, 230, 53, 0.3))"
    })
  }
}

// ✅ CREAR PARTÍCULAS PARA ICONOS SOCIALES
function createSocialParticle(element, color) {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = "6px"
  particle.style.height = "6px"
  particle.style.backgroundColor = color
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.zIndex = "1001"
  particle.style.opacity = "0.8"

  const rect = element.getBoundingClientRect()
  particle.style.left = rect.left + rect.width / 2 + "px"
  particle.style.top = rect.top + rect.height / 2 + "px"

  document.body.appendChild(particle)

  particle.style.transition = "all 1s ease-out"
  setTimeout(() => {
    const angle = Math.random() * Math.PI * 2
    const distance = 50 + Math.random() * 30
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    particle.style.transform = `translate(${x}px, ${y}px) scale(0)`
    particle.style.opacity = "0"
  }, 10)

  setTimeout(() => {
    if (document.body.contains(particle)) {
      document.body.removeChild(particle)
    }
  }, 1000)
}


