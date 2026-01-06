'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function UpdatePage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('title', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
      }

      setBooks(data || []);
      setFilteredBooks(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load books');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleAvailabilityChange = async (bookId: number, currentStatus: boolean) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('books')
        .update({ available: !currentStatus })
        .eq('id', bookId);

      if (error) {
        throw new Error(`Failed to update book: ${error.message}`);
      }

      setBooks(books.map(book =>
        book.id === bookId ? { ...book, avaialable: !currentStatus } : book
      ));
      setFilteredBooks(filteredBooks.map(book =>
        book.id === bookId ? { ...book, available: !currentStatus } : book
      ));

      setSuccessMessage('Book availability updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">📚 Update Book Availability</h1>
          <p className="text-xl opacity-90">Manage and update book shelf status</p>
        </div>
      </section>

      {/* Messages */}
      {successMessage && (
        <section className="bg-green-100 border-b-2 border-green-600 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-green-700 font-semibold">✓ {successMessage}</p>
          </div>
        </section>
      )}

      {error && (
        <section className="bg-red-100 border-b-2 border-red-600 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-red-700 font-semibold">✗ {error}</p>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="🔍 Search by book title or author..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">Loading books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">📭 No books found</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Book Title</th>
                      <th className="px-6 py-4 text-left font-bold">Author</th>
                      <th className="px-6 py-4 text-left font-bold">Status</th>
                      <th className="px-6 py-4 text-left font-bold">Action</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {filteredBooks.map((book, index) => (
                      <tr
                        key={book.id}
                        className={`border-t ${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-red-50 transition`}
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {book.title}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {book.author || 'Unknown Author'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-4 py-2 rounded-full font-semibold text-white ${
                              book.available
                                ? 'bg-green-500'
                                : 'bg-gray-500'
                            }`}
                          >
                            {book.available ? '✓ On Shelf' : '✗ Not Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              handleAvailabilityChange(book.id, book.available)
                            }
                            disabled={editingId !== null && editingId !== book.id}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                              book.available
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {book.available ? 'Mark Unavailable' : 'Mark Available'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t text-gray-700">
                <p>
                  <strong>Total Books:</strong> {filteredBooks.length} of {books.length}
                </p>
                <p>
                  <strong>On Shelf:</strong> {filteredBooks.filter(b => b.on_shelf).length} | 
                  <strong className="ml-4">Not Available:</strong> {filteredBooks.filter(b => !b.on_shelf).length}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
