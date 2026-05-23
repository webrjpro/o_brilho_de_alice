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

    // Terms Modal Elements
    const termsModal = document.getElementById('terms-modal');
    const btnTermsModal = document.getElementById('btn-terms-modal');
    const btnCloseTerms = document.getElementById('btn-close-terms');
    const btnCloseTermsTop = document.getElementById('btn-close-terms-top');
    const termsBody = document.getElementById('terms-modal-body');

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
    let currentLang = localStorage.getItem('magicBookLang') || 'pt';
    const UI_TRANSLATIONS = {
        pt: {
            libraryTitle: "Portal das <span class=\"highlight\">Histórias Mágicas</span>",
            librarySubtitle: "Escolha um livro infantil interativo para ler, ouvir e brincar!",
            btnMusic: "Música",
            btnNarration: "Narrar",
            btnBackToLibrary: "Biblioteca",
            btnOpenBook: "Abrir Livro",
            btnOpenDiary: "Abrir Diário",
            btnResetGame: "Recomeçar Jogo",
            btnWinReset: "Jogar de Novo",
            btnStartCatch: "Começar Chuva",
            diaryTitle: "Meu Diário",
            diarySubtitle: "Escreva a sua história",
            diaryAuthorLabel: "Agora escrito por:",
            diaryPlaceholder: "Escreva a sua história de hoje aqui...",
            diaryPrev: "◄ Anterior",
            diaryNext: "Seguinte ►",
            diaryPage: "Diário: Pág. ",
            diaryBack: "Voltar",
            pageNumberCover: "Capa",
            pageNumberDisplay: "Pág.",
            authorLabel: "Escrito por:",
            authorTagLabel: "Escrito por:",
            writtenBy: "Escritora:",
            devLabel: "Desenvolvedor:",
            emailLabel: "E-mail:",
            termsBtn: "Termos e Licença de Uso",
            termsModalTitle: "Termos de Uso e Licença de Propriedade Intelectual",
            termsCloseBtn: "Fechar",
            termsLegalText: `<p>Este Termo de Uso e Licença de Propriedade Intelectual ("Termo") regula o acesso e a utilização do portal de histórias infantis interativas "O Brilho de Alice" ("Projeto"), desenvolvido e mantido por <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>, inscrito no CNPJ sob o nº <strong>27.658.099/0001-70</strong>, com obras literárias escritas por <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. Propriedade Intelectual e Direitos Autorais</h4>
<p>Todo e qualquer conteúdo disponível neste Projeto — incluindo, mas não se limitando a, código-fonte (HTML, CSS, JavaScript, manifestos e service workers), ilustrações artísticas, histórias de texto, mecânicas de jogos interativos, efeitos sonoros, logotipos, layouts, imagens digitais e marcas comerciais — é de propriedade intelectual exclusiva dos titulares acima mencionados e está rigorosamente protegido pela Lei de Direitos Autorais do Brasil (Lei nº 9.610/98), Lei do Software (Lei nº 9.609/98) e por convenções e tratados internacionais de propriedade intelectual.</p>
<h4>2. Concessão de Licença Limitada</h4>
<p>Concede-se ao usuário final uma licença limitada, não exclusiva, não comercial, intransferível, temporária e revogável para visualizar, interagir e utilizar o Projeto unicamente para fins de entretenimento pessoal e leitura familiar no dispositivo de acesso. Nenhuma transferência de direito de propriedade intelectual é realizada sob este Termo.</p>
<h4>3. Restrições e Proibições Estritas</h4>
<p>Fica terminantemente proibido ao usuário ou a qualquer terceiro, sob pena das sanções civis e criminais aplicáveis:</p>
<ul>
    <li>Copiar, reproduzir, duplicar, baixar (download), capturar telas (screenshot), extrair dados, republicar, transmitir, vender ou distribuir qualquer imagem, ilustração, texto de história, efeito de áudio ou trecho de código-fonte do Projeto, por qualquer meio digital ou físico, sem autorização expressa, prévia e por escrito dos titulares.</li>
    <li>Realizar engenharia reversa, descompilação, desmontagem (disassembly), modificação ou qualquer tentativa de obter ou derivar o código de programação ou arquitetura lógica da aplicação.</li>
    <li>Criar obras derivadas, adaptar, traduzir ou fundir partes deste Projeto em outros sistemas, aplicativos, livros físicos/digitais, publicações ou plataformas eletrônicas.</li>
    <li>Utilizar a marca registrada "O Brilho de Alice", as ilustrações originais ou qualquer design proprietário deste portal para fins comerciais, lucrativos, publicitários ou associativos sem consentimento formal prévio.</li>
</ul>
<h4>4. Violações e Penalidades</h4>
<p>Qualquer infração a estes termos constituirá crime de violação de direito autoral (Art. 184 do Código Penal Brasileiro) e concorrência desleal. Os titulares se reservam o direito de adotar todas as medidas extrajudiciais e judiciais cabíveis na esfera cível e criminal, incluindo ações de busca e apreensão, pedidos de liminar para cessação imediata de uso indevido e pleito de indenizações integrais por perdas e danos, lucros cessantes e danos morais.</p>
<h4>5. Legislação Aplicável e Foro</h4>
<p>Este Termo é regido, interpretado e executado em conformidade com as leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias oriundas deste instrumento, fica eleito o Foro da Comarca do Rio de Janeiro, Estado do Rio de Janeiro, com renúncia expressa a qualquer outro por mais privilegiado que seja.</p>`
        },
        en: {
            libraryTitle: "Magical <span class=\"highlight\">Story Portal</span>",
            librarySubtitle: "Choose an interactive children's book to read, listen, and play!",
            btnMusic: "Music",
            btnNarration: "Narrate",
            btnBackToLibrary: "Library",
            btnOpenBook: "Open Book",
            btnOpenDiary: "Open Diary",
            btnResetGame: "Reset Game",
            btnWinReset: "Play Again",
            btnStartCatch: "Start Game",
            diaryTitle: "My Diary",
            diarySubtitle: "Write your story",
            diaryAuthorLabel: "Now written by:",
            diaryPlaceholder: "Write today's story here...",
            diaryPrev: "◄ Prev",
            diaryNext: "Next ►",
            diaryPage: "Diary: Page ",
            diaryBack: "Back",
            pageNumberCover: "Cover",
            pageNumberDisplay: "Page",
            authorLabel: "Written by:",
            authorTagLabel: "Written by:",
            writtenBy: "Author:",
            devLabel: "Developer:",
            emailLabel: "Email:",
            termsBtn: "Terms and License of Use",
            termsModalTitle: "Terms of Use and Intellectual Property License",
            termsCloseBtn: "Close",
            termsLegalText: `<p>This Terms of Use and Intellectual Property License Agreement ("Terms") governs the access to and use of the interactive children's stories portal "O Brilho de Alice" ("Project"), developed and maintained by <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>, registered under CNPJ no. <strong>27.658.099/0001-70</strong>, featuring written works by <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. Intellectual Property and Copyright</h4>
<p>All content available on this Project — including, but not limited to, source code (HTML, CSS, JavaScript, manifest files, and service workers), artistic illustrations, story text, interactive gameplay mechanics, sound effects, logos, layouts, images, and trademarks — is the exclusive intellectual property of the aforementioned owners and is protected by Brazilian Copyright Law (Law No. 9,610/98), Brazilian Software Law (Law No. 9,609/98), and international copyright conventions and treaties.</p>
<h4>2. Grant of Limited License</h4>
<p>The user is granted a limited, non-exclusive, non-commercial, non-transferable, temporary, and revocable license to load, view, and interact with the Project solely for personal entertainment and family reading on their personal device. No intellectual property rights are transferred under this agreement.</p>
<h4>3. Strict Restrictions and Prohibitions</h4>
<p>It is strictly prohibited for the user or any third party, under civil and criminal penalties, to:</p>
<ul>
    <li>Copy, reproduce, duplicate, download, capture, extract, republish, transmit, sell, or distribute any image, illustration, story text, audio effect, or source code from the Project, by any digital or physical means, without the express prior written authorization of the owners.</li>
    <li>Perform reverse engineering, decompilation, disassembly, modification, or any attempt to obtain the programming code or logical architecture of the application.</li>
    <li>Create derivative works, adapt, translate, or merge parts of this Project into other systems, applications, physical/digital books, or online platforms.</li>
    <li>Use the trademark "O Brilho de Alice", original illustrations, or any proprietary design of the portal for commercial, advertising, or profitable purposes without formal consent.</li>
</ul>
<h4>4. Infringements and Legal Remedies</h4>
<p>Any violation of these terms constitutes copyright infringement and unfair competition. The owners reserve the right to initiate all applicable civil and criminal legal actions, including injunctions to cease unauthorized use, seizure of infringing materials, and claims for full compensation of losses, damages, lost profits, and moral damages.</p>
<h4>5. Governing Law and Jurisdiction</h4>
<p>This agreement is governed by and construed in accordance with the laws of the Federative Republic of Brazil. The courts of Rio de Janeiro, State of Rio de Janeiro, Brazil, shall have exclusive jurisdiction over any disputes arising from these Terms.</p>`
        },
        es: {
            libraryTitle: "Portal de <span class=\"highlight\">Historias Mágicas</span>",
            librarySubtitle: "¡Elige un libro infantil interactivo para leer, escuchar y jugar!",
            btnMusic: "Música",
            btnNarration: "Narrar",
            btnBackToLibrary: "Biblioteca",
            btnOpenBook: "Abrir Libro",
            btnOpenDiary: "Abrir Diario",
            btnResetGame: "Reiniciar Juego",
            btnWinReset: "Jugar de Nuevo",
            btnStartCatch: "Empezar Lluvia",
            diaryTitle: "Mi Diario",
            diarySubtitle: "Escribe tu historia",
            diaryAuthorLabel: "Ahora escrito por:",
            diaryPlaceholder: "Escribe tu historia de hoy aquí...",
            diaryPrev: "◄ Anterior",
            diaryNext: "Siguiente ►",
            diaryPage: "Diario: Pág. ",
            diaryBack: "Volver",
            pageNumberCover: "Portada",
            pageNumberDisplay: "Pág.",
            authorLabel: "Escrito por:",
            authorTagLabel: "Escrito por:",
            writtenBy: "Autora:",
            devLabel: "Desarrollador:",
            emailLabel: "Correo electrónico:",
            termsBtn: "Términos y Licencia de Uso",
            termsModalTitle: "Términos de Uso y Licencia de Propiedad Intelectual",
            termsCloseBtn: "Cerrar",
            termsLegalText: `<p>Este Contrato de Términos de Uso y Licencia de Propiedad Intelectual ("Términos") regula el acceso y la utilización del portal de historias infantiles interactivas "O Brilho de Alice" ("Proyecto"), desarrollado y mantenido por <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>, inscrito en el CNPJ bajo el nº <strong>27.658.099/0001-70</strong>, con obras literarias escritas por <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. Propiedad Intelectual y Derechos de Autor</h4>
<p>Todo el contenido disponible en este Proyecto — incluyendo, pero no limitado a, el código fuente (HTML, CSS, JavaScript, manifiestos y service workers), ilustraciones artísticas, textos de historias, mecánicas de juegos interactivos, efectos de sonido, logotipos, diseños, imágenes y marcas comerciales — es propiedad intelectual exclusiva de los titulares mencionados anteriormente y está estrictamente protegido por la Ley de Derechos de Autor de Brasil (Ley nº 9.610/98), la Ley de Software (Ley nº 9.609/98) y por convenciones y tratados internacionales de propiedad intelectual.</p>
<h4>2. Concesión de Licencia Limitada</h4>
<p>Se otorga al usuario una licencia limitada, no exclusiva, no comercial, intransferible, temporal y revocable para ver, interactuar y utilizar el Proyecto exclusivamente para fines de entretenimiento personal y lectura familiar en su dispositivo de acceso. No se transfiere ningún derecho de propiedad intelectual bajo este acuerdo.</p>
<h4>3. Restricciones y Prohibiciones Estrictas</h4>
<p>Queda expresamente prohibido al usuario o a cualquier tercero, bajo pena de sanciones civiles y penales, lo siguiente:</p>
<ul>
    <li>Copiar, reproducir, duplicar, descargar, capturar pantallas, extraer, republicar, transmitir, vender o distribuir cualquier imagen, ilustración, texto de historia, efecto de sonido o fragmento de código fuente del Proyecto, por cualquier medio digital o físico, sin la autorización expresa, previa y por escrito de los titulares.</li>
    <li>Realizar ingeniería inversa, descompilación, desmontaje, modificación o cualquier intento de obtener el código de programación o la arquitectura lógica de la aplicación.</li>
    <li>Crear obras derivadas, adaptar, traducir o fusionar partes de este Proyecto en otros sistemas, aplicaciones, libros físicos/digitales o plataformas electrónicas.</li>
    <li>Utilizar la marca "O Brilho de Alice", ilustraciones originales o cualquier diseño propietario de este portal para fines comerciales, publicitarios o lucrativos sin consentimiento previo por escrito.</li>
</ul>
<h4>4. Infracciones y Consecuencias Legales</h4>
<p>Cualquier infracción a estos términos constituirá un delito de violación de derechos de autor y competencia desleal. Los titulares se reservan el derecho de adoptar todas las medidas judiciales civiles y penales correspondientes, incluidas demandas por daños y perjuicios, lucros cesantes y daños morales.</p>
<h4>5. Legislación Aplicable y Jurisdicción</h4>
<p>Este acuerdo se rige e interpreta de conformidad con las leyes de la República Federativa del Brasil. Se elige el Foro de la Ciudad de Río de Janeiro, Estado de Río de Janeiro, Brasil, para dirimir cualquier controversia resultante de estos Términos.</p>`
        },
        de: {
            libraryTitle: "Portal der <span class=\"highlight\">magischen Geschichten</span>",
            librarySubtitle: "Wähle ein interaktives Kinderbuch zum Lesen, Hören und Spielen!",
            btnMusic: "Musik",
            btnNarration: "Vorlesen",
            btnBackToLibrary: "Bibliothek",
            btnOpenBook: "Buch öffnen",
            btnOpenDiary: "Tagebuch öffnen",
            btnResetGame: "Spiel neu starten",
            btnWinReset: "Nochmal spielen",
            btnStartCatch: "Regen starten",
            diaryTitle: "Mein Tagebuch",
            diarySubtitle: "Schreibe deine Geschichte",
            diaryAuthorLabel: "Jetzt geschrieben von:",
            diaryPlaceholder: "Schreibe hier deine heutige Geschichte...",
            diaryPrev: "◄ Zurück",
            diaryNext: "Weiter ►",
            diaryPage: "Tagebuch: S. ",
            diaryBack: "Zurück",
            pageNumberCover: "Cover",
            pageNumberDisplay: "S.",
            authorLabel: "Geschrieben von:",
            authorTagLabel: "Geschrieben von:",
            writtenBy: "Autorin:",
            devLabel: "Entwickler:",
            emailLabel: "E-Mail:",
            termsBtn: "Nutzungsbedingungen und Lizenz",
            termsModalTitle: "Nutzungsbedingungen und Lizenz für geistiges Eigentum",
            termsCloseBtn: "Schließen",
            termsLegalText: `<p>Diese Nutzungsbedingungen und Lizenz für geistiges Eigentum ("Bedingungen") regeln den Zugriff auf und die Nutzung des interaktiven Kindergeschichten-Portals "O Brilho de Alice" ("Projekt"), das von <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>, eingetragen unter CNPJ Nr. <strong>27.658.099/0001-70</strong>, entwickelt und gepflegt wird, mit literarischen Werken von <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. Geistiges Eigentum und Urheberrecht</h4>
<p>Alle im Projekt verfügbaren Inhalte — einschließlich, aber nicht beschränkt auf den Quellcode (HTML, CSS, JavaScript, Manifeste und Service Worker), künstlerische Illustrationen, Geschichtentexte, interaktive Spielmechaniken, Soundeffekte, Logos, Layouts, digitale Bilder und Marken — sind das ausschließliche geistige Eigentum der oben genannten Eigentümer und streng geschützt durch das brasilianische Urheberrechtsgesetz (Gesetz Nr. 9.610/98), das Softwaregesetz (Gesetz Nr. 9.609/98) sowie internationale Verträge zum Schutz des geistigen Eigentums.</p>
<h4>2. Gewährung einer eingeschränkten Lizenz</h4>
<p>Dem Endnutzer wird eine eingeschränkte, nicht exklusive, nicht kommerzielle, nicht übertragbare, temporäre und widerrufliche Lizenz gewährt, das Projekt ausschließlich zum Zweck der persönlichen Unterhaltung und des gemeinsamen Lesens in der Familie auf dem jeweiligen Zugriffsgerät anzuzeigen und zu nutzen.</p>
<h4>3. Strenge Einschränkungen und Verbote</h4>
<p>Es ist dem Nutzer oder Dritten unter Androhung zivil- und strafrechtlicher Sanktionen strengstens untersagt:</p>
<ul>
    <li>Bilder, Illustrationen, Geschichtentexte, Audioeffekte oder Quellcode-Auszüge des Projekts ohne ausdrückliche, vorherige schriftliche Genehmigung der Eigentümer zu kopieren, zu reproduzieren, zu vervielfältigen, herunterzuladen, per Screenshot aufzunehmen oder zu verbreiten.</li>
    <li>Reverse Engineering, Dekompilierung, Disassemblierung oder sonstige Versuche durchzuführen, um den Quellcode der Anwendung zu erhalten.</li>
    <li>Abgeleitete Werke zu erstellen, Teile dieses Projekts zu modifizieren oder in andere Systeme, Bücher, Veröffentlichungen oder Plattformen einzufügen.</li>
    <li>Die Marke "O Brilho de Alice", die Originalillustrationen oder das urheberrechtlich geschützte Design für kommerzielle Zwecke zu nutzen.</li>
</ul>
<h4>4. Verstöße und Konsequenzen</h4>
<p>Jeder Verstoß gegen diese Bedingungen stellt eine Urheberrechtsverletzung dar. Die Eigentümer behalten sich das Recht vor, alle rechtlichen Schritte einzuleiten, einschließlich einstweiliger Verfügungen und Schadensersatzforderungen.</p>
<h4>5. Anwendbares Recht und Gerichtsstand</h4>
<p>Diese Bedingungen unterliegen dem Recht der Federativen Republik Brasilien. Ausschließlicher Gerichtsstand für alle Streitigkeiten ist Rio de Janeiro, RJ, Brasilien.</p>`
        },
        zh: {
            libraryTitle: "魔法<span class=\"highlight\">故事传送门</span>",
            librarySubtitle: "选择一本互动式童书来阅读、聆听和玩耍！",
            btnMusic: "音乐",
            btnNarration: "朗读",
            btnBackToLibrary: "图书馆",
            btnOpenBook: "打开书本",
            btnOpenDiary: "打开日记",
            btnResetGame: "重置游戏",
            btnWinReset: "再玩一次",
            btnStartCatch: "开始游戏",
            diaryTitle: "我的日记",
            diarySubtitle: "写下你的故事",
            diaryAuthorLabel: "现在作者是：",
            diaryPlaceholder: "在这里写下你今天的故事...",
            diaryPrev: "◄ 上一页",
            diaryNext: "下一页 ►",
            diaryPage: "日记：第 ",
            diaryBack: "返回",
            pageNumberCover: "封面",
            pageNumberDisplay: "页",
            authorLabel: "作者：",
            authorTagLabel: "作者：",
            writtenBy: "著者：",
            devLabel: "开发者：",
            emailLabel: "电子邮件：",
            termsBtn: "服务条款与使用许可",
            termsModalTitle: "使用条款与知识产权许可协议",
            termsCloseBtn: "关闭",
            termsLegalText: `<p>本《使用条款与知识产权许可协议》（以下简称“本协议”）适用于访问和使用“爱丽丝的闪耀”（O Brilho de Alice）互动儿童故事门（以下简称“本项”）。本项目由 <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>（注册 CNPJ 号：<strong>27.658.099/0001-70</strong>）开发和维护，文学作品由 <strong>ANA CARLA SARAIVA PIQUET</strong> 创作。</p>
<h4>1. 知识产权与版权</h4>
<p>本项目中可用的所有内容——包括但不限于源代码（HTML、CSS、JavaScript、清单和 service worker）、艺术插图、故事文本、互动游戏机制、音效、标志、排版设计、数字图像和商标——均为上述所有者的专有知识产权，并受到巴西版权法（第 9.610/98 号法律）、软件法（第 9.609/98 号法律）以及国际知识产权条约的严格保护。</p>
<h4>2. 有限许可授予</h4>
<p>最终用户获得一项有限的、非排他性的、非商业性的、不可转让的、临时的和可撤销的许可，仅用于在访问设备上为个人娱乐和家庭阅读而查看、互动和使用本项目。本协议不转移任何知识产权。</p>
<h4>3. 严格限制与禁止行为</h4>
<p>严禁用户或任何第三方进行以下行为，否则将面临民事和刑事制裁：</p>
<ul>
    <li>未经所有者明确的、事先书面授权，以任何数字或实体方式复制、再造、克隆、下载、屏幕截图、提取数据、重新发布、传播、出售或分分发本项目的任何图像、插图、故事文本、音效或源代码片段。</li>
    <li>对本项目进行反向工程、反编译、反汇编、修改或任何试图获取源代码的行为。</li>
    <li>创作衍生作品，或将本项目的任何部分修改或合并到其他系统、应用程序、实体/电子书、出版物或网络平台中。</li>
    <li>未经事先正式同意，将“O Brilho de Alice”商标、原始插图或本网站的任何专有设计用于商业、盈利、广告或联名目的。</li>
</ul>
<h4>4. 违约与法律责任</h4>
<p>任何违反本协议的行为均构成侵犯版权及不正当竞争。所有者保留采取一切司法和司法外措施的权利，包括申请禁止令、查封侵权材料以及索赔全部损失（包括精神损害赔偿）。</p>
<h4>5. 适用法律与管辖权</h4>
<p>本协议受巴西联邦共和国法律管辖。因本协议引起的任何争议，均由巴西里约热内卢市法院管辖。</p>`
        },
        he: {
            libraryTitle: "שער <span class=\"highlight\">הסיפורים המאגיים</span>",
            librarySubtitle: "בחרו ספר ילדים אינטראקטיבי לקריאה, האזנה ומשחק!",
            btnMusic: "מוזיקה",
            btnNarration: "הקראה",
            btnBackToLibrary: "ספרייה",
            btnOpenBook: "פתח ספר",
            btnOpenDiary: "פתח יומן",
            btnResetGame: "אתחל משחק",
            btnWinReset: "שחק שוב",
            btnStartCatch: "התחל גשם",
            diaryTitle: "היומן שלי",
            diarySubtitle: "כתוב את הסיפור שלך",
            diaryAuthorLabel: "נכתב כעת על ידי:",
            diaryPlaceholder: "כתוב את הסיפור שלך להיום כאן...",
            diaryPrev: "הקודם ►",
            diaryNext: "הבא ◄",
            diaryPage: "יומן: עמ' ",
            diaryBack: "חזור",
            pageNumberCover: "עטיפה",
            pageNumberDisplay: "עמ'",
            authorLabel: "נכתב על ידי:",
            authorTagLabel: "נכתב על ידי:",
            writtenBy: "כותבת:",
            devLabel: "מפתח:",
            emailLabel: "אימেইল:",
            termsBtn: "תנאי שימוש ורישיון",
            termsModalTitle: "תנאי שימוש ורישיון קניין רוחני",
            termsCloseBtn: "סגור",
            termsLegalText: `<p>תנאי שימוש ורישיון קניין רוחني אלה ("התנאים") מסדירים את הגישה והשימוש בפורتل סיפורי הילדים האינטראקטיביים "O Brilho de Alice" ("הפרויקט"), המפותח ומתוחזק על ידי <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>, הרשום תחת CNPJ מס' <strong>27.658.099/0001-70</strong>, עם יצירות ספרותיות מאת <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. קניין רוחני וזכויות יוצרים</h4>
<p>כל תוכן הזמין בפרויקט זה — כולل, אך לא רק, קוד המקור (HTML, CSS, JavaScript, קבצי מניפסט ו-service workers), איורים אמנותיים, טקסט הסיפורים, מכניקות משחק אינטראקטיביות, אפקטים קוליים, לוגואים, עיצובי פריסה, תמונות דיגיטליות וסימנים מסחריים — הוא קניינם הרוחני הבלעדי של הבעלים המוזכרים לעיל ומוגן בחוק זכויות היוצרים הברזילאי וחוקי התוכנה, כמו גם באמנות בינלאומיות.</p>
<h4>2. הענקת רישיון מוגבל</h4>
<p>למשתמש הקצה מוענק רישיון מוגבל, לא בלעדי, לא מסחרי, לא עביר, זמני וניתן לביטול לצפות, לתקשר ולהשתמש בפרויקט אך ורק לצורכי בידור אישי וקריאה משפחתית במכשיר הגישה. שום זכות בעלות על קניין רוחני אינה מועברת תחת תנאים אלה.</p>
<h4>3. הגבלות ואיסורים חמורים</h4>
<p>חל איסור מוחלט על המשתמש או על צด שלישי כלשהו, תחת סנקציות אזרחיות ופליליות:</p>
<ul>
    <li>להעתיק, לשכפל, להוריד, לצלם מסך, לחלץ נתונים, לפרסם מחדש, לשדר, למכור או להפיץ כל תמונה, איור, טקסט סיפור או קוד מקור מהפרויקט, ללא אישור מראש ובכתב מהבעלים.</li>
    <li>לבצע הנדסה לאחור, דה-קומפילציה, פירוק קוד (disassembly), או כל ניסיון אחר להשיג או להפיק את קוד המקור או הארכיטקטורه של היישום.</li>
    <li>ליצור יצירות נגזרות, לשנות או לשלב חלקים מפרויקט זה במערכות אחרות, אפליקציות, ספרים פיזיים או דיגיטליים כלשהם.</li>
    <li>להשתמש בסימן המסחרי "O Brilho de Alice" או בכל עיצוב ייחודי של הפורטל למטרות מסחריות או פרסומיות ללא הסכמה רשמית.</li>
</ul>
<h4>4. הפרות וסעדים משפטיים</h4>
<p>כל הפרה של תנאים אלה תהווה עבירה של הפרת זכויות יוצרים ותחרות בלתי הוגנת, ותחשוף את המפר לתביעות משפטיות, לרבות צווי מניעה, תפיסת חומרים מפרים ותביעות לפיצויים בגין נזקים חומריים ומוסריים.</p>
<h4>5. הדין החל וסמכות השיפوط</h4>
<p>תנאים אלה כפופים לחוקי הרפובليקה הפדרלית של ברזיל. סמכות השיפوط הבלעדית לדון בכל מחלוקת מוקנית לבתי המשפט של ריו דה ז'נייرو, ברזيل.</p>`
        },
        ar: {
            libraryTitle: "بوابة <span class=\"highlight\">القصص السحرية</span>",
            librarySubtitle: "اختر كتابًا تفاعليًا للأطفال للقراءة والاستماع واللعب!",
            btnMusic: "الموسيقى",
            btnNarration: "القص",
            btnBackToLibrary: "المكتبة",
            btnOpenBook: "افتح الكتاب",
            btnOpenDiary: "افتح المذكرات",
            btnResetGame: "إعادة اللعبة",
            btnWinReset: "اللعب مجددًا",
            btnStartCatch: "بدء اللعبة",
            diaryTitle: "مذكراتي السحرية",
            diarySubtitle: "اكتب قصتك",
            diaryAuthorLabel: "مكتوب الآن بواسطة:",
            diaryPlaceholder: "اكتب قصتك لليوم هنا...",
            diaryPrev: "السابق ◄",
            diaryNext: "التالي ►",
            diaryPage: "المذكرات: صفحة ",
            diaryBack: "رجوع",
            pageNumberCover: "الغلاف",
            pageNumberDisplay: "صفحة",
            authorLabel: "كتابة:",
            authorTagLabel: "كتابة:",
            writtenBy: "الكاتبة:",
            devLabel: "المطور:",
            emailLabel: "البريد الإلكتروني:",
            termsBtn: "شروط الاستخدام والترخيص",
            termsModalTitle: "شروط الاستخدام وترخيص الملكية الفكرية",
            termsCloseBtn: "إغلاق",
            termsLegalText: `<p>تحكم شروط الاستخدام وترخيص الملكية الفكرية هذه ("الشروط") الوصول إلى بوابة قصص الأطفال التفاعلية "O Brilho de Alice" ("المشروع") واستخدامها، وهي بوابة تم تطويرها وصيانتها بواسطة <strong>CARLOS ANTONIO DE OLIVEIRA PIQUET</strong>، والمسجل برقم CNPJ <strong>27.658.099/0001-70</strong>، وتضم أعمالاً أدبية للكاتبة <strong>ANA CARLA SARAIVA PIQUET</strong>.</p>
<h4>1. الملكية الفكرية وحقوق النشر</h4>
<p>جميع المحتويات المتاحة في هذا المشروع — بما في ذلك، على سبيل المثال لا الحصر، الكود المصدري (HTML وCSS وJavaScript وملفات البيان والـ service workers)، والرسوم التوضيحية الفنية، ونصوص القصص، وآليات اللعب التفاعلية، والمؤثرات الصوتية، والشعارات، وتصميمات التخطيط، والصور الرقمية، والعلامات التجارية — هي ملكية فكرية حصرية للمالكين المذكورين أعلاه وهي محمية بدقة بموجب قانون حقوق النشر البرازيلي وقانون البرمجيات والاتفاقيات الدولية ذات الصلة.</p>
<h4>2. منح ترخيص محدود</h4>
<p>يُمنح المستخدم النهائي ترخيصًا محدودًا وغير حصري وغير تجاري وغير قابل للتحويل ومؤقت وقابل للإلغاء لعرض المشروع والتفاعل معه واستخدامه فقط لأغراض الترفيه الشخصي والقراءة العائلية على جهاز الوصول الخاص به. لا يتم نقل أي حقوق ملكية فكرية بموجب هذه الشروط.</p>
<h4>3. القيود والمحظورات الصارمة</h4>
<p>يُحظر تمامًا على المستخدم أو أي طرف ثالث، تحت طاولة العقوبات المدنية والجنائية:</p>
<ul>
    <li>نسخ أو إعادة إنتاج أو مضاعفة أو تنزيل أو التقاط لقطات شاشة أو استخراج بيانات أو إعادة نشر أو نقل أو بيع أو توزيع أي صورة أو رسم توضيحي أو نص قصة أو مؤثر صوتي أو جزء من الكود المصدري للمشروع بأي وسيلة رقمية أو مادية دون إذن كتابي صريح ومسبق من المالكين.</li>
    <li>إجراء هندسة عكسية أو إلغاء تجميع أو تفكيك أو أي محاولة أخرى للحصول على الكود المصدري للتطبيق أو بنيته البرمجية.</li>
    <li>إنشاء أعمال مشتقة أو تعديل أو دمج أجزاء من هذا المشروع في أنظمة أخرى أو تطبيقات أو كتب ورقية/رقمية أو منصات إلكترونية.</li>
    <li>استخدام العلامة التجارية "O Brilho de Alice" أو الرسوم الأصلية أو أي تصميم خاص بالبوابة لأغراض تجارية أو إعلانية دون موافقة رسمية مسبقة.</li>
</ul>
<h4>4. الانتهاكات والجزاءات القانونية</h4>
<p>يشكل أي انتهاك لهذه الشروط جريمة انتهاك لحقوق النشر ومنافسة غير مشروعة. ويحتفظ المالكون بالحق في اتخاذ جميع التدابير القضائية وغير القضائية المتاحة مدنياً وجنائياً، بما في ذلك طلبات التوقف الفوري والمطالبة بالتعويض الكامل عن الخسائر والأضرار المعنوية والمادية.</p>
<h4>5. القانون الواجب التطبيق والاختصاص القضائي</h4>
<p>تخضع هذه الشروط وتُفسر وتُنفذ وفقاً لقوانين جمهورية البرازيل الاتحادية. وتختص محاكم مدينة ريو دي جانيرو، البرازيل، دون غيرها، بالنظر في أي نزاع ينشأ عن هذه الشروط.</p>`
        }
    };

    function translateLibrary() {
        const cards = document.querySelectorAll('.story-card');
        cards.forEach(card => {
            const storyId = card.getAttribute('data-story-id');
            if (storyId && STORIES_DATA[storyId]) {
                const story = STORIES_DATA[storyId];
                const langData = story.languages[currentLang];
                
                // Update badge
                const badgeEl = card.querySelector('.card-badge');
                if (badgeEl) {
                    if (storyId === 'diary') {
                        badgeEl.textContent = currentLang === 'en' ? 'Personal + Writing' : (currentLang === 'es' ? 'Personal + Escritura' : 'Pessoal + Escrita');
                    } else {
                        badgeEl.textContent = currentLang === 'en' ? 'Interactive + Games' : (currentLang === 'es' ? 'Interactivo + Juegos' : 'Interativo + Jogos');
                    }
                }
                
                // Update title
                const titleEl = card.querySelector('.card-title');
                if (titleEl) titleEl.innerHTML = langData.title;
                
                // Update author
                const authorEl = card.querySelector('.card-author');
                if (authorEl) {
                    if (storyId === 'diary') {
                        authorEl.textContent = currentLang === 'en' ? 'Child Space' : (currentLang === 'es' ? 'Espacio del Niño' : 'Espaço da Criança');
                    } else {
                        const writtenByLabel = currentLang === 'en' ? 'Author:' : (currentLang === 'es' ? 'Autora:' : 'Escritora:');
                        authorEl.textContent = `${writtenByLabel} ${langData.author || story.author}`;
                    }
                }
                
                // Update description
                const descEl = card.querySelector('.card-description');
                if (descEl) {
                    if (storyId === 'diary') {
                        descEl.textContent = currentLang === 'en' ? 'A safe and secret space for you to write your memories, thoughts and invent your own magical stories with auto-save!' : (currentLang === 'es' ? '¡Un espacio seguro y secreto para que escribas tus recuerdos, pensamientos e inventes tus propias historias mágicas con guardado automático!' : 'Um espaço seguro e secreto para você escrever suas memórias, pensamentos e inventar suas próprias histórias mágicas com salvamento automático!');
                    } else if (storyId === 'alice') {
                        descEl.textContent = currentLang === 'en' ? "Follow Alice's dream of becoming a great acting star, learning about courage, teamwork, and generosity!" : (currentLang === 'es' ? '¡Sigue el sueño de Alicia de convertirse en una gran estrella de la actuación, aprendiendo sobre el coraje, el trabajo en equipo y la generosidad!' : 'Acompanhe o sonho de Alice de se tornar uma grande estrela de teatro, aprendendo sobre coragem, trabalho em equipe e generosidade!');
                    } else if (storyId === 'mermaid_unicorn') {
                        descEl.textContent = currentLang === 'en' ? 'Discover the beautiful friendship between Serena the mermaid and Paco the unicorn, and how courage and cooperation unite the forest and the ocean!' : (currentLang === 'es' ? '¡Descubre la hermosa amistad entre Serena la sirena y Paco el unicornio, y cómo el coraje y la cooperación unen el bosque y el océano!' : 'Descubra a linda amizade entre Serena, a sereia, e Paco, o unicórnio, e como a coragem e a cooperação unem a floresta e o oceano!');
                    } else if (storyId === 'cores_amizade') {
                        descEl.textContent = currentLang === 'en' ? 'Marina and her friends from various backgrounds paint a beautiful rainbow, discovering that the world is wonderful precisely because we are all unique!' : (currentLang === 'es' ? '¡Marina y sus amigos de diversos orígenes pintan un hermoso arcoíris, descubriendo que el mundo es maravilloso precisamente porque todos somos únicos y especiales!' : 'Marina e seus amigos de várias origens pintam um lindo arco-íris, descobrindo que o mundo é maravilhoso justamente porque todos somos únicos e especiais!');
                    } else if (storyId === 'voo_lucas') {
                        descEl.textContent = currentLang === 'en' ? "Lucas is a sweet autistic boy with a magical attention to detail. He teaches his classmates about empathy, inclusion, and the beauty of thinking differently!" : (currentLang === 'es' ? '¡Lucas es un niño autista con una atención mágica a los detalles. ¡Enseña a sus compañeros sobre empatía, inclusión y la belleza de pensar de manera diferente!' : 'Lucas é um garotinho autista com uma atenção mágica aos detalhes. Ele ensina seus colegas sobre empatia, inclusão e a beleza de pensar de forma diferente!');
                    } else if (storyId === 'arvore_abracos') {
                        descEl.textContent = currentLang === 'en' ? 'When things go wrong, Tati discovers that her family\'s hug is the root that gives her safety. A beautiful lesson about love and family protection!' : (currentLang === 'es' ? '¡Cuando las cosas salen mal, Tati descubre que el abrazo de su familia es la raíz que le da seguridad. ¡Una hermosa lección sobre el amor y la protección familiar!' : 'Quando as coisas dão errado, Tati descobre que o abraço de sua família é a raiz que lhe dá segurança. Uma linda lição sobre amor e proteção familiar!');
                    }
                }
                
                // Update button
                const btnEl = card.querySelector('.read-story-btn');
                if (btnEl) {
                    if (storyId === 'diary') {
                        btnEl.textContent = currentLang === 'en' ? 'Open Diary 📖' : (currentLang === 'es' ? 'Abrir Diario 📖' : 'Abrir Diário 📖');
                    } else {
                        btnEl.textContent = currentLang === 'en' ? 'Read Story 📖' : (currentLang === 'es' ? 'Leer Historia 📖' : 'Ler História 📖');
                    }
                }
            }
        });
    }

    function translateUI() {
        const trans = UI_TRANSLATIONS[currentLang];
        
        // Dynamically toggle RTL layout
        document.documentElement.dir = ['he', 'ar'].includes(currentLang) ? 'rtl' : 'ltr';
        
        // Library view titles
        const libTitle = document.querySelector('.library-title');
        if (libTitle) libTitle.innerHTML = trans.libraryTitle;
        const libSub = document.querySelector('.library-subtitle');
        if (libSub) libSub.textContent = trans.librarySubtitle;
        
        // Header Controls
        const btnBackSpan = btnBackToLibrary.querySelector('span');
        if (btnBackSpan) btnBackSpan.textContent = trans.btnBackToLibrary;
        const btnMusicSpan = btnMusic.querySelector('span');
        if (btnMusicSpan) btnMusicSpan.textContent = trans.btnMusic;
        const btnNarrationSpan = btnNarration.querySelector('span');
        if (btnNarrationSpan) btnNarrationSpan.textContent = trans.btnNarration;
        
        // Cover Start Button
        if (btnStart) {
            const svgIcon = btnStart.querySelector('svg');
            btnStart.innerHTML = trans.btnOpenBook + ' ' + (svgIcon ? svgIcon.outerHTML : '');
        }
        
        // Diary Cover Start Button
        const btnOpenDiary = document.getElementById('btn-open-diary');
        if (btnOpenDiary) {
            const svgIcon = btnOpenDiary.querySelector('svg');
            btnOpenDiary.innerHTML = trans.btnOpenDiary + ' ' + (svgIcon ? svgIcon.outerHTML : '');
        }

        // Diary Write view elements
        const btnCloseDiary = document.getElementById('btn-close-diary');
        if (btnCloseDiary) {
            const svgIcon = btnCloseDiary.querySelector('svg');
            btnCloseDiary.innerHTML = (svgIcon ? svgIcon.outerHTML : '') + ' ' + trans.diaryBack;
        }
        
        const diaryAuthorLabel = document.querySelector('label[for="diary-author"]');
        if (diaryAuthorLabel) diaryAuthorLabel.textContent = trans.diaryAuthorLabel;
        
        const diaryTextarea = document.getElementById('diary-textarea');
        if (diaryTextarea) diaryTextarea.placeholder = trans.diaryPlaceholder;
        
        const btnDiaryPrev = document.getElementById('btn-diary-prev');
        if (btnDiaryPrev) btnDiaryPrev.textContent = trans.diaryPrev;
        const btnDiaryNext = document.getElementById('btn-diary-next');
        if (btnDiaryNext) btnDiaryNext.textContent = trans.diaryNext;

        // Author tag
        updateHeaderAuthorTag();

        // Translate library footer & modal
        const labelFooterDev = document.getElementById('label-footer-dev');
        if (labelFooterDev) labelFooterDev.textContent = trans.devLabel;
        const labelFooterEmail = document.getElementById('label-footer-email');
        if (labelFooterEmail) labelFooterEmail.textContent = trans.emailLabel;
        const btnTermsModalEl = document.getElementById('btn-terms-modal');
        if (btnTermsModalEl) btnTermsModalEl.textContent = trans.termsBtn;
        
        const termsTitle = document.getElementById('terms-modal-title');
        if (termsTitle) termsTitle.textContent = trans.termsModalTitle;
        const termsCloseBtn = document.getElementById('btn-close-terms');
        if (termsCloseBtn) termsCloseBtn.textContent = trans.termsCloseBtn;
        const termsBodyEl = document.getElementById('terms-modal-body');
        if (termsBodyEl && !termsModal.classList.contains('hidden')) {
            termsBodyEl.innerHTML = trans.termsLegalText;
        }

        // Translate the library cards
        translateLibrary();
    }

    // Language Selector Buttons Click Listener
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang && ['pt', 'en', 'es', 'de', 'zh', 'he', 'ar'].includes(lang)) {
                currentLang = lang;
                localStorage.setItem('magicBookLang', lang);
                
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                translateUI();
                
                if (libraryView.classList.contains('hidden') && !bookFrame.classList.contains('hidden')) {
                    loadStory(currentStoryId);
                }
            }
        });
    });

    langButtons.forEach(b => {
        if (b.getAttribute('data-lang') === currentLang) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    
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
        const langStory = currentStory.languages[currentLang] || currentStory;
        const trans = UI_TRANSLATIONS[currentLang];

        // 1. Update cover page content
        if (langStory.title) {
            document.getElementById('cover-title').innerHTML = langStory.title;
        }
        if (langStory.subtitle) {
            document.getElementById('cover-subtitle').textContent = langStory.subtitle;
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
            coverImgEl.alt = (currentStory.coverAlt ? currentStory.coverAlt[currentLang] : "") || "";
        }

        if (langStory.author) {
            document.getElementById('cover-author').textContent = `${trans.writtenBy} ${langStory.author}`;
        }

        // 2. Update page navigation author tag
        updateHeaderAuthorTag();

        // 3. Update story pages 1 to 5
        for (let i = 1; i <= 5; i++) {
            const pageEl = document.getElementById(`page-${i}`);
            if (!pageEl) continue;
            
            const pageData = langStory.pages ? langStory.pages[i - 1] : null;
            
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
        if (page6El && langStory.game6) {
            page6El.querySelector('.page-title').textContent = langStory.game6.title;
            page6El.querySelector('.ornament').textContent = langStory.game6.ornament;
            
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
                imgEl.src = langStory.game6.image;
                imgEl.alt = langStory.game6.imageAlt || "";
            }

            page6El.querySelector('.game-instructions-overlay h4').textContent = langStory.game6.title;
            page6El.querySelector('.game-instructions-overlay p').textContent = langStory.game6.instructions;
            
            const win6Popup = document.getElementById('game-win-popup');
            if (win6Popup) {
                win6Popup.querySelector('h3').textContent = langStory.game6.winMsg;
                win6Popup.querySelector('p').textContent = langStory.game6.winDesc;
            }
        }

        // 5. Update Game 2 (Catch Game) UI elements
        const page7El = document.getElementById('page-7');
        if (page7El && langStory.game7) {
            page7El.querySelector('.page-title').textContent = langStory.game7.title;
            page7El.querySelector('.ornament').textContent = langStory.game7.ornament;
            
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
                imgEl.src = langStory.game7.image;
                imgEl.alt = langStory.game7.imageAlt || "";
            }

            page7El.querySelector('.game-instructions-overlay h4').textContent = langStory.game7.title;
            page7El.querySelector('.game-instructions-overlay p').textContent = langStory.game7.instructions;
            
            const statsEl = page7El.querySelector('.game-stats');
            if (statsEl) {
                let labelText = 'Estrelas: ';
                if (currentStory.catchTheme && currentStory.catchTheme.type) {
                    const type = currentStory.catchTheme.type;
                    if (type === 'butterflies') labelText = currentLang === 'en' ? 'Butterflies: ' : (currentLang === 'es' ? 'Mariposas: ' : 'Borboletas: ');
                    else if (type === 'hearts') labelText = currentLang === 'en' ? 'Hearts: ' : (currentLang === 'es' ? 'Corazones: ' : 'Corações: ');
                    else if (type === 'bubbles') labelText = currentLang === 'en' ? 'Bubbles: ' : (currentLang === 'es' ? 'Burbujas: ' : 'Bolhas: ');
                    else if (type === 'colors') labelText = currentLang === 'en' ? 'Paints: ' : (currentLang === 'es' ? 'Colores: ' : 'Tintas: ');
                } else {
                    labelText = currentLang === 'en' ? 'Stars: ' : (currentLang === 'es' ? 'Estrellas: ' : 'Estrelas: ');
                }
                if (statsEl.firstChild && statsEl.firstChild.nodeType === Node.TEXT_NODE) {
                    statsEl.firstChild.textContent = labelText;
                }
            }

            const win7Popup = document.getElementById('catch-win-popup');
            if (win7Popup) {
                win7Popup.querySelector('h3').textContent = langStory.game7.winMsg;
                win7Popup.querySelector('p').textContent = langStory.game7.winDesc;
            }
        }

        // 6. Update Game 3 (Quiz Game) UI elements
        const page8El = document.getElementById('page-8');
        if (page8El && langStory.game8) {
            page8El.querySelector('.page-title').textContent = langStory.game8.title;
            page8El.querySelector('.ornament').textContent = langStory.game8.ornament;
            
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
                imgEl.src = langStory.game8.image;
                imgEl.alt = langStory.game8.imageAlt || "";
            }

            page8El.querySelector('.game-instructions-overlay h4').textContent = langStory.game8.title;
            page8El.querySelector('.game-instructions-overlay p').textContent = langStory.game8.instructions;
            
            const win8Popup = document.getElementById('quiz-win-popup');
            if (win8Popup) {
                win8Popup.querySelector('h3').textContent = langStory.game8.winMsg;
                win8Popup.querySelector('p').textContent = langStory.game8.winDesc;
            }
        }

        // 7. Update Page 9 (Diary)
        const page9El = document.getElementById('page-9');
        if (page9El && langStory.diary) {
            page9El.querySelector('.diary-title').innerHTML = langStory.diary.title;
            page9El.querySelector('.diary-subtitle').textContent = langStory.diary.subtitle;
            
            const diaryCoverImgEl = page9El.querySelector('.diary-cover-img');
            if (diaryCoverImgEl) {
                diaryCoverImgEl.src = langStory.diary.coverImage;
                diaryCoverImgEl.alt = langStory.diary.coverAlt || "";
            }
        }

        // Update steps labels in footer dynamically
        const steps = document.querySelectorAll('.star-step');
        if (steps.length >= 10) {
            let label6 = currentLang === 'en' ? 'Memory' : (currentLang === 'es' ? 'Memoria' : 'Memória');
            let label7 = currentLang === 'en' ? 'Stars' : (currentLang === 'es' ? 'Estrellas' : 'Estrelas');
            let label8 = currentLang === 'en' ? 'Quiz' : (currentLang === 'es' ? 'Prueba' : 'Quiz');
            let label9 = currentLang === 'en' ? 'Diary' : (currentLang === 'es' ? 'Diario' : 'Diário');

            if (currentStoryId === 'mermaid_unicorn') {
                if (currentLang === 'en') {
                    label6 = 'Friendship'; label7 = 'Bubbles'; label8 = 'Questions'; label9 = 'Diary';
                } else if (currentLang === 'es') {
                    label6 = 'Amistad'; label7 = 'Burbujas'; label8 = 'Preguntas'; label9 = 'Diario';
                } else {
                    label6 = 'Amizade'; label7 = 'Bolhas'; label8 = 'Perguntas'; label9 = 'Diário';
                }
            } else if (currentStoryId === 'cores_amizade') {
                if (currentLang === 'en') {
                    label6 = 'Colors'; label7 = 'Paints'; label8 = 'Equality'; label9 = 'Diary';
                } else if (currentLang === 'es') {
                    label6 = 'Colores'; label7 = 'Colores'; label8 = 'Igualdad'; label9 = 'Diario';
                } else {
                    label6 = 'Cores'; label7 = 'Tintas'; label8 = 'Igualdade'; label9 = 'Diário';
                }
            } else if (currentStoryId === 'voo_lucas') {
                if (currentLang === 'en') {
                    label6 = 'Lucas'; label7 = 'Flight'; label8 = 'Empathy'; label9 = 'Diary';
                } else if (currentLang === 'es') {
                    label6 = 'Lucas'; label7 = 'Vuelo'; label8 = 'Empatía'; label9 = 'Diario';
                } else {
                    label6 = 'Lucas'; label7 = 'Voo'; label8 = 'Empatia'; label9 = 'Diário';
                }
            } else if (currentStoryId === 'arvore_abracos') {
                if (currentLang === 'en') {
                    label6 = 'Family'; label7 = 'Hugs'; label8 = 'Quiz'; label9 = 'Diary';
                } else if (currentLang === 'es') {
                    label6 = 'Familia'; label7 = 'Abrazos'; label8 = 'Cariño'; label9 = 'Diario';
                } else {
                    label6 = 'Família'; label7 = 'Abraços'; label8 = 'Acolher'; label9 = 'Diário';
                }
            }

            steps[6].querySelector('.label').textContent = label6;
            steps[7].querySelector('.label').textContent = label7;
            steps[8].querySelector('.label').textContent = label8;
            steps[9].querySelector('.label').textContent = label9;
        }

        // Reset memory cardIcons and quizQuestions to current active story
        cardIcons = currentStory.memoryIcons || [];
        gameCardsDeck = [...cardIcons, ...cardIcons];
        quizQuestions = langStory.quiz || [];

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

    // Terms & License Modal Event Listeners
    if (btnTermsModal) {
        btnTermsModal.addEventListener('click', () => {
            const trans = UI_TRANSLATIONS[currentLang];
            if (termsBody) {
                termsBody.innerHTML = trans.termsLegalText;
            }
            termsModal.classList.remove('hidden');
        });
    }

    const closeTermsModal = () => {
        if (termsModal) {
            termsModal.classList.add('hidden');
        }
    };

    if (btnCloseTerms) btnCloseTerms.addEventListener('click', closeTermsModal);
    if (btnCloseTermsTop) btnCloseTermsTop.addEventListener('click', closeTermsModal);
    
    // Close modal when clicking outside the container
    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                closeTermsModal();
            }
        });
    }

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && termsModal && !termsModal.classList.contains('hidden')) {
            closeTermsModal();
        }
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
        const langStory = currentStory.languages[currentLang] || currentStory;
        if (pageIndex === 0) {
            const cleanTitle = langStory.title.replace(/<[^>]*>/g, ' ');
            const writtenByLabel = currentLang === 'en' ? 'Written by' : (currentLang === 'es' ? 'Escrito por' : 'Escrito por');
            return `${cleanTitle}: ${langStory.subtitle}. ${writtenByLabel} ${langStory.author || currentStory.author}.`;
        }
        if (pageIndex === 6) {
            return `${langStory.game6.title}! ${langStory.game6.instructions}`;
        }
        if (pageIndex === 7) {
            return `${langStory.game7.title}! ${langStory.game7.instructions}`;
        }
        if (pageIndex === 8) {
            return `${langStory.game8.title}! ${langStory.game8.instructions}`;
        }
        if (pageIndex === 9) {
            const diaryInstructions = currentLang === 'en' ? 'Write your own story and save your magical memories here.' : (currentLang === 'es' ? 'Escribe tu propia historia y guarda tus recuerdos mágicos aquí.' : 'Escreva a sua própria história e guarde as suas memórias mágicas aqui.');
            return `${langStory.diary.title}! ${langStory.diary.subtitle}. ${diaryInstructions}`;
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

    function setSpeechVoiceAndLang(speech) {
        if (!synth) return;
        const voices = synth.getVoices();
        if (currentLang === 'en') {
            speech.lang = 'en-US';
            const enVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en_US') || voice.lang.includes('en-'));
            if (enVoice) speech.voice = enVoice;
        } else if (currentLang === 'es') {
            speech.lang = 'es-ES';
            const esVoice = voices.find(voice => voice.lang.includes('es-ES') || voice.lang.includes('es_ES') || voice.lang.includes('es-'));
            if (esVoice) speech.voice = esVoice;
        } else if (currentLang === 'de') {
            speech.lang = 'de-DE';
            const deVoice = voices.find(voice => voice.lang.includes('de-DE') || voice.lang.includes('de_DE') || voice.lang.includes('de-'));
            if (deVoice) speech.voice = deVoice;
        } else if (currentLang === 'zh') {
            speech.lang = 'zh-CN';
            const zhVoice = voices.find(voice => voice.lang.includes('zh-CN') || voice.lang.includes('zh_CN') || voice.lang.includes('zh-') || voice.lang.includes('cmn-') || voice.lang.includes('wuu-'));
            if (zhVoice) speech.voice = zhVoice;
        } else if (currentLang === 'he') {
            speech.lang = 'he-IL';
            const heVoice = voices.find(voice => voice.lang.includes('he-IL') || voice.lang.includes('he_IL') || voice.lang.includes('he-'));
            if (heVoice) speech.voice = heVoice;
        } else if (currentLang === 'ar') {
            speech.lang = 'ar-SA';
            const arVoice = voices.find(voice => voice.lang.includes('ar-SA') || voice.lang.includes('ar_SA') || voice.lang.includes('ar-'));
            if (arVoice) speech.voice = arVoice;
        } else {
            speech.lang = 'pt-BR';
            const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR'));
            if (ptVoice) speech.voice = ptVoice;
        }
    }

    function speakPage(index) {
        if (!synth) return;
        
        synth.cancel();
        if (speechTimeout) clearTimeout(speechTimeout);
        
        if (!isNarrationActive) return;

        const textToSpeak = getCleanPageText(index);
        currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
        
        setSpeechVoiceAndLang(currentUtterance);
        
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
            let winText = "Parabéns! Você liberou todas as estrelas do baú da Alice e fez o mundo brilhar!";
            if (currentLang === 'en') {
                winText = "Congratulations! You released all the stars from Alice's chest and made the world shine!";
            } else if (currentLang === 'es') {
                winText = "¡Felicitaciones! ¡Liberaste todas las estrellas del cofre de Alicia e hiciste brillar al mundo!";
            }
            const victoryUtterance = new SpeechSynthesisUtterance(winText);
            
            const voices = synth.getVoices();
            if (currentLang === 'en') {
                victoryUtterance.lang = 'en-US';
                const enVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en_US') || voice.lang.includes('en-'));
                if (enVoice) victoryUtterance.voice = enVoice;
            } else if (currentLang === 'es') {
                victoryUtterance.lang = 'es-ES';
                const esVoice = voices.find(voice => voice.lang.includes('es-ES') || voice.lang.includes('es_ES') || voice.lang.includes('es-'));
                if (esVoice) victoryUtterance.voice = esVoice;
            } else {
                victoryUtterance.lang = 'pt-BR';
                const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR'));
                if (ptVoice) victoryUtterance.voice = ptVoice;
            }
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
        
        const starSymbols = currentStory.catchTheme && currentStory.catchTheme.symbols ? currentStory.catchTheme.symbols : ['⭐', '✨', '🌟', '💫'];
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
            const langStory = (currentStory.languages && currentStory.languages[currentLang]) ? currentStory.languages[currentLang] : currentStory;
            const winDesc = langStory.game7 ? langStory.game7.winDesc : '';
            const speech = new SpeechSynthesisUtterance(winDesc);
            
            const voices = synth.getVoices();
            if (currentLang === 'en') {
                speech.lang = 'en-US';
                const enVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en_US') || voice.lang.includes('en-'));
                if (enVoice) speech.voice = enVoice;
            } else if (currentLang === 'es') {
                speech.lang = 'es-ES';
                const esVoice = voices.find(voice => voice.lang.includes('es-ES') || voice.lang.includes('es_ES') || voice.lang.includes('es-'));
                if (esVoice) speech.voice = esVoice;
            } else {
                speech.lang = 'pt-BR';
                const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR'));
                if (ptVoice) speech.voice = ptVoice;
            }
            synth.speak(speech);
        }
    }

    btnStartCatch.addEventListener('click', startCatchGame);
    btnResetCatch.addEventListener('click', startCatchGame);


    // ----------------------------------------------------
    // 10. GAME 3: Trivia Quiz Game Logic (Page 8)
    // ----------------------------------------------------
    let quizQuestions = [];

    let currentQuestionIndex = 0;

    function initQuizGame() {
        const langStory = (currentStory.languages && currentStory.languages[currentLang]) ? currentStory.languages[currentLang] : currentStory;
        quizQuestions = langStory.quiz || [];
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
            const langStory = (currentStory.languages && currentStory.languages[currentLang]) ? currentStory.languages[currentLang] : currentStory;
            const prefix = currentLang === 'en' ? 'Congratulations! ' : (currentLang === 'es' ? '¡Felicitaciones! ' : 'Parabéns! ');
            const winDesc = langStory.game8 ? langStory.game8.winDesc : '';
            const speech = new SpeechSynthesisUtterance(prefix + winDesc);
            
            const voices = synth.getVoices();
            if (currentLang === 'en') {
                speech.lang = 'en-US';
                const enVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en_US') || voice.lang.includes('en-'));
                if (enVoice) speech.voice = enVoice;
            } else if (currentLang === 'es') {
                speech.lang = 'es-ES';
                const esVoice = voices.find(voice => voice.lang.includes('es-ES') || voice.lang.includes('es_ES') || voice.lang.includes('es-'));
                if (esVoice) speech.voice = esVoice;
            } else {
                speech.lang = 'pt-BR';
                const ptVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR'));
                if (ptVoice) speech.voice = ptVoice;
            }
            synth.speak(speech);
        }
    }

    btnResetQuiz.addEventListener('click', initQuizGame);


    // ----------------------------------------------------
    // 11. Page Navigation Logic (Unified Page Changes)
    // ----------------------------------------------------
    function updateHeaderAuthorTag() {
        if (!authorTagDiv) return;
        
        // If we are on the library view (main page)
        if (libraryView && !libraryView.classList.contains('hidden')) {
            const label = currentLang === 'en' ? 'Written by:' : (currentLang === 'es' ? 'Escrito por:' : 'Escrito por:');
            authorTagDiv.innerHTML = `${label} <span>Ana Carla Saraiva Piquet</span>`;
            return;
        }

        if (currentPageIndex === 9) {
            const childName = localStorage.getItem(`${currentStoryId}_diary_author`) || '';
            const nowWrittenBy = currentLang === 'en' ? 'Now written by:' : (currentLang === 'es' ? 'Ahora escrito por:' : 'Agora escrito por:');
            if (childName.trim()) {
                authorTagDiv.innerHTML = `${nowWrittenBy} <span>${childName}</span>`;
            } else {
                authorTagDiv.innerHTML = `${nowWrittenBy} <span>${currentLang === 'en' ? 'You' : (currentLang === 'es' ? 'Tú' : 'Você')}</span>`;
            }
        } else {
            const langStory = currentStory.languages[currentLang] || currentStory;
            const label = currentLang === 'en' ? 'Written by:' : (currentLang === 'es' ? 'Escrito por:' : 'Escrito por:');
            authorTagDiv.innerHTML = `${label} <span>${langStory.author || currentStory.author || 'Ana Carla Saraiva Piquet'}</span>`;
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
        // Apply slide transition
        let slideDirection = direction;
        if (['he', 'ar'].includes(currentLang)) {
            slideDirection = (direction === 'next') ? 'prev' : 'next';
        }
        if (slideDirection === 'next') {
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
    translateUI();
    initParticles();
    initCustomCursor();
    initMagicCanvas();
    initMagicText();
    init3DTilt();
    updateNavigationUI();
    
    triggerTextReveal(0);
});
