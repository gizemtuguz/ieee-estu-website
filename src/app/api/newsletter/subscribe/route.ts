import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
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

    const normalizedEmail = String(email).trim().toLowerCase();
    const snapshot = await adminDb
      .collection('newsletter')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    await adminDb.collection('newsletter').add({
      email: normalizedEmail,
      locale,
      subscribedAt: FieldValue.serverTimestamp(),
      source: 'footer',
    });

    let welcomeSent = false;
    let emailError = null;
    if (isResendConfigured && resend) {
      try {
        const template = getWelcomeEmailTemplate(locale);
        const { data, error } = await resend.emails.send({
          from: 'IEEE ESTU <info@ieeeestu.org>',
          to: [normalizedEmail],
          subject: template.subject,
          html: template.html,
        });
        
        if (error) {
          console.error('Resend API error:', error);
          emailError = error.message;
        } else {
          console.log('Welcome email sent successfully:', data);
          welcomeSent = true;
        }
      } catch (err: any) {
        console.error('Welcome email send error:', err);
        emailError = err.message || 'Unknown error';
      }
    } else {
      console.warn('Resend is not configured - email will not be sent');
    }

    return NextResponse.json({ 
      success: true, 
      welcomeSent,
      emailError: emailError || undefined,
      message: welcomeSent 
        ? 'Subscribed successfully and welcome email sent' 
        : 'Subscribed successfully but welcome email could not be sent'
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
