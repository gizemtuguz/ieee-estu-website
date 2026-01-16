import { NextRequest, NextResponse } from 'next/server';
import { resend, getWelcomeEmailTemplate, isResendConfigured } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();

    if (!email || !locale) {
      return NextResponse.json(
        { error: 'Email and locale are required' },
        { status: 400 }
      );
    }

    if (!isResendConfigured || !resend) {
      return NextResponse.json(
        { error: 'Resend is not configured' },
        { status: 500 }
      );
    }

    const template = getWelcomeEmailTemplate(locale);

    const { data, error } = await resend.emails.send({
      from: 'IEEE ESTU <info@ieeeestu.org>',
      to: [email],
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ 
        error: error.message,
        details: 'Make sure you have verified your sending domain in Resend dashboard'
      }, { status: 500 });
    }

    console.log('Welcome email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Newsletter welcome email error:', error);
    return NextResponse.json(
      { error: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}
