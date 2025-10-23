// Ambient declarations to help TypeScript in this workspace
declare module '@react-email/components';
declare module '@/lib/dbConnect';
declare module '@/Model/User';
declare module '@/emails/verificationEmail';

// Provide a permissive JSX.IntrinsicElements so JSX in emails compiles
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

export {};
