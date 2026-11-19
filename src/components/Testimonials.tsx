import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../config/testimonials';

export const Testimonials: React.FC = () => {
  if (testimonialsData.length === 0) return null;

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-28 bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#0A2E73] text-xs font-semibold tracking-wider uppercase">
            <span>Projects & Client Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A2E73] tracking-tight font-heading">
            Trusted Care for Every Space
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed">
            We are dedicated to building long-term relationships with builders, developers, and property teams throughout the Toronto area based on consistent excellence.
          </p>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#1348B8] text-[#1348B8]" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-[#DCE8FF]" />
                </div>

                <p className="text-sm sm:text-base text-[#111827] leading-relaxed italic mb-6">
                  &ldquo;{item.feedback}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0A2E73] font-heading">
                    {item.clientName}
                  </h4>
                  <p className="text-xs text-[#4B5563]">
                    {item.clientType} • {item.suburb}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
