'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function LibraryPage() {
  const [filterShelf, setFilterShelf] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(`Failed to fetch books: ${error.message}`);
        }

        const booksData = data?.map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre || '',
          onShelf: book.available,
          imageUrl: book.image || '',
          description: book.description,
          pages: book.pages,
          donor: book.donor,
        })) || [];

        setBooks(booksData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load books');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(b => {
    const matchesShelf = filterShelf === 'all' 
      ? true
      : filterShelf === 'on-shelf'
      ? b.onShelf
      : !b.onShelf;

    const matchesSearch = searchQuery === ''
      ? true
      : b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesShelf && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">📚 Book Library</h1>
          <p className="text-xl opacity-90">Explore our collection of {books.length} books</p>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="bg-red-100 border-b-2 border-red-600 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-red-700 font-semibold">⚠️ {error}</p>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      <section className="bg-white border-b-2 border-red-200 sticky top-16 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600 transition text-gray-700"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold text-gray-700">Filter by shelf:</span>
            <button
              onClick={() => setFilterShelf('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterShelf === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Books ({books.length})
            </button>
            <button
              onClick={() => setFilterShelf('on-shelf')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterShelf === 'on-shelf'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              On Shelf ({books.filter(b => b.onShelf).length})
            </button>
            <button
              onClick={() => setFilterShelf('not-on-shelf')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterShelf === 'not-on-shelf'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Not on Shelf ({books.filter(b => !b.onShelf).length})
            </button>
          </div>
        </div>
      </section>

      {/* Bookshelf */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">📚 Loading library...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredBooks.map((book, index) => (
                <div 
                  key={book.id}
                  className="group relative"
                  style={{ animation: `slideUp 0.5s ease-out ${index * 0.05}s both` }}
                >
                  {/* Book Card */}
                  <div className={`relative h-72 rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform group-hover:scale-105 group-hover:shadow-2xl ${
                    book.onShelf 
                      ? 'bg-gradient-to-b from-red-700 via-red-600 to-red-800' 
                      : 'bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 opacity-60'
                  }`}>
                    {/* Book Image if available */}
                    {book.imageUrl ? (
                      <img 
                        src={book.imageUrl} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center p-4 text-center relative z-10">
                        <h3 className="text-white font-bold text-sm leading-tight mb-3 line-clamp-4 group-hover:line-clamp-none">
                          {book.title}
                        </h3>
                        <p className="text-red-100 text-xs opacity-80 line-clamp-2 group-hover:line-clamp-none">
                          {book.author || 'Unknown Author'}
                        </p>
                      </div>
                    )}

                    {/* Status Badge */}
                    {book.onShelf && (
                      <div className="absolute top-2 right-2 bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold">
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Hover Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white p-3 rounded-b-lg shadow-lg opacity-0 group-hover:opacity-100 transition transform translate-y-full group-hover:translate-y-0 z-20">
                    <p className="text-xs text-gray-700 font-semibold">{book.title}</p>
                    <p className="text-xs text-gray-600">{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">📭 No books found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-t-2 border-red-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-red-600">{filteredBooks.length}</h3>
            <p className="text-gray-700 font-semibold mt-2">Results Found</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-600">{books.filter(b => b.onShelf).length}</h3>
            <p className="text-gray-700 font-semibold mt-2">On Shelf</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-gray-600">{books.filter(b => !b.onShelf).length}</h3>
            <p className="text-gray-700 font-semibold mt-2">Not on Shelf</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
