'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function CurrentReadPage() {
  const [currentBook, setCurrentBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: '',
    audiobook_url: '',
    pdf_url: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

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
            id: data.id,
            title: data.title,
            author: data.author,
            genre: data.genre,
            description: data.description,
            image_url: data.image,
            created_at: data.created_at,
            audiobook_url: data.audiobook_url,
            pdf_url: data.pdf_url,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load current book');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentBook();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const supabase = createClient();
      let imageUrl = '';
      let pdfUrl = '';

      // Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `current-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('book_covers')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const { data } = supabase.storage
          .from('book_covers')
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Upload PDF if provided
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `current-pdf-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('book_covers')
          .upload(fileName, pdfFile);

        if (uploadError) {
          throw new Error(`Failed to upload PDF: ${uploadError.message}`);
        }

        const { data } = supabase.storage
          .from('book_covers')
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }

      // Delete existing current book and insert new one
      if (currentBook?.id) {
        await supabase
          .from('current')
          .delete()
          .eq('id', currentBook.id);
      }

      // Insert new current book
      const { data, error: insertError } = await supabase
        .from('current')
        .insert([
          {
            title: formData.title,
            author: formData.author,
            genre: formData.genre || null,
            description: formData.description,
            image: imageUrl || currentBook?.image_url || null,
            audiobook_url: formData.audiobook_url || null,
            pdf_url: pdfUrl || formData.pdf_url || null,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to save book: ${insertError.message}`);
      }

      setCurrentBook({
        id: data.id,
        title: data.title,
        author: data.author,
        genre: data.genre,
        description: data.description,
        image_url: data.image,
        audiobook_url: data.audiobook_url,
        pdf_url: data.pdf_url,
      });

      setSuccessMessage('Current book updated successfully! 📚');
      setFormData({
        title: '',
        author: '',
        genre: '',
        description: '',
        image: '',
        audiobook_url: '',
        pdf_url: '',
      });
      setImageFile(null);
      setImagePreview(null);
      setPdfFile(null);
      setShowForm(false);

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save book');
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-5xl font-bold mb-4">📖 Current Read</h1>
          <p className="text-xl opacity-90">This month's book selection</p>
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

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-600 font-semibold">Loading current book...</p>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-600 p-6 rounded">
              <p className="text-red-700 font-semibold">⚠️ {error}</p>
            </div>
          ) : currentBook && !showForm ? (
            <>
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  {/* Book Image */}
                  <div className="flex items-center justify-center">
                    {currentBook.image_url ? (
                      <img
                        src={currentBook.image_url}
                        alt={currentBook.title}
                        className="w-full max-w-sm h-96 object-cover rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full max-w-sm h-96 bg-gradient-to-br from-red-200 to-red-100 rounded-lg shadow-lg flex items-center justify-center">
                        <p className="text-gray-500 text-lg">📚 No image available</p>
                      </div>
                    )}
                  </div>

                  {/* Book Details */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-red-600 mb-4">{currentBook.title}</h2>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <p className="text-gray-600 font-semibold">Author</p>
                        <p className="text-xl text-gray-800">{currentBook.author}</p>
                      </div>

                      {currentBook.genre && (
                        <div>
                          <p className="text-gray-600 font-semibold">Genre</p>
                          <p className="text-lg text-gray-800 bg-red-50 inline-block px-4 py-2 rounded-lg">
                            {currentBook.genre}
                          </p>
                        </div>
                      )}
                    </div>

                    {currentBook.description && (
                      <div className="mb-8">
                        <p className="text-gray-600 font-semibold mb-3">About This Book</p>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {currentBook.description}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 mb-8">
                      <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition transform hover:scale-105">
                        Join Discussion
                      </button>
                      <button className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition">
                        Add to My List
                      </button>
                      {currentBook.audiobook_url && (
                        <a
                          href={currentBook.audiobook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
                        >
                          🎧 Listen Audiobook
                        </a>
                      )}
                      {currentBook.pdf_url && (
                        <a
                          href={currentBook.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition transform hover:scale-105"
                        >
                          📄 Read PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  ✎ Update Current Read
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8 mb-8">
              <p className="text-2xl text-gray-600 font-semibold">📭 No current book selected</p>
              <p className="text-gray-500 mt-2">Add one to get started!</p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-6 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  ➕ Add Current Read
                </button>
              )}
            </div>
          )}

          {/* Form Section */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-6">
                {currentBook ? 'Update Current Read' : 'Add Current Read'}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden border-2 border-dashed border-red-300 flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-500 text-lg">📷 No image selected</p>
                          <p className="text-gray-400 text-sm">Upload a book cover</p>
                        </div>
                      )}
                    </div>
                    <label className="mt-4 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition inline-block">
                        Choose Image
                      </span>
                    </label>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Book Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter book title"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Author *</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Enter author name"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white"
                      />
                    </div>

                    {/* Genre */}
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Genre</label>
                      <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white"
                      >
                        <option value="">Select a genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Biography">Biography</option>
                        <option value="History">History</option>
                        <option value="Poetry">Poetry</option>
                        <option value="African Literature">African Literature</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Write about this book..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none text-black bg-white"
                  />
                </div>

                {/* Audiobook URL */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Audiobook URL</label>
                  <input
                    type="url"
                    name="audiobook_url"
                    value={formData.audiobook_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/audiobook"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white"
                  />
                </div>

                {/* PDF Upload */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Book PDF</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfChange}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition"
                    />
                    {pdfFile && (
                      <span className="text-green-600 font-semibold">✓ {pdfFile.name}</span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : '✨ Save Current Read'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white border-t-2 border-red-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-red-600 mb-6">About Our Current Read</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-lg font-bold text-red-600 mb-2">📅 Monthly Selection</p>
              <p className="text-gray-700">We carefully select one book each month to explore as a community.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-lg font-bold text-red-600 mb-2">💬 Group Discussions</p>
              <p className="text-gray-700">Join our weekly discussions to share your thoughts and insights.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <p className="text-lg font-bold text-red-600 mb-2">🌍 African Literature</p>
              <p className="text-gray-700">We prioritize books by African authors and about African stories.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
