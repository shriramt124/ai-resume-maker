import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ProfessionalTestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "ResumeAI transformed my job search. The AI suggestions helped me highlight my achievements perfectly. Landed my dream job at Google!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The templates are not just beautiful, they're ATS-friendly too. Got more interviews in two weeks than I did in months.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "As a designer, I'm impressed by the aesthetic and functionality. Created a stunning resume that perfectly showcases my portfolio.",
      rating: 5
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      company: "Amazon",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      text: "The AI-powered suggestions helped me highlight my achievements in a way that really resonates with recruiters. Highly recommended!",
      rating: 5
    }
  ];

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Auto-rotate testimonials only on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentTestimonial, isMobile]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Render a single testimonial card
  const renderTestimonialCard = (testimonial, index) => {
    return (
      <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gray-800 px-1 py-0.5 rounded-full border border-gray-700">
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>
        <p className="text-gray-300 italic flex-grow">
          "{testimonial.text}"
        </p>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with ResumeAI
          </p>
        </div>

        {/* Grid layout for tablet and desktop */}
        <div className="hidden md:block max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              renderTestimonialCard(testimonial, index)
            ))}
          </div>
        </div>

        {/* Carousel for mobile */}
        <div className="md:hidden max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <div className="flex flex-col gap-8 items-center">
              {/* Testimonial Image */}
              <div>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 mx-auto">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
                    <div className="flex">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <p className="text-lg text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <h4 className="font-bold text-xl">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-400">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls for mobile */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-blue-500' : 'bg-gray-700'}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
            
            <button 
              onClick={nextTestimonial}
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalTestimonialsSection;