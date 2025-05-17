import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <span className="block text-light text-center text-green-900">
          © {new Date().getFullYear()} <a href="/" className="hover:underline">SARS - ФИНКИ</a>. Сите права се задржани.
        </span>
      </div>
    </footer>
  );
}
