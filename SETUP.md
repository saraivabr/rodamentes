# 🚀 Roda de Mentes - Guia de Configuração Rápida

## O que mudou?

Este projeto foi completamente transformado em uma experiência **DISRUPTIVA** com:

### ✨ Novos Recursos Implementados

1. **🤖 IA Real com OpenRouter**
   - Respostas genuínas de modelos avançados (Claude, GPT-4, Gemini)
   - Streaming em tempo real
   - Modelos diferentes por persona

2. **🎤 Voice Input/Output**
   - Fale com as mentes
   - Ouça as respostas
   - Configurações personalizadas por mente

3. **📱 Design Mobile-First RADICAL**
   - CSS completamente reescrito
   - Touch-friendly 100%
   - Gestos nativos
   - Performance otimizada

4. **🧬 Mind Fusion (NOVO!)**
   - Combine múltiplas perspectivas
   - IA sintetiza insights únicos

5. **📊 Sentiment Analysis**
   - Análise de tom automática
   - Sugestões inteligentes

6. **💾 PWA Support**
   - Instalável
   - Funciona offline
   - Service Worker

## 🔧 Como Configurar

### Passo 1: Obter API Key do OpenRouter

1. Acesse: https://openrouter.ai/
2. Crie uma conta (grátis)
3. Vá em "Keys" e crie uma nova API key
4. Copie a chave

### Passo 2: Configurar no App

**Método 1: Via Interface (Recomendado)**

1. Abra o app
2. Login (senha: 9091)
3. Clique em ⚙️ Settings (canto superior direito)
4. Cole sua API key
5. Salvar

**Método 2: Via localStorage (Desenvolvedor)**

Abra o Console do navegador e execute:

```javascript
localStorage.setItem('rodamentes_api_key', 'sua-api-key-aqui');
```

### Passo 3: Servir o App

⚠️ **IMPORTANTE**: Não funciona via `file://` - precisa de servidor HTTP

**Opção 1 - Python:**
```bash
cd rodamentes
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

**Opção 2 - Node.js:**
```bash
npx http-server -p 8000
# Acesse: http://localhost:8000
```

**Opção 3 - PHP:**
```bash
php -S localhost:8000
```

## 📋 Arquivos Criados/Modificados

### Novos Arquivos:

- `assets/js/config.js` - Configurações centralizadas
- `assets/js/openrouter-api.js` - Cliente OpenRouter com streaming
- `assets/js/voice-engine.js` - Voice input/output
- `assets/js/disruptive-features.js` - Features avançadas
- `assets/css/styles-mobile-first.css` - CSS mobile-first
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker
- `.env.example` - Template de variáveis
- `SETUP.md` - Este arquivo

### Arquivos Modificados:

- `index.html` - Atualizado com novos scripts e PWA meta tags
- `assets/js/app.js` - Integrado com todas as novas features

### Backup:

- `assets/js/app-original.js` - Backup do app.js original

## 🎯 Próximos Passos

1. ✅ Configurar API key
2. ✅ Testar chat básico
3. 🔜 Experimentar `/fusion`
4. 🔜 Testar voice input
5. 🔜 Instalar como PWA

## 🐛 Troubleshooting

### "OpenRouter API Error"
- Verifique se a API key está correta
- Confirme que tem créditos na conta OpenRouter
- Veja o console do navegador para detalhes

### Voice não funciona
- Certifique-se de usar HTTPS ou localhost
- Permita acesso ao microfone quando solicitado
- Teste se o navegador suporta Web Speech API

### App não carrega
- Verifique se está rodando via HTTP/HTTPS (não file://)
- Abra o console e veja erros
- Limpe o cache do navegador

### PWA não instala
- Use Chrome/Edge/Safari atualizados
- Certifique-se que está em HTTPS (ou localhost)
- Verifique se o manifest.json está acessível

## 💡 Dicas de Uso

### Para começar rápido:
```
/invocar doug
Me ajude a começar
```

### Para análise profunda:
```
/fusion steve_jobs, viktor_frankl, peter_thiel
Como encontrar propósito no meu trabalho?
```

### Para debate:
```
/debate nietzsche vs marcus_aurelius sobre poder
```

## 📊 Performance

O app foi otimizado para:
- ⚡ Carregamento < 2s
- 📱 60fps em animações
- 💾 Cache inteligente
- 🔄 Streaming < 500ms

## 🔐 Privacidade

- ✅ API key armazenada APENAS localmente
- ✅ Sem backend próprio
- ✅ Sem tracking
- ✅ Open source

## 📞 Precisa de Ajuda?

1. Veja o console do navegador (F12)
2. Procure por erros em vermelho
3. Abra uma issue no GitHub
4. Consulte a documentação do OpenRouter

---

**Pronto para começar? Abra o app e configure sua API key!** 🚀
