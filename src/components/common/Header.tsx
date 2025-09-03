import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-gray-900 border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
            Aprendo
          </Link>
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link href="/auth" className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-secondary text-sm md:text-base">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
