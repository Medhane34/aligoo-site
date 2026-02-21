#+BEGIN_NOTE
Strategy:- Use two dataset instead of the current one production dataset only. one of the smartest moves we can make on the free tier, especially with the kind of system were building.

I’ll break this down clearly and practically, not theory.

✅ The idea 

Use two datasets:

1️⃣ production (Core Site Data) | current dataset 
2️⃣ automation (Telegram + CRM + workflows) | to be created new 

This aligns perfectly with how Sanity is meant to be used.

Why this matters (the real reasons)
1️⃣ API usage isolation (BIGGEST win)

Right now:

Website traffic 
Webhooks

Telegram broadcasts

Dashboards

Automations

👉 all consume from one shared API quota

When we split datasets:

Sanity tracks API usage per dataset

we can instantly see:

“Website traffic cost me X”

“Automations cost me Y”

Even on the free tier, this gives you visibility and control.
2️⃣ Core site stays fast + safe (business-critical)

our website is:

Public

SEO-sensitive

Revenue-facing

Traffic-driven

Your automations are:

Internal

Trigger-based

Burst-heavy (loops, broadcasts, retries)

By separating:

Automations can spike without risking site content fetches

A bug in Telegram automation won’t affect site rendering

Worst case, automation breaks — site stays online

This is huge for reliability.
3️⃣ You can cache core content aggressively

With a clean separation:

Core dataset

Blog

Pages

Multilingual copy

Images

You can safely:

Use ISR (revalidate: 300 / 600)

Cache at Vercel Edge

Reduce Sanity calls by 80–90%

Automation dataset

No caching

Real-time

Event-driven

Right now, caching is harder because everything is mixed.
4️⃣ Webhooks become cheaper + safer

If everything is in one dataset:

Every publish fires webhooks

Even simple content edits may trigger logic unintentionally

With two datasets:

Core dataset → NO webhooks

Automation dataset → targeted webhooks only

Result:

Fewer webhook calls

Fewer Next.js route executions

Fewer accidental loops

5️⃣ Security + access control (often overlooked)

You can:

Give content editors access to core dataset only

Restrict automation dataset to you / developers

This prevents:

Accidental status changes

Someone publishing a campaign that triggers a broadcast

Editors touching subscriber data

This is enterprise-level hygiene, even on free tools.

6️⃣ Cleaner mental model (this matters long-term)

You’ll think in two systems:

Core Site System

Read-heavy

Stable

Cached

Public

Automation System
Write-heavy

Trigger-based

Internal

Stateful

That clarity:

Makes debugging easier

Makes scaling easier

Makes future migration easier (e.g. move automations off Sanity later)

In addition, after creating the second dataset a follow up strategy were going to work on is creating a kill swith or turn on or off for automations dataset. This will allows to turn on and off off automations usage with toggle button. 