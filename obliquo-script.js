// Variables globales
let currentSection = 0
const totalSections = 2
let isScrolling = false
let currentCarouselIndex = 0

// Datos de las categorías con sus imágenes
const categoryData = {
    "Diseño Gráfico": {
        images: [
            {
                src: "./public/diseñoGrafico/1.jpg",
                title: "Identidad Visual Corporativa",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                src: "./public/diseñoGrafico/2.jpg",
                title: "Diseño Editorial Moderno",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            },
            {
                src: "./public/diseñoGrafico/3.jpg",
                title: "Packaging Innovador",
                description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
            },
            {
                src: "./public/diseñoGrafico/4.jpg",
                title: "Branding Estratégico",
                description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
            },
            {
                src: "./public/diseñoGrafico/5.jpg",
                title: "Diseño de Logotipos",
                description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
            }
        ]
    },
    "Motion Graphics": {
        images: [
            {
                src: "./public/motion/1.jpg",
                title: "Animación 2D Creativa",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."
            },
            {
                src: "./public/motion/2.jpg",
                title: "Efectos Visuales Dinámicos",
                description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            },
            {
                src: "./public/motion/3.jpg",
                title: "Transiciones Cinematográficas",
                description: "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est."
            },
            {
                src: "./public/motion/4.jpg",
                title: "Animación de Personajes",
                description: "Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi."
            },
            {
                src: "./public/motion/5.jpg",
                title: "Motion Graphics Corporativo",
                description: "Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus."
            }
        ]
    },
    "Diseño Publicitario": {
        images: [
            {
                src: "./public/carrousel-campanias/1.jpg",
                title: "Campaña Publicitaria Integral",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt mauris eu risus."
            }
        ]
    },
    "Merchandising": {
        images: [
            {
                src: "./public/marchan/1.jpg",
                title: "Productos Promocionales",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat accumsan nulla."
            },
            {
                src: "./public/marchan/2.jpg",
                title: "Merchandising Corporativo",
                description: "Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh."
            }
        ]
    },
    "Diseño Web": {
        images: [
            {
                src: "./public/diseñoWeb/1.jpg",
                title: "Sitio Web Responsivo",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a quam."
            },
            {
                src: "./public/diseñoWeb/2.jpg",
                title: "E-commerce Moderno",
                description: "Quisque lorem tortor, gravida sit amet, ornare a, interdum at, justo."
            },
            {
                src: "./public/diseñoWeb/3.jpg",
                title: "Landing Page Optimizada",
                description: "Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor."
            }
        ]
    },
    "Modelado 3D": {
        images: [
            {
                src: "./public/3d/1.jpg",
                title: "Modelado Arquitectónico",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat risus quis eros."
            },
            {
                src: "./public/3d/2.jpg",
                title: "Renderizado Fotorrealista",
                description: "Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo."
            },
            {
                src: "./public/3d/3.jpg",
                title: "Animación 3D Avanzada",
                description: "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero."
            },
            {
                src: "./public/3d/4.jpg",
                title: "Visualización de Productos",
                description: "Hendrerit a, volutpat vitae, justo. Nullam dictum felis eu pede mollis pretium."
            },
            {
                src: "./public/3d/5.jpg",
                title: "Escenarios Virtuales",
                description: "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae."
            }
        ]
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showSuccessMessage()
    setupHorizontalScroll()
    setupNavigation()
    setupScrollIndicators()
    setupTeamCardEvents()
    setupServiceEvents()
    setupModals()
    createBackgroundParticles()
})

function getRoutePath(page) {
    const hostname = window.location.hostname
    const isVercel = hostname.includes("vercel.app") || hostname.includes("vercel.com")

    if (isVercel) {
        return `/${page}`
    } else {
        return `${page}.html`
    }
}

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

function setupHorizontalScroll() {
    document.addEventListener("wheel", (e) => {
        if (isScrolling) return
        e.preventDefault()
        if (e.deltaY > 0) {
            nextSection()
        } else {
            prevSection()
        }
    }, { passive: false })

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

    let startX = 0, startY = 0
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

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSection()
            } else {
                prevSection()
            }
        }
    })
}

function nextSection() {
    if (currentSection < totalSections - 1) {
        currentSection++
        updateScroll()
    }
}

function prevSection() {
    if (currentSection > 0) {
        currentSection--
        updateScroll()
    }
}

function updateScroll() {
    if (isScrolling) return
    isScrolling = true
    const container = document.querySelector(".horizontal-container")
    const translateX = -currentSection * 100
    container.style.transform = `translateX(${translateX}vw)`
    updateScrollIndicators()
    setTimeout(() => {
        isScrolling = false
    }, 800)
}

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

function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.textContent.trim()
            switch (href) {
                case "HOME":
                    e.preventDefault()
                    window.location.href = getRoutePath("index")
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
                    window.location.href = getRoutePath("contacto")
                    break
            }
        })
    })
}

function setupTeamCardEvents() {
    const teamCards = document.querySelectorAll(".team-card")
    teamCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            card.style.transform = "scale(0.95)"
            setTimeout(() => {
                card.style.transform = "translateY(-10px)"
            }, 150)
        })
    })
}

function setupServiceEvents() {
    const serviceItems = document.querySelectorAll(".service-item")
    serviceItems.forEach((item) => {
        item.addEventListener("click", () => {
            const serviceName = item.dataset.service
            openCarousel(serviceName)
        })
    })
}

// ✅ FUNCIÓN PRINCIPAL - FUNCIONA CORRECTAMENTE
window.abrirModalImagen = function (categoryName, imageIndex) {
    const category = categoryData[categoryName]
    if (!category || !category.images[imageIndex]) return

    const imageData = category.images[imageIndex]

    const modal = document.getElementById("detailModal")
    const image = document.getElementById("detailImage")
    const title = document.getElementById("detailTitle")
    const description = document.getElementById("detailDescription")

    if (!modal || !image || !title || !description) return

    // Forzar la actualización inmediata
    image.src = imageData.src
    image.alt = imageData.title
    title.textContent = imageData.title
    description.textContent = imageData.description

    // Asegurar que el modal se muestre
    modal.classList.remove("hidden")
    modal.style.display = "flex"

    // Forzar el reflow del navegador
    modal.offsetHeight
}

// REEMPLAZA la función openCarousel con esta versión corregida:
function openCarousel(categoryName) {
    const modal = document.getElementById("carouselModal")
    const title = document.getElementById("carouselTitle")
    const track = document.getElementById("carouselTrack")
    const indicators = document.getElementById("carouselIndicators")

    title.textContent = categoryName
    track.innerHTML = ""
    indicators.innerHTML = ""

    const category = categoryData[categoryName]
    if (!category) return

    // Crear contenedor principal
    const carouselContainer = document.createElement("div")
    carouselContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
    `

    // ✅ CREAR SOLO UNA IMAGEN VISIBLE A LA VEZ
    let currentImageIndex = 0

    function showImage(index) {
        // Limpiar contenedor
        carouselContainer.innerHTML = ""

        // Crear flechas si hay más de una imagen
        if (category.images.length > 1) {
            const leftArrow = document.createElement("button")
            leftArrow.innerHTML = "&#8249;"
            leftArrow.style.cssText = `
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                border: none;
                font-size: 30px;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 100;
            `
            leftArrow.onclick = () => {
                currentImageIndex = (currentImageIndex - 1 + category.images.length) % category.images.length
                showImage(currentImageIndex)
                updateIndicators()
            }

            const rightArrow = document.createElement("button")
            rightArrow.innerHTML = "&#8250;"
            rightArrow.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                border: none;
                font-size: 30px;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 100;
            `
            rightArrow.onclick = () => {
                currentImageIndex = (currentImageIndex + 1) % category.images.length
                showImage(currentImageIndex)
                updateIndicators()
            }

            carouselContainer.appendChild(leftArrow)
            carouselContainer.appendChild(rightArrow)
        }

        // Crear SOLO la imagen actual
        const image = category.images[index]
        const imgElement = document.createElement("img")
        imgElement.src = image.src
        imgElement.alt = image.title
        imgElement.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            display: block;
        `

        // ✅ ONCLICK CORRECTO - SIN CONFLICTOS
        imgElement.onclick = () => abrirModalImagen(categoryName, index)

        carouselContainer.appendChild(imgElement)
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll(".carousel-indicator")
        indicators.forEach((indicator, idx) => {
            indicator.style.background = idx === currentImageIndex ? "#a3e635" : "rgba(255,255,255,0.5)"
        })
    }

    // Crear indicadores
    category.images.forEach((_, index) => {
        const indicator = document.createElement("div")
        indicator.className = "carousel-indicator"
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: ${index === 0 ? "#a3e635" : "rgba(255,255,255,0.5)"};
            margin: 0 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        `
        indicator.onclick = () => {
            currentImageIndex = index
            showImage(currentImageIndex)
            updateIndicators()
        }
        indicators.appendChild(indicator)
    })

    // Mostrar primera imagen
    showImage(0)
    track.appendChild(carouselContainer)
    modal.classList.remove("hidden")
}

// Navegación del carrusel
function nextSlide() {
    const items = document.querySelectorAll(".carousel-item")
    const indicators = document.querySelectorAll(".carousel-indicator")

    if (items.length <= 1) return

    items[currentCarouselIndex].style.opacity = "0"
    items[currentCarouselIndex].classList.remove("active")
    indicators[currentCarouselIndex].style.background = "rgba(255,255,255,0.5)"
    indicators[currentCarouselIndex].classList.remove("active")

    currentCarouselIndex = (currentCarouselIndex + 1) % items.length

    items[currentCarouselIndex].style.opacity = "1"
    items[currentCarouselIndex].classList.add("active")
    indicators[currentCarouselIndex].style.background = "#a3e635"
    indicators[currentCarouselIndex].classList.add("active")
}

function prevSlide() {
    const items = document.querySelectorAll(".carousel-item")
    const indicators = document.querySelectorAll(".carousel-indicator")

    if (items.length <= 1) return

    items[currentCarouselIndex].style.opacity = "0"
    items[currentCarouselIndex].classList.remove("active")
    indicators[currentCarouselIndex].style.background = "rgba(255,255,255,0.5)"
    indicators[currentCarouselIndex].classList.remove("active")

    currentCarouselIndex = (currentCarouselIndex - 1 + items.length) % items.length

    items[currentCarouselIndex].style.opacity = "1"
    items[currentCarouselIndex].classList.add("active")
    indicators[currentCarouselIndex].style.background = "#a3e635"
    indicators[currentCarouselIndex].classList.add("active")
}

function goToSlide(index) {
    const items = document.querySelectorAll(".carousel-item")
    const indicators = document.querySelectorAll(".carousel-indicator")

    if (items.length === 0) return

    items[currentCarouselIndex].style.opacity = "0"
    items[currentCarouselIndex].classList.remove("active")
    indicators[currentCarouselIndex].style.background = "rgba(255,255,255,0.5)"
    indicators[currentCarouselIndex].classList.remove("active")

    currentCarouselIndex = index

    items[currentCarouselIndex].style.opacity = "1"
    items[currentCarouselIndex].classList.add("active")
    indicators[currentCarouselIndex].style.background = "#a3e635"
    indicators[currentCarouselIndex].classList.add("active")
}

function setupModals() {
    const carouselModal = document.getElementById("carouselModal")
    const detailModal = document.getElementById("detailModal")
    const closeCarousel = document.getElementById("closeCarousel")
    const closeDetail = document.getElementById("closeDetail")

    if (closeCarousel) {
        closeCarousel.addEventListener("click", () => {
            carouselModal.classList.add("hidden")
        })
    }

    if (closeDetail) {
        closeDetail.addEventListener("click", () => {
            detailModal.classList.add("hidden")
            detailModal.style.display = "none"
        })
    }

    if (carouselModal) {
        carouselModal.addEventListener("click", (e) => {
            if (e.target === carouselModal) {
                carouselModal.classList.add("hidden")
            }
        })
    }

    if (detailModal) {
        detailModal.addEventListener("click", (e) => {
            if (e.target === detailModal) {
                detailModal.classList.add("hidden")
                detailModal.style.display = "none"
            }
        })
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (detailModal && !detailModal.classList.contains("hidden")) {
                detailModal.classList.add("hidden")
                detailModal.style.display = "none"
            } else if (carouselModal && !carouselModal.classList.contains("hidden")) {
                carouselModal.classList.add("hidden")
            }
        }
    })
}

function createBackgroundParticles() {
    const particleCount = 15
    const colors = ["#a3e635", "#ef4444", "#ec4899", "#06b6d4"]

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle(colors[Math.floor(Math.random() * colors.length)])
        }, i * 200)
    }

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

    particle.style.left = Math.random() * window.innerWidth + "px"
    particle.style.top = Math.random() * window.innerHeight + "px"
    particle.style.transition = "all 10s linear"

    document.body.appendChild(particle)

    setTimeout(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(360deg)`
        particle.style.opacity = "0"
    }, 100)

    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle)
        }
    }, 10000)
}

function playAgain() {
    window.location.href = getRoutePath("index")
}

function goHome() {
    window.location.href = getRoutePath("index")
}

function createObliquoConfetti() {
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

setTimeout(createObliquoConfetti, 1000)
