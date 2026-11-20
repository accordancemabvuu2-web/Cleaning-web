import { Quote, Star } from 'lucide-react';
import { testimonialsData } from '../config/testimonials';
import { Container } from './ui/Container';
import { Reveal } from './ui/Reveal';
import { SectionIntro } from './ui/SectionIntro';

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
    {Array.from({ length: rating }).map((_, index) => (
      <Star key={index} className="h-3.5 w-3.5 fill-azure text-azure" aria-hidden="true" />
    ))}
  </div>
);

export const Testimonials = () => {
  if (testimonialsData.length === 0) return null;

  const [featured, ...rest] = testimonialsData;

  return (
    <section id="projects" className="bg-ivory py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionIntro
          label="Client feedback"
          title="Trusted Care for Every Space"
          description="We are dedicated to building long-term relationships with builders, developers, and property teams throughout the Toronto area based on consistent excellence."
        />

        <div className="mt-9 grid grid-cols-1 gap-8 lg:mt-11 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <figure className="border-t-2 border-navy pt-6">
              <Quote className="h-6 w-6 text-azure/25" aria-hidden="true" />
              <blockquote className="mt-3 max-w-[44ch] text-[19px] font-medium leading-[1.5] text-navy sm:text-[23px]">
                {featured.feedback}
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Stars rating={featured.rating} />
                <span className="text-[13.5px] font-bold text-navy">{featured.clientName}</span>
                <span className="text-[12.5px] text-muted">
                  {featured.clientType}, {featured.suburb}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {rest.length > 0 ? (
            <Reveal className="lg:col-span-5" delay={80}>
              <div className="divide-y divide-navy/10 border-y border-navy/10 lg:border-t-0">
                {rest.map((item) => (
                  <figure key={item.id} className="py-5">
                    <Stars rating={item.rating} />
                    <blockquote className="mt-2.5 text-[14px] leading-[1.7] text-ink">{item.feedback}</blockquote>
                    <figcaption className="mt-3 text-[12.5px] text-muted">
                      <span className="font-bold text-navy">{item.clientName}</span>
                      {', '}
                      {item.clientType}, {item.suburb}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
};
