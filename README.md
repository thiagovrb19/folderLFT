# LFT Experience (folder de apresentação unificado)

Um único projeto, um único link, com os dois folders de apresentação da LFT:

| Rota | Folder |
|---|---|
| `/` | Tela inicial com as logos **LFT Gestão** e **LFT Consórcios** (o vendedor escolhe) |
| `/gestao` | Apresentação de Seguro de Vida (LFT Gestão) |
| `/consorcios` | Apresentação de Consórcios (LFT Consórcios) |

Dentro de qualquer apresentação, o botão **Trocar folder** (no menu do topo e na tela de preenchimento) volta para a tela inicial. Os dados de cada folder ficam salvos no navegador, então dá para alternar sem perder o atendimento.

## Como rodar

Requisito: Node.js 18.17 ou mais novo.

```bash
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm start        # serve o build
```

## Publicar na Vercel

1. Suba este projeto para o novo repositório no GitHub.
2. Na Vercel, importe o repositório (Framework: Next.js, sem nenhuma configuração extra).
3. Não há variáveis de ambiente: o projeto não usa banco de dados nem serviços externos.

Os dois links antigos podem continuar no ar até você trocar a divulgação para o link novo.

## Estrutura

```
src/
  app/
    page.tsx              tela inicial (logos e escolha do folder)
    gestao/page.tsx       apresentação de Seguro de Vida
    consorcios/page.tsx   apresentação de Consórcios
    layout.tsx            fontes, ícones e metadados (comum aos dois)
  components/ui/          componentes visuais compartilhados (GlassCard, MetalButton, ...)
  products/
    gestao/               tudo que é só do Seguro de Vida
      components/         layout (Header, NavigationDock, SetupModal), slides, caneta
      lib/                store (estado), slideRegistry, pdfGenerator
      types/
    consorcios/           tudo que é só de Consórcios
      components/         layout, slides
      lib/                store (estado), pdfGenerator
      types/
public/assets/            imagens (logos, equipe, premiações, conquistas)
```

Cada folder guarda seu próprio estado no navegador (`lft-experience-v6` para Gestão e `lft-consorcio-v2` para Consórcios), por isso um não interfere no outro.

## Como adicionar um novo folder no futuro

1. Crie `src/products/<nome>/` seguindo a mesma divisão (components, lib, types).
2. Crie `src/app/<nome>/page.tsx` com a apresentação.
3. Inclua uma entrada na lista `FOLDERS` em `src/app/page.tsx` (rota, logo, título e a chave do estado no navegador).

## Observações

- O Supabase foi removido: nenhum dos dois projetos originais chamava o `supabase.ts`.
- Se criar uma pasta nova fora de `src/components`, `src/products` ou `src/app`, adicione o caminho em `content` no `tailwind.config.ts`, senão o Tailwind não gera as classes dela.
- O Next.js está na versão 14.2.15, que o npm marca como desatualizada por segurança. Vale atualizar para a última 14.2.x numa etapa separada, testando depois.
