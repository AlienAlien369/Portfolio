import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 600 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '48px 56px',
          background:
            'linear-gradient(135deg, rgba(0,217,255,0.12), rgba(59,130,246,0.12)), #030712',
          color: '#f1f5f9',
          fontFamily: 'Inter, Segoe UI, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 56, fontWeight: 800 }}>Lakshya Grover</div>
          <div style={{ fontSize: 34, color: '#00d9ff', fontWeight: 600 }}>
            Full-Stack Cloud Engineer
          </div>
          <div style={{ fontSize: 24, color: '#94a3b8' }}>
            Building secure, scalable enterprise systems
          </div>
        </div>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 24,
            border: '2px solid #00d9ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 54,
            fontWeight: 800,
            color: '#00d9ff',
          }}
        >
          LG
        </div>
      </div>
    ),
    size
  )
}
