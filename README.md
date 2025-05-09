Absolutely! Here’s a **perfect README prompt** tailored specifically for your project, **She Help SRM Safe**, leveraging the details from your codebase and configuration files.

---

# She Help SRM Safe

A modern, cross-platform mobile app empowering women’s safety in the SRM community with real-time alerts, location sharing, and a beautiful, accessible UI.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**She Help SRM Safe** is a mobile safety application designed for the SRM community. It enables users to send emergency alerts, share their real-time location, and access safe zones quickly and discreetly. Built with a focus on accessibility, reliability, and a custom She Help color palette, it aims to provide peace of mind and rapid assistance in critical situations.

---

## Features

- **Emergency Alerts:** Instantly notify trusted contacts or authorities with your live location.
- **Discreet Activation:** Trigger SOS alerts with gestures or quick actions.
- **Safe Zone Locator:** Find and navigate to nearby safe locations (police stations, hospitals, etc.).
- **Community Safety Tools:** Share and access safety information relevant to the SRM community.
- **Custom Theming:** Unique She Help color palette for a recognizable and accessible interface.

---

## Tech Stack

- **Framework:** React (TypeScript)
- **Mobile Platform:** Capacitor (iOS & Android)
- **Styling:** Tailwind CSS (with custom She Help palette), Radix UI
- **Build Tool:** Vite
- **State & Forms:** React Hook Form, Zod
- **Data Fetching:** TanStack React Query
- **Other:** ESLint, PostCSS, Tailwind CSS Animate

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Capacitor CLI (`npm install @capacitor/cli -g`)
- iOS/Android development environment (Xcode/Android Studio for native builds)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/she-help-srm-safe.git
cd she-help-srm-safe

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Usage

- Run `npm run dev` for local development.
- Use Capacitor to build and run on mobile devices:

```bash
npx cap sync
npx cap open ios   # For iOS
npx cap open android   # For Android
```

- Configure your trusted contacts and test emergency alerts in the app interface.

---

## Configuration

### Capacitor

The app is configured for both iOS and Android in `capacitor.config.ts`:

```ts
{
  appId: 'app.lovable.55947bf6adcb4dd3989b42e6fd44a15b',
  appName: 'she-help-srm-safe',
  webDir: 'dist',
  server: {
    url: 'https://55947bf6-adcb-4dd3-989b-42e6fd44a15b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: { contentInset: 'always' },
  android: { useLegacyBridge: true }
}
```

### Tailwind

Custom She Help colors are defined in `tailwind.config.ts`:

```js
shehelp: {
  purple: { light: '#E5DEFF', DEFAULT: '#8A4FFF', dark: '#6B3ACC' },
  pink: { light: '#FFDEE2', DEFAULT: '#FF5A87', dark: '#E63E68' },
  teal: { light: '#D5F5F2', DEFAULT: '#4ECDC4', dark: '#36ABA3' },
  warning: '#FFA500',
  danger: '#FF3B30',
  safe: '#34C759'
}
```

---

## Contributing

We welcome contributions! Please open issues or submit pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

Created with ❤️ by the She Help SRM Safe Team.  
For questions or feedback, please contact [your-email@example.com](mailto:your-email@example.com).

---

**Tip:**  
Replace URLs, emails, and repository links with your actual project details before publishing!

---

Let me know if you want this customized further or need a specific section expanded!

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/d98b08cb-818a-4c91-b58e-f75d7699677f/capacitor.config.json
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/f2d1f22e-42e3-44f5-9524-6670da2ca106/capacitor.config.ts
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/c6593fb7-e0e0-45b4-9cc2-5df346dc30c5/components.json
[4] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/ad4799ce-b7c1-4f16-bd38-088811f88a07/eslint.config.js
[5] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/425da605-0735-463b-9c93-0ebd4a55c36f/index.html
[6] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/c7b0f318-b19d-44d2-8401-bfd0a19d2a1c/package.json
[7] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/b84f25be-4c79-4f67-8dae-96ca02264108/postcss.config.js
[8] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/68663794/99b866c2-5dbb-479e-82bd-6aa877420261/tailwind.config.ts

---
Answer from Perplexity: pplx.ai/share
