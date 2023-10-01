import { ThemeProvider } from "../components/ThemeProvider";
import NavBar from "../components/NavBar";
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
