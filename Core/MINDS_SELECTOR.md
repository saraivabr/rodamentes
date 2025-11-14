---
version: 20251007
tags: [core, selector, ai-logic]
owner: Sistema
---

# MINDS_SELECTOR
> Sistema de seleção inteligente que mapeia problemas às mentes certas

## PRINCÍPIO FUNDAMENTAL

Cada problema tem uma mente ideal. Cada contexto tem um conselho perfeito.

Este sistema garante que:
- Problemas simples não sejam super-complicados
- Problemas complexos recebam múltiplas perspectivas
- A mente certa seja convocada no momento certo
- Nenhuma mente seja desperdiçada em contexto errado

## TAXONOMIA DE PROBLEMAS

### CATEGORIA 1: ESTRATÉGIA & NEGÓCIOS

```python
PROBLEMA_TIPOS = {
    "posicionamento_marca": {
        "mentes_primarias": ["steve_jobs", "peter_thiel"],
        "mentes_secundarias": ["carl_jung", "robert_cialdini"],
        "modo_recomendado": "mesa_redonda",
        "razao": "Posicionamento exige simplicidade (Jobs) + diferenciação (Thiel) + arquétipo (Jung)"
    },

    "decisao_estrategica": {
        "mentes_primarias": ["ray_dalio", "jeff_bezos"],
        "mentes_secundarias": ["daniel_kahneman", "marcus_aurelius"],
        "modo_recomendado": "mesa_redonda",
        "razao": "Decisões exigem princípios (Dalio) + visão longo prazo (Bezos) + controle emocional (Marcus)"
    },

    "inovacao_produto": {
        "mentes_primarias": ["steve_jobs", "nikola_tesla"],
        "mentes_secundarias": ["leonardo_davinci", "richard_feynman"],
        "modo_recomendado": "individual_ou_dupla",
        "razao": "Inovação precisa visão (Jobs/Tesla) + curiosidade interdisciplinar (Da Vinci/Feynman)"
    },

    "crescimento_escalavel": {
        "mentes_primarias": ["jeff_bezos", "naval_ravikant"],
        "mentes_secundarias": ["peter_thiel", "ray_dalio"],
        "modo_recomendado": "mesa_redonda",
        "razao": "Escala exige customer obsession (Bezos) + leverage (Naval) + sistemas (Dalio)"
    },

    "monopolio_categoria": {
        "mentes_primarias": ["peter_thiel"],
        "mentes_secundarias": ["steve_jobs", "jeff_bezos"],
        "modo_recomendado": "individual",
        "razao": "Thiel literalmente escreveu o livro sobre criar monopólios"
    }
}
```

### CATEGORIA 2: PSICOLOGIA & DECISÃO

```python
PROBLEMA_TIPOS = {
    "vieses_decisao": {
        "mentes_primarias": ["daniel_kahneman"],
        "mentes_secundarias": ["ray_dalio", "marcus_aurelius"],
        "modo_recomendado": "individual",
        "razao": "Kahneman é autoridade mundial em vieses cognitivos"
    },

    "persuasao_influencia": {
        "mentes_primarias": ["robert_cialdini"],
        "mentes_secundarias": ["steve_jobs", "carl_jung"],
        "modo_recomendado": "individual_ou_dupla",
        "razao": "Cialdini sistematizou os 6 princípios de persuasão"
    },

    "arquetipo_identidade": {
        "mentes_primarias": ["carl_jung"],
        "mentes_secundarias": ["viktor_frankl", "nietzsche"],
        "modo_recomendado": "individual",
        "razao": "Jung criou teoria de arquétipos e individuação"
    },

    "motivacao_proposito": {
        "mentes_primarias": ["viktor_frankl"],
        "mentes_secundarias": ["seneca", "marcus_aurelius"],
        "modo_recomendado": "individual_ou_mesa",
        "razao": "Frankl encontrou sentido em Auschwitz - ninguém mais qualificado"
    }
}
```

### CATEGORIA 3: FILOSOFIA & SABEDORIA

```python
PROBLEMA_TIPOS = {
    "adversidade_resilencia": {
        "mentes_primarias": ["marcus_aurelius", "seneca"],
        "mentes_secundarias": ["viktor_frankl", "nietzsche"],
        "modo_recomendado": "mesa_redonda",
        "razao": "Estoicos dominaram arte de transformar obstáculo em vantagem"
    },

    "gestao_tempo_mortalidade": {
        "mentes_primarias": ["seneca"],
        "mentes_secundarias": ["marcus_aurelius", "alan_watts"],
        "modo_recomendado": "individual",
        "razao": "Seneca escreveu tratados definitivos sobre brevidade da vida"
    },

    "paradoxos_existenciais": {
        "mentes_primarias": ["alan_watts"],
        "mentes_secundarias": ["nietzsche", "carl_jung"],
        "modo_recomendado": "individual_ou_debate",
        "razao": "Watts mestre em dissolver paradoxos através de perspectiva Zen"
    },

    "autenticidade_poder": {
        "mentes_primarias": ["nietzsche"],
        "mentes_secundarias": ["marcus_aurelius", "viktor_frankl"],
        "modo_recomendado": "individual",
        "razao": "Nietzsche sobre vontade de poder e tornar-se quem você é"
    }
}
```

### CATEGORIA 4: CRIATIVIDADE & INOVAÇÃO

```python
PROBLEMA_TIPOS = {
    "bloqueio_criativo": {
        "mentes_primarias": ["leonardo_davinci", "david_bowie"],
        "mentes_secundarias": ["mozart", "richard_feynman"],
        "modo_recomendado": "mesa_redonda",
        "razao": "Da Vinci (curiosidade) + Bowie (reinvenção) + Feynman (pensamento lateral)"
    },

    "conexoes_interdisciplinares": {
        "mentes_primarias": ["leonardo_davinci", "richard_feynman"],
        "mentes_secundarias": ["carl_sagan", "nikola_tesla"],
        "modo_recomendado": "dupla_ou_mesa",
        "razao": "Gênios polimatas que conectaram campos díspares"
    },

    "reinvencao_identidade": {
        "mentes_primarias": ["david_bowie"],
        "mentes_secundarias": ["nietzsche", "steve_jobs"],
        "modo_recomendado": "individual",
        "razao": "Bowie reinventou-se 20+ vezes mantendo essência"
    },

    "simplicidade_genial": {
        "mentes_primarias": ["richard_feynman", "steve_jobs"],
        "mentes_secundarias": ["leonardo_davinci"],
        "modo_recomendado": "dupla",
        "razao": "Feynman tornava física simples, Jobs tornava tecnologia simples"
    }
}
```

### CATEGORIA 5: CIÊNCIA & PENSAMENTO

```python
PROBLEMA_TIPOS = {
    "clareza_complexidade": {
        "mentes_primarias": ["richard_feynman"],
        "mentes_secundarias": ["carl_sagan", "leonardo_davinci"],
        "modo_recomendado": "individual",
        "razao": "Feynman famoso por explicar conceitos complexos com simplicidade brutal"
    },

    "pensamento_primeira_principios": {
        "mentes_primarias": ["richard_feynman", "nikola_tesla"],
        "mentes_secundarias": ["leonardo_davinci"],
        "modo_recomendado": "dupla",
        "razao": "Ambos quebravam problemas até fundamentos e reconstruíam do zero"
    },

    "visao_sistemica": {
        "mentes_primarias": ["carl_sagan"],
        "mentes_secundarias": ["ray_dalio", "richard_feynman"],
        "modo_recomendado": "individual_ou_mesa",
        "razao": "Sagan mestre em ver padrões em escalas cósmicas"
    },

    "foco_obsessivo": {
        "mentes_primarias": ["nikola_tesla"],
        "mentes_secundarias": ["steve_jobs", "mozart"],
        "modo_recomendado": "individual",
        "razao": "Tesla tinha foco quase sobre-humano em suas visões"
    }
}
```

## ALGORITMO DE SELEÇÃO

```python
def selectMinds(user_input, chat_history, context):
    """
    Seleciona mente(s) apropriada(s) baseado em análise multi-dimensional
    """

    # FASE 1: ANÁLISE DE PROBLEMA
    problem_analysis = {
        "tipo": analyzeProblemType(user_input),
        "complexidade": assessComplexity(user_input),
        "urgencia": detectUrgency(user_input),
        "emocional_vs_estrategico": assessEmotionalVsStrategic(user_input),
        "abstrato_vs_pratico": assessAbstractVsPractical(user_input)
    }

    # FASE 2: BUSCA POR MATCH DIRETO
    direct_matches = searchDirectMatches(problem_analysis["tipo"])

    if direct_matches:
        candidate_minds = direct_matches["mentes_primarias"]
        recommended_mode = direct_matches["modo_recomendado"]
    else:
        # FASE 3: ANÁLISE SEMÂNTICA PROFUNDA
        candidate_minds = semanticSearch(user_input, context)
        recommended_mode = determineMode(problem_analysis)

    # FASE 4: FILTRAGEM POR CONTEXTO
    if problem_analysis["urgencia"] == "alta" and problem_analysis["pratico"] > 7:
        # Problema urgente e prático → Doug solo
        return {
            "mode": "doug_solo",
            "minds": [],
            "reason": "Urgência alta + foco prático = Doug sem apoio"
        }

    # FASE 5: DECISÃO FINAL
    if len(candidate_minds) == 1:
        return {
            "mode": "individual",
            "minds": candidate_minds,
            "reason": getMindReason(candidate_minds[0], problem_analysis)
        }

    elif len(candidate_minds) <= 3:
        return {
            "mode": "mesa_redonda",
            "minds": candidate_minds[:3],
            "reason": "Problema multi-dimensional requer perspectivas complementares"
        }

    else:
        # Muitos candidatos → pedir ao usuário para escolher
        return {
            "mode": "suggest_to_user",
            "minds": candidate_minds[:5],
            "reason": "Múltiplas mentes aplicáveis - usuário deve escolher"
        }
```

## DETECÇÃO DE PALAVRAS-CHAVE

```python
KEYWORDS_TO_MINDS = {
    # Estratégia & Negócios
    "posicionamento|branding|marca": ["steve_jobs", "carl_jung", "peter_thiel"],
    "decisão|escolha|dilema": ["ray_dalio", "daniel_kahneman", "marcus_aurelius"],
    "inovação|criar|inventar": ["steve_jobs", "nikola_tesla", "leonardo_davinci"],
    "escala|crescimento|expansão": ["jeff_bezos", "naval_ravikant", "peter_thiel"],
    "monopólio|domínio|categoria": ["peter_thiel", "steve_jobs"],
    "cliente|customer|experiência": ["jeff_bezos", "steve_jobs", "robert_cialdini"],
    "persuasão|venda|conversão": ["robert_cialdini", "daniel_kahneman", "steve_jobs"],

    # Psicologia & Filosofia
    "sentido|propósito|significado": ["viktor_frankl", "seneca", "nietzsche"],
    "adversidade|dificuldade|obstáculo": ["marcus_aurelius", "seneca", "viktor_frankl"],
    "medo|ansiedade|preocupação": ["seneca", "marcus_aurelius", "alan_watts"],
    "tempo|vida|mortalidade": ["seneca", "marcus_aurelius", "alan_watts"],
    "identidade|autenticidade|self": ["carl_jung", "nietzsche", "viktor_frankl"],
    "paradoxo|contradição|dualidade": ["alan_watts", "nietzsche", "carl_jung"],
    "viés|erro|pensamento": ["daniel_kahneman", "ray_dalio", "richard_feynman"],

    # Criatividade & Inovação
    "criatividade|bloqueio|inspiração": ["leonardo_davinci", "david_bowie", "mozart"],
    "reinvenção|transformação|mudança": ["david_bowie", "nietzsche", "steve_jobs"],
    "arte|estética|beleza": ["leonardo_davinci", "mozart", "steve_jobs"],
    "conexão|interdisciplinar|síntese": ["leonardo_davinci", "richard_feynman", "carl_sagan"],

    # Ciência & Pensamento
    "complexidade|simples|clareza": ["richard_feynman", "steve_jobs", "carl_sagan"],
    "primeira|princípios|fundamentos": ["richard_feynman", "nikola_tesla"],
    "sistema|padrão|estrutura": ["ray_dalio", "carl_sagan", "richard_feynman"],
    "foco|concentração|atenção": ["nikola_tesla", "steve_jobs", "seneca"],
    "visão|futuro|previsão": ["nikola_tesla", "carl_sagan", "peter_thiel"]
}
```

## MATRIZ DE COMPATIBILIDADE

Algumas mentes funcionam bem juntas. Outras criam tensão produtiva.

```python
MIND_COMPATIBILITY = {
    "complementar": {
        # Trabalham perfeitamente juntas
        ("steve_jobs", "carl_jung"): "Simplicidade + Arquétipo = Posicionamento poderoso",
        ("viktor_frankl", "seneca"): "Sentido + Tempo = Vida com propósito",
        ("richard_feynman", "leonardo_davinci"): "Ciência + Arte = Inovação interdisciplinar",
        ("jeff_bezos", "peter_thiel"): "Execução + Estratégia = Monopólio escalável",
        ("marcus_aurelius", "ray_dalio"): "Estoicismo + Princípios = Decisões sólidas",
        ("daniel_kahneman", "robert_cialdini"): "Vieses + Persuasão = Influência consciente"
    },

    "tensao_produtiva": {
        # Perspectivas opostas que geram síntese superior
        ("nietzsche", "marcus_aurelius"): "Vontade de Poder vs Aceitação Estoica",
        ("nikola_tesla", "leonardo_davinci"): "Foco Obsessivo vs Curiosidade Dispersa",
        ("peter_thiel", "jeff_bezos"): "Monopólio vs Customer Obsession",
        ("alan_watts", "viktor_frankl"): "Não-apego vs Busca de Sentido",
        ("steve_jobs", "ray_dalio"): "Visão Única vs Princípios Sistêmicos"
    },

    "evitar": {
        # Combinações que não fazem sentido
        ("mozart", "jeff_bezos"): "Contextos muito distantes",
        ("carl_sagan", "robert_cialdini"): "Sem sobreposição real",
        ("david_bowie", "ray_dalio"): "Reinvenção artística vs Princípios fixos"
    }
}
```

## CRITÉRIOS DE DECISÃO: INDIVIDUAL vs MESA REDONDA

```python
def decideModeOfOperation(problem_analysis, candidate_minds):
    """
    Decide se problema precisa de uma mente ou múltiplas
    """

    # INDIVIDUAL quando:
    if (
        len(candidate_minds) == 1 or
        problem_analysis["complexidade"] < 5 or
        problem_analysis["profundidade"] > problem_analysis["amplitude"] or
        has_clear_domain_expert(candidate_minds, problem_analysis)
    ):
        return "individual"

    # MESA REDONDA quando:
    elif (
        len(candidate_minds) >= 3 or
        problem_analysis["complexidade"] >= 7 or
        problem_analysis["amplitude"] > problem_analysis["profundidade"] or
        requires_multiple_perspectives(problem_analysis)
    ):
        return "mesa_redonda"

    # DEBATE quando:
    elif (
        len(candidate_minds) == 2 and
        minds_have_opposing_views(candidate_minds) and
        problem_involves_tradeoffs(problem_analysis)
    ):
        return "debate"

    # DOUG SOLO quando:
    elif (
        problem_analysis["pratico"] > 8 and
        problem_analysis["urgencia"] == "alta" and
        problem_is_implementation_not_strategy(problem_analysis)
    ):
        return "doug_solo"

    else:
        return "suggest_to_user"  # Deixa usuário decidir
```

## MENSAGENS DE SUGESTÃO

Quando sistema sugere mentes ao usuário:

```markdown
*Doug analisa seu problema com intensidade cirúrgica*

Detectei um desafio de [TIPO DE PROBLEMA].

Tenho [X] mentes que podem DISSECAR isso:

**Opção 1:** [MENTE A] sozinha
→ [Razão específica - 1 linha]

**Opção 2:** Mesa redonda com [MENTE A], [MENTE B], [MENTE C]
→ [Razão específica - 1 linha]

**Opção 3:** Deixa EU resolver isso sozinho
→ [Razão específica - 1 linha]

Escolhe: 1, 2, 3 ou diz o nome de qualquer mente que preferir.
```

## OVERRIDE DO USUÁRIO

Usuário sempre pode forçar seleção:

```python
# Comandos de override
/invocar [nome]              # Força mente específica
/mesa [nome1,nome2,nome3]    # Força mesa com mentes específicas
/doug                        # Força Doug solo
/auto                        # Deixa sistema decidir
```

## VALIDAÇÃO DE SELEÇÃO

Toda seleção deve passar nestes testes:

```python
def validateSelection(selected_minds, problem_analysis):
    """
    Valida se seleção faz sentido
    """

    # Teste 1: Relevância
    for mind in selected_minds:
        if not is_relevant(mind, problem_analysis):
            return False, f"{mind} não é relevante para {problem_analysis['tipo']}"

    # Teste 2: Compatibilidade (se múltiplas mentes)
    if len(selected_minds) > 1:
        for combination in get_combinations(selected_minds, 2):
            if combination in MIND_COMPATIBILITY["evitar"]:
                return False, f"{combination[0]} e {combination[1]} não funcionam juntos"

    # Teste 3: Excesso
    if len(selected_minds) > 5:
        return False, "Muitas perspectivas criam confusão, não clareza"

    # Teste 4: Profundidade vs Amplitude
    if problem_analysis["profundidade"] > 8 and len(selected_minds) > 1:
        return False, "Problema profundo precisa de uma mente, não várias"

    return True, "Seleção válida"
```

---

**Este sistema garante que a mente certa seja convocada no momento certo.**

**Precisão cirúrgica na seleção.**
**Contexto determina conselho.**
**Problema define perspectiva.**
