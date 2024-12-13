import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    caption: "Track your expenses easily"
  },
  {
    url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
    caption: "Manage your budget"
  },
  {
    url: "https://images.unsplash.com/photo-1579621970795-87facc2f976d",
    caption: "Visualize your spending habits"
  }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 h-full w-full transition-transform duration-500 ease-in-out ${
            index === current ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <img
            src={image.url}
            alt={image.caption}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-4 text-white">
            <p className="text-center">{image.caption}</p>
          </div>
        </div>
      ))}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 hover:bg-white"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}