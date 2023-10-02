import { ThemeProvider } from "../components/ThemeProvider.jsx";
import NavBar from "../components/NavBar.jsx";
import Providers from "../components/Providers";

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
