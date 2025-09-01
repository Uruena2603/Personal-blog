// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Variables para detectar dispositivo móvil
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  let currentOrientation =
    window.innerHeight > window.innerWidth ? "portrait" : "landscape";

  // Detector de cambio de orientación
  function handleOrientationChange() {
    const newOrientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";

    if (newOrientation !== currentOrientation) {
      currentOrientation = newOrientation;

      // Cerrar menú si está abierto al cambiar orientación
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const navbarToggler = document.querySelector(".navbar-toggler");
        if (navbarToggler) navbarToggler.click();
      }

      // Pequeño delay para que se ajuste el layout
      setTimeout(() => {
        // Re-calcular AOS si es necesario
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      }, 100);
    }
  }

  // Escuchar cambios de orientación y resize
  window.addEventListener("resize", handleOrientationChange);
  window.addEventListener("orientationchange", handleOrientationChange);

  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
    disable: function () {
      // Deshabilitar AOS en móviles muy pequeños para mejor rendimiento
      return window.innerWidth < 480;
    },
  });

  // Navbar scroll effect con transición suave
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 80) {
      navbar.style.padding = "10px 0";
      navbar.style.backgroundColor = "rgba(15, 23, 42, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.padding = "15px 0";
      navbar.style.backgroundColor = "rgba(15, 23, 42, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    }
  });

  // Activar los links de navegación según la sección visible (optimizado para móviles)
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  let ticking = false;

  function updateActiveNavLink() {
    let current = "";
    const scrollPosition = window.pageYOffset;

    // Ajustar offset según el tamaño de pantalla
    const offset = window.innerWidth <= 768 ? 120 : 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.clientHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNavLink);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Smooth scroll para los enlaces de navegación con velocidad ajustada
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      // Detectar si estamos en móvil
      const isMobile = window.innerWidth <= 768;

      // Cierra el menú móvil si está abierto (Bootstrap)
      const navbarCollapse = document.querySelector(".navbar-collapse");
      const navbarToggler = document.querySelector(".navbar-toggler");

      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        // En móvil, usar Bootstrap para cerrar el menú
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        } else {
          navbarToggler.click();
        }

        // Tiempo de espera optimizado según dispositivo
        let delay;
        if (isMobile) {
          delay = 400; // Móvil necesita más tiempo para cerrar el menú
        } else if (window.innerWidth <= 1024) {
          delay = 150; // iPad - más rápido
        } else {
          delay = 100; // Desktop - muy rápido
        }

        setTimeout(() => {
          scrollToTarget(target, isMobile);
        }, delay);
      } else {
        // Sin menú abierto - scroll inmediato
        scrollToTarget(target, isMobile);
      }
    });
  });

  // Controles mejorados para el menú móvil
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Prevenir problemas de doble-tap en móviles
    navbarToggler.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        this.click();
      },
      { passive: false }
    );

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener("click", function (e) {
      if (
        window.innerWidth <= 768 &&
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(e.target) &&
        !navbarToggler.contains(e.target)
      ) {
        navbarToggler.click();
      }
    });

    // Cerrar menú al hacer scroll en móvil
    let scrollTimer = null;
    window.addEventListener("scroll", function () {
      if (
        window.innerWidth <= 768 &&
        navbarCollapse.classList.contains("show")
      ) {
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          navbarToggler.click();
        }, 150);
      }
    });
  }

  // Función auxiliar para el scroll optimizada
  function scrollToTarget(target, isMobile) {
    const offsetTop = target.offsetTop - (isMobile ? 80 : 70);

    // Detectar tipo de dispositivo para optimizar velocidad
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;

    // Para móviles, usar scroll CSS nativo (ya configurado en CSS)
    // Para desktop/tablet, usar JavaScript optimizado
    if (isMobile && "scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      // Usar JavaScript optimizado para desktop e iPad
      let duration;
      if (isMobile) {
        duration = 600; // Móvil (fallback)
      } else if (isTablet) {
        duration = 350; // iPad - rápido
      } else {
        duration = 300; // Desktop - muy rápido
      }

      smoothScrollTo(offsetTop, duration);
    }
  }

  // Función de smooth scroll manual optimizada
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Función de easing más rápida y suave
    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  }

  // Efecto de typing en la sección hero
  if (document.querySelector(".hero-section h1")) {
    setTimeout(() => {
      document.querySelector(".hero-section h1").classList.add("visible");
    }, 500);

    setTimeout(() => {
      document.querySelector(".hero-section p").classList.add("visible");
    }, 1000);
  }

  // Formulario de contacto con validación y envío real utilizando EmailJS
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Mostrar efecto de carga
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

      // Obtener los valores del formulario
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      // Preparar los parámetros para EmailJS
      const templateParams = {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
      };

      // Enviar el email utilizando EmailJS
      // Reemplazar 'service_id' y 'template_id' con tus IDs reales de EmailJS
      emailjs.send("service_omic0ms", "template_9ja0w7f", templateParams).then(
        function (response) {
          console.log("Email enviado correctamente:", response);

          // Mostrar mensaje de éxito
          contactForm.reset();
          submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';

          // Volver al estado original después de un tiempo
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Mostrar toast o alerta de confirmación
            const alertHTML = `
                            <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
                                <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div class="toast-header bg-success text-white">
                                        <strong class="me-auto">Mensaje enviado</strong>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                                    </div>
                                    <div class="toast-body">
                                        ¡Gracias por tu mensaje! Te contactaré pronto.
                                    </div>
                                </div>
                            </div>
                        `;

            // Añadir alerta al DOM
            const alertContainer = document.createElement("div");
            alertContainer.innerHTML = alertHTML;
            document.body.appendChild(alertContainer);

            // Eliminar el toast después de 5 segundos
            setTimeout(() => {
              document.body.removeChild(alertContainer);
            }, 5000);
          }, 1500);
        },
        function (error) {
          console.log("Error al enviar el email:", error);

          // Mostrar mensaje de error
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Mostrar mensaje de error en el formulario
          const formStatus = document.getElementById("form-status");
          formStatus.style.display = "block";
          formStatus.innerHTML =
            '<div class="alert alert-danger">Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo o contáctame directamente por email.</div>';

          // Ocultar el mensaje de error después de 5 segundos
          setTimeout(() => {
            formStatus.style.display = "none";
          }, 5000);
        }
      );
    });

    // Validación en tiempo real mejorada
    const inputs = contactForm.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        validateInput(this);
      });

      input.addEventListener("blur", function () {
        validateInput(this);
      });
    });

    function validateInput(input) {
      if (input.value.trim() !== "") {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
      } else {
        input.classList.remove("is-valid");
        if (input.getAttribute("required") !== null) {
          input.classList.add("is-invalid");
        }
      }

      // Validación específica para email
      if (input.type === "email" && input.value.trim() !== "") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.remove("is-valid");
          input.classList.add("is-invalid");
        }
      }
    }
  }

  // Animación para las tarjetas de proyectos al hacer hover
  const projectCards = document.querySelectorAll(".card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
    });
  });

  // Contador de estadísticas (se puede implementar si se añade una sección de estadísticas)
  function startCounter() {
    document.querySelectorAll(".counter").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Iniciar contadores cuando estén visibles (si se implementan)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("counter-section")
        ) {
          startCounter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const counterSection = document.querySelector(".counter-section");
  if (counterSection) {
    observer.observe(counterSection);
  }
});
