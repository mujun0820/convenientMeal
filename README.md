# 🍱 디미고간편식

> **디미고 학생들을 위한 간편식 확인 웹앱**  
> 매일 아침/저녁 제공되는 간편식(샐러드, 샌드위치, 닭가슴살, 선식)을 빠르고 간편하게 확인하세요!

---

## 📱 PWA 설치 방법

디미고간편식은 **Progressive Web App (PWA)** 형태로 제공되어,
iOS와 Android 모두에서 **홈 화면에 설치하여 앱처럼 사용할 수 있습니다.**

### ✅ iOS (아이폰) 기준

1. [https://간편식.mujun0820.com](https://간편식.mujun0820.com) 접속
2. Safari 하단 공유 버튼 ![공유버튼](https://developer.apple.com/design/human-interface-guidelines/images/icons/share-action.svg) 클릭
3. `홈 화면에 추가` 버튼 선택
4. 앱 이름 확인 후 `추가` 버튼 클릭
5. 홈 화면에서 디미고간편식 아이콘 확인!

### ✅ Android 기준 (Chrome)

1. [https://간편식.mujun0820.com](https://간편식.mujun0820.com) 접속
2. 우측 상단 `⋮` 메뉴 클릭
3. `홈 화면에 추가` 또는 `앱 설치` 버튼 클릭
4. 이름 입력 후 `추가` → 앱 설치 완료!

---

## 🌟 주요 기능

| 기능 | 설명 |
|------|------|
| 🥗 간편식 메뉴 조회 | 주간 PDF 공지를 자동 분석하여 날짜별 조식/석식 메뉴를 확인 |
| 📅 날짜 이동 | 이전/다음 날짜 버튼으로 손쉽게 탐색 |
| 🌓 다크모드 지원 | 시스템 설정에 따라 자동 반전 |
| 📱 모바일 최적화 | 반응형 UI / PWA 앱 설치 지원 |

---

## ⚙️ 기술 스택

- **Next.js 13 (App Router)**
- **Express.js + SQLite (백엔드 API 서버)**
- **Puppeteer + pdf-parse** (식단표 PDF 자동 분석)
- **Tailwind CSS + Lucide Icons**
- **PM2 + NGINX** (Raspberry Pi 서버 운영)

---

## 👨‍💻 제작자

- **Github**: [@mujun0820](https://github.com/mujun0820)
- 문의나 피드백은 GitHub 이슈 또는 DM으로 보내주세요!

---
