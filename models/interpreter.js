import natural from "natural";
import { promises as fs } from "fs";

const stemmer = natural.PorterStemmerPt;
const classifier = new natural.BayesClassifier(stemmer);

const staticTrainingData = [
  {
    intent: "saudacao",
    texts: [
      "oi",
      "olá",
      "e aí?",
      "tudo bem?",
      "bom dia",
      "boa tarde",
      "boa noite",
      "salve",
      "fala aí",
      "como vai?",
      "e aí, tudo certo?",
      "oi, como você está?",
      "olá! Tudo bem por aí?",
      "opa",
      "eae",
      "olá tudo bem",
      "fala",
      "e aí beleza?",
      "como você está hoje?",
      "saudações",
      "tudo tranquilo?",
      "como vai a vida?",
      "oi tudo bem",
      "alô",
      "cheguei",
      "boas",
      "ola",
      "oii",
      "e ai",
      "tudobem",
      "bom diaa",
      "boa tardee",
      "boa noitee",
      "salvee",
      "fala ai",
      "como vai vc?",
      "e ai tudo certoo",
      "oi como ce ta?",
      "ola tudo bemm",
      "falaa",
      "e ai blz?",
      "como vc esta hj?",
      "saudacoes",
      "tudo trankilo?",
      "como vai a vidaa?",
      "oi td bem",
      "aloo",
    ],
  },
  {
    intent: "pedido_foto_video",
    texts: [
      "você pode me mandar uma foto?",
      "gostaria de ver um vídeo seu",
      "manda uma foto aí",
      "você tem algum vídeo para mostrar?",
      "queria ver uma imagem do seu trabalho",
      "poderia me enviar um vídeo explicando isso?",
      "tem alguma foto nova?",
      "quero ver um vídeo!",
      "me mostra uma foto, por favor",
      "você poderia compartilhar um vídeo?",
      "envia uma foto",
      "manda um vídeo",
      "quero ver as fotos",
      "mostra os vídeos",
      "alguma imagem para mostrar?",
      "vídeo novo?",
      "posso ver alguma foto?",
      "tem algum vídeo sobre isso?",
      "manda uma selfie",
      "quero ver seu rosto",
      "mostra um pouco do seu dia em vídeo",
      "algum registro fotográfico?",
      "você tem vídeos curtos?",
      "manda um vídeo explicativo",
      "quero ver as novidades em fotos",
      "mostra um vídeo recente",
      "vc pode me manda uma foto?",
      "gostaria de ve um video seu",
      "manda uma foto ai",
      "vc tem algum video pra mostra?",
      "queria ve uma imagem do seu trabaho",
      "poderia me envia um video explicando isso?",
      "tem alguma foto ova?",
      "quero ve um video!",
      "me mostra uma foto pfvr",
      "vc poderia compartilha um video?",
      "envia uma fotoo",
      "manda um videoo",
      "quero ve as fotosss",
      "mostra os videosss",
      "alguma image pra mostra?",
      "video novo?",
      "posso ve alguma foto?",
      "tem algum video sobre issoo?",
      "manda uma selffie",
      "quero ve seu rosto?",
      "mostra um poco do seu dia em video",
      "algum registro fotografico?",
      "vc tem videos curto?",
      "manda um video explicativoo",
      "quero ve as novidades em foto",
      "mostra um video recentee",
    ],
  },
  {
    intent: "pedido_link_site",
    texts: [
      "qual é o seu site?",
      "você pode me passar o link do seu site?",
      "onde você vende seu conteúdo?",
      "qual o endereço do seu site?",
      "poderia me dar o link?",
      "onde encontro seus materiais?",
      "como acesso seu conteúdo online?",
      "qual o link da sua página de vendas?",
      "me manda o link do seu site, por favor",
      "onde posso comprar seu conteúdo?",
      "qual seu site oficial?",
      "link do conteúdo",
      "quero acessar o site",
      "qual a URL do seu site?",
      "onde compro seus produtos digitais?",
      "me dá o endereço da sua loja online",
      "qual o link para adquirir seu conteúdo?",
      "onde vejo seus cursos/e-books/etc.?",
      "passa o site aí",
      "quero visitar seu site",
      "qual o domínio do seu site?",
      "onde está disponível seu material?",
      "como faço para comprar?",
      "qual o endereço da sua plataforma?",
      "me manda o link da sua página de vendas",
      "qual eh o seu site?",
      "voce pode me passa o link do seu site?",
      "onde vc vende seu conteudo?",
      "qual o endereco do seu sitee?",
      "poderia me da o link?",
      "onde encontro seus materiais?",
      "como acesso seu conteudo onlinee?",
      "qual o link da sua pagina de vendas?",
      "me manda o link do seu site pfvr",
      "onde posso compra seu conteudo?",
      "qual seu site oficiall?",
      "link do conteudoo",
      "quero acessa o site",
      "qual a url do seu site?",
      "onde compro seus produtos digitais?",
      "me da o endereco da sua loja onlinee",
      "qual o link para adquiri seu conteudo?",
      "onde vejo seus cursos/e-books/etc?",
      "passa o site ai",
      "quero visita seu site",
      "qual o dominio do seu site?",
      "onde esta disponivel seu material?",
      "como faco para compra?",
      "qual o endereco da sua plataformaa?",
      "me manda o link da sua pagina de vendass",
      "qual o link do seu site?",
      "você pode me passar o link do seu site?",
      "onde você vende seu conteúdo?",
    ],
  },
];

async function train() {
  let trainingData = staticTrainingData;
  // let trainingData = await loadTrainingData();

  if (trainingData.length === 0) {
    throw new Error("Nenhum dado de treinamento encontrado.");
  }

  trainingData.forEach((item) => {
    if (item.intent && Array.isArray(item.texts)) {
      item.texts.forEach((text) => {
        classifier.addDocument(text.toLowerCase(), item.intent);
      });
    } else {
      console.warn(
        `Item de treinamento inválido ignorado: ${JSON.stringify(item)}`,
      );
    }
  });

  classifier.train();
}

async function loadTrainingData() {
  const trainingDataFile = "/infra/data/training_data.json";

  try {
    // Lê o conteúdo do arquivo de forma síncrona (ok para setup inicial)
    const file = await fs.readFile(process.cwd() + trainingDataFile, "utf8");
    // Faz o parse do JSON para um objeto JavaScript
    return JSON.parse(file);
  } catch (error) {
    console.error(
      `Erro ao ler ou parsear o arquivo ${trainingDataFile}:`,
      error,
    );
  }
}

function generateAnswer(text) {
  let normalizedText;

  if (text === undefined || text === null) {
    normalizedText = "Ola";
  } else {
    normalizedText = text.toLowerCase();
  }

  let context;
  try {
    context = classifier.classify(normalizedText);
  } catch (error) {
    if (error === "Not Trained") {
      train();
      return generateAnswer(text);
    }

    throw error;
  }

  const classifications = classifier.getClassifications(normalizedText);
  const topClassification = classifications[0];
  const confidence = topClassification.value;

  const confidenceThreshold = 0.009;
  console.log(normalizedText + " confiança: ", confidence);

  // if (confidence < confidenceThreshold) {
  //   return "Desculpe, nao entendi";
  // }

  switch (context) {
    case "saudacao":
      return "Ola tudo bem?";
    case "pedido_foto_video":
      return "Não mando fotos!";
    case "pedido_link_site":
      return "www.google.com";
    default:
      return "Desculpe, nao entendi";
  }
}

const interpreter = {
  train,
  generateAnswer,
};

export default interpreter;
