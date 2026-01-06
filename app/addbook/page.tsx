'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    pages: '',
    description: '',
    donor: '',
    imageUrl: '',
    onShelf: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const supabase = createClient();
      let imageUrl = '';

      // Upload image to Supabase storage if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('book_covers')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        // Get public URL for the uploaded image
        const { data } = supabase.storage
          .from('book_covers')
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      }

      // Insert book data into books table
      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            title: formData.title,
            author: formData.author,
            genre: formData.genre || null,
            pages: formData.pages ? parseInt(formData.pages) : null,
            description: formData.description,
            donor: formData.donor || null,
            image: imageUrl,
            available: formData.onShelf,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        throw new Error(`Failed to add book: ${error.message}`);
      }

      setSuccessMessage('Book added successfully! 📚');
      setFormData({
        title: '',
        author: '',
        genre: '',
        pages: '',
        description: '',
        donor: '',
        imageUrl: '',
        onShelf: true,
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to add book. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
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
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">➕ Add a New Book</h1>
          <p className="text-xl opacity-90">Share a new book with our community</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 rounded text-green-700 font-semibold">
                ✓ {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 rounded text-red-700 font-semibold">
                ✗ {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload Section */}
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white placeholder:text-black-500"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white placeholder:text-black-500"
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
                      <option value="Self-Help">Self-Help</option>
                      <option value="African Literature">African Literature</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Pages */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Number of Pages</label>
                    <input
                      type="number"
                      name="pages"
                      value={formData.pages}
                      onChange={handleInputChange}
                      placeholder="e.g., 300"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white placeholder:text-black-500"
                    />
                  </div>

                  {/* Donor */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Book Donor</label>
                    <input
                      type="text"
                      name="donor"
                      value={formData.donor}
                      onChange={handleInputChange}
                      placeholder="Who donated this book?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition text-black bg-white placeholder:text-black-500"
                    />
                  </div>

                  {/* On Shelf Toggle */}
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <input
                      type="checkbox"
                      name="onShelf"
                      id="onShelf"
                      checked={formData.onShelf}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-red-600 cursor-pointer"
                    />
                    <label htmlFor="onShelf" className="text-gray-700 font-semibold cursor-pointer flex-1">
                      📚 Book is on shelf
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Book Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a brief description of the book..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 transition resize-none text-black bg-white placeholder:text-black-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 justify-end">
                <button
                  type="reset"
                  className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Adding Book...' : '✨ Add Book'}
                </button>
              </div>
            </form>
          </div>

          {/* Helper Text */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
            <h3 className="text-blue-900 font-bold mb-3">💡 Tips for adding books:</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>✓ Make sure the book title is accurate and complete</li>
              <li>✓ Include all author names if there are multiple authors</li>
              <li>✓ A clear, high-quality book cover image works best</li>
              <li>✓ Write a compelling description to help others decide to read</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
