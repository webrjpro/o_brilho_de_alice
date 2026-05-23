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

    // Canvas Sparkles API
    let addSparklesExternal = null;
    let triggerWinConfetti = null;

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
            return "O Brilho de Alice: O Sonho de uma Estrela. Escrito por Ana Carla Saraiva Piquet.";
        }
        if (pageIndex === 6) {
            return "Jogo das Estrelas! Encontre os pares no jogo da memória para liberar todas as estrelas do baú da Alice e fazer o mundo brilhar!";
        }
        if (pageIndex === 7) {
            return "Chuva de Estrelas! Ajude a Alice a pegar dez estrelas cadentes que estão caindo do céu mágico!";
        }
        if (pageIndex === 8) {
            return "Teste da Estrela! Responda às três perguntas para mostrar que você aprendeu todas as lições da Alice!";
        }
        if (pageIndex === 9) {
            return "Meu Diário! Escreva a sua própria história e guarde as suas memórias mágicas aqui.";
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
    const cardIcons = ['🐱', '🐦', '🐵', '⭐', '🎭', '👑'];
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
            const speech = new SpeechSynthesisUtterance("Parabéns! Você coletou 10 estrelas brilhantes e ajudou Alice a iluminar o céu!");
            speech.lang = 'pt-BR';
            synth.speak(speech);
        }
    }

    btnStartCatch.addEventListener('click', startCatchGame);
    btnResetCatch.addEventListener('click', startCatchGame);


    // ----------------------------------------------------
    // 10. GAME 3: Trivia Quiz Game Logic (Page 8)
    // ----------------------------------------------------
    const quizQuestions = [
        {
            q: "O que a Alice mais gostava de imitar para treinar sua atuação?",
            choices: ["🐱 Animais fofos do quintal", "🚗 Carros de corrida velozes", "🤖 Robôs gigantes de lata"],
            correct: 0
        },
        {
            q: "O que a Alice aprendeu sobre a verdadeira coragem?",
            choices: ["🏃 Que devemos fugir correndo do perigo", "💪 Que é respirar fundo e seguir em frente", "😢 Que não podemos sentir medo"],
            correct: 1
        },
        {
            q: "No teatro, como as estrelas fazem o show ser lindo?",
            choices: ["🥇 Tentando brilhar e aparecer sozinha", "🤝 Cooperando e trabalhando em equipe", "🤫 Ficando quietinha sem ajudar ninguém"],
            correct: 1
        }
    ];

    let currentQuestionIndex = 0;

    function initQuizGame() {
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
            const speech = new SpeechSynthesisUtterance("Parabéns! Você provou que aprendeu todas as lições da Alice sobre coragem, união e generosidade!");
            speech.lang = 'pt-BR';
            synth.speak(speech);
        }
    }

    btnResetQuiz.addEventListener('click', initQuizGame);


    // ----------------------------------------------------
    // 11. Page Navigation Logic (Unified Page Changes)
    // ----------------------------------------------------
    function updateNavigationUI() {
        btnPrev.disabled = (currentPageIndex === 0);
        btnNext.disabled = (currentPageIndex === pages.length - 1);
        
        if (currentPageIndex === 0) {
            pageNumDisplay.textContent = "Capa";
        } else if (currentPageIndex === 6) {
            pageNumDisplay.textContent = "Jogo da Memória";
        } else if (currentPageIndex === 7) {
            pageNumDisplay.textContent = "Pegue as Estrelas";
        } else if (currentPageIndex === 8) {
            pageNumDisplay.textContent = "Quiz da Estrela";
        } else if (currentPageIndex === 9) {
            pageNumDisplay.textContent = "Meu Diário";
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

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (currentPageIndex < pages.length - 1) goToPage(currentPageIndex + 1, 'next');
        } else if (e.key === 'ArrowLeft') {
            if (currentPageIndex > 0) goToPage(currentPageIndex - 1, 'prev');
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
            if (diff < 0 && currentPageIndex < pages.length - 1) {
                goToPage(currentPageIndex + 1, 'next');
            } else if (diff > 0 && currentPageIndex > 0) {
                goToPage(currentPageIndex - 1, 'prev');
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

    // Initialize IndexedDB
    function initDiaryDatabase() {
        if (diaryDb) return;
        const request = indexedDB.open('AliceDiaryDB', 1);

        request.onerror = function(event) {
            console.error("IndexedDB error: ", event.target.errorCode);
        };

        request.onsuccess = function(event) {
            diaryDb = event.target.result;
            loadDiaryPage(diaryCurrentPage);
        };

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('diary_pages')) {
                db.createObjectStore('diary_pages', { keyPath: 'pageNumber' });
            }
        };
    }

    function initDiaryPage() {
        // Show cover view by default when returning to this page index
        diaryCoverView.style.display = 'flex';
        diaryWriteView.style.display = 'none';
        
        // Reset page counter to 1 when returning
        diaryCurrentPage = 1;
        
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

        const transaction = diaryDb.transaction(['diary_pages'], 'readonly');
        const store = transaction.objectStore('diary_pages');
        const request = store.get(pageNo);

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

        const transaction = diaryDb.transaction(['diary_pages'], 'readwrite');
        const store = transaction.objectStore('diary_pages');
        
        const data = {
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
