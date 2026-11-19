import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CleaningProcess } from './components/CleaningProcess';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export function App() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleQuoteClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EC] selection:bg-brand-sage selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onQuoteClick={handleQuoteClick} />

      {/* Main Single Page Sections */}
      <main className="flex-1">
        {/* Section 2: Hero */}
        <Hero onQuoteClick={handleQuoteClick} />

        {/* Section 3: About Us */}
        <About onQuoteClick={handleQuoteClick} />

        {/* Section 4: Cleaning Services */}
        <Services onSelectService={handleSelectService} />

        {/* Section 5: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 6: Our Cleaning Process */}
        <CleaningProcess onQuoteClick={handleQuoteClick} />

        {/* Section 7: Testimonials */}
        <Testimonials />

        {/* Section 8: Frequently Asked Questions */}
        <FAQ />

        {/* Section 9: Contact and Quotation */}
        <Contact selectedService={selectedService} />
      </main>

      {/* Section 10: Footer */}
      <Footer onSelectService={handleSelectService} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton onQuoteClick={handleQuoteClick} />
    </div>
  );
}

export default App;
