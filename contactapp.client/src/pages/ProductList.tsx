import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
};

export default function ProductList(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Product[];
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div style={{ padding: 16 }}>
      <h1>製品一覧</h1>

      <div style={{ marginBottom: 12 }}>
        <input
          aria-label="検索"
          placeholder="製品名または説明で検索..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ padding: 8, width: '100%', maxWidth: 480, boxSizing: 'border-box' }}
        />
      </div>

      {loading && <div>読み込み中...</div>}

      {error && (
        <div role="alert" style={{ color: 'red', marginBottom: 12 }}>
          エラー: {error}{' '}
          <button onClick={() => window.location.reload()} style={{ marginLeft: 8 }}>
            再試行
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div>該当する製品が見つかりません。</div>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map(p => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 12,
              padding: 12,
              borderBottom: '1px solid #eee',
              alignItems: 'center'
            }}
          >
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.name}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4 }}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  color: '#888'
                }}
              >
                No Image
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h2 style={{ margin: 0, fontSize: 16 }}>{p.name}</h2>
                {p.price !== undefined && (
                  <div style={{ color: '#333', fontWeight: 600 }}>{formatPrice(p.price)}</div>
                )}
              </div>
              <p style={{ margin: '6px 0 0', color: '#555' }}>
                {p.description ?? '説明なし'}
              </p>
            </div>

            <div>
              <Link to={`/products/${encodeURIComponent(p.id)}`}>
                詳細
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatPrice(value: number): string {
  // ロケールに依存せず簡易表示
  return `¥${value.toLocaleString()}`;
}