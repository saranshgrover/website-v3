import DraftModeToggler from '@/components/DraftModeToggler';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { draftMode } from 'next/headers';
import { toNextMetadata } from 'react-datocms';
import { ThemeProvider } from '@/components/ThemeProvider';

import './global.css';
import { ThemeToggle } from '@/components/ThemeToggle';

const query = graphql(
  /* GraphQL */ `
    query query {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

export async function generateMetadata() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const data = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  return toNextMetadata(data._site.faviconMetaTags);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center justify-between py-6">
                <h1 className="text-xl font-bold">DatoCMS + Next.js Starter Kit</h1>
                <nav className="flex items-center gap-4">
                  <ThemeToggle />
                  <a 
                    className="text-sm font-medium hover:text-primary transition-colors"
                    href="https://www.datocms.com/docs/next-js"
                  >
                    📚 Full Integration Guide
                  </a>
                  <a 
                    className="text-sm font-medium hover:text-primary transition-colors"
                    href="/basic-template"
                  >
                    🔧 Basic Route
                  </a>
                  <a 
                    className="text-sm font-medium hover:text-primary transition-colors"
                    href="/real-time-updates"
                  >
                    ⚡️ Real-time Updates Route
                  </a>
                </nav>
                <DraftModeToggler draftModeEnabled={draftMode().isEnabled} />
              </div>
            </header>
            <main className="container flex-1 py-6">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
