import Link from 'next/link';
import { ArrowUpRight, LayoutDashboard, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-900 bg-[#070708] pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col">
            <Link href="/" className="group inline-block mb-4">
              <span className="text-3xl font-serif tracking-[0.25em] text-white uppercase group-hover:text-[#DFC29A] transition-colors">
                MEZZ
              </span>
              <span className="block text-[10px] tracking-[0.4em] text-[#C5A880] uppercase -mt-1 font-sans font-light">
                GROUP
              </span>
            </Link>
            <p className="text-sm text-neutral-400 font-light max-w-sm leading-relaxed mb-6">
              Innovative Melbourne-based architectural & property development studio crafting spaces of enduring contemporary elegance.
            </p>
            <div className="text-xs text-neutral-500">
              Ashburton • Glen Iris • Malvern East • Melbourne VIC
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#DFC29A] font-medium mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Developments
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Mezz Group
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Project Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#DFC29A] font-medium mb-4">
              Key Projects
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/projects/ivori" className="hover:text-white transition-colors">
                  Ivori Townhouses
                </Link>
              </li>
              <li>
                <Link href="/projects/tennyson" className="hover:text-white transition-colors">
                  Tennyson Residence
                </Link>
              </li>
              <li>
                <Link href="/projects/coppin" className="hover:text-white transition-colors">
                  Coppin Heritage Extension
                </Link>
              </li>
              <li>
                <Link href="/projects/tao-dumplings" className="hover:text-white transition-colors">
                  TAO Dumplings Mentone
                </Link>
              </li>
              <li>
                <Link href="/projects/mamamee" className="hover:text-white transition-colors">
                  Ma Ma Mee Werribee
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Management & Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#DFC29A] font-medium mb-4">
              Content Studio
            </h4>
            <div className="space-y-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-[#DFC29A] hover:text-white transition-all w-full justify-center"
              >
                <LayoutDashboard className="w-4 h-4 text-[#C5A880]" />
                <span>Visual CMS Studio</span>
              </Link>
              <div className="text-[11px] text-neutral-500 leading-relaxed">
                Add new projects, modify descriptions, and upload photos with instant live updates.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {currentYear} Mezz Group Pty Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>252 High Street, Ashburton VIC 3147</span>
            <span>•</span>
            <a href="tel:0433124797" className="hover:text-white transition-colors">
              0433 124 797
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
