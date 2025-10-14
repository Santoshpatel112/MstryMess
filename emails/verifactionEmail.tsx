import React from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
}


export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <div style={{ fontFamily: 'Roboto, Verdana, sans-serif', color: '#111', lineHeight: 1.5 }}>
      <h2 style={{ marginBottom: 8 }}>Hello {username},</h2>

      <p style={{ marginTop: 0 }}>
        Thank you for registering. Please use the following verification code to complete your registration:
      </p>

      <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>{otp}</p>

      <p>If you did not request this code, please ignore this email.</p>

      <a
        href={`http://localhost:3000/verify/${username}`}
        style={{ display: 'inline-block', padding: '10px 16px', background: '#61dafb', color: '#000', textDecoration: 'none', borderRadius: 6 }}
      >
        Verify here
      </a>
    </div>
  );
}