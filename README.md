# CheckInfra

Site institucional da CheckInfra (Reis Segurança Eletrônica e TI Ltda). Páginas estáticas em português, geradas com Vite, React e TypeScript.

## Páginas

- `/` início
- `/planos`
- `/cameras`
- `/alarmes`
- `/controle-de-acesso`
- `/sobre`
- `/contato`
- `/privacidade`
- `/404` página de erro

## Desenvolvimento

```bash
npm install
npm run dev
```

O build gera `dist/` com um `index.html` por rota (pré-render), `robots.txt`, `sitemap.xml` e `.htaccess`.

```bash
npm run build
npm run preview
```

## Deploy

O workflow `.github/workflows/deploy.yml` só roda em push na `main` (ou `workflow_dispatch`). Ele faz `npm ci`, `npm run build` e envia `dist/` por FTP para a raiz da conta (que já é o `public_html`).

Segredos: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

O estado do deploy usa `.ftp-deploy-sync-state-v2.json`. Arquivos do site anterior que não entram nesse estado novo permanecem no servidor até uma limpeza manual. Não usar `dangerous-clean-slate`.

## Logo

A marca no site é a versão azul de fundo escuro (paleta principal: `#0B1426`, `#FFFFFF`, `#00B9F2`, `#3FA9F5`). O arquivo `checkinfra_vetorizado_fundoescuro1` do pacote é a variação verde-água; o arquivo azul é o `fundoescuro2`. O favicon usa o símbolo (o “k”) em fundo azul-marinho. Não há logo da Intelbras no site: a parceria aparece só em texto (“Parceiro Intelbras”).
