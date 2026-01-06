'use client';

import { useState } from 'react';

export default function MembersPage() {
  const [leaders] = useState([
    {
      id: 0,
      name: 'Glen Thompson',
      position: 'Faculty Advisor',
      country: 'England',
      flag: '🇬🇧',
      image: '/leaders/faculty-advisor.jpg',
      bio: 'Guiding the book club with academic insight and institutional support.',
      email: 'glent@andrew.cmu.edu',
      isFacultyAdvisor: true,
    },
    {
      id: 1,
      name: 'Obedine Flore Nanga Fobuzie',
      position: 'President',
      country: 'Cameroon',
      flag: '🇨🇲',
      image: '/leaders/president.jpg',
      bio: 'Leading the book club with passion and dedication to African literature.',
      email: 'oflorena@andrew.cmu.edu',
    },
    {
      id: 2,
      name: 'Emmilly Immaculate Namuganga',
      position: 'Vice President',
      country: 'Uganda',
      flag: '🇺🇬',
      image: '/leaders/vice-president.jpg',
      bio: 'Supporting club initiatives and organizing monthly discussions.',
      email: 'enamugan@andrew.cmu.edu',
    },
    {
      id: 3,
      name: 'Dev Rawal',
      position: 'Secretary',
      country: 'Tanzania',
      flag: '🇹🇿',
      image: '/leaders/secretary.jpg',
      bio: 'Managing records and coordinating communication with members.',
      email: 'dprawal@andrew.cmu.edu',
    },
    {
      id: 4,
      name: 'Lisa Gihozo',
      position: 'Public Relations',
      country: 'Rwanda',
      flag: '🇷🇼',
      image: '/leaders/public-relations.jpg',
      bio: 'Building connections and promoting the club across campus.',
      email: 'lisagiho@andrew.cmu.edu',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-red-50 to-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">Leadership Team</h1>
          <p className="text-xl opacity-90">Meet the dedicated members leading CMU Africa Book Club</p>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex justify-center py-8">
        <div className="text-4xl">📚 ✨ 📖</div>
      </div>

      {/* Faculty Advisor Section */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Faculty Advisor</h2>
          <div className="max-w-sm mx-auto">
            {leaders
              .filter((leader) => leader.isFacultyAdvisor)
              .map((leader) => (
                <div
                  key={leader.id}
                  className="group relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-indigo-100 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>

                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform group-hover:-translate-y-3 duration-300 border-2 border-blue-100">
                    {/* Image Container */}
                    <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-50 overflow-hidden relative">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/300x256?text=${leader.name}`;
                        }}
                      />
                      {/* Country Flag Badge */}
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg text-3xl ring-2 ring-blue-300 group-hover:scale-125 transition duration-300">
                        {leader.flag}
                      </div>
                      {/* Decorative corner accent */}
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400 to-transparent opacity-20 rounded-tr-full"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-blue-600 font-bold mb-1 text-lg">{leader.position}</p>
                      <p className="text-gray-600 text-sm mb-4 font-semibold flex items-center gap-1">
                        <span>{leader.flag}</span> {leader.country}
                      </p>
                      <p className="text-gray-700 text-sm mb-5 italic">{leader.bio}</p>

                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-block text-blue-600 hover:text-blue-700 font-bold transition transform hover:scale-105 hover:underline"
                      >
                        📧 {leader.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Executive Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders
              .filter((leader) => !leader.isFacultyAdvisor)
              .map((leader, index) => (
                <div 
                  key={leader.id} 
                  className="group relative"
                  style={{ animation: `slideUp 0.6s ease-out ${index * 0.1}s both` }}
                >
                  {/* Decorative background blob */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-red-200 to-red-100 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform group-hover:-translate-y-3 duration-300 border-2 border-red-100">
                    {/* Image Container */}
                    <div className="w-full h-64 bg-gradient-to-br from-red-100 to-red-50 overflow-hidden relative">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/300x256?text=${leader.name}`;
                        }}
                      />
                      {/* Country Flag Badge */}
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg text-3xl ring-2 ring-red-300 group-hover:scale-125 transition duration-300">
                        {leader.flag}
                      </div>
                      {/* Decorative corner accent */}
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-red-400 to-transparent opacity-20 rounded-tr-full"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-red-500 font-bold mb-1 text-lg">{leader.position}</p>
                      <p className="text-gray-600 text-sm mb-4 font-semibold flex items-center gap-1">
                        <span>{leader.flag}</span> {leader.country}
                      </p>
                      <p className="text-gray-700 text-sm mb-5 italic">{leader.bio}</p>
                      
                      <a 
                        href={`mailto:${leader.email}`}
                        className="inline-block text-red-600 hover:text-red-700 font-bold transition transform hover:scale-105 hover:underline"
                      >
                        📧 {leader.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex justify-center py-8">
        <div className="text-4xl">✨ 📖 ✨</div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-20 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-5 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Interested in Joining Leadership?</h2>
          <p className="text-lg mb-6 opacity-90">We're always looking for passionate members to join our team!</p>
          <button className="bg-red-700 hover:bg-red-800 px-8 py-3 rounded-lg text-white font-semibold transition transform hover:scale-110 hover:shadow-xl active:scale-95 duration-200">
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
}
