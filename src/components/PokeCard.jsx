import React from "react";

export default function PokeCard({ data }) {
  if (!data) return null;

  const {
    name,
    sprite,
    sprite_shiny,
    types = [],
    abilities = [],
    height_cm,
    weight_kg,
    base_experience,
    stats = {},
  } = data;

  return (
    <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 12, backgroundColor: "white" }}>
      <div style={{ display: "flex", gap: 16 }}>
        {/* Sprite */}
        <div style={{ display: "grid", gap: 8 }}>
          {sprite && (
            <img
              src={sprite}
              alt={name}
              width={96}
              height={96}
              style={{
                imageRendering: "pixelated",
                background: "#f7f7f7",
                borderRadius: 8,
                objectFit: "contain",
              }}
            />
          )}
          {sprite_shiny && (
            <img
              src={sprite_shiny}
              alt={`${name} shiny`}
              width={96}
              height={96}
              style={{
                imageRendering: "pixelated",
                background: "#fff7d6",
                borderRadius: 8,
                objectFit: "contain",
              }}
              title="Shiny"
            />
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: "0 0 8px" }}>{name || "Sconosciuto"}</h2>

          <div style={{ marginBottom: 8 }}>
            <strong>Tipo:</strong>{" "}
            {types.length ? types.join(", ") : "N/A"}
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Abilità:</strong>{" "}
            {abilities.length ? abilities.join(", ") : "N/A"}
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Altezza:</strong> {height_cm ? `${height_cm} cm` : "N/A"} •{" "}
            <strong>Peso:</strong> {weight_kg ? `${weight_kg} kg` : "N/A"} •{" "}
            <strong>EXP:</strong> {base_experience ?? "N/A"}
          </div>

          <div>
            <strong>Statistiche:</strong>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: 6,
                marginTop: 6,
              }}
            >
              {Object.keys(stats).length ? (
                Object.entries(stats).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #eee",
                      borderRadius: 8,
                      padding: "6px 8px",
                    }}
                  >
                    <span style={{ textTransform: "capitalize" }}>{k}</span>
                    <span>{v}</span>
                  </div>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

