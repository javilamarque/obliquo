// Variables globales
let currentSection = 0
const totalSections = 2
let isScrolling = false
let currentCarouselIndex = 0

// ✅ TUS DATOS CON MÚLTIPLES IMÁGENES POR PROYECTO
const categoryData = {
    "Diseño Gráfico": {
        hasVideo: false,
        images: [
            {
                src: "./public/diseñoGrafico/1-a.jpg",
                title: "Identidad Visual Corporativa",
                description:
                    "Trabajo de poster creativo publicitando un tour del cantante Shawn Mendes. Realizado en Adobe Illustrator.",
                gallery: ["./public/diseñoGrafico/1-a.jpg", "./public/diseñoGrafico/1-b.jpg"],
            },
            {
                src: "./public/diseñoGrafico/2-a.jpg",
                title: "Diseño Editorial Moderno",
                description:
                    "Trabajo de poster cinematográfico sobre la película IT de 2017, haciendo alusión a la frase de Todos flotan… y cuando este aquí abajo, tú también flotaras del personaje Pennywise Realizado en Adobe Photoshop",
                gallery: ["./public/diseñoGrafico/2-a.jpg", "./public/diseñoGrafico/2-b.jpg"],
            },
            {
                src: "./public/diseñoGrafico/3-a.jpg",
                title: "Packaging Innovador",
                description:
                    "Trabajo de portada para libro biográfico de Stephen King, donde lo vemos acompañado de algunos de sus personajes más populares. Realizado en Adobe Illustrator.",
                gallery: ["./public/diseñoGrafico/3-a.jpg", "./public/diseñoGrafico/3-b.jpg"],
            },
            {
                src: "./public/diseñoGrafico/4-a.jpg",
                title: "Branding Estratégico",
                description:
                    "Trabajo de montaje sobre lo antiguo contrastando con la modernidad como diseño de estampa de remera. Realizado en Adobe Photoshop.",
                gallery: ["./public/diseñoGrafico/4-a.jpg", "./public/diseñoGrafico/4-b.jpg"],
            },
            {
                src: "./public/diseñoGrafico/5.jpg",
                title: "Diseño de Logotipos",
                description:
                    "Trabajo de branding de una editorial de libros dedicada a publicar a nuevos escritores y sacar nuevas ediciones de clásicos del género del terror, misterio y crimen. Realizado en Adobe Illustrator.",
                gallery: [
                    "./public/diseñoGrafico/5.jpg",
                    "./public/diseñoGrafico/5-a.jpg",
                    "./public/diseñoGrafico/5-b.jpg",
                    "./public/diseñoGrafico/5-c.jpg",
                    "./public/diseñoGrafico/5-d.jpg",
                    "./public/diseñoGrafico/5-e.jpg",
                ],
            },
        ],
    },
    "Motion Graphics": {
        hasVideo: false,
        images: [
            {
                src: "./public/motion/1.jpg",
                title: "Animación 2D Creativa",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
                gallery: ["./public/motion/1.jpg"],
            },
            {
                src: "./public/motion/2.jpg",
                title: "Efectos Visuales Dinámicos",
                description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                gallery: ["./public/motion/2.jpg"],
            },
            {
                src: "./public/motion/3.jpg",
                title: "Transiciones Cinematográficas",
                description: "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
                gallery: ["./public/motion/3.jpg"],
            },
            {
                src: "./public/motion/4.jpg",
                title: "Animación de Personajes",
                description:
                    "Trabajo creativo orientado a publicidad de un sabor de café limitado de Sabrina Carpenter en colaboración con la marca Alfred. Centrado en la letra del éxito musical 'Espresso' se muestra el atractivo del café y la colaboración de la cantante con la marca. Realizado con ilustración vectorial y animado en After Effects.",
                gallery: ["./public/motion/4.jpg"],
            },
            {
                src: "./public/motion/5.jpg",
                title: "Motion Graphics Corporativo",
                description:
                    " Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus.",
                gallery: ["./public/motion/5.jpg", "./public/motion/5-b.jpg"],
            },
        ],
    },
    "Diseño Publicitario": {
        hasVideo: false,
        images: [
            {
                src: "./public/carrousel-campanias/1.jpg",
                title: "Campaña Publicitaria Integral",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt mauris eu risus.",
                gallery: ["./public/carrousel-campanias/1.jpg"],
            },
        ],
    },
    Merchandising: {
        hasVideo: false,
        images: [
            {
                src: "./public/marchan/1.jpg",
                title: "Productos Promocionales",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat accumsan nulla.",
                gallery: ["./public/marchan/1.jpg"],
            },
            {
                src: "./public/marchan/2.jpg",
                title: "Merchandising Corporativo",
                description: "Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh.",
                gallery: ["./public/marchan/2.jpg"],
            },
        ],
    },
    "Diseño Web": {
        hasVideo: false,
        images: [
            {
                src: "./public/diseñoWeb/1.jpg",
                title: "Sitio Web Responsivo",
                description:
                    "Página web informativa de la organización Glutenzero, dedicada a difundir información sobre la celiaquía. Dentro de la web se pueden encontrar recetas, cuidado y mitos que se difunden sobre la celiaquía. Ver sitio: https://glutenzero.obliquo.site/",
                gallery: ["./public/diseñoWeb/1.jpg"],
            },
            {
                src: "./public/diseñoWeb/2.jpg",
                title: "E-commerce Moderno",
                description:
                    "E-commerce de la tienda de mascotas Pet Pats, dentro de la misma encontramos productos para perros, gatos, peces y roedores, así como variedad de marcas para elegir. Ver sitio: https://petpats.obliquo.site/",
                gallery: ["./public/diseñoWeb/2.jpg"],
            },
            {
                src: "./public/diseñoWeb/3.jpg",
                title: "Landing Page Optimizada",
                description:
                    "Landing page sobre la aplicación Gea, una app dedicada al cuidado de plantas. Dentro de la web se nos muestran sus funciones, reseñas e interfaz. Ver sitio: https://obliquo.site/",
                gallery: ["./public/diseñoWeb/3.jpg"],
            },
        ],
    },
    "Modelado 3D": {
        hasVideo: true, // ✅ ESTA CATEGORÍA TIENE VIDEOS
        images: [
            {
                src: "./public/3d/1.jpg",
                title: "Modelado Arquitectónico",
                video: "public/3d/video/OBLIQUO_reel.mp4", // ✅ VIDEO
                description:
                    'Modelo 3d inspirado en Chopper, el personaje de la serie de manga y franquicia "One Piece", acompañado de elementos alusivos a la misma. Realizado en Zbrush y texturizado en Substance Painter. ArtStation: https://www.artstation.com/artwork/6NJQZ6',
            },
            {
                src: "./public/3d/2.jpg",
                title: "Renderizado Fotorrealista",
                video: "public/3d/video/2.mp4", // ✅ VIDEO
                description:
                    "Modelo 3d construido a partir del estilo de armas cyberpunk. Realizado en 3ds max y texturizado en Substance Painter. ArtStation: https://www.artstation.com/artwork/yDzaN9",
            },
            {
                src: "./public/3d/3.jpg",
                title: "Animación 3D Avanzada",
                video: "public/3d/video/3.mp4", // ✅ VIDEO
                description:
                    "Modelo 3d de gatito inspirado en Halloween ubicado en un cementerio para acompañar la estética del personaje. Realizado en Zbrush y texturizado en Substance Painter. ArtStation: https://www.artstation.com/artwork/XJ0Jol",
            },
            {
                src: "./public/3d/4.jpg",
                title: "Visualización de Productos",
                video: "public/3d/video/4.mp4", // ✅ VIDEO
                description:
                    "Modelo 3d de reloj cucú con detalles y terminaciones de engranajes al estilo steampunk. Realizado en 3ds max y texturizado en Substance Painter. ArtStation: https://www.artstation.com/artwork/39OKZg",
            },
            {
                src: "./public/3d/5.jpg",
                title: "Escenarios Virtuales",
                video: "public/3d/video/5.mp4", // ✅ VIDEO
                description:
                    "Modelo 3d de radio radar retro con elementos agregados de tecnología de localización y pantallas. Realizado en 3ds max y texturizado en Substance Painter. ArtStation: https://www.artstation.com/artwork/RyvA5r",
            },
        ],
    },
}

// ✅ FUNCIÓN PARA CONVERTIR URLs EN ENLACES CLICKEABLES
function convertUrlsToLinks(text) {
    // Regex para detectar URLs (http, https, www)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g

    return text.replace(urlRegex, (url) => {
        // Asegurar que la URL tenga protocolo
        const fullUrl = url.startsWith("http") ? url : `https://${url}`

        return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" style="
            color: #a3e635;
            text-decoration: underline;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
        " onmouseover="this.style.color='#84cc16'; this.style.textShadow='0 0 8px rgba(163, 230, 53, 0.6)'" 
           onmouseout="this.style.color='#a3e635'; this.style.textShadow='none'">${url}</a>`
    })
}

document.addEventListener("DOMContentLoaded", () => {
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

function setupHorizontalScroll() {
    document.addEventListener(
        "wheel",
        (e) => {
            if (isScrolling) return
            e.preventDefault()
            if (e.deltaY > 0) {
                nextSection()
            } else {
                prevSection()
            }
        },
        { passive: false },
    )

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

    let startX = 0,
        startY = 0
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

// ✅ FUNCIÓN PRINCIPAL MODIFICADA - DETECTA VIDEO O IMAGEN
window.abrirModalImagen = (categoryName, imageIndex) => {
    const category = categoryData[categoryName]
    if (!category || !category.images[imageIndex]) return

    const imageData = category.images[imageIndex]

    // ✅ SI ES MODELADO 3D Y TIENE VIDEO → MODAL DE VIDEO
    if (category.hasVideo && imageData.video) {
        abrirModalVideo(categoryName, imageIndex)
    } else {
        // ✅ RESTO DE CATEGORÍAS → MODAL CON CARRUSEL DE IMÁGENES
        abrirModalImagenConCarrusel(categoryName, imageIndex)
    }
}

// ✅ FUNCIÓN PARA MODAL CON CARRUSEL DE IMÁGENES - ESTRUCTURA MEJORADA
function abrirModalImagenConCarrusel(categoryName, imageIndex) {
    const category = categoryData[categoryName]
    const imageData = category.images[imageIndex]

    // Obtener galería de imágenes (si no existe, usar solo la imagen principal)
    const gallery = imageData.gallery || [imageData.src]
    let currentImageIndex = 0

    // Remover modal existente si existe
    const existingModal = document.getElementById("imageCarouselModal")
    if (existingModal) {
        document.body.removeChild(existingModal)
    }

    // ✅ CONVERTIR URLs EN ENLACES PARA EL MODAL
    const descriptionWithLinks = convertUrlsToLinks(imageData.description)

    // Crear modal con carrusel
    const modal = document.createElement("div")
    modal.id = "imageCarouselModal"
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4000;
        backdrop-filter: blur(15px);
        animation: fadeInModal 0.3s ease-out;
        padding: 20px;
        box-sizing: border-box;
    `

    modal.innerHTML = `
        <div class="modal-container" style="
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border-radius: 25px;
            padding: 30px;
            max-width: 95vw;
            max-height: 95vh;
            width: 1000px;
            position: relative;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
            border: 2px solid #a3e635;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        ">
            <!-- Botón de cerrar -->
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px; flex-shrink: 0;">
                <button onclick="cerrarImageCarouselModal()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1.1)'" 
                   onmouseout="this.style.background='none'; this.style.transform='scale(1)'">&times;</button>
            </div>
            
            <!-- ✅ CONTENEDOR DE IMAGEN CON CARRUSEL - COMPLETAMENTE RESPONSIVE -->
            <div class="image-carousel-container" style="
                width: 100%;
                position: relative;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                background: #000;
                min-height: 400px;
                max-height: 60vh;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                margin-bottom: 25px;
            ">
                ${gallery.length > 1
            ? `
                <button id="prevImageBtn" style="
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.8);
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 100;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(163, 230, 53, 0.8)'; this.style.color='#333'" 
                   onmouseout="this.style.background='rgba(0,0,0,0.8)'; this.style.color='white'">&#8249;</button>
                
                <button id="nextImageBtn" style="
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.8);
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 100;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(163, 230, 53, 0.8)'; this.style.color='#333'" 
                   onmouseout="this.style.background='rgba(0,0,0,0.8)'; this.style.color='white'">&#8250;</button>
                `
            : ""
        }
                
                <!-- ✅ IMAGEN COMPLETAMENTE RESPONSIVE - SIN CORTES -->
                <img id="modalCarouselImage" style="
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    object-position: center;
                    border-radius: 10px;
                    background: transparent;
                    transition: opacity 0.3s ease;
                    display: block;
                " src="${gallery[0]}" alt="${imageData.title}">
            </div>
            
            <!-- ✅ INFORMACIÓN DEL PROYECTO (ESTRUCTURA MEJORADA) -->
            <div class="text-content" style="
                width: 100%; 
                text-align: center; 
                max-width: 100%;
                overflow-wrap: break-word;
                word-wrap: break-word;
                hyphens: auto;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                min-height: 0;
                padding: 0;
            ">
                <h2 style="
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #a3e635;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    font-family: 'Nunito', sans-serif;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    flex-shrink: 0;
                ">${imageData.title}</h2>
                
                <p style="
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: #e0e0e0;
                    font-family: 'Nunito', sans-serif;
                    margin: 0;
                    padding: 0;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    max-width: 100%;
                    white-space: normal;
                    text-align: left;
                    flex: 1;
                ">${descriptionWithLinks}</p>
            </div>
        </div>
    `

    document.body.appendChild(modal)

    // ✅ CONFIGURAR NAVEGACIÓN DEL CARRUSEL
    if (gallery.length > 1) {
        const prevBtn = document.getElementById("prevImageBtn")
        const nextBtn = document.getElementById("nextImageBtn")
        const modalImage = document.getElementById("modalCarouselImage")

        // Función para cambiar imagen
        window.changeImage = (index) => {
            currentImageIndex = index
            modalImage.style.opacity = "0"

            setTimeout(() => {
                modalImage.src = gallery[currentImageIndex]
                modalImage.style.opacity = "1"
            }, 150)
        }

        // Navegación con flechas
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentImageIndex = (currentImageIndex - 1 + gallery.length) % gallery.length
                window.changeImage(currentImageIndex)
            })
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentImageIndex = (currentImageIndex + 1) % gallery.length
                window.changeImage(currentImageIndex)
            })
        }

        // Navegación con teclado
        const handleKeyPress = (e) => {
            if (e.key === "ArrowLeft") {
                currentImageIndex = (currentImageIndex - 1 + gallery.length) % gallery.length
                window.changeImage(currentImageIndex)
            } else if (e.key === "ArrowRight") {
                currentImageIndex = (currentImageIndex + 1) % gallery.length
                window.changeImage(currentImageIndex)
            }
        }

        document.addEventListener("keydown", handleKeyPress)

        // Limpiar event listener al cerrar modal
        modal.addEventListener("remove", () => {
            document.removeEventListener("keydown", handleKeyPress)
        })
    }

    // Cerrar modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            window.cerrarImageCarouselModal()
        }
    })
}

// ✅ FUNCIÓN PARA CERRAR MODAL DE CARRUSEL DE IMÁGENES
window.cerrarImageCarouselModal = () => {
    const modal = document.getElementById("imageCarouselModal")
    if (modal) {
        document.body.removeChild(modal)
    }
}

// ✅ TU FUNCIÓN ORIGINAL PARA IMÁGENES - CON ENLACES CLICKEABLES (BACKUP)
function abrirModalImagenOriginal(categoryName, imageIndex) {
    const category = categoryData[categoryName]
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

    // ✅ CONVERTIR URLs EN ENLACES CLICKEABLES
    description.innerHTML = convertUrlsToLinks(imageData.description)

    // Asegurar que el modal se muestre
    modal.classList.remove("hidden")
    modal.style.display = "flex"

    // Forzar el reflow del navegador
    modal.offsetHeight
}

// ✅ NUEVA FUNCIÓN PARA MODAL DE VIDEO - ESTRUCTURA MEJORADA
function abrirModalVideo(categoryName, imageIndex) {
    const category = categoryData[categoryName]
    const imageData = category.images[imageIndex]

    // Remover modal existente si existe
    const existingModal = document.getElementById("videoModal")
    if (existingModal) {
        document.body.removeChild(existingModal)
    }

    // ✅ CONVERTIR URLs EN ENLACES PARA EL MODAL DE VIDEO
    const descriptionWithLinks = convertUrlsToLinks(imageData.description)

    // Crear modal de video
    const modal = document.createElement("div")
    modal.id = "videoModal"
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 4000;
        backdrop-filter: blur(15px);
        animation: fadeInModal 0.3s ease-out;
        padding: 20px;
        box-sizing: border-box;
    `

    modal.innerHTML = `
        <div class="modal-container" style="
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border-radius: 25px;
            padding: 30px;
            max-width: 95vw;
            max-height: 95vh;
            width: 1000px;
            position: relative;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
            border: 2px solid #a3e635;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        ">
            <div style="display: flex; justify-content: flex-end; margin-bottom: 20px; flex-shrink: 0;">
                <button onclick="cerrarVideoModal()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='scale(1.1)'" 
                   onmouseout="this.style.background='none'; this.style.transform='scale(1)'">&times;</button>
            </div>
            
            <div class="video-container" style="
                width: 100%;
                position: relative;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                background: #000;
                flex-shrink: 0;
                margin-bottom: 25px;
            ">
                <video id="modalVideo" style="
                    width: 100%;
                    height: auto;
                    min-height: 300px;
                    max-height: 50vh;
                    object-fit: contain;
                    border-radius: 15px;
                    background: #000;
                " controls muted poster="${imageData.src}">
                    <source src="${imageData.video}" type="video/mp4">
                    Tu navegador no soporta el elemento video.
                </video>
                
                <div id="playButton" style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(163, 230, 53, 0.9);
                    color: #333;
                    padding: 20px 30px;
                    border-radius: 50px;
                    font-family: 'Nunito', sans-serif;
                    font-weight: 700;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.3s ease;
                    border: none;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                " onmouseover="this.style.background='#a3e635'; this.style.transform='translate(-50%, -50%) scale(1.05)'" 
                   onmouseout="this.style.background='rgba(163, 230, 53, 0.9)'; this.style.transform='translate(-50%, -50%) scale(1)'">
                    ▶ Reproducir Video
                </div>
            </div>
            
            <div class="text-content" style="
                width: 100%; 
                text-align: center; 
                max-width: 100%;
                overflow-wrap: break-word;
                word-wrap: break-word;
                hyphens: auto;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                min-height: 0;
                padding: 0;
            ">
                <h2 style="
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #a3e635;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    font-family: 'Nunito', sans-serif;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    flex-shrink: 0;
                ">${imageData.title}</h2>
                
                <p style="
                    font-size: 1.2rem;
                    line-height: 1.6;
                    color: #e0e0e0;
                    font-family: 'Nunito', sans-serif;
                    margin: 0;
                    padding: 0;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    max-width: 100%;
                    white-space: normal;
                    text-align: left;
                    flex: 1;
                ">${descriptionWithLinks}</p>
            </div>
        </div>
    `

    document.body.appendChild(modal)

    // Configurar video
    setTimeout(() => {
        const video = document.getElementById("modalVideo")
        const playButton = document.getElementById("playButton")

        if (video && playButton) {
            const playVideo = () => {
                video
                    .play()
                    .then(() => {
                        playButton.style.display = "none"
                    })
                    .catch((error) => {
                        console.log("Error al reproducir:", error)
                    })
            }

            playButton.addEventListener("click", playVideo)

            video.addEventListener("click", () => {
                if (video.paused) {
                    playVideo()
                } else {
                    video.pause()
                    playButton.style.display = "flex"
                }
            })

            video.addEventListener("play", () => {
                playButton.style.display = "none"
            })

            video.addEventListener("pause", () => {
                playButton.style.display = "flex"
            })

            // Intentar autoplay
            video
                .play()
                .then(() => {
                    playButton.style.display = "none"
                })
                .catch(() => {
                    console.log("Autoplay bloqueado")
                })
        }
    }, 100)

    // Cerrar modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            window.cerrarVideoModal()
        }
    })
}

// ✅ FUNCIÓN PARA CERRAR VIDEO MODAL
window.cerrarVideoModal = () => {
    const modal = document.getElementById("videoModal")
    if (modal) {
        const video = modal.querySelector("video")
        if (video) {
            video.pause()
            video.currentTime = 0
        }
        document.body.removeChild(modal)
    }
}

// ✅ FUNCIÓN openCarousel MODIFICADA - SIN INDICADORES
function openCarousel(categoryName) {
    const modal = document.getElementById("carouselModal")
    const title = document.getElementById("carouselTitle")
    const track = document.getElementById("carouselTrack")
    const indicators = document.getElementById("carouselIndicators")

    title.textContent = categoryName
    track.innerHTML = ""

    const category = categoryData[categoryName]
    if (!category) return

    // Crear contenedor principal
    const carouselContainer = document.createElement("div")
    carouselContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 500px;
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
            object-fit: contain;
            cursor: pointer;
            display: block;
        `

        // ✅ ONCLICK CORRECTO - SIN CONFLICTOS
        imgElement.onclick = () => window.abrirModalImagen(categoryName, index)

        carouselContainer.appendChild(imgElement)
    }

    // Mostrar primera imagen
    showImage(0)
    track.appendChild(carouselContainer)
    modal.classList.remove("hidden")
}

// TUS FUNCIONES ORIGINALES (SIN CAMBIOS)
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
            // ✅ CERRAR TODOS LOS MODALES
            window.cerrarVideoModal()
            window.cerrarImageCarouselModal()

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
