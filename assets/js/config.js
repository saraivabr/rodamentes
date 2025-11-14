// =====================================================
// RODA DE MENTES - CONFIGURATION
// OpenRouter & App Settings
// =====================================================

const CONFIG = {
    // OpenRouter Configuration
    openRouter: {
        apiKey: '', // Set this in localStorage or via settings
        apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
        appName: 'RodaDeMentes',
        appUrl: 'https://rodamentes.app',

        // Model selection per mind archetype
        models: {
            // High-performance models for complex minds
            premium: 'anthropic/claude-3.5-sonnet',

            // Fast models for quick responses
            fast: 'anthropic/claude-3-haiku',

            // Balanced models
            balanced: 'openai/gpt-4-turbo',

            // Creative models
            creative: 'google/gemini-pro-1.5',

            // Per-mind model mapping
            steve_jobs: 'anthropic/claude-3.5-sonnet',
            viktor_frankl: 'anthropic/claude-3.5-sonnet',
            marcus_aurelius: 'anthropic/claude-3.5-sonnet',
            peter_thiel: 'anthropic/claude-3.5-sonnet',
            leonardo_davinci: 'google/gemini-pro-1.5',
            richard_feynman: 'anthropic/claude-3.5-sonnet',
            jeff_bezos: 'openai/gpt-4-turbo',
            elon_musk: 'openai/gpt-4-turbo',
            doug: 'anthropic/claude-3-haiku', // Fast and brutal

            // Default fallback
            default: 'anthropic/claude-3-haiku'
        }
    },

    // Feature flags
    features: {
        voiceInput: true,
        voiceOutput: true,
        sentimentAnalysis: true,
        mindFusion: true,
        liveDebate: true,
        contextualSuggestions: true,
        offlineMode: true,
        pwa: true,
        exportPDF: true,
        gamification: true
    },

    // UI Configuration
    ui: {
        streamingSpeed: 30, // ms per chunk
        typingIndicatorDelay: 500,
        maxContextMessages: 20,
        autoSaveInterval: 30000, // 30s
        animationDuration: 300
    },

    // Voice settings
    voice: {
        enabled: true,
        lang: 'pt-BR',
        rate: 1.0,
        pitch: 1.0,
        voicePreferences: {
            doug: { rate: 1.2, pitch: 0.9 }, // Faster, deeper
            steve_jobs: { rate: 1.0, pitch: 1.0 },
            viktor_frankl: { rate: 0.9, pitch: 1.1 } // Slower, thoughtful
        }
    },

    // Storage keys
    storage: {
        apiKey: 'rodamentes_api_key',
        theme: 'rodamentes_theme',
        messages: 'rodamentes_messages',
        consultedMinds: 'rodamentes_consulted',
        settings: 'rodamentes_settings',
        voiceEnabled: 'rodamentes_voice_enabled'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
