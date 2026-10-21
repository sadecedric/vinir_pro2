import './globals.css';

export const metadata = {
  title: 'VINIR_PRO2 Assistant',
  description: 'Official VINIR_PRO2 community assistant',
  icons: {
    icon: '/vinir.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
