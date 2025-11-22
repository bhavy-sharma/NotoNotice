import Link from 'next/link';
import { FaFileSignature, FaHistory, FaPlusCircle } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center justify-center px-4 py-12">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-2xl font-bold text-white drop-shadow">NotoNotice</h1>
          <p className="text-blue-100 text-sm mt-1">Create, preview & export professional notices</p>
        </div>

        {/* Actions */}
        <div className="p-6 space-y-4">
          <Link
            href="/notice/new"
            className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors w-full"
          >
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-600 dark:text-blue-300">
              <FaPlusCircle size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Create New Notice</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start from scratch with logo, blocks & signature</p>
            </div>
          </Link>

          <Link
            href="/saved"
            className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors w-full"
          >
            <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full text-gray-700 dark:text-gray-300">
              <FaHistory size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Saved Notices</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Edit, duplicate or download your drafts</p>
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <div className="px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-500 border-t border-zinc-200 dark:border-zinc-800">
          Export as PDF or JPG • A4 Print Ready • Bhia Yukta © {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
}