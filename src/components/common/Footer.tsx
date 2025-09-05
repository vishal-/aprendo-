import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <div className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Aprendo</div>
            <p className="text-gray-400 text-sm md:text-base">
              Streamlining the testing process for teachers and students worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-400 hover:text-white text-sm md:text-base">About</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white text-sm md:text-base">Contact</Link>
              <Link href="/help" className="block text-gray-400 hover:text-white text-sm md:text-base">Help</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-400 hover:text-white text-sm md:text-base">Privacy Policy</Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white text-sm md:text-base">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Aprendo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}