# Mystery Message

A Next.js application for anonymous messaging with user authentication and email verification.

## Features

- User authentication with NextAuth.js
- Email verification system
- Anonymous messaging
- MongoDB database integration
- Responsive UI with Tailwind CSS
- Type-safe with TypeScript and Zod validation

## Tech Stack

- **Framework:** Next.js 15.5.5 (App Router)
- **Authentication:** NextAuth.js
- **Database:** MongoDB with Mongoose
- **Email:** Resend
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Resend account for email sending

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mystrymess
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── sign-in/          # Sign-in page
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/ # NextAuth configuration
│   │   └── sign-up/           # Sign-up API route
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── context/
│   └── AuthProvider.tsx       # NextAuth session provider
├── helper/
│   └── sendVerificationEmail.ts # Email sending helper
├── lib/
│   ├── dbConnect.ts           # MongoDB connection
│   └── resend.ts              # Resend configuration
├── Model/
│   └── User.ts                # User model
├── schemas/
│   ├── SigninSchema.ts        # Sign-in validation
│   ├── SignupSchema.ts        # Sign-up validation
│   └── verifySchema.ts        # Verification validation
├── types/
│   ├── ApiResponse.ts         # API response types
│   ├── next-auth.d.ts         # NextAuth type extensions
│   └── decls.d.ts             # Module declarations
└── middleware.ts              # Route protection middleware
```

## API Routes

- `POST /api/sign-up` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth authentication
- `GET /api/auth/[...nextauth]` - NextAuth session

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Application URL |
| `RESEND_API_KEY` | Resend API key for emails |

## Authentication Flow

1. User signs up with username, email, and password
2. System sends verification email with OTP
3. User verifies email with OTP
4. User can sign in with verified credentials
5. Protected routes require authentication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
