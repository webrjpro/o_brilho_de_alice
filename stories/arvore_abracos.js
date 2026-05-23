window.STORIES_DATA = window.STORIES_DATA || {};
window.STORIES_DATA.arvore_abracos = {
    id: "arvore_abracos",
    title: "A Árvore<br><span class=\"highlight\">dos Abraços</span>",
    subtitle: "O Valor da Família",
    author: "Ana Carla Saraiva Piquet",
    coverImg: "assets/familia_capa.png",
    coverAlt: "Tati ursinha abraçada com sua família perto de uma grande árvore",
    usePlaceholder: false,
    pagesSequence: [0, 1, 2, 3, 4, 5, 7, 8],
    memoryIcons: ['🐻', '🏠', '🌳', '❤️', '👵', '👨', '👩'],
    catchTheme: {
        type: "hearts",
        symbols: ['❤️', '💖', '💝', '🏠']
    },
    quiz: [
        {
            q: "O que aconteceu com a Tati durante o dia que a deixou triste?",
            choices: ["😢 Ela caiu, machucou o joelho e perdeu seu brinquedo", "🎒 Ela esqueceu a merenda na escola", "☔ Ela pegou chuva no parquinho"],
            correct: 0
        },
        {
            q: "O que a família de Tati fez quando ela chegou em casa chateada?",
            choices: ["🤫 Mandaram ela ficar em silêncio no quarto", "🤝 Acolheram com abraços, escutaram e a ajudaram a sorrir", "📺 Colocaram ela para assistir TV sozinha"],
            correct: 1
        },
        {
            q: "O que a Tati aprendeu sobre o valor de sua família?",
            choices: ["🥇 Que a família só serve para dar presentes", "🌳 Que a família é como uma árvore forte, que nos protege e acolhe sempre", "👪 Que não precisamos nos importar com ela"],
            correct: 1
        }
    ],
    pages: [
        {
            title: "Um Dia Muito Difícil",
            ornament: "✿ 🐻 ✿",
            text: "Tati era uma ursinha carinhosa e alegre. Mas aquele dia tinha sido cinzento. No parquinho, ela tropeçou e ralou o joelhinho. Para piorar, ela acabou perdendo seu ursinho de pelúcia favorito. Tati sentia um nó na garganta e lágrimas querendo cair.",
            image: "assets/familia_pagina1.png",
            imageAlt: "Ursinha Tati chorando triste sob uma nuvem de chuva",
            dropcap: "T"
        },
        {
            title: "O Regresso ao Lar",
            ornament: "✿ 🏠 ✿",
            text: "Caminhando de volta para casa, Tati achava que ninguém a entenderia. Mas assim que passou pela porta, o cheiro de bolo quentinho de sua mãe e o sorriso acolhedor de seu pai começaram a soprar a nuvem cinzenta para longe de seu peito.",
            image: "assets/familia_pagina2.png",
            imageAlt: "Tati entrando em casa e vendo seus pais sorrindo",
            dropcap: "C"
        },
        {
            title: "A Força dos Abraços",
            ornament: "✿ 👨‍👩‍👧‍👦 ✿",
            text: "Ao ver as lágrimas da filha, o pai se ajoelhou e abriu os braços. A mãe veio logo em seguida, e até seu irmãozinho se juntou. Todos formaram um abraço apertado e quentinho. Tati respirou fundo e sentiu que todo aquele medo e tristeza começavam a diminuir.",
            image: "assets/familia_pagina3.png",
            imageAlt: "Família de ursos em um abraço coletivo e afetuoso",
            dropcap: "A"
        },
        {
            title: "Raízes da Família",
            ornament: "✿ 🌳 ✿",
            text: "Mais tarde, no colo de sua avó, Tati ouviu uma história linda. A avó explicou que a família é como uma árvore gigante: as raízes são o amor que nos prende ao chão com segurança, e os galhos são os braços que nos protegem contra qualquer chuva ou tempestade.",
            image: "assets/familia_pagina4.png",
            imageAlt: "Avó ursinha contando história para Tati sob uma grande árvore",
            dropcap: "M"
        },
        {
            title: "O Porto Seguro",
            ornament: "✿ ❤️ ✿",
            text: "Com o joelho limpinho e um novo brinquedo feito de galhos e retalhos por seu irmão, Tati sorriu feliz. Ela entendeu que coisas ruins acontecem, mas ter uma família significa nunca ter que passar por elas sozinha. A família era o seu maior e mais valioso tesouro.",
            image: "assets/familia_pagina5.png",
            imageAlt: "Tati sorrindo feliz segurando um brinquedo com sua família",
            dropcap: "C"
        }
    ],
    game7: {
        title: "Abraços de Amor",
        ornament: "✿ ❤️ ✿",
        instructions: "Colete 10 corações de carinho da família da Tati!",
        image: "assets/familia_pagina7.png",
        imageAlt: "Corações caindo com fundo brilhoso",
        winMsg: "🌟 Lar Doce Lar! 🌟",
        winDesc: "Parabéns! Você coletou 10 corações de amor e protegeu o lar da Tati!"
    },
    game8: {
        title: "Teste do Carinho",
        ornament: "✿ 📖 ✿",
        instructions: "Responda às perguntas sobre união, respeito e amor familiar!",
        image: "assets/familia_pagina8.png",
        imageAlt: "Coruja sorrindo com diploma",
        winMsg: "🌟 Protetor do Lar! 🌟",
        winDesc: "Você provou que sabe valorizar e proteger o amor e a união da sua família!"
    }
};
