document.addEventListener('DOMContentLoaded', () => {
      
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
        { time: 6, fr: "Comme architecte de formation, j'envisage la phonétique comme une structure.", es: "Como arquitecto de formación, veo la fonética como una estructura." },
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