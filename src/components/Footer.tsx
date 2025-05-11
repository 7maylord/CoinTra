'use client';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t text-center">
      <p className="text-gray-300 text-sm">
        Created by{' '}
        <a
          href="https://github.com/7maylord"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-all font-semibold"
        >
          Maylord
        </a>
      </p>
    </footer>
  );
}