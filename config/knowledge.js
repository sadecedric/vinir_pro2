import { ASSISTANT_NAME, PLATFORMS, PROMO_CODE, WHATSAPP_URL } from "../lib/config.js";

export const KNOWLEDGE_BASE = `
=== WHATSAPP CHANNEL ===
Name: ${ASSISTANT_NAME}
Official link: ${WHATSAPP_URL}
Open the link in WhatsApp and tap "Follow".
The channel shares high-odds coupons, exact-score picks, FIFA, and other games.
No winnings are guaranteed.

=== COMMUNITY ACCESS CONDITIONS ===
The following conditions are inherited from the original VINIR community:
1. Register with a partner bookmaker through its official link and enter ${PROMO_CODE}
   during registration, before submitting the form.
2. Make a minimum deposit of $10 or 5,000 CFA francs (or the local currency equivalent).
Both conditions are required for access to the community's predictions.
If the promo code was omitted, contact the bookmaker's support; do not promise it can be added later.

=== OFFICIAL PARTNER BOOKMAKERS ===
Promo code: ${PROMO_CODE}
${PLATFORMS.map((platform) => `${platform.name}: ${platform.url}`).join("\n")}
Only 1XBET and LINEBET are partners for this assistant.
On 1XBET, look for the "Promo code" field near the bottom of the registration form.
On LINEBET, look for "Promo code" or "Bonus code" before submitting registration.
The interface may vary; check the bookmaker's official support if the field is missing.

=== REGISTRATION GUIDE ===
1. Open the official link for the selected partner.
2. Choose an available registration method, such as phone or email.
3. Fill in the requested personal details, country, and currency.
4. Enter ${PROMO_CODE} before submitting the registration form.
5. Confirm the account using the bookmaker's verification instructions.
6. Deposit at least $10 or 5,000 CFA francs using an available payment method.
7. Follow the ${ASSISTANT_NAME} WhatsApp channel using the official link.

=== COMMON QUESTIONS ===
Registration rejected: ask whether the phone number was previously used on that bookmaker.
If an account already exists, recover it or contact official support.
Link does not open: copy the full link into a browser and check the connection.
Promo field missing: check the full form or try another browser; ask official support if needed.
Deposit missing: check the payment confirmation and transaction reference. Contact the bookmaker's
support with the receipt if the funds do not appear; timing depends on the payment provider.
Bonus missing: check the promo code, new-account eligibility, and current official bonus conditions.
Do not promise a bonus amount or invent bonus terms.
Identity verification: follow the bookmaker's official instructions and upload documents only through
its secure official interface. Never ask users to send passwords, verification codes, or ID here.
Withdrawals: open the bookmaker's withdrawal section, select an available payment method, and follow
its instructions. Limits, verification requirements, and processing times depend on the bookmaker.

=== PARTNER CHOICE ===
Present 1XBET first, with LINEBET as the alternative. Use only the links and promo code above.
`.trim();
