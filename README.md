# Michel Ferreira — Portfólio

Portfólio de Engenharia de Software Full Stack, em português e inglês, construído com HTML, CSS e JavaScript. Mantém o visual escuro inspirado em terminal, com navegação responsiva, animações e filtros de certificações.

O conteúdo foi atualizado com o currículo de 2026 e o perfil público do LinkedIn: sistemas de negócio, integrações, automação, cloud, observabilidade e engenharia aumentada por IA.

## Animações

Efeitos adaptados da referência [TopDarkFlames.github.io](https://github.com/TopDarkFlames/TopDarkFlames.github.io), preservando a paleta original definida em `styles.css`: verde `#00d084`, ciano `#22d3ee` e fundo escuro. `animations.css` e `animations.js` são compartilhados pelas versões PT/EN.

- Abertura com feixe que revela o nome e transição em direção ao logotipo, uma vez por sessão; clique, rolagem ou tecla permitem pular.
- Feixes luminosos e partículas com reação à rolagem e ao cursor. O canvas ocupa somente a tela, limita a atualização a 30 fps e pausa quando a aba está oculta.
- Brilho de vidro, inclinação de cartões, paralaxe na apresentação e botões magnéticos em dispositivos com mouse.
- Bloco de assinatura que se expande durante a rolagem. Sem JavaScript ou em telas com até 600 px de altura (como celulares em paisagem), aparece como conteúdo estático para manter todo o texto acessível.
- `prefers-reduced-motion` desativa os novos movimentos, inclusive quando a preferência muda com a página aberta.

## Conteúdo

- Download dos currículos em português e inglês (DOCX) na apresentação, disponível também sem JavaScript.
- Perfil profissional e atuação na Total Express, via Leega Consultoria.
- Cinco experiências: Total Express / Leega, AgattiTech, Governo de Rondônia, Before e Grupo Energisa.
- Competências organizadas por contexto, incluindo tecnologias de projetos e laboratórios e tecnologias com familiaridade.
- Projetos com identificação visual por área, numeração, busca por nome ou tecnologia e filtros combináveis.
- Doze projetos: SisExtens, SecureChain Audit, Magic Scanner, CryptoWatch, PIC-1, Agente Inteligente, Processamento de Imagem v2, Agente de Chat Inteligente, MiniLang, Forecasting de NO₂ com LSTM, Wine Quality Analysis e Software Security Sins Lab.
- Destaque de 57+ certificados no perfil.
- Formação, idiomas, reconhecimentos e catálogo com 58 certificações e cursos: 57 da lista fornecida do LinkedIn e o EHE do currículo, sem duplicações. Inclui datas, códigos de credencial quando informados e filtros por categoria.
- Catálogo de 58 certificados em uma área expansível nativa, acessível por teclado e sem JavaScript. Busca por curso, instituição ou tecnologia, combinada com categoria e contador de resultados.
- Contato por e-mail, LinkedIn, GitHub e WhatsApp. No desktop Linux, o link abre diretamente o WhatsApp Web; nos demais dispositivos, mantém o link `wa.me`.

## Idiomas e GitHub Pages

As duas versões são páginas HTML estáticas, com um seletor **PT / EN** sempre visível na navegação:

- Português: `index.html` → `https://michelfviana.github.io/portfolio/`
- Inglês: `en.html` → `https://michelfviana.github.io/portfolio/en.html`

O seletor funciona sem JavaScript. Com JavaScript, preserva a seção e a posição relativa de leitura na troca de idioma, mesmo quando os textos traduzidos têm alturas diferentes. As duas páginas compartilham `styles.css` e `script.js` e possuem metadados de idioma, URLs canônicas e links `hreflang`. Os nomes oficiais de cursos e certificados permanecem no idioma original.

No primeiro acesso com JavaScript, `language.js` detecta o idioma principal do navegador antes de renderizar a página: `pt`, incluindo `pt-BR` e `pt-PT`, abre português; os demais idiomas abrem inglês. A escolha fica salva no navegador. Ao clicar em **PT / EN**, a preferência é atualizada e passa a valer também nas próximas visitas, mesmo que o idioma do navegador seja diferente.

O redirecionamento preserva parâmetros e âncoras e usa caminhos relativos compatíveis com `/portfolio/`. Se o armazenamento persistente estiver bloqueado, a escolha usa a sessão; se ambos estiverem bloqueados, o seletor acrescenta `?lang=pt` ou `?lang=en` para evitar redirecionamento de volta. Esses parâmetros também permitem compartilhar um link com idioma explícito. Sem JavaScript, cada URL continua abrindo seu idioma e o seletor funciona normalmente.

Para publicar, envie os arquivos para a branch usada pelo GitHub Pages. Se a publicação usar **Deploy from a branch**, selecione essa branch e a pasta **/ (root)** em **Settings → Pages**. Não é necessário servidor de aplicação nem build. A seleção de idioma usa caminhos relativos compatíveis com o subdiretório `/portfolio/`.

Ao atualizar o conteúdo, mantenha `index.html` e `en.html` sincronizados. Os currículos ficam em `assets/resumes/`; publique essa pasta junto com as páginas. Os downloads usam caminhos relativos e o atributo HTML `download`, sem depender de serviços externos ou JavaScript.

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
├── language.js  # Idioma automático e preferência do visitante
├── animations.css # Efeitos visuais com as cores originais
├── animations.js  # Abertura, feixes, interações e expansão por rolagem
├── assets/resumes/ # Currículos PT-BR e EN para download
├── image.png    # Captura histórica, anterior à atualização de 2026
└── README.md
```

A navegação mobile informa seu estado a leitores de tela, pode ser fechada com Escape e mantém os links do menu fechado fora da ordem de foco. Um link permite pular direto para o conteúdo. As âncoras preservam a seção na URL e o histórico do navegador. As animações respeitam a preferência por movimento reduzido. Os números do perfil permanecem legíveis mesmo sem JavaScript. A busca ignora acentos e maiúsculas, combina palavras e categorias e oferece uma ação para limpar todos os filtros. As ferramentas de busca aparecem quando o JavaScript está ativo; os 12 projetos e 58 certificados continuam disponíveis no HTML estático.

## Links

- [Portfólio publicado](https://michelfviana.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/michel-ferreira-429b17225/)
- [GitHub](https://github.com/michelfviana)
- [E-mail](mailto:michel.fvc@proton.me)

As alterações locais precisam ser publicadas pelo fluxo de hospedagem do repositório para aparecerem no site online.
