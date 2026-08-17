# Relay Fund website implementation and test plan

## Purpose

Implement the approved website restructuring on `work/website-refresh` while keeping unfinished content, metrics, images, and external destinations easy to replace. Vietnamese is the source language. English content is derived from the finalized Vietnamese content and must remain synchronized.

This plan is based on [`requirements-summary.md`](./requirements-summary.md) and [`Mapping website (1).pptx`](./Mapping%20website%20(1).pptx). It does not authorize publishing, pushing, or replacing deferred content with invented final data.

## Scope

### Included

- Resolve the current merge inconsistencies in `src/index.html`.
- Centralize replaceable URLs and four Hero impact values.
- Update Hero, About Us, Programs, scholarship, Stories, Get Involved, Contact, navigation, and footer structure/content.
- Add three accessible story pop-ups with temporary data.
- Preserve and synchronize Vietnamese/English switching.
- Make desktop and mobile layouts consistent.
- Rebuild and verify `dist/index.html` through the existing pack script.

### Deferred

- Final lighter-blue palette.
- Official impact values.
- Real Relay Fund images and stories.
- Final external URLs and footer copy.
- A full News section or News page.
- Publishing or pushing Git branches.

## Configuration and content model

Keep configuration near the start of the page script so future replacements require editing one block.

### Replaceable destinations

Create one immutable configuration object with these keys:

```js
const SITE_CONFIG = Object.freeze({
  links: {
    facebookPage: '',
    scholarshipApplication: '',
    volunteerForm: '',
    donorPartnerForm: '',
    news: '',
    linkedIn: '',
    contactEmail: 'mailto:therelayfund@gmail.com',
    website: 'https://therelayfund.com'
  }
})
```

The exact shape may change during implementation, but all replaceable destinations must remain centralized. Link elements should reference keys through a consistent attribute or setup function.

Fallback behavior:

- Scholarship CTA without a configured URL: show `Chương trình hiện chưa có tuyển sinh mới. Vui lòng theo dõi Facebook Sen Hồng để cập nhật thông tin.`
- News without a configured URL: display a non-navigating `Coming soon` state in the header.
- Volunteer and donor/partner actions without URLs: display a concise coming-soon notice; never submit or collect data locally.
- LinkedIn without a URL: omit or disable the link accessibly.
- Never use `href="#"` for an unavailable external destination.

### Impact metrics

Store the four labels and values in one data structure rather than hard-coding them across HTML and translations:

1. Sinh viên nhận học bổng.
2. Tốt nghiệp đúng hạn.
3. Tỉnh thành.
4. Tổng số tiền đã trao.

Use clearly marked dummy values during implementation. Add a `TODO` comment identifying them as non-final. The values must support text formats such as `300+`, `98%`, `20+`, and `3.5 tỷ` without assuming those examples are official.

### Story data

Store the three temporary stories as structured records containing:

- Stable ID.
- Vietnamese and English title/name/metadata.
- Vietnamese and English card excerpt.
- Vietnamese and English pop-up detail content.
- Optional image path and accessible alt text.

Rendering may remain static HTML if that is safer for the existing page, but card and pop-up content must have an obvious one-to-one structure that can be replaced later.

## Implementation sequence

### 1. Baseline cleanup

- Preserve the current merged layout as the starting point.
- Fix malformed scholarship markup, including the extra closing `</span>`.
- Remove stale U-GO content and inconsistent translation entries.
- Remove unused markup, styles, and handlers only after confirming they have no remaining consumer.
- Keep all work confined to `work/website-refresh`.

### 2. Shared configuration and link behavior

- Add centralized link and impact configuration.
- Add one helper that applies configured destinations and fallback states.
- Ensure external links use `target="_blank"` and `rel="noopener noreferrer"` when appropriate.
- Keep internal section anchors as normal anchors; only replaceable external destinations use configuration keys.

### 3. Header and navigation

Desktop:

- Keep About Us, Programs, Stories, News, and Contact.
- Remove the standalone Impact item.
- Attach the submenu to Programs, not Stories.
- Programs submenu items:
  - Học bổng Sen Hồng.
  - Chương trình Gạo yêu thương — Coming soon.
- Add News as a header-only configured/disabled destination.
- Keep Apply, routed through `scholarshipApplication`.
- Remove the Volunteer button.

Mobile:

- Mirror the same information architecture and Programs submenu.
- Remove mobile `Tham gia` and `Ủng hộ` header actions.
- Keep Apply through the centralized scholarship destination.
- Make submenu expansion keyboard- and touch-friendly.

### 4. Hero and impact strip

- Apply the Vietnamese Hero copy from the PowerPoint.
- Keep Hero CTAs for scholarship application, Get Involved, and About Us; the Header Volunteer removal does not remove the Hero/Get Involved pathway.
- Restore the four-metric strip below the Hero content.
- Populate the metric labels and temporary values from centralized data.
- Keep the metric layout readable when values have different lengths.

### 5. About Us part 1

- Apply the PowerPoint part-1 introduction, mission, vision, and transparency copy.
- Keep three pillar cards: Sứ mệnh, Tầm nhìn, Minh bạch.
- Replace `Tác động thực` with a replaceable image slot.
- Retain current placeholder imagery until real Relay Fund images are supplied.
- Remove the activity badge and complete quote card.
- Maintain meaningful image alt text without claiming placeholder photos show Relay Fund events.

### 6. About Us part 2

- Reuse the current dark Impact-section visual treatment directly after About Us part 1.
- Change the heading to `Vì sao đầu tư vào giáo dục nữ sinh?`.
- Replace numeric cards with three text cards:
  - Mở ra cơ hội nghề nghiệp.
  - Tác động đến gia đình.
  - Lan tỏa đến cộng đồng.
- Include the supplied closing statement.
- Treat this as part of About Us rather than a standalone Impact navigation destination.
- Update anchors and links so no obsolete `#impact` destination remains.

### 7. Programs and scholarship

- Keep Học bổng Sen Hồng as the primary visible program.
- Add a compact Gạo yêu thương coming-soon program state reachable from the Programs submenu.
- Apply the PowerPoint scholarship description and subheading.
- Replace eligibility with the supplied four-item mapping and remove GPA.
- Apply the supplied preferred study fields and place the all-fields explanation outside the tag list.
- Apply the four selection criteria and four application steps.
- Display `Từ 10 triệu đồng/năm` and state that support continues until graduation.
- Route every Apply CTA through the centralized scholarship destination/fallback.

### 8. Stories and pop-ups

- Use the PowerPoint heading/introduction.
- Keep three temporary story cards.
- Remove the `Chia sẻ câu chuyện của bạn` CTA.
- Hide donor and partner testimonials while preserving them only if future reuse is expected; otherwise remove dead markup during cleanup.
- Add one pop-up per story with:
  - A visible title.
  - Close button.
  - Escape-to-close.
  - Outside-click close.
  - Focus moved into the pop-up on open and returned to the triggering card on close.
  - Focus containment while open.
  - Background scroll lock.
  - Appropriate dialog semantics and accessible labelling.
  - Responsive scrolling for long mobile content.

### 9. Get Involved and Contact

- Align the three Get Involved cards with the PowerPoint copy.
- Scholarship action uses `scholarshipApplication`.
- Volunteer action uses `volunteerForm`.
- Donor/partner action uses `donorPartnerForm`.
- Replace U-GO contact content with the Relay Fund heading, body, email, and website from the PowerPoint.
- Present Volunteer and Donor/Partner as two separate link actions, not local form submissions.
- Use safe fallback notices until form URLs are supplied.

### 10. Footer

- Remove obsolete Impact navigation.
- Route `Ủng hộ quỹ`, sponsor, and partner actions through `donorPartnerForm`.
- Route social/contact items through centralized configuration.
- Keep temporary footer prose until approved copy is supplied.
- Remove dead LinkedIn `#` links.

### 11. Vietnamese and English synchronization

- Finalize Vietnamese content first.
- Generate natural English translations from the approved Vietnamese source.
- Add translation entries for Programs submenu, Gạo yêu thương, News, About Us part 2, metrics, scholarship mapping, story pop-ups, fallback notices, forms, and footer changes.
- Ensure the initial HTML language matches the default Vietnamese translation state.
- Avoid mixed Vietnamese/English UI except intentional bilingual labels such as `Coming soon`.

### 12. Build output

- Run `npm run pack` after source verification.
- Verify `dist/index.html` is regenerated from the final source.
- Include the generated distribution update with the implementation if it is deterministic apart from expected embedded identifiers; otherwise document and resolve nondeterminism before committing.

## Acceptance criteria

### Content and structure

- Hero uses the PowerPoint Vietnamese copy and shows four configurable metric values.
- Trusted-by strip is absent.
- About Us has three text pillars plus one replaceable image.
- Activity badge and quote card are absent.
- About Us part 2 uses the previous dark Impact layout with three explanatory cards and no numeric Impact page.
- Programs owns the submenu on desktop and mobile.
- GPA is absent everywhere.
- Scholarship content, fields, criteria, process, VND value, and graduation support match approved requirements.
- Stories use the supplied introduction, three temporary cards, and three working pop-ups.
- Donor/partner testimonials are not visible.
- News appears only in the header as coming soon/configurable.
- U-GO text and email are absent.
- Contact shows separate volunteer and donor/partner actions.
- Header Volunteer/Get Involved actions are absent on desktop and mobile.
- Footer donation and external destinations are configuration-driven.

### Configuration

- Each replaceable external URL is declared exactly once.
- Four impact values are declared exactly once and marked temporary.
- No unavailable destination uses `href="#"`.
- Placeholder destinations provide an understandable, keyboard-accessible fallback.

### Accessibility and interaction

- All interactive elements are reachable and operable by keyboard.
- Programs submenu exposes expanded/collapsed state.
- Story pop-ups meet the focus, close, labelling, and scroll requirements above.
- Language switching does not remove event handlers or accessibility attributes.
- Images have accurate alt text; placeholders are not described as real Relay Fund events.

### Responsive behavior

- No horizontal overflow at 320, 375, 768, 1024, and 1440 CSS pixels.
- Header, submenu, four metrics, About layouts, scholarship details, cards, footer, and pop-ups remain readable at each breakpoint.
- Tap targets are large enough and do not overlap.

## Test plan

### Automated/static checks

1. Run `git diff --check`.
2. Search for unresolved conflict markers.
3. Search for forbidden/stale content:
   - `GPA`.
   - `info@ugouniversity.org`.
   - `For more information about U-GO`.
   - obsolete visible `Tác động` navigation.
   - external `href="#"` placeholders.
4. Verify that all configured link keys have consumers and all link consumers reference valid keys.
5. Validate inline JavaScript syntax.
6. Run `npm run pack` and confirm successful generation of `dist/index.html`.
7. Run an HTML validator if available; otherwise parse the built document in the browser and check the console for parser/runtime errors.

### Desktop functional checks

At 1440×900 and 1024×768:

1. Verify desktop navigation order and Programs submenu behavior.
2. Confirm Volunteer is absent from the header.
3. Exercise configured and missing-link fallback states.
4. Confirm four Hero metrics render from variables.
5. Verify both About parts and correct section scrolling.
6. Open and close each story pop-up by pointer, Escape, and close button.
7. Verify focus returns to the correct story card.
8. Switch Vietnamese → English → Vietnamese and compare every changed section.
9. Confirm footer actions use centralized destinations.

### Mobile functional checks

At 375×812 and 320×568:

1. Open/close the mobile menu and Programs submenu.
2. Confirm mobile `Tham gia` and `Ủng hộ` header actions are absent.
3. Verify menu state resets after selecting an item.
4. Confirm metrics wrap without clipping.
5. Check About image/card ordering and scholarship tag wrapping.
6. Open every story pop-up and test internal scrolling and background scroll lock.
7. Verify Contact and Get Involved actions have usable tap targets and fallback states.

### Content review

1. Compare Vietnamese copy against the PowerPoint and requirements summary.
2. Review generated English for meaning, tone, names, and scholarship terminology.
3. Confirm all dummy metrics, stories, images, and URLs are explicitly marked as temporary in source/configuration.
4. Confirm no placeholder content is presented as verified organizational data.

### Build review

1. Preview `src` using `npm run preview`.
2. Preview the packed output using `npm run preview:dist`.
3. Repeat critical navigation, language, pop-up, and link tests against `dist`.
4. Compare source and distribution rendering for visual parity.

## Commit strategy after implementation

- Keep documentation and implementation reviewable on `work/website-refresh`.
- Do not squash until content/layout review and tests pass.
- After approval, squash the branch changes against `origin/master` into one descriptive commit.
- Do not push without explicit approval.
