'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">📖 About The Page Flippers</h1>
          <p className="text-xl opacity-90">Building Community Through Literature at CMU Africa</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Preamble */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Our Preamble</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              We, the members of The Page Flippers Book Club at Carnegie Mellon University Africa (CMU-Africa), 
              establish this community to create a structured, inclusive, and vibrant environment dedicated to 
              fostering a love of reading, intellectual discussion, and literary outreach. Drawing from our shared 
              goals of promoting literacy, building communal bonds, and extending the joy of books beyond our campus, 
              we ensure fair participation, accountability, and sustainability while remaining adaptable to our 
              evolving needs.
            </p>
          </div>

          {/* Mission & Purpose */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Our Mission & Objectives</h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              The Page Flippers exists to cultivate a culture of reading, critical thinking, and community engagement 
              through literature.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-bold text-red-600 mb-3">📚 Core Objectives</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Encourage reading as a lifelong habit</li>
                  <li>✓ Facilitate monthly discussions on diverse books</li>
                  <li>✓ Maintain accessible on-campus bookshelves</li>
                  <li>✓ Promote literacy through community outreach</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-bold text-red-600 mb-3">🌟 Special Initiatives</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Host author invitations & themed discussions</li>
                  <li>✓ Support book donations to schools & libraries</li>
                  <li>✓ Create club-branded items</li>
                  <li>✓ Promote open-minded book selections</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Membership</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Membership is open to all CMU-Africa students, faculty, and staff who express interest in reading and 
              participating in club activities. <strong>There are no dues required</strong> for membership.
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-600 pl-6 py-2">
                <h3 className="font-bold text-gray-800">Active Members</h3>
                <p className="text-gray-600 text-sm">Attend at least two meetings per semester and contribute to club activities</p>
              </div>
              <div className="border-l-4 border-red-600 pl-6 py-2">
                <h3 className="font-bold text-gray-800">General Members</h3>
                <p className="text-gray-600 text-sm">Join the mailing list or participate less frequently; may vote in elections</p>
              </div>
              <div className="border-l-4 border-red-600 pl-6 py-2">
                <h3 className="font-bold text-gray-800">Honorary Members</h3>
                <p className="text-gray-600 text-sm">Faculty, staff, or external partners invited by the executive team</p>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Leadership Structure</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              The Page Flippers employs a flat, collaborative hierarchy with clear roles while encouraging member input.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">👑 President (Chief Flipper)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Leads the club overall</li>
                  <li>• Chairs meetings and sets agendas</li>
                  <li>• Oversees book acquisitions</li>
                  <li>• Represents club externally</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">🤝 Vice President (Deputy Flipper)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Assists the President</li>
                  <li>• Manages book selections</li>
                  <li>• Schedules discussion dates</li>
                  <li>• Leads in President's absence</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">📢 Public Relations (Page Announcer)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Manages club website & app</li>
                  <li>• Coordinates book donations</li>
                  <li>• Promotes events & partnerships</li>
                  <li>• Designs club-branded items</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">📝 Secretary (Page Recorder)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Maintains meeting minutes</li>
                  <li>• Tracks book inventories</li>
                  <li>• Manages borrowing logs</li>
                  <li>• Organizes club documents</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Values */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-3xl">📖</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Inclusivity</h3>
                  <p className="text-gray-600 text-sm">Open membership with respect for diverse opinions</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🤝</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Community</h3>
                  <p className="text-gray-600 text-sm">Building bonds through shared reading experiences</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">💡</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Critical Thinking</h3>
                  <p className="text-gray-600 text-sm">Facilitating meaningful discussions and analysis</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🌍</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Impact</h3>
                  <p className="text-gray-600 text-sm">Extending literacy beyond campus boundaries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Schedule */}
          <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
            <h2 className="text-3xl font-bold text-red-600 mb-6">📅 Meeting Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Book Discussions</h3>
                <p className="text-gray-700">
                  <strong>First Thursday of each month</strong><br/>
                  Monthly discussions on our current read
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Borrowing Hours</h3>
                <p className="text-gray-700">
                  <strong>Tuesdays & Thursdays</strong><br/>
                  Plus twice-monthly open browsing sessions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Flip Some Pages?</h2>
          <p className="text-lg mb-8 opacity-90">Join our vibrant community of book lovers and book club enthusiasts</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/library"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Library
            </a>
            <a
              href="/current"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Current Read
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
