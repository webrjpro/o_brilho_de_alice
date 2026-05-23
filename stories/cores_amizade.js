window.STORIES_DATA = window.STORIES_DATA || {};
window.STORIES_DATA.cores_amizade = {
    id: "cores_amizade",
    title: "As Cores<br><span class=\"highlight\">da Amizade</span>",
    subtitle: "O Lindo Quadro do Mundo",
    author: "Ana Carla Saraiva Piquet",
    coverImg: "assets/cores_capa.png",
    coverAlt: "Crianças felizes de diferentes etnias pintando um arco-íris",
    pagesSequence: [0, 1, 2, 3, 4, 5, 6, 8],
    memoryIcons: ['🎨', '🌈', '🖌️', '❤️', '🤝', '✨'],
    catchTheme: {
        type: "colors",
        symbols: ['🔴', '🟡', '🔵', '🟢', '🎨']
    },
    quiz: [
        {
            q: "O que Marina e seus amigos descobriram que é melhor para pintar?",
            choices: ["🎨 Usar apenas uma cor favorita", "🌈 Misturar todas as cores para criar desenhos lindos", "🤫 Pintar sem nenhuma tinta"],
            correct: 1
        },
        {
            q: "Como a história compara a beleza das pessoas com as tintas?",
            choices: ["💪 Que todos devemos ser iguais em tudo", "🌟 Que a nossa variedade de cores e origens torna o mundo lindo", "😢 Que algumas cores são melhores que outras"],
            correct: 1
        },
        {
            q: "O que as crianças aprenderam sobre a cor de pele de cada um?",
            choices: ["🤝 Que todos somos iguais em valor e merecemos respeito e carinho", "🏃 Que devemos brincar separados", "🥇 Que apenas uma cor é especial"],
            correct: 0
        }
    ],
    pages: [
        {
            title: "A Paleta de Marina",
            ornament: "✿ 🎨 ✿",
            text: "Marina era uma menina que amava pintar o mundo. Em sua mesa, ela tinha dezenas de tintas: vermelho vivo, amarelo solar, azul profundo e muitos tons de marrom e bege. Marina sabia que cada cor contava uma parte diferente de sua pintura.",
            image: "assets/cores_pagina1.png",
            imageAlt: "Marina em seu ateliê pintando",
            dropcap: "M"
        },
        {
            title: "Um Desenho Compartilhado",
            ornament: "✿ 🤝 ✿",
            text: "Um dia, seus amigos da vizinhança vieram brincar. Havia Pedro, com seus cabelos cacheados e pele negra retinta; Sofia, com seus olhos claros; e Ravi, com sua pele dourada do sol. Marina propôs que todos pintassem um mural gigante juntos.",
            image: "assets/cores_pagina2.png",
            imageAlt: "Marina e seus amigos olhando o mural",
            dropcap: "U"
        },
        {
            title: "A Mistura das Cores",
            ornament: "✿ 🌈 ✿",
            text: "Enquanto pintavam, as crianças misturavam as tintas com as mãos. Pedro notou que o amarelo e o azul formavam um lindo verde, e o marrom se iluminava com um toque de bege. Marina sorriu e disse que a brincadeira ficava muito mais divertida quando todas as cores se encontravam.",
            image: "assets/cores_pagina3.png",
            imageAlt: "Crianças misturando as cores com as mãos",
            dropcap: "E"
        },
        {
            title: "A Lição do Painel",
            ornament: "✿ 🖌️ ✿",
            text: "Ao terminarem o painel, a vizinhança parou para admirar. Era um arco-íris gigante sustentado por dezenas de mãozinhas coloridas. Ravi observou que se tivessem usado apenas uma única cor, o mural não seria tão bonito. As diferenças de cada pincelada criavam um mosaico perfeito.",
            image: "assets/cores_pagina4.png",
            imageAlt: "Mural comunitário finalizado",
            dropcap: "A"
        },
        {
            title: "Todos Iguais no Coração",
            ornament: "✿ ❤️ ✿",
            text: "Marina e seus amigos se abraçaram diante da obra. Eles aprenderam que, assim como o painel, o mundo é maravilhoso porque cada pessoa tem sua própria cor de pele, origem e história. Mas, por dentro, na alegria e no amor, todos os corações batem com a mesma força e igualdade!",
            image: "assets/cores_pagina5.png",
            imageAlt: "Crianças se abraçando felizes",
            dropcap: "M"
        }
    ],
    game6: {
        title: "Jogo das Cores",
        ornament: "✿ 🎨 ✿",
        instructions: "Encontre os pares para abrir a paleta de cores da Marina!",
        image: "assets/cores_pagina6.png",
        imageAlt: "Uma paleta de cores e pincel",
        winMsg: "🌟 Quadro Perfeito! 🌟",
        winDesc: "Você liberou todas as cores do arco-íris da amizade e fez o mundo brilhar!"
    },
    game8: {
        title: "Teste da Igualdade",
        ornament: "✿ 📖 ✿",
        instructions: "Responda às perguntas sobre amizade, igualdade e respeito!",
        image: "assets/cores_pagina8.png",
        imageAlt: "Coruja inteligente mostrando o teste",
        winMsg: "🌟 Coração Sem Barreiras! 🌟",
        winDesc: "Você provou que entende o valor de todas as cores da amizade e da igualdade!"
    }
};
