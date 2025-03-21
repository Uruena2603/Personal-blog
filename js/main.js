// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Navbar scroll effect con transición suave
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Activar los links de navegación según la sección visible
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll para los enlaces de navegación con velocidad ajustada
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Cierra el menú móvil si está abierto
            if (document.querySelector('.navbar-collapse.show')) {
                document.querySelector('.navbar-toggler').click();
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de typing en la sección hero
    if (document.querySelector('.hero-section h1')) {
        setTimeout(() => {
            document.querySelector('.hero-section h1').classList.add('visible');
        }, 500);
        
        setTimeout(() => {
            document.querySelector('.hero-section p').classList.add('visible');
        }, 1000);
    }

    // Formulario de contacto con validación y envío real utilizando EmailJS
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar efecto de carga
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Preparar los parámetros para EmailJS
            const templateParams = {
                nombre: nombre,
                email: email,
                mensaje: mensaje
            };
            
            // Enviar el email utilizando EmailJS
            // Reemplazar 'service_id' y 'template_id' con tus IDs reales de EmailJS
            emailjs.send('service_fnw6qw7', 'template_9ja0w7f', templateParams)
                .then(function(response) {
                    console.log('Email enviado correctamente:', response);
                    
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
                        const alertContainer = document.createElement('div');
                        alertContainer.innerHTML = alertHTML;
                        document.body.appendChild(alertContainer);
                        
                        // Eliminar el toast después de 5 segundos
                        setTimeout(() => {
                            document.body.removeChild(alertContainer);
                        }, 5000);
                        
                    }, 1500);
                }, function(error) {
                    console.log('Error al enviar el email:', error);
                    
                    // Mostrar mensaje de error
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Mostrar mensaje de error en el formulario
                    const formStatus = document.getElementById('form-status');
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = '<div class="alert alert-danger">Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo o contáctame directamente por email.</div>';
                    
                    // Ocultar el mensaje de error después de 5 segundos
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                });
        });
        
        // Validación en tiempo real mejorada
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
        
        function validateInput(input) {
            if (input.value.trim() !== '') {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            } else {
                input.classList.remove('is-valid');
                if (input.getAttribute('required') !== null) {
                    input.classList.add('is-invalid');
                }
            }
            
            // Validación específica para email
            if (input.type === 'email' && input.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            }
        }
    }
    
    // Animación para las tarjetas de proyectos al hacer hover
    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Contador de estadísticas (se puede implementar si se añade una sección de estadísticas)
    function startCounter() {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('counter-section')) {
                startCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
}); 