window.STORIES_DATA = window.STORIES_DATA || {};
window.STORIES_DATA.alice = {
    id: "alice",
    title: "O Brilho<br><span class=\"highlight\">de Alice</span>",
    subtitle: "O Sonho de uma Estrela",
    author: "Ana Carla Saraiva Piquet",
    coverImg: "assets/capa.png?v=5",
    coverAlt: "Alice olhando sorridente para o céu estrelado",
    pagesSequence: [0, 1, 2, 3, 4, 5, 6, 7, 8],
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
    }
};
