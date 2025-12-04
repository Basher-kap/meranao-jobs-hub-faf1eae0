import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-maroon-deep border-t border-gold-warm/20">
      {/* Decorative Okir pattern top border */}
      <div className="h-2 bg-gradient-gold" />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-display font-bold text-maroon-deep text-xl">M</span>
              </div>
              <div>
                <h3 className="font-display text-gold-bright text-xl font-semibold">MSU JobApp</h3>
                <p className="text-gold-muted/80 text-xs tracking-widest uppercase">Part-Time Portal</p>
              </div>
            </div>
            <p className="text-gold-muted/70 text-sm leading-relaxed">
              Connecting MSU students with quality part-time opportunities. 
              Empowering careers through Maranao excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-bright font-semibold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {["Find Jobs", "Post a Job", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-gold-muted/70 hover:text-gold-bright transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold-bright font-semibold mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gold-muted/70 text-sm">
                <MapPin className="w-4 h-4 text-gold-warm" />
                <span>MSU Campus, Marawi City</span>
              </li>
              <li className="flex items-center gap-3 text-gold-muted/70 text-sm">
                <Phone className="w-4 h-4 text-gold-warm" />
                <span>+63 912 345 6789</span>
              </li>
              <li className="flex items-center gap-3 text-gold-muted/70 text-sm">
                <Mail className="w-4 h-4 text-gold-warm" />
                <span>jobs@msu.edu.ph</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-gold-bright font-semibold mb-4 tracking-wide">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold-warm/30 flex items-center justify-center text-gold-muted hover:text-gold-bright hover:border-gold-warm hover:bg-gold-warm/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold-warm/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gold-muted/60 text-sm text-center md:text-left">
            © 2024 MSU Part-Time JobApp. All rights reserved.
          </p>
          <p className="text-gold-muted/60 text-xs text-center italic">
            Inspired by the rich heritage of Maranao Okir artistry
          </p>
        </div>
      </div>
    </footer>
  );
}
