# Casapatri — Coberturas no Recreio dos Bandeirantes

Landing page responsiva baseada no design e na experiência de rolagem do ZIP `orbeprime.zip`, mas com copy, imagens, marca e conteúdo adaptados para a campanha **Coberturas no Recreio dos Bandeirantes**.

## Como abrir ou publicar

1. Descompacte o ZIP.
2. Abra a pasta `casapatri-coberturas`.
3. Faça o upload de **todos os arquivos dessa pasta** (incluindo `assets`) para o diretório público da sua hospedagem. A página inicial é `index.html`.
4. Recomenda-se testar em endereço HTTPS. Para testar localmente, execute `python -m http.server 8080` dentro da pasta e entre em `http://localhost:8080`.

É um projeto **estático (HTML + CSS + JavaScript)**, sem necessidade de instalação, npm, build ou backend. Compatível com Vercel, Hostinger, Netlify e servidores comuns.

## O que foi feito

- **Primeira seção:** substituição do vídeo original pelo `DJI_0900.MP4` enviado, transcodificado em `assets/recreio-scroll.mp4` (mesmas cenas, resolução web 1600×900, sem faixa de áudio). O tempo do vídeo avança conforme a rolagem, da primeira à última cena. Keyframes frequentes tornam a navegação mais responsiva.
- **Degradê azul-marinho à esquerda:** feito em CSS para garantir legibilidade da copy sem modificar permanentemente as imagens do vídeo.
- **Quatro momentos narrativos com transições:** cobertura, terraço, valor inicial e convite de contato.
- **Seções de aprofundamento:** proposta da cobertura, renders ilustrativos, terraço, planta, valor da obra, obra por administração e CTA final.
- **Imagens da campanha:** os renders foram recortados a partir dos arquivos PNG do carrossel fornecido, priorizando regiões sem textos sobrepostos.
- **Planta interativa:** duas visualizações da planta incluída no material, com abas, setas, swipe e botão para ampliar. Não foram inventados novos números de unidades ou metragens.
- **WhatsApp:** botões do cabeçalho, CTAs, seção de plantas e botão fixo enviam mensagem pronta.
- **Mobile:** layout e posicionamento do vídeo adaptados, com texto sobre fundo azul-marinho.
- **Acessibilidade:** navegação por teclado, textos alternativos nas imagens, opção de reduzir animações e link para pular a experiência de scroll.

## Arquivos

- `index.html` — toda a estrutura, títulos, copy, SEO e links.
- `styles.css` — identidade visual baseada no design original, responsividade e degradê de vídeo.
- `script.js` — scroll sincronizado, capítulos, menu, plantas e WhatsApp.
- `assets/recreio-scroll.mp4` — vídeo web otimizado, feito a partir do arquivo enviado.
- `assets/recreio-video-poster.jpg` — imagem exibida antes de o vídeo estar pronto.
- `assets/planta-principal.webp` e `assets/planta-terraco.webp` — recortes de planta fornecida.
- `assets/*.webp` — renders ilustrativos extraídos do carrossel.
- `assets/favicon.svg` e `assets/social-cover.jpg` — ícone e miniatura para compartilhamento.

## Informações comerciais para conferir antes da publicação

1. **WhatsApp comercial:** em `script.js`, altere `CONTACT.whatsappNumber` se necessário. Foi mantido **5521967456500**, número existente no ZIP original. Não há confirmação de que seja o contato correto para esta nova campanha.
2. **Preço:** a copy usa **R$ 709 mil a partir de**, como fornecido, e a observação de referência à **unidade do Kátia Rodrigues**. Confirme o preço vigente e a forma exata de identificar a unidade/empreendimento.
3. **Modelo de compra:** os termos “sem juros”, “sem burocracia”, “custo da obra” e “pagamento justo” vieram do carrossel. O texto inclui ressalvas contratuais, mas o departamento comercial/jurídico deve validar as afirmações antes de anunciar.
4. **Imagens e plantas:** são ilustrativas, retiradas do carrossel. A configuração e a possibilidade de personalizar dependem do projeto e das aprovações aplicáveis.

## Observações técnicas

- A primeira seção sincroniza o `currentTime` do vídeo ao progresso da rolagem, sem áudio e sem reprodução contínua. O poster funciona como fallback se a mídia não puder ser carregada.
- A versão de vídeo foi reencodada e reduzida para facilitar o carregamento. O arquivo 4K bruto enviado **não foi incluído no ZIP** para evitar um pacote excessivamente pesado.
- O navegador pode restringir buscas de quadros de vídeos abertos diretamente como `file://`; use um servidor local ou publique com HTTPS para uma avaliação real.
- As fontes são carregadas do Google Fonts e têm fontes alternativas locais em caso de falha.
