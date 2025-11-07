import '../styles/globals.css';
import ThemeToggle from '../components/ThemeToggle';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow">
          <h1 className="text-xl font-bold">AI Note-Taking App</h1>
          <ThemeToggle />
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
