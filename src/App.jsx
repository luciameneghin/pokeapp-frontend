import React, { useState } from 'react'

const App = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const query = name.trim().toLowerCase();

    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/pokemon/${query}`);
      const json = await res.json();
      setData(json);
      console.log('risposta pikachu', json);
    } catch (e) {
      console.error('Errore in fetch', e.message)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div style={{ maxWidth: 520, margin: "40px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>PokéSearch</h1>
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
      {data && (
        <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <p>Apri la console del browser: dovresti vedere la risposta JSON.</p>
    </div>
  );
}

export default App
