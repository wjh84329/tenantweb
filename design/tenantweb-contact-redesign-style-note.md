# Tenantweb Contact Redesign Reference

Use `tenantweb-contact-redesign-reference-v1-light-blue.png` as the visual baseline for `src/views/login/contact.vue`.

Core direction:
- Keep the page bright, clean and support-focused.
- Use white / very light blue surfaces with blue as the primary action color.
- Remove the old large photo banner feeling and avoid black, green or orange-heavy themes.
- Treat the page as a practical business contact directory, not a marketing landing page.
- Keep cards compact, flat and scannable with 8px max radius, thin borders and low shadows.

Functional areas to keep:
- Existing login header and login footer components.
- Business contact list rendered from `serviceQq` entries with `type === 0`.
- Each contact should keep the QQ number and `QQ交谈` action.
- Existing empty state for no contact data.
- Preserve fetched company address and service phone data; these can be displayed as auxiliary contact information.

Implementation notes:
- Preserve current API call, data parsing, computed values and QQ link behavior.
- Replace the old big `about.jpg` banner and wavy card headers with a light hero band and simple contact cards.
- The page can include a left-side `联系信息` panel for phone, address and service time, with the QQ contact grid as the primary content.
- Avoid adding QR code login elements, dashboard previews or dense decorative illustrations.
