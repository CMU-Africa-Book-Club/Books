'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">CMU Africa Book Club</h3>
            <p className="text-red-100 text-sm">
              Celebrating African literature and fostering meaningful discussions about stories that shape our understanding of African cultures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-red-100">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/library" className="hover:text-white transition">Library</a></li>
              <li><a href="/current" className="hover:text-white transition">Current Read</a></li>
              <li><a href="/members" className="hover:text-white transition">Leadership</a></li>
              <li><a href="/addbook" className="hover:text-white transition">Add Book</a></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="space-y-3">
              <p className="text-red-100 text-sm">📧 Email: bookclub@cmu.edu</p>
              <p className="text-red-100 text-sm">📅 Meeting: Every Saturday at 3 PM</p>
              <p className="text-red-100 text-sm">📍 Student Center, Room 204</p>
              
              {/* WhatsApp Group Link */}
              <a
                href="https://chat.whatsapp.com/HgEi04TCqSzLObYOpopTNz?mode=hqrt1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold mt-4"
              >
                <span>💬</span> Join WhatsApp Group
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-red-100 text-sm">
              &copy; {currentYear} CMU Africa Book Club. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-200 transition text-2xl"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-200 transition text-2xl"
                title="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-200 transition text-2xl"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-200 transition text-2xl"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
