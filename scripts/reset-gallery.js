const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local since dotenv might not be in scope
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/MONGODB_URI=(.*)/);
const uri = match ? match[1].trim() : null;

if (!uri) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

const galleryImages = [
  { src: '/images/bungalow-construction.jpg', title: 'Modern Bungalow Construction', category: 'Bungalow' },
  { src: '/images/bathroom-renovation.jpg', title: 'Luxury Bathroom Renovation', category: 'Bathroom' },
  { src: '/images/kitchen-work.jpg', title: 'Premium Modular Kitchen', category: 'Kitchen' },
  { src: '/images/tiles-work.jpg', title: 'High-End Tiles Installation', category: 'Tiles' },
  { src: '/images/interior-work.jpg', title: 'Luxury Interior Design', category: 'Interior' },
  { src: '/images/pop-work.jpg', title: 'Designer POP False Ceiling', category: 'POP' },
  { src: '/images/flooring-work.jpg', title: 'Italian Marble Flooring', category: 'Flooring' },
  { src: '/images/swimming-pool.jpg', title: 'Luxury Private Swimming Pool', category: 'Pool' },
  { src: '/images/plaster-work.jpg', title: 'External Plastering Work', category: 'Plaster' },
  { src: '/images/compound-wall-real.jpg', title: 'Bungalow Compound Wall', category: 'Wall' },
];

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('gallery');

    console.log('Deleting old gallery entries...');
    // await collection.deleteMany({});

    console.log('Seeding new realistic images...');
    const now = new Date();
    const itemsToInsert = galleryImages.map(img => ({
      ...img,
      alt: img.title,
      createdAt: now
    }));

    await collection.insertMany(itemsToInsert);
    console.log('Gallery successfully reset with realistic Indian construction images!');

  } catch (error) {
    console.error('DB Error:', error);
  } finally {
    await client.close();
  }
}

main();
