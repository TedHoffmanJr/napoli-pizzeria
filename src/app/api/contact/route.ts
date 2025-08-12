import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    console.log('RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, phone, company, eventDate, guestCount, package: packageType, message, type } = body;

    // Validate required fields
    if (!name || !email || (!phone && type === 'catering')) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email content based on form type
    const isCarteringForm = type === 'catering';
    const subject = isCarteringForm 
      ? `Catering Inquiry from ${name}` 
      : `Contact Form Submission from ${name}`;

    const emailContent = isCarteringForm ? `
      <h2>New Catering Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
      <p><strong>Guest Count:</strong> ${guestCount || 'Not specified'}</p>
      <p><strong>Package Interest:</strong> ${packageType || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No additional message'}</p>
    ` : `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'website@napoli-pizzeria.com', // You may need to verify this domain
      to: ['ted@growwithagp.com'], // All forms go to Ted
      subject: subject,
      html: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: isCarteringForm 
        ? 'Catering inquiry sent successfully! We\'ll get back to you within 24 hours.' 
        : 'Message sent successfully! We\'ll get back to you soon.',
      id: data?.id 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}