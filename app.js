/* ----------------------------------------------------
   Portal de Histórias Mágicas - Logic & Interactive Engine
---------------------------------------------------- */

// 1. Stories Database Definition
const STORIES_DATA = {
    alice: {
        id: "alice",
        title: "O Brilho<br><span class=\"highlight\">de Alice</span>",
        subtitle: "O Sonho de uma Estrela",
        author: "Ana Carla Saraiva Piquet",
        coverImg: "assets/capa.png?v=5",
        coverAlt: "Alice olhando sorridente para o céu estrelado",
        memoryIcons: ['🐱', '🐦', '🐵', '⭐', '🎭', '👑'],
        catchTheme: {
            type: "stars",
            symbols: ['⭐', '✨', '🌟', '💫']
        },
        quiz: [
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
        ],
        pages: [
            {
                title: "A Menina dos Olhos de Esmeralda",
                ornament: "✿ 🌟 ✿",
                text: "Era uma vez uma garotinha chamada Alice. Ela era alegre, gentil e muito carismática, com lindos olhos verdes que brilhavam como esmeraldas. Mas Alice tinha um sonho que brilhava ainda mais forte: ela queria ser uma grande estrela de atuação!",
                image: "assets/pagina1.png?v=5",
                imageAlt: "Alice sorrindo no seu quarto decorado com estrelas e teatro",
                dropcap: "E"
            },
            {
                title: "O Show dos Bichinhos",
                ornament: "✿ 🐾 ✿",
                text: "Para treinar seu talento, Alice adorava imitar vários bichinhos. Ela fazia o miado dengoso de um gatinho fofo, o voar saltitante de um passarinho e até as caretas engraçadas de um macaquinho sapeca. Onde Alice estava, a diversão era garantida!",
                image: "assets/pagina2.png?v=5",
                imageAlt: "Alice imitando um gatinho fofo no quintal",
                dropcap: "P"
            },
            {
                title: "A Força da Coragem",
                ornament: "✿ 🎭 ✿",
                text: "Um dia, surgiu o teste para uma grande peça de teatro. Alice sentiu um frio na barriga e as pernas tremerem de medo. Mas ela lembrou que a verdadeira coragem não é não sentir medo, mas sim respirar fundo e seguir em frente com o coração valente! Ela subiu ao palco, brilhou e passou no teste!",
                image: "assets/pagina3.png?v=5",
                imageAlt: "Alice brilhando sob a luz de um holofote no teste de teatro",
                dropcap: "U"
            },
            {
                title: "O Brilho da União",
                ornament: "✿ 🤝 ✿",
                text: "No teatro, Alice aprendeu uma lição mágica: nenhuma estrela brilha sozinha no céu! Para o show ser um sucesso, ela precisava ouvir e apoiar seus colegas. Ela ensinou a todos que quando trabalhamos em equipe e cooperamos, o nosso brilho se junta e faz a peça inteira brilhar muito mais!",
                image: "assets/pagina4.png?v=5",
                imageAlt: "Alice atuando no palco de mãos dadas com outras crianças felizes",
                dropcap: "N"
            },
            {
                title: "O Brilho que se Compartilha",
                ornament: "✿ ✨ ✿",
                text: "Vinte anos se passaram. Alice virou uma grande estrela internacional. Mas a lição mais linda que ela ensina é a generosidade: ela ajuda crianças carentes a estudarem teatro. Alice provou que o maior sucesso é usar a nossa luz para acender o brilho de outras pessoas!",
                image: "assets/pagina5.png?v=5",
                imageAlt: "Alice adulta elegante no tapete vermelho espalhando brilho e sorrisos",
                dropcap: "V"
            }
        ],
        game6: {
            title: "Jogo das Estrelas",
            ornament: "✿ 🎮 ✿",
            instructions: "Encontre os pares para abrir o baú de estrelas da Alice!",
            image: "assets/pagina6.png?v=5",
            imageAlt: "Um baú de tesouro mágico aberto soltando brilho de estrelas",
            winMsg: "🌟 Você é uma Estrela! 🌟",
            winDesc: "Parabéns! Você liberou todas as estrelas do baú da Alice e fez o mundo brilhar!"
        },
        game7: {
            title: "Chuva de Estrelas",
            ornament: "✿ 🌟 ✿",
            instructions: "Ajude a Alice a coletar as estrelas mágicas do céu! Toque nelas rápido!",
            image: "assets/pagina7.png?v=5",
            imageAlt: "Alice pegando estrelas cadentes",
            winMsg: "🌟 Céu Iluminado! 🌟",
            winDesc: "Parabéns! Você coletou 10 estrelas brilhantes e ajudou Alice a iluminar o céu!"
        },
        game8: {
            title: "Teste da Estrela",
            ornament: "✿ 📖 ✿",
            instructions: "Responda às perguntas sobre as lindas lições da história!",
            image: "assets/pagina8.png?v=5",
            imageAlt: "Coruja sábia com livro mágico",
            winMsg: "🌟 Coração de Ouro! 🌟",
            winDesc: "Você provou que aprendeu todas as lições da Alice sobre coragem, união e generosidade!"
        },
        diary: {
            title: "Meu Diário",
            subtitle: "Escreva a sua história",
            coverImage: "assets/pagina10.png?v=8",
            coverAlt: "Diário mágico fechado com estrelas e chaves"
        }
    },
    mermaid_unicorn: {
        id: "mermaid_unicorn",
        title: "A Sereia<br><span class=\"highlight\">e o Unicórnio</span>",
        subtitle: "O Brilho da Amizade",
        author: "Ana Carla Saraiva Piquet",
        coverImg: "assets/sereia_unicornio_capa.png?v=1",
        coverAlt: "Serena a sereia e Paco o unicórnio sob um arco-íris mágico à beira-mar",
        memoryIcons: ['🧜‍♀️', '🦄', '🐚', '🐬', '🌈', '✨'],
        catchTheme: {
            type: "bubbles",
            symbols: ['🫧', '🐚', '✨', '💎']
        },
        quiz: [
            {
                q: "O que Serena e Paco sonhavam fazer antes de se conhecerem?",
                choices: ["🏝️ Viajar para uma ilha deserta", "🌍 Conhecer e explorar o mundo um do outro", "😴 Dormir o dia inteiro na praia"],
                correct: 1
            },
            {
                q: "O que eles fizeram quando a grande tempestade chegou?",
                choices: ["🏃 Correram para caminhos opostos", "⛺ Ficaram tristes e choraram", "🤝 Tiveram coragem e se protegeram juntos numa caverna"],
                correct: 2
            },
            {
                q: "Como Serena e Paco ajudaram a limpar e salvar a praia e a floresta?",
                choices: ["🥇 Trabalhando juntos em equipe com magia e natação", "🤫 Esperando que outros animais fizessem tudo", "🧹 Usando vassouras mágicas gigantes"],
                correct: 0
            }
        ],
        pages: [
            {
                title: "Dois Mundos Diferentes",
                ornament: "✿ 🧜‍♀️ ✿",
                text: "Nas águas cristalinas do mar azul, vivia Serena, uma sereia com uma voz doce que acalmava as ondas. Na floresta logo ao lado, vivia Paco, um unicórnio com uma crina de arco-íris e um chifre brilhante. Embora vivessem perto, Serena não sabia nadar na terra, e Paco não sabia andar na água. Mas ambos olhavam para o horizonte, sonhando em conhecer o mundo um do outro.",
                image: "assets/sereia_pagina1.png?v=1",
                imageAlt: "Serena a sereia na água e Paco o unicórnio na praia olhando um para o outro",
                dropcap: "N"
            },
            {
                title: "O Encontro Mágico",
                ornament: "✿ 🤝 ✿",
                text: "Um dia, eles se encontraram na areia, onde as ondas beijavam as raízes das árvores. Serena cantou uma linda melodia e Paco respondeu fazendo flores brilharem com seu chifre. Eles perceberam que, mesmo sendo de mundos tão diferentes, a curiosidade e o respeito os uniam. Dali em diante, todos os finais de tarde eram para compartilhar histórias e sorrisos.",
                image: "assets/sereia_pagina2.png?v=1",
                imageAlt: "Serena conversando alegremente com Paco na beira da praia",
                dropcap: "U"
            },
            {
                title: "A Tempestade e a Coragem",
                ornament: "✿ ⚡ ✿",
                text: "Uma tarde, nuvens escuras cobriram o céu e uma grande tempestade começou. O vento uivava forte e as ondas assustavam. Sentindo medo, Serena e Paco sabiam que precisavam de coragem. Paco guiou Serena até uma caverna segura na rocha e, juntos, cantaram e brilharam, vencendo a escuridão e o medo com o calor de sua amizade.",
                image: "assets/sereia_pagina3.png?v=1",
                imageAlt: "Serena e Paco abrigados dentro de uma caverna brilhante durante a tempestade",
                dropcap: "U"
            },
            {
                title: "A Força da União",
                ornament: "✿ 🐚 ✿",
                text: "No dia seguinte, a praia estava cheia de estrelas-do-mar presas na areia, e a floresta cheia de algas trazidas pelo vento. Serena e Paco sabiam que só venceriam aquilo juntos. Paco usou seu chifre para levitar as estrelas-do-mar de volta ao mar, e Serena nadou rápido trazendo frutas da floresta que caíram na água de volta para a terra. Cooperando, eles limparam seus lares!",
                image: "assets/sereia_pagina4.png?v=1",
                imageAlt: "Serena e Paco trabalhando em equipe para salvar as estrelas-do-mar e frutas",
                dropcap: "N"
            },
            {
                title: "O Brilho da Amizade",
                ornament: "✿ 🌈 ✿",
                text: "Com o esforço de ambos, um lindo arco-íris se formou unindo o mar e a floresta. Serena e Paco provaram que a amizade ultrapassa qualquer barreira e que a generosidade espalha alegria por onde passa. Eles ensinaram a todos os animais que quando juntamos nossas diferenças com amor, criamos a magia mais linda do mundo!",
                image: "assets/sereia_pagina5.png?v=1",
                imageAlt: "Serena e Paco felizes comemorando sob o arco-íris cercados por outros animais",
                dropcap: "C"
            }
        ],
        game6: {
            title: "Jogo da Amizade",
            ornament: "✿ 🎮 ✿",
            instructions: "Encontre os pares para abrir o baú de conchas da Serena!",
            image: "assets/sereia_pagina6.png?v=1",
            imageAlt: "Um baú de conchas mágicas e pérolas brilhando à beira-mar",
            winMsg: "🌟 Magia Completa! 🌟",
            winDesc: "Parabéns! Você liberou todas as conchas mágicas e espalhou a amizade pelo oceano!"
        },
        game7: {
            title: "Bolhas Mágicas",
            ornament: "✿ 🫧 ✿",
            instructions: "Ajude Serena a pegar as bolhas de sabão e conchas mágicas! Toque nelas rápido!",
            image: "assets/sereia_pagina7.png?v=1",
            imageAlt: "Serena pegando bolhas coloridas no fundo do mar",
            winMsg: "🌟 Oceano Brilhante! 🌟",
            winDesc: "Parabéns! Você coletou 10 bolhas mágicas e deixou o fundo do mar cheio de cor!"
        },
        game8: {
            title: "Teste da Amizade",
            ornament: "✿ 📖 ✿",
            instructions: "Responda às perguntas sobre as lindas lições da história da Serena e do Paco!",
            image: "assets/sereia_pagina8.png?v=1",
            imageAlt: "Uma tartaruga marinha sábia sorrindo com um mapa antigo",
            winMsg: "🌟 Amigo de Verdade! 🌟",
            winDesc: "Você provou que aprendeu todas as lições da Serena e do Paco sobre coragem, união e amizade!"
        },
        diary: {
            title: "Diário da Amizade",
            subtitle: "Escreva a sua história",
            coverImage: "assets/sereia_pagina10.png?v=1",
            coverAlt: "Diário mágico em formato de concha com pérolas e estrelas"
        }
    }
};

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
        document.getElementById('cover-title').innerHTML = currentStory.title;
        document.getElementById('cover-subtitle').textContent = currentStory.subtitle;
        
        const coverImgEl = document.getElementById('cover-img');
        coverImgEl.src = currentStory.coverImg;
        coverImgEl.alt = currentStory.coverAlt;

        document.getElementById('cover-author').textContent = `Escritora: ${currentStory.author}`;

        // 2. Update page navigation autor tag
        updateHeaderAuthorTag();

        // 3. Update story pages 1 to 5
        for (let i = 1; i <= 5; i++) {
            const pageData = currentStory.pages[i - 1];
            const pageEl = document.getElementById(`page-${i}`);
            if (pageEl && pageData) {
                // Update title
                pageEl.querySelector('.page-title').textContent = pageData.title;
                // Update ornament
                pageEl.querySelector('.ornament').textContent = pageData.ornament;
                // Update image
                const imgEl = pageEl.querySelector('.page-img');
                imgEl.src = pageData.image;
                imgEl.alt = pageData.imageAlt;
                // Update text with dropcap
                const textEl = pageEl.querySelector('.story-text');
                textEl.innerHTML = `<span class="dropcap">${pageData.dropcap}</span>${pageData.text.substring(pageData.dropcap.length)}`;
            }
        }

        // 4. Update Game 1 (Memory Game) UI elements
        const page6El = document.getElementById('page-6');
        page6El.querySelector('.page-title').textContent = currentStory.game6.title;
        page6El.querySelector('.ornament').textContent = currentStory.game6.ornament;
        page6El.querySelector('.page-img').src = currentStory.game6.image;
        page6El.querySelector('.page-img').alt = currentStory.game6.imageAlt;
        page6El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game6.title;
        page6El.querySelector('.game-instructions-overlay p').textContent = currentStory.game6.instructions;
        
        const win6Popup = document.getElementById('game-win-popup');
        win6Popup.querySelector('h3').textContent = currentStory.game6.winMsg;
        win6Popup.querySelector('p').textContent = currentStory.game6.winDesc;

        // 5. Update Game 2 (Catch Game) UI elements
        const page7El = document.getElementById('page-7');
        page7El.querySelector('.page-title').textContent = currentStory.game7.title;
        page7El.querySelector('.ornament').textContent = currentStory.game7.ornament;
        page7El.querySelector('.page-img').src = currentStory.game7.image;
        page7El.querySelector('.page-img').alt = currentStory.game7.imageAlt;
        page7El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game7.title;
        page7El.querySelector('.game-instructions-overlay p').textContent = currentStory.game7.instructions;
        
        const win7Popup = document.getElementById('catch-win-popup');
        win7Popup.querySelector('h3').textContent = currentStory.game7.winMsg;
        win7Popup.querySelector('p').textContent = currentStory.game7.winDesc;

        // 6. Update Game 3 (Quiz Game) UI elements
        const page8El = document.getElementById('page-8');
        page8El.querySelector('.page-title').textContent = currentStory.game8.title;
        page8El.querySelector('.ornament').textContent = currentStory.game8.ornament;
        page8El.querySelector('.page-img').src = currentStory.game8.image;
        page8El.querySelector('.page-img').alt = currentStory.game8.imageAlt;
        page8El.querySelector('.game-instructions-overlay h4').textContent = currentStory.game8.title;
        page8El.querySelector('.game-instructions-overlay p').textContent = currentStory.game8.instructions;
        
        const win8Popup = document.getElementById('quiz-win-popup');
        win8Popup.querySelector('h3').textContent = currentStory.game8.winMsg;
        win8Popup.querySelector('p').textContent = currentStory.game8.winDesc;

        // 7. Update Page 9 (Diary)
        const page9El = document.getElementById('page-9');
        page9El.querySelector('.diary-title').innerHTML = currentStory.diary.title;
        page9El.querySelector('.diary-subtitle').textContent = currentStory.diary.subtitle;
        
        const diaryCoverImgEl = page9El.querySelector('.diary-cover-img');
        diaryCoverImgEl.src = currentStory.diary.coverImage;
        diaryCoverImgEl.alt = currentStory.diary.coverAlt;

        // Update steps labels in footer dynamically
        const steps = document.querySelectorAll('.star-step');
        if (steps.length >= 10) {
            steps[6].querySelector('.label').textContent = currentStoryId === 'alice' ? 'Memória' : 'Amizade';
            steps[7].querySelector('.label').textContent = currentStoryId === 'alice' ? 'Estrelas' : 'Bolhas';
            steps[8].querySelector('.label').textContent = currentStoryId === 'alice' ? 'Quiz' : 'Perguntas';
            steps[9].querySelector('.label').textContent = currentStoryId === 'alice' ? 'Diário' : 'Meu Diário';
        }

        // Reset memory cardIcons and quizQuestions to current active story
        cardIcons = currentStory.memoryIcons;
        gameCardsDeck = [...cardIcons, ...cardIcons];
        quizQuestions = currentStory.quiz;

        // Reset page variables & navigation state
        currentPageIndex = 0;
        
        // Remove active class from all pages and add to page-0
        pages.forEach(p => p.classList.remove('active', 'slide-out-left', 'slide-out-right'));
        document.getElementById('page-0').classList.add('active');

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
        btnPrev.disabled = (currentPageIndex === 0);
        btnNext.disabled = (currentPageIndex === pages.length - 1);
        
        if (currentPageIndex === 0) {
            pageNumDisplay.textContent = "Capa";
        } else if (currentPageIndex === 6) {
            pageNumDisplay.textContent = currentStory.game6.title;
        } else if (currentPageIndex === 7) {
            pageNumDisplay.textContent = currentStory.game7.title;
        } else if (currentPageIndex === 8) {
            pageNumDisplay.textContent = currentStory.game8.title;
        } else if (currentPageIndex === 9) {
            pageNumDisplay.textContent = currentStory.diary.title;
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

        updateHeaderAuthorTag();
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
