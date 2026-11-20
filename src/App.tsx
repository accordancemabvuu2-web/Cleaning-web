import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { CleaningProcess } from './components/CleaningProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export function App() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar onQuoteClick={scrollToContact} />

      <main id="main">
        <Hero onQuoteClick={scrollToContact} />
        <Services onSelectService={handleSelectService} />
        <CleaningProcess onQuoteClick={scrollToContact} />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <FAQ />
        <Contact selectedService={selectedService} />
      </main>

      <Footer onSelectService={handleSelectService} />
      <WhatsAppFloatingButton onQuoteClick={scrollToContact} />
    </div>
  );
}

export default App;
