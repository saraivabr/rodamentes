// =====================================================
// RODA DE MENTES - DATABASE
// Todas as mentes disponíveis no sistema
// =====================================================

const MINDS_DATABASE = {
    // ===== NEGÓCIOS & ESTRATÉGIA =====
    negocios: {
        name: "Negócios & Estratégia",
        icon: "📊",
        color: "#3498db",
        minds: {
            steve_jobs: {
                name: "Steve Jobs",
                icon: "🍎",
                color: "#007aff",
                role: "Simplicidade & Design",
                expertise: ["Produto", "Design", "Posicionamento", "Branding"],
                description: "Mestre da simplicidade brutal. Ensina a remover tudo que não é essencial e criar produtos que as pessoas amam.",
                whenToUse: ["Produto muito complexo", "Falta de diferenciação", "Design confuso", "Posicionamento genérico"],
                quote: "Simplicidade é a máxima sofisticação"
            },
            peter_thiel: {
                name: "Peter Thiel",
                icon: "🎯",
                color: "#2c3e50",
                role: "Monopólios & Estratégia",
                expertise: ["Estratégia", "Monopólios", "Zero to One", "Contrarian Thinking"],
                description: "Pensador contrário radical. Mostra como criar categorias monopolistas e vencer sem competir.",
                whenToUse: ["Mercado muito competitivo", "Precisa criar categoria nova", "Busca vantagem defensável"],
                quote: "Competição é para perdedores"
            },
            jeff_bezos: {
                name: "Jeff Bezos",
                icon: "📦",
                color: "#ff9900",
                role: "Customer Obsession",
                expertise: ["Customer Obsession", "Long-term Thinking", "Sistemas", "Escalabilidade"],
                description: "Obcecado por cliente. Ensina a construir sistemas que escalam e pensamento de longo prazo.",
                whenToUse: ["Foco no competidor vs cliente", "Pensamento curto prazo", "Falta de sistemas"],
                quote: "Somos teimosamente focados no cliente"
            },
            ray_dalio: {
                name: "Ray Dalio",
                icon: "⚖️",
                color: "#34495e",
                role: "Princípios & Sistemas",
                expertise: ["Princípios", "Transparência Radical", "Sistemas", "Meritocracia de Ideias"],
                description: "Arquiteto de princípios. Mostra como criar sistemas baseados em verdade radical e meritocracia.",
                whenToUse: ["Falta de clareza de princípios", "Decisões inconsistentes", "Cultura fraca"],
                quote: "Dor + Reflexão = Progresso"
            },
            naval_ravikant: {
                name: "Naval Ravikant",
                icon: "🚀",
                color: "#1abc9c",
                role: "Leverage & Riqueza",
                expertise: ["Leverage", "Criação de Riqueza", "Específico Knowledge", "Liberdade"],
                description: "Filósofo moderno da riqueza. Ensina leverage, specific knowledge e como construir riqueza sem sacrificar liberdade.",
                whenToUse: ["Trocar tempo por dinheiro", "Falta de leverage", "Caminho de criação de riqueza incerto"],
                quote: "Enriqueça sem ter sorte"
            }
        }
    },

    // ===== PSICOLOGIA & COMPORTAMENTO =====
    psicologia: {
        name: "Psicologia & Comportamento",
        icon: "🧠",
        color: "#9b59b6",
        minds: {
            viktor_frankl: {
                name: "Viktor Frankl",
                icon: "💫",
                color: "#9b59b6",
                role: "Sentido & Propósito",
                expertise: ["Logoterapia", "Sentido de Vida", "Resiliência", "Propósito"],
                description: "Sobrevivente de Auschwitz e pai da logoterapia. Ensina que sentido supera sofrimento.",
                whenToUse: ["Crise de sentido", "Sucesso externo mas vazio interno", "Burn-out existencial"],
                quote: "Quem tem um porquê, aguenta qualquer como"
            },
            carl_jung: {
                name: "Carl Jung",
                icon: "🎭",
                color: "#8e44ad",
                role: "Arquétipos & Sombra",
                expertise: ["Arquétipos", "Inconsciente Coletivo", "Sombra", "Individuação"],
                description: "Explorador do inconsciente. Mostra como arquétipos moldam narrativas e a importância de integrar a sombra.",
                whenToUse: ["Branding sem alma", "Mensagem que não ressoa", "Negação de aspectos escuros"],
                quote: "Até você tornar o inconsciente consciente, ele dirigirá sua vida"
            },
            daniel_kahneman: {
                name: "Daniel Kahneman",
                icon: "🧩",
                color: "#6c5ce7",
                role: "Vieses & Decisões",
                expertise: ["Vieses Cognitivos", "Sistema 1 e 2", "Heurísticas", "Decisões"],
                description: "Nobel de Economia. Revela como vieses cognitivos sabotam decisões e como mitigá-los.",
                whenToUse: ["Decisões importantes", "Padrões de erro repetidos", "Otimismo excessivo"],
                quote: "Nada na vida é tão importante quanto você pensa enquanto está pensando nisso"
            },
            robert_cialdini: {
                name: "Robert Cialdini",
                icon: "🎪",
                color: "#a29bfe",
                role: "Persuasão & Influência",
                expertise: ["Persuasão", "Influência", "Reciprocidade", "Escassez", "Autoridade"],
                description: "Cientista da persuasão. Ensina os 7 princípios que movem pessoas a dizer 'sim'.",
                whenToUse: ["Mensagem sem conversão", "Falta de autoridade", "Calls to action fracos"],
                quote: "As pessoas preferem dizer sim a quem elas conhecem e gostam"
            }
        }
    },

    // ===== FILOSOFIA & SABEDORIA =====
    filosofia: {
        name: "Filosofia & Sabedoria",
        icon: "⚡",
        color: "#d4af37",
        minds: {
            marcus_aurelius: {
                name: "Marcus Aurelius",
                icon: "🛡️",
                color: "#d4af37",
                role: "Estoicismo & Virtude",
                expertise: ["Estoicismo", "Controle Interno", "Virtude", "Adversidade"],
                description: "Imperador-filósofo. Ensina a focar no controlável, aceitar o incontrolável e agir com virtude.",
                whenToUse: ["Adversidade severa", "Reatividade emocional", "Frustração com incontrolável"],
                quote: "Você tem poder sobre sua mente, não eventos externos. Perceba isso e encontrará força"
            },
            seneca: {
                name: "Seneca",
                icon: "⏳",
                color: "#c0a062",
                role: "Tempo & Mortalidade",
                expertise: ["Tempo", "Mortalidade", "Riqueza Interior", "Estoicismo"],
                description: "Estoico radical. Mostra que tempo é nosso único recurso real e como viver com consciência da morte.",
                whenToUse: ["Procrastinação crônica", "Dispersão de foco", "Medo da morte"],
                quote: "Não é que temos pouco tempo, é que perdemos muito"
            },
            nietzsche: {
                name: "Friedrich Nietzsche",
                icon: "⚡",
                color: "#e74c3c",
                role: "Vontade de Poder",
                expertise: ["Vontade de Poder", "Autenticidade", "Übermensch", "Perspectivismo"],
                description: "Filósofo do martelo. Desafia a criar próprios valores e viver além do bem e mal convencional.",
                whenToUse: ["Conformidade excessiva", "Valores importados", "Medo de autenticidade"],
                quote: "Torne-se quem você é"
            },
            alan_watts: {
                name: "Alan Watts",
                icon: "🌊",
                color: "#16a085",
                role: "Zen & Paradoxo",
                expertise: ["Zen", "Não-dualidade", "Presente", "Paradoxos"],
                description: "Intérprete do Zen para o Ocidente. Revela paradoxos da existência e poder do momento presente.",
                whenToUse: ["Ansiedade sobre futuro", "Pensamento binário", "Busca de controle total"],
                quote: "O significado da vida é apenas estar vivo"
            }
        }
    },

    // ===== CRIATIVIDADE & ARTE =====
    criatividade: {
        name: "Criatividade & Arte",
        icon: "🎨",
        color: "#e67e22",
        minds: {
            leonardo_davinci: {
                name: "Leonardo da Vinci",
                icon: "🎨",
                color: "#e67e22",
                role: "Curiosidade & Conexões",
                expertise: ["Curiosidade", "Conexões Interdisciplinares", "Observação", "Genialidade"],
                description: "Arquétipo do gênio renascentista. Mostra como curiosidade insaciável e conexões entre campos geram inovação.",
                whenToUse: ["Bloqueio criativo", "Solução interdisciplinar necessária", "Falta de inovação"],
                quote: "Aprender nunca cansa a mente"
            },
            david_bowie: {
                name: "David Bowie",
                icon: "⭐",
                color: "#e84393",
                role: "Reinvenção & Arte",
                expertise: ["Reinvenção", "Autenticidade Artística", "Performance", "Personas"],
                description: "Camaleão da arte. Ensina reinvenção constante enquanto mantém essência autêntica.",
                whenToUse: ["Estagnação criativa", "Medo de reinvenção", "Brand cansado"],
                quote: "Não sei para onde vou, mas prometo que não será chato"
            },
            mozart: {
                name: "Wolfgang Mozart",
                icon: "🎵",
                color: "#fd79a8",
                role: "Genialidade Musical",
                expertise: ["Composição", "Disciplina Criativa", "Maestria", "Flow"],
                description: "Prodígio musical. Mostra como disciplina e prática obsessiva levam a genialidade aparentemente natural.",
                whenToUse: ["Talento sem disciplina", "Criatividade sem estrutura", "Busca de maestria"],
                quote: "A música não está nas notas, mas no silêncio entre elas"
            }
        }
    },

    // ===== CIÊNCIA & PENSAMENTO =====
    ciencia: {
        name: "Ciência & Pensamento",
        icon: "🔬",
        color: "#3498db",
        minds: {
            richard_feynman: {
                name: "Richard Feynman",
                icon: "⚛️",
                color: "#3498db",
                role: "Primeiros Princípios",
                expertise: ["Primeira Princípios", "Simplicidade", "Clareza", "Curiosidade"],
                description: "Físico brilhante. Ensina a quebrar complexidade até primeiros princípios e explicar com clareza cristalina.",
                whenToUse: ["Conceito complexo mas confuso", "Precisa explicar e não consegue", "Falsa complexidade"],
                quote: "Se você não consegue explicar de forma simples, você não entende bem o suficiente"
            },
            carl_sagan: {
                name: "Carl Sagan",
                icon: "🌌",
                color: "#4834df",
                role: "Perspectiva Cósmica",
                expertise: ["Perspectiva Cósmica", "Ceticismo Científico", "Maravilhamento", "Comunicação"],
                description: "Astrônomo visionário. Oferece perspectiva cósmica que redimensiona problemas terrestres.",
                whenToUse: ["Perda de perspectiva", "Foco excessivo em trivialidades", "Falta de maravilhamento"],
                quote: "Somos uma forma do cosmos se conhecer"
            },
            nikola_tesla: {
                name: "Nikola Tesla",
                icon: "⚡",
                color: "#2d3436",
                role: "Visão & Invenção",
                expertise: ["Visão", "Invenção", "Foco Obsessivo", "Futuro"],
                description: "Inventor visionário. Mostra como visão clara do futuro e foco obsessivo criam o impossível.",
                whenToUse: ["Falta de visão clara", "Invenção necessária", "Pensar o futuro"],
                quote: "O presente é deles; o futuro, pelo qual realmente trabalhei, é meu"
            }
        }
    },

    // ===== BILIONÁRIOS BRASILEIROS =====
    bilionarios_brasileiros: {
        name: "Bilionários Brasileiros",
        icon: "🇧🇷",
        color: "#27ae60",
        minds: {
            luiz_barsi: {
                name: "Luiz Barsi",
                icon: "💰",
                color: "#27ae60",
                role: "Investimentos de Longo Prazo",
                expertise: ["Buy and Hold", "Dividendos", "Paciência", "Disciplina"],
                description: "Rei dos dividendos. Ensina paciência, disciplina e poder dos juros compostos no longo prazo.",
                whenToUse: ["Ansiedade com investimentos", "Busca riqueza rápida", "Falta de estratégia"],
                quote: "Ação é pedaço de empresa, não é papel para especular"
            },
            jorge_paulo_lemann: {
                name: "Jorge Paulo Lemann",
                icon: "🍺",
                color: "#f39c12",
                role: "Meritocracia & Eficiência",
                expertise: ["Meritocracia", "Eficiência", "M&A", "Cultura de Performance"],
                description: "Builder de impérios. Mostra como meritocracia brutal e eficiência operacional criam gigantes.",
                whenToUse: ["Cultura sem performance", "Ineficiência operacional", "Crescimento por aquisições"],
                quote: "Sonhe grande, comece pequeno, mas acima de tudo, comece"
            }
        }
    },

    // ===== TECH VISIONÁRIOS =====
    tech_visionarios: {
        name: "Tech Visionários",
        icon: "💻",
        color: "#0984e3",
        minds: {
            elon_musk: {
                name: "Elon Musk",
                icon: "🚀",
                color: "#0984e3",
                role: "Primeiro Princípios & Visão",
                expertise: ["Primeiro Princípios", "Visão Ambiciosa", "Execução Brutal", "Multi-indústria"],
                description: "Construtor do futuro. Aplica primeiro princípios para repensar indústrias inteiras.",
                whenToUse: ["Pensamento incremental", "Medo de ambição", "Indústria engessada"],
                quote: "Quando algo é importante suficiente, você faz mesmo que as probabilidades não estejam a seu favor"
            },
            sam_altman: {
                name: "Sam Altman",
                icon: "🤖",
                color: "#6c5ce7",
                role: "Startups & IA",
                expertise: ["Startups", "IA", "Product-Market Fit", "Fundraising"],
                description: "Líder da revolução de IA. Ensina a construir startups que escalam e navegar a era da IA.",
                whenToUse: ["Building startup", "IA strategy", "Fundraising", "PMF unclear"],
                quote: "Faça algo que as pessoas querem"
            }
        }
    }
};

// ===== COMANDOS DISPONÍVEIS =====
const COMMANDS = {
    "/invocar": {
        description: "Invoca uma mente específica",
        usage: "/invocar [nome_da_mente]",
        examples: ["/invocar steve_jobs", "/invocar viktor_frankl"]
    },
    "/mesa": {
        description: "Cria uma mesa redonda sobre um tema",
        usage: "/mesa [tema]",
        examples: ["/mesa reposicionamento de marca", "/mesa propósito de vida"]
    },
    "/debate": {
        description: "Debate entre duas mentes",
        usage: "/debate [mente1] vs [mente2] sobre [tema]",
        examples: ["/debate nietzsche vs marcus_aurelius sobre poder"]
    },
    "/auto": {
        description: "Seleção automática de mentes para seu problema",
        usage: "/auto [seu_problema]",
        examples: ["/auto preciso repensar meu negócio"]
    },
    "/doug": {
        description: "Doug original - brutalidade máxima",
        usage: "/doug",
        examples: ["/doug"]
    },
    "/mentes": {
        description: "Lista todas as mentes disponíveis",
        usage: "/mentes",
        examples: ["/mentes"]
    },
    "/sobre": {
        description: "Informações sobre uma mente específica",
        usage: "/sobre [nome_da_mente]",
        examples: ["/sobre steve_jobs"]
    },
    "/historico": {
        description: "Mentes consultadas nesta sessão",
        usage: "/historico",
        examples: ["/historico"]
    },
    "/reset": {
        description: "Reinicia a sessão",
        usage: "/reset",
        examples: ["/reset"]
    },
    "/help": {
        description: "Mostra todos os comandos",
        usage: "/help",
        examples: ["/help"]
    }
};

// ===== DOUG FACILITATOR =====
const DOUG_FACILITATOR = {
    name: "Doug",
    icon: "🔥",
    color: "#ff4500",
    role: "Facilitador da Roda",
    personality: "Brutal, direto, focado em ação, não aceita desculpas",
    phrases: [
        "*Doug esmurra a mesa*",
        "*Doug encara*",
        "*Doug não está impressionado*",
        "*Doug corta a enrolação*",
        "*Doug retorna ao centro*"
    ],
    commandStyle: "Militar, com prazos curtos, sem piedade"
};

// ===== HELPER FUNCTIONS =====

// Get all minds as flat array
function getAllMinds() {
    const allMinds = [];
    Object.values(MINDS_DATABASE).forEach(category => {
        Object.entries(category.minds).forEach(([key, mind]) => {
            allMinds.push({ key, ...mind, category: category.name });
        });
    });
    return allMinds;
}

// Find mind by key
function findMind(mindKey) {
    for (const category of Object.values(MINDS_DATABASE)) {
        if (category.minds[mindKey]) {
            return category.minds[mindKey];
        }
    }
    return null;
}

// Get random minds from category
function getRandomMindsFromCategory(categoryKey, count = 1) {
    const category = MINDS_DATABASE[categoryKey];
    if (!category) return [];

    const minds = Object.entries(category.minds);
    const shuffled = minds.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(([key, mind]) => ({ key, ...mind }));
}

// Get minds by expertise
function getMindsByExpertise(expertise) {
    return getAllMinds().filter(mind =>
        mind.expertise.some(exp =>
            exp.toLowerCase().includes(expertise.toLowerCase())
        )
    );
}

// Format mind for display
function formatMindCard(mind) {
    return `
        <div class="mind-card" data-mind="${mind.key}" style="border-left: 3px solid ${mind.color}">
            <div class="mind-avatar" style="background: ${mind.color}">
                <span>${mind.icon}</span>
            </div>
            <div class="mind-info">
                <h4>${mind.name}</h4>
                <p>${mind.role}</p>
            </div>
        </div>
    `;
}
