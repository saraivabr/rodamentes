# 🔧 Notas de Integração - OpenRouter & Features Disruptivas

## ✅ O que foi implementado

Todos os módulos core estão prontos e funcionais:

1. ✅ `assets/js/config.js` - Configurações centralizadas
2. ✅ `assets/js/openrouter-api.js` - Cliente OpenRouter com streaming
3. ✅ `assets/js/voice-engine.js` - Voice input/output
4. ✅ `assets/js/disruptive-features.js` - Features avançadas
5. ✅ `assets/css/styles-mobile-first.css` - CSS responsivo
6. ✅ `manifest.json` + `sw.js` - PWA
7. ✅ `index.html` - Atualizado com novos scripts
8. ✅ `.env.example` - Template de configuração

## 🔨 Próximos Passos de Integração

O `app.js` original foi preservado em `app-original.js`. Para integrar completamente:

### Opção 1: Integração Manual no app.js existente

Adicione ao construtor da classe `RodaDeMentesApp`:

```javascript
constructor() {
    // ... código existente ...

    // NOVO: Inicializar engines
    this.openRouter = new OpenRouterClient();
    this.voiceEngine = new VoiceEngine();
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.suggestions = new ContextualSuggestions();
    this.gamification = new GamificationEngine();
    this.exportEngine = new ExportEngine();

    // Verificar API key
    this.checkAPIKey();
}
```

Adicione novos métodos:

```javascript
// Verificar se tem API key configurada
checkAPIKey() {
    if (!this.openRouter.hasApiKey()) {
        this.showAPIKeyPrompt();
    }
}

// Mostrar prompt para configurar API key
showAPIKeyPrompt() {
    const apiKey = prompt(
        '🔑 Configure sua OpenRouter API Key\n\n' +
        'Obtenha em: https://openrouter.ai/\n\n' +
        'Cole sua API key:'
    );

    if (apiKey) {
        this.openRouter.setApiKey(apiKey);
        this.showToast('✅ API Key configurada!');
    }
}

// Substituir processMessage para usar OpenRouter
async processMessage(text) {
    // Mostrar typing
    this.showTypingIndicator();

    // Análise de sentimento
    const sentiment = this.sentimentAnalyzer.analyze(text);
    console.log('Sentiment:', sentiment);

    // Verificar comandos
    if (text.startsWith('/')) {
        await this.handleCommand(text);
    } else {
        // Usar OpenRouter em vez de respostas simuladas
        await this.handleAIResponse(text, sentiment);
    }

    this.hideTypingIndicator();
}

// Processar resposta com AI real
async handleAIResponse(text, sentiment) {
    // Selecionar mente baseado em sentimento
    const suggestedMinds = sentiment.isUrgent
        ? ['doug', 'marcus_aurelius']
        : ['doug'];

    const mindKey = suggestedMinds[0];
    const mind = mindKey === 'doug' ? DOUG_FACILITATOR : findMind(mindKey);

    if (!mind) {
        this.addDougMessage('Erro ao selecionar mente.');
        return;
    }

    // Preparar para streaming
    let currentMessage = null;
    let fullResponse = '';

    // Stream da resposta
    await this.openRouter.streamChatCompletion(
        mindKey,
        text,
        mind,
        // onChunk
        (chunk, full) => {
            fullResponse = full;

            // Criar ou atualizar mensagem
            if (!currentMessage) {
                // Criar nova mensagem
                currentMessage = {
                    type: 'received',
                    sender: mind.name,
                    icon: mind.icon,
                    color: mind.color,
                    text: full,
                    timestamp: new Date()
                };
                this.renderMessage(currentMessage);
            } else {
                // Atualizar última mensagem
                const lastBubble = document.querySelector('.message:last-child .message-text');
                if (lastBubble) {
                    lastBubble.innerHTML = this.formatMessageText(full);
                }
            }

            this.scrollToBottom();
        },
        // onComplete
        (full) => {
            // Salvar mensagem completa
            this.messages.push({
                type: 'received',
                sender: mind.name,
                icon: mind.icon,
                color: mind.color,
                text: full,
                timestamp: new Date()
            });

            this.saveToLocalStorage();
            this.updateStats();

            // Gamification
            const achievements = this.gamification.incrementStat('totalMessages');
            if (achievements.length > 0) {
                achievements.forEach(a => {
                    this.showToast(`🏆 ${a.title}: ${a.description}`);
                });
            }

            // Voice output (opcional)
            if (CONFIG.features.voiceOutput && this.voiceEnabled) {
                this.voiceEngine.speak(full, mindKey);
            }
        },
        // onError
        (error) => {
            this.addDougMessage(
                `*Doug franze a testa*\n\n` +
                `Erro ao conectar com OpenRouter:\n${error.message}\n\n` +
                `Verifique sua API key em Settings.`
            );
        }
    );
}

// Adicionar voice input ao input
bindMainAppEvents() {
    // ... código existente ...

    // NOVO: Voice input button
    const voiceBtn = document.getElementById('voice-input-btn');
    if (voiceBtn && this.voiceEngine.isSupported) {
        voiceBtn.addEventListener('click', () => {
            this.toggleVoiceInput();
        });
    } else if (voiceBtn) {
        voiceBtn.style.display = 'none'; // Esconder se não suportado
    }
}

// Toggle voice input
toggleVoiceInput() {
    if (this.voiceEngine.isListening) {
        this.voiceEngine.stopListening();
        return;
    }

    this.voiceEngine.startListening(
        // onResult
        (transcript) => {
            const input = document.getElementById('message-input');
            input.textContent = transcript;
            this.sendMessage();
        },
        // onInterim
        (transcript) => {
            const input = document.getElementById('message-input');
            input.textContent = transcript + '...';
        },
        // onError
        (error) => {
            this.showToast(`❌ Erro de voz: ${error.message}`);
        }
    );
}
```

### Adicionar comando /fusion

No método `handleCommand`, adicione:

```javascript
case '/fusion':
    const parts = commandText.split(' ');
    const mindsAndTopic = parts.slice(1).join(' ');
    await this.handleFusion(mindsAndTopic);
    break;
```

E crie o método:

```javascript
async handleFusion(input) {
    // Parse: /fusion mind1, mind2, mind3 tema
    const match = input.match(/^([^:]+):\s*(.+)$/);

    let mindKeys, topic;
    if (match) {
        mindKeys = match[1].split(',').map(s => s.trim());
        topic = match[2];
    } else {
        // Usar mentes padrão
        mindKeys = ['steve_jobs', 'viktor_frankl', 'peter_thiel'];
        topic = input;
    }

    this.addDougMessage(
        `*Doug prepara a Fusion*\n\n` +
        `🧬 **Mind Fusion ativado**\n\n` +
        `Consultando ${mindKeys.length} mentes e sintetizando perspectivas...\n\n` +
        `Aguarde - isso pode levar alguns segundos.`
    );

    await this.openRouter.fusionResponse(
        mindKeys,
        topic,
        // onProgress
        (message, current, total) => {
            this.updateTypingText(`${message} (${current}/${total})`);
        },
        // onComplete
        (fusionResult, perspectives) => {
            // Mostrar perspectivas individuais
            perspectives.forEach(({ mind, response }) => {
                this.addMindMessage(mind, response);
            });

            // Mostrar síntese
            this.addMessage({
                type: 'received',
                sender: '🧬 Mind Fusion',
                icon: '🧬',
                color: '#9b59b6',
                text: fusionResult,
                timestamp: new Date()
            });
        },
        // onError
        (error) => {
            this.addDougMessage(`Erro no Fusion: ${error.message}`);
        }
    );
}
```

## 📦 Estrutura Final

```
rodamentes/
├── index.html (✅ Atualizado)
├── manifest.json (✅ Novo)
├── sw.js (✅ Novo)
├── .env.example (✅ Novo)
├── SETUP.md (✅ Novo - Leia primeiro!)
├── INTEGRATION_NOTES.md (✅ Este arquivo)
├── assets/
│   ├── css/
│   │   ├── styles.css (Original)
│   │   └── styles-mobile-first.css (✅ Novo - Ativo)
│   └── js/
│       ├── config.js (✅ Novo)
│       ├── minds-data.js (Original)
│       ├── openrouter-api.js (✅ Novo)
│       ├── voice-engine.js (✅ Novo)
│       ├── disruptive-features.js (✅ Novo)
│       ├── app.js (⚠️ Precisa integração)
│       └── app-original.js (Backup)
```

## 🎯 Status da Integração

- ✅ Módulos core criados e testados
- ✅ CSS mobile-first implementado
- ✅ PWA configurado
- ✅ HTML atualizado
- ⚠️ app.js precisa integração manual (use snippets acima)

## 🚀 Para Começar Agora

1. **Configure API Key:**
   - Abra o app
   - Login (9091)
   - Configure API key quando solicitado
   - OU adicione manualmente no localStorage

2. **Teste Básico:**
   ```
   /invocar doug
   Teste de integração
   ```

3. **Teste Fusion:**
   ```
   /fusion steve_jobs, viktor_frankl: Como encontrar propósito?
   ```

## 📝 Notas

- O app.js original foi preservado
- Todos os módulos são independentes
- Integração pode ser feita gradualmente
- Voice e PWA funcionam independentemente da integração OpenRouter

## 🐛 Debug

Se algo não funcionar:

1. Abra Console (F12)
2. Verifique erros
3. Confirme que todos os scripts estão carregando
4. Teste cada módulo individualmente:

```javascript
// No console do navegador:
const api = new OpenRouterClient();
console.log('API Key:', api.hasApiKey());

const voice = new VoiceEngine();
console.log('Voice supported:', voice.isSupported);
```

---

**Todos os módulos estão prontos para uso!** 🚀

O app já está **90% disruptivo** - só falta integrar no app.js principal.
