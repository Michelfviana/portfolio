# Michel Ferreira — Portfólio

Portfólio de Engenharia de Software Full Stack, em português e inglês, construído com HTML, CSS e JavaScript. Mantém o visual escuro inspirado em terminal, com navegação responsiva, animações e filtros de certificações.

O conteúdo foi atualizado com o currículo de 2026 e o perfil público do LinkedIn: sistemas de negócio, integrações, automação, cloud, observabilidade e engenharia aumentada por IA.

## Conteúdo

- Perfil profissional e atuação na Total Express, via Leega Consultoria.
- Cinco experiências: Total Express / Leega, AgattiTech, Governo de Rondônia, Before e Grupo Energisa.
- Competências organizadas por contexto, incluindo tecnologias de projetos e laboratórios e tecnologias com familiaridade.
- Doze projetos: SisExtens, SecureChain Audit, Magic Scanner, CryptoWatch, PIC-1, Agente Inteligente, Processamento de Imagem v2, Agente de Chat Inteligente, MiniLang, Forecasting de NO₂ com LSTM, Wine Quality Analysis e Software Security Sins Lab.
- Destaque de 57+ certificados no perfil.
- Formação, idiomas, reconhecimentos e catálogo com 58 certificações e cursos: 57 da lista fornecida do LinkedIn e o EHE do currículo, sem duplicações. Inclui datas, códigos de credencial quando informados e filtros por categoria.
- Contato por e-mail, LinkedIn, GitHub e WhatsApp.

## Idiomas e GitHub Pages

As duas versões são páginas HTML estáticas, com um seletor **PT / EN** sempre visível na navegação:

- Português: `index.html` → `https://michelfviana.github.io/portfolio/`
- Inglês: `en.html` → `https://michelfviana.github.io/portfolio/en.html`

O seletor funciona sem JavaScript. Com JavaScript, preserva a seção atual na troca de idioma. As duas páginas compartilham `styles.css` e `script.js` e possuem metadados de idioma, URLs canônicas e links `hreflang`. Os nomes oficiais de cursos e certificados permanecem no idioma original.

Para publicar, envie os arquivos para a branch usada pelo GitHub Pages. Se a publicação usar **Deploy from a branch**, selecione essa branch e a pasta **/ (root)** em **Settings → Pages**. Não é necessário servidor de aplicação nem build. A seleção de idioma usa caminhos relativos compatíveis com o subdiretório `/portfolio/`.

Ao atualizar o conteúdo, mantenha `index.html` e `en.html` sincronizados.

## Executar localmente

Abra `index.html` no navegador ou inicie um servidor estático:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`. Não há dependências para instalar nem etapa de build. Fontes e ícones são carregados por Google Fonts e Font Awesome.

## Estrutura

```text
portfolio/
├── index.html   # Versão em português (entrada padrão)
├── en.html      # Versão em inglês
├── styles.css   # Estilos, responsividade e redução de movimento
├── script.js    # Navegação, animações, contadores e filtros
├── image.png    # Captura histórica, anterior à atualização de 2026
└── README.md
```

A navegação mobile informa seu estado a leitores de tela e pode ser fechada com Escape. As animações respeitam a preferência por movimento reduzido. Os números do perfil permanecem legíveis mesmo sem JavaScript.

## Links

- [Portfólio publicado](https://michelfviana.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/michel-ferreira-429b17225/)
- [GitHub](https://github.com/michelfviana)
- [E-mail](mailto:michel.fvc@proton.me)

As alterações locais precisam ser publicadas pelo fluxo de hospedagem do repositório para aparecerem no site online.
