# Casa Patri — Repositório de Páginas & Empreendimentos

Repositório central de landing pages e projetos web da **Casa Patri Imobiliária**.

---

## 📁 Estrutura do Repositório

O repositório é organizado de forma modular, permitindo que cada empreendimento ou página mantenha sua própria estrutura isolada de assets, estilos e lógica:

```text
CASAPATRI PAGINAS/
├── orbeprime/               # Landing page do Residencial Orbe Prime
│   ├── assets/              # Vídeos (timelapse 4K), imagens de plantas e banners
│   ├── index.html           # Estrutura e conteúdo da LP
│   ├── styles.css           # Estilos e responsividade
│   ├── script.js            # Lógica interativa e sincronização do vídeo com scroll
│   └── README.md            # Documentação técnica específica do Orbe Prime
├── .gitignore               # Configurações de exclusão do Git
└── README.md                # Visão geral do repositório
```

---

## 🏢 Projetos Disponíveis

### 1. Residencial Orbe Prime (`/orbeprime`)
- **Localização:** Recreio dos Bandeirantes, Rio de Janeiro - RJ
- **Características:** Landing page cinematográfica com timelapse 4K UHD sincronizado ao scroll do usuário, galeria interativa com 8 plantas reais, seções conceituais, localização e integração direta com WhatsApp.
- **Tecnologias:** HTML5 semântico, CSS3 (Vanilla), JavaScript puro.

---

## 🚀 Como Executar Localmente

Como as páginas utilizam recursos multimídia (como vídeos e manipulação de canvas/scroll), recomenda-se a execução através de um servidor local:

1. Navegue até a pasta do projeto desejado:
   ```bash
   cd orbeprime
   ```

2. Inicie um servidor local simples (exemplo via Python):
   ```bash
   python -m http.server 8080
   ```

3. Acesse no navegador:
   ```text
   http://localhost:8080
   ```

---

## ➕ Adicionando Novos Empreendimentos

Para adicionar uma nova página ou empreendimento:
1. Crie uma nova pasta na raiz deste repositório com o nome do projeto (ex: `novolancamento/`).
2. Adicione os arquivos da página (`index.html`, `styles.css`, `script.js`, pasta `assets/`).
3. Atualize este arquivo `README.md` na lista de projetos.
