# Casa Patri — Repositório de Páginas & Empreendimentos

Repositório central de landing pages e projetos web da **Casa Patri Imobiliária**.

---

## 📁 Estrutura do Repositório

O repositório é organizado de forma modular, permitindo que cada empreendimento ou página mantenha sua própria estrutura isolada de assets, estilos e lógica:

```text
CASAPATRI PAGINAS/
├── orbeprime/                 # Landing page do Residencial Orbe Prime
│   ├── assets/                # Vídeos (timelapse 4K), imagens de plantas e banners
│   ├── index.html             # Estrutura e conteúdo da LP
│   ├── styles.css             # Estilos e responsividade
│   ├── script.js              # Lógica interativa e sincronização do vídeo com scroll
│   └── README.md              # Documentação técnica específica do Orbe Prime
├── casapatri-coberturas/      # Landing page de Coberturas no Recreio
│   ├── assets/                # Vídeo com drone recreio-scroll.mp4, plantas e renders
│   ├── index.html             # Estrutura e conteúdo da LP
│   ├── styles.css             # Estilos e responsividade
│   ├── script.js              # Scroll sincronizado, galeria e WhatsApp
│   └── README.md              # Documentação técnica de Coberturas
├── .gitignore                 # Configurações de exclusão do Git
├── Staticfile                 # Detecção estática para Nixpacks/Coolify
├── nixpacks.toml              # Provedor estático explícito para Coolify
├── index.html                 # Portal raiz com acesso aos empreendimentos
└── README.md                  # Visão geral do repositório
```

---

## 🏢 Projetos Disponíveis

### 1. Residencial Orbe Prime (`/orbeprime`)
- **Localização:** Recreio dos Bandeirantes, Rio de Janeiro - RJ
- **Características:** Landing page cinematográfica com timelapse 4K UHD sincronizado ao scroll do usuário, galeria interativa com 8 plantas reais, seções conceituais, localização e integração direta com WhatsApp.
- **Tecnologias:** HTML5 semântico, CSS3 (Vanilla), JavaScript puro.

### 2. Coberturas no Recreio (`/casapatri-coberturas`)
- **Localização:** Recreio dos Bandeirantes, Rio de Janeiro - RJ
- **Características:** Landing page interativa com vídeo de drone sincronizado ao scroll, foco em terraço panorâmico, renders ilustrativos, visualizador de planta e condições de obra por administração.
- **Tecnologias:** HTML5 semântico, CSS3 (Vanilla), JavaScript puro.

---

## 🚀 Como Executar Localmente

Como as páginas utilizam recursos multimídia (como vídeos e manipulação de canvas/scroll), recomenda-se a execução através de um servidor local a partir da raiz:

1. Inicie um servidor local na raiz do repositório:
   ```bash
   python -m http.server 8080
   ```

2. Acesse no navegador:
   - Portal principal: `http://localhost:8080/`
   - Orbe Prime: `http://localhost:8080/orbeprime/`
   - Coberturas: `http://localhost:8080/casapatri-coberturas/`

---

## ➕ Adicionando Novos Empreendimentos

Para adicionar uma nova página ou empreendimento:
1. Crie uma nova pasta na raiz deste repositório com o nome do projeto (ex: `novolancamento/`).
2. Adicione os arquivos da página (`index.html`, `styles.css`, `script.js`, pasta `assets/`).
3. Atualize o arquivo `index.html` da raiz e este `README.md`.
