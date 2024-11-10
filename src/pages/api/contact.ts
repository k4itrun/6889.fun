import { metaConfig } from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';

interface ContactFormRequest {
    name: string;
    email: string;
    message: string;
}

export default (
    request: NextApiRequest, 
    response: NextApiResponse
) => {
    let { name, email, message } = request.body as ContactFormRequest;

    if (!name || !email || !message) {
        response.status(400).json({
            success: true,
            message: "All fields are required",
            data: null
        });
        return;
    }

    let mailTo = metaConfig.email;
    let mailSubject = "Contact Form Submission";

    let mailBody = `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;

    let mailOptions = {
        from: email,
        to: mailTo,
        subject: mailSubject,
        html: mailBody
    }

    response.status(200).json({
        success: true,
        message: "Message sent successfully",
        data: {
            subject: mailSubject,
            body: mailBody
        }
    });
};