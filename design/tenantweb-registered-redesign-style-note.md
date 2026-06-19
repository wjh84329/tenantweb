# Tenantweb Registered Redesign Reference

Use `tenantweb-registered-redesign-reference-v1-light-blue.png` as the visual baseline for `src/views/login/registered.vue`.

Core direction:
- Keep the page bright, clean and form-first.
- Use a white / very light blue background with blue as the primary action color.
- Avoid black hero backgrounds, green primary color, orange-heavy accents and dashboard screenshots.
- Treat this page as a merchant onboarding form, not a marketing landing page.
- Keep the main layout simple: a lightweight onboarding/help panel on the left and the registration form on the right.
- Card and button radius should stay at 8px or less, with subtle borders and low shadows.

Functional areas to keep:
- Existing login header and login footer components.
- Fields for username, merchant nickname, password, confirm password, QQ, email, phone and captcha.
- Existing validation feedback for email and phone, plus room for future field hints.
- Captcha image and refresh click behavior.
- Primary `立即注册` action.
- Secondary `返回登录` action.
- Registration success / audit reminder dialog with service QQ links.

Implementation notes:
- Preserve all current methods, API calls, `v-model`, validation handlers, `@click`, route behavior and dialog behavior.
- The form can be visually reorganized into a cleaner two-column grid, but field semantics and submit validation should not change.
- The left onboarding panel should use abstract document/security/check visuals and short steps such as `填写资料 -> 身份校验 -> 等待审核`.
- Avoid adding QR login elements to this page.
