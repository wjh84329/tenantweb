# Tenantweb LoginHome Redesign Reference

Use `tenantweb-loginhome-redesign-reference-v4.png` as the visual baseline for `src/views/login/loginHome.vue`.

Core direction:
- Match the saved tenantweb admin redesign style, but keep this page as a login landing page.
- Graphite/ink header and hero structure.
- Warm off-white page background with white login surface.
- Emerald and amber accents; restrained blue only for active tabs and links.
- Flat SaaS product feel, low shadows, subtle borders.
- Card and button radius should stay at 8px or less.
- Keep the first viewport focused on login, with a hint of the benefits section below.
- Keep the hero simple and airy. The login card is the primary focus.
- The left hero area should only use lightweight support elements such as three trust chips and a minimal `接入 -> 交易 -> 对账` process line. Do not use a large dashboard, workflow panel, illustration, or any preview of `home.vue`.

Functional areas to keep:
- Fixed login header.
- Password login tab.
- QR code login tab. The QR code is only shown inside the login card after switching to `扫码登录`; it must not appear as a floating page element.
- Username, password and captcha inputs.
- Captcha image refresh.
- Login submit loading state.
- Free registration link.
- Online customer service QQ floating dock with collapse/expand behavior.
- `选择我们的理由` benefits section.
- Existing footer component.

Implementation notes:
- Preserve all current methods, API calls, `v-model`, `v-show`, `@click`, `@submit.prevent`, QR polling, captcha refresh and router behavior.
- Remove old inline styles during implementation where possible so the new scoped style can control the page consistently.
- Avoid old bright-blue banner, orange pill login button, huge illustration blocks, deeply rounded cards, any floating login QR code, dense workflow panels and any screenshot-like preview of the backend home page.
