"use client";

import { Heart, Copy, RefreshCw } from "lucide-react";
import type { Quote } from "@/data/quotes";

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onCopy: () => void;
  onNewQuote: () => void;
  isLoading: boolean;
}

export function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onNewQuote,
  isLoading,
}: QuoteCardProps) {
  return (
    <div className="quote-card gradient-border animate-fade-in" key={quote.id}>
      <div className="relative z-10">
        <div className="mb-6">
          <span className="gradient-text text-4xl font-serif">&ldquo;</span>
        </div>

        <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground mb-6">
          {quote.text}
        </blockquote>

        <p className="text-muted text-lg">
          &mdash; {quote.author}
        </p>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-card-border">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleFavorite}
              className={`icon-btn ${isFavorite ? "active" : ""}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={18}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>

            <button
              onClick={onCopy}
              className="icon-btn"
              aria-label="Copy quote to clipboard"
            >
              <Copy size={18} />
            </button>
          </div>

          <button
            onClick={onNewQuote}
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw
              size={18}
              className={isLoading ? "animate-spin-slow" : ""}
            />
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}
