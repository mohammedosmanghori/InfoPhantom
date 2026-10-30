# Contributing to InfoPhantom

Thank you for your interest in contributing to **InfoPhantom**! We welcome community contributions, bug reports, and suggestions to make information verification and gap detection more reliable, transparent, and accessible.

---

## Code of Conduct

All contributors are expected to uphold a respectful, inclusive, and collaborative environment. Be thoughtful, constructive, and open to feedback.

---

## How Can I Contribute?

### 1. Reporting Bugs
- Search existing issues to ensure the bug has not already been reported.
- If not reported, create a new issue including:
  - Clear and descriptive title.
  - Steps to reproduce the behavior.
  - Expected vs. actual behavior.
  - System and browser information.
  - Relevant console logs or extraction error messages.

### 2. Suggesting Enhancements
- Open an issue describing the proposed feature or algorithmic improvement.
- Explain the motivation: why would this enhancement benefit users?
- Outline potential implementation details or architectural implications.

### 3. Pull Requests (PRs)
1. Fork the repository and create your feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Implement your changes following existing code conventions:
   - TypeScript strict mode and clean interfaces.
   - Tailwind CSS for consistent UI styling.
   - Ensure server-side isolation of all AI/API keys.
4. Run linting and build checks:
   ```bash
   npm run lint
   npm run build
   ```
5. Commit your changes with descriptive, conventional commit messages:
   ```bash
   git commit -m "feat(gap-detector): enhance date parsing for academic cycles"
   ```
6. Push to your branch and open a Pull Request against `main`.

---

## Development Standards

- **Evidence Transparency:** Any new AI findings or heuristics must remain traceable to original source excerpts. Never fabricate citations or blur the distinction between verified source claims and AI hypotheses.
- **No Client API Keys:** Keep `@google/genai` SDK and private API keys strictly on the server (`server.ts`). The frontend must communicate via backend proxy routes (`/api/*`).
- **Responsive & Accessible Design:** Ensure the interface functions seamlessly on mobile viewports and adheres to dark-mode design standards.

---

## Questions or Support?

Reach out by opening an issue on GitHub or reaching out via project channels. Thank you for helping advance responsible AI research intelligence!
