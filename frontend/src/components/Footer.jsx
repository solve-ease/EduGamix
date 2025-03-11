import React from 'react';
import { BookOpen, Twitter, Facebook, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-200 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">EduGami</span>
            </div>
            <p className="mb-4">
              Transforming education through AI-powered gamification and real-world career simulations.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Facebook className="w-5 h-5" />} />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
              <SocialIcon icon={<Github className="w-5 h-5" />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <FooterLink text="Features" />
              <FooterLink text="Gamification" />
              <FooterLink text="AI Technology" />
              <FooterLink text="Career Simulations" />
              <FooterLink text="Token Economy" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink text="Documentation" />
              <FooterLink text="Tutorials" />
              <FooterLink text="Blog" />
              <FooterLink text="Careers" />
              <FooterLink text="Support" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink text="About Us" />
              <FooterLink text="Our Team" />
              <FooterLink text="Partners" />
              <FooterLink text="Testimonials" />
              <FooterLink text="Contact Us" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">© 2025 EduGami. All rights reserved.</p>
          <div className="flex space-x-6">
            <FooterLink text="Privacy Policy" size="sm" />
            <FooterLink text="Terms of Service" size="sm" />
            <FooterLink text="Cookie Policy" size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
    {icon}
  </a>
);

const FooterLink = ({ text, size = "base" }) => (
  <li>
    <a href="#" className={`text-${size} hover:text-white transition-colors`}>
      {text}
    </a>
  </li>
);

export default Footer;