export interface ProductFinish {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface InBoxItem {
  name: string;
  nameEn?: string;
  quantity: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  priceValue: number;
  tagline: string;
  description: string;
  module: "F10" | "F50";
  badge: string | null;
  heroImage: string;
  heroTitle?: string;
  subtitle?: string;
  menuImage?: string;
  showcaseImage?: string;
  specsImage?: string;
  finishes: ProductFinish[];
  inTheBox: InBoxItem[];
  videoPreview?: string;
  soundDemo?: string;
  specsHighlight: {
    label: string;
    value: string;
    unit?: string;
  }[];
  finishGallery?: { image: string | null; label: string; labelKey?: string }[];
  highlights: {
    image: string;
    title: string;
    description: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
    cardWidth?: string;
    scale?: number;
    link?: { label: string; href: string };
  }[];
  editorialHeadline?: string;
  editorialBody?: string;
  editorialVerticalImage?: string;
  editorialHorizontalImage?: string;
  /** V\u00eddeo em loop do bloco editorial. Sem isso, usa o loop padr\u00e3o da linha. */
  editorialLoopVideo?: string;
  editorialLoopPoster?: string;
  /** Largura do loop do bloco editorial. Sem isso, ele ocupa a faixa inteira. */
  editorialLoopMaxWidth?: string;
  fullKitImage?: string;
  kitConfig?: string[];
  introLines?: string[];
  /** Foto exibida logo após o texto introdutório. */
  introImage?: string;
  galleryImages: string[];
  techTabs: {
    label: string;
    slides: {
      image?: string;
      title: string;
      description: string;
    }[];
  }[];
}

export const products: Product[] = [
  {
    id: "ef2v1",
    slug: "ef2-v1",
    name: "EF2 V1",
    price: "R$ 3,454",
    priceValue: 3454,
    tagline: "Seu ponto de partida.",
    description:
      "A entrada acessível no mundo das baterias eletrônicas, sem abrir mão da qualidade visual e do feel.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v1/ef2v1-principal-nobg.webp",
    specsImage: "/assets/images/kits/ef2v1/ef2v1-numeros-nobg.webp",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.webp" },
      { id: "grey", name: "Steel Grey", color: "#4a4a4a", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.webp" },
      { id: "white", name: "Pearl White", color: "#e8e8e8", image: "/assets/images/kits/ef2v1/ef2v1-hero-nobg.webp" },
    ],
    inTheBox: [
      { name: "Pad de caixa mesh", nameEn: "Snare mesh pad", quantity: 1 },
      { name: "Pads de tom mesh", nameEn: "Tom mesh pads", quantity: 3 },
      { name: "Pad de bumbo", nameEn: "Kick pad", quantity: 1 },
      { name: "Pad de chimbal", nameEn: "Hi-hat pad", quantity: 1 },
      { name: "Pad de crash", nameEn: "Crash pad", quantity: 1 },
      { name: "Pad de ride", nameEn: "Ride pad", quantity: 1 },
      { name: "Controlador de chimbal", nameEn: "Hi-hat controller", quantity: 1 },
      { name: "Pedais switch", nameEn: "Switch pedals", quantity: 2 },
      { name: "Rack", nameEn: "Drum rack", quantity: 1 },
      { name: "Módulo F10", nameEn: "F10 Module", quantity: 1 },
      { name: "Cabos", nameEn: "Cables", quantity: 1 },
      { name: "Fonte de alimentação", nameEn: "Power supply", quantity: 1 },
      { name: "Manual", nameEn: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "120" },
      { label: "Play Alongs", value: "33" },
      { label: "Kits\nCustomizáveis", value: "5" },
      { label: "Módulo", value: "F10" },
    ],
    finishGallery: [
      { image: "/assets/images/kits/ef2v1/ef2v1-3modelos.png", label: "" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v1/ef2v1-render-6.webp", title: "Design.", description: "Estrutura compacta, leve e funcional para qualquer estilo musical.", objectPosition: "65% center", cardWidth: "clamp(520px, 68vw, 820px)" },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-15.webp", title: "Módulo.", description: "Modelo F10 com conectividade bluetooth, porta OTG e USB-C (funciona com power bank).", link: { label: "Saiba mais aqui", href: "/technology" } },
      { image: "/assets/images/kits/ef2v1/ef2v1-render-8.webp", title: "Tecnologia e Construção.", description: "Cascos de madeira e tecnologia de ponta com trigger e peles mesh para melhor sensibilidade e feeling real ao tocar." },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-14.webp", title: "Detalhes Importam.", description: "Cada detalhe pensado para valorizar sua sensação ao explorar e tocar sua e-Force." },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-16.webp", title: "Precisão.", description: "Construção precisa e robusta para cada peça, do rack, dos cascos aos clamps que seguram os tambores.", cardWidth: "clamp(380px, 48vw, 600px)" },
      { image: "/assets/images/kits/ef2v1/ef2v1-dest-pedais-v2.webp", title: "Pedais.", description: "Com acionamento por sensor, os pedais e-Force entregam precisão e rápido acionamento, facilitando sua técnica ao tocar.", objectFit: "contain", cardWidth: "clamp(460px, 58vw, 720px)" },
    ],
    editorialHeadline: "Projetada para quem vive a música.",
    editorialBody: "A e-Force nasceu para levar a experiência de tocar bateria eletrônica a um novo patamar. Com tecnologia avançada, design global e timbres inspiradores, ela vai além do instrumento, criando uma ligação direta entre o baterista e cada batida.",
    editorialVerticalImage: "/assets/images/kits/ef2v1/ef2v1-module-vertical.webp",
    editorialHorizontalImage: "/assets/images/kits/ef2v1/ef2v1-render-8.webp",
    fullKitImage: "/assets/images/kits/ef2v1/ef2v1-full-kit.webp",
    kitConfig: [
      "1 pad de caixa mesh com casco 8\" x 2,5\" (dual zone)",
      "3 pads de tom mesh 8\" x 2,5\" (single zone)",
      "1 pad de bumbo",
      "1 pad de hi-hat 10\" (single zone)",
      "1 pad de crash 10\" (single zone)",
      "1 pad de ride 10\" (single zone)",
      "Controlador de hi-hat",
      "2 pedais switch",
      "Rack de bateria",
      "Módulo F10",
    ],
    introLines: [
      "A e-Force EF2 versão 1 powered by Odery é a porta de entrada para a nova geração de baterias eletrônicas Odery e-Force, unindo praticidade, conectividade e uma experiência mais natural para quem quer começar a tocar ou estudar com mais conforto.",
      "Com peles mesh, configuração completa e módulo F10, a EF2 versão 1 entrega os recursos essenciais para uma rotina de estudo moderna, silenciosa e funcional, sem abrir mão de tocabilidade e boa apresentação visual.",
      "É uma excelente escolha para quem busca uma bateria eletrônica versátil para uso residencial, estudo diário, aulas e primeiros passos no instrumento.",
    ],
    galleryImages: [
      "/assets/images/kits/ef2v1/ef2v1-hero-nobg.webp",
      "/assets/images/kits/ef2v1/ef2v1-principal-nobg.webp",
    ],
    techTabs: [],
  },
  {
    id: "ef2v2",
    slug: "ef2-v2",
    name: "EF2 V2",
    price: "R$ 4,527",
    priceValue: 4527,
    tagline: "A primeira escolha do baterista.",
    description:
      "O melhor custo-benefício em baterias eletrônicas — estética de shell em madeira, conectividade moderna e até três acabamentos exclusivos.",
    module: "F10",
    badge: "home.bestSeller",
    heroImage: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.webp",
    specsImage: "/assets/images/kits/ef2v2/ef2v2-numeros-nobg.webp",
    finishes: [
      { id: "dark", name: "Dark Midnight", color: "#1a1a2e", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.webp" },
      { id: "ocean-blue", name: "Ocean Blue", color: "#1a5a7a", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.webp" },
      { id: "racing-red", name: "Racing Red", color: "#8b1a1a", image: "/assets/images/kits/ef2v2/ef2v2-hero-nobg.webp" },
    ],
    inTheBox: [
      { name: "Pad de caixa mesh com casco", nameEn: "Snare mesh pad with shell", quantity: 1 },
      { name: "Pads de tom mesh com casco", nameEn: "Tom mesh pads with shell", quantity: 3 },
      { name: "Torre de bumbo", nameEn: "Kick tower", quantity: 1 },
      { name: "Pad de chimbal", nameEn: "Hi-hat pad", quantity: 1 },
      { name: "Crash com choke", nameEn: "Crash choke", quantity: 1 },
      { name: "Pad de ride", nameEn: "Ride pad", quantity: 1 },
      { name: "Controlador de chimbal", nameEn: "Hi-hat controller", quantity: 1 },
      { name: "Pedal de bumbo", nameEn: "Kick pedal", quantity: 1 },
      { name: "Rack", nameEn: "Drum rack", quantity: 1 },
      { name: "Módulo F10", nameEn: "F10 Module", quantity: 1 },
      { name: "Cabos", nameEn: "Cables", quantity: 1 },
      { name: "Fonte de alimentação", nameEn: "Power supply", quantity: 1 },
      { name: "Manual", nameEn: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "120" },
      { label: "Play Alongs", value: "33" },
      { label: "Kits\nCustomizáveis", value: "5" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-design.webp", title: "Design.", description: "Visual minimalista, cascos de madeira e opções de acabamentos. Pronta para o play!", cardWidth: "clamp(520px, 65vw, 820px)" },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-acabamentos.webp", title: "Acabamentos.", description: "Escolha entre três diferentes acabamentos. Na e-Force você é livre para escolher." },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-pratos.png", title: "Pratos.", description: "Prato com visual bicolor e função \"Choke\"." },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-tecnologia.webp", title: "Tecnologia e Conectividade.", description: "Modelo F10 com conectividade bluetooth, porta OTG e USB-C (funciona com power bank).", link: { label: "Saiba mais aqui", href: "/technology" } },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-estrutura.webp", title: "Estrutura.", description: "Rack compacto, estruturalmente sólido e estável.", cardWidth: "clamp(520px, 65vw, 820px)" },
      { image: "/assets/images/kits/ef2v2/ef2v2-dest-pedal.webp", title: "Pedal.", description: "Pedal de bumbo nível Odery de verdade. Conta com corrente, regulagem de pressão e ângulo. Sua técnica no controle." },
    ],
    editorialHeadline: "Projetada para quem vive a música.",
    editorialBody: "A e-Force nasceu para levar a experiência de tocar bateria eletrônica a um novo patamar. Com tecnologia avançada, design global e timbres inspiradores, ela vai além do instrumento, criando uma ligação direta entre o baterista e cada batida.",
    editorialVerticalImage: "/assets/images/kits/ef2v2/ef2v2-vertical-purple.webp",
    editorialHorizontalImage: "/assets/images/kits/ef2v2/ef2v2-render-5.webp",
    fullKitImage: "/assets/images/kits/ef2v2/ef2v2-fullkit-nobg.webp",
    kitConfig: [
      "Caixa mesh com casco 10\" x 4\" (dual zone)",
      "3 toms mesh com casco 8\" x 2,5\" (single zone)",
      "Kick tower",
      "Hi-hat pad 10\" (single zone)",
      "Crash 10\" (dual zone) com função choke",
      "Ride 10\" (dual zone) com função choke",
      "Controlador de hi-hat",
      "Pedal de bumbo",
      "Rack",
      "Módulo F10",
    ],
    introLines: [
      "A e-Force EF2 versão 2 powered by Odery representa um passo importante em tocabilidade e experiência dentro da linha, oferecendo uma configuração mais robusta para quem deseja evoluir com mais conforto, controle e realismo.",
      "Com caixa maior, kick tower (torre do bumbo), pedal de bumbo real e pratos com função choke, a EF2 V2 entrega uma sensação mais próxima da performance em um kit acústico, mantendo a praticidade e os benefícios de uma bateria eletrônica moderna.",
      "É uma excelente opção para músicos que já querem começar com um setup mais completo ou para quem busca um modelo intermediário com ótimo equilíbrio entre custo, entrega e percepção de valor.",
    ],
    galleryImages: [
      "/assets/images/kits/ef2v2/ef2v2-hero-nobg.webp",
      "/assets/images/kits/ef2v2/ef2v2-numeros-nobg.webp",
    ],
    showcaseImage: "/assets/images/kits/ef2v2/ef2v2-showcase.webp",
    finishGallery: [
      { image: "/assets/images/kits/ef2v2/ef2v2-acabamentos.png", label: "" },
    ],
    techTabs: [],
  },
  {
    id: "ef2v3",
    slug: "ef2-v3",
    name: "EF2 V3",
    price: "R$ 5,103",
    priceValue: 5103,
    tagline: "O próximo passo natural.",
    description:
      "Hardware aprimorado e recursos expandidos para bateristas prontos para levar a prática mais longe.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v3/ef2v3-fullkit-nobg.webp",
    menuImage: "/assets/images/kits/ef2v3/ef2v3-menu.webp",
    showcaseImage: "/assets/images/kits/ef2v3/ef2v3-menu.webp",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v3/ef2v3-hero.webp" },
      { id: "silver", name: "Brushed Silver", color: "#b0b0b0", image: "/assets/images/kits/ef2v3/ef2v3-hero.webp" },
      { id: "red", name: "Deep Red", color: "#8b2020", image: "/assets/images/kits/ef2v3/ef2v3-hero.webp" },
    ],
    inTheBox: [
      { name: "Pad de caixa mesh", nameEn: "Snare mesh pad", quantity: 1 },
      { name: "Pads de tom mesh", nameEn: "Tom mesh pads", quantity: 3 },
      { name: "Torre de bumbo", nameEn: "Kick tower", quantity: 1 },
      { name: "Pad de chimbal", nameEn: "Hi-hat pad", quantity: 1 },
      { name: "Pads de crash", nameEn: "Crash pads", quantity: 2 },
      { name: "Pad de ride", nameEn: "Ride pad", quantity: 1 },
      { name: "Pedal de bumbo", nameEn: "Kick pedal", quantity: 1 },
      { name: "Rack reforçado", nameEn: "Reinforced drum rack", quantity: 1 },
      { name: "Módulo F10", nameEn: "F10 Module", quantity: 1 },
      { name: "Cabos", nameEn: "Cables", quantity: 1 },
      { name: "Fonte de alimentação", nameEn: "Power supply", quantity: 1 },
      { name: "Manual", nameEn: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "120" },
      { label: "Play Alongs", value: "33" },
      { label: "Kits\nCustomizáveis", value: "5" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-design.webp", title: "Design.", description: "Visual atraente de bateria de nível superior com rack amplo e design marcante. Cascos de madeira com cores modernas e marcantes.", cardWidth: "clamp(520px, 65vw, 820px)" },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-23.webp", title: "Tecnologia.", description: "Explore o módulo F10 com Bluetooth nativo, Porta OTG para gravações ao vivo e carregamento via Power bank.", objectFit: "contain", cardWidth: "clamp(260px, 28vw, 360px)" },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-24.webp", title: "Shells.", description: "Cascos de madeira remetendo à baterias acústicas com peles Mesh e possibilidade de afinação para uma melhor sensibilidade." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-25.webp", title: "Performance e Precisão.", description: "Conexões de design refinado e extremamente funcionais. Estabilidade e performance sólidas para que você deixe sua técnica fluir." },
      { image: "/assets/images/kits/ef2v3/ef2v3-dest-26.webp", title: "Acabamento.", description: "Cores especiais para quem quer ter escolha. A e-Force não te limita! Note a plaquinha de identificação. Nossa cereja do bolo." },
    ],
    fullKitImage: "/assets/images/kits/ef2v3/ef2v3-dest-28.webp",
    kitConfig: [
      "Caixa mesh com casco 10\" x 4\" (dual zone)",
      "3 toms mesh 8\" x 2,5\" (single zone)",
      "Kick tower",
      "Hi-hat 10\" (single zone)",
      "2 crashes 10\" (dual zone) com função choke",
      "Ride 10\" (dual zone) com função choke",
      "Pedal de bumbo",
      "Rack reforçado",
      "Módulo F10",
    ],
    introLines: [
      "A e-Force EF2 versão 3 powered by Odery foi desenvolvida para quem busca mais versatilidade no setup e uma experiência mais completa de performance dentro da linha EF2.",
      "Com dois crashes, ride com função choke, kick tower (torre do bumbo) e rack reforçado, este modelo amplia as possibilidades de execução e entrega uma configuração mais próxima das necessidades de quem já está em evolução no instrumento.",
      "A EF2 V3 é indicada para bateristas que desejam mais liberdade de montagem, melhor resposta para prática mais intensa e um kit com presença superior tanto em funcionalidade quanto em percepção visual.",
    ],
    specsImage: "/assets/images/kits/ef2v3/ef2v3-specs-new.webp",
    editorialHeadline: "Projetada para quem vive a música.",
    editorialBody: "A e-Force nasceu para levar a experiência de tocar bateria eletrônica a um novo patamar. Com tecnologia avançada, design global e timbres inspiradores, ela vai além do instrumento, criando uma ligação direta entre o baterista e cada batida.",
    galleryImages: [
      "/assets/images/kits/ef2v3/ef2v3-aerial.webp",
      "/assets/images/kits/ef2v3/ef2v3-perspective-nobg.webp",
      "/assets/images/kits/ef2v3/ef2v3-front.webp",
      "/assets/images/kits/ef2v3/ef2v3-studio-1.webp",
      "/assets/images/kits/ef2v3/ef2v3-detail-pads.webp",
      "/assets/images/kits/ef2v3/ef2v3-detail-2.webp",
      "/assets/images/kits/ef2v3/ef2v3-detail-3.webp",
      "/assets/images/kits/ef2v3/ef2v3-detail-4.webp",
      "/assets/images/kits/ef2v3/ef2v3-studio-2.webp",
      "/assets/images/kits/ef2v3/ef2v3-studio-3.webp",
    ],
    finishGallery: [
      { image: "/assets/images/kits/ef2v3/ef2v3-acabamentos.png", label: "" },
    ],
    techTabs: [],
  },
  {
    id: "ef2v4",
    slug: "ef2-v4",
    name: "EF2 V4",
    price: "R$ 7,770",
    priceValue: 7770,
    tagline: "Performance premium intermediária.",
    description:
      "Hardware refinado, conectividade expandida e presença de palco imponente a uma fração do preço do topo de linha.",
    module: "F10",
    badge: null,
    heroImage: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.webp",
    specsImage: "/assets/images/kits/ef2v4/ef2v4-specs.webp",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.webp" },
      { id: "blue", name: "Ocean Blue", color: "#1a3a5c", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.webp" },
      { id: "natural", name: "Natural Wood", color: "#c4a265", image: "/assets/images/kits/ef2v4/ef2v4-hero-nobg.webp" },
    ],
    inTheBox: [
      { name: "Pad de caixa mesh com casco", nameEn: "Snare mesh pad with shell", quantity: 1 },
      { name: "Pads de tom mesh", nameEn: "Tom mesh pads", quantity: 3 },
      { name: "Torre de bumbo", nameEn: "Kick tower", quantity: 1 },
      { name: "Pad de chimbal", nameEn: "Hi-hat pad", quantity: 1 },
      { name: "Pads de crash", nameEn: "Crash pads", quantity: 2 },
      { name: "Pad de ride", nameEn: "Ride pad", quantity: 1 },
      { name: "Rack profissional", nameEn: "Professional drum rack", quantity: 1 },
      { name: "Pedal Equalizer P-803", nameEn: "Equalizer pedal P-803", quantity: 1 },
      { name: "Máquina de caixa S-803", nameEn: "Snare stand S-803", quantity: 1 },
      { name: "Máquina de chimbal H-803", nameEn: "Hi-hat stand H-803", quantity: 1 },
      { name: "Extensores CB-803EQ", nameEn: "Extension arms CB-803EQ", quantity: 3 },
      { name: "Módulo F10", nameEn: "F10 Module", quantity: 1 },
      { name: "Cabos", nameEn: "Cables", quantity: 1 },
      { name: "Fonte de alimentação", nameEn: "Power supply", quantity: 1 },
      { name: "Manual", nameEn: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "120" },
      { label: "Play Alongs", value: "33" },
      { label: "Kits\nCustomizáveis", value: "5" },
      { label: "Módulo", value: "F10" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-30.webp", title: "Design.", description: "Visual de bateria de nível superior. Conta com ferragens reais da série Odery Equalizer e pratos Full cover.", cardWidth: "clamp(520px, 65vw, 820px)" },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-31.webp", title: "Pratos Full Cover.", description: "Pratos top de linha com toque sensível e suave, além de um visual moderno e com funções completas para atender o mais exigente baterista." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-32.webp", title: "Ferragens.", description: "Ferragens Odery Equalizer – Pedal, máquina chimbal, suporte de caixa e extensores de pratos.", cardWidth: "clamp(520px, 65vw, 820px)" },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-33.webp", title: "Tecnologia.", description: "Explore o módulo F10 com Bluetooth nativo, Porta OTG para gravações ao vivo e carregamento via Power bank.", objectFit: "contain", cardWidth: "clamp(260px, 28vw, 360px)" },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-34.webp", title: "Shells.", description: "Cascos de madeira com a pegada acústica, peles Mesh e possibilidade de afinar a tensão para um melhor feeling ao tocar." },
      { image: "/assets/images/kits/ef2v4/ef2v4-dest-35.webp", title: "Acabamento.", description: "Acabamentos primorosos em cada detalhe tal qual a placa de identificação – nossa cereja do bolo." },
    ],
    editorialHeadline: "Projetada para quem vive a música.",
    editorialBody: "A e-Force nasceu para levar a experiência de tocar bateria eletrônica a um novo patamar. Com tecnologia avançada, design global e timbres inspiradores, ela vai além do instrumento, criando uma ligação direta entre o baterista e cada batida.",
    editorialVerticalImage: "/assets/images/kits/ef2v4/ef2v4-render-23.webp",
    editorialHorizontalImage: "/assets/images/kits/ef2v4/ef2v4-render-14.webp",
    fullKitImage: "/assets/images/kits/ef2v4/ef2v4-dest-29.webp",
    kitConfig: [
      "Caixa mesh com casco 10\" x 4\" (dual zone)",
      "3 toms mesh 8\" x 2,5\" (single zone)",
      "Kick tower (bumbo)",
      "Hi-hat 12\" (single zone)",
      "2 crashes 12\" (dual zone) com função choke",
      "Ride 14\" (3 zones) com função choke",
      "Rack profissional",
      "— Ferragens Equalizer inclusas —",
      "Pedal de bumbo P-803",
      "Suporte de caixa S-803",
      "Máquina de chimbal H-803",
      "03 extensores CB-803EQ",
    ],
    introLines: [
      "A e-Force EF2 versão 4 powered by Odery é a versão mais completa da linha EF2, desenvolvida para oferecer uma experiência superior de tocabilidade, estrutura e presença visual.",
      "Com chimbal de 12\", 02 crashes de 12\", ride de 14\" com 3 zonas, rack profissional em \"L\" e ferragens poderosas da Odery Equalizer inclusas, a EF2 V4 entrega um setup mais próximo da proposta de uma bateria acústica, com mais conforto, estabilidade e percepção de valor.",
      "É a escolha ideal para quem busca um kit eletrônico mais completo, com visual mais profissional, melhor experiência de uso e uma configuração pronta para atender músicos mais exigentes.",
    ],
    galleryImages: [
      "/assets/images/kits/ef2v4/ef2v4-hero-nobg.webp",
      "/assets/images/kits/ef2v4/ef2v4-numeros-nobg.webp",
    ],
    finishGallery: [
      { image: "/assets/images/kits/ef2v4/ef2v4-acabamentos.png", label: "" },
    ],
    techTabs: [],
  },
  {
    id: "ef5v2",
    slug: "ef5-v2",
    name: "EF5 V2",
    price: "R$ 13,713",
    priceValue: 13713,
    tagline: "O instrumento do profissional.",
    description:
      "Som de nível estúdio, resposta expressiva dos pads e a biblioteca de 937 sons do módulo F50. Feita para bateristas sérios.",
    module: "F50",
    badge: null,
    heroImage: "/assets/images/kits/ef5v2/ef5v2-principal-nobg.webp",
    menuImage: "/assets/images/kits/ef5v2/ef5v2-menu.webp",
    showcaseImage: "/assets/images/kits/ef5v2/ef5v2-menu.webp",
    specsImage: "/assets/images/kits/ef5v2/ef5v2-specs-copper.webp",
    fullKitImage: "/assets/images/kits/ef5v2/ef5v2-antes-destaq.webp",
    kitConfig: [
      "Caixa com casco mesh 12\" x 4,5\" (dual zone)",
      "3 toms com casco mesh: 2 pads 10\"x4,5\" e 1 pad 12\"x4,5\" (single zone)",
      "Bumbo acústico com trigger",
      "Hi-hat 14\" (dual zone)",
      "2 crashes choke 14\" (dual zone) com função choke",
      "Ride 16\" (3 zones) com função choke",
      "Rack tubular curvo",
      "3 extensores Odery CB-803EQ",
      "Módulo F50",
    ],
    introLines: [
      "A e-Force EF5 versão 2 powered by Odery eleva a proposta da linha para um novo patamar de profissionalismo, combinando o poderoso módulo F50 (topo de linha), tambores acústicos com canoas e bases Odery Eyedentity series, bumbo com pele dos dois lados, novo pé de bumbo Odery assim como uma configuração mais robusta para músicos que buscam mais recursos, presença e performance em altíssimo nível.",
      "Com pratos maiores e estilo Full Cover, interface mais avançada e visual mais completo, a EF5 V2 atende muito bem quem busca uma experiência mais sofisticada e profissional dentro da linha E-Force.",
    ],
    introImage: "/assets/images/kits/ef5v2/ef5v2-kit-apos-texto.webp",
    finishes: [
      { id: "black", name: "Midnight Black", color: "#1a1a2e", image: "/assets/images/kits/ef5v2/ef5v2-hero.webp" },
      { id: "pearl", name: "Pearl White", color: "#e8e8e8", image: "/assets/images/kits/ef5v2/ef5v2-hero.webp" },
      { id: "cherry", name: "Cherry Burst", color: "#8b1a1a", image: "/assets/images/kits/ef5v2/ef5v2-hero.webp" },
    ],
    inTheBox: [
      { name: "Pad de caixa mesh com casco", nameEn: "Snare mesh pad with shell", quantity: 1 },
      { name: "Pads de tom mesh com casco", nameEn: "Tom mesh pads with shell", quantity: 3 },
      { name: "Bumbo acústico com trigger", nameEn: "Acoustic kick drum with trigger", quantity: 1 },
      { name: "Pads crash com choke", nameEn: "Crash choke pads", quantity: 2 },
      { name: "Pad de ride", nameEn: "Ride pad", quantity: 1 },
      { name: "Rack reforçado", nameEn: "Reinforced drum rack", quantity: 1 },
      { name: "Extensores CB-803EQ", nameEn: "Extension arms CB-803EQ", quantity: 3 },
      { name: "Módulo F50", nameEn: "F50 Module", quantity: 1 },
      { name: "Cabos", nameEn: "Cables", quantity: 1 },
      { name: "Fonte de alimentação", nameEn: "Power supply", quantity: 1 },
      { name: "Manual", nameEn: "Manual", quantity: 1 },
    ],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "937" },
      { label: "Kits Customizáveis", value: "46" },
      { label: "Tipos de Reverb", value: "23" },
      { label: "Módulo", value: "F50" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-3.webp", title: "Módulo F50.", description: "O poder e a força de um módulo altamente tecnológico, moderno e profissional.", objectFit: "contain" as const },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest1.webp", title: "Novo pé de bumbo Odery.", description: "Estrutura sólida que proporciona estabilidade e segurança. Pode ser usado na âncora ou na borracha (com troca rápida).", objectFit: "cover" as const, objectPosition: "bottom", cardWidth: "clamp(306px, 34vw, 450px)", scale: 1.05 },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-bsci-frontal.webp", title: "", description: "", objectFit: "cover" as const },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-4.webp", title: "Ferragens Odery Eyedentity.", description: "Canoas, bases e extensores Odery Eyedentity com visual contemporâneo e minimalista. Extremamente sólido e confiável." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-5.webp", title: "Minimalismo em cada detalhe.", description: "Rack tubular curvo e com cabos ocultos (internos). Fácil de montar, visual limpo e organizado sem cabos passando por toda a bateria." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-6.webp", title: "Acabamentos refinados.", description: "Cores discretas mas de beleza ímpar que faz da EF5 uma bateria de estilo único e forte identidade." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-7.webp", title: "Pensada em cada detalhe.", description: "Plaquinha de identificação como a cereja do bolo afinal, cada detalhe importa. Cada detalhe eleva o nível de percepção de qualidade e-Force.", objectFit: "cover" as const, cardWidth: "clamp(500px, 62vw, 780px)" },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-8.webp", title: "Rack único.", description: "Rack curvo tubular e que oculta os cabos. Design único, prático, fácil de montar, praticamente Plug & Play." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-9.webp", title: "Detalhes e detalhes.", description: "Aqui você vê o detalhe da borracha de acabamento do casco de madeira. Mais uma vez demonstrando a preocupação com a qualidade e visual em cada detalhe." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-bsci-modulo.webp", title: "", description: "", objectFit: "cover" as const },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-10.webp", title: "Construção.", description: "Cascos de madeira com todos os itens de tecnologia interna de forma organizada, limpa e bem estruturada." },
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-11.webp", title: "Pratos Full Cover.", description: "Pratos top de linha com toque sensível e suave, além de um visual moderno e com funções completas para atender o mais exigente baterista." },
    ],
    editorialHeadline: "Construída para durar.",
    editorialBody: "Somando décadas de experiência, proximidade com bateristas e um olhar único para design e sonoridade, a colaboração da Odery Drums enriquece o projeto com elementos que fazem a diferença nos mínimos detalhes.",
    editorialVerticalImage: "/assets/images/kits/ef5v2/ef5v2-editorial-vertical.webp",
    editorialHorizontalImage: "/assets/images/kits/ef5v2/ef5v2-editorial-horizontal.webp",
    galleryImages: [
      "/assets/images/kits/ef5v2/ef5v2-hero.webp",
      "/assets/images/kits/ef5v2/ef5v2-dramatic.webp",
      "/assets/images/kits/ef5v2/ef5v2-front.webp",
      "/assets/images/kits/ef5v2/ef5v2-aerial.webp",
    ],
    finishGallery: [
      { image: "/assets/images/kits/ef5v2/ef5v2-meco.webp", label: "MECO - All Mettalized Copper" },
      { image: "/assets/images/kits/ef5v2/ef5v2-mesi.webp", label: "MESI - All Mettalized Silver" },
      { image: "/assets/images/kits/ef5v2/ef5v2-bsci.webp", label: "", labelKey: "product.finishBsci" },
    ],
    techTabs: [],
  },
  {
    id: "ef7eye",
    slug: "ef7-eye-hybrid",
    name: "EF7 Odery Eyedentity Hybrid",
    price: "R$ 23,527",
    priceValue: 23527,
    tagline: "O topo. A declara\u00e7\u00e3o.",
    description:
      "Onde a forma ac\u00fastica e a capacidade eletr\u00f4nica se unem sem concess\u00f5es. A experi\u00eancia E-Force definitiva.",
    module: "F50",
    badge: "home.flagship",
    heroImage: "/assets/images/kits/ef7eye/ef7eye-teal-nobg.webp",
    menuImage: "/assets/images/kits/ef7eye/ef7eye-ssb-nobg.webp",
    showcaseImage: "/assets/images/kits/ef7eye/ef7eye-ssb-nobg.webp",
    specsImage: "/assets/images/kits/ef7eye/ef7eye-ssb-nobg.webp",
    fullKitImage: "/assets/images/kits/ef7eye/ef7eye-fullkit-teal.webp",
    kitConfig: [
      "Caixa SD.EYE.1406",
      "Tom tom 10\" x 7,5\"",
      "Tom tom 12\" x 8\"",
      "Floor tom 14\" x 13\"",
      "Bumbo 20\" x 17\"",
      "Hi-hat 14\" (dual zone)",
      "Controlador de hi-hat",
      "2 crashes choke 14\" (dual zone) com fun\u00e7\u00e3o choke",
      "Ride 16\" (3 zones) com fun\u00e7\u00e3o choke",
      "M\u00f3dulo F50",
      "Cabos",
      "Fonte",
      "Manual",
    ],
    introLines: [
      "A e-Force EF7 \u00e9 uma bateria Odery Eyedentity 100% Maple americano sendo o suprassumo da linha E-Force pois \u00e9 uma verdadeira bateria ac\u00fastica top de linha combinada ao poderoso m\u00f3dulo F50 que entrega recursos dentre os mais profissionais do mercado. Este kit pode ser tocado tanto de forma eletr\u00f4nica como de forma ac\u00fastica (necessita a troca das peles). E EF7 Odery Eyedentity entrega um visual \u00fanico com presen\u00e7a e performance de extrema raridade neste mercado de eletr\u00f4nicas.",
      "Com pratos maiores e estilo Full Cover, interface mais avan\u00e7ada e visual mais completo, a EF7 atende a mais alta gama do mercado de baterias eletr\u00f4nicas adicionando uma experi\u00eancia \u00fanica.",
    ],
    finishes: [
      { id: "tbc", name: "TBC - The Blue Cave", color: "#1a7a8c", image: "/assets/images/kits/ef7eye/ef7eye-tbc.webp" },
      { id: "ssb", name: "SSB - Sunset Burst", color: "#c4451f", image: "/assets/images/kits/ef7eye/ef7eye-ssb.webp" },
    ],
    inTheBox: [],
    videoPreview: undefined,
    soundDemo: undefined,
    specsHighlight: [
      { label: "Sons", value: "937" },
      { label: "Kits Customiz\u00e1veis", value: "46" },
      { label: "Tipos de Reverb", value: "23" },
      { label: "M\u00f3dulo", value: "F50" },
    ],
    highlights: [
      { image: "/assets/images/kits/ef5v2/ef5v2-dest-3.webp", title: "M\u00f3dulo F50.", description: "O poder e a for\u00e7a de um m\u00f3dulo altamente tecnol\u00f3gico, moderno e profissional.", objectFit: "contain" as const, cardWidth: "clamp(320px, 50vw, 880px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-acabamento.webp", title: "Acabamento primoroso.", description: "Peles mesh e anel de borracha instalado nos aros.", objectFit: "cover" as const, cardWidth: "clamp(230px, 26vw, 350px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-construcao.webp", title: "Constru\u00e7\u00e3o pensada nos m\u00ednimos detalhes.", description: "Para a uni\u00e3o dos dois mundos.", objectFit: "cover" as const, cardWidth: "clamp(230px, 26vw, 350px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-pratos.webp", title: "Pratos Full Cover de alta sensibilidade.", description: "", objectFit: "cover" as const, cardWidth: "clamp(280px, 36vw, 485px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-cascos.webp", title: "Cascos em Maple Americano.", description: "E a assinatura Odery em todas as pe\u00e7as.", objectFit: "cover" as const, cardWidth: "clamp(400px, 62vw, 1100px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-meduza-h.webp", title: "Meduza para conex\u00e3o de todos os tambores e pratos.", description: "Possibilita expans\u00e3o.", objectFit: "cover" as const, cardWidth: "clamp(400px, 62vw, 1100px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-meduza-v.webp", title: "Meduza conectada de forma r\u00e1pida e pr\u00e1tica.", description: "", objectFit: "cover" as const, cardWidth: "clamp(230px, 26vw, 350px)" },
      { image: "/assets/images/kits/ef7eye/ef7eye-dest-acabamentos.webp", title: "Acabamentos do mais alto n\u00edvel do mercado.", description: "", objectFit: "cover" as const, cardWidth: "clamp(400px, 62vw, 1100px)" },
    ],
    editorialHeadline: "A experi\u00eancia perfeita",
    editorialBody: "S\u00e3o mais de 03 d\u00e9cadas de experi\u00eancia construindo baterias ac\u00fasticas aliadas \u00e0 um time de tecnologia de ponta para entregar a melhor experi\u00eancia h\u00edbrida do mercado.",
    editorialLoopVideo: "/assets/video/ef7-editorial-loop.mp4",
    editorialLoopPoster: "/assets/video/ef7-editorial-loop-poster.jpg",
    editorialLoopMaxWidth: "clamp(240px, 32vw, 460px)",
    editorialVerticalImage: "/assets/images/kits/ef7eye/ef7eye-editorial-vertical.webp",
    editorialHorizontalImage: "/assets/images/kits/ef7eye/ef7eye-editorial-horizontal.webp",
    galleryImages: [
      "/assets/images/kits/ef7eye/ef7eye-teal-nobg.webp",
      "/assets/images/kits/ef7eye/ef7eye-ssb-nobg.webp",
    ],
    finishGallery: [
      { image: "/assets/images/kits/ef7eye/ef7eye-ssb.webp", label: "EF7.SSB - Sunset Burst" },
      { image: "/assets/images/kits/ef7eye/ef7eye-tbc.webp", label: "EF7.TBC - The Blue Cave" },
    ],
    techTabs: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAdjacentProducts(product: Product): { prev: Product | null; next: Product | null } {
  const sorted = [...products].sort((a, b) => a.priceValue - b.priceValue);
  const index = sorted.findIndex((p) => p.id === product.id);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
