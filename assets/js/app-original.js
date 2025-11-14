// =====================================================
// RODA DE MENTES - MAIN APPLICATION
// Sistema de Chat Interativo com 34 Aprimoramentos
// =====================================================

class RodaDeMentesApp {
    constructor() {
        this.authenticated = false;
        this.currentTheme = 'dark';
        this.messages = [];
        this.activeMindsSummary = ['doug'];
        this.consultedMinds = [];
        this.messageHistory = [];
        this.typingTimeout = null;

        this.init();
    }

    // ===== INITIALIZATION =====
    init() {
        this.loadFromLocalStorage();
        this.bindAuthEvents();
        this.bindMainAppEvents();
        this.initializeTheme();
    }

    loadFromLocalStorage() {
        const savedTheme = localStorage.getItem('rodamentes_theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }

        const savedMessages = localStorage.getItem('rodamentes_messages');
        if (savedMessages) {
            try {
                this.messages = JSON.parse(savedMessages);
            } catch (e) {
                this.messages = [];
            }
        }

        const savedMinds = localStorage.getItem('rodamentes_consulted');
        if (savedMinds) {
            try {
                this.consultedMinds = JSON.parse(savedMinds);
            } catch (e) {
                this.consultedMinds = [];
            }
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('rodamentes_theme', this.currentTheme);
        localStorage.setItem('rodamentes_messages', JSON.stringify(this.messages.slice(-100))); // Keep last 100
        localStorage.setItem('rodamentes_consulted', JSON.stringify(this.consultedMinds));
    }

    // ===== AUTHENTICATION =====
    bindAuthEvents() {
        const authInput = document.getElementById('auth-input');
        const authSubmit = document.getElementById('auth-submit');
        const authError = document.getElementById('auth-error');

        const authenticate = () => {
            const password = authInput.value.trim();

            if (password === '9091') {
                this.authenticated = true;
                this.showMainApp();
            } else {
                authError.textContent = 'Senha incorreta. Tente novamente.';
                authInput.value = '';
                authInput.classList.add('shake');
                setTimeout(() => authInput.classList.remove('shake'), 500);
            }
        };

        authSubmit.addEventListener('click', authenticate);

        authInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                authenticate();
            }
        });

        // Focus on input
        authInput.focus();
    }

    showMainApp() {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');

        // Send welcome message
        setTimeout(() => {
            this.addDougMessage(
                `*Doug esmurra a mesa*\n\n` +
                `FINALMENTE. Você desbloqueou a Roda de Mentes.\n\n` +
                `Aqui não tem enrolação. Você tem acesso a 19 mentes incríveis - ` +
                `de Steve Jobs a Viktor Frankl, de Marcus Aurelius a Elon Musk.\n\n` +
                `**Comandos rápidos:**\n` +
                `• Digite \`/mentes\` para ver todos disponíveis\n` +
                `• Digite \`/invocar [nome]\` para chamar uma mente específica\n` +
                `• Digite \`/mesa [tema]\` para uma mesa redonda\n` +
                `• Ou simplesmente **descreva seu problema** que eu seleciono as mentes certas\n\n` +
                `*Doug encara*\n\n` +
                `Qual é seu problema REAL hoje?`,
                true
            );
        }, 500);
    }

    initializeTheme() {
        const body = document.body;
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${this.currentTheme}-theme`);

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ===== MAIN APP EVENTS =====
    bindMainAppEvents() {
        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Mobile menu toggle
        document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });

        // Command chips
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const command = chip.dataset.command;
                this.handleCommandChipClick(command);
            });
        });

        // Message input
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');

        messageInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }

            // Autocomplete for commands
            if (e.key === '/') {
                this.showAutocomplete();
            }
        });

        messageInput?.addEventListener('input', () => {
            this.handleInputChange();
        });

        sendBtn?.addEventListener('click', () => {
            this.sendMessage();
        });

        // Emoji button
        document.getElementById('emoji-btn')?.addEventListener('click', () => {
            this.showEmojiPicker();
        });

        // Round table view
        document.getElementById('round-table-view-btn')?.addEventListener('click', () => {
            this.showRoundTableModal();
        });

        // Export chat
        document.getElementById('export-chat-btn')?.addEventListener('click', () => {
            this.exportChat();
        });

        // Info panel
        document.getElementById('info-btn')?.addEventListener('click', () => {
            this.toggleRightPanel();
        });

        // Close panel
        document.getElementById('close-panel-btn')?.addEventListener('click', () => {
            this.toggleRightPanel();
        });

        // Modal closers
        document.getElementById('close-round-table')?.addEventListener('click', () => {
            this.closeModal('round-table-modal');
        });

        document.getElementById('close-minds-modal')?.addEventListener('click', () => {
            this.closeModal('minds-modal');
        });

        // Overlay click to close
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // New chat
        document.getElementById('new-chat-btn')?.addEventListener('click', () => {
            if (confirm('Iniciar nova conversa? O histórico atual será salvo.')) {
                this.newChat();
            }
        });

        // Search
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            this.searchMessages(e.target.value);
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Initialize minds grid
        this.populateMindsGrid();
    }

    // ===== THEME MANAGEMENT =====
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.initializeTheme();
        this.saveToLocalStorage();

        // Smooth transition
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // ===== MESSAGE HANDLING =====
    sendMessage() {
        const input = document.getElementById('message-input');
        const text = input.textContent.trim();

        if (!text) return;

        // Add user message
        this.addMessage({
            type: 'sent',
            sender: 'Você',
            text: text,
            timestamp: new Date()
        });

        // Clear input
        input.textContent = '';

        // Play send sound
        this.playSound('send');

        // Process message
        this.processMessage(text);
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
        this.updateStats();
        this.saveToLocalStorage();
    }

    renderMessage(message) {
        const container = document.getElementById('messages-container');

        // Remove welcome message if exists
        const welcome = container.querySelector('.welcome-message');
        if (welcome) {
            welcome.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.style.background = message.color || '#00a884';
        avatar.innerHTML = message.icon || '<i class="fas fa-user"></i>';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        if (message.type === 'received') {
            const header = document.createElement('div');
            header.className = 'message-header';

            const sender = document.createElement('div');
            sender.className = 'message-sender';
            sender.style.color = message.color || '#00a884';
            sender.textContent = message.sender;

            header.appendChild(sender);
            bubble.appendChild(header);
        }

        const text = document.createElement('div');
        text.className = 'message-text';
        text.innerHTML = this.formatMessageText(message.text);

        bubble.appendChild(text);

        const footer = document.createElement('div');
        footer.className = 'message-footer';

        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp);

        footer.appendChild(time);

        if (message.type === 'sent') {
            const status = document.createElement('i');
            status.className = 'fas fa-check-double message-status read';
            footer.appendChild(status);
        }

        bubble.appendChild(footer);
        content.appendChild(bubble);

        // Message actions
        const actions = document.createElement('div');
        actions.className = 'message-actions';
        actions.innerHTML = `
            <button class="message-action-btn" title="Reagir">
                <i class="fas fa-heart"></i>
            </button>
            <button class="message-action-btn" title="Responder">
                <i class="fas fa-reply"></i>
            </button>
            <button class="message-action-btn" title="Copiar">
                <i class="fas fa-copy"></i>
            </button>
        `;

        // Bind action events
        const buttons = actions.querySelectorAll('.message-action-btn');
        buttons[0].addEventListener('click', () => this.reactToMessage(message));
        buttons[1].addEventListener('click', () => this.replyToMessage(message));
        buttons[2].addEventListener('click', () => this.copyMessage(message));

        content.appendChild(actions);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        container.appendChild(messageDiv);
    }

    formatMessageText(text) {
        // Convert markdown-like formatting
        let formatted = text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italic
            .replace(/`(.+?)`/g, '<code>$1</code>') // Inline code
            .replace(/\n/g, '<br>'); // Line breaks

        // Convert URLs to links
        formatted = formatted.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank">$1</a>'
        );

        return formatted;
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    scrollToBottom() {
        const container = document.getElementById('messages-container');
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }

    // ===== MESSAGE PROCESSING =====
    async processMessage(text) {
        // Show typing indicator
        this.showTypingIndicator();

        // Determine if it's a command
        if (text.startsWith('/')) {
            await this.handleCommand(text);
        } else {
            // Auto-select minds based on message content
            await this.handleAutoResponse(text);
        }

        // Hide typing indicator
        this.hideTypingIndicator();
    }

    async handleCommand(commandText) {
        const parts = commandText.toLowerCase().split(' ');
        const command = parts[0];

        await this.delay(1000); // Simulate processing

        switch (command) {
            case '/mentes':
                this.showAllMinds();
                break;

            case '/invocar':
                const mindKey = parts[1];
                this.invokeMind(mindKey, parts.slice(2).join(' '));
                break;

            case '/mesa':
                const theme = parts.slice(1).join(' ');
                this.createRoundTable(theme);
                break;

            case '/debate':
                this.createDebate(commandText);
                break;

            case '/auto':
                const problem = parts.slice(1).join(' ');
                this.autoSelectMinds(problem);
                break;

            case '/doug':
                this.activateDougOnly();
                break;

            case '/sobre':
                const aboutMind = parts[1];
                this.showMindInfo(aboutMind);
                break;

            case '/historico':
                this.showHistory();
                break;

            case '/reset':
                this.resetSession();
                break;

            case '/help':
                this.showHelp();
                break;

            default:
                this.addDougMessage(
                    `*Doug franze a testa*\n\n` +
                    `Comando desconhecido: ${command}\n\n` +
                    `Digite \`/help\` para ver todos os comandos disponíveis.`
                );
        }
    }

    async handleAutoResponse(text) {
        await this.delay(1500);

        // Simple keyword detection for demo
        const keywords = {
            'produto': ['steve_jobs', 'jeff_bezos'],
            'design': ['steve_jobs', 'leonardo_davinci'],
            'propósito': ['viktor_frankl', 'marcus_aurelius'],
            'estratégia': ['peter_thiel', 'ray_dalio'],
            'criatividade': ['leonardo_davinci', 'david_bowie'],
            'investimento': ['luiz_barsi', 'naval_ravikant']
        };

        let selectedMinds = null;

        for (const [keyword, minds] of Object.entries(keywords)) {
            if (text.toLowerCase().includes(keyword)) {
                selectedMinds = minds;
                break;
            }
        }

        if (selectedMinds) {
            this.createRoundTable(text, selectedMinds);
        } else {
            // Default Doug response
            this.addDougMessage(
                `*Doug analisa sua questão*\n\n` +
                `"${text}"\n\n` +
                `Interessante. Deixa eu convocar as mentes certas para isso.\n\n` +
                `**Vou trazer:**\n` +
                `• **Steve Jobs** - Para trazer clareza e simplicidade\n` +
                `• **Viktor Frankl** - Para explorar o sentido profundo\n` +
                `• **Peter Thiel** - Para pensar estrategicamente\n\n` +
                `*Doug prepara a mesa redonda*`
            );

            await this.delay(1000);
            this.simulateRoundTableResponse(['steve_jobs', 'viktor_frankl', 'peter_thiel'], text);
        }
    }

    // ===== COMMAND HANDLERS =====
    showAllMinds() {
        document.getElementById('minds-modal').classList.remove('hidden');
        this.populateMindsLibrary();
    }

    invokeMind(mindKey, question) {
        const mind = findMind(mindKey);

        if (!mind) {
            this.addDougMessage(
                `*Doug revira os olhos*\n\n` +
                `Mente "${mindKey}" não encontrada.\n\n` +
                `Digite \`/mentes\` para ver todos disponíveis.`
            );
            return;
        }

        // Add to consulted minds
        if (!this.consultedMinds.includes(mindKey)) {
            this.consultedMinds.push(mindKey);
            this.saveToLocalStorage();
        }

        // Add to active minds
        if (!this.activeMindsSummary.includes(mindKey)) {
            this.activeMindsSummary.push(mindKey);
            this.updateActiveMindsList();
        }

        this.addDougMessage(
            `*Doug convoca ${mind.name}*\n\n` +
            `"${mind.name}, sua expertise em ${mind.expertise.join(', ')} é necessária."\n\n` +
            `*${mind.name} entra na roda*`
        );

        setTimeout(() => {
            this.addMindMessage(
                mind,
                this.generateMindResponse(mind, question || 'apresentação')
            );
        }, 1000);
    }

    createRoundTable(theme, mindKeys = null) {
        if (!mindKeys) {
            // Auto-select 3-5 minds based on theme
            mindKeys = this.selectMindsForTheme(theme);
        }

        const minds = mindKeys.map(key => findMind(key)).filter(m => m);

        if (minds.length === 0) {
            this.addDougMessage('*Doug está confuso* - Não consegui selecionar mentes para esse tema.');
            return;
        }

        this.addDougMessage(
            `*Doug esmurra a mesa*\n\n` +
            `Mesa redonda sobre: **${theme}**\n\n` +
            `Mentes convocadas:\n` +
            minds.map(m => `• **${m.name}** - ${m.role}`).join('\n') +
            `\n\n*Doug modera a discussão*`
        );

        // Simulate round table
        setTimeout(() => {
            this.simulateRoundTableResponse(mindKeys, theme);
        }, 1500);
    }

    simulateRoundTableResponse(mindKeys, theme) {
        mindKeys.forEach((key, index) => {
            const mind = findMind(key);
            if (!mind) return;

            setTimeout(() => {
                this.addMindMessage(
                    mind,
                    this.generateMindResponse(mind, theme)
                );

                // Doug synthesis at the end
                if (index === mindKeys.length - 1) {
                    setTimeout(() => {
                        this.addDougMessage(
                            `*Doug retorna ao centro*\n\n` +
                            `Você ouviu ${mindKeys.length} perspectivas diferentes.\n\n` +
                            `**Síntese brutal:**\n` +
                            `Cada mente te deu uma peça. Agora você precisa EXECUTAR.\n\n` +
                            `**Seus comandos - 7 dias:**\n` +
                            `1. Escolha a perspectiva que mais ressoa\n` +
                            `2. Crie um plano de ação concreto\n` +
                            `3. Execute os primeiros 3 passos HOJE\n` +
                            `4. Reporte resultados aqui\n\n` +
                            `*Doug encara*\n\n` +
                            `Sabedoria sem ação é desperdício. EXECUTE.`
                        );
                    }, 2000);
                }
            }, (index + 1) * 2000);
        });
    }

    generateMindResponse(mind, topic) {
        // Generate contextual response based on mind's personality
        const responses = {
            steve_jobs: `Olhe para isso através da lente da **simplicidade**.\n\nVocê está complicando demais. ${topic} precisa de CLAREZA.\n\n**Meu conselho:** Remova 80% e mantenha apenas o essencial que importa. Design é eliminar, não adicionar.`,

            viktor_frankl: `A questão mais profunda aqui é: **qual o sentido?**\n\nEm Auschwitz, aprendi que ${topic} só tem valor quando conectado a um propósito maior que você.\n\n**Reflita:** Por que isso importa? Para quem? Qual legado você quer deixar?`,

            marcus_aurelius: `Como imperador, aprendi que sobre ${topic}, você controla apenas sua resposta.\n\n**Sabedoria estoica:** Foque no que está sob seu controle. Aceite o que não está. Aja com virtude.\n\nA adversidade é o teste do caráter.`,

            peter_thiel: `Todos estão pensando em ${topic} de forma incremental. **Erro fatal.**\n\nPergunte: Como criar uma categoria onde você é o ÚNICO? Como construir um monopólio?\n\nCompetição é para perdedores. Crie algo novo.`,

            leonardo_davinci: `${topic} é fascinante quando você vê as **conexões ocultas**.\n\nNão pense linearmente. Olhe para natureza, arte, matemática, ciência. A inovação está nas intersecções.\n\n**Exercício:** Como 3 campos diferentes podem iluminar isso?`,

            richard_feynman: `Se você não consegue explicar ${topic} de forma simples, não entende.\n\n**Primeiros princípios:** Quebre até os fundamentos. Elimine jargão. Explique como para uma criança.\n\nComplexidade é preguiça intelectual.`,

            jeff_bezos: `A pergunta sobre ${topic} é: **isso é bom para o cliente?**\n\nEsqueça o competidor. Foque obsessivamente no cliente. Pense longo prazo. Construa sistemas.\n\nClientes não são leais a empresas, são leais a experiências.`,

            elon_musk: `Todos dizem que ${topic} não pode ser feito. **Perfeito.**\n\nQuebrei isso em primeiro princípios. Física diz que é possível? Então é apenas engenharia.\n\n**Ação:** Pense do zero. Ignore "sempre foi assim". Construa o futuro.`
        };

        return responses[mind.key] || `Como ${mind.name}, vejo ${topic} através de ${mind.expertise[0]}. Minha perspectiva é única neste tema.`;
    }

    selectMindsForTheme(theme) {
        // Simple selection logic - can be enhanced
        const defaultMinds = ['steve_jobs', 'viktor_frankl', 'peter_thiel'];
        return defaultMinds;
    }

    addDougMessage(text, isWelcome = false) {
        this.addMessage({
            type: 'received',
            sender: 'Doug',
            icon: '🔥',
            color: '#ff4500',
            text: text,
            timestamp: new Date()
        });

        if (!isWelcome) {
            this.playSound('notification');
        }
    }

    addMindMessage(mind, text) {
        this.addMessage({
            type: 'received',
            sender: mind.name,
            icon: mind.icon,
            color: mind.color,
            text: text,
            timestamp: new Date()
        });

        this.playSound('notification');
    }

    showHelp() {
        let helpText = `**📖 COMANDOS DISPONÍVEIS**\n\n`;

        Object.entries(COMMANDS).forEach(([cmd, info]) => {
            helpText += `**${cmd}**\n${info.description}\n_Uso: ${info.usage}_\n\n`;
        });

        this.addDougMessage(helpText);
    }

    showHistory() {
        if (this.consultedMinds.length === 0) {
            this.addDougMessage('Nenhuma mente consultada ainda nesta sessão.');
            return;
        }

        const minds = this.consultedMinds.map(key => findMind(key)).filter(m => m);

        let historyText = `**🧠 MENTES CONSULTADAS NESTA SESSÃO**\n\n`;
        minds.forEach(mind => {
            historyText += `• ${mind.icon} **${mind.name}** - ${mind.role}\n`;
        });

        this.addDougMessage(historyText);
    }

    showMindInfo(mindKey) {
        const mind = findMind(mindKey);

        if (!mind) {
            this.addDougMessage(`Mente "${mindKey}" não encontrada.`);
            return;
        }

        const infoText = `
**${mind.icon} ${mind.name}**\n
**Role:** ${mind.role}\n
**Expertise:** ${mind.expertise.join(', ')}\n\n
**Descrição:**\n${mind.description}\n\n
**Quando usar:**\n${mind.whenToUse.map(w => `• ${w}`).join('\n')}\n\n
**Quote:**\n_"${mind.quote}"_
        `;

        this.addDougMessage(infoText);
    }

    activateDougOnly() {
        this.activeMindsSummary = ['doug'];
        this.updateActiveMindsList();

        this.addDougMessage(
            `*Doug esmurra a mesa com FORÇA*\n\n` +
            `FINALMENTE. Só você e eu. Sem filtros.\n\n` +
            `Modo DOUG PURO ativado. Brutalidade máxima. Zero enrolação.\n\n` +
            `Qual é o problema REAL que você está evitando enfrentar?`
        );
    }

    resetSession() {
        if (!confirm('Tem certeza? Todo o histórico será perdido.')) {
            return;
        }

        this.messages = [];
        this.consultedMinds = [];
        this.activeMindsSummary = ['doug'];

        localStorage.removeItem('rodamentes_messages');
        localStorage.removeItem('rodamentes_consulted');

        // Reload page
        window.location.reload();
    }

    newChat() {
        const container = document.getElementById('messages-container');
        container.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fas fa-brain"></i>
                </div>
                <h2>Nova Conversa</h2>
                <p>Como posso ajudar hoje?</p>
            </div>
        `;

        this.messages = [];
        this.updateStats();
    }

    // ===== UI HELPERS =====
    showTypingIndicator(mindName = 'Doug') {
        const indicator = document.getElementById('typing-indicator');
        const text = indicator.querySelector('.typing-text');
        text.textContent = `${mindName} está digitando...`;
        indicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.add('hidden');
    }

    handleCommandChipClick(command) {
        const input = document.getElementById('message-input');
        input.textContent = command + ' ';
        input.focus();

        // Move cursor to end
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(input.childNodes[0], input.textContent.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    handleInputChange() {
        const input = document.getElementById('message-input');
        const text = input.textContent;

        // Show autocomplete if starts with /
        if (text.startsWith('/') && text.length > 1) {
            this.showAutocomplete(text);
        } else {
            this.hideAutocomplete();
        }
    }

    showAutocomplete(partialCommand = '/') {
        const suggestions = document.getElementById('autocomplete-suggestions');
        const matches = Object.entries(COMMANDS).filter(([cmd]) =>
            cmd.startsWith(partialCommand.toLowerCase())
        );

        if (matches.length === 0) {
            this.hideAutocomplete();
            return;
        }

        suggestions.innerHTML = matches.map(([cmd, info]) => `
            <div class="suggestion-item" data-command="${cmd}">
                <div class="suggestion-icon">
                    <i class="fas fa-terminal"></i>
                </div>
                <div class="suggestion-text">
                    <div class="suggestion-title">${cmd}</div>
                    <div class="suggestion-desc">${info.description}</div>
                </div>
            </div>
        `).join('');

        // Bind click events
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const cmd = item.dataset.command;
                const input = document.getElementById('message-input');
                input.textContent = cmd + ' ';
                input.focus();
                this.hideAutocomplete();
            });
        });

        suggestions.classList.remove('hidden');
    }

    hideAutocomplete() {
        document.getElementById('autocomplete-suggestions').classList.add('hidden');
    }

    showEmojiPicker() {
        // Simple emoji picker - can be enhanced with a library
        const emojis = ['😊', '❤️', '👍', '🔥', '💡', '✨', '🎯', '🚀', '💪', '🧠'];
        const picker = document.createElement('div');
        picker.className = 'emoji-picker';
        picker.style.cssText = `
            position: absolute;
            bottom: 70px;
            right: 60px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 12px;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
            box-shadow: var(--shadow-md);
            z-index: 100;
        `;

        emojis.forEach(emoji => {
            const btn = document.createElement('button');
            btn.textContent = emoji;
            btn.style.cssText = `
                font-size: 24px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                border-radius: 8px;
                transition: background 0.15s;
            `;
            btn.addEventListener('click', () => {
                const input = document.getElementById('message-input');
                input.textContent += emoji;
                input.focus();
                picker.remove();
            });
            picker.appendChild(btn);
        });

        document.querySelector('.message-input-container').appendChild(picker);

        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', function closeEmoji(e) {
                if (!picker.contains(e.target) && e.target.id !== 'emoji-btn') {
                    picker.remove();
                    document.removeEventListener('click', closeEmoji);
                }
            });
        }, 100);
    }

    toggleRightPanel() {
        document.getElementById('right-panel').classList.toggle('hidden');
    }

    showRoundTableModal() {
        const modal = document.getElementById('round-table-modal');
        modal.classList.remove('hidden');

        // Position minds in circle
        this.arrangeMindsInCircle();
    }

    arrangeMindsInCircle() {
        const circle = document.getElementById('minds-circle');
        const minds = this.activeMindsSummary.filter(m => m !== 'doug').map(key => findMind(key)).filter(m => m);

        if (minds.length === 0) {
            circle.innerHTML = '<p style="text-align: center; color: var(--text-secondary); margin-top: 200px;">Nenhuma mente ativa além de Doug</p>';
            return;
        }

        circle.innerHTML = '';

        const radius = 250;
        const centerX = 300;
        const centerY = 300;
        const angleStep = (2 * Math.PI) / minds.length;

        minds.forEach((mind, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const seat = document.createElement('div');
            seat.className = 'mind-seat';
            seat.style.cssText = `
                left: ${x - 40}px;
                top: ${y - 40}px;
                background: ${mind.color};
            `;
            seat.innerHTML = `
                <i>${mind.icon}</i>
                <span>${mind.name}</span>
            `;

            circle.appendChild(seat);
        });
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    updateActiveMindsList() {
        const list = document.getElementById('active-minds-list');

        const minds = this.activeMindsSummary.map(key => {
            if (key === 'doug') {
                return DOUG_FACILITATOR;
            }
            return findMind(key);
        }).filter(m => m);

        list.innerHTML = minds.map(mind => `
            <div class="active-mind">
                <div class="mind-avatar" style="background: ${mind.color}">
                    ${mind.icon}
                </div>
                <div class="mind-info">
                    <span class="mind-name">${mind.name}</span>
                    <span class="mind-role">${mind.role}</span>
                </div>
                <span class="status-dot online"></span>
            </div>
        `).join('');
    }

    populateMindsGrid() {
        const grid = document.getElementById('minds-grid');
        const allMinds = getAllMinds().slice(0, 10); // First 10 for panel

        grid.innerHTML = allMinds.map(mind => `
            <div class="mind-card" data-mind="${mind.key}" style="cursor: pointer;">
                <div style="font-size: 24px; margin-bottom: 8px;">${mind.icon}</div>
                <span style="font-size: 12px;">${mind.name}</span>
            </div>
        `).join('');

        // Bind click events
        grid.querySelectorAll('.mind-card').forEach(card => {
            card.addEventListener('click', () => {
                const mindKey = card.dataset.mind;
                this.invokeMind(mindKey, '');
                this.toggleRightPanel();
            });
        });
    }

    populateMindsLibrary() {
        const container = document.getElementById('minds-categories');

        container.innerHTML = Object.entries(MINDS_DATABASE).map(([key, category]) => `
            <div class="category-section">
                <div class="category-header">
                    <div class="category-icon" style="background: ${category.color}">
                        ${category.icon}
                    </div>
                    <div class="category-title">
                        <h3>${category.name}</h3>
                        <p>${Object.keys(category.minds).length} mentes disponíveis</p>
                    </div>
                </div>
                <div class="category-minds">
                    ${Object.entries(category.minds).map(([mindKey, mind]) => `
                        <div class="mind-item" data-mind="${mindKey}">
                            <div class="mind-item-header">
                                <div class="mind-item-avatar" style="background: ${mind.color}">
                                    ${mind.icon}
                                </div>
                                <div class="mind-item-name">${mind.name}</div>
                            </div>
                            <div class="mind-item-desc">${mind.role}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Bind click events
        container.querySelectorAll('.mind-item').forEach(item => {
            item.addEventListener('click', () => {
                const mindKey = item.dataset.mind;
                this.closeAllModals();
                setTimeout(() => {
                    this.invokeMind(mindKey, '');
                }, 300);
            });
        });
    }

    updateStats() {
        document.getElementById('total-messages').textContent = this.messages.length;
        document.getElementById('minds-consulted').textContent = this.consultedMinds.length || 1;
    }

    // ===== MESSAGE ACTIONS =====
    reactToMessage(message) {
        alert('Funcionalidade de reação em desenvolvimento!');
    }

    replyToMessage(message) {
        const input = document.getElementById('message-input');
        input.textContent = `> ${message.text.substring(0, 50)}...\n\n`;
        input.focus();
    }

    copyMessage(message) {
        navigator.clipboard.writeText(message.text);

        // Show toast
        this.showToast('Mensagem copiada!');
    }

    // ===== QUICK ACTIONS =====
    handleQuickAction(action) {
        switch (action) {
            case 'voice':
                alert('Funcionalidade de voz em desenvolvimento!');
                break;
            case 'gif':
                alert('GIF picker em desenvolvimento!');
                break;
            case 'poll':
                this.createPoll();
                break;
        }
    }

    createPoll() {
        const pollText = prompt('Digite a pergunta da enquete:');
        if (!pollText) return;

        const options = [];
        for (let i = 1; i <= 3; i++) {
            const option = prompt(`Opção ${i} (deixe vazio para finalizar):`);
            if (!option) break;
            options.push(option);
        }

        if (options.length < 2) {
            alert('É necessário pelo menos 2 opções!');
            return;
        }

        this.addMessage({
            type: 'sent',
            sender: 'Você',
            text: `📊 **Enquete:** ${pollText}\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`,
            timestamp: new Date()
        });
    }

    // ===== EXPORT =====
    exportChat() {
        const content = this.messages.map(msg =>
            `[${this.formatTime(msg.timestamp)}] ${msg.sender}: ${msg.text}`
        ).join('\n\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rodamentes-chat-${Date.now()}.txt`;
        a.click();

        this.showToast('Chat exportado!');
    }

    searchMessages(query) {
        if (!query) {
            // Show all messages
            document.querySelectorAll('.message').forEach(msg => {
                msg.style.display = '';
            });
            return;
        }

        const lowerQuery = query.toLowerCase();
        document.querySelectorAll('.message').forEach(msg => {
            const text = msg.textContent.toLowerCase();
            msg.style.display = text.includes(lowerQuery) ? '' : 'none';
        });
    }

    // ===== UTILITIES =====
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    playSound(soundName) {
        try {
            const audio = document.getElementById(`${soundName}-sound`);
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => { }); // Ignore errors
            }
        } catch (e) {
            // Ignore sound errors
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-md);
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    createDebate(commandText) {
        // Parse: /debate mind1 vs mind2 sobre tema
        const match = commandText.match(/\/debate\s+(\w+)\s+vs\s+(\w+)\s+sobre\s+(.+)/i);

        if (!match) {
            this.addDougMessage(
                'Formato incorreto. Use: `/debate mind1 vs mind2 sobre tema`\n\n' +
                'Exemplo: `/debate nietzsche vs marcus_aurelius sobre poder`'
            );
            return;
        }

        const [_, mind1Key, mind2Key, tema] = match;
        const mind1 = findMind(mind1Key);
        const mind2 = findMind(mind2Key);

        if (!mind1 || !mind2) {
            this.addDougMessage('Uma ou ambas as mentes não foram encontradas.');
            return;
        }

        this.addDougMessage(
            `*Doug prepara o ringue*\n\n` +
            `**DEBATE:** ${mind1.name} vs ${mind2.name}\n` +
            `**Tema:** ${tema}\n\n` +
            `Que comecem os argumentos.\n\n` +
            `*Doug toca o sino*`
        );

        // Simulate debate
        setTimeout(() => {
            this.addMindMessage(mind1, `*${mind1.name} abre o debate*\n\nSobre ${tema}, minha posição é clara...`);
        }, 1500);

        setTimeout(() => {
            this.addMindMessage(mind2, `*${mind2.name} contra-argumenta*\n\nRespeitosamente discordo. ${tema} deve ser visto de outra forma...`);
        }, 3500);

        setTimeout(() => {
            this.addDougMessage(
                `*Doug interrompe*\n\n` +
                `Duas perspectivas poderosas. Agora **VOCÊ** decide.\n\n` +
                `Qual argumento ressoa mais? Como você vai usar isso?\n\n` +
                `Escolha e EXECUTE.`
            );
        }, 5500);
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    window.app = new RodaDeMentesApp();
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K - Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
    }

    // Ctrl/Cmd + N - New chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        window.app?.newChat();
    }

    // Ctrl/Cmd + E - Export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        window.app?.exportChat();
    }

    // Esc - Close modals
    if (e.key === 'Escape') {
        window.app?.closeAllModals();
        window.app?.hideAutocomplete();
    }
});
