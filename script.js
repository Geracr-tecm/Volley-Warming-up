/**
 * ==============================================================================
 * GUÍA DE CALENTAMIENTO PARA VOLEIBOL - SCRIPT PRINCIPAL
 * Funcionalidades:
 * 1. Selector de Modo Oscuro / Claro con persistencia en localStorage
 * 2. Navegación Fija, Scrollspy y Menú Hamburguesa Móvil
 * 3. Animaciones al hacer Scroll (IntersectionObserver)
 * 4. Temporizador Interactivo de 15 Minutos con Fases y Síntesis de Sonido Web Audio
 * 5. Validación y Feedback del Formulario de Contacto
 * 6. Botón Volver Arriba
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollReveal();
    initTimer();
    initContactForm();
    initBackToTop();
});

/* --------------------------------------------------------------------------
   1. SELECTOR DE TEMA (MODO OSCURO / CLARO)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 1. Obtener tema guardado o preferencia del sistema operativo
    const savedTheme = localStorage.getItem('vw_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);

    // 2. Event listener para alternar
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(activeTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('vw_theme', theme);
    }
}

/* --------------------------------------------------------------------------
   2. NAVEGACIÓN FIJA, SCROLLSPY Y MENÚ MÓVIL
   -------------------------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Efecto de sombreado y desenfoque al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateScrollSpy();
    }, { passive: true });

    // Alternar menú hamburguesa móvil
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ScrollSpy: Resaltar enlace activo según la sección visible
    function updateScrollSpy() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* --------------------------------------------------------------------------
   3. ANIMACIONES DE ENTRADA CON SCROLL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-card, .reveal-step'
    );

    if (!('IntersectionObserver' in window)) {
        // Fallback si el navegador es antiguo
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const delay = target.getAttribute('data-delay');

                if (delay) {
                    setTimeout(() => {
                        target.classList.add('revealed');
                    }, parseInt(delay, 10));
                } else {
                    target.classList.add('revealed');
                }

                obs.unobserve(target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. TEMPORIZADOR INTERACTIVO DE 15 MINUTOS (MOTOR DE RUTINA)
   -------------------------------------------------------------------------- */
function initTimer() {
    // Definición de las 5 Fases del Calentamiento Oficial (Total: 900s = 15 min)
    const routinePhases = [
        {
            name: "Fase 1: Movilidad Articular",
            duration: 180, // 3 min en segundos
            exerciseTitle: "Rotación de Brazos, Cuello y Tobillos",
            description: "Comienza con círculos de hombros amplios hacia adelante y atrás, suaves rotaciones de cuello y giros de tobillo para activar el líquido sinovial.",
            iconClass: "fa-arrows-spin"
        },
        {
            name: "Fase 2: Trote Suave & Desplazamientos",
            duration: 180, // 3 min en segundos
            exerciseTitle: "Trote Continuo & Pasos Laterales",
            description: "Carrera a ritmo suave a lo largo del campo alternando con desplazamientos defensivos laterales y carrera de espaldas sin cruzar los pies.",
            iconClass: "fa-person-running"
        },
        {
            name: "Fase 3: Saltos Dinámicos",
            duration: 120, // 2 min en segundos
            exerciseTitle: "Skipping y Saltos de Bloqueo Suaves",
            description: "Rebotes elásticos continuos sobre los metatarsos, elevación de rodillas y saltos verticales coordinados simulando el bloqueo en la red.",
            iconClass: "fa-angles-up"
        },
        {
            name: "Fase 4: Estiramientos Dinámicos",
            duration: 180, // 3 min en segundos
            exerciseTitle: "Zancadas Dinámicas & Balanceo de Piernas",
            description: "Zancadas profundas con torsión suave del torso, balanceos frontales de pierna y movilidad de aductores. Evita rebotes forzados.",
            iconClass: "fa-child-reaching"
        },
        {
            name: "Fase 5: Ejercicios Específicos de Voleibol",
            duration: 240, // 4 min en segundos
            exerciseTitle: "Batidas de Remate & Gestos Técnicos",
            description: "Simula aproximaciones y batidas de ataque completas, caídas controladas, toques de dedos y antebrazo en sombra a máxima concentración.",
            iconClass: "fa-volleyball"
        }
    ];

    const TOTAL_ROUTINE_SECONDS = routinePhases.reduce((acc, phase) => acc + phase.duration, 0); // 900s

    // Estado del Temporizador
    let currentPhaseIndex = 0;
    let phaseSecondsRemaining = routinePhases[0].duration;
    let totalSecondsRemaining = TOTAL_ROUTINE_SECONDS;
    let timerInterval = null;
    let isRunning = false;
    let soundEnabled = true;

    // Referencias al DOM
    const timerDigits = document.getElementById('timer-digits');
    const timerSubtime = document.getElementById('timer-subtime');
    const timerStatusBadge = document.getElementById('timer-status-badge');
    const progressCircle = document.getElementById('timer-progress-circle');
    const phaseProgressBar = document.getElementById('phase-progress-bar');
    const phaseProgressPercent = document.getElementById('phase-progress-percent');
    const totalProgressBar = document.getElementById('total-progress-bar');
    const totalProgressPercent = document.getElementById('total-progress-percent');
    const currentPhaseName = document.getElementById('current-phase-name');
    const currentExerciseTitle = document.getElementById('current-exercise-title');
    const currentExerciseDesc = document.getElementById('current-exercise-desc');
    const activeExerciseIcon = document.getElementById('active-exercise-icon');
    const phasePills = document.querySelectorAll('.phase-pill');

    // Botones
    const btnPlayPause = document.getElementById('btn-play-pause');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const playPauseText = document.getElementById('play-pause-text');
    const btnPrevPhase = document.getElementById('btn-prev-phase');
    const btnNextPhase = document.getElementById('btn-next-phase');
    const btnResetTimer = document.getElementById('btn-reset-timer');
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    // Longitud de circunferencia para el SVG dial (2 * PI * r = 2 * 3.1416 * 105 ≈ 660)
    const CIRCLE_CIRCUMFERENCE = 660;
    if (progressCircle) {
        progressCircle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE}`;
    }

    // Web Audio API para alertas audibles sin archivos externos
    let audioCtx = null;

    function playTone(freq, duration, type = 'sine') {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.log('Web Audio no disponible o silenciado');
        }
    }

    function playPhaseChangeSound() {
        playTone(587.33, 0.15, 'triangle'); // D5
        setTimeout(() => playTone(880, 0.3, 'triangle'), 150); // A5
    }

    function playFinishRoutineSound() {
        playTone(523.25, 0.2, 'sine'); // C5
        setTimeout(() => playTone(659.25, 0.2, 'sine'), 180); // E5
        setTimeout(() => playTone(783.99, 0.2, 'sine'), 360); // G5
        setTimeout(() => playTone(1046.50, 0.5, 'sine'), 540); // C6
    }

    function playCountdownTick() {
        playTone(440, 0.08, 'sine');
    }

    // Formatear segundos en MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Actualizar interfaz visual
    function updateUI() {
        const currentPhase = routinePhases[currentPhaseIndex];

        // Tiempo en reloj principal y secundario
        timerDigits.textContent = formatTime(totalSecondsRemaining);
        timerSubtime.textContent = `Fase actual: ${formatTime(phaseSecondsRemaining)}`;

        // Textos del ejercicio en curso
        currentPhaseName.textContent = currentPhase.name;
        currentExerciseTitle.textContent = currentPhase.exerciseTitle;
        currentExerciseDesc.textContent = currentPhase.description;
        activeExerciseIcon.innerHTML = `<i class="fa-solid ${currentPhase.iconClass}"></i>`;

        // Estado del Badge
        if (totalSecondsRemaining === 0) {
            timerStatusBadge.textContent = "¡Rutina Completada!";
            timerStatusBadge.style.color = "#10b981";
        } else if (isRunning) {
            timerStatusBadge.textContent = "En Calentamiento";
            timerStatusBadge.style.color = "var(--color-accent-orange)";
        } else {
            timerStatusBadge.textContent = "En Pausa";
            timerStatusBadge.style.color = "var(--color-primary-blue)";
        }

        // Progreso de la Fase Actual
        const phaseTotal = currentPhase.duration;
        const phaseElapsed = phaseTotal - phaseSecondsRemaining;
        const phasePct = Math.min(100, Math.round((phaseElapsed / phaseTotal) * 100));
        phaseProgressBar.style.width = `${phasePct}%`;
        phaseProgressPercent.textContent = `${phasePct}%`;

        // Progreso Total de 15 min
        const totalElapsed = TOTAL_ROUTINE_SECONDS - totalSecondsRemaining;
        const totalPct = Math.min(100, Math.round((totalElapsed / TOTAL_ROUTINE_SECONDS) * 100));
        totalProgressBar.style.width = `${totalPct}%`;
        totalProgressPercent.textContent = `${totalPct}%`;

        // Progreso del Dial Circular SVG
        const circleOffset = CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE * (totalElapsed / TOTAL_ROUTINE_SECONDS));
        progressCircle.style.strokeDashoffset = circleOffset;

        // Actualizar pills del tracker de fases
        phasePills.forEach((pill, idx) => {
            pill.classList.remove('active', 'completed');
            if (idx === currentPhaseIndex) {
                pill.classList.add('active');
            } else if (idx < currentPhaseIndex) {
                pill.classList.add('completed');
            }
        });
    }

    // Iniciar o Pausar
    function togglePlayPause() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function startTimer() {
        if (totalSecondsRemaining <= 0) {
            resetTimer();
        }
        isRunning = true;
        playPauseIcon.className = "fa-solid fa-pause";
        playPauseText.textContent = "Pausar Rutina";

        timerInterval = setInterval(() => {
            if (phaseSecondsRemaining > 0 && totalSecondsRemaining > 0) {
                phaseSecondsRemaining--;
                totalSecondsRemaining--;

                // Alerta suave en los últimos 3 segundos de fase
                if (phaseSecondsRemaining <= 3 && phaseSecondsRemaining > 0) {
                    playCountdownTick();
                }

                updateUI();
            } else if (totalSecondsRemaining > 0) {
                // Avanzar a la siguiente fase
                if (currentPhaseIndex < routinePhases.length - 1) {
                    currentPhaseIndex++;
                    phaseSecondsRemaining = routinePhases[currentPhaseIndex].duration;
                    playPhaseChangeSound();
                    updateUI();
                }
            } else {
                // Rutina completada
                pauseTimer();
                totalSecondsRemaining = 0;
                phaseSecondsRemaining = 0;
                updateUI();
                playFinishRoutineSound();
            }
        }, 1000);

        updateUI();
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timerInterval);
        playPauseIcon.className = "fa-solid fa-play";
        playPauseText.textContent = "Reanudar Rutina";
        updateUI();
    }

    function resetTimer() {
        pauseTimer();
        currentPhaseIndex = 0;
        phaseSecondsRemaining = routinePhases[0].duration;
        totalSecondsRemaining = TOTAL_ROUTINE_SECONDS;
        playPauseText.textContent = "Comenzar Rutina";
        timerStatusBadge.textContent = "Listo para iniciar";
        timerStatusBadge.style.color = "var(--color-primary-blue)";
        updateUI();
    }

    function nextPhase() {
        if (currentPhaseIndex < routinePhases.length - 1) {
            // Calcular cuánto tiempo queda en la fase actual y descontarlo del total
            totalSecondsRemaining -= phaseSecondsRemaining;
            currentPhaseIndex++;
            phaseSecondsRemaining = routinePhases[currentPhaseIndex].duration;
            playPhaseChangeSound();
            updateUI();
        }
    }

    function prevPhase() {
        if (currentPhaseIndex > 0) {
            // Revertir a la fase previa
            currentPhaseIndex--;
            // Ajustar el total restante
            let calculatedRemaining = 0;
            for (let i = currentPhaseIndex; i < routinePhases.length; i++) {
                calculatedRemaining += routinePhases[i].duration;
            }
            totalSecondsRemaining = calculatedRemaining;
            phaseSecondsRemaining = routinePhases[currentPhaseIndex].duration;
            updateUI();
        }
    }

    // Event Listeners de Botones
    btnPlayPause.addEventListener('click', togglePlayPause);
    btnResetTimer.addEventListener('click', resetTimer);
    btnNextPhase.addEventListener('click', nextPhase);
    btnPrevPhase.addEventListener('click', prevPhase);

    // Click en una fase individual del tracker
    phasePills.forEach((pill) => {
        pill.addEventListener('click', () => {
            const targetIndex = parseInt(pill.getAttribute('data-phase-index'), 10);
            if (!isNaN(targetIndex) && targetIndex !== currentPhaseIndex) {
                currentPhaseIndex = targetIndex;
                phaseSecondsRemaining = routinePhases[targetIndex].duration;

                let remaining = 0;
                for (let i = targetIndex; i < routinePhases.length; i++) {
                    remaining += routinePhases[i].duration;
                }
                totalSecondsRemaining = remaining;
                updateUI();
                playPhaseChangeSound();
            }
        });
    });

    // Toggle de Sonido
    btnSoundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundIcon.className = "fa-solid fa-volume-high";
            btnSoundToggle.title = "Sonido activado";
            playTone(600, 0.1);
        } else {
            soundIcon.className = "fa-solid fa-volume-xmark";
            btnSoundToggle.title = "Sonido silenciado";
        }
    });

    // Inicializar visualización
    updateUI();
}

/* --------------------------------------------------------------------------
   5. VALIDACIÓN Y FEEDBACK DEL FORMULARIO DE CONTACTO
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const feedbackBox = document.getElementById('form-feedback');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const submitBtn = document.getElementById('btn-submit-contact');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Limpiar errores previos
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        feedbackBox.className = 'form-feedback';
        feedbackBox.style.display = 'none';

        // Validar Nombre
        if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
            nameError.textContent = 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).';
            isValid = false;
        }

        // Validar Correo Electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Ingresa un correo electrónico válido.';
            isValid = false;
        }

        // Validar Mensaje
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            messageError.textContent = 'Tu mensaje debe tener al menos 10 caracteres.';
            isValid = false;
        }

        if (isValid) {
            // Simular envío
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando mensaje...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje';

                feedbackBox.className = 'form-feedback success';
                feedbackBox.textContent = '¡Gracias por contactarnos! Tu consulta ha sido enviada correctamente. Nuestro equipo de entrenadores te responderá pronto.';
                feedbackBox.style.display = 'block';

                form.reset();
            }, 1200);
        }
    });

    // Limpiar errores al escribir
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const errSpan = document.getElementById(`${input.id.replace('contact-', '')}-error`);
            if (errSpan) errSpan.textContent = '';
        });
    });
}

/* --------------------------------------------------------------------------
   6. BOTÓN VOLVER ARRIBA
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
