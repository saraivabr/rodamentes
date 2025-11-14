// =====================================================
// RODA DE MENTES - DISRUPTIVE FEATURES
// Advanced AI-Powered Features
// =====================================================

/**
 * Sentiment Analysis
 */
class SentimentAnalyzer {
    analyze(text) {
        // Simple keyword-based sentiment analysis
        // In production, could use AI API for better accuracy

        const positiveWords = [
            'ótimo', 'excelente', 'bom', 'feliz', 'alegre', 'amor', 'sucesso',
            'conquista', 'vitória', 'positivo', 'esperança', 'gratidão',
            'obrigado', 'maravilhoso', 'incrível', 'fantástico'
        ];

        const negativeWords = [
            'ruim', 'péssimo', 'triste', 'raiva', 'ódio', 'medo', 'frustrado',
            'fracasso', 'derrota', 'negativo', 'desespero', 'ansiedade',
            'depressão', 'terrível', 'horrível', 'difícil', 'problema'
        ];

        const urgentWords = [
            'urgente', 'emergência', 'rápido', 'agora', 'imediato', 'socorro',
            'ajuda', 'crítico', 'grave', 'sério'
        ];

        const lowerText = text.toLowerCase();

        let positiveCount = 0;
        let negativeCount = 0;
        let urgentCount = 0;

        positiveWords.forEach(word => {
            if (lowerText.includes(word)) positiveCount++;
        });

        negativeWords.forEach(word => {
            if (lowerText.includes(word)) negativeCount++;
        });

        urgentWords.forEach(word => {
            if (lowerText.includes(word)) urgentCount++;
        });

        // Determine sentiment
        let sentiment = 'neutral';
        let score = 0;

        if (positiveCount > negativeCount) {
            sentiment = 'positive';
            score = Math.min(positiveCount / (positiveCount + negativeCount), 1);
        } else if (negativeCount > positiveCount) {
            sentiment = 'negative';
            score = Math.min(negativeCount / (positiveCount + negativeCount), 1);
        }

        return {
            sentiment,
            score,
            isUrgent: urgentCount > 0,
            urgencyLevel: urgentCount,
            breakdown: {
                positive: positiveCount,
                negative: negativeCount,
                urgent: urgentCount
            }
        };
    }

    getEmoji(sentiment) {
        const emojis = {
            positive: '😊',
            negative: '😔',
            neutral: '😐',
            urgent: '🚨'
        };
        return emojis[sentiment] || '💭';
    }

    getSuggestedMinds(sentiment, isUrgent) {
        if (isUrgent) {
            return ['doug', 'marcus_aurelius', 'viktor_frankl'];
        }

        if (sentiment === 'negative') {
            return ['viktor_frankl', 'marcus_aurelius', 'seneca'];
        }

        if (sentiment === 'positive') {
            return ['steve_jobs', 'peter_thiel', 'naval_ravikant'];
        }

        return ['doug', 'steve_jobs', 'viktor_frankl'];
    }
}

/**
 * Contextual Suggestions
 */
class ContextualSuggestions {
    constructor() {
        this.keywords = {
            'produto': ['steve_jobs', 'jeff_bezos', 'peter_thiel'],
            'design': ['steve_jobs', 'leonardo_davinci'],
            'propósito': ['viktor_frankl', 'marcus_aurelius', 'alan_watts'],
            'estratégia': ['peter_thiel', 'jeff_bezos', 'ray_dalio'],
            'criatividade': ['leonardo_davinci', 'david_bowie'],
            'investimento': ['luiz_barsi', 'naval_ravikant', 'ray_dalio'],
            'negócio': ['peter_thiel', 'jeff_bezos', 'jorge_paulo_lemann'],
            'filosofia': ['marcus_aurelius', 'nietzsche', 'alan_watts'],
            'ciência': ['richard_feynman', 'carl_sagan', 'nikola_tesla'],
            'psicologia': ['carl_jung', 'viktor_frankl', 'daniel_kahneman'],
            'persuasão': ['robert_cialdini', 'steve_jobs'],
            'decisão': ['daniel_kahneman', 'ray_dalio', 'jeff_bezos'],
            'tempo': ['seneca', 'marcus_aurelius'],
            'morte': ['seneca', 'marcus_aurelius', 'viktor_frankl'],
            'autenticidade': ['nietzsche', 'viktor_frankl', 'alan_watts'],
            'inovação': ['steve_jobs', 'elon_musk', 'leonardo_davinci'],
            'riqueza': ['naval_ravikant', 'luiz_barsi', 'peter_thiel'],
            'arte': ['leonardo_davinci', 'david_bowie', 'mozart'],
            'música': ['mozart', 'david_bowie'],
            'medo': ['viktor_frankl', 'marcus_aurelius', 'seneca'],
            'ansiedade': ['viktor_frankl', 'marcus_aurelius', 'alan_watts']
        };

        this.commands = {
            'invocar': { icon: '👤', desc: 'Invocar uma mente específica' },
            'mesa': { icon: '🎭', desc: 'Mesa redonda sobre um tema' },
            'debate': { icon: '⚔️', desc: 'Debate entre duas mentes' },
            'fusion': { icon: '🧬', desc: 'Fundir perspectivas de múltiplas mentes' },
            'doug': { icon: '🔥', desc: 'Doug puro - sem filtros' },
            'mentes': { icon: '🧠', desc: 'Ver todas as mentes' },
            'auto': { icon: '✨', desc: 'Seleção automática' }
        };
    }

    getSuggestionsForText(text) {
        const suggestions = {
            minds: [],
            commands: [],
            actions: []
        };

        const lowerText = text.toLowerCase();

        // Find matching minds based on keywords
        const mindSuggestions = new Set();

        Object.entries(this.keywords).forEach(([keyword, minds]) => {
            if (lowerText.includes(keyword)) {
                minds.forEach(mind => mindSuggestions.add(mind));
            }
        });

        suggestions.minds = Array.from(mindSuggestions).slice(0, 5);

        // Command suggestions
        if (lowerText.startsWith('/')) {
            const partial = lowerText.slice(1);
            suggestions.commands = Object.entries(this.commands)
                .filter(([cmd]) => cmd.startsWith(partial))
                .map(([cmd, info]) => ({ cmd: `/${cmd}`, ...info }));
        }

        // Action suggestions based on question type
        if (lowerText.includes('?') || lowerText.includes('como')) {
            suggestions.actions.push({
                icon: '🎯',
                text: 'Mesa redonda sobre este tópico',
                action: 'roundtable'
            });
        }

        if (lowerText.includes(' vs ') || lowerText.includes(' ou ')) {
            suggestions.actions.push({
                icon: '⚔️',
                text: 'Debate entre diferentes perspectivas',
                action: 'debate'
            });
        }

        return suggestions;
    }
}

/**
 * Gamification System
 */
class GamificationEngine {
    constructor() {
        this.achievements = this.loadAchievements();
        this.stats = this.loadStats();
    }

    loadAchievements() {
        const saved = localStorage.getItem('rodamentes_achievements');
        return saved ? JSON.parse(saved) : [];
    }

    saveAchievements() {
        localStorage.setItem('rodamentes_achievements', JSON.stringify(this.achievements));
    }

    loadStats() {
        const saved = localStorage.getItem('rodamentes_stats');
        return saved ? JSON.parse(saved) : {
            totalMessages: 0,
            mindsConsulted: 0,
            sessionsCompleted: 0,
            insightsCollected: 0,
            debatesParticipated: 0,
            roundTablesHosted: 0
        };
    }

    saveStats() {
        localStorage.setItem('rodamentes_stats', JSON.stringify(this.stats));
    }

    checkAchievements() {
        const newAchievements = [];

        // First conversation
        if (this.stats.totalMessages === 1 && !this.hasAchievement('first_steps')) {
            newAchievements.push(this.unlockAchievement('first_steps',
                '🌱 Primeiros Passos',
                'Iniciou sua primeira conversa na Roda de Mentes'));
        }

        // Consulted 5 different minds
        if (this.stats.mindsConsulted === 5 && !this.hasAchievement('mind_explorer')) {
            newAchievements.push(this.unlockAchievement('mind_explorer',
                '🧭 Explorador de Mentes',
                'Consultou 5 mentes diferentes'));
        }

        // Consulted all minds
        if (this.stats.mindsConsulted >= 19 && !this.hasAchievement('mind_master')) {
            newAchievements.push(this.unlockAchievement('mind_master',
                '👑 Mestre das Mentes',
                'Consultou todas as 19 mentes!'));
        }

        // First round table
        if (this.stats.roundTablesHosted === 1 && !this.hasAchievement('facilitator')) {
            newAchievements.push(this.unlockAchievement('facilitator',
                '🎭 Facilitador',
                'Organizou sua primeira mesa redonda'));
        }

        // 10 debates
        if (this.stats.debatesParticipated === 10 && !this.hasAchievement('debater')) {
            newAchievements.push(this.unlockAchievement('debater',
                '⚔️ Debatedor',
                'Participou de 10 debates'));
        }

        // 100 messages
        if (this.stats.totalMessages === 100 && !this.hasAchievement('conversationalist')) {
            newAchievements.push(this.unlockAchievement('conversationalist',
                '💬 Conversador',
                'Enviou 100 mensagens'));
        }

        return newAchievements;
    }

    hasAchievement(id) {
        return this.achievements.some(a => a.id === id);
    }

    unlockAchievement(id, title, description) {
        const achievement = {
            id,
            title,
            description,
            unlockedAt: new Date().toISOString()
        };
        this.achievements.push(achievement);
        this.saveAchievements();
        return achievement;
    }

    incrementStat(statName) {
        if (this.stats.hasOwnProperty(statName)) {
            this.stats[statName]++;
            this.saveStats();
            return this.checkAchievements();
        }
        return [];
    }
}

/**
 * Export System - Enhanced exports
 */
class ExportEngine {
    exportToMarkdown(messages) {
        let markdown = `# Roda de Mentes - Conversa\n\n`;
        markdown += `Exportado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
        markdown += `---\n\n`;

        messages.forEach(msg => {
            const time = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
            markdown += `## ${msg.sender} - ${time}\n\n`;
            markdown += `${msg.text}\n\n`;
            markdown += `---\n\n`;
        });

        return markdown;
    }

    downloadMarkdown(messages) {
        const content = this.exportToMarkdown(messages);
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rodamentes-${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportToJSON(messages, consultedMinds) {
        const data = {
            exportedAt: new Date().toISOString(),
            messages: messages,
            consultedMinds: consultedMinds,
            stats: {
                totalMessages: messages.length,
                uniqueMinds: consultedMinds.length
            }
        };

        return JSON.stringify(data, null, 2);
    }

    downloadJSON(messages, consultedMinds) {
        const content = this.exportToJSON(messages, consultedMinds);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rodamentes-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SentimentAnalyzer,
        ContextualSuggestions,
        GamificationEngine,
        ExportEngine
    };
}
