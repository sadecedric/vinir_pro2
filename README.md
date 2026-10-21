# VINIR_PRO2

English-only version of the local `vinir_pro` chatbot, using Next.js, React, and Mistral.
The chat interface, admin interface, API messages, and assistant instructions are in English.
The original profile image and layout are preserved. The original welcome audio is omitted
because no English recording was provided.

## Run locally

1. Run `npm install` (on Windows PowerShell, use `npm.cmd install` if scripts are disabled).
2. Set `MISTRAL_API_KEY` in `.env.local` to enable AI replies.
3. Optionally set `DATABASE_URL` to a dedicated Neon/PostgreSQL database to save conversations.
4. Set `ADMIN_PASSWORD` to enable `/admin`.
5. Run `npm run dev`, then open http://localhost:3000.

No credentials, database connection, Git history, or build output were copied from the original project.
The blank `.env.local` file is ignored by Git. `.env.local.example` documents the configuration.
Use a separate database to keep this project's conversations independent.

## Official information

- Name: VINIR_PRO2
- Promo code: ZT255
- WhatsApp: https://whatsapp.com/channel/0029Vb6XBJX5K3zVtLnJWm40
- 1XBET: https://reffpa.com/L?tag=d_5083416m_45361c_ZT255&site=5083416&ad=45361
- LINEBET: https://lb-aff.com/L?tag=d_4191117m_66803c_apk1&site=4191117&ad=66803

`lib/config.js` is the shared source for the brand, links, promo code, and welcome message.
`config/systemPrompt.js` requires English replies even when users request another language.
`config/knowledge.js` contains the English support information. Community deposit/access conditions
are inherited from `vinir_pro`: $10 or 5,000 CFA francs minimum.

## Production checks

Run `npm run build`, then `npm start` to serve the production build.
AI replies require a valid Mistral key and network access.
