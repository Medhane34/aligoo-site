// app/api/contact/route.ts
// Make sure this file exists and contains the following:

import { Resend } from 'resend';
import * as z from 'zod';
import { NextResponse } from 'next/server'; // Import NextResponse for App Router responses

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the schema for server-side validation
const contactFormSchema = z.object({
    fullName: z.string().min(1, "Full Name is required."),
    phoneNumber: z.string().min(1, "Phone Number is required.").regex(/^[0-9\s\-()]*$/, "Invalid phone number format. Only numbers, spaces, hyphens, and parentheses allowed."),
    countryCode: z.string().min(1, "Please select a country code."),
    companyName: z.string().optional().or(z.literal('')),
    serviceEnquiry: z.string().min(1, "Please select a service."),
    message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message cannot exceed 500 characters."),
});

// THIS IS THE CRUCIAL PART FOR APP ROUTER
// Export a named function for the HTTP method you are using (POST in this case)
export async function POST(req: Request) { // 'req' is a standard Web Request object
    try {
        const body = await req.json(); // Use req.json() to parse the body

        // Validate the request body
        const validatedData = contactFormSchema.parse(body);

        const { fullName, phoneNumber, countryCode, companyName, serviceEnquiry, message } = validatedData;

        // Construct the email content
        const emailContent = `
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Phone Number:</strong> ${countryCode}${phoneNumber}</p>
            <p><strong>Company Name:</strong> ${companyName || 'N/A'}</p>
            <p><strong>Service Enquiry:</strong> ${serviceEnquiry}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Replace with your verified domain or allowed sender
            to: 'aligoodigital@gmail.com', // Replace with recipient email
            subject: `New Contact Form Submission from ${fullName}`,
            html: emailContent,
        });

        if (error) {
            console.error('Resend email error:', error);
            // Return a proper JSON response for errors
            return NextResponse.json({ message: 'Failed to send email.', error: error.message }, { status: 500 });
        }

        // Return a proper JSON success response
        return NextResponse.json({ message: 'Message sent successfully!', data }, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Zod validation error
            return NextResponse.json({ message: 'Validation Error', errors: error.errors }, { status: 400 });
        }
        console.error('API Error:', error);
        // Catch-all for other server errors
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}