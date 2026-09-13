# DeathGuess

Um jogo de estimativas históricas: em cada rodada, o jogador tenta chegar o mais perto possível do número de vítimas de um acontecimento real.

## Executar localmente

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Verificações

```bash
npm run typecheck
npm run lint
npm run build
```

## Conteúdo e arquitetura

- Os acontecimentos, fontes e créditos de imagem ficam em `data/events.ts`.
- A fórmula de pontuação e as estatísticas finais ficam em `lib/scoring.ts`.
- A seleção de rodadas fica em `lib/game.ts` e aceita uma `seed`; uma data ISO pode ser usada futuramente para gerar um Daily Challenge igual para todos.
- Imagens históricas ficam em `public/events` e são servidas localmente.
- Componentes de cada etapa do jogo ficam em `components/game`.

## Publicar na Vercel

1. Envie este diretório para um repositório Git.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. A Vercel detectará Next.js automaticamente; mantenha o comando de build `npm run build` e não adicione variáveis de ambiente.
4. Depois de escolher o domínio definitivo, ajuste `metadataBase` em `app/layout.tsx` caso ele seja diferente de `https://deathguess.vercel.app`.

Também é possível publicar pelo CLI com `npx vercel`.

## Notas editoriais

Os números exibidos foram selecionados a partir das fontes institucionais vinculadas em cada rodada. Contagens aproximadas, como a do Titanic, são identificadas explicitamente como estimativas. Ao adicionar eventos, não remova o link de fonte nem o crédito/licença da imagem.
