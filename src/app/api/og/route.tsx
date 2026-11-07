import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic values
    const title = searchParams.get('title') || 'AMS Civil Construction';
    const location = searchParams.get('location') || 'Mumbai, Maharashtra';
    const service = searchParams.get('service') || 'Premium Civil Contractor';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B1120',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #F97316 2%, transparent 0%), radial-gradient(circle at 75px 75px, #F97316 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom right, rgba(11, 17, 32, 0.9), rgba(11, 17, 32, 0.8))',
              zIndex: 1,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '80px',
              zIndex: 10,
              width: '100%',
              height: '100%',
            }}
          >
            {/* Top Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
                background: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '40px',
                marginBottom: '40px',
              }}
            >
              <span
                style={{
                  color: '#F97316',
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {service}
              </span>
            </div>

            {/* Main Title */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: '30px',
                maxWidth: '900px',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </div>

            {/* Location & Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 'auto',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '40px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F97316',
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#94A3B8', fontSize: 24 }}>Serving Area</span>
                  <span style={{ color: 'white', fontSize: 32, fontWeight: 700 }}>{location}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#F97316', fontSize: 40, fontWeight: 900, marginRight: '10px' }}>AMS</span>
                <span style={{ color: 'white', fontSize: 40, fontWeight: 300 }}>Civil Construction</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e: any) {
    console.error('Failed to generate OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
