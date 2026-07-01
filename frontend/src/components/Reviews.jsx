import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquare } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        const data = await response.json();
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate reviews every 8 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews, activeIndex]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
        <span>Carregando avaliações...</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show the section if no reviews are loaded
  }

  return (
    <section id="depoimentos" className="relative pt-8 pb-20 lg:pt-10 bg-dark-card/20 border-y border-dark-border/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <MessageSquare className="w-4 h-4" />
            <span>Avaliações Reais do Google Meu Negócio</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Quem fez, <span className="text-primary glow-text-primary">Aprova e Recomenda!</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl max-w-5xl mx-auto min-h-[300px] flex flex-col justify-between overflow-hidden">
          {/* Quote icon background ornament */}
          <Quote className="absolute -top-4 -left-4 w-32 h-32 text-white/[0.02] transform -rotate-12 pointer-events-none" />

          {/* Testimonial Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {[reviews[activeIndex], reviews[(activeIndex + 1) % reviews.length]].map((review, idx) => (
              <div key={idx} className={`space-y-6 flex flex-col justify-between ${idx === 1 ? 'hidden lg:flex' : 'flex'}`}>
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed italic mx-auto text-center">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Profile */}
                <div className="flex items-center justify-center gap-3.5 pt-4">
                  <img 
                    src={review.profile_photo_url} 
                    alt={review.author_name} 
                    className="w-14 h-14 rounded-full border border-primary/20 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-lg font-bold text-white tracking-wide">{review.author_name}</p>
                    <p className="text-xs text-slate-500 font-semibold">{review.relative_time_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-dark-border/40 relative z-10">
            <button 
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-dark-card border border-dark-border text-slate-400 hover:text-white hover:border-slate-500 hover:bg-dark-card/90 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Indicator dots */}
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex 
                      ? 'w-6 bg-primary' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                ></button>
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2.5 rounded-full bg-dark-card border border-dark-border text-slate-400 hover:text-white hover:border-slate-500 hover:bg-dark-card/90 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Reviews;
