import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Adarsh Maurya",
      role: "Computer Science Student",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyQgVCFDf5qY8YiV95hSnDFkFQobhAAVNEQ&s",
      content: "EduGami completely transformed how I approach learning. The gamification elements make studying addictive, and the AI-powered interview simulations prepared me for my internship interviews better than anything else could have.",
      rating: 5
    },
    {
      id: 2,
      name: "Anabelle",
      role: "Data Science Graduate",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyQgVCFDf5qY8YiV95hSnDFkFQobhAAVNEQ&s",
      content: "The reinforcement learning system is incredible. It somehow knows exactly when to challenge me and when to let me practice more. I've improved my coding skills faster than I thought possible.",
      rating: 5
    },
    {
      id: 3,
      name: "Aman Singh",
      role: "Bootcamp Graduate",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyQgVCFDf5qY8YiV95hSnDFkFQobhAAVNEQ&s",
      content: "The token economy made learning feel like a game, but the career simulations made me job-ready. I landed a frontend developer position after just 6 months on the platform!",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">What Our Students Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from the students who have transformed their learning journey with EduGami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h3 className="font-semibold text-indigo-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i + testimonial.rating} className="w-5 h-5 text-gray-300" />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;