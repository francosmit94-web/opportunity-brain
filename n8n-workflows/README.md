# AetherCollect — Automated Invoice Processing & Payment Reminder System

**An n8n workflow that automates invoice tracking, aging analysis, and payment reminders for SMEs.**

---

## Overview

AetherCollect is a complete invoice automation system built in n8n. It ingests invoices via webhook, computes aging categories (current/pending/overdue/escalated/collections), and is designed to trigger payment reminder sequences.

## What It Does

1. **Receives invoice data** via POST webhook at `/webhook/invoices/new`
2. **Computes aging** — calculates days overdue from `dueDate`
3. **Categorizes** each invoice into severity tiers:
   - Current (0-30 days) → monitor
   - Pending (30-60 days) → send reminder
   - Overdue (60-90 days) → escalate
   - Collections (90+ days) → escalation required
4. **Logs to PostgreSQL** — stores audit trail of all processed invoices
5. **Ready for action** — designed to integrate with Email (SMTP), SMS (Twilio), or Slack for automated follow-ups

## What You Need

| Requirement | Purpose | Where to Get |
|-------------|---------|-------------|
| n8n instance (self-hosted, cloud, or Docker) | Workflow runtime | n8n.io |
| PostgreSQL database | Audit log storage | Included in docker-compose |
| SMTP credentials (optional) | Email reminders | Your email provider |
| Twilio account (optional) | SMS reminders | twilio.com |

## Quick Install

### Option 1: Import into existing n8n

1. Download `aether-collect-n8n-export.json`
2. In n8n, go to **Workflows → Import from File**
3. Select the JSON file
4. Configure credentials (PostgreSQL, Email, Twilio — as needed)
5. Activate the workflow

### Option 2: Run with Docker (full stack)

```yaml
version: '3'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - ./n8n-data:/home/node/.n8n

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_USER=aether
      - POSTGRES_DB=aether-credit
      - POSTGRES_PASSWORD=changeme
    ports:
      - "5432:5432"
```

## Nodes Included

| Node | Type | Function |
|------|------|----------|
| Webhook | n8n-nodes-base.webhook | Receives POST /invoices/new |
| Code | n8n-nodes-base.code | Computes days overdue, categorizes |
| Switch | n8n-nodes-base.switch | Routes by aging category |
| Email Send | n8n-nodes-base.emailSend | Sends payment reminders (0-30 days) |
| Twilio | n8n-nodes-base.twilio | Sends SMS reminders (31-60+ days) |
| PostgreSQL | n8n-nodes-base.postgres | Logs to audit table |

## Output Format

Each processed invoice returns:
```json
{
  "invoiceNumber": "INV-001",
  "clientName": "Mkhize Construction", 
  "amount": 124500,
  "daysOverdue": 15,
  "category": "current",
  "nextAction": "monitor"
}
```

## Pricing

**Template: $49** — One-time purchase. Includes:
- Full workflow JSON
- Docker compose file
- PostgreSQL schema
- Quick-start guide

**Template + Setup Support: $99** — Includes above + 30 min video call or async setup help.

## Purchase

- [Buy on Gumroad — $49](https://francosmith4.gumroad.com/l/...) (link coming)
- [Buy on FlowMarket](https://flowmarket.pro) (listing pending)

## Support

- GitHub Issues: https://github.com/francosmit94-web/opportunity-brain/issues
- Email: francosmit94@gmail.com

---

*Built by Aether Inc. — Cape Town, South Africa*
