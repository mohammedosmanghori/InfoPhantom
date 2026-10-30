# Security Policy for InfoPhantom

At **InfoPhantom**, we take the security and confidentiality of user research, private tokens, and scraped sources seriously.

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.4.x   | :white_check_mark: |
| < 2.4.0 | :x:                |

---

## Architecture & Security Principles

1. **Zero Client-Side Credentials:**
   The Google Gemini API key (`GEMINI_API_KEY`) is stored strictly in server-side environment variables and is never exposed in browser bundles, HTTP client headers, or client-side JavaScript.
2. **Safe Web Extraction:**
   The URL extraction endpoint (`/api/extract-url`) enforces strict timeout controls (10 seconds), URL structure validation, sanitization of script/style/iframe tags via Cheerio, and body length boundaries to prevent resource exhaustion and server-side request forgery (SSRF) abuse.
3. **Data Isolation:**
   Research sessions, notes, and checklist items are persisted exclusively within the user's local browser storage (`localStorage`) or ephemeral memory. No confidential document text is retained in third-party databases.
4. **Transparent Epistemological Boundaries:**
   Findings are classified into explicit verification categories (`SOURCE-SUPPORTED`, `POTENTIAL GAP`, `POTENTIAL CONFLICT`, `POSSIBLY OUTDATED`, and `AI SUGGESTION`) to eliminate hallucinations and prevent misleading intelligence outputs.

---

## Reporting a Vulnerability

If you discover a security vulnerability in InfoPhantom, please **do not** open a public issue.

Instead, please report the vulnerability confidentially:

1. Draft a summary containing:
   - Type of vulnerability (e.g., SSRF, XSS, injection, token leak).
   - Step-by-step instructions or proof-of-concept to reproduce.
   - Potential impact.
2. Submit your report directly via GitHub Security Advisories (if enabled on the repository) or contact the project maintainers directly.
3. You will receive an acknowledgment within 48 hours, followed by updates regarding remediation and patch release.

Thank you for responsibly keeping InfoPhantom and its users secure!
