/* ----------------------------------------------------
   O Brilho de Alice - Logic, Audio & Magic Effects Engine
---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnStart = document.getElementById('btn-start');
    const btnMusic = document.getElementById('btn-music');
    const btnNarration = document.getElementById('btn-narration');
    const starsSteps = document.querySelectorAll('.star-step');
    const pageNumDisplay = document.getElementById('page-num');
    const particlesContainer = document.getElementById('particles-container');

    // App State
    let currentPageIndex = 0;
    let isMusicActive = false;
    let isNarrationActive = false;
    
    // Web Audio Synthesizer Variables
    let audioCtx = null;
    let ambientInterval = null;
    let masterVolume = null;

    // Speech Synthesis Variables
    let synth = window.speechSynthesis;
    let currentUtterance = null;
    let speechTimeout = null;

    // ----------------------------------------------------
    // 1. Background Magic Particles (Floating stars)
    // ----------------------------------------------------
    function initParticles() {
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2; // 2px to 6px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100 + 100}vh`;
            
            const duration = Math.random() * 6 + 6; // 6s to 12s
            particle.style.animationDuration = `${duration}s`;
            
            const delay = Math.random() * 10;
            particle.style.animationDelay = `${delay}s`;
            
            const colors = ['#ffffff', '#ffe066', '#a1e3f9', '#ffb3c1'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // ----------------------------------------------------
    // 2. Custom Magic Cursor (Desktop Follower)
    // ----------------------------------------------------
    function initCustomCursor() {
        if (window.matchMedia('(hover: hover)').matches) {
            const cursor = document.createElement('div');
            cursor.className = 'magic-cursor';
            
            const sparkle = document.createElement('span');
            sparkle.className = 'magic-cursor-sparkle';
            sparkle.textContent = '✨';
            cursor.appendChild(sparkle);
            
            document.body.appendChild(cursor);
            cursor.style.display = 'block';
            
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            
            window.addEventListener('mousemove', (e) => {
                document.body.classList.add('mouse-moving');
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            // Smoothly interpolate cursor position
            function updateCursor() {
                const dx = mouseX - cursorX;
                const dy = mouseY - cursorY;
                
                cursorX += dx * 0.15;
                cursorY += dy * 0.15;
                
                cursor.style.left = `${cursorX}px`;
                cursor.style.top = `${cursorY}px`;
                
                requestAnimationFrame(updateCursor);
            }
            updateCursor();
        }
    }

    // ----------------------------------------------------
    // 3. Canvas Magical Sparkles Trail & Explosions
    // ----------------------------------------------------
    function initMagicCanvas() {
        const canvas = document.getElementById('magic-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        class MagicSparkle {
            constructor(x, y, isClick = false) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * (isClick ? 8 : 4) + 1.5;
                this.speedX = (Math.random() - 0.5) * (isClick ? 7 : 1.5);
                this.speedY = (Math.random() - 0.5) * (isClick ? 7 : 1.5) - (isClick ? 1.5 : 0.4);
                // Twinkle color palette: Gold, Pink, Light Cyan, Soft White
                const colors = ['#ffe066', '#ff758f', '#4cc9f0', '#ffffff'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.015;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.15;
                this.isStar = Math.random() > 0.4;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.angle += this.spin;
                this.alpha -= this.decay;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillStyle = this.color;
                
                // Draw glow shadow
                ctx.shadowBlur = this.size * 2;
                ctx.shadowColor = this.color;
                
                if (this.isStar) {
                    ctx.beginPath();
                    for (let i = 0; i < 4; i++) {
                        ctx.lineTo(0, -this.size);
                        ctx.rotate(Math.PI / 4);
                        ctx.lineTo(0, -this.size / 3);
                        ctx.rotate(Math.PI / 4);
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }
        
        function addSparkles(x, y, count = 1, isClick = false) {
            for (let i = 0; i < count; i++) {
                particles.push(new MagicSparkle(x, y, isClick));
            }
        }
        
        window.addEventListener('mousemove', (e) => {
            addSparkles(e.clientX, e.clientY, 1);
        });
        
        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            addSparkles(touch.clientX, touch.clientY, 1);
        }, { passive: true });
        
        window.addEventListener('click', (e) => {
            addSparkles(e.clientX, e.clientY, 15, true);
            playClickChime();
        });
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // ----------------------------------------------------
    // 4. Interactive 3D Image Hover Tilt
    // ----------------------------------------------------
    function init3DTilt() {
        const images = document.querySelectorAll('.page-img, .cover-img');
        images.forEach(img => {
            img.addEventListener('mousemove', (e) => {
                const rect = img.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const normX = (x / rect.width) - 0.5;
                const normY = (y / rect.height) - 0.5;
                
                const tiltX = normX * 14;
                const tiltY = -normY * 14;
                
                img.style.transform = `rotateY(${tiltX}deg) rotateX(${tiltY}deg) scale(1.04)`;
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
            });
        });
    }

    // ----------------------------------------------------
    // 5. Magical Text Reveal Formatting
    // ----------------------------------------------------
    function initMagicText() {
        const storyTexts = document.querySelectorAll('.story-text');
        storyTexts.forEach(el => {
            // Find current child nodes
            const childNodes = Array.from(el.childNodes);
            let newHtml = '';
            
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    // Split words but preserve spaces
                    const words = text.split(/(\s+)/);
                    const wrapped = words.map(chunk => {
                        if (chunk.trim() === '') return chunk; // preserve spaces
                        return `<span class="word">${chunk}</span>`;
                    }).join('');
                    newHtml += wrapped;
                } else {
                    // Element node (like dropcap span) - keep it as is
                    newHtml += node.outerHTML;
                }
            });
            el.innerHTML = newHtml;
        });
    }

    function triggerTextReveal(pageIndex) {
        // Reset all words
        document.querySelectorAll('.story-text .word').forEach(word => {
            word.classList.remove('reveal');
        });
        
        const activePage = document.getElementById(`page-${pageIndex}`);
        if (!activePage) return;
        
        const words = activePage.querySelectorAll('.story-text .word');
        words.forEach((word, idx) => {
            setTimeout(() => {
                word.classList.add('reveal');
            }, idx * 40); // 40ms stagger per word
        });
    }

    // ----------------------------------------------------
    // 6. Audio Engine (Web Audio Synthesizer)
    // ----------------------------------------------------
    function initAudio() {
        if (audioCtx) return;
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        
        masterVolume = audioCtx.createGain();
        masterVolume.gain.setValueAtTime(0.4, audioCtx.currentTime);
        masterVolume.connect(audioCtx.destination);
    }

    function playChime(frequency, time, duration = 1.5) {
        if (!audioCtx || audioCtx.state === 'suspended') return;

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency, time);
        
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.12, time + 0.08); // soft rise
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration); // smooth release
        
        osc.connect(gainNode);
        gainNode.connect(masterVolume);
        
        osc.start(time);
        osc.stop(time + duration);
    }

    function playClickChime() {
        if (!audioCtx || audioCtx.state === 'suspended') return;
        const now = audioCtx.currentTime;
        // Pentatonic bells
        const notes = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00]; // C6 - A6
        const randNote = notes[Math.floor(Math.random() * notes.length)];
        playChime(randNote, now, 0.4);
    }

    function playPageTurnSound() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        // Arpeggio sweep
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 to C6
        notes.forEach((freq, idx) => {
            playChime(freq, now + (idx * 0.06), 0.7);
        });
    }

    function startAmbientMusic() {
        if (ambientInterval) clearInterval(ambientInterval);
        
        // Pentatonic magical chord notes
        const scale = [392.00, 440.00, 493.88, 587.33, 659.25, 783.99]; // G4 to G5
        
        function playRandomNote() {
            if (!isMusicActive || !audioCtx) return;
            const noteIndex = Math.floor(Math.random() * scale.length);
            const freq = scale[noteIndex];
            const now = audioCtx.currentTime;
            
            playChime(freq, now, 3.5);
            
            // Chord support (30% chance)
            if (Math.random() > 0.7) {
                const companion = scale[(noteIndex + 2) % scale.length];
                playChime(companion, now + 0.2, 3.0);
            }
        }

        playRandomNote();
        ambientInterval = setInterval(playRandomNote, 2500);
    }

    function stopAmbientMusic() {
        if (ambientInterval) {
            clearInterval(ambientInterval);
            ambientInterval = null;
        }
    }

    btnMusic.addEventListener('click', () => {
        initAudio();
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isMusicActive = !isMusicActive;
        
        if (isMusicActive) {
            btnMusic.classList.add('active');
            startAmbientMusic();
            playChime(783.99, audioCtx.currentTime, 1);
        } else {
            btnMusic.classList.remove('active');
            stopAmbientMusic();
        }
    });

    // ----------------------------------------------------
    // 7. Narration Engine (Speech Synthesis)
    // ----------------------------------------------------
    function getCleanPageText(pageIndex) {
        if (pageIndex === 0) {
            return "O Brilho de Alice: O Sonho de uma Estrela. Escrito por Ana Carla Saraiva Piquet.";
        }
        
        const pageEl = document.getElementById(`page-${pageIndex}`);
        if (!pageEl) return "";
        
        // Grab basic raw text before it was wrapped in spans
        const textEl = pageEl.querySelector('.story-text');
        const titleEl = pageEl.querySelector('.page-title');
        
        if (!textEl) return "";
        
        const titleText = titleEl ? titleEl.textContent : "";
        const bodyText = textEl.textContent;
        
        return `${titleText}. ${bodyText}`;
    }

    function speakPage(index) {
        if (!synth) return;
        
        synth.cancel();
        if (speechTimeout) clearTimeout(speechTimeout);
        
        if (!isNarrationActive) return;

        const textToSpeak = getCleanPageText(index);
        currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
        currentUtterance.lang = 'pt-BR';
        
        const voices = synth.getVoices();
        const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR'));
        if (ptVoice) {
            currentUtterance.voice = ptVoice;
        }
        
        currentUtterance.rate = 0.95;
        currentUtterance.pitch = 1.05;
        
        synth.speak(currentUtterance);
    }

    btnNarration.addEventListener('click', () => {
        isNarrationActive = !isNarrationActive;
        
        if (isNarrationActive) {
            btnNarration.classList.add('active');
            speakPage(currentPageIndex);
        } else {
            btnNarration.classList.remove('active');
            if (synth) synth.cancel();
        }
    });

    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => {
            if (isNarrationActive) speakPage(currentPageIndex);
        };
    }

    // ----------------------------------------------------
    // 8. Page Navigation Logic
    // ----------------------------------------------------
    function updateNavigationUI() {
        btnPrev.disabled = (currentPageIndex === 0);
        btnNext.disabled = (currentPageIndex === pages.length - 1);
        
        if (currentPageIndex === 0) {
            pageNumDisplay.textContent = "Capa";
        } else {
            pageNumDisplay.textContent = `Página ${currentPageIndex} de ${pages.length - 1}`;
        }
        
        starsSteps.forEach((star, index) => {
            if (index === currentPageIndex) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function goToPage(targetIndex, direction = 'next') {
        if (targetIndex < 0 || targetIndex >= pages.length || targetIndex === currentPageIndex) return;

        const currentOutPage = document.getElementById(`page-${currentPageIndex}`);
        const targetInPage = document.getElementById(`page-${targetIndex}`);

        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playPageTurnSound();

        // Apply slide animation
        if (direction === 'next') {
            currentOutPage.classList.add('slide-out-left');
        } else {
            currentOutPage.classList.add('slide-out-right');
        }
        currentOutPage.classList.remove('active');

        targetInPage.classList.remove('slide-out-left', 'slide-out-right');
        targetInPage.classList.add('active');

        // Cleanup out-class after animation completes
        setTimeout(() => {
            currentOutPage.classList.remove('slide-out-left', 'slide-out-right');
        }, 600);

        currentPageIndex = targetIndex;
        updateNavigationUI();
        
        // Trigger magical word reveal on the new page
        triggerTextReveal(currentPageIndex);

        // Handle Speech Narration
        if (isNarrationActive) {
            speechTimeout = setTimeout(() => {
                speakPage(currentPageIndex);
            }, 500);
        }
    }

    // Event Listeners for navigation
    btnPrev.addEventListener('click', () => goToPage(currentPageIndex - 1, 'prev'));
    btnNext.addEventListener('click', () => goToPage(currentPageIndex + 1, 'next'));
    btnStart.addEventListener('click', () => goToPage(1, 'next'));

    starsSteps.forEach(star => {
        star.addEventListener('click', () => {
            const targetIndex = parseInt(star.getAttribute('data-target'), 10);
            const direction = targetIndex > currentPageIndex ? 'next' : 'prev';
            goToPage(targetIndex, direction);
        });
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentPageIndex < pages.length - 1) goToPage(currentPageIndex + 1, 'next');
        } else if (e.key === 'ArrowLeft') {
            if (currentPageIndex > 0) goToPage(currentPageIndex - 1, 'prev');
        }
    });

    // Mobile Swipe Gestures
    let touchStartX = 0;
    let touchEndX = 0;

    book.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    book.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const minDistance = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > minDistance) {
            if (diff < 0 && currentPageIndex < pages.length - 1) {
                goToPage(currentPageIndex + 1, 'next');
            } else if (diff > 0 && currentPageIndex > 0) {
                goToPage(currentPageIndex - 1, 'prev');
            }
        }
    }

    // ----------------------------------------------------
    // 9. Initializations
    // ----------------------------------------------------
    initParticles();
    initCustomCursor();
    initMagicCanvas();
    initMagicText();
    init3DTilt();
    updateNavigationUI();
    
    // Animate cover text reveal on load
    triggerTextReveal(0);
});
