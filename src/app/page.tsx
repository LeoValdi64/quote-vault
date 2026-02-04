"use client";

import { useState, useCallback, useEffect } from "react";
import { Sparkles, Heart, BookMarked } from "lucide-react";
import { quotes, type Quote } from "@/data/quotes";
import { QuoteCard } from "@/components/QuoteCard";
import { FavoritesList } from "@/components/FavoritesList";
import { Toast } from "@/components/Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Tab = "discover" | "favorites";

function getRandomQuote(excludeId?: number): Quote {
  const availableQuotes = excludeId
    ? quotes.filter((q) => q.id !== excludeId)
    : quotes;
  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  return availableQuotes[randomIndex];
}

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(() => getRandomQuote());
  const [favorites, setFavorites, favoritesLoaded] = useLocalStorage<Quote[]>(
    "quote-vault-favorites",
    []
  );
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const isFavorite = favorites.some((f) => f.id === currentQuote.id);

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  const handleNewQuote = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote(currentQuote.id));
      setIsLoading(false);
    }, 300);
  }, [currentQuote.id]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      setFavorites((prev) => prev.filter((f) => f.id !== currentQuote.id));
      showToast("Removed from favorites");
    } else {
      setFavorites((prev) => [...prev, currentQuote]);
      showToast("Added to favorites");
    }
  }, [currentQuote, isFavorite, setFavorites, showToast]);

  const handleRemoveFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      showToast("Removed from favorites");
    },
    [setFavorites, showToast]
  );

  const handleCopy = useCallback(
    async (quote: Quote = currentQuote) => {
      const text = `"${quote.text}" — ${quote.author}`;
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied to clipboard");
      } catch {
        showToast("Failed to copy");
      }
    },
    [currentQuote, showToast]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && activeTab === "discover") {
        e.preventDefault();
        handleNewQuote();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, handleNewQuote]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-accent-purple" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              QuoteVault
            </h1>
          </div>
          <p className="text-muted">
            Discover inspiration, one quote at a time
          </p>
        </header>

        <nav className="flex justify-center gap-2 mb-8 p-1 bg-card-bg rounded-lg border border-card-border">
          <button
            onClick={() => setActiveTab("discover")}
            className={`tab flex items-center gap-2 ${
              activeTab === "discover" ? "active" : ""
            }`}
          >
            <BookMarked size={18} />
            Discover
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`tab flex items-center gap-2 ${
              activeTab === "favorites" ? "active" : ""
            }`}
          >
            <Heart size={18} />
            Favorites
            {favoritesLoaded && favorites.length > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-accent-purple text-white">
                {favorites.length}
              </span>
            )}
          </button>
        </nav>

        <main>
          {activeTab === "discover" ? (
            <QuoteCard
              quote={currentQuote}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onCopy={() => handleCopy()}
              onNewQuote={handleNewQuote}
              isLoading={isLoading}
            />
          ) : (
            <FavoritesList
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
              onCopy={handleCopy}
            />
          )}
        </main>

        <footer className="text-center mt-12 text-muted text-sm">
          <p>Press spacebar for a new quote</p>
        </footer>
      </div>

      <Toast message={toast.message} isVisible={toast.visible} onHide={hideToast} />
    </div>
  );
}
