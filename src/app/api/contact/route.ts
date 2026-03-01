import { NextResponse } from 'next/server'

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

    if (!resendApiKey || !contactEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured. Set RESEND_API_KEY and CONTACT_EMAIL.' },
        { status: 500 }
      )
    }

    const safeName = String(name).trim()
    const safeEmail = String(email).trim()
    const safeSubject = String(subject).trim()
    const safeMessage = String(message).trim()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const textBody = [
      'New portfolio contact form submission:',
      '',
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      `Subject: ${safeSubject}`,
      '',
      'Message:',
      safeMessage,
    ].join('\n')

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New portfolio contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(safeMessage).replace(/\n/g, '<br/>')}</p>
      </div>
    `

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [contactEmail],
        subject: `[Portfolio] ${safeSubject}`,
        html: htmlBody,
        text: textBody,
        reply_to: safeEmail,
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      return NextResponse.json(
        { error: `Resend API error (${resendResponse.status}): ${resendError}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Message received! I will get back to you soon.' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
