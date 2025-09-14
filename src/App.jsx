import React, { useState, useEffect } from 'react'
import PokeCard from './components/PokeCard';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');

  const [list, setList] = useState([]);
  const LIMIT = 12;
  const [offset, setOffset] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();

    const query = name.trim().toLowerCase();

    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pokemon/${query}`);
      const json = await res.json();
      setData(json);
      console.log('risposta pokemon', json);
    } catch (e) {
      console.error('Errore in fetch', e.message)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    const listRes = async () => {

      const res = await fetch(`http://127.0.0.1:8000/api/pokemon?limit=${LIMIT}&offset=${offset}`);
      const json = await res.json();
      setList(json.items || [])
    }

    listRes();
  }, [offset])

  //handler bottoni
  const prevPage = () => setOffset(Math.max(0, offset - LIMIT))
  const nextPage = () => setOffset(offset + LIMIT)


  return (
    <div style={{ backgroundColor: "#2f2e30", padding: "40px" }}>

      <div style={{ maxWidth: 1200, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ color: "white" }}>PokéSearch</h1>
        <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="pikachu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}
          />
          <button type="submit" disabled={loading} style={{ padding: "10px 16px", borderRadius: 8 }}>
            {loading ? "Cerco..." : "Cerca"}
          </button>
        </form>
        {data && <PokeCard data={data} />}


        <h2 style={{ marginTop: 32, color: "white" }}>Lista</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5 , 1fr)",
            gap: 16,
            alignItems: "start"
          }}
        >
          {list.map((p) => (
            <div
              key={p.id || p.name}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                textAlign: "center",
                background: "#fff"
              }}
            >
              {p.sprite ? (
                <img
                  src={p.sprite}
                  alt={p.name}
                  width={96}
                  height={96}
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <div style={{ width: 96, height: 96, background: "#f2f2f2", borderRadius: 8, margin: "0 auto" }} />
              )}
              <div style={{ fontWeight: 600, marginTop: 8 }}>{p.name}</div>
              <div style={{ marginTop: 6 }}>
                {p.types && p.types.length
                  ? p.types.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        border: "1px solid #ddd",
                        borderRadius: 999,
                        marginRight: 6,
                        fontSize: 12
                      }}
                    >
                      {t}
                    </span>
                  ))
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>

        {/* Controlli paginazione */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={prevPage} disabled={offset === 0} style={{ padding: "8px 12px", borderRadius: 8 }}>
              ← Prev
            </button>

            <button onClick={nextPage} style={{ padding: "8px 12px", borderRadius: 8 }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div >

  );
}

export default App
