import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>

        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
          <p className="text-indigo-200 mb-8">
            Join thousands of students who are already experiencing the future of education. 
            Get started with a free account today and see the difference for yourself.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border border-indigo-400 px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors"
            >
              Book a Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;