'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentBook = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('current')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw new Error(`Failed to fetch current book: ${error.message}`);
        }

        if (data) {
          setCurrentBook({
            title: data.title,
            author: data.author,
            genre: data.genre,
            description: data.description,
            image: data.image,
            pages: data.pages,
            rating: data.rating || 4.8,
          });
        } else {
          setCurrentBook({
            title: 'Things Fall Apart',
            author: 'Chinua Achebe',
            genre: 'Literary Fiction',
            published: 1958,
            pages: 209,
            rating: 4.8,
            description: 'A powerful novel about pre-colonial African life and the impact of colonization. Join us as we explore themes of tradition, change, and cultural identity.',
            image: '/book-cover.jpg',
          });
        }
      } catch (err) {
        console.error(err);
        setCurrentBook({
          title: 'Things Fall Apart',
          author: 'Chinua Achebe',
          genre: 'Literary Fiction',
          published: 1958,
          pages: 209,
          rating: 4.8,
          description: 'A powerful novel about pre-colonial African life and the impact of colonization. Join us as we explore themes of tradition, change, and cultural identity.',
          image: '/book-cover.jpg',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentBook();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CMU Africa Book Club</h1>
          <ul className="flex gap-8">
            <li><a href="#home" className="hover:opacity-80 transition">Home</a></li>
            <li><a href="#current" className="hover:opacity-80 transition">Current Read</a></li>
            <li><a href="#about" className="hover:opacity-80 transition">About</a></li>
            <li><a href="#contact" className="hover:opacity-80 transition">Contact</a></li>
          </ul>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-red-600 to-red-800 text-white py-24 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4">Welcome to CMU Africa Book Club</h2>
          <p className="text-xl opacity-90">Discover, Read, and Connect Through Stories from Africa</p>
        </div>
      </section>

      {/* Current Read Section */}
      <section id="current" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-red-600 text-center mb-12">Currently Reading</h3>
          
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">Loading current book...</p>
            </div>
          ) : currentBook ? (
            <div className="bg-white rounded-lg shadow-lg p-8 flex gap-8">
              {/* Book Image */}
              <div className="flex-shrink-0">
                <div className="w-64 h-96 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                  <img 
                    src={currentBook.image} 
                    alt={currentBook.title}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/256x384?text=' + currentBook.title;
                    }}
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="flex-1">
                <h4 className="text-3xl font-bold text-red-600 mb-4">{currentBook.title}</h4>
                
                <div className="space-y-3 mb-6 text-gray-700">
                  <p><strong>Author:</strong> {currentBook.author}</p>
                  <p><strong>Genre:</strong> {currentBook.genre}</p>
                </div>

                <div className="bg-gray-50 p-4 border-l-4 border-red-600 rounded mb-6">
                  <p className="text-gray-700">{currentBook.description}</p>
                </div>

                {/* Links to Audiobook and PDF */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {currentBook.audiobook_url && (
                    <a
                      href={currentBook.audiobook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-md"
                    >
                      🎧 Listen Audiobook
                    </a>
                  )}
                  {currentBook.pdf_url && (
                    <a
                      href={currentBook.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition transform hover:-translate-y-1 shadow-md"
                    >
                      📄 Read PDF
                    </a>
                  )}
                </div>

                <div className="flex gap-4">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition transform hover:-translate-y-1 shadow-md">
                    Join Discussion
                  </button>
                  <button className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition transform hover:-translate-y-1">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">No current book selected</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-red-600 mb-6">About Our Club</h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            CMU Africa Book Club is dedicated to celebrating African literature and fostering meaningful discussions about stories that shape our understanding of African cultures, history, and contemporary issues.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-red-600 mb-8">Get In Touch</h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p>📧 Email: bookclub@cmu.edu</p>
            <p>📅 Meeting: Every Saturday at 3 PM</p>
            <p>📍 Location: Student Center, Room 204</p>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}
