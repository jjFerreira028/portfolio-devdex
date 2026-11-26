# Portfólio DevDex

Portfólio acadêmico de João Victor Mendes Ferreira, estudante de Análise e Desenvolvimento de Sistemas (UDF Centro Universitário). As disciplinas cursadas são apresentadas em formato de enciclopédia digital inspirada em uma Pokédex.

Projeto final da disciplina Desenvolvimento Front-End para Web.

## Tecnologias
HTML5, CSS3 e JavaScript puro, sem frameworks. Design responsivo com foco em dispositivos móveis.

## Estrutura
- `index.html`: página principal
- `css/style.css`: estilos, animações e responsividade
- `js/data.js`: dados das disciplinas
- `js/main.js`: lógica de listagem, filtros, transições e controle da música
- `audio/trilha-fundo.mp3`: música de fundo autorizada para o projeto
- `images/pokeball.svg`: ícone e tela de abertura
- `images/sem-som.png`, `images/som.png`: ícones do controle de áudio
- `images/pokebola-fundo.png`: imagem original do fundo
- `images/pokebola-fundo-menor.png`: textura animada aplicada, com os ícones 50% menores e mais espaçados
- `images/perfil.jpg`: foto de perfil, quando fornecida
- `images/criaturas/`: sprites PNG das disciplinas, referenciados no campo `criatura.arquivo` de `js/data.js`

Cada registro em `MATERIAS` inclui criatura, arquivo, atributos, cor secundária e uma assinatura sonora original. No computador, passe o mouse sobre a criatura; no celular, toque nela para ouvir uma sequência curta sintetizada no navegador. A música de fundo usa `audio/trilha-fundo.mp3`; o controle no cabeçalho inicia em 20% e permite ativar, silenciar e ajustar o volume. Se a reprodução automática for bloqueada, use o ícone para iniciar a faixa. O fundo exibe Pokébolas em movimento diagonal e respeita a preferência por movimento reduzido. Os sprites processados devem ser PNGs transparentes de 64 x 64 pixels; a página os exibe com renderização pixelada e mantém a sigla como alternativa se o arquivo estiver ausente.

## Sprites das disciplinas
Arquivos esperados em `images/criaturas/`:
`01-programacao.png`, `02-prototipagem.png`, `03-engenharia-prompt.png`, `04-interface-jornada.png`, `05-humanidades.png`, `06-algoritmos.png`, `07-front-end.png`, `08-design-profissional.png`, `09-banco-de-dados.png` e `10-meio-ambiente-saude.png`.

## Publicação
Hospedado com GitHub Pages (branch `main`, pasta raiz).
