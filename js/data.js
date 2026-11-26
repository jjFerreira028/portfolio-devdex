// Edite aqui: textos e notas (0-100). As "notas" são autoavaliação sua.
const MATERIAS = [
  { id: 1, nome: "Programação de Computadores", sem: 1, prof: "Profª Ione Ferrarini Goulart", tipo: ["Lógica", "Código"], sigla: "PC", cor: "#3b82f6",
    criatura: { nome: "Bytelo", arquivo: "images/criaturas/01-programacao.png", atributos: ["Código", "Lógica"], corSecundaria: "#ffd60a", som: { forma: "square", notas: [620, 880, 740] } },
    desc: "Primeiros passos de verdade em programação: variáveis, condições, laços e funções.",
    stats: { Lógica: 80, Código: 85, Criatividade: 55, Dados: 50 } },
  { id: 2, nome: "Prototipagem de Sistemas Computacionais", sem: 1, prof: "Prof Relyson", tipo: ["Projeto", "Sistemas"], sigla: "PS", cor: "#8b5cf6",
    criatura: { nome: "Moldrix", arquivo: "images/criaturas/02-prototipagem.png", atributos: ["Sistemas", "Projeto"], corSecundaria: "#f97316", som: { forma: "triangle", notas: [260, 390, 330, 520] } },
    desc: "Transformar uma ideia em protótipo de sistema antes de escrever o código final.",
    stats: { Lógica: 65, Código: 55, Criatividade: 80, Dados: 55 } },
  { id: 3, nome: "Engenharia de Prompt e Aplicações em IA", sem: 1, prof: "Profª Kadidja", tipo: ["IA", "Criatividade"], sigla: "IA", cor: "#06b6d4",
    criatura: { nome: "Neurion", arquivo: "images/criaturas/03-engenharia-prompt.png", atributos: ["IA", "Criatividade"], corSecundaria: "#ec4899", som: { forma: "sine", notas: [740, 1040, 880, 1320] } },
    desc: "Como conversar com modelos de IA e usá-los em aplicações reais.",
    stats: { Lógica: 70, Código: 55, Criatividade: 90, Dados: 60 } },
  { id: 4, nome: "Interface e Jornada do Usuário", sem: 1, prof: "Prof Bruno Eduardo Morais de Araujo", tipo: ["Design", "UX"], sigla: "UX", cor: "#ec4899",
    criatura: { nome: "Pathling", arquivo: "images/criaturas/04-interface-jornada.png", atributos: ["UX", "Design"], corSecundaria: "#06b6d4", som: { forma: "triangle", notas: [520, 690, 610] } },
    desc: "Desenhar telas e fluxos pensando em quem vai usar.",
    stats: { Lógica: 50, Código: 40, Criatividade: 90, Dados: 35 } },
  { id: 5, nome: "Humanidades e a População Brasileira", sem: 1, prof: "Profª Marineila Aparecida Marques", tipo: ["Sociedade"], sigla: "HP", cor: "#22c55e",
    criatura: { nome: "Mosaíra", arquivo: "images/criaturas/05-humanidades.png", atributos: ["Sociedade", "Diversidade"], corSecundaria: ["#f59e0b", "#3b82f6", "#ec4899"], som: { forma: "sine", notas: [440, 660, 550, 770] } },
    desc: "Visão crítica sobre a formação e a diversidade da população brasileira.",
    stats: { Lógica: 40, Código: 10, Criatividade: 60, Dados: 45 } },
  { id: 6, nome: "Algoritmos e Pensamento Computacional", sem: 2, prof: "Profª Ione Ferrarini Goulart", tipo: ["Lógica", "Código"], sigla: "AL", cor: "#f59e0b",
    criatura: { nome: "Flowix", arquivo: "images/criaturas/06-algoritmos.png", atributos: ["Lógica", "Código"], corSecundaria: "#0f1c2e", som: { forma: "square", notas: [330, 495, 660] } },
    desc: "Resolver problemas em etapas claras, do raciocínio ao algoritmo.",
    stats: { Lógica: 90, Código: 75, Criatividade: 60, Dados: 55 } },
  { id: 7, nome: "Desenvolvimento Front-End para Web", sem: 2, prof: "Prof. Eliel Cruz", tipo: ["Web", "Código"], sigla: "FE", cor: "#ef4444",
    criatura: { nome: "Gridon", arquivo: "images/criaturas/07-front-end.png", atributos: ["Web", "Código"], corSecundaria: "#3b82f6", som: { forma: "sawtooth", notas: [280, 420, 560] } },
    desc: "HTML, CSS e JavaScript para criar sites responsivos. É a matéria deste projeto.",
    stats: { Lógica: 75, Código: 90, Criatividade: 85, Dados: 45 } },
  { id: 8, nome: "Design Profissional", sem: 2, prof: "Prof Bruno Eduardo Morais de Araujo", tipo: ["Design", "Carreira"], sigla: "DP", cor: "#f97316",
    criatura: { nome: "Paletto", arquivo: "images/criaturas/08-design-profissional.png", atributos: ["Design"], corSecundaria: "#3b82f6", som: { forma: "triangle", notas: [660, 520, 780] } },
    desc: "Identidade visual, apresentação e postura profissional na área de tecnologia.",
    stats: { Lógica: 40, Código: 30, Criatividade: 95, Dados: 30 } },
  { id: 9, nome: "Modelagem de Banco de Dados", sem: 2, prof: "Prof Raniere Azevedo Magalhães", tipo: ["Dados", "Sistemas"], sigla: "BD", cor: "#14b8a6",
    criatura: { nome: "Tabulon", arquivo: "images/criaturas/09-banco-de-dados.png", atributos: ["Dados", "Sistemas"], corSecundaria: ["#0f1c2e", "#ffd60a"], som: { forma: "square", notas: [300, 450, 300, 600] } },
    desc: "Organizar informações em tabelas e relações para sistemas confiáveis.",
    stats: { Lógica: 80, Código: 60, Criatividade: 45, Dados: 95 } },
  { id: 10, nome: "Meio Ambiente e Cuidados de Saúde", sem: 2, prof: "Prof Alex Luiz De Andrade Melo", tipo: ["Sociedade", "Saúde"], sigla: "MA", cor: "#84cc16",
    criatura: { nome: "Verdal", arquivo: "images/criaturas/10-meio-ambiente-saude.png", atributos: ["Natureza", "Saúde"], corSecundaria: "#ec4899", som: { forma: "sine", notas: [380, 570, 760, 640] } },
    desc: "Relação entre ambiente, saúde e responsabilidade social (40h).",
    stats: { Lógica: 35, Código: 10, Criatividade: 55, Dados: 40 } }
];

// Preencha o que quiser exibir. Campos vazios ficam ocultos no site.
const PERFIL = { email: "", linkedin: "", github: "", whatsapp: "" };

// Nível (0-100) é autoavaliação: ajuste para refletir a realidade.
const HABILIDADES = [
  { nome: "HTML e CSS", area: "Web", nivel: 80 },
  { nome: "JavaScript", area: "Web", nivel: 65 },
  { nome: "Python", area: "Programação", nivel: 60 },
  { nome: "Java", area: "Programação", nivel: 55 },
  { nome: "Banco de dados", area: "Dados", nivel: 60 }
];
