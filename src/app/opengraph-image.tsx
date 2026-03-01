import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background:
            'radial-gradient(circle at 20% 20%, rgba(0,217,255,0.22), transparent 45%), radial-gradient(circle at 90% 90%, rgba(59,130,246,0.2), transparent 50%), #030712',
          color: '#f1f5f9',
          fontFamily: 'Inter, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 12,
              border: '2px solid #00d9ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#00d9ff',
            }}
          >
            LG
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>Lakshya Grover</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            Full-Stack Cloud Engineer
          </div>
          <div style={{ fontSize: 30, color: '#94a3b8' }}>
            ASP.NET Core | React | TypeScript | Scalable Systems
          </div>
        </div>

        <div style={{ fontSize: 24, color: '#00d9ff' }}>lakshyagrover.dev</div>
      </div>
    ),
    size
  )
}
