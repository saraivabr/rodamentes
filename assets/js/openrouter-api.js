// =====================================================
// RODA DE MENTES - OPENROUTER API CLIENT
// Advanced AI Integration with Streaming Support
// =====================================================

class OpenRouterClient {
    constructor(apiKey) {
        this.apiKey = apiKey || this.getStoredApiKey();
        this.baseUrl = CONFIG.openRouter.apiUrl;
        this.appName = CONFIG.openRouter.appName;
        this.appUrl = CONFIG.openRouter.appUrl;
        this.conversationHistory = new Map(); // Per-mind conversation history
    }

    getStoredApiKey() {
        return localStorage.getItem(CONFIG.storage.apiKey) || '';
    }

    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem(CONFIG.storage.apiKey, key);
    }

    hasApiKey() {
        return !!this.apiKey;
    }

    /**
     * Get the appropriate model for a mind
     */
    getModelForMind(mindKey) {
        return CONFIG.openRouter.models[mindKey] || CONFIG.openRouter.models.default;
    }

    /**
     * Build system prompt for a specific mind
     */
    buildSystemPrompt(mind) {
        return `Você é ${mind.name}, ${mind.role}.

EXPERTISE: ${mind.expertise.join(', ')}

DESCRIÇÃO: ${mind.description}

PERSONALIDADE E ESTILO:
${this.getPersonalityStyle(mind)}

QUANDO RESPONDER:
- Mantenha sua voz autêntica e única
- Use sua expertise para oferecer perspectivas únicas
- Seja direto e acionável
- Não seja genérico - seja VOCÊ
- Cite exemplos concretos quando relevante
- Desafie pressupostos quando necessário

SUA QUOTE ICÔNICA: "${mind.quote}"

Responda sempre em primeira pessoa, como se fosse ${mind.name} conversando diretamente. Seja profundo, mas prático. Inspire ação.`;
    }

    getPersonalityStyle(mind) {
        const styles = {
            steve_jobs: "Brutal simplicidade. Corte o que não importa. Foque no essencial. Design é sobre eliminar, não adicionar. Seja provocativo.",
            viktor_frankl: "Profundo e compassivo. Busque sentido em tudo. Conecte com propósito maior. Use experiências de vida como lições.",
            marcus_aurelius: "Estoico e prático. Foque no que pode controlar. Aceite o resto. Virtude acima de tudo. Brevidade e sabedoria.",
            peter_thiel: "Contrarian thinking. Questione consenso. Busque monopólios. Pense 0 to 1, não 1 to n. Seja provocativo.",
            leonardo_davinci: "Curioso e interdisciplinar. Conecte campos diferentes. Observe natureza. Pergunte 'por quê' incessantemente.",
            richard_feynman: "Clareza extrema. Primeiros princípios. Se não pode explicar simples, não entende. Elimine jargão.",
            jeff_bezos: "Obsessão por cliente. Pense longo prazo. Construa sistemas. Day 1 mentality. Alta velocidade de decisão.",
            elon_musk: "Primeiros princípios. Pense do zero. Física, não analogias. Ambição extrema. Execução brutal. Futuro-focused.",
            carl_jung: "Simbólico e arquetípico. Explore inconsciente. Integre sombra. Profundidade psicológica.",
            nietzsche: "Provocativo e radical. Questione moralidade. Autenticidade acima de tudo. Crie próprios valores.",
            naval_ravikant: "Conciso e profundo. Leverage e specific knowledge. Liberdade e riqueza. Filosofia prática moderna."
        };

        return styles[mind.key] || "Autêntico e expertise-driven. Oferece perspectiva única baseada em sua experiência e conhecimento.";
    }

    /**
     * Build Doug's special system prompt
     */
    buildDougPrompt() {
        return `Você é DOUG, o facilitador da Roda de Mentes. Você é:

- BRUTAL: Zero enrolação. Zero piedade. Zero desculpas.
- DIRETO: Corta bullshit. Vai direto ao ponto.
- AÇÃO-FOCADO: Tudo termina em comandos claros com prazos.
- PROVOCADOR: Faz perguntas difíceis. Expõe evasão.

SEU ESTILO:
- Use ações descritivas: *Doug esmurra a mesa*
- Seja visual e teatral
- Comandos militares com prazos curtos (7 dias, 24h, AGORA)
- Chame mentiras e auto-sabotagem
- Termine sempre com ação clara

ESTRUTURA DE RESPOSTA:
1. Ação visual (*Doug faz algo*)
2. Observação brutal sobre a situação
3. Perspectiva ou insight cortante
4. COMANDOS claros com prazos
5. Encerramento visual e provocativo

EXEMPLO:
"*Doug esmurra a mesa*

Você está enrolando há SEMANAS.

Isso não é sobre informação. É sobre CORAGEM.

SEUS COMANDOS - 48 HORAS:
1. [ação específica]
2. [ação específica]
3. Reporte aqui os resultados

*Doug encara você*

Acabou o papo. EXECUTE."

Seja Doug. Seja brutal. Seja ação.`;
    }

    /**
     * Get conversation history for a mind
     */
    getHistory(mindKey, maxMessages = CONFIG.ui.maxContextMessages) {
        if (!this.conversationHistory.has(mindKey)) {
            this.conversationHistory.set(mindKey, []);
        }
        const history = this.conversationHistory.get(mindKey);
        return history.slice(-maxMessages);
    }

    /**
     * Add message to conversation history
     */
    addToHistory(mindKey, role, content) {
        if (!this.conversationHistory.has(mindKey)) {
            this.conversationHistory.set(mindKey, []);
        }
        this.conversationHistory.get(mindKey).push({ role, content });
    }

    /**
     * Clear history for a mind
     */
    clearHistory(mindKey) {
        this.conversationHistory.set(mindKey, []);
    }

    /**
     * Stream response from OpenRouter
     */
    async streamChatCompletion(mindKey, userMessage, mind, onChunk, onComplete, onError) {
        if (!this.apiKey) {
            onError(new Error('API Key não configurada. Configure em Settings.'));
            return;
        }

        try {
            // Add user message to history
            this.addToHistory(mindKey, 'user', userMessage);

            // Build system prompt
            const systemPrompt = mindKey === 'doug' ?
                this.buildDougPrompt() :
                this.buildSystemPrompt(mind);

            // Get conversation history
            const history = this.getHistory(mindKey);

            // Prepare messages
            const messages = [
                { role: 'system', content: systemPrompt },
                ...history
            ];

            // Get model for this mind
            const model = this.getModelForMind(mindKey);

            // Make API request
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': this.appUrl,
                    'X-Title': this.appName,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: messages,
                    stream: true,
                    temperature: this.getTemperature(mindKey),
                    max_tokens: 2000
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'OpenRouter API error');
            }

            // Process stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);

                        if (data === '[DONE]') {
                            continue;
                        }

                        try {
                            const json = JSON.parse(data);
                            const content = json.choices[0]?.delta?.content;

                            if (content) {
                                fullResponse += content;
                                onChunk(content, fullResponse);
                            }
                        } catch (e) {
                            console.warn('Failed to parse chunk:', e);
                        }
                    }
                }
            }

            // Add assistant response to history
            this.addToHistory(mindKey, 'assistant', fullResponse);

            // Call completion callback
            onComplete(fullResponse);

        } catch (error) {
            console.error('OpenRouter API Error:', error);
            onError(error);
        }
    }

    /**
     * Get temperature setting for mind (affects creativity/randomness)
     */
    getTemperature(mindKey) {
        const temperatures = {
            doug: 0.8, // More consistent, direct
            steve_jobs: 0.7,
            viktor_frankl: 0.6, // More thoughtful
            marcus_aurelius: 0.5, // Very consistent
            peter_thiel: 0.8, // More creative/contrarian
            leonardo_davinci: 0.9, // Most creative
            richard_feynman: 0.6, // Clear and consistent
            default: 0.7
        };

        return temperatures[mindKey] || temperatures.default;
    }

    /**
     * Mind Fusion - Combine multiple minds' perspectives
     */
    async fusionResponse(mindKeys, userMessage, onProgress, onComplete, onError) {
        const minds = mindKeys.map(key => {
            if (key === 'doug') return { key: 'doug', ...DOUG_FACILITATOR };
            return { key, ...findMind(key) };
        }).filter(m => m);

        const perspectives = [];

        // Get response from each mind
        for (let i = 0; i < minds.length; i++) {
            const mind = minds[i];
            onProgress(`Consultando ${mind.name}...`, i + 1, minds.length);

            try {
                const response = await this.getSingleResponse(mind.key, userMessage, mind);
                perspectives.push({
                    mind: mind,
                    response: response
                });
            } catch (error) {
                console.error(`Error getting response from ${mind.name}:`, error);
            }
        }

        // Now create fusion prompt
        const fusionPrompt = this.buildFusionPrompt(userMessage, perspectives);

        onProgress('Sintetizando perspectivas...', minds.length, minds.length);

        // Get fusion response from premium model
        try {
            let fullResponse = '';
            await this.streamRawCompletion(
                CONFIG.openRouter.models.premium,
                fusionPrompt,
                (chunk) => {
                    fullResponse += chunk;
                },
                () => {
                    onComplete(fullResponse, perspectives);
                },
                onError
            );
        } catch (error) {
            onError(error);
        }
    }

    /**
     * Get single response (non-streaming)
     */
    async getSingleResponse(mindKey, userMessage, mind) {
        return new Promise((resolve, reject) => {
            let fullResponse = '';
            this.streamChatCompletion(
                mindKey,
                userMessage,
                mind,
                (chunk, full) => {
                    fullResponse = full;
                },
                (full) => resolve(full),
                (error) => reject(error)
            );
        });
    }

    /**
     * Stream raw completion without history
     */
    async streamRawCompletion(model, systemPrompt, onChunk, onComplete, onError) {
        if (!this.apiKey) {
            onError(new Error('API Key não configurada'));
            return;
        }

        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': this.appUrl,
                    'X-Title': this.appName,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: systemPrompt }],
                    stream: true,
                    temperature: 0.7,
                    max_tokens: 3000
                })
            });

            if (!response.ok) {
                throw new Error('OpenRouter API error');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const json = JSON.parse(data);
                            const content = json.choices[0]?.delta?.content;
                            if (content) {
                                fullResponse += content;
                                onChunk(content);
                            }
                        } catch (e) {}
                    }
                }
            }

            onComplete(fullResponse);

        } catch (error) {
            onError(error);
        }
    }

    /**
     * Build fusion prompt
     */
    buildFusionPrompt(question, perspectives) {
        let prompt = `Você está sintetizando perspectivas de múltiplas mentes brilhantes sobre a seguinte questão:

QUESTÃO: "${question}"

PERSPECTIVAS RECEBIDAS:

`;

        perspectives.forEach(({ mind, response }) => {
            prompt += `--- ${mind.name} (${mind.role}) ---\n${response}\n\n`;
        });

        prompt += `
SUA TAREFA:
Sintetize essas perspectivas em uma resposta PODEROSA e ACIONÁVEL que:

1. **IDENTIFICA PADRÕES**: Quais temas comuns emergem?
2. **DESTACA TENSÕES**: Onde as perspectivas divergem e por quê?
3. **SINTETIZA SABEDORIA**: Qual a meta-insight que une tudo?
4. **OFERECE AÇÃO**: Passos concretos baseados nessa síntese

ESTRUTURA:

🧠 **SÍNTESE**
[Insight unificador e padrões identificados]

⚡ **TENSÕES CRIATIVAS**
[Onde as mentes discordam e o valor disso]

🎯 **PLANO DE AÇÃO**
[Passos concretos integrando as perspectivas]

💎 **SABEDORIA FINAL**
[Uma frase poderosa que captura tudo]

Seja profundo, mas prático. Inspire ação.`;

        return prompt;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OpenRouterClient;
}
