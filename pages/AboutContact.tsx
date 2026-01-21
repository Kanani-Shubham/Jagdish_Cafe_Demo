
import React, { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const AboutContact: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    gsap.from(".story-anim", {
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="pb-24">
      {/* Story Section */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
           <div className="absolute -inset-4 bg-amber-400/5 blur-[100px] rounded-full pointer-events-none"></div>
           <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square relative">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Story" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-12">
                 <div>
                    <p className="text-amber-400 font-bold mb-2">Est. 1994</p>
                    <h3 className="text-3xl font-bold">A Culinary Landmark</h3>
                 </div>
              </div>
           </div>
        </div>

        <div>
          <span className="story-anim inline-block text-amber-400 font-bold uppercase tracking-widest text-sm mb-4">Our Story</span>
          <h2 className="story-anim text-5xl md:text-6xl font-bold mb-8">Crafting Memories <br /><span className="text-amber-400 font-serif italic">For Decades</span></h2>
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
            <p className="story-anim">
              From our family to yours, Jagdish Cafe has been a culinary landmark since 1994. Rooted in tradition, we craft experiences where heritage recipes meet modern elegance.
            </p>
            <p className="story-anim">
              Every dish is a testament to our commitment to quality, ambiance, and the art of fine dining. We source our ingredients from local artisans to ensure every bite tells a story of freshness and passion.
            </p>
          </div>
          <div className="story-anim flex gap-8 mt-12">
            <div>
              <p className="text-3xl font-bold text-white mb-1">30+</p>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Years of Craft</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">50k+</p>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Happy Diners</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">12</p>
              <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Master Chefs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-900/50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="glass p-10 lg:p-14 rounded-[3rem]">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-400 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-400 outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-amber-400 text-black py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/10 group">
                Send Message <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Our Location</h4>
                    <p className="text-neutral-500">123 Culinary Boulevard, Heritage Square, Downtown District, Cityville, CP 40012</p>
                 </div>
              </div>

              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center shrink-0 text-amber-400">
                    <Phone />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Call Us</h4>
                    <p className="text-neutral-500">+91 98765 43210 <br /> +022 1234 5678</p>
                 </div>
              </div>

              <div className="flex gap-6 items-start">
                 <div className="w-14 h-14 bg-amber-400/10 rounded-2xl flex items-center justify-center shrink-0 text-amber-400">
                    <Mail />
                 </div>
                 <div>
                    <h4 className="text-xl font-bold mb-2">Email Us</h4>
                    <p className="text-neutral-500">hello@jagdishcafe.com <br /> reservations@jagdishcafe.com</p>
                 </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
              <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-all"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Simulation */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
         <div className="h-96 w-full glass rounded-[3rem] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop" 
              alt="Map" 
              className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="glass p-8 rounded-full shadow-2xl animate-pulse">
                  <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black">
                     <MapPin fill="black" />
                  </div>
               </div>
            </div>
            <div className="absolute bottom-10 left-10 glass px-6 py-4 rounded-2xl">
               <p className="text-sm font-bold">Jagdish Cafe - City Branch</p>
               <p className="text-xs text-neutral-400">Open until 11:30 PM</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutContact;
