// Global active steps definition for Method Section
const stepsData = [
  {
    phase: "Fase 01 del plan de obra",
    title: "Los Cimientos",
    subtitle: "Sonidos esenciales del francés",
    desc: "Comenzamos dominando los sonidos que no existen en español. Entender las vocales nasales y la emblemática 'R' francesa desde su colocación física, sin misterios.",
    num: "#01",
    ref: "Puesta a nivel y cimentación profunda."
  },
  {
    phase: "Fase 02 del plan de obra",
    title: "La Estructura",
    subtitle: "Uniones y ritmo de la frase",
    desc: "Alineamos cómo fluyen las oraciones. Conectamos palabras mediante el enchainement y la liaison para hablar sin tropiezos.",
    num: "#02",
    ref: "Colocación de vigas maestras de carga."
  },
  {
    phase: "Fase 03 del plan de obra",
    title: "La Envoltura",
    subtitle: "Entonación y modulación",
    desc: "Trabajamos las pausas y la musicalidad del francés real para sonar natural e integrarte de verdad con hablantes nativos.",
    num: "#03",
    ref: "Impermeabilización y aislamiento termoacústico."
  },
  {
    phase: "Fase 04 del plan de obra",
    title: "Los Interiores",
    subtitle: "Afinación fina",
    desc: "Ajustamos y pulimos detalles mínimos de pronunciación que marcan la gran diferencia entre hacerte entender y hablar con real solvencia.",
    num: "#04",
    ref: "Instalación de acabados finos y yesería."
  },
  {
    phase: "Fase 05 del plan de obra",
    title: "Los Acabados",
    subtitle: "Naturalidad, confianza y fluidez",
    desc: "Fijamos todo lo aprendido en escenarios simulados del día a día para que hables de corrido, con absoluta seguridad.",
    num: "#05",
    ref: "Entrega de obra llave en mano y control de calidad."
  }
];

function setActiveStep(index) {
  const step = stepsData[index];
  if (!step) return;

  // Update content
  document.getElementById('detail-phase-num').textContent = step.phase;
  document.getElementById('detail-title').textContent = step.title;
  document.getElementById('detail-subtitle').textContent = step.subtitle;
  document.getElementById('detail-desc').textContent = step.desc;
  document.getElementById('detail-large-num').textContent = step.num;
  document.getElementById('detail-ref').textContent = step.ref;

  // Update active state class on buttons
  const buttons = document.querySelectorAll('.step-btn');
  buttons.forEach((btn, idx) => {
    const numText = btn.querySelector('.step-num');
    const subtitleText = btn.querySelector('.step-subtitle');
    const chevron = btn.querySelector('.step-chevron');

    if (idx === index) {
      btn.className = "step-btn w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer bg-brand-ivoire/40 border-brand-ciel text-brand-marine";
      if (numText) {
        numText.className = "step-num font-mono text-sm font-bold text-brand-ciel";
      }
      if (subtitleText) {
        subtitleText.className = "step-subtitle font-sans text-xs text-brand-or font-semibold";
      }
      if (chevron) {
        chevron.className = "step-chevron w-4 h-4 text-brand-ciel opacity-100 transition-all duration-300";
      }
    } else {
      btn.className = "step-btn w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 group bg-white border-brand-ivoire text-brand-marine hover:border-brand-ciel/50 cursor-pointer";
      if (numText) {
        numText.className = "step-num font-mono text-sm font-bold text-brand-ardoise";
      }
      if (subtitleText) {
        subtitleText.className = "step-subtitle font-sans text-xs text-brand-ardoise";
      }
      if (chevron) {
        chevron.className = "step-chevron w-4 h-4 text-brand-ardoise opacity-0 group-hover:opacity-100 transition-all duration-300";
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize active method step
  setActiveStep(0);
  
  // 1. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isHidden = mobileDrawer.classList.contains('hidden');
    if (isHidden) {
      mobileDrawer.classList.remove('hidden');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      mobileDrawer.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);
  
  // Close mobile drawer upon click on any navigation link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });


  // 2. Interactive Simulated Video Player with French/Spanish Subtitles & Equalizer Pulse
  const subtitles = [
    { time: 0, fr: "Bonjour à tous ! Je suis Sergio Tomassi.", es: "¡Hola a todos! Soy Sergio Tomassi." },
    { time: 6, fr: "Comme architecte de formation, j'envisage la phonétique comme une structure.", es: "Comme architecte de formation, veo la fonética como una estructura." },
    { time: 14, fr: "Chaque petit ajustement dans vos cordes vocales change toute la confiance avec laquelle vous parlez.", es: "Cada pequeño ajuste en tus cuerdas vocales cambia toda la confianza con la que hablas." },
    { time: 22, fr: "Ici, on ne cherche pas la perfection. On construit votre sécurité, pas à pas.", es: "Aquí no buscamos la perfección. Construimos tu seguridad, paso a paso." },
    { time: 30, fr: "Mon but, c'est de vous aider à vous libérer de la timidité pour de bon.", es: "Mi meta es ayudarte a liberarte de la timidez de una vez por todas." },
    { time: 38, fr: "Rejoignez-moi, et découvrons ensemble la vraie architecture de votre voix.", es: "Acompáñame, y descubramos juntos la verdadera arquitectura de tu voz." },
    { time: 44, fr: "Des mots plus clairs, pour des rêves plus grands. À très bientôt !", es: "Palabras más claras, para sueños más grandes. ¡Hasta muy pronto!" }
  ];

  const duration = 48; // seconds
  let currentTime = 0;
  let isPlaying = false;
  let playbackInterval = null;

  const videoImage = document.getElementById('video-image');
  const centerPlayBtn = document.getElementById('video-play-btn');
  const barPlayBtn = document.getElementById('video-bar-play-btn');
  const playBarIcon = document.getElementById('play-bar-icon');
  const resetBtn = document.getElementById('video-reset-btn');
  const timelineProgress = document.getElementById('video-timeline-progress');
  const timeTxt = document.getElementById('video-time-txt');
  const subFr = document.getElementById('sub-fr');
  const subEs = document.getElementById('sub-es');
  const dot = document.getElementById('playback-status-dot');
  const statusText = document.getElementById('playback-status-text');
  const equalizerContainer = document.getElementById('equalizer-container');

  // Initialize equalizer bars
  const barHeights = [12, 24, 45, 18, 30, 64, 40, 22, 18, 48, 70, 85, 30, 22, 55, 60, 42, 20];
  barHeights.forEach((height, i) => {
    const bar = document.createElement('div');
    bar.className = 'w-1 bg-brand-ciel rounded-t-xs equalizer-bar';
    bar.style.height = '4px';
    bar.style.setProperty('--pulse-duration', `${0.5 + Math.random() * 0.8}s`);
    bar.style.setProperty('--pulse-delay', `${i * 0.05}s`);
    equalizerContainer.appendChild(bar);
  });

  const eqBars = document.querySelectorAll('.equalizer-bar');

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateUI() {
    // Timeline and numbers
    const percent = (currentTime / duration) * 100;
    timelineProgress.style.width = `${percent}%`;
    timeTxt.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;

    // Active subtitle index lookup
    let activeIdx = 0;
    for (let i = 0; i < subtitles.length; i++) {
      if (currentTime >= subtitles[i].time) {
        activeIdx = i;
      }
    }
    subFr.textContent = subtitles[activeIdx].fr;
    subEs.textContent = subtitles[activeIdx].es;

    // Equalizer status
    eqBars.forEach((bar, idx) => {
      if (isPlaying) {
        bar.style.height = `${barHeights[idx % barHeights.length]}%`;
        bar.classList.add('equalizer-active');
      } else {
        bar.style.height = '4px';
        bar.classList.remove('equalizer-active');
      }
    });
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      // Play state
      videoImage.classList.remove('brightness-50');
      videoImage.classList.add('brightness-[0.7]', 'scale-102');
      centerPlayBtn.classList.add('hidden');
      dot.classList.remove('bg-brand-or');
      dot.classList.add('bg-red-500', 'animate-pulse');
      statusText.textContent = 'EN REPRODUCCIÓN (DEMO)';
      
      // Toggle bar icon to pause
      playBarIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />';
      
      playbackInterval = setInterval(() => {
        if (currentTime >= duration) {
          pauseVideo();
          currentTime = 0;
          updateUI();
        } else {
          currentTime += 1;
          updateUI();
        }
      }, 1000);
    } else {
      pauseVideo();
    }
    updateUI();
  }

  function pauseVideo() {
    isPlaying = false;
    clearInterval(playbackInterval);
    videoImage.classList.remove('brightness-[0.7]', 'scale-102');
    videoImage.classList.add('brightness-50');
    centerPlayBtn.classList.remove('hidden');
    dot.classList.add('bg-brand-or');
    dot.classList.remove('bg-red-500', 'animate-pulse');
    statusText.textContent = 'VIDEO INTRODUCTORIO';
    
    // Toggle bar icon to play
    playBarIcon.innerHTML = '<path d="M8 5v14l11-7z"></path>';
  }

  centerPlayBtn.addEventListener('click', togglePlay);
  barPlayBtn.addEventListener('click', togglePlay);

  resetBtn.addEventListener('click', () => {
    pauseVideo();
    currentTime = 0;
    togglePlay();
  });


  // 3. Form Submission Handler with localStorage Simulation
  const form = document.getElementById('diagnostic-form');
  const successMessage = document.getElementById('form-success-message');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const successName = document.getElementById('success-user-name');
  const successEmail = document.getElementById('success-user-email');

  // Check for saved form responses on startup
  const savedSubmission = localStorage.getItem('sergio_tomassi_diagnostic');
  if (savedSubmission) {
    try {
      const data = JSON.parse(savedSubmission);
      showSuccessState(data.fullName, data.email);
    } catch (e) {
      console.error(e);
    }
  }

  function showSuccessState(name, email) {
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successName.textContent = name;
    successEmail.textContent = email;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('fullName').value;
    const emailVal = document.getElementById('email').value;
    const levelVal = document.getElementById('frenchLevel').value;
    const challengeVal = document.getElementById('mainChallenge').value;
    const messageVal = document.getElementById('customMessage').value;

    const submission = {
      fullName: nameVal,
      email: emailVal,
      frenchLevel: levelVal,
      mainChallenge: challengeVal,
      customMessage: messageVal,
      date: new Date().toLocaleDateString()
    };

    // Persist to local storage
    localStorage.setItem('sergio_tomassi_diagnostic', JSON.stringify(submission));
    showSuccessState(nameVal, emailVal);
  });

  resetFormBtn.addEventListener('click', () => {
    localStorage.removeItem('sergio_tomassi_diagnostic');
    form.classList.remove('hidden');
    successMessage.classList.add('hidden');
    form.reset();
  });

});
