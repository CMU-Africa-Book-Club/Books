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
            audiobook_url: data.audiobook_url,
            pdf_url: data.pdf_url,
          });
        } else {
          setCurrentBook({
            title: 'Things Fall Apart',
            author: 'Chinua Achebe',
            genre: 'Literary Fiction',
            pages: 209,
            rating: 4.8,
            description:
              'A powerful novel about pre-colonial African life and the impact of colonization. Join us as we explore themes of tradition, change, and cultural identity.',
            image: '/book-cover.jpg',
          });
        }
      } catch (err) {
        console.error(err);
        setCurrentBook({
          title: 'Things Fall Apart',
          author: 'Chinua Achebe',
          genre: 'Literary Fiction',
          pages: 209,
          rating: 4.8,
          description:
            'A powerful novel about pre-colonial African life and the impact of colonization. Join us as we explore themes of tradition, change, and cultural identity.',
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
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 sm:py-24 text-center"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Welcome to CMU Africa Book Club
          </h2>
          <p className="text-base sm:text-xl opacity-90">
            Discover, Read, and Connect Through Stories from Around the World
          </p>
        </div>
      </section>

      {/* Current Read Section */}
      <section id="current" className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-bold text-red-600 text-center mb-10 sm:mb-12">
            Currently Reading
          </h3>

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-xl sm:text-2xl text-gray-600 font-semibold">
                Loading current book...
              </p>
            </div>
          ) : currentBook ? (
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              {/* Book Image */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-48 sm:w-56 md:w-64 h-72 sm:h-80 md:h-96 bg-gray-300 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={currentBook.image}
                    alt={currentBook.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://via.placeholder.com/256x384?text=' +
                        currentBook.title;
                    }}
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
                  {currentBook.title}
                </h4>

                <div className="space-y-2 mb-6 text-gray-700">
                  <p>
                    <strong>Author:</strong> {currentBook.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {currentBook.genre}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 border-l-4 border-red-600 rounded mb-6 text-left">
                  <p className="text-gray-700">{currentBook.description}</p>
                </div>

                {/* Resource Links */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
                  {currentBook.audiobook_url && (
                    <a
                      href={currentBook.audiobook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md text-center w-full sm:w-auto"
                    >
                      🎧 Listen Audiobook
                    </a>
                  )}
                  {currentBook.pdf_url && (
                    <a
                      href={currentBook.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md text-center w-full sm:w-auto"
                    >
                      📄 Read PDF
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-md w-full sm:w-auto">
                    Join Discussion
                  </button>
                  <button className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-600 hover:text-white transition w-full sm:w-auto">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl sm:text-2xl text-gray-600 font-semibold">
                No current book selected
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
