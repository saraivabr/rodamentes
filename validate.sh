#!/bin/bash

# =====================================================
# RODA DE MENTES - SCRIPT DE VALIDAÇÃO COMPLETA
# Valida todos os aspectos críticos do projeto
# =====================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Contadores
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# Arrays para armazenar problemas
declare -a ERRORS
declare -a WARNINGS
declare -a SUCCESS

# Função para printar header
print_header() {
    echo ""
    echo -e "${BLUE}${BOLD}=================================================${NC}"
    echo -e "${BLUE}${BOLD}  🧠 RODA DE MENTES - VALIDAÇÃO COMPLETA${NC}"
    echo -e "${BLUE}${BOLD}=================================================${NC}"
    echo ""
}

# Função para printar seção
print_section() {
    echo ""
    echo -e "${BOLD}📋 $1${NC}"
    echo "---------------------------------------------------"
}

# Função para check
check() {
    ((TOTAL_CHECKS++))
    if [ $1 -eq 0 ]; then
        ((PASSED_CHECKS++))
        echo -e "${GREEN}✓${NC} $2"
        SUCCESS+=("$2")
        return 0
    else
        ((FAILED_CHECKS++))
        echo -e "${RED}✗${NC} $2"
        ERRORS+=("$2")
        return 1
    fi
}

# Função para warning
warn() {
    ((TOTAL_CHECKS++))
    ((WARNING_CHECKS++))
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS+=("$1")
}

# Função para info
info() {
    echo -e "${BLUE}ℹ${NC} $1"
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

    # =====================================================
    # RELATÓRIO FINAL
    # =====================================================
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
    if [ ${#ERRORS[@]} -gt 0 ]; then
        echo ""
        echo -e "${RED}${BOLD}Erros Críticos:${NC}"
        for error in "${ERRORS[@]}"; do
            echo -e "  ${RED}✗${NC} $error"
        done
    fi

    # Listar avisos importantes se houver
    if [ ${#WARNINGS[@]} -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}${BOLD}Avisos Importantes:${NC}"
        for warning in "${WARNINGS[@]}"; do
            echo -e "  ${YELLOW}⚠${NC} $warning"
        done
    fi

    echo ""
    echo -e "${BLUE}${BOLD}=================================================${NC}"
    echo -e "${BLUE}${BOLD}  Validação concluída!${NC}"
    echo -e "${BLUE}${BOLD}=================================================${NC}"
    echo ""

    # Exit code baseado no resultado
    if [ $FAILED_CHECKS -gt 0 ]; then
        exit 1
    else
        exit 0
    fi
}

# Executar validação
main
