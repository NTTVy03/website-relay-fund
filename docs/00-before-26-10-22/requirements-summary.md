# Relay Fund website requirements summary

## Working context

- Working branch: `work/website-refresh`
- Base: the merged result of `vy-theme-home-about-us` and `thuy-relay`
- Local `master`: restored to `origin/master`
- Primary implementation file: `src/index.html`
- Additional content source: [`Mapping website (1).pptx`](./Mapping%20website%20(1).pptx)
- Requirement precedence: direct user requirements and the newer summary override the PowerPoint where they conflict; the PowerPoint supplies approved/reference copy and structure that were absent from the summary; both override the older task table and current implementation.
- This document is an audit and clarification record. It is not yet the implementation plan.

## Status legend

- **Done**: the current merged page satisfies the latest requirement.
- **Partial**: some related work exists, but it is incomplete or inconsistent.
- **Missing**: the latest requirement is not implemented.
- **Needs clarification**: implementation depends on content, assets, links, or layout decisions not available in the repository.
- **Superseded**: the task-table instruction was replaced by the newer summary.

## Requirement audit

| Area | Latest requirement | Current merged state | Status | Required follow-up |
|---|---|---|---|---|
| Homepage | Update homepage content. | The visible hero copy has been updated in part. The initial Vietnamese eyebrow still says `Đồng hành cùng nữ sinh Việt Nam`, while the language mapping changes it to `Học bổng dành riêng cho nữ sinh Việt Nam`. The PowerPoint supplies the intended tagline, headline, description, and three CTA labels. | **Partial** | Use the PowerPoint copy as the Vietnamese source, then keep initial markup and language mappings identical. Final English prose is still needed or must be translated. |
| Homepage impact numbers | Keep four impact values below the Hero: scholarship recipients, on-time graduation, provinces/cities, and total amount awarded. | The four hero statistics are present in source but commented out, and their labels/values do not match the confirmed set. | **Missing** | Restore the four-value Hero strip with centralized/editable content. Exact numeric values are still required. |
| About Us content | Keep About Us as two consecutive parts on the homepage. Part 2 follows part 1 without becoming a separate page/section in navigation. | The current page uses a single About section followed by a standalone numeric Impact section. PowerPoint slides 2 and 3 supply both parts' copy. | **Partial** | Use the existing dark Impact-section visual treatment for About Us part 2, replacing numeric cards with the three text themes from slide 3. |
| About Us pillars | Keep Sứ mệnh, Tầm nhìn, and Minh bạch; replace the fourth `Tác động thực` card with an image. | Four text cards remain. | **Missing — decision confirmed** | Implement three text cards plus one image slot. Keep a replaceable placeholder image until the final Relay Fund image is supplied. |
| About Us images | Use real Relay Fund scholarship-award photos later; remove both the activity badge and quote card now. | The two bundled images are generic stock photos. The `Ảnh hoạt động thực tế` badge and student quote card are still displayed. | **Missing — decision confirmed** | Remove both overlays and retain stable replaceable image paths/slots for later asset replacement. |
| Trusted-by strip | Remove `Được tin tưởng bởi`. | The strip remains in source but is commented out and not displayed. | **Done visually** | During cleanup, remove dead markup/CSS if it will not be reused. |
| Impact section | Remove the standalone numeric Impact section, but reuse its layout for About Us part 2. | The numeric Impact section is still active and linked from desktop navigation, mobile navigation, footer, and translations. The PowerPoint supplies three part-2 themes: career opportunities, family impact, and community impact, followed by a closing statement. | **Missing** | Replace the numeric section with About Us part 2 using those three themes; remove the standalone Impact navigation destination. |
| Theme | Apply a new lighter blue palette after layout and content work is complete. | The merged page uses the darker values `#1E4D96`, `#153A74`, and `#0C1F50`. | **Deferred / low priority** | Finish layout first. Keep color changes isolated in CSS variables so a new palette can be supplied later. |
| Programs navigation | Use a `Chương trình` submenu containing `Học bổng Sen Hồng` and `Chương trình Gạo yêu thương (coming soon)`. | A submenu exists, but it is incorrectly attached to `Câu chuyện`. Mobile navigation has no equivalent submenu. The rice-program label currently says `Quỹ gạo yêu thương`. | **Partial / incorrect** | Move the submenu to Programs, align desktop/mobile behavior, and confirm the exact Vietnamese label and capitalization of “coming soon.” |
| News | Show News in the header only for now; its destination will be supplied later. | No News navigation item exists. | **Missing — decision confirmed** | Add a `Tin tức / News` header item backed by centralized link configuration. Do not add a News section yet. |
| Scholarship eligibility | Remove GPA and apply the new mapping from cô Trang. | `GPA ≥ 2.5/4.0` is still visible. The PowerPoint supplies the replacement mapping: female student in a formal university/college program in Vietnam; financial hardship; motivation, learning mindset, and self-development ambition; active in or wishing to contribute to the community. | **Missing** | Replace the current eligibility tags with the supplied mapping and remove GPA. |
| Scholarship priority fields | Add preferred fields of study. | A priority-fields group exists, but it contains malformed HTML (an extra `</span>`) and an unusually long paragraph inside a tag. The PowerPoint confirms Medicine/Pharmacy, Pedagogy, Engineering, Natural Sciences, Environment, and other community-impact fields, while keeping applications open to all fields. | **Partial** | Apply the supplied list, separate the explanatory sentence from the tags, and correct the markup/responsive presentation. |
| Scholarship value | Display the scholarship as `Từ 10 triệu đồng/năm` and state that support continues until graduation. | It currently displays `400USD - 1000USD` and does not clearly state support through graduation. | **Missing — decision confirmed** | Use clear Vietnamese wording; derive the English version from the finalized Vietnamese copy. |
| Scholarship selection and process | Use the revised selection criteria and four-step application process. | The current process already has four steps. The PowerPoint supplies the intended criteria: resilience, academic achievement and learning spirit, future potential, and ability to create positive community impact. | **Partial** | Align criteria copy with the PowerPoint and retain the four steps: preliminary application, application review, interview, and result announcement. |
| Scholarship application links | Application destinations will be supplied later and must be centralized. | Scholarship, hero, header, mobile, and Get Involved application links currently point to inconsistent internal anchors. | **Missing — URL pending** | Route all scholarship CTAs through one configuration key. Until populated, show the closed-intake notice instead of navigating to `#`. |
| Header | Remove the Volunteer button. | The desktop header still displays `Tình nguyện`. The mobile menu also contains participation/donation actions. | **Missing** | Confirm whether only the desktop Volunteer button is removed or all header/mobile volunteer entries are removed. |
| Stories content | Use dummy story content for now; real copy and assets will be supplied later. | Three placeholder cards already exist. The PowerPoint supplies the final section introduction. | **Partial — temporary content approved** | Keep three clearly replaceable story records and use the supplied section introduction. |
| Story CTA | Remove `Chia sẻ câu chuyện của bạn`. | The button is no longer displayed. | **Done** | No action beyond cleanup/verification. |
| Story pop-ups | Create one accessible pop-up for each of the three stories using dummy detail content for now. | No modal or pop-up implementation exists. | **Missing — temporary content approved** | Store story summary/detail content centrally and implement keyboard, close, outside-click, scroll-lock, and mobile behavior. |
| Donor/partner testimonials | Temporarily hide `Nhà tài trợ nói gì` and `Đối tác chia sẻ`. | Both testimonial panels remain visible below the three story cards. | **Missing** | Hide them while preserving the content for later reactivation, unless deletion is preferred. |
| Get Involved | Present scholarship application, volunteering, and donor/partner pathways with their supplied copy. | Three cards already exist, but some copy and links differ from the PowerPoint. | **Partial** | Align copy with slide 8 and connect each CTA to the confirmed Facebook or Google Form destination. |
| Contact content | Provide separate volunteer and donor/partner form actions; URLs will be supplied later. | The page currently shows an unrelated U-GO email message and no usable form actions. | **Missing — URLs pending** | Replace the U-GO block with supplied Relay Fund copy and two externally linked CTA cards backed by centralized configuration. |
| Footer content | Keep temporary footer content until final copy and destinations are supplied. | Footer copy and navigation remain largely unchanged; Impact is still linked and LinkedIn uses `#`. | **Partial / deferred content** | Correct links affected by the new page structure and centralize every external destination for later replacement. |
| Footer donation link | `Ủng hộ quỹ` should link to the donor/partner form. | The chip currently links to `#involved`; sponsor and partnership footer links also point to internal sections. | **Missing / blocked on URL** | Use the approved donor/partner form URL consistently after it is supplied. |
| Language switcher | Keep the switcher and generate English translations from finalized Vietnamese copy. | Several initial strings and translation-map strings disagree. New submenu, scholarship details, footer, and contact changes are not fully represented in the translation map. | **Partial — decision confirmed** | Treat Vietnamese as the source of truth and provide complete, synchronized English translations. |

## Conflicts resolved by requirement precedence

The following task-table entries are superseded by the newer summary:

1. `Trang chủ — Bỏ phần số liệu` is replaced by **keep the impact numbers below the homepage**.
2. `Liên hệ — Bỏ phần điền form` is replaced by **provide two separate forms: volunteer and donor/partner**.
3. The Thuy feature branch's version that enables the trusted-by strip is superseded; the merged work branch currently keeps `Được tin tưởng bởi` hidden.
4. The current USD scholarship value is replaced by the VND value and support-through-graduation wording.

## Confirmed implementation decisions

- About Us part 2 remains visually styled like the current dark `Những con số biết nói` section, immediately after About Us part 1, but uses the three explanatory text items from PowerPoint slide 3 instead of statistics.
- The About Us pillar area contains three text cards plus one image. The image remains a replaceable placeholder until a real Relay Fund asset is supplied.
- Remove the `Ảnh hoạt động thực tế` badge and the complete quote card.
- The Hero impact strip contains four metrics: scholarship recipients, on-time graduation, provinces/cities, and total amount awarded. Values are centralized variables with clearly marked dummy values until official values are supplied.
- Use the PowerPoint mapping for eligibility, preferred fields, selection criteria, and application process; GPA is removed.
- Use dummy content for three stories and their pop-ups until final stories/assets arrive.
- News appears in the header only; no News section is built yet.
- Remove Volunteer/Get Involved actions from both desktop and mobile headers, including the mobile `Tham gia` and `Ủng hộ` actions. The Get Involved page section remains available through page content and relevant CTAs.
- Keep the language switcher. Vietnamese is the content source, and English is generated from the finalized Vietnamese version.
- Defer the new light-blue palette until after layout work.
- Footer copy, social destinations, real images, and external form/application URLs are replaceable placeholders for now.

## Centralized link configuration

All external or replaceable destinations must be defined once in a single configuration object inside the current single-page implementation. No CTA should hard-code a replaceable URL.

Planned keys:

- `facebookPage`
- `scholarshipApplication`
- `volunteerForm`
- `donorPartnerForm`
- `news`
- `linkedIn`
- `contactEmail`
- `website`

Elements should reference a configuration key rather than duplicating URLs. Empty destinations must not use a dead `href="#"`; they should use an accessible disabled/coming-soon state or the approved closed-intake notice. This allows final URLs to be populated in one place later.

## Content supplied by the PowerPoint

The following is a normalized transcription of the website copy and content direction in the deck. Link notes and review comments are recorded as requirements evidence only; no instruction embedded in the deck has been executed.

### Homepage / Hero

- Tagline: `Đồng hành cùng nữ sinh Việt Nam`
- Headline: `Nâng đỡ ước mơ. Tiếp sức nữ sinh.`
- Description: `Mỗi nữ sinh đều có những ước mơ cho riêng mình. The Relay Fund được tạo nên để những ước mơ ấy không phải dừng lại vì hoàn cảnh khó khăn. Chúng tôi kết nối sự sẻ chia từ cộng đồng để mang đến cơ hội học tập và động lực vươn lên cho các em.`
- CTAs: `Ứng tuyển học bổng`, `Đồng hành cùng chúng tôi`, `Tìm hiểu thêm`
- CTA intent: scholarship application links to Học bổng Sen Hồng; `Tìm hiểu thêm` links to About Us; the third CTA connects to the relevant involvement/contact destination.

### About Us — part 1

`The Relay Fund là một doanh nghiệp xã hội (MST: 0317235089) được thành lập với mong muốn kết nối những nhà tài trợ giàu tâm huyết với các nữ sinh có hoàn cảnh khó khăn nhưng giàu nghị lực, giúp các em có thêm cơ hội theo đuổi việc học và những ước mơ của mình.`

`Chúng tôi tin rằng hoàn cảnh không nên là rào cản khiến một em gái phải từ bỏ tương lai mà em mong muốn. Thông qua hỗ trợ vật chất, các chương trình phát triển kỹ năng và sự đồng hành từ cộng đồng, The Relay Fund giúp các em có thêm điểm tựa để vững bước trên hành trình học tập và trưởng thành.`

- Sứ mệnh: `Trao cơ hội học tập và đồng hành cùng nữ sinh trên hành trình trưởng thành bằng tri thức.`
- Tầm nhìn: `Góp phần xây dựng một Việt Nam nơi các nữ sinh có hoàn cảnh khó khăn được tiếp cận cơ hội học tập và phát triển.`
- Vision statement: `Một Việt Nam nơi không nữ sinh nào phải từ bỏ ước mơ học tập vì hoàn cảnh khó khăn.`
- Minh bạch: `Mọi khoản tài trợ được quản lý công khai, báo cáo định kỳ và sử dụng đúng mục đích.`

### About Us — part 2

Heading: `Vì sao đầu tư vào giáo dục nữ sinh?`

1. `Mở ra cơ hội nghề nghiệp` — Mỗi năm học thêm có thể giúp tăng thu nhập trung bình khoảng 10% trong tương lai.
2. `Tác động đến gia đình` — Trình độ học vấn của người mẹ có ảnh hưởng tích cực đến sức khỏe và cơ hội phát triển của con cái.
3. `Lan tỏa đến cộng đồng` — Đầu tư vào giáo dục phụ nữ được xem là một trong những khoản đầu tư mang lại hiệu quả kinh tế và xã hội cao nhất.

Closing statement: `Một cơ hội được trao hôm nay không chỉ giúp thay đổi cuộc đời của một nữ sinh mà còn tạo ra những tác động tích cực cho gia đình, cộng đồng và thế hệ tiếp theo.`

### Học bổng Sen Hồng

- Heading: `Học bổng Sen Hồng`
- Subheading: `Đồng hành cùng nữ sinh trên hành trình đại học`
- Description: `Học bổng Sen Hồng dành cho nữ sinh Việt Nam có hoàn cảnh khó khăn nhưng giàu nghị lực và khát vọng vươn lên. Không chỉ hỗ trợ tài chính, chương trình còn đồng hành cùng học viên trong suốt hành trình đại học thông qua các hoạt động phát triển kỹ năng, định hướng nghề nghiệp và kết nối cộng đồng.`

Đối tượng:

- Nữ sinh đang theo học đại học hoặc cao đẳng chính quy tại Việt Nam.
- Có hoàn cảnh khó khăn về kinh tế.
- Có ý chí học tập, tinh thần cầu tiến và khát vọng phát triển bản thân.
- Tích cực tham gia hoặc mong muốn đóng góp cho cộng đồng.

Ngành học ưu tiên:

- Y Dược.
- Sư phạm.
- Kỹ thuật.
- Khoa học Tự nhiên.
- Môi trường.
- Các lĩnh vực có tiềm năng tạo ra tác động tích cực cho cộng đồng.
- Học bổng không giới hạn ngành học và khuyến khích ứng tuyển từ mọi lĩnh vực đào tạo.

Tiêu chí xét tuyển:

- Nghị lực vượt khó.
- Thành tích và tinh thần học tập.
- Tiềm năng phát triển trong tương lai.
- Khả năng tạo tác động tích cực cho cộng đồng.

Quy trình ứng tuyển:

1. Nộp hồ sơ trực tuyến.
2. Đánh giá hồ sơ.
3. Phỏng vấn.
4. Công bố kết quả.

The deck describes the value as `400–1.000 USD/năm/sinh viên (quy đổi sang VNĐ)` plus learning, skills-development, and career-networking opportunities. The newer direct requirement overrides the displayed value with `10 triệu++/năm` and support through graduation; exact final wording remains to be confirmed.

When applications are closed, the deck requests the notice: `Chương trình hiện chưa có tuyển sinh mới`, with users directed to Sen Hồng's Facebook for updates.

### Chương trình Gạo yêu thương

- Heading: `Chương trình Gạo yêu thương`
- State: `Đang cập nhật / Coming soon`

### Stories

- Heading: `Những hành trình được tiếp sức`
- Introduction: `Mỗi nữ sinh Sen Hồng đều mang theo một câu chuyện riêng về nghị lực, khát vọng và hành trình vượt khó. Nhờ học bổng và sự đồng hành của cộng đồng, các em có thêm cơ hội tiếp tục việc học, phát triển bản thân và từng bước hiện thực hóa ước mơ của mình.`
- Direction: show two or three real stories with photos and short excerpts. Individual story copy and assets are not included in the deck.

### News

- Heading: `Tin tức / News`
- State: `Đang cập nhật / Coming soon`
- Future sources/topics: Standard Chartered Bank visits, attendance at U-GO summits, scholarship-award events from 2026 onward, and workshops. The included U-GO newsletter screenshot is a layout/content reference, not Relay Fund copy to publish.

### Get Involved

Scholarship application:

`Bạn là nữ sinh đại học có hoàn cảnh khó khăn, nghị lực và ước mơ? Hồ sơ Sen Hồng đang chờ bạn.`

Volunteer:

`Bạn có kỹ năng, thời gian và mong muốn tạo ra tác động? Tình nguyện viên Sen Hồng đang cần bạn — xét duyệt hồ sơ, mentoring, truyền thông và hơn thế.`

Donor and partner:

`Mỗi khoản đóng góp đều trực tiếp mở ra cơ hội học tập và phát triển cho nữ sinh Việt Nam. Chúng tôi cam kết minh bạch và trách nhiệm trong mọi hoạt động.`

The deck specifies a Facebook destination/status notice for scholarship applications and separate Google Form destinations for volunteer and donor/partner actions. Donations are not accepted directly through the website.

### Contact

- Heading: `Cùng chúng tôi tạo thêm cơ hội cho nữ sinh Việt Nam`
- Body: `Mỗi sự kết nối đều có thể mở ra một cơ hội học tập mới cho các em. Nếu bạn muốn tìm hiểu về chương trình, trở thành nhà tài trợ, đối tác hoặc tình nguyện viên, hãy liên hệ với chúng tôi.`
- Email: `therelayfund@gmail.com`
- Website: `therelayfund.com`
- LinkedIn: placeholder only; final URL is not supplied.

## Existing merge defects to fix during implementation

These are not separate product requirements, but they should be included in the eventual implementation plan:

- Fix the extra closing `</span>` in the preferred-fields markup.
- Synchronize visible Vietnamese copy with the language translation map.
- Remove or replace the incorrect U-GO contact email and the reference to a nonexistent form.
- Make Programs submenu behavior work consistently on desktop and mobile.
- Update or remove stale `#impact`, `#contact`, and `#involved` links after the section structure is finalized.
- Decide whether unused form, trust-bar, and removed-section CSS/JavaScript should be deleted.
- Verify focus behavior, Escape-to-close, outside-click behavior, scroll locking, and responsive sizing for the three story pop-ups.

## Deferred inputs that do not block implementation

- Official values for the four Hero impact metrics.
- Final Facebook, scholarship, volunteer-form, donor/partner-form, News, and LinkedIn URLs.
- Real Relay Fund event images and final story content/assets.
- Final lighter-blue palette.
- Final footer copy and social/contact destinations.

Each deferred value has an approved placeholder or centralized configuration path, so layout implementation can proceed without hard-coded temporary destinations.

## Next step

Follow [`implementation-plan.md`](./implementation-plan.md). No product implementation should begin until that plan is reviewed.
