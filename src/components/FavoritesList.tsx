"use client";

import { Heart, Copy, Trash2, BookmarkX } from "lucide-react";
import type { Quote } from "@/data/quotes";

interface FavoritesListProps {
  favorites: Quote[];
  onRemoveFavorite: (id: number) => void;
  onCopy: (quote: Quote) => void;
}

export function FavoritesList({
  favorites,
  onRemoveFavorite,
  onCopy,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="quote-card text-center py-12 animate-fade-in">
        <BookmarkX size={48} className="mx-auto text-muted mb-4" />
        <h3 className="text-xl font-medium text-foreground mb-2">
          No favorites yet
        </h3>
        <p className="text-muted">
          Click the heart icon on a quote to save it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((quote, index) => (
        <div
          key={quote.id}
          className="quote-card animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-4">
            <Heart
              size={20}
              className="text-accent-pink flex-shrink-0 mt-1"
              fill="currentColor"
            />
            <div className="flex-1 min-w-0">
              <blockquote className="text-lg text-foreground mb-2">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <p className="text-muted text-sm">
                &mdash; {quote.author}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-card-border">
            <button
              onClick={() => onCopy(quote)}
              className="icon-btn"
              aria-label="Copy quote to clipboard"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={() => onRemoveFavorite(quote.id)}
              className="icon-btn hover:!border-red-500 hover:!text-red-500"
              aria-label="Remove from favorites"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
