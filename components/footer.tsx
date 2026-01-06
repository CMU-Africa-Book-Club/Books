'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-red-100 text-sm leading-relaxed">
              Celebrating literature and fostering meaningful discussions about stories that shape our understanding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-red-100">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/library" className="hover:text-white transition">Library</a></li>
              <li><a href="/current" className="hover:text-white transition">Current Read</a></li>
              <li><a href="/members" className="hover:text-white transition">Leadership</a></li>
              <li><a href="/about" className="hover:text-white transition">About Club</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-red-100 text-sm">
              &copy; {currentYear} The Page Flippers Book Club. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-6">
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
