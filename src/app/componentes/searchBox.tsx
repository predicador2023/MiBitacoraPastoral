"use client";

interface SearchBoxProps {
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
}

export default function SearchBox({ query, setQuery, onClose }: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="close-search"
        onClick={onClose}
        aria-label="Cerrar buscador"
      >
        ❌
      </button>

      <style jsx>{`
        .search-box {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          background-color: #f9f9f9;
          border-bottom: 1px solid #ddd;
        }
        .search-box input {
          width: 70%;
          max-width: 300px;
          padding: 0.6rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        .close-search {
          margin-left: 0.5rem;
          font-size: 1.2rem;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}