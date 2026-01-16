import { NextRequest, NextResponse } from 'next/server';
import { resend, isResendConfigured } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const { emails, subject, html } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Emails array is required' },
        { status: 400 }
      );
    }

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Subject and HTML content are required' },
        { status: 400 }
      );
    }

    if (!isResendConfigured || !resend) {
      return NextResponse.json(
        { error: 'Resend is not configured' },
        { status: 500 }
      );
    }

    // Send emails in batches (Resend allows batch sending)
    const results = await Promise.allSettled(
      emails.map(async (email: string) => {
        return resend!.emails.send({
          from: 'IEEE ESTU <onboarding@resend.dev>', // Update with your verified domain
          to: [email],
          subject,
          html,
        });
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      sent: successful,
      failed,
      total: emails.length,
    });
  } catch (error) {
    console.error('Newsletter campaign error:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign emails' },
      { status: 500 }
    );
  }
}
