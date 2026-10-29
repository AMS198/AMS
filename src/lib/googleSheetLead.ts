// src/lib/googleSheetLead.ts
// Real-time synchronization of customer leads into Google Sheets.
// Non-blocking, fails gracefully, zero delay to website visitors.

export interface SheetLeadPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  address?: string;
  area?: string;
  source?: string;
  notes?: string;
}

const DEFAULT_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbyDLbQ6K3Bm1QErSVL0AMGmcpp15Dbxz5OBFecyECtvTJnGDZ4DgwZ602_jmK1RYJ81iw/exec';

export async function syncLeadToGoogleSheet(lead: SheetLeadPayload): Promise<void> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  if (!url) return;

  try {
    const payload = {
      name: lead.name?.trim() || 'Valued Client',
      phone: lead.phone?.trim() || 'N/A',
      email: lead.email?.trim() || '',
      service: lead.service?.trim() || 'General Civil Work',
      address: (lead.address || lead.area || '').trim() || '-',
      source: lead.source?.trim() || 'Website Form',
      notes: lead.notes || '',
    };

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      keepalive: true,
    });
  } catch (error) {
    console.error('[GoogleSheetSync] Error sending lead to Google Sheet:', error);
  }
}
