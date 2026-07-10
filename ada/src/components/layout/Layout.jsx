import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="grain" />
      <Navbar />
      <main className="flex-1 pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
