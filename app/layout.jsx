import './globals.css';
import { ASSISTANT_NAME, PROFILE_IMAGE } from '@/lib/config';

export const metadata = {
  title: `${ASSISTANT_NAME} Assistant`,
  description: `Official ${ASSISTANT_NAME} community assistant`,
  icons: {
    icon: PROFILE_IMAGE,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
