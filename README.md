# Regretify Client

Frontend client for Regretify, built with Next.js 16 App Router and Tailwind CSS v4.

## Deploy Shape

This repository is prepared for Portainer `Repository` deployment.

Expected runtime shape:
- stack name: `regretify-client`
- service name: `client`
- external Docker network: `regretify_net`

Required runtime env in Portainer:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
NEXT_PUBLIC_SITE_URL=http://replace-in-portainer
```

## Development

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Notes

- Product direction lives in `PROJECT.md`
- Repo rules live in `AGENTS.md`
- UI references and temporary wireframes live in `docs/ui-reference/`

## Checks

```bash
npm run lint
npm run build
```
