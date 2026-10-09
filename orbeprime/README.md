# Residencial Orbe Prime — Landing page cinematográfica

Landing page estática e responsiva, desenvolvida em HTML, CSS e JavaScript puros. Não exige React, Node, build, plugin ou serviço externo para a experiência de scroll + timelapse. As fontes usam Google Fonts; se estiver offline, são substituídas pelas alternativas locais.

## O que está pronto

- Experiência cinematográfica com **scroll sincronizado ao tempo do vídeo**, cobrindo de 0 a 100% do timelapse. Na primeira seção, o **vídeo horizontal 4K UHD (3840×2160)** ocupa o palco cinematográfico: a copy aparece sobre o degradê azul-marinho já presente à esquerda do arquivo, com o timelapse da construção à direita. Em celulares, o vídeo aparece inteiro acima da copy.
- Quatro momentos de copy (AIDA), com entrada e saída em motion blur.
- Progresso de leitura, navegação por capítulos e menu responsivo.
- Galeria de **8 plantas reais** do book do Orbe Prime: 4 tipologias de apartamentos e 4 de coberturas, com metragens individuais, troca por categorias, setas, seleção por unidade, gesto horizontal e ampliação.
- Seções de conceito, localização, condições de aquisição e conversão para WhatsApp.
- Acessibilidade: textos semânticos, `alt` nas imagens, foco de teclado, links diretos e versão sem animações para pessoas com preferência por movimento reduzido.
- Vídeo web otimizado com keyframes próximos para minimizar engasgos durante o scrubbing. A inicialização do scroll-scrub também funciona se os metadados carregarem antes do JavaScript.
- Livro de apresentação incluído na pasta de assets.

## Estrutura de arquivos

```
index.html            Estrutura, textos, SEO e marcação
styles.css            Identidade visual, layouts, responsividade e motion
script.js             Scroll/vídeo, navegação, interações e plantas
assets/
  orbe-timelapse.mp4  Timelapse 4K UHD (3840×2160) otimizado para rolagem
  orbe-primeiro-frame.jpg  Poster do novo timelapse horizontal
  fachada-poster.jpg  Poster para carregamento
  residencial-final.webp
  recreio-litoral.webp
  planta-*.webp       8 plantas recortadas do book enviado
  book-orbe-prime.pdf Book comercial original
  favicon.svg
```

## Publicação

1. Descompacte o ZIP sem modificar a estrutura de pastas.
2. Publique a pasta inteira em qualquer hospedagem estática (Netlify, Cloudflare Pages, Vercel, hospedagem cPanel etc.). O arquivo inicial é `index.html`.
3. Para visualizar em computador local, abra o terminal dentro da pasta e execute `python -m http.server 8080`; acesse `http://localhost:8080`. **Evite abrir por `file://`**, pois as políticas locais de vídeo variam entre navegadores.
4. Use HTTPS em produção para o melhor comportamento de mídia e navegação em dispositivos móveis.

## Onde editar

- **WhatsApp:** em `script.js`, objeto `CONTACT`, campos `whatsappNumber` e `generalMessage`. O número `5521967456500` corresponde ao WhatsApp **(21) 96745-6500** do material fornecido. Todos os botões são preenchidos automaticamente pelo JavaScript.
- **Preço:** procure `R$ 542.819,15` em `index.html`.
- **Textos:** todos em `index.html`.
- **Unidades/m²:** objeto `PLANS` em `script.js`, com imagens em `assets/planta-*.webp`.
- **Cores e fontes:** `:root` em `styles.css`.
- **Duração da experiência:** regra `.cinematic { height: 560svh; }` no CSS (versão mobile `465svh`).
- **Velocidade da animação:** a duração do vídeo completo está diretamente conectada à altura de scroll. Não é necessário alterar o JavaScript ao trocar o vídeo por outro de duração diferente.

## Critério de conteúdo e conferência comercial

O briefing forneceu o valor **R$ 542.819,15**, utilizado no site. O PDF original (capa) apresenta **R$ 542.800,00**. A diferença deve ser confirmada com a equipe comercial antes da publicação. A página apresenta as metragens individuais **exatas como informadas nas páginas 5–12 do PDF**: 126,98; 126,75; 110,28; 111,91; 211,27; 210,81; 193,19 e 196,45 m². A informação sobre opções de **2 e 3 quartos** foi fornecida pelo briefing, enquanto o book destaca os apartamentos de **3 suítes**: valide a oferta de 2 quartos com a incorporadora antes de veicular.

As condições (obra por administração, pagamento à construtora, sem juros, sem financiamento bancário e sem comprovação de renda) vêm do briefing. O contrato e as condições comerciais devem ser conferidos por responsável antes de qualquer campanha. Os elementos gráficos e perspectivas do material são ilustrativos. A página não coleta dados, não tem formulários ou backend; os leads são direcionados ao WhatsApp.

## Desempenho e compatibilidade

O vídeo horizontal originalmente enviado em 1920×1080 foi ampliado com Lanczos e exportado em 3840×2160 (4K UHD) para um MP4 H.264, sem faixa de áudio e com keyframes frequentes para permitir saltos de tempo mais suaves em rolagens rápidas. Nos browsers móveis, o comportamento de `video.currentTime` pode variar conforme as políticas de mídia e a potência do dispositivo; a imagem de poster permanece como fallback. Em `prefers-reduced-motion`, o site mostra os quatro conteúdos de forma legível sem sincronização animada.

## Atualização 4K — fundo azul sem textura

A textura SVG de ruído presente na primeira seção foi desativada. O fundo azul-marinho à esquerda agora usa uma transição CSS lisa, preservando a área do timelapse à direita e todos os textos e efeitos. O vídeo enviado tinha originalmente 1920×1080; a versão incluída foi **ampliada para 3840×2160** com interpolação Lanczos (isso não recupera detalhes que não existiam na gravação original). A versão 4K é maior e pode demorar mais para carregar em conexões móveis; o pôster 4K aparece enquanto carrega.
