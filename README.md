# scaledai property shell

Reusable React scaffold for a scaledai property. Implements the shared visual
structure (sidebar shell, header, page-body patterns) with semantic tokens so a
new property is a re-skin, not a redesign.

## Run

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS with semantic tokens (shadcn/ui convention)
- lucide-react icons, sonner toasts
- `@/*` path alias → `src/*`

## Structure

```
src/
  index.css                  ← token definitions (:root CSS vars) — brand lives here
  lib/utils.ts               ← cn() class combiner
  components/
    ui/
      button.tsx             ← cva button (primary / outline / ghost)
      badge.tsx              ← count badge + 99+ clamp
      sidebar.tsx            ← sidebar primitive: provider, state, IconChip
    shell/
      AppShell.tsx           ← §2 shell: page → sidebar + header + body, gap-2
      AppSidebar.tsx         ← §4 sidebar: brand, quick-jump, nav groups, footer
      AppHeader.tsx          ← §5 header: toggle + breadcrumb + controls
      primitives.tsx         ← §6/§7: StatTile, StatusPill, NoticeBanner, PipelineTab
  pages/
    DemoPage.tsx             ← §6 body patterns assembled as an example page
  App.tsx                    ← <AppShell><DemoPage/></AppShell>
```

## Make a new property

You touch four things — nothing structural:

1. **Brand hue** — edit `--sidebar` and `--accent` in `src/index.css`.
2. **Brand block** — logo icon + name + tagline in `AppSidebar.tsx`.
3. **Nav** — the `NAV` data array in `AppSidebar.tsx` (labels, icons, hues, badges).
4. **Page copy** — replace `DemoPage.tsx` with your real page(s).

## Notes

- `sidebar.tsx` is a minimal primitive covering the states the spec needs
  (`data-state`, CSS-var widths, collapse-to-icon). For the mobile sheet + rail,
  run `npx shadcn@latest add sidebar` and swap it in — the shell composition
  stays the same.
- State hues are applied dynamically (`bg-${hue}/25`), so they're safelisted in
  `tailwind.config.ts`. Add any new hue there.
