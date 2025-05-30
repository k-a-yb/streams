import React from 'react';

import { ContentItem } from '../lib/api';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  loading?: boolean;
  onItemClick?: (item: ContentItem) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, loading = false, onItemClick }) => {
  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-700 animate-pulse" />
              <div className="p-4">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              onClick={() => onItemClick?.(item)}
            >
              <div className="aspect-video bg-gray-700 relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                  alt={item.title || item.name || 'Content'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.jpg'; // Fallback image
                  }}
                />
                {item.vote_average > 0 && (
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 text-xs rounded">
                    {item.vote_average.toFixed(1)} ★
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 line-clamp-2">{item.title || item.name}</h3>
                <p className="text-sm text-gray-400">
                  {item.release_date || item.first_air_date 
                    ? new Date(item.release_date || item.first_air_date || '').getFullYear()
                    : ''}
                </p>
                {item.isExclusive && (
                  <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full mt-1">
                    Exclusive
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No content available yet</p>
        </div>
      )}
    </section>
  );
};

export default ContentRow;
