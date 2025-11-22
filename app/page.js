import Link from 'next/link';
import { FaPlusCircle } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-black flex flex-col items-center justify-center px-4 py-12">
      <main className="w-full max-w-2xl text-center">
        {/* Logo / Brand */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg">
            <span className="text-2xl font-bold">NB</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
            NotoNotice
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Create professional, print-ready notices in minutes
          </p>
        </div>

        {/* Primary CTA */}
        <Link
          href="/notice/new"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <FaPlusCircle size={20} />
          Create New Notice
        </Link>

        {/* Footer Note */}
        <div className="mt-16 text-xs text-gray-500 dark:text-gray-500">
          <p>Export as PDF or JPG • A4 Print Ready • Noto Notice © {new Date().getFullYear()}</p>
        </div>
      </main>
    </div>
  );
}