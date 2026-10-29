// scripts/submit-instant-indexing.js
const { google } = require('googleapis');
const sa = require('../service-account.json');

const TOP_GOOGLE_URLS = [
  'https://www.amscivilwork.in',
  'https://www.amscivilwork.in/services',
  'https://www.amscivilwork.in/services/bungalow-construction',
  'https://www.amscivilwork.in/services/full-interior-work',
  'https://www.amscivilwork.in/services/bathroom-renovation',
  'https://www.amscivilwork.in/services/tiles-work',
  'https://www.amscivilwork.in/services/waterproofing',
  'https://www.amscivilwork.in/areas',
  'https://www.amscivilwork.in/areas/andheri-west',
  'https://www.amscivilwork.in/areas/bandra-west',
  'https://www.amscivilwork.in/areas/borivali-west',
  'https://www.amscivilwork.in/areas/thane',
  'https://www.amscivilwork.in/areas/dadar',
  'https://www.amscivilwork.in/areas/worli',
  'https://www.amscivilwork.in/areas/powai',
  'https://www.amscivilwork.in/areas/goregaon',
  'https://www.amscivilwork.in/areas/malad-west',
  'https://www.amscivilwork.in/areas/kandivali-west',
  'https://www.amscivilwork.in/areas/vashi',
  'https://www.amscivilwork.in/areas/pune',
  'https://www.amscivilwork.in/areas/kolkata',
  'https://www.amscivilwork.in/areas/ranchi',
  'https://www.amscivilwork.in/areas/howrah',
  'https://www.amscivilwork.in/free-consultation',
  'https://www.amscivilwork.in/calculator'
];

async function submitGoogle() {
  console.log('--- 1. Submitting to Google Indexing API ---');
  try {
    const jwtClient = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    await jwtClient.authorize();
    
    let count = 0;
    for (const url of TOP_GOOGLE_URLS) {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtClient.credentials.access_token,
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });
      if (res.ok) {
        count++;
      }
    }
    console.log(`✅ Google Indexing API: Successfully notified ${count}/${TOP_GOOGLE_URLS.length} top URLs!`);
  } catch (err) {
    console.error('Google Indexing API Error:', err.message);
  }
}

async function submitIndexNow() {
  console.log('--- 2. Submitting to IndexNow (Bing/Yandex/AI) ---');
  try {
    const payload = {
      host: 'www.amscivilwork.in',
      key: 'a1b2c3d4e5f6g7h8i9j0amscivilwork',
      keyLocation: 'https://www.amscivilwork.in/a1b2c3d4e5f6g7h8i9j0amscivilwork.txt',
      urlList: TOP_GOOGLE_URLS
    };
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log(`✅ IndexNow Response Status: ${res.status} (200/202 = Success)`);
  } catch (err) {
    console.error('IndexNow Error:', err.message);
  }
}

async function main() {
  await submitGoogle();
  await submitIndexNow();
}

main();

