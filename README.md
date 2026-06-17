# 🌊 Essencial Piatã 507 — Guia Digital do Hóspede

> Site de hospitalidade para o apartamento **Essencial Piatã 507**, em Salvador-BA.

---

## 🗂 Estrutura do Projeto

```
essencial-piata-507/
├── index.html          # Página principal (todas as seções)
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── app.js          # Lógica e interatividade
└── README.md           # Este arquivo
```

---

## 🚀 Publicando no GitHub Pages

### Passo a passo:

1. **Crie um repositório** no GitHub (ex: `essencial-piata-507`)
2. **Faça upload** de todos os arquivos para o repositório
3. Acesse **Settings → Pages**
4. Em **Source**, selecione `Deploy from a branch`
5. Em **Branch**, selecione `main` e pasta `/ (root)`
6. Clique em **Save**
7. Aguarde 2-3 minutos e acesse: `https://seu-usuario.github.io/essencial-piata-507/`

---

## ✏️ Personalizações Necessárias

Antes de publicar, edite no `index.html`:

| Campo | Local | O que trocar |
|-------|-------|-------------|
| WhatsApp | Linha ~60, ~350 | `5571999999999` → seu número |
| Instagram | Rodapé | `@essencialpiata507` → seu @real |
| E-mail | Seção Contato | `contato@...` → seu e-mail real |
| Mapa | Seção Como Chegar | Atualizar coordenadas GPS do endereço |
| Horários áreas | Cards de piscina/academia | Horários reais do condomínio |

---

## 🗺️ QR Code

Depois de publicar, gere o QR Code em:
- [qr-code-generator.com](https://www.qr-code-generator.com)
- [goqr.me](https://goqr.me)

Cole a URL do seu GitHub Pages e imprima para deixar no apartamento.

---

## 📸 Adicionando Fotos Reais

Todas as imagens agora são **locais** (na pasta `assets/img/`) — isso garante que carregam sempre, sem depender de sites externos.

**Suas fotos reais já estão no site:**
- `quarto-vista-mar.jpeg` → seção "O Studio" e hero
- `piscina-rooftop.jpeg` → hero, seção "O Studio" e card da Piscina

**Ilustrações temporárias (troque quando tiver fotos reais):**
- `praia-piata.jpg`, `praia-itapua.jpg`, `praia-stella.jpg`, `praia-flamengo.jpg`
- `academia.jpg`, `coworking.jpg`

Para trocar: tire uma foto, renomeie com o **mesmo nome** do arquivo acima, e substitua na pasta `assets/img/`. O site usa automaticamente. Dica: mantenha as fotos abaixo de 500KB para carregar rápido (use [tinypng.com](https://tinypng.com) para comprimir).

---

## 🌊 Integração com Tábua de Maré (futuro)

A seção de tábua de maré está preparada para API real.  
Para integrar com FEMAR, edite a função `generateTideTable()` em `js/app.js`.

---

## 🔧 Manutenção Rápida

| O que mudar | Onde |
|-------------|------|
| Senha Wi-Fi | `index.html` → seção `#informacoes` |
| Horário check-in/out | `index.html` → cards de informações |
| Horário das áreas | Clique no botão "✏️ Editar" na página ao vivo |
| Restaurantes | `index.html` → seção `#restaurantes` |
| Roteiros | `index.html` → seção `#roteiros` |
| Cor principal | `css/style.css` → variável `--teal` |

---

## 📊 Performance

O site foi desenvolvido com foco em:
- ✅ HTML/CSS/JS puro (sem frameworks)
- ✅ Lazy loading nas imagens
- ✅ Fontes via Google Fonts
- ✅ CSS Variables para manutenção fácil
- ✅ Responsivo mobile-first
- ✅ SEO básico + Open Graph
- ✅ Animações CSS nativas (sem dependências)

---

*Desenvolvido com ❤️ para tornar a experiência do hóspede inesquecível.*
