# DevDex — Portfólio acadêmico

Portfólio de João Victor Mendes Ferreira, estudante de Análise e Desenvolvimento de Sistemas no UDF Centro Universitário. O projeto apresenta as disciplinas do curso como uma enciclopédia digital inspirada em uma Pokédex e foi desenvolvido como projeto final da disciplina Desenvolvimento Front-End para Web.

## Tecnologias

- HTML5, CSS3 e JavaScript puro; sem frameworks ou etapa de build.
- Web Audio API para os chamados sonoros das criaturas.
- Google Fonts (`Press Start 2P`) para a tipografia pixelada.
- GitHub Pages para hospedagem.

## Recursos implementados

- **Abertura cinematográfica:** a tela vermelha se divide horizontalmente; a metade superior e a metade inferior da Pokébola se afastam junto com seus respectivos painéis. O centro da Pokébola fica alinhado ao corte dos painéis. A abertura dura 1,65 s, e os movimentos respeitam `prefers-reduced-motion`.
- **Pokébolas no fundo:** ícones pequenos usam o PNG transparente `images/pokebola.png`; o traço preto original é invertido por CSS para contrastar com o fundo escuro. A grade responsiva exibe cerca de 120 Pokébolas por tela, mantém o movimento diagonal de 45° em loop sem lacunas ou sobreposição e completa quatro rotações por ciclo de queda. A quantidade e o posicionamento se ajustam à tela, e o movimento respeita `prefers-reduced-motion`.
- **Navegação responsiva:** menu que abre pelo botão do cabeçalho, acompanha a seção visível e mantém o link para Contatos no fim da página.
- **Disciplinas:** lista de matérias com filtros por semestre. Selecionar uma matéria atualiza sua ficha com criatura, docente, descrição, atributos e notas de lógica, código, criatividade e dados.
- **Sprites e notas:** sprites pixelados; se uma imagem de criatura não carregar, ela é ocultada. As barras de atributos são animadas quando entram na tela.
- **Chamados sonoros:** sequências curtas sintetizadas pela Web Audio API. Podem ser acionadas pelo mouse, toque ou teclado; chamadas repetidas têm um intervalo de segurança.
- **Música de fundo:** controles para iniciar, silenciar e ajustar o volume, iniciado em 20%. O cabeçalho informa o nome da faixa e se está tocando. Se o navegador bloquear a reprodução automática, é possível iniciá-la pelo controle.
- **Contatos:** cartões de E-mail, GitHub e Instagram com Pokébolas coloridas conforme cada canal e contorno escuro uniforme. O sprite transparente, identificado como **Treinador Ferreira**, fica acima da Pokébola do E-mail, sem desalinhá-la dos outros cartões. O e-mail abre o aplicativo de mensagens; perfis sociais abrem em nova aba. Links e dados ficam em `PERFIL`; sem canais configurados, a seção continua visível com uma mensagem informativa.
- **Acessibilidade e interação:** atalho para pular ao conteúdo; lista de disciplinas operável com Tab, setas, Home/End, Enter e Espaço; Escape fecha o menu e devolve o foco ao botão. Há gesto horizontal para trocar de disciplina no celular, rótulos acessíveis e suporte à preferência por movimento reduzido.
- **Rolagem:** a lista de disciplinas mantém a rolagem vertical por toque no celular e pela roda do mouse, sem exibir barras visuais.
- **Compatibilidade e mobile:** o cabeçalho se reorganiza em telas estreitas e o layout foi verificado de 320 a 1440 px, sem rolagem horizontal. Há fallbacks para `color-mix()`, `AudioContext` do Safari e navegadores sem `IntersectionObserver`; estes mantêm a navegação, as notas e o conteúdo visíveis. O controle de volume inclui estilos para WebKit e Firefox, e animações/rolagem respeitam movimento reduzido.
- **Acabamento visual:** as divisórias internas permanecem; a moldura externa do contêiner principal foi removida. A ficha do treinador e o título/descrição de Contatos ficam alinhados à direita. O nome fica no cabeçalho, sem repetição como título da apresentação ou na meta descrição.

## Estrutura do projeto

- `index.html`: estrutura e conteúdo estático da página.
- `css/style.css`: identidade visual, layout responsivo, divisórias e animações.
- `js/data.js`: disciplinas, habilidades e informações de contato.
- `js/main.js`: renderização, filtros, navegação, áudio, Pokébolas do fundo e abertura.
- `audio/trilha-fundo.mp3`: música de fundo.
- `images/pokeball.svg`: favicon, avatar e ilustração da abertura.
- `images/pokebola.png`: Pokébola transparente usada no backdrop; CSS inverte o traço para mantê-la visível sobre o fundo escuro.
- `images/treinador-joao.png`: sprite transparente do treinador, exibido acima do cartão de e-mail.
- `images/som.png` e `images/sem-som.png`: ícones do controle de música.
- `images/criaturas/`: sprites PNG das criaturas associadas às disciplinas.
- `images/pokebola-fundo.png` e `images/pokebola-fundo-menor.png`: recursos gráficos originais mantidos no projeto.

## Atualizar conteúdo

Edite `js/data.js`:

- `MATERIAS`: cada disciplina tem `id`, `nome`, `sem`, `prof`, `tipo`, `sigla`, `cor`, `criatura`, `desc` e `stats`. Em `criatura`, atualize `nome`, `arquivo`, `atributos`, `corSecundaria` e `som`. As notas em `stats` usam valores de 0 a 100.
- `HABILIDADES`: informe `nome`, `area` e `nivel` (0 a 100).
- `PERFIL`: preencha `email`, `linkedin`, `github`, `instagram` e/ou `whatsapp`. Somente canais preenchidos geram cartões; sem canais, a seção mostra uma mensagem informativa.

Os arquivos de sprite esperados em `images/criaturas/` são:

`01-programacao.png`, `02-prototipagem.png`, `03-engenharia-prompt.png`, `04-interface-jornada.png`, `05-humanidades.png`, `06-algoritmos.png`, `07-front-end.png`, `08-design-profissional.png`, `09-banco-de-dados.png` e `10-meio-ambiente-saude.png`.

## Executar localmente

Não há dependências para instalar nem etapa de build. Abra a pasta com um servidor estático local — por exemplo, a extensão Live Server do VS Code — e acesse `index.html`.

## Publicação

O site é publicado pelo GitHub Pages a partir da branch `main`, na pasta raiz:

<https://jjferreira028.github.io/portfolio-devdex/>
