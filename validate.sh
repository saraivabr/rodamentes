#!/bin/bash

# =====================================================
# RODA DE MENTES - SCRIPT DE VALIDAÇÃO COMPLETA v2.0
# Valida todos os aspectos críticos do projeto
# Best Practices 2024/2025
# =====================================================

# Strict mode - Best Practice 2024/2025
set -euo pipefail

# Trap errors and provide context
trap 'echo -e "${RED}✗ Erro na linha $LINENO: $BASH_COMMAND${NC}" >&2' ERR

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configurações
JSON_OUTPUT=false
VERBOSE=false
START_TIME=$(date +%s)

# Contadores
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0
CRITICAL_ERRORS=0

# Arrays para armazenar problemas
declare -a ERRORS
declare -a WARNINGS
declare -a SUCCESS
declare -a CRITICAL

# Função de ajuda
show_help() {
    cat << EOF
🧠 RODA DE MENTES - VALIDAÇÃO COMPLETA v2.0

Uso: $0 [OPTIONS]

Opções:
    -h, --help          Mostra esta mensagem de ajuda
    -j, --json          Saída em formato JSON (útil para CI/CD)
    -v, --verbose       Modo verboso com mais detalhes
    --lighthouse        Executa auditoria Lighthouse (requer npx)
    --shellcheck        Valida sintaxe com ShellCheck
    --ci                Modo CI/CD (sem cores, JSON output)

Exemplos:
    ./validate.sh                    # Validação padrão
    ./validate.sh --json             # Output JSON
    ./validate.sh --lighthouse       # Com auditoria Lighthouse
    ./validate.sh --ci               # Para CI/CD pipelines

EOF
    exit 0
}

# Parse argumentos
LIGHTHOUSE_CHECK=false
SHELLCHECK_ENABLE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help) show_help ;;
        -j|--json) JSON_OUTPUT=true ;;
        -v|--verbose) VERBOSE=true ;;
        --lighthouse) LIGHTHOUSE_CHECK=true ;;
        --shellcheck) SHELLCHECK_ENABLE=true ;;
        --ci) JSON_OUTPUT=true; RED=''; GREEN=''; YELLOW=''; BLUE=''; NC=''; BOLD='' ;;
        *) echo "Opção desconhecida: $1"; show_help ;;
    esac
    shift
done

# Função para timestamp
timestamp() {
    date +"%Y-%m-%d %H:%M:%S"
}

# Função para log verboso
log_verbose() {
    if [ "$VERBOSE" = true ]; then
        echo -e "${CYAN}[$(timestamp)]${NC} $1"
    fi
}

# Função para printar header
print_header() {
    if [ "$JSON_OUTPUT" = false ]; then
        echo ""
        echo -e "${BLUE}${BOLD}=================================================${NC}"
        echo -e "${BLUE}${BOLD}  🧠 RODA DE MENTES - VALIDAÇÃO v2.0${NC}"
        echo -e "${BLUE}${BOLD}  Início: $(timestamp)${NC}"
        echo -e "${BLUE}${BOLD}=================================================${NC}"
        echo ""
    fi
}

# Função para printar seção
print_section() {
    if [ "$JSON_OUTPUT" = false ]; then
        echo ""
        echo -e "${BOLD}📋 $1${NC}"
        echo "---------------------------------------------------"
    fi
}

# Função para check
check() {
    local status=$1
    local message=$2
    local critical=${3:-false}

    ((TOTAL_CHECKS++)) || true

    if [ $status -eq 0 ]; then
        ((PASSED_CHECKS++)) || true
        [ "$JSON_OUTPUT" = false ] && echo -e "${GREEN}✓${NC} $message"
        SUCCESS+=("$message")
        log_verbose "PASS: $message"
        return 0
    else
        ((FAILED_CHECKS++)) || true
        [ "$JSON_OUTPUT" = false ] && echo -e "${RED}✗${NC} $message"
        ERRORS+=("$message")

        if [ "$critical" = true ]; then
            ((CRITICAL_ERRORS++)) || true
            CRITICAL+=("$message")
            [ "$JSON_OUTPUT" = false ] && echo -e "${RED}${BOLD}  ⚠ CRÍTICO!${NC}"
        fi

        log_verbose "FAIL: $message (critical: $critical)"
        return 1
    fi
}

# Função para warning
warn() {
    local message=$1
    ((TOTAL_CHECKS++)) || true
    ((WARNING_CHECKS++)) || true
    [ "$JSON_OUTPUT" = false ] && echo -e "${YELLOW}⚠${NC} $message"
    WARNINGS+=("$message")
    log_verbose "WARN: $message"
}

# Função para info
info() {
    [ "$JSON_OUTPUT" = false ] && echo -e "${BLUE}ℹ${NC} $1"
    log_verbose "INFO: $1"
}

# Função para critical error
critical() {
    local message=$1
    ((TOTAL_CHECKS++)) || true
    ((FAILED_CHECKS++)) || true
    ((CRITICAL_ERRORS++)) || true
    [ "$JSON_OUTPUT" = false ] && echo -e "${RED}${BOLD}✗✗✗ CRÍTICO:${NC} $message"
    ERRORS+=("$message")
    CRITICAL+=("$message")
    log_verbose "CRITICAL: $message"
}

# =====================================================
# 1. VALIDAÇÃO DE ESTRUTURA DE ARQUIVOS
# =====================================================
validate_structure() {
    print_section "1. Estrutura de Arquivos"

    # Arquivos essenciais
    [ -f "index.html" ] && check 0 "index.html existe" || check 1 "index.html NÃO ENCONTRADO"
    [ -f "manifest.json" ] && check 0 "manifest.json existe" || check 1 "manifest.json NÃO ENCONTRADO"
    [ -f "sw.js" ] && check 0 "sw.js (Service Worker) existe" || check 1 "sw.js NÃO ENCONTRADO"
    [ -f ".env.example" ] && check 0 ".env.example existe" || check 1 ".env.example NÃO ENCONTRADO"

    # Diretórios essenciais
    [ -d "assets" ] && check 0 "Diretório assets/ existe" || check 1 "Diretório assets/ NÃO ENCONTRADO"
    [ -d "assets/js" ] && check 0 "Diretório assets/js/ existe" || check 1 "Diretório assets/js/ NÃO ENCONTRADO"
    [ -d "assets/css" ] && check 0 "Diretório assets/css/ existe" || check 1 "Diretório assets/css/ NÃO ENCONTRADO"

    # Arquivos JavaScript críticos
    [ -f "assets/js/config.js" ] && check 0 "config.js existe" || check 1 "config.js NÃO ENCONTRADO"
    [ -f "assets/js/app.js" ] && check 0 "app.js existe" || check 1 "app.js NÃO ENCONTRADO"
    [ -f "assets/js/minds-data.js" ] && check 0 "minds-data.js existe" || check 1 "minds-data.js NÃO ENCONTRADO"
    [ -f "assets/js/openrouter-api.js" ] && check 0 "openrouter-api.js existe" || check 1 "openrouter-api.js NÃO ENCONTRADO"

    # Arquivos CSS
    [ -f "assets/css/styles-mobile-first.css" ] && check 0 "styles-mobile-first.css existe" || check 1 "styles-mobile-first.css NÃO ENCONTRADO"

    # Verificar ícones PWA
    if [ -d "assets/icons" ]; then
        check 0 "Diretório assets/icons/ existe"

        # Verificar ícones específicos do manifest
        ICON_SIZES=("72x72" "96x96" "128x128" "144x144" "152x152" "192x192" "384x384" "512x512")
        for size in "${ICON_SIZES[@]}"; do
            if [ -f "assets/icons/icon-${size}.png" ]; then
                check 0 "Ícone ${size} existe"
            else
                warn "Ícone ${size} NÃO ENCONTRADO (necessário para PWA)"
            fi
        done
    else
        warn "Diretório assets/icons/ NÃO ENCONTRADO - PWA não funcionará corretamente"
    fi
}

# =====================================================
# 2. VALIDAÇÃO DE SINTAXE
# =====================================================
validate_syntax() {
    print_section "2. Validação de Sintaxe"

    # Validar JSON files
    info "Validando arquivos JSON..."

    if command -v node &> /dev/null; then
        if [ -f "manifest.json" ]; then
            node -e "JSON.parse(require('fs').readFileSync('manifest.json', 'utf8'))" 2>/dev/null
            check $? "manifest.json tem sintaxe JSON válida"
        fi
    else
        warn "Node.js não instalado - não é possível validar sintaxe JSON"
    fi

    # Validar JavaScript básico (syntax errors)
    info "Validando arquivos JavaScript..."

    JS_FILES=(
        "assets/js/config.js"
        "assets/js/app.js"
        "assets/js/minds-data.js"
        "assets/js/openrouter-api.js"
        "assets/js/voice-engine.js"
        "assets/js/disruptive-features.js"
        "sw.js"
    )

    for file in "${JS_FILES[@]}"; do
        if [ -f "$file" ]; then
            if command -v node &> /dev/null; then
                node --check "$file" 2>/dev/null
                check $? "$file não tem erros de sintaxe"
            else
                # Verificação básica sem Node.js
                if grep -q "syntax error\|SyntaxError" "$file"; then
                    check 1 "$file pode ter erros de sintaxe"
                else
                    info "$file verificado (validação limitada sem Node.js)"
                fi
            fi
        fi
    done

    # Validar HTML básico
    if [ -f "index.html" ]; then
        # Verificar tags fechadas
        if grep -q "<html" "index.html" && grep -q "</html>" "index.html"; then
            check 0 "index.html tem tags html abertas e fechadas"
        else
            check 1 "index.html pode ter problemas de estrutura HTML"
        fi

        if grep -q "<head" "index.html" && grep -q "</head>" "index.html"; then
            check 0 "index.html tem tags head abertas e fechadas"
        else
            check 1 "index.html pode ter problemas na seção head"
        fi

        if grep -q "<body" "index.html" && grep -q "</body>" "index.html"; then
            check 0 "index.html tem tags body abertas e fechadas"
        else
            check 1 "index.html pode ter problemas na seção body"
        fi
    fi
}

# =====================================================
# 3. VALIDAÇÃO DE CONFIGURAÇÃO
# =====================================================
validate_configuration() {
    print_section "3. Configuração e Variáveis"

    # Verificar CONFIG em config.js
    if [ -f "assets/js/config.js" ]; then
        grep -q "const CONFIG" "assets/js/config.js"
        check $? "CONFIG definido em config.js"

        grep -q "openRouter" "assets/js/config.js"
        check $? "Configuração openRouter presente"

        grep -q "apiUrl" "assets/js/config.js"
        check $? "apiUrl configurado"

        grep -q "models:" "assets/js/config.js"
        check $? "Modelos de IA configurados"
    fi

    # Verificar .env.example
    if [ -f ".env.example" ]; then
        grep -q "OPENROUTER_API_KEY" ".env.example"
        check $? ".env.example contém OPENROUTER_API_KEY"
    fi

    # Verificar se .env existe (não deveria estar no git)
    if [ -f ".env" ]; then
        warn ".env encontrado - VERIFIQUE se não está commitado no git (deve estar no .gitignore)"
    else
        info ".env não existe (correto - deve ser criado localmente)"
    fi

    # Verificar .gitignore
    if [ -f ".gitignore" ]; then
        grep -q ".env" ".gitignore"
        check $? ".gitignore contém .env"

        grep -q "node_modules" ".gitignore"
        check $? ".gitignore contém node_modules"
    fi
}

# =====================================================
# 4. VALIDAÇÃO DE PWA
# =====================================================
validate_pwa() {
    print_section "4. Progressive Web App (PWA)"

    # Verificar manifest.json
    if [ -f "manifest.json" ]; then
        grep -q '"name"' "manifest.json"
        check $? "manifest.json tem campo 'name'"

        grep -q '"short_name"' "manifest.json"
        check $? "manifest.json tem campo 'short_name'"

        grep -q '"start_url"' "manifest.json"
        check $? "manifest.json tem campo 'start_url'"

        grep -q '"display"' "manifest.json"
        check $? "manifest.json tem campo 'display'"

        grep -q '"icons"' "manifest.json"
        check $? "manifest.json tem campo 'icons'"

        grep -q '"theme_color"' "manifest.json"
        check $? "manifest.json tem campo 'theme_color'"

        grep -q '"background_color"' "manifest.json"
        check $? "manifest.json tem campo 'background_color'"
    fi

    # Verificar Service Worker
    if [ -f "sw.js" ]; then
        grep -q "install" "sw.js"
        check $? "Service Worker tem evento 'install'"

        grep -q "fetch" "sw.js"
        check $? "Service Worker tem evento 'fetch'"

        grep -q "cache" "sw.js" || grep -q "Cache" "sw.js"
        check $? "Service Worker implementa caching"
    fi

    # Verificar registro do SW no HTML
    if [ -f "index.html" ]; then
        grep -q "serviceWorker.register" "index.html"
        check $? "index.html registra o Service Worker"

        grep -q 'rel="manifest"' "index.html"
        check $? "index.html linka o manifest.json"
    fi
}

# =====================================================
# 5. VALIDAÇÃO DE DEPENDÊNCIAS E LINKS
# =====================================================
validate_dependencies() {
    print_section "5. Dependências e Links Externos"

    if [ -f "index.html" ]; then
        # Verificar CDN links
        grep -q "cdnjs.cloudflare.com" "index.html"
        check $? "Font Awesome CDN linkado"

        grep -q "fonts.googleapis.com" "index.html"
        check $? "Google Fonts linkado"

        grep -q "marked.min.js" "index.html"
        check $? "Marked.js (Markdown parser) incluído"

        grep -q "highlight.min.js" "index.html"
        check $? "Highlight.js (syntax highlighting) incluído"

        # Verificar ordem de carregamento dos scripts
        info "Verificando ordem de carregamento dos scripts..."

        if grep -n '<script src="assets/js/' "index.html" | grep -q "config.js"; then
            CONFIG_LINE=$(grep -n 'config.js' "index.html" | cut -d: -f1)
            APP_LINE=$(grep -n 'app.js' "index.html" | cut -d: -f1)

            if [ "$CONFIG_LINE" -lt "$APP_LINE" ]; then
                check 0 "config.js carrega antes de app.js (ordem correta)"
            else
                check 1 "config.js deve carregar ANTES de app.js"
            fi
        fi
    fi
}

# =====================================================
# 6. VALIDAÇÃO DE SEGURANÇA
# =====================================================
validate_security() {
    print_section "6. Segurança"

    # Verificar se há API keys hardcoded
    info "Verificando por API keys hardcoded..."

    if grep -r "sk-" assets/js/ --include="*.js" 2>/dev/null | grep -v "example" | grep -q "sk-"; then
        check 1 "POSSÍVEL API KEY HARDCODED ENCONTRADA - REMOVER IMEDIATAMENTE"
    else
        check 0 "Nenhuma API key hardcoded encontrada"
    fi

    # Verificar HTTPS
    if [ -f "assets/js/config.js" ]; then
        if grep -q "https://openrouter.ai" "assets/js/config.js"; then
            check 0 "OpenRouter API usa HTTPS"
        else
            warn "URL da API OpenRouter pode não estar usando HTTPS"
        fi
    fi

    # Verificar CSP headers (Content Security Policy)
    if [ -f "index.html" ]; then
        if grep -q "Content-Security-Policy" "index.html"; then
            check 0 "Content-Security-Policy definido"
        else
            warn "Content-Security-Policy não definido (recomendado para segurança)"
        fi
    fi

    # Verificar .gitignore para arquivos sensíveis
    if [ -f ".gitignore" ]; then
        grep -q ".env" ".gitignore"
        check $? ".gitignore protege .env"

        grep -q "*.key" ".gitignore" || grep -q "*.pem" ".gitignore"
        if [ $? -eq 0 ]; then
            check 0 ".gitignore protege arquivos de chaves"
        else
            warn ".gitignore não protege *.key ou *.pem"
        fi
    fi
}

# =====================================================
# 7. VALIDAÇÃO DE ACESSIBILIDADE
# =====================================================
validate_accessibility() {
    print_section "7. Acessibilidade (A11y)"

    if [ -f "index.html" ]; then
        # Verificar lang attribute
        grep -q 'lang="pt-BR"' "index.html"
        check $? "Atributo lang definido no HTML"

        # Verificar meta viewport
        grep -q 'name="viewport"' "index.html"
        check $? "Meta viewport definido (responsividade)"

        # Verificar title
        grep -q "<title>" "index.html"
        check $? "Tag title presente"

        # Verificar alt em imagens (se houver)
        if grep -q "<img" "index.html"; then
            if grep "<img" "index.html" | grep -v "alt=" | grep -q "<img"; then
                warn "Algumas tags <img> podem não ter atributo alt"
            else
                check 0 "Todas as tags <img> têm atributo alt"
            fi
        else
            info "Nenhuma tag <img> encontrada no HTML"
        fi

        # Verificar ARIA labels
        if grep -q "aria-" "index.html"; then
            check 0 "Atributos ARIA presentes (bom para acessibilidade)"
        else
            warn "Nenhum atributo ARIA encontrado (considere adicionar para melhor acessibilidade)"
        fi
    fi
}

# =====================================================
# 8. VALIDAÇÃO DE FUNCIONALIDADES
# =====================================================
validate_features() {
    print_section "8. Funcionalidades do Sistema"

    # Verificar minds-data.js
    if [ -f "assets/js/minds-data.js" ]; then
        grep -q "MINDS" "assets/js/minds-data.js" || grep -q "minds" "assets/js/minds-data.js"
        check $? "Dados das mentes definidos"

        # Contar número de mentes (procurar por padrões comuns: name:, icon:, role:)
        MINDS_COUNT=$(grep -E "name: \".*\"," "assets/js/minds-data.js" | wc -l)
        if [ "$MINDS_COUNT" -gt 0 ]; then
            info "Total de mentes configuradas: $MINDS_COUNT"
            check 0 "Sistema tem mentes configuradas ($MINDS_COUNT mentes)"
        else
            warn "Não foi possível contar mentes em minds-data.js (mas arquivo existe)"
        fi
    fi

    # Verificar comandos disponíveis
    if [ -f "assets/js/app.js" ]; then
        grep -q "/invocar" "assets/js/app.js" || grep -q "invocar" "index.html"
        check $? "Comando /invocar implementado"

        grep -q "/mesa" "assets/js/app.js" || grep -q "mesa" "index.html"
        check $? "Comando /mesa implementado"

        grep -q "/debate" "assets/js/app.js" || grep -q "debate" "index.html"
        check $? "Comando /debate implementado"

        grep -q "/mentes" "assets/js/app.js" || grep -q "mentes" "index.html"
        check $? "Comando /mentes implementado"
    fi

    # Verificar integração com OpenRouter
    if [ -f "assets/js/openrouter-api.js" ]; then
        grep -q "fetch" "assets/js/openrouter-api.js"
        check $? "OpenRouter API usa fetch"

        grep -q "Authorization" "assets/js/openrouter-api.js"
        check $? "OpenRouter API implementa autenticação"
    fi

    # Verificar voice engine
    if [ -f "assets/js/voice-engine.js" ]; then
        grep -q "SpeechSynthesis" "assets/js/voice-engine.js" || grep -q "speechSynthesis" "assets/js/voice-engine.js"
        check $? "Voice Engine usa Web Speech API"
    fi
}

# =====================================================
# 9. VALIDAÇÃO DE PERFORMANCE
# =====================================================
validate_performance() {
    print_section "9. Performance"

    # Verificar tamanho dos arquivos
    info "Verificando tamanho dos arquivos..."

    if [ -f "assets/js/app.js" ]; then
        SIZE=$(wc -c < "assets/js/app.js")
        SIZE_KB=$((SIZE / 1024))

        if [ "$SIZE_KB" -gt 500 ]; then
            warn "app.js é muito grande (${SIZE_KB}KB) - considere minificar ou dividir"
        else
            check 0 "app.js tem tamanho aceitável (${SIZE_KB}KB)"
        fi
    fi

    # Verificar se CSS está sendo carregado
    if [ -f "index.html" ]; then
        CSS_COUNT=$(grep -c 'rel="stylesheet"' "index.html")

        if [ "$CSS_COUNT" -gt 5 ]; then
            warn "Muitos arquivos CSS ($CSS_COUNT) - considere concatenar"
        else
            check 0 "Número de arquivos CSS é aceitável ($CSS_COUNT)"
        fi
    fi

    # Verificar defer/async em scripts
    if [ -f "index.html" ]; then
        if grep '<script src=' "index.html" | grep -q -E 'defer|async'; then
            check 0 "Scripts usam defer ou async (melhor performance)"
        else
            warn "Scripts não usam defer/async - pode afetar performance de carregamento"
        fi
    fi

    # Verificar preload/prefetch
    if [ -f "index.html" ]; then
        if grep -q 'rel="preconnect"' "index.html"; then
            check 0 "Usa preconnect para recursos externos"
        else
            warn "Não usa preconnect - considere adicionar para melhor performance"
        fi
    fi
}

# =====================================================
# 10. VALIDAÇÃO DE DOCUMENTAÇÃO
# =====================================================
validate_documentation() {
    print_section "10. Documentação"

    # Verificar README
    [ -f "README.md" ] && check 0 "README.md existe" || check 1 "README.md NÃO ENCONTRADO"

    # Verificar documentação adicional
    [ -f "SETUP.md" ] && check 0 "SETUP.md existe" || warn "SETUP.md não encontrado"
    [ -f "CHANGELOG_TRANSFORMACAO.md" ] && check 0 "CHANGELOG existe" || info "CHANGELOG não encontrado"

    # Verificar se README tem conteúdo mínimo
    if [ -f "README.md" ]; then
        if [ $(wc -l < "README.md") -gt 10 ]; then
            check 0 "README.md tem conteúdo adequado"
        else
            warn "README.md parece muito curto"
        fi

        # Verificar seções importantes
        grep -q "Como Usar" "README.md" || grep -q "Usage" "README.md"
        check $? "README tem seção de instruções de uso"

        grep -q "senha" "README.md" || grep -q "9091" "README.md"
        check $? "README documenta senha de acesso"
    fi
}

# =====================================================
# 11. VALIDAÇÃO COM SHELLCHECK (OPCIONAL)
# =====================================================
validate_shellcheck() {
    print_section "11. ShellCheck - Análise Estática"

    if [ "$SHELLCHECK_ENABLE" = false ]; then
        info "ShellCheck desabilitado. Use --shellcheck para ativar"
        return 0
    fi

    if ! command -v shellcheck &> /dev/null; then
        warn "ShellCheck não instalado. Instale com: apt install shellcheck"
        return 1
    fi

    info "Executando ShellCheck em scripts shell..."

    # Verificar este próprio script
    if shellcheck validate.sh 2>/dev/null; then
        check 0 "validate.sh passou na análise ShellCheck"
    else
        warn "validate.sh tem avisos do ShellCheck (não crítico)"
    fi

    # Verificar outros scripts se existirem
    if [ -d "scripts" ]; then
        SCRIPT_COUNT=0
        SCRIPT_PASS=0

        for script in scripts/*.sh; do
            if [ -f "$script" ]; then
                ((SCRIPT_COUNT++)) || true
                if shellcheck "$script" 2>/dev/null; then
                    ((SCRIPT_PASS++)) || true
                fi
            fi
        done

        if [ $SCRIPT_COUNT -gt 0 ]; then
            info "Scripts analisados: $SCRIPT_PASS/$SCRIPT_COUNT passaram"
            if [ $SCRIPT_PASS -eq $SCRIPT_COUNT ]; then
                check 0 "Todos os scripts em scripts/ passaram no ShellCheck"
            else
                warn "Alguns scripts em scripts/ têm avisos do ShellCheck"
            fi
        fi
    fi
}

# =====================================================
# 12. VALIDAÇÃO COM LIGHTHOUSE (OPCIONAL)
# =====================================================
validate_lighthouse() {
    print_section "12. Lighthouse - Auditoria PWA"

    if [ "$LIGHTHOUSE_CHECK" = false ]; then
        info "Lighthouse desabilitado. Use --lighthouse para ativar"
        return 0
    fi

    if ! command -v npx &> /dev/null; then
        warn "npx não instalado. Lighthouse requer Node.js/npm"
        return 1
    fi

    info "Executando auditoria Lighthouse (pode levar alguns minutos)..."

    # Verificar se há um servidor HTTP local rodando
    if ! command -v python3 &> /dev/null && ! command -v php &> /dev/null; then
        warn "Python3 ou PHP necessários para servidor HTTP local"
        info "Instale com: apt install python3"
        return 1
    fi

    # Iniciar servidor temporário
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8080 &>/dev/null &
        SERVER_PID=$!
        info "Servidor HTTP iniciado na porta 8080 (PID: $SERVER_PID)"
        sleep 2

        # Executar Lighthouse
        if npx lighthouse http://localhost:8080 --quiet --chrome-flags="--headless" --output=json --output-path=./lighthouse-report.json 2>/dev/null; then

            # Parse do report JSON
            if [ -f "lighthouse-report.json" ]; then
                PWA_SCORE=$(grep -o '"pwa":[0-9.]*' lighthouse-report.json | grep -o '[0-9.]*' | head -1)
                PERFORMANCE_SCORE=$(grep -o '"performance":[0-9.]*' lighthouse-report.json | grep -o '[0-9.]*' | head -1)
                ACCESSIBILITY_SCORE=$(grep -o '"accessibility":[0-9.]*' lighthouse-report.json | grep -o '[0-9.]*' | head -1)

                if [ -n "$PWA_SCORE" ]; then
                    PWA_PERCENT=$(echo "$PWA_SCORE * 100" | bc 2>/dev/null || echo "0")
                    info "Score PWA: ${PWA_PERCENT}%"

                    if (( $(echo "$PWA_SCORE >= 0.9" | bc -l 2>/dev/null || echo "0") )); then
                        check 0 "Lighthouse PWA Score: ${PWA_PERCENT}% (Excelente)"
                    elif (( $(echo "$PWA_SCORE >= 0.7" | bc -l 2>/dev/null || echo "0") )); then
                        warn "Lighthouse PWA Score: ${PWA_PERCENT}% (Melhorar)"
                    else
                        check 1 "Lighthouse PWA Score: ${PWA_PERCENT}% (Crítico)"
                    fi
                fi

                if [ -n "$PERFORMANCE_SCORE" ]; then
                    PERF_PERCENT=$(echo "$PERFORMANCE_SCORE * 100" | bc 2>/dev/null || echo "0")
                    info "Score Performance: ${PERF_PERCENT}%"
                fi

                if [ -n "$ACCESSIBILITY_SCORE" ]; then
                    A11Y_PERCENT=$(echo "$ACCESSIBILITY_SCORE * 100" | bc 2>/dev/null || echo "0")
                    info "Score Acessibilidade: ${A11Y_PERCENT}%"
                fi

                # Limpar report
                rm -f lighthouse-report.json
            else
                warn "Não foi possível gerar relatório Lighthouse"
            fi
        else
            warn "Lighthouse falhou ao executar auditoria"
        fi

        # Parar servidor
        kill $SERVER_PID 2>/dev/null || true
        info "Servidor HTTP encerrado"
    fi
}

# =====================================================
# GERADOR DE OUTPUT JSON
# =====================================================
generate_json_output() {
    local end_time=$(date +%s)
    local duration=$((end_time - START_TIME))

    cat << EOF
{
  "timestamp": "$(date -Iseconds)",
  "duration_seconds": $duration,
  "summary": {
    "total_checks": $TOTAL_CHECKS,
    "passed": $PASSED_CHECKS,
    "failed": $FAILED_CHECKS,
    "warnings": $WARNING_CHECKS,
    "critical": $CRITICAL_ERRORS,
    "success_rate": $((PASSED_CHECKS * 100 / TOTAL_CHECKS))
  },
  "errors": [
EOF

    local first=true
    for error in "${ERRORS[@]+"${ERRORS[@]}"}"; do
        [ "$first" = false ] && echo ","
        echo -n "    \"$error\""
        first=false
    done

    cat << EOF

  ],
  "warnings": [
EOF

    first=true
    for warning in "${WARNINGS[@]+"${WARNINGS[@]}"}"; do
        [ "$first" = false ] && echo ","
        echo -n "    \"$warning\""
        first=false
    done

    cat << EOF

  ],
  "critical": [
EOF

    first=true
    for crit in "${CRITICAL[@]+"${CRITICAL[@]}"}"; do
        [ "$first" = false ] && echo ","
        echo -n "    \"$crit\""
        first=false
    done

    cat << EOF

  ],
  "status": "$( [ $FAILED_CHECKS -eq 0 ] && echo "success" || echo "failure" )"
}
EOF
}

# =====================================================
# EXECUTAR TODAS AS VALIDAÇÕES
# =====================================================
main() {
    print_header

    validate_structure
    validate_syntax
    validate_configuration
    validate_pwa
    validate_dependencies
    validate_security
    validate_accessibility
    validate_features
    validate_performance
    validate_documentation

    # Validações opcionais
    validate_shellcheck
    validate_lighthouse

    # =====================================================
    # RELATÓRIO FINAL
    # =====================================================
    if [ "$JSON_OUTPUT" = false ]; then
        print_section "📊 RELATÓRIO FINAL"

        echo ""
        echo -e "${BOLD}Total de verificações:${NC} $TOTAL_CHECKS"
        echo -e "${GREEN}✓ Passou:${NC} $PASSED_CHECKS"
        echo -e "${RED}✗ Falhou:${NC} $FAILED_CHECKS"
        echo -e "${YELLOW}⚠ Avisos:${NC} $WARNING_CHECKS"
        echo ""

        # Calcular percentual de sucesso
        if [ $TOTAL_CHECKS -gt 0 ]; then
            SUCCESS_RATE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))

            echo -e "${BOLD}Taxa de sucesso:${NC} ${SUCCESS_RATE}%"
            echo ""

            if [ $SUCCESS_RATE -ge 90 ]; then
                echo -e "${GREEN}${BOLD}🎉 EXCELENTE! O projeto está em ótimo estado!${NC}"
            elif [ $SUCCESS_RATE -ge 70 ]; then
                echo -e "${YELLOW}${BOLD}👍 BOM! Alguns ajustes recomendados.${NC}"
            elif [ $SUCCESS_RATE -ge 50 ]; then
                echo -e "${YELLOW}${BOLD}⚠️  ATENÇÃO! Várias melhorias necessárias.${NC}"
            else
                echo -e "${RED}${BOLD}❌ CRÍTICO! Muitos problemas encontrados.${NC}"
            fi
        fi

        # Listar erros críticos se houver
        if [ "${#ERRORS[@]}" -gt 0 ] 2>/dev/null; then
            echo ""
            echo -e "${RED}${BOLD}Erros Críticos:${NC}"
            for error in "${ERRORS[@]+"${ERRORS[@]}"}"; do
                echo -e "  ${RED}✗${NC} $error"
            done
        fi

        # Listar avisos importantes se houver
        if [ "${#WARNINGS[@]}" -gt 0 ] 2>/dev/null; then
            echo ""
            echo -e "${YELLOW}${BOLD}Avisos Importantes:${NC}"
            for warning in "${WARNINGS[@]+"${WARNINGS[@]}"}"; do
                echo -e "  ${YELLOW}⚠${NC} $warning"
            done
        fi
    fi

    # Output JSON se solicitado
    if [ "$JSON_OUTPUT" = true ]; then
        generate_json_output
    else
        local end_time=$(date +%s)
        local duration=$((end_time - START_TIME))

        echo ""
        echo -e "${BLUE}${BOLD}=================================================${NC}"
        echo -e "${BLUE}${BOLD}  Validação concluída!${NC}"
        echo -e "${BLUE}${BOLD}  Duração: ${duration}s${NC}"
        echo -e "${BLUE}${BOLD}  Término: $(timestamp)${NC}"
        echo -e "${BLUE}${BOLD}=================================================${NC}"
        echo ""
    fi

    # Exit code baseado no resultado
    if [ $CRITICAL_ERRORS -gt 0 ]; then
        exit 2  # Erro crítico
    elif [ $FAILED_CHECKS -gt 0 ]; then
        exit 1  # Erro normal
    else
        exit 0  # Sucesso
    fi
}

# Executar validação
main "$@"
