# Tenantweb Tool Redesign Reference

Use `tenantweb-tool-redesign-reference-v2-haokaiqu-light-blue.png` as the visual baseline for `src/views/login/tool.vue`.

Core direction:
- Keep the page bright, clean and focused on a single product: `好开区助手`.
- Use white / very light blue surfaces with blue as the primary action color.
- Remove the old large banner feeling and avoid black, green or orange-heavy themes.
- Treat the page as a practical product/download page, not a generic multi-tool library or marketing landing page.
- Keep cards compact, flat and scannable with 8px max radius, thin borders and low shadows.

Functional areas to keep:
- Existing login header and login footer components.
- Four feature explanation blocks:
  - `自动开合区`
  - `自动生成登录器列表`
  - `自动安装平台`
  - `开区微信消息通知`
- The hero/product area should replace the old `工具中心` copy with `好开区助手`.
- Keep the `点击下载` and `更新日志` actions visually in the `好开区助手` product area.
- Remove the lower three-card download section entirely.

Implementation notes:
- The current `点击下载` and `更新日志` buttons are static buttons with no bound handlers. Preserve that behavior unless download/log logic is added separately.
- Replace the old `banner02.jpg` hero and clipped gradient card headers with a light product hero band plus feature cards.
- The hero illustration should be abstract utility/download/cloud-sync visuals for `好开区助手`, not a dashboard preview or large stock image.
- Avoid adding QR code login elements, dense decorative panels or deeply rounded pill buttons.
