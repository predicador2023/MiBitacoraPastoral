"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Result = {
  label: string;
  path: string;
  snippet?: string;
};

type Props = {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
};

export default function SearchBox({ query, setQuery, onClose }: Props) {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 3) {
      setLoading(true);
      try {
        const res = await fetch(`/api/buscar?q=${encodeURIComponent(value)}`);
        const data: Result[] = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error buscando:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      router.push(suggestions[0].path);
    }
  };

  // 🔹 Función para recortar y resaltar coincidencias parciales
  const getSnippetFragment = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(query, "gi");
    const match = regex.exec(text);

    if (!match) return text;

    const index = match.index;
    const start = Math.max(0, index - 20);
    const end = Math.min(text.length, index + match[0].length + 20);

    const fragment = text.substring(start, end);

    // Resaltar todas las coincidencias dentro del fragmento
    return fragment.split(regex).map((part, i, arr) =>
      i < arr.length - 1 ? (
        <>
          {part}
          <mark key={i}>{match[0]}</mark>
        </>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {loading && <p className="loading">Buscando...</p>}

      {query.length > 0 && query.length < 3 && (
        <p className="hint">Escribe al menos 3 caracteres para buscar</p>
      )}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => router.push(s.path)}>
              <strong>{s.label}</strong>
              {s.snippet && (
                <p className="snippet">{getSnippetFragment(s.snippet, query)}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <button onClick={onClose} className="close-button" aria-label="Cerrar buscador">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#666"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <style jsx>{`
        .search-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        input {
          padding: 0.4rem 0.6rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .loading {
          font-size: 0.9rem;
          color: #666;
        }

        .hint {
          font-size: 0.85rem;
          color: #999;
        }

        .suggestions {
          list-style: none;
          margin: 0;
          padding: 0;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .suggestions li {
          padding: 0.4rem;
          cursor: pointer;
        }

        .suggestions li:hover {
          background: #eee;
        }

        .snippet {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        mark {
          background: yellow;
          font-weight: bold;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          margin-top: 0.5rem;
          align-self: flex-end;
        }

        .close-button svg {
          stroke: #666;
          width: 14px;
          height: 14px;
          transition: stroke 0.3s ease;
        }

        .close-button:hover svg {
          stroke: #000;
        }
      `}</style>
    </div>
  );
}