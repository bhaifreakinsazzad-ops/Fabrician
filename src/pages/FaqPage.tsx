import { useState } from 'react';

import { Search, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems, faqCategories } from '@/data/faq';

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaq = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <div className="py-12 lg:py-16" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(199,163,106,0.10) 0%, transparent 60%), #FCF8F3' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-display font-semibold mb-3">How Can We Help?</h1>
          <p className="text-muted-foreground mb-6">Find answers to common questions about our products, shipping, and services.</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl h-12"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={activeCategory === cat
                ? { background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)', color: '#1E140A' }
                : {}
              }
              data-inactive={activeCategory !== cat ? 'true' : undefined}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {filteredFaq.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="rounded-2xl bg-card border border-border/50 px-6 data-[state=open]:border-[#C7A36A]/30">
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaq.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No questions found matching your search.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 p-6 lg:p-8 rounded-2xl bg-card border border-border/50">
          <h2 className="text-xl font-semibold mb-4 text-center">Still Have Questions?</h2>
          <p className="text-muted-foreground text-center mb-6">Our team is here to help you with anything you need.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="https://wa.me/8801778307704?text=Hi%2C+I+need+help+with+Fabrician." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(199,163,106,0.12)' }}>
                <MessageCircle className="w-5 h-5" style={{ color: '#C7A36A' }} />
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">9 AM – 9 PM</p>
              </div>
            </a>
            <a href="tel:+8801778307704" className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(199,163,106,0.12)' }}>
                <Phone className="w-5 h-5" style={{ color: '#C7A36A' }} />
              </div>
              <div>
                <p className="font-medium text-sm">Call Us</p>
                <p className="text-xs text-muted-foreground">+88 01778307704</p>
              </div>
            </a>
            <a href="mailto:hello@fabrician.com" className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(199,163,106,0.12)' }}>
                <Mail className="w-5 h-5" style={{ color: '#C7A36A' }} />
              </div>
              <div>
                <p className="font-medium text-sm">Email</p>
                <p className="text-xs text-muted-foreground">hello@fabrician.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
