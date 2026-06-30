# Product

## Register

product

## Users

Agile professionals and certification candidates who already know Scrum and want to earn their certification. They use this dashboard as an internal operations tool — configuring, monitoring, and interacting with a WhatsApp automation service. Context is typically solo, desktop, during preparation or delivery of a mentoring session. They are technically literate but not necessarily developers. Speed and clarity matter more than hand-holding.

## Product Purpose

ScrumMentors WhatsApp Integration is an internal operations dashboard for connecting a WhatsApp account to an automation backend (whatsapp-web.js) and sending messages via REST API or a built-in test form. It handles the full authentication lifecycle (QR scanning → connected state) and provides real-time event logs via WebSocket. Success looks like: the operator scans once, the session stays connected, and messages flow without friction.

## Brand Personality

Professional, precise, trustworthy. The interface should feel like it was built by someone who takes their craft seriously — no decoration for its own sake, nothing that wastes the operator's time. Calm and confident, not flashy.

## Anti-references

- Generic SaaS dashboards (blue-gray Tailwind defaults, rounded-everything, hero metrics, card grids)
- Any design that mimics WhatsApp's own green-heavy identity
- Over-designed landing pages with scroll-driven hero animations
- Pure hacker/terminal aesthetic (pure green-on-black, ASCII borders)

## Design Principles

1. **Status is the hero.** Connection state drives the entire UX. Every visual decision should reinforce whether the operator is connected, waiting, or in trouble — at a glance, without reading.
2. **Operator confidence through legibility.** Dense information (logs, status, API details) must be effortlessly scannable. Hierarchy earns its place; decoration doesn't.
3. **Nothing extra.** Every UI element must justify its presence with a job to do. If removing it wouldn't cost the operator anything, remove it.
4. **Feedback is immediate.** Real-time events, state transitions, and form responses should feel instantaneous. Motion is a functional signal, not a show.
5. **Tool, not toy.** The interface respects that operators return to this daily. Novelty wears off; reliability doesn't.

## Accessibility & Inclusion

WCAG AA compliance (4.5:1 contrast ratio for body text, 3:1 for large text and interactive states). Reduced motion support required for all animations. The dashboard is used on desktop in varied ambient light conditions; dark theme must be legible at typical screen brightness settings.
