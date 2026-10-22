# Implementation plan — Feedback round 22/10/2026

Status: **DRAFT — waiting for approval. No code or assets have been changed yet.**

## 1. Inputs reviewed

| Source | What it contains |
| --- | --- |
| `Sửa nội dung_ngày 22.10.docx` (leader) | 5 screenshots + replacement copy: Get Involved subtitle, Volunteer card, footer sponsor block (U-GO), first "Why girls' education" card + citation |
| `U-GO Logo.zip` | `Hero_UGO_Logo_RGB.png` (3987×1851, full-colour) + 2 brand-guideline screenshots (**Clear Space**, **Co-branding and Partnerships**) |
| `feedback-email.txt` (U-GO partner) | U-GO wants to be shown as a *partner of the Relay Fund*; stat suggestion (World Bank 50–90%); other suggestions (see §8) |
| `Hình web to.pdf` | One finished collage: 13 circular photos on a peach background, portrait (≈4:5) |
| `Hình web.docx` | Same 13 photos separately + background. **Not used** (decision Q3) |
| Current site `src/index.html` | Single-file site, VI + EN via `translations` map and `data-vi/data-en`; central `SITE_CONFIG`; `npm run pack` builds `dist/index.html` |

## 2. Decisions confirmed with the owner

| # | Decision |
| --- | --- |
| Q1 | Implement everything in the leader's docx. English wording suggestions from the email are skipped. The contact email will be replaced by the owner later (**do not touch** `therelayfund@gmail.com`). |
| Q2 | **Vietnamese-only launch** behind one feature flag; English content stays in the code so it can be switched on later. Strip the "/ English" part of the section badges. |
| Q3 | Use only `Hình web to.pdf`; ignore `Hình web.docx`. |
| Q4 | Collage replaces the big About Us image. The small 4th-pillar image is removed and the 3 pillars are laid out without an empty hole. |
| Q5 | U-GO partner block goes **inside the footer, as a white band/card at the top of the footer**. Layout: Relay Fund left, U-GO centre, right empty. Follows U-GO guidelines (equal visual presence, clear space, vertical divider). |
| Q6 | The new 50–90% statistic replaces the "10%" sentence in card 1. Citation is a **numbered footnote at the bottom of the section**. |
| Q7 | Final Vietnamese copy confirmed (see §4). |
| Q8 | U-GO logo links to `https://ugouniversity.org/`, stored in `SITE_CONFIG.links.ugo`. |
| Q9 | Commits use the personal identity `NTTVy03 <trucvy05062003@gmail.com>`; **disable GPG signing locally** so the work key (`83ADB7E2…`) is not used. |

## 3. Change list

### 3.1 Vietnamese-only mode (feature flag)

- Add `const FEATURES = Object.freeze({ englishEnabled: false });` next to `SITE_CONFIG`.
- When `englishEnabled` is `false`:
  - The `VI | EN` toggle (`#langToggle`) is hidden (`hidden` attribute set in markup and in JS; no flash on load) and its click handler is a no-op.
  - `applyLang()` always resolves to `'vi'`, so `document.documentElement.lang`, `<title>` and meta description stay Vietnamese.
  - Make sure the mobile menu has no leftover language control (verify; remove or hide if present).
- Section badges become Vietnamese-only (HTML text **and** the `vi` value in `translations`):
  - `Giới thiệu chung / About Us` → `Giới thiệu chung` (2 badges: `about-badge`, `about-why-badge`)
  - `Chương trình / Programs` → `Chương trình`
  - `Câu chuyện / Stories` → `Câu chuyện`
  - `Đồng hành cùng chúng tôi / Get Involved` → `Đồng hành cùng chúng tôi`
  - `Liên hệ / Contact` → `Liên hệ`
  - The existing `en` values are already English-only, so re-enabling English later needs no extra work.
- Do **not** delete any `en` strings, `STORY_DATA.*.en`, or `data-alt-en` attributes.
- Dev-only tweak default `showEnglish: true` → `false` for consistency.
- English drafts for **new** strings added in this round (§3.2–3.5) are added to the `translations` map, marked `// EN draft — not reviewed`, so nothing is missing when English is enabled later.

### 3.2 About Us images and pillars

- New asset: crop the collage from `Hình web to.pdf`.
  - Render the PDF page at 4× (2448×3168), crop away the white page margin (x 18→2447, y 113→3167 ≈ 2430×3055, ratio ≈ 0.795 ≈ 4:5), resize to ~1200 px wide, export optimized JPEG.
  - Output: `src/assets/about/relay-collage.jpg` (path is stable for future replacement).
- Replace the big image (`.about-photo-main img`, currently `assets/d3d89bd8-….jpg`) with the collage.
  - Keep the 4:5 container and rounded corners. Remove the hover zoom (the collage is a finished composition).
  - New Vietnamese `alt` text, e.g. `Các nữ sinh Sen Hồng trong hành trình học tập, thực hành và tốt nghiệp` (+ `data-alt-en`).
- Remove the small `.pillar-image-card` (stock photo `assets/2a45cd01-….jpg`).
- Re-layout `.about-pillars` for 3 cards only: default proposal is a **vertical stack, each card with icon on the left and text on the right** (a 3-in-a-row layout would be too cramped at ~520 px column width). Single column on mobile. To be reviewed visually in the preview.
- Delete the two now-unused stock images from `src/assets/` after confirming nothing else references them.

### 3.3 "Why invest in girls' education" — card 1 + footnote

- Card 1 keeps title `Mở ra cơ hội nghề nghiệp` and the 💼 icon.
- New text (`about-why-copy-1`):
  `Người tốt nghiệp đại học, cao đẳng có mức thu nhập cao hơn 50–90% so với người chỉ tốt nghiệp trung học phổ thông` + superscript marker `[1]` (link to the footnote, with an accessible label).
- Numbered footnote at the bottom of the section, after the closing sentence, small muted text on the blue background:
  `[1] Nguồn: Parajuli, Dilip, Dung Kieu Vo, Jamil Salmi và Nguyet Thi Anh Tran. 2020. Improving the Performance of Higher Education in Vietnam: Strategic Priorities and Policy Options. Washington, DC: Ngân hàng Thế giới, trang 4.`
- EN draft: `Graduates of universities and colleges earn 50–90% more than those who completed only upper-secondary school.` Footnote keeps the original English citation.

### 3.4 Get Involved section

- Subtitle (`inv-sub`) → `Dù là nữ sinh ứng tuyển, tình nguyện viên nhiệt huyết hay nhà tài trợ – mỗi người đều có thể đồng hành cùng Sen Hồng theo cách của mình.` (en dash `–` as in the leader's doc).
- Volunteer card (`involved-volunteer-copy`) → `Bạn có kỹ năng, thời gian và mong muốn tạo ra tác động? Tình nguyện viên Sen Hồng đang cần bạn – Ban Truyền thông, Báo cáo, mentoring và hơn thế.`
- Update the matching EN drafts.

### 3.5 U-GO partner block in the footer

Content and structure (inside `<footer>`, as the first row, above the existing brand + link columns):

```
┌──────────────────────── white rounded card ────────────────────────┐
│  Nhà tài trợ đồng hành cùng Học bổng Sen Hồng   (heading, small)   │
│                                                                    │
│  [ Relay Fund logo ]  │  Với sự hỗ trợ tài chính từ                │   [ empty ]
│  (left-aligned)       │  [ U-GO logo ]  (centred in its column)    │
└────────────────────────────────────────────────────────────────────┘
```

- 3-column grid. Column 1: Relay Fund logo, left-aligned. Column 2: caption + U-GO logo, centred, preceded by a thin vertical divider (as in the U-GO "Co-branding" guideline). Column 3: empty (kept as a spacer so column 2 stays visually centred).
- Both logos are shown **full-colour** on the white card (the current footer inverts the Relay Fund logo to white; the card version must not invert it). The existing white footer-brand logo is unchanged.
- U-GO guideline compliance:
  - *Equal visual presence*: trim transparent padding from both PNGs and size them to the same rendered height (start at 56 px desktop / 44 px mobile, fine-tune visually).
  - *Clear space*: min padding around the U-GO logo ≈ 50% of its height on every side (measured from the guideline diagram).
  - *Divider*: 1 px vertical line between the two logos; no other element inside the clear space.
  - Do not recolour, stretch or add effects to the U-GO logo.
- New assets (from `U-GO Logo.zip`, only the full-colour logo is needed):
  - `src/assets/partners/ugo-logo.png` — trimmed and downscaled (~800 px wide, a fraction of the 1.5 MB original).
  - `src/assets/partners/relay-fund-logo-color.png` — trimmed copy of the existing Relay Fund logo for the card (existing file `assets/2467d23d-….png` is untouched).
- Link: `SITE_CONFIG.links.ugo = 'https://ugouniversity.org/'`; the U-GO logo is an `<a data-link-key="ugo">` opening in a new tab with `rel="noopener noreferrer"` and an accessible name (`U-GO – mở trong tab mới`). Add a `fallbackMessage` entry for `ugo` for consistency.
- Responsive: ≤768 px the three columns stack (Relay Fund, then U-GO), the divider becomes horizontal, the empty column disappears.
- Add VI strings (`footer-sponsor-title`, `footer-sponsor-caption`) and EN drafts to `translations`.
- Existing mentions of U-GO inside the story pop-ups are already correct and stay unchanged.

### 3.6 Build

- Rebuild `dist/index.html` with `npm run pack` (verify the script inlines the new `about/` and `partners/` images; adjust only if it does not).

## 4. Final Vietnamese copy (for sign-off)

| Where | Text |
| --- | --- |
| Get Involved subtitle | Dù là nữ sinh ứng tuyển, tình nguyện viên nhiệt huyết hay nhà tài trợ – mỗi người đều có thể đồng hành cùng Sen Hồng theo cách của mình. |
| Volunteer card | Bạn có kỹ năng, thời gian và mong muốn tạo ra tác động? Tình nguyện viên Sen Hồng đang cần bạn – Ban Truyền thông, Báo cáo, mentoring và hơn thế. |
| Footer heading | Nhà tài trợ đồng hành cùng Học bổng Sen Hồng |
| Footer caption (above U-GO logo) | Với sự hỗ trợ tài chính từ |
| Why card 1 | Người tốt nghiệp đại học, cao đẳng có mức thu nhập cao hơn 50–90% so với người chỉ tốt nghiệp trung học phổ thông [1] |
| Footnote [1] | Nguồn: Parajuli, Dilip, Dung Kieu Vo, Jamil Salmi và Nguyet Thi Anh Tran. 2020. Improving the Performance of Higher Education in Vietnam: Strategic Priorities and Policy Options. Washington, DC: Ngân hàng Thế giới, trang 4. |

## 5. Git workflow (personal credentials)

1. Create branch `feat/feedback-2026-10-22` from `master`.
2. Before the first commit, set repo-local config:
   - `git config --local commit.gpgsign false`
   - `git config --local tag.gpgsign false`
   - (`user.name = NTTVy03`, `user.email = trucvy05062003@gmail.com` are already set locally.)
3. Verify with `git var GIT_AUTHOR_IDENT` / `git var GIT_COMMITTER_IDENT` and check `git log --format='%an <%ae> %G?'` after each commit (expect `NTTVy03 <trucvy05062003@gmail.com>` and `N` = unsigned).
4. Planned commits:
   1. `docs: add 22/10 feedback sources and implementation plan`
   2. `feat: add about collage, U-GO and partner logo assets`
   3. `feat: apply leader copy edits and 50-90% statistic with footnote`
   4. `feat: replace about images and relayout pillars`
   5. `feat: add U-GO partner block to footer`
   6. `feat: vietnamese-only mode behind englishEnabled flag`
   7. `build: regenerate dist/index.html`
5. **No push** until you ask. Existing 4 commits (signed with the work key) are not rewritten unless you request it.

## 6. Verification

- Serve `src/` (`npm run preview`) and `dist/` (`npm run preview:dist`) and check with screenshots at 1440, 1024, 768 and 390 px:
  - About Us: collage fills the 4:5 slot, no leftover stock photos, 3 pillars aligned, no empty grid hole.
  - "Why invest": card 1 text + `[1]` link scrolls to the footnote; footnote readable on blue.
  - Get Involved: new subtitle and volunteer text.
  - Footer: block order, Relay Fund left / U-GO centre / right empty, divider, equal logo heights, U-GO clear space, link opens `https://ugouniversity.org/` in a new tab; stacked layout on mobile.
  - No `VI | EN` toggle anywhere (desktop + mobile menu); no English words in badges.
- Automated check in the browser console: no visible text node in the page matches `About Us|Programs|Stories|Contact|Get Involved|Apply` (Vietnamese mode).
- Flip `englishEnabled` to `true` locally once: toggle appears, EN mode renders without missing strings or console errors, then flip back.
- No console errors, no 404s for images; `dist/index.html` renders identically to `src`.
- `git log` shows only the personal identity, unsigned.

## 7. Risks / notes

- The collage is built from ~400–600 px source photos, so it is sharp at normal desktop sizes but will not be crisp on very large/retina screens. Better originals would give a sharper result.
- U-GO guideline allows *any* U-GO colour variant; the zip contains only the full-colour one, which is what we use on the white card.
- The new footer block makes the footer taller on mobile (stacked layout).
- The `therelayfund@gmail.com` address stays until the owner supplies the replacement; it is only referenced in `SITE_CONFIG.links.contactEmail` and the contact section text.

## 8. Explicitly out of scope (from the email)

- Opening blurb wording and English audience question (English is hidden at launch).
- Replacing "hoàn cảnh khó khăn / circumstances" with specific hardships.
- Replacing the Facebook-post → Google Form application flow.
- Organisation-domain email / `.org` / `.vn` domain (owner will update the email manually).
- Using `Hình web.docx` individual photos.

## 9. Approval

Reply **"approve"** (or list changes) and I will implement section 3 on the branch above and run the verification in section 6.
