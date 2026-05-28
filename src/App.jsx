import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { Hero } from './components/hero/Hero';
import { FounderSection } from './components/founder/FounderSection';
import { ServicesSection } from './components/services/ServicesSection';
import { GallerySection } from './components/gallery/GallerySection';
import { ContactSection } from './components/contact/ContactSection';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FounderSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
