/* ----------------------------------------------------
   Portal de Histórias Mágicas - Logic & Interactive Engine
---------------------------------------------------- */
// 1. Stories Database Definition
const STORIES_DATA = window.STORIES_DATA || {};

document.addEventListener('DOMContentLoaded', () => {
    // Portal / Library Elements
    const libraryView = document.getElementById('library-view');
    const bookFrame = document.getElementById('book-frame');
    const appFooter = document.getElementById('app-footer');
    const btnBackToLibrary = document.getElementById('btn-back-to-library');
    const storyCards = document.querySelectorAll('.story-card:not(.locked)');

    // Book Elements
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
    const authorTagDiv = document.getElementById('author-tag');

    // GAME 1: Memory Game Elements
    const memoryGrid = document.getElementById('memory-grid');
    const gameMovesDisplay = document.getElementById('game-moves');
    const gameWinPopup = document.getElementById('game-win-popup');
    const btnResetGame = document.getElementById('btn-reset-game');
    const btnWinReset = document.getElementById('btn-win-reset');

    // GAME 2: Catch the Stars Elements
    const catchScoreDisplay = document.getElementById('catch-score');
    const catchGameArea = document.getElementById('catch-game-area');
    const catchWinPopup = document.getElementById('catch-win-popup');
    const btnStartCatch = document.getElementById('btn-start-catch');
    const btnResetCatch = document.getElementById('btn-reset-catch');

    // GAME 3: Quiz Elements
    const quizQuestion = document.getElementById('quiz-question');
    const quizChoices = document.getElementById('quiz-choices');
    const quizProgress = document.getElementById('quiz-progress');
    const quizContainer = document.getElementById('quiz-container');
    const quizWinPopup = document.getElementById('quiz-win-popup');
    const btnResetQuiz = document.getElementById('btn-reset-quiz');

    // App State
    let currentStoryId = 'alice';
    let currentStory = STORIES_DATA['alice'];
    let currentPageIndex = 0;
    let currentSequenceIndex = 0;
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

    // Canvas Sparkles API
    let addSparklesExternal = null;
    let triggerWinConfetti = null;

    // ----------------------------------------------------
    // Story Portal & Library View Controls
    // ----------------------------------------------------
    function loadStory(storyId) {
        currentStoryId = storyId;
        currentStory = STORIES_DATA[storyId];

        // 1. Update cover page content
        if (currentStory.title) {
            document.getElementById('cover-title').innerHTML = currentStory.title;
        }
        if (currentStory.subtitle) {
            document.getElementById('cover-subtitle').textContent = currentStory.subtitle;
        }
        
        const coverImgEl = document.getElementById('cover-img');
        const existingCoverPlaceholder = document.getElementById('cover-placeholder-div');
        if (existingCoverPlaceholder) existingCoverPlaceholder.remove();

        if (currentStory.usePlaceholder) {
            if (coverImgEl) coverImgEl.style.display = 'none';
            const placeholderDiv = document.createElement('div');
            placeholderDiv.id = 'cover-placeholder-div';
            placeholderDiv.className = 'placeholder-cover-div';
            placeholderDiv.style.width = '100%';
            placeholderDiv.style.height = '100%';
            placeholderDiv.style.display = 'flex';
            placeholderDiv.style.justifyContent = 'center';
            placeholderDiv.style.alignItems = 'center';
            placeholderDiv.style.background = currentStory.placeholderGradient;
            placeholderDiv.style.borderRadius = 'var(--border-radius-md)';
            placeholderDiv.style.boxShadow = 'inset 0 0 60px rgba(0,0,0,0.4)';
            placeholderDiv.innerHTML = `
                <div style="font-size: 6rem; animation: floatEmoji 3s ease-in-out infinite;">${currentStory.placeholderEmoji}</div>
            `;
            if (coverImgEl) coverImgEl.parentNode.appendChild(placeholderDiv);
        } else if (coverImgEl) {
            coverImgEl.style.display = 'block';
            coverImgEl.src = currentStory.coverImg;
            coverImgEl.alt = currentStory.coverAlt || "";
        }

        if (currentStory.author) {
            document.getElementById('cover-author').textContent = `Escritora: ${currentStory.author}`;
        }

        // 2. Update page navigation author tag
        updateHeaderAuthorTag();

        // 3. Update story pages 1 to 5
        for (let i = 1; i <= 5; i++) {
            const pageEl = document.getElementById(`page-${i}`);
            if (!pageEl) continue;
            
            const pageData = currentStory.pages ? currentStory.pages[i - 1] : null;
            
            // Remove existing placeholder if any
            const existingPlaceholder = pageEl.querySelector('.placeholder-cover-div');
            if (existingPlaceholder) existingPlaceholder.remove();

            const imgEl = pageEl.querySelector('.page-img');

            if (pageData) {
                // Update title & ornament
                const titleEl = pageEl.querySelector('.page-title');
                if (titleEl) titleEl.textContent = pageData.title;
                const ornamentEl = pageEl.querySelector('.ornament');
                if (ornamentEl) ornamentEl.textContent = pageData.ornament;
                
                // Update text
                const textEl = pageEl.querySelector('.story-text');
                if (textEl) {
                    textEl.innerHTML = `<span class="dropcap">${pageData.dropcap}</span>${pageData.text.substring(pageData.dropcap.length)}`;
                }

                // Update image or placeholder
                if (pageData.usePlaceholder) {
                    if (imgEl) imgEl.style.display = 'none';
                    const placeholderDiv = document.createElement('div');
                    placeholderDiv.className = 'placeholder-cover-div';
                    placeholderDiv.style.width = '100%';
                    placeholderDiv.style.height = '100%';
                    placeholderDiv.style.display = 'flex';
                    placeholderDiv.style.flexDirection = 'column';
                    placeholderDiv.style.justifyContent = 'center';
                    placeholderDiv.style.alignItems = 'center';
                    placeholderDiv.style.background = pageData.placeholderGradient;
                    placeholderDiv.style.borderRadius = 'var(--border-radius-md)';
                    placeholderDiv.style.boxShadow = 'inset 0 0 50px rgba(0,0,0,0.3)';
                    placeholderDiv.style.position = 'relative';
                    placeholderDiv.style.overflow = 'hidden';

                    placeholderDiv.innerHTML = `
                        <div class="placeholder-sparkles" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; opacity: 0.5;">✨ 🌟 ✨</div>
                        <div style="font-size: 5rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3)); animation: floatEmoji 3s ease-in-out infinite;">${pageData.placeholderEmoji}</div>
                    `;
                    if (imgEl) imgEl.parentNode.appendChild(placeholderDiv);
                } else if (imgEl) {
                    imgEl.style.display = 'block';
                    imgEl.src = pageData.image;
                    imgEl.alt = pageData.imageAlt || "";
                }
            }
        }

        // 4. Update Game 1 (Memory Game) UI elements
        const page6El = document.getElementById('page-6');
        if (page6El && currentStory.game6) {
            page6El.querySelector('.page-title').textContent = currentStory.game6.title;
            page6El.querySelector('.ornament').textContent = currentStory.game6.ornament;
            
            const imgEl = page6El.querySelector('.page-img');
            const existingPlaceholder = page6El.querySelector('.placeholder-cover-div');
            if (existingPlaceholder) existingPlaceholder.remove();

            if (currentStory.usePlaceholder) {
                if (imgEl) imgEl.style.display = 'none';
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'placeholder-cover-div';
                placeholderDiv.style.width = '100%';
                placeholderDiv.style.height = '100%';
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.alignItems = 'center';
                placeholderDiv.style.background = currentStory.placeholderGradient;
                placeholderDiv.style.borderRadius = 'var(--border-radius-md)';
                placeholderDiv.innerHTML = `<div style="font-size: 5rem; animation: floatEmoji 3s ease-in-out infinite;">${currentStory.memoryIcons ? currentStory.memoryIcons[0] : '🎮'}</div>`;
                if (imgEl) imgEl.parentNode.appendChild(placeholderDiv);
            } else if (imgEl) {
                imgEl.style.display = 'block';
                imgEl.src = currentStory.game6.image;
                imgEl.alt = currentStory.game6.imageAlt || "";
            }

            page6El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game6.title;
            page6El.querySelector('.game-instructions-overlay p').textContent = currentStory.game6.instructions;
            
            const win6Popup = document.getElementById('game-win-popup');
            if (win6Popup) {
                win6Popup.querySelector('h3').textContent = currentStory.game6.winMsg;
                win6Popup.querySelector('p').textContent = currentStory.game6.winDesc;
            }
        }

        // 5. Update Game 2 (Catch Game) UI elements
        const page7El = document.getElementById('page-7');
        if (page7El && currentStory.game7) {
            page7El.querySelector('.page-title').textContent = currentStory.game7.title;
            page7El.querySelector('.ornament').textContent = currentStory.game7.ornament;
            
            const imgEl = page7El.querySelector('.page-img');
            const existingPlaceholder = page7El.querySelector('.placeholder-cover-div');
            if (existingPlaceholder) existingPlaceholder.remove();

            if (currentStory.usePlaceholder) {
                if (imgEl) imgEl.style.display = 'none';
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'placeholder-cover-div';
                placeholderDiv.style.width = '100%';
                placeholderDiv.style.height = '100%';
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.alignItems = 'center';
                placeholderDiv.style.background = currentStory.placeholderGradient;
                placeholderDiv.style.borderRadius = 'var(--border-radius-md)';
                placeholderDiv.innerHTML = `<div style="font-size: 5rem; animation: floatEmoji 3s ease-in-out infinite;">${currentStory.catchTheme ? currentStory.catchTheme.symbols[0] : '🎮'}</div>`;
                if (imgEl) imgEl.parentNode.appendChild(placeholderDiv);
            } else if (imgEl) {
                imgEl.style.display = 'block';
                imgEl.src = currentStory.game7.image;
                imgEl.alt = currentStory.game7.imageAlt || "";
            }

            page7El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game7.title;
            page7El.querySelector('.game-instructions-overlay p').textContent = currentStory.game7.instructions;
            
            const win7Popup = document.getElementById('catch-win-popup');
            if (win7Popup) {
                win7Popup.querySelector('h3').textContent = currentStory.game7.winMsg;
                win7Popup.querySelector('p').textContent = currentStory.game7.winDesc;
            }
        }

        // 6. Update Game 3 (Quiz Game) UI elements
        const page8El = document.getElementById('page-8');
        if (page8El && currentStory.game8) {
            page8El.querySelector('.page-title').textContent = currentStory.game8.title;
            page8El.querySelector('.ornament').textContent = currentStory.game8.ornament;
            
            const imgEl = page8El.querySelector('.page-img');
            const existingPlaceholder = page8El.querySelector('.placeholder-cover-div');
            if (existingPlaceholder) existingPlaceholder.remove();

            if (currentStory.usePlaceholder) {
                if (imgEl) imgEl.style.display = 'none';
                const placeholderDiv = document.createElement('div');
                placeholderDiv.className = 'placeholder-cover-div';
                placeholderDiv.style.width = '100%';
                placeholderDiv.style.height = '100%';
                placeholderDiv.style.display = 'flex';
                placeholderDiv.style.justifyContent = 'center';
                placeholderDiv.style.alignItems = 'center';
                placeholderDiv.style.background = currentStory.placeholderGradient;
                placeholderDiv.style.borderRadius = 'var(--border-radius-md)';
                placeholderDiv.innerHTML = `<div style="font-size: 5rem; animation: floatEmoji 3s ease-in-out infinite;">📖</div>`;
                if (imgEl) imgEl.parentNode.appendChild(placeholderDiv);
            } else if (imgEl) {
                imgEl.style.display = 'block';
                imgEl.src = currentStory.game8.image;
                imgEl.alt = currentStory.game8.imageAlt || "";
            }

            page8El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game8.title;
            page8El.querySelector('.game-instructions-overlay p').textContent = currentStory.game8.instructions;
            
            const win8Popup = document.getElementById('quiz-win-popup');
            if (win8Popup) {
                win8Popup.querySelector('h3').textContent = currentStory.game8.winMsg;
                win8Popup.querySelector('p').textContent = currentStory.game8.winDesc;
            }
        }

        // 7. Update Page 9 (Diary)
        const page9El = document.getElementById('page-9');
        if (page9El && currentStory.diary) {
            page9El.querySelector('.diary-title').innerHTML = currentStory.diary.title;
            page9El.querySelector('.diary-subtitle').textContent = currentStory.diary.subtitle;
            
            const diaryCoverImgEl = page9El.querySelector('.diary-cover-img');
            if (diaryCoverImgEl) {
                diaryCoverImgEl.src = currentStory.diary.coverImage;
                diaryCoverImgEl.alt = currentStory.diary.coverAlt || "";
            }
        }

        // Update steps labels in footer dynamically
        const steps = document.querySelectorAll('.star-step');
        if (steps.length >= 10) {
            let label6 = 'Memória';
            let label7 = 'Estrelas';
            let label8 = 'Quiz';
            let label9 = 'Diário';

            if (currentStoryId === 'mermaid_unicorn') {
                label6 = 'Amizade'; label7 = 'Bolhas'; label8 = 'Perguntas'; label9 = 'Diário';
            } else if (currentStoryId === 'cores_amizade') {
                label6 = 'Cores'; label7 = 'Tintas'; label8 = 'Igualdade'; label9 = 'Diário';
            } else if (currentStoryId === 'voo_lucas') {
                label6 = 'Lucas'; label7 = 'Voo'; label8 = 'Empatia'; label9 = 'Diário';
            } else if (currentStoryId === 'arvore_abracos') {
                label6 = 'Família'; label7 = 'Abraços'; label8 = 'Acolher'; label9 = 'Diário';
            }

            steps[6].querySelector('.label').textContent = label6;
            steps[7].querySelector('.label').textContent = label7;
            steps[8].querySelector('.label').textContent = label8;
            steps[9].querySelector('.label').textContent = label9;
        }

        // Reset memory cardIcons and quizQuestions to current active story
        cardIcons = currentStory.memoryIcons || [];
        gameCardsDeck = [...cardIcons, ...cardIcons];
        quizQuestions = currentStory.quiz || [];

        // Reset page variables & navigation state
        currentSequenceIndex = 0;
        currentPageIndex = currentStory.pagesSequence[currentSequenceIndex];
        
        // Remove active class from all pages and add to active page
        pages.forEach(p => p.classList.remove('active', 'slide-out-left', 'slide-out-right'));
        const activeDomPage = document.getElementById(`page-${currentPageIndex}`);
        if (activeDomPage) activeDomPage.classList.add('active');

        // Reset/init respective page logics
        resetCatchGame();
        if (currentPageIndex === 6) {
            initMemoryGame();
        } else if (currentPageIndex === 8) {
            initQuizGame();
        } else if (currentPageIndex === 9) {
            initDiaryPage();
        }

        // Reset dynamic word reveal inside texts (since text content changed)
        initMagicText();

        // Update Nav UI
        updateNavigationUI();
    }

    // Story Card click event listeners
    storyCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const storyId = card.getAttribute('data-story-id');
            if (storyId && STORIES_DATA[storyId]) {
                loadStory(storyId);

                // Transition views
                libraryView.classList.add('hidden');
                bookFrame.classList.remove('hidden');
                appFooter.classList.remove('hidden');
                btnBackToLibrary.classList.remove('hidden');

                // Play magical transition sound
                initAudio();
                if (audioCtx && audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                playVictoryChime();
            }
        });
    });

    // Back to library button click listener
    btnBackToLibrary.addEventListener('click', () => {
        // Stop audio / voice narration
        isMusicActive = false;
        btnMusic.classList.remove('active');
        stopAmbientMusic();

        isNarrationActive = false;
        btnNarration.classList.remove('active');
        if (synth) synth.cancel();

        // Close games
        resetCatchGame();

        // Transition views
        libraryView.classList.remove('hidden');
        bookFrame.classList.add('hidden');
        appFooter.classList.add('hidden');
        btnBackToLibrary.classList.add('hidden');

        // Reset reader index
        currentPageIndex = 0;
        pages.forEach(p => p.classList.remove('active', 'slide-out-left', 'slide-out-right'));
        document.getElementById('page-0').classList.add('active');
        updateNavigationUI();
    });

    // ----------------------------------------------------
    // 1. Background Magic Particles (Floating stars)
    // ----------------------------------------------------
    function initParticles() {
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 4 + 2; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100 + 100}vh`;
            
            const duration = Math.random() * 6 + 6; 
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
            constructor(x, y, isClick = false, isConfetti = false) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * (isClick || isConfetti ? 8 : 4) + 1.5;
                this.speedX = (Math.random() - 0.5) * (isConfetti ? 12 : (isClick ? 7 : 1.5));
                this.speedY = (Math.random() - 0.5) * (isConfetti ? 12 : (isClick ? 7 : 1.5)) - (isClick || isConfetti ? 1.5 : 0.4);
                
                const colors = ['#ffe066', '#ff758f', '#4cc9f0', '#ffffff', '#2ecc71'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 1;
                this.decay = Math.random() * (isConfetti ? 0.012 : 0.02) + 0.015;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.15;
                this.isStar = Math.random() > 0.3;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += 0.04; // Gravity
                this.angle += this.spin;
                this.alpha -= this.decay;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillStyle = this.color;
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
        
        function addSparkles(x, y, count = 1, isClick = false, isConfetti = false) {
            for (let i = 0; i < count; i++) {
                particles.push(new MagicSparkle(x, y, isClick, isConfetti));
            }
        }

        // Expose sparkle generator externally
        addSparklesExternal = (x, y, count = 5) => {
            addSparkles(x, y, count, true);
        };

        // Expose victory confetti burst
        triggerWinConfetti = () => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2 - 100;
            addSparkles(centerX - 120, centerY, 35, false, true);
            addSparkles(centerX + 120, centerY, 35, false, true);
            addSparkles(centerX, centerY - 60, 45, false, true);
        };
        
        window.addEventListener('mousemove', (e) => {
            addSparkles(e.clientX, e.clientY, 1);
        });
        
        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            addSparkles(touch.clientX, touch.clientY, 1);
        }, { passive: true });
        
        window.addEventListener('click', (e) => {
            if (e.target.closest('.memory-card') || e.target.closest('button') || e.target.closest('.falling-star')) {
                playClickChime();
                return;
            }
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
            const childNodes = Array.from(el.childNodes);
            let newHtml = '';
            
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    const words = text.split(/(\s+)/);
                    const wrapped = words.map(chunk => {
                        if (chunk.trim() === '') return chunk;
                        return `<span class="word">${chunk}</span>`;
                    }).join('');
                    newHtml += wrapped;
                } else {
                    newHtml += node.outerHTML;
                }
            });
            el.innerHTML = newHtml;
        });
    }

    function triggerTextReveal(pageIndex) {
        document.querySelectorAll('.story-text .word').forEach(word => {
            word.classList.remove('reveal');
        });
        
        const activePage = document.getElementById(`page-${pageIndex}`);
        if (!activePage) return;
        
        const words = activePage.querySelectorAll('.story-text .word');
        words.forEach((word, idx) => {
            setTimeout(() => {
                word.classList.add('reveal');
            }, idx * 40);
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
        gainNode.gain.linearRampToValueAtTime(0.12, time + 0.08); 
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration); 
        
        osc.connect(gainNode);
        gainNode.connect(masterVolume);
        
        osc.start(time);
        osc.stop(time + duration);
    }

    function playClickChime() {
        if (!audioCtx || audioCtx.state === 'suspended') return;
        const now = audioCtx.currentTime;
        const notes = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00]; 
        const randNote = notes[Math.floor(Math.random() * notes.length)];
        playChime(randNote, now, 0.4);
    }

    function playPageTurnSound() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; 
        notes.forEach((freq, idx) => {
            playChime(freq, now + (idx * 0.06), 0.7);
        });
    }

    function playVictoryChime() {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00]; 
        notes.forEach((freq, idx) => {
            playChime(freq, now + (idx * 0.12), 2.0);
        });
    }

    function startAmbientMusic() {
        if (ambientInterval) clearInterval(ambientInterval);
        
        const scale = [392.00, 440.00, 493.88, 587.33, 659.25, 783.99]; 
        
        function playRandomNote() {
            if (!isMusicActive || !audioCtx) return;
            const noteIndex = Math.floor(Math.random() * scale.length);
            const freq = scale[noteIndex];
            const now = audioCtx.currentTime;
            
            playChime(freq, now, 3.5);
            
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
            const cleanTitle = currentStory.title.replace(/<[^>]*>/g, ' ');
            return `${cleanTitle}: ${currentStory.subtitle}. Escrito por ${currentStory.author}.`;
        }
        if (pageIndex === 6) {
            return `${currentStory.game6.title}! ${currentStory.game6.instructions}`;
        }
        if (pageIndex === 7) {
            return `${currentStory.game7.title}! ${currentStory.game7.instructions}`;
        }
        if (pageIndex === 8) {
            return `${currentStory.game8.title}! ${currentStory.game8.instructions}`;
        }
        if (pageIndex === 9) {
            return `${currentStory.diary.title}! ${currentStory.diary.subtitle}. Escreva a sua própria história e guarde as suas memórias mágicas aqui.`;
        }
        
        const pageEl = document.getElementById(`page-${pageIndex}`);
        if (!pageEl) return "";
        
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
    // 8. GAME 1: Magical Memory Game Logic (Page 6)
    // ----------------------------------------------------
    let cardIcons = ['🐱', '🐦', '🐵', '⭐', '🎭', '👑'];
    let gameCardsDeck = [...cardIcons, ...cardIcons];
    let moves = 0;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard = null;
    let secondCard = null;

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function initMemoryGame() {
        cardIcons = currentStory.memoryIcons;
        gameCardsDeck = [...cardIcons, ...cardIcons];
        memoryGrid.innerHTML = '';
        moves = 0;
        gameMovesDisplay.textContent = moves;
        gameWinPopup.classList.remove('show');
        
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;

        const shuffledDeck = shuffle([...gameCardsDeck]);

        shuffledDeck.forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.index = index;

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = icon;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            card.addEventListener('click', flipCard);
            memoryGrid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this.classList.contains('matched') || this.classList.contains('flip')) return;
        if (this === firstCard) return;

        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        playChime(880.00, audioCtx.currentTime, 0.2);
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        gameMovesDisplay.textContent = moves;

        checkForMatch();
    }

    function checkForMatch() {
        // Bulletproof text comparison instead of datasets which can fail
        const text1 = firstCard.querySelector('.card-front').textContent;
        const text2 = secondCard.querySelector('.card-front').textContent;
        
        const isMatch = text1 === text2;
        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        // Prevent clicking these cards ever again
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        // Immediate correct match sound
        playChime(1318.51, audioCtx.currentTime, 0.5);
        
        // Trigger small visual sparkles on the canvas around the cards
        if (addSparklesExternal) {
            const rect1 = firstCard.getBoundingClientRect();
            const rect2 = secondCard.getBoundingClientRect();
            addSparklesExternal(rect1.left + rect1.width/2, rect1.top + rect1.height/2, 10);
            addSparklesExternal(rect2.left + rect2.width/2, rect2.top + rect2.height/2, 10);
        }

        const matchedCount = document.querySelectorAll('.memory-card.matched').length;
        if (matchedCount === gameCardsDeck.length) {
            triggerVictory();
        }

        resetBoard();
    }

    function resetBoard() {
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    }

    function triggerVictory() {
        playVictoryChime();
        if (triggerWinConfetti) {
            triggerWinConfetti();
            setTimeout(triggerWinConfetti, 500);
        }
        gameWinPopup.classList.add('show');
        if (isNarrationActive) {
            synth.cancel();
            const victoryUtterance = new SpeechSynthesisUtterance("Parabéns! Você liberou todas as estrelas do baú da Alice e fez o mundo brilhar!");
            victoryUtterance.lang = 'pt-BR';
            synth.speak(victoryUtterance);
        }
    }

    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            playChime(349.23, audioCtx.currentTime, 0.3); // Error buzz
        }, 200);

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 900);
    }

    btnResetGame.addEventListener('click', initMemoryGame);
    btnWinReset.addEventListener('click', initMemoryGame);


    // ----------------------------------------------------
    // 9. GAME 2: Catch the Stars Game Logic (Page 7)
    // ----------------------------------------------------
    let catchScore = 0;
    let catchSpawnerInterval = null;
    let isCatchGameActive = false;

    function resetCatchGame() {
        clearInterval(catchSpawnerInterval);
        catchScore = 0;
        catchScoreDisplay.textContent = catchScore;
        catchWinPopup.classList.remove('show');
        isCatchGameActive = false;
        btnStartCatch.style.display = 'inline-block';
        
        // Clear all falling star elements
        const oldStars = catchGameArea.querySelectorAll('.falling-star');
        oldStars.forEach(s => s.remove());
    }

    function startCatchGame() {
        resetCatchGame();
        isCatchGameActive = true;
        btnStartCatch.style.display = 'none';

        // Spawn stars every 850ms
        catchSpawnerInterval = setInterval(spawnFallingStar, 850);
    }

    function spawnFallingStar() {
        if (!isCatchGameActive) return;

        const star = document.createElement('button');
        star.classList.add('falling-star');
        
        const starSymbols = ['⭐', '✨', '🌟', '💫'];
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        
        // Random horizontal positioning
        const maxLeft = catchGameArea.clientWidth - 45;
        const randomLeft = Math.max(10, Math.random() * maxLeft);
        star.style.left = `${randomLeft}px`;
        star.style.top = '0px';

        // Event listener for click/tap
        star.addEventListener('click', (e) => {
            if (!isCatchGameActive) return;
            e.stopPropagation(); // Avoid triggering page click effects
            
            catchScore++;
            catchScoreDisplay.textContent = catchScore;
            
            // Sparkle explosion at click position
            if (addSparklesExternal) {
                const rect = star.getBoundingClientRect();
                addSparklesExternal(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
            }

            // High pitched chime
            playChime(1567.98, audioCtx.currentTime, 0.3); // G6 note
            star.remove();

            // Win condition
            if (catchScore >= 10) {
                winCatchGame();
            }
        });

        // Clean up when animation ends
        star.addEventListener('animationend', () => {
            star.remove();
        });

        catchGameArea.appendChild(star);
    }

    function winCatchGame() {
        isCatchGameActive = false;
        clearInterval(catchSpawnerInterval);
        
        // Clear remaining stars
        const stars = catchGameArea.querySelectorAll('.falling-star');
        stars.forEach(s => s.remove());

        // Victory effects
        playVictoryChime();
        if (triggerWinConfetti) {
            triggerWinConfetti();
            setTimeout(triggerWinConfetti, 500);
        }

        catchWinPopup.classList.add('show');
        
        if (isNarrationActive) {
            synth.cancel();
            const speech = new SpeechSynthesisUtterance(currentStory.game7.winDesc);
            speech.lang = 'pt-BR';
            synth.speak(speech);
        }
    }

    btnStartCatch.addEventListener('click', startCatchGame);
    btnResetCatch.addEventListener('click', startCatchGame);


    // ----------------------------------------------------
    // 10. GAME 3: Trivia Quiz Game Logic (Page 8)
    // ----------------------------------------------------
    let quizQuestions = [...STORIES_DATA.alice.quiz];

    let currentQuestionIndex = 0;

    function initQuizGame() {
        quizQuestions = currentStory.quiz;
        currentQuestionIndex = 0;
        quizWinPopup.classList.remove('show');
        quizContainer.style.display = 'flex';
        renderQuizQuestion();
    }

    function renderQuizQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            winQuizGame();
            return;
        }

        // Update progress
        quizProgress.textContent = currentQuestionIndex + 1;
        const currentData = quizQuestions[currentQuestionIndex];

        quizQuestion.textContent = currentData.q;
        quizChoices.innerHTML = '';

        currentData.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.classList.add('choice-btn');
            btn.textContent = choice;
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Disable all choices immediately
                const buttons = quizChoices.querySelectorAll('.choice-btn');
                buttons.forEach(b => b.disabled = true);

                if (index === currentData.correct) {
                    btn.classList.add('correct');
                    playChime(1046.50, audioCtx.currentTime, 0.4); // Success high chime
                    
                    // Sparkles on the button
                    if (addSparklesExternal) {
                        const rect = btn.getBoundingClientRect();
                        addSparklesExternal(rect.left + rect.width/2, rect.top + rect.height/2, 10);
                    }

                    // Advance to next question after 1s
                    setTimeout(() => {
                        currentQuestionIndex++;
                        renderQuizQuestion();
                    }, 1100);
                } else {
                    btn.classList.add('incorrect');
                    playChime(349.23, audioCtx.currentTime, 0.4); // Error tone
                    
                    // Re-enable other options after 1s
                    setTimeout(() => {
                        buttons.forEach(b => {
                            if (!b.classList.contains('incorrect')) b.disabled = false;
                        });
                    }, 1000);
                }
            });

            quizChoices.appendChild(btn);
        });
    }

    function winQuizGame() {
        quizContainer.style.display = 'none';
        quizWinPopup.classList.add('show');
        
        playVictoryChime();
        if (triggerWinConfetti) {
            triggerWinConfetti();
            setTimeout(triggerWinConfetti, 500);
        }

        if (isNarrationActive) {
            synth.cancel();
            const speech = new SpeechSynthesisUtterance("Parabéns! " + currentStory.game8.winDesc);
            speech.lang = 'pt-BR';
            synth.speak(speech);
        }
    }

    btnResetQuiz.addEventListener('click', initQuizGame);


    // ----------------------------------------------------
    // 11. Page Navigation Logic (Unified Page Changes)
    // ----------------------------------------------------
    function updateHeaderAuthorTag() {
        if (!authorTagDiv) return;
        if (currentPageIndex === 9) {
            const childName = localStorage.getItem(`${currentStoryId}_diary_author`) || '';
            if (childName.trim()) {
                authorTagDiv.innerHTML = `Agora escrito por: <span>${childName}</span>`;
            } else {
                authorTagDiv.innerHTML = `Agora escrito por: <span>Você</span>`;
            }
        } else {
            authorTagDiv.innerHTML = `Escrito por: <span>${currentStory.author}</span>`;
        }
    }

    function updateNavigationUI() {
        btnPrev.disabled = (currentSequenceIndex === 0);
        btnNext.disabled = (currentSequenceIndex === currentStory.pagesSequence.length - 1);
        
        if (currentPageIndex === 0) {
            pageNumDisplay.textContent = "Capa";
        } else if (currentPageIndex === 6) {
            pageNumDisplay.textContent = currentStory.game6 ? currentStory.game6.title : "Jogo 1";
        } else if (currentPageIndex === 7) {
            pageNumDisplay.textContent = currentStory.game7 ? currentStory.game7.title : "Jogo 2";
        } else if (currentPageIndex === 8) {
            pageNumDisplay.textContent = currentStory.game8 ? currentStory.game8.title : "Jogo 3";
        } else if (currentPageIndex === 9) {
            pageNumDisplay.textContent = currentStory.diary ? currentStory.diary.title : "Diário";
        } else {
            pageNumDisplay.textContent = `Página ${currentPageIndex} de 5`;
        }
        
        starsSteps.forEach((star) => {
            const targetIndex = parseInt(star.getAttribute('data-target'), 10);
            if (currentStory.pagesSequence.includes(targetIndex)) {
                star.style.display = 'flex';
                if (targetIndex === currentPageIndex) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            } else {
                star.style.display = 'none';
            }
        });

        // Hide/show navigation arrows and footer for standalone diary
        if (currentStoryId === 'diary') {
            appFooter.classList.add('hidden');
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        } else {
            appFooter.classList.remove('hidden');
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        }

        updateHeaderAuthorTag();
    }

    function goToPage(targetIndex, direction = 'next') {
        if (targetIndex < 0 || targetIndex >= pages.length || targetIndex === currentPageIndex) return;
        if (!currentStory.pagesSequence.includes(targetIndex)) return;

        const currentOutPage = document.getElementById(`page-${currentPageIndex}`);
        const targetInPage = document.getElementById(`page-${targetIndex}`);

        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        playPageTurnSound();

        // Apply slide transition
        if (direction === 'next') {
            currentOutPage.classList.add('slide-out-left');
        } else {
            currentOutPage.classList.add('slide-out-right');
        }
        currentOutPage.classList.remove('active');

        targetInPage.classList.remove('slide-out-left', 'slide-out-right');
        targetInPage.classList.add('active');

        setTimeout(() => {
            currentOutPage.classList.remove('slide-out-left', 'slide-out-right');
        }, 600);

        currentPageIndex = targetIndex;
        currentSequenceIndex = currentStory.pagesSequence.indexOf(targetIndex);
        updateNavigationUI();
        
        // Trigger magical word reveal
        triggerTextReveal(currentPageIndex);

        // Reset/init respective game pages
        resetCatchGame();

        if (currentPageIndex === 6) {
            initMemoryGame();
        } else if (currentPageIndex === 8) {
            initQuizGame();
        } else if (currentPageIndex === 9) {
            initDiaryPage();
        }

        // Handle speech narration
        if (isNarrationActive) {
            speechTimeout = setTimeout(() => {
                speakPage(currentPageIndex);
            }, 500);
        }
    }

    // Navigation Listeners
    btnPrev.addEventListener('click', () => {
        if (currentSequenceIndex > 0) {
            goToPage(currentStory.pagesSequence[currentSequenceIndex - 1], 'prev');
        }
    });
    btnNext.addEventListener('click', () => {
        if (currentSequenceIndex < currentStory.pagesSequence.length - 1) {
            goToPage(currentStory.pagesSequence[currentSequenceIndex + 1], 'next');
        }
    });
    btnStart.addEventListener('click', () => {
        if (currentStory.pagesSequence.length > 1) {
            goToPage(currentStory.pagesSequence[1], 'next');
        }
    });

    starsSteps.forEach(star => {
        star.addEventListener('click', () => {
            const targetIndex = parseInt(star.getAttribute('data-target'), 10);
            if (currentStory.pagesSequence.includes(targetIndex)) {
                const targetSeqIndex = currentStory.pagesSequence.indexOf(targetIndex);
                const direction = targetSeqIndex > currentSequenceIndex ? 'next' : 'prev';
                goToPage(targetIndex, direction);
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentSequenceIndex < currentStory.pagesSequence.length - 1) {
                goToPage(currentStory.pagesSequence[currentSequenceIndex + 1], 'next');
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSequenceIndex > 0) {
                goToPage(currentStory.pagesSequence[currentSequenceIndex - 1], 'prev');
            }
        }
    });

    // Mobile Swipe gestures
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
            if (diff < 0 && currentSequenceIndex < currentStory.pagesSequence.length - 1) {
                goToPage(currentStory.pagesSequence[currentSequenceIndex + 1], 'next');
            } else if (diff > 0 && currentSequenceIndex > 0) {
                goToPage(currentStory.pagesSequence[currentSequenceIndex - 1], 'prev');
            }
        }
    }

    // ----------------------------------------------------
    // 12. MEU DIÁRIO: IndexedDB & Infinite Pagination (Page 9)
    // ----------------------------------------------------
    let diaryDb = null;
    let diaryCurrentPage = 1;
    let autoSaveTimeout = null;

    // DOM Elements for Diary
    const btnOpenDiary = document.getElementById('btn-open-diary');
    const btnCloseDiary = document.getElementById('btn-close-diary');
    const diaryCoverView = document.getElementById('diary-cover-view');
    const diaryWriteView = document.getElementById('diary-write-view');
    const diaryCurrentPageSpan = document.getElementById('diary-current-page');
    const diaryDateInput = document.getElementById('diary-date');
    const diaryTextarea = document.getElementById('diary-textarea');
    const btnDiaryPrev = document.getElementById('btn-diary-prev');
    const btnDiaryNext = document.getElementById('btn-diary-next');
    const diaryAuthorInput = document.getElementById('diary-author');

    // Initialize IndexedDB
    function initDiaryDatabase() {
        if (diaryDb) return;
        const request = indexedDB.open('AliceDiaryDB', 2);

        request.onerror = function(event) {
            console.error("IndexedDB error: ", event.target.errorCode);
        };

        request.onsuccess = function(event) {
            diaryDb = event.target.result;
            loadDiaryPage(diaryCurrentPage);
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('diary_pages_v2')) {
                db.createObjectStore('diary_pages_v2', { keyPath: 'storyPageKey' });
            }
        };
    }

    function initDiaryPage() {
        // Show cover view by default when returning to this page index
        diaryCoverView.style.display = 'flex';
        diaryWriteView.style.display = 'none';
        
        // Reset page counter to 1 when returning
        diaryCurrentPage = 1;
        
        // Load author name from localStorage
        const childName = localStorage.getItem(`${currentStoryId}_diary_author`) || '';
        if (diaryAuthorInput) diaryAuthorInput.value = childName;
        updateHeaderAuthorTag();
        
        if (diaryDb) {
            loadDiaryPage(diaryCurrentPage);
        } else {
            initDiaryDatabase();
        }
    }

    function loadDiaryPage(pageNo) {
        if (!diaryDb) return;
        
        diaryCurrentPageSpan.textContent = pageNo;
        btnDiaryPrev.disabled = (pageNo === 1);

        const storyPageKey = `${currentStoryId}_${pageNo}`;
        const transaction = diaryDb.transaction(['diary_pages_v2'], 'readonly');
        const store = transaction.objectStore('diary_pages_v2');
        const request = store.get(storyPageKey);

        request.onsuccess = function(event) {
            const data = event.target.result;
            if (data) {
                diaryDateInput.value = data.date;
                diaryTextarea.value = data.content;
            } else {
                const today = new Date().toISOString().split('T')[0];
                diaryDateInput.value = today;
                
                // Page 1 defaults to starting with "Era uma vez... "
                const defaultContent = (pageNo === 1) ? "Era uma vez... " : "";
                diaryTextarea.value = defaultContent;
                saveDiaryPage(pageNo, today, defaultContent);
            }
        };
    }

    function saveDiaryPage(pageNo, date, content) {
        if (!diaryDb) return;

        const storyPageKey = `${currentStoryId}_${pageNo}`;
        const transaction = diaryDb.transaction(['diary_pages_v2'], 'readwrite');
        const store = transaction.objectStore('diary_pages_v2');
        
        const data = {
            storyPageKey: storyPageKey,
            pageNumber: pageNo,
            date: date,
            content: content
        };

        const request = store.put(data);
        request.onerror = function(event) {
            console.error("Save error: ", event.target.errorCode);
        };
    }

    function triggerAutoSave() {
        if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
        
        autoSaveTimeout = setTimeout(() => {
            const date = diaryDateInput.value;
            const content = diaryTextarea.value;
            saveDiaryPage(diaryCurrentPage, date, content);
            
            // Visual save confirmation (small flash or sparkles)
            if (addSparklesExternal) {
                const rect = diaryCurrentPageSpan.getBoundingClientRect();
                addSparklesExternal(rect.left + rect.width/2, rect.top, 3);
            }
        }, 600); 
    }

    // Bind diary inputs
    diaryTextarea.addEventListener('input', triggerAutoSave);
    diaryDateInput.addEventListener('change', triggerAutoSave);
    if (diaryAuthorInput) {
        diaryAuthorInput.addEventListener('input', () => {
            localStorage.setItem(`${currentStoryId}_diary_author`, diaryAuthorInput.value);
            updateHeaderAuthorTag();
        });
    }

    // Bind Diary Cover Opening/Closing
    btnOpenDiary.addEventListener('click', (e) => {
        e.stopPropagation();
        diaryCoverView.style.display = 'none';
        diaryWriteView.style.display = 'flex';
        loadDiaryPage(diaryCurrentPage);
        playClickChime();
    });

    btnCloseDiary.addEventListener('click', (e) => {
        e.stopPropagation();
        diaryCoverView.style.display = 'flex';
        diaryWriteView.style.display = 'none';
        playClickChime();
    });

    // Bind Diary Page Navigations
    btnDiaryPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (diaryCurrentPage > 1) {
            saveDiaryPage(diaryCurrentPage, diaryDateInput.value, diaryTextarea.value);
            diaryCurrentPage--;
            loadDiaryPage(diaryCurrentPage);
            playPageTurnSound();
        }
    });

    btnDiaryNext.addEventListener('click', (e) => {
        e.stopPropagation();
        saveDiaryPage(diaryCurrentPage, diaryDateInput.value, diaryTextarea.value);
        diaryCurrentPage++;
        loadDiaryPage(diaryCurrentPage);
        playPageTurnSound();
    });

    // ----------------------------------------------------
    // 14. Initializations
    // ----------------------------------------------------
    initParticles();
    initCustomCursor();
    initMagicCanvas();
    initMagicText();
    init3DTilt();
    updateNavigationUI();
    
    triggerTextReveal(0);
});
