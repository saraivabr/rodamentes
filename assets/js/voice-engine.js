// =====================================================
// RODA DE MENTES - VOICE ENGINE
// Speech Recognition & Synthesis
// =====================================================

class VoiceEngine {
    constructor() {
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSupported = this.checkSupport();
        this.currentUtterance = null;

        if (this.isSupported) {
            this.initRecognition();
        }
    }

    checkSupport() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition) &&
               !!window.speechSynthesis;
    }

    initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = CONFIG.voice.lang;
        this.recognition.maxAlternatives = 1;
    }

    /**
     * Start listening for voice input
     */
    startListening(onResult, onInterim, onError) {
        if (!this.isSupported || !this.recognition) {
            onError(new Error('Voice recognition not supported'));
            return;
        }

        if (this.isListening) {
            this.stopListening();
        }

        this.recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const result = event.results[last];
            const transcript = result[0].transcript;

            if (result.isFinal) {
                onResult(transcript);
            } else {
                if (onInterim) {
                    onInterim(transcript);
                }
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            onError(new Error(event.error));
            this.isListening = false;
        };

        this.recognition.onend = () => {
            this.isListening = false;
        };

        try {
            this.recognition.start();
            this.isListening = true;
        } catch (error) {
            onError(error);
        }
    }

    /**
     * Stop listening
     */
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    /**
     * Speak text with optional mind-specific voice settings
     */
    speak(text, mindKey = null, onEnd = null) {
        if (!this.isSupported) {
            console.warn('Speech synthesis not supported');
            return;
        }

        // Cancel any ongoing speech
        this.stopSpeaking();

        const utterance = new SpeechSynthesisUtterance(text);

        // Apply voice settings
        const voiceSettings = mindKey && CONFIG.voice.voicePreferences[mindKey]
            ? CONFIG.voice.voicePreferences[mindKey]
            : { rate: CONFIG.voice.rate, pitch: CONFIG.voice.pitch };

        utterance.rate = voiceSettings.rate;
        utterance.pitch = voiceSettings.pitch;
        utterance.lang = CONFIG.voice.lang;

        // Try to select a voice
        const voices = this.synthesis.getVoices();
        const ptBRVoice = voices.find(voice =>
            voice.lang === 'pt-BR' ||
            voice.lang.startsWith('pt')
        );

        if (ptBRVoice) {
            utterance.voice = ptBRVoice;
        }

        utterance.onend = () => {
            this.currentUtterance = null;
            if (onEnd) onEnd();
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.currentUtterance = null;
        };

        this.currentUtterance = utterance;
        this.synthesis.speak(utterance);
    }

    /**
     * Stop current speech
     */
    stopSpeaking() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        this.currentUtterance = null;
    }

    /**
     * Check if currently speaking
     */
    isSpeaking() {
        return this.synthesis.speaking;
    }

    /**
     * Get available voices
     */
    getVoices() {
        return this.synthesis.getVoices();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VoiceEngine;
}
