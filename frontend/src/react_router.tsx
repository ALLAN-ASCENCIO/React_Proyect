import React, { useState, useEffect, CSSProperties } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { C, styles } from "./Styles";
import axios from "axios";

import imgAutor from "./imagenes/autor.jpg";

type NavLinkStyleProps = { isActive: boolean };

const navLinkStyles = ({ isActive }: NavLinkStyleProps): CSSProperties => ({
  color: isActive ? C.accent : C.text,
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal",
  padding: "8px 14px",
  borderRadius: "6px",
  backgroundColor: isActive ? "rgba(233,69,96,0.12)" : "transparent",
  fontSize: "0.95rem",
  transition: "all 0.25s",
});

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#080814",
      padding: "14px 30px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      borderBottom: `1px solid ${C.border}`,
      flexWrap: "wrap",
    }}>
      <span style={{ color: C.accent, fontWeight: "bold", fontSize: "1.2rem", marginRight: "16px" }}>
        GameVault
      </span>
      <NavLink to="/" style={navLinkStyles} end>Inicio</NavLink>
      <NavLink to="/formulario" style={navLinkStyles}>Registro</NavLink>
      <NavLink to="/agregar-juego" style={navLinkStyles}>Agregar Juego</NavLink>
      <NavLink to="/autores" style={navLinkStyles}>Autores</NavLink>
    </nav>
  );
}

interface Game {
  _id: string;
  title: string;
  genre: string;
  rating: number;
  image: string;
}

function GameCard({ game }: { game: Game }) {
  return (
    <div style={{
      ...styles.card,
      flex: "1 1 200px",
      minWidth: "180px",
      padding: 0,
      overflow: "hidden",
    }}>
      <img src={game.image} alt={game.title} style={styles.gameImage} />
      <div style={{ padding: "14px" }}>
        <h3 style={{ color: C.white, margin: "0 0 6px" }}>{game.title}</h3>
        <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>Género: {game.genre}</p>
        <p style={{ margin: "4px 0" }}>{"⭐".repeat(game.rating)}</p>
      </div>
    </div>
  );
}

function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios.get("https://react-proyect-u58e.onrender.com")
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <div style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1f1040 100%)",
        borderRadius: "16px",
        padding: "55px 30px",
        textAlign: "center",
        marginBottom: "40px",
        border: `1px solid ${C.accent}`,
        boxShadow: "0 0 40px rgba(233,69,96,0.15)",
      }}>
        <h1 style={{ color: C.accent, fontSize: "3rem", margin: "0 0 10px" }}>GameVault</h1>
        <p style={{ color: C.text, fontSize: "1.15rem", margin: 0 }}>
          Tu catálogo definitivo de videojuegos favoritos
        </p>
      </div>
      <h2 style={{ color: C.accent }}>Juegos Destacados</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "40px" }}>
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}

//Formulario de registro

interface FormState {
  nombre:      string;
  email:       string;
  gamertag:    string;
  juego:       string;
  plataforma:  string;
  nivel:       string;
  pais:        string;
  edad:        string;
  genero:      string;
  horas:       string;
  descripcion: string;
}

function FormularioPage() {
  const [form, setForm] = useState<FormState>({
    nombre: "", email: "", gamertag: "", juego: "",
    plataforma: "PC", nivel: "Principiante", pais: "",
    edad: "", genero: "Prefiero no decir", horas: "", descripcion: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.gamertag || !form.juego || !form.pais || !form.edad) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    try {
      await axios.post("https://react-proyect-u58e.onrender.com", form);
      setEnviado(true);
    } catch {
      setError("Error al registrar. Intenta de nuevo.");
    }
  };

  if (enviado) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          ...styles.card,
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          border: `1px solid ${C.teal}`,
          padding: "50px 30px",
        }}>
          <p style={{ fontSize: "3rem", margin: "0 0 16px" }}>🎮</p>
          <h2 style={{ color: C.teal, margin: "0 0 10px" }}>¡Registro exitoso!</h2>
          <p style={{ color: C.text }}>
            Bienvenida/Bienvenida a GameVault, <strong style={{ color: C.white }}>{form.nombre}</strong>.<br />
            ¡Ya eres parte de la comunidad!
          </p>
        </div>
      </div>
    );
  }

  const labelStyle: CSSProperties = { color: C.teal, fontSize: "0.85rem", marginBottom: "4px", display: "block" };
  const required = <span style={{ color: C.accent }}> *</span>;

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <h1 style={{ color: C.accent, textAlign: "center", marginBottom: "6px" }}>¡Únete a GameVault!</h1>
        <p style={{ color: C.text, textAlign: "center", marginBottom: "24px" }}>
          Completa tu perfil de jugador. Los campos con <span style={{ color: C.accent }}>*</span> son obligatorios.
        </p>

        <div style={{ ...styles.card, border: `1px solid ${C.accent}`, padding: "28px" }}>
          {error && <p style={{ color: C.accent, marginBottom: "12px" }}>{error}</p>}

          <label style={labelStyle}>Nombre completo{required}</label>
          <input style={styles.input} name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} />

          <label style={labelStyle}>Correo electrónico{required}</label>
          <input style={styles.input} name="email" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={handleChange} />

          <label style={labelStyle}>Gamertag{required}</label>
          <input style={styles.input} name="gamertag" placeholder="Tu nombre en el juego" value={form.gamertag} onChange={handleChange} />

          <label style={labelStyle}>Edad{required}</label>
          <input style={styles.input} name="edad" type="number" placeholder="Ej: 22" value={form.edad} onChange={handleChange} />

          <label style={labelStyle}>Género</label>
          <select style={styles.input} name="genero" value={form.genero} onChange={handleChange}>
            <option>Prefiero no decir</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>

          <label style={labelStyle}>País{required}</label>
          <input style={styles.input} name="pais" placeholder="Ej: México" value={form.pais} onChange={handleChange} />

          <label style={labelStyle}>Juego favorito{required}</label>
          <input style={styles.input} name="juego" placeholder="Ej: Hollow Knight" value={form.juego} onChange={handleChange} />

          <label style={labelStyle}>Plataforma principal</label>
          <select style={styles.input} name="plataforma" value={form.plataforma} onChange={handleChange}>
            <option>PC</option>
            <option>PlayStation</option>
            <option>Xbox</option>
            <option>Nintendo Switch</option>
            <option>Mobile</option>
          </select>

          <label style={labelStyle}>Nivel</label>
          <select style={styles.input} name="nivel" value={form.nivel} onChange={handleChange}>
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Pro</option>
          </select>

          <label style={labelStyle}>Horas de juego por semana</label>
          <input style={styles.input} name="horas" type="number" placeholder="Ej: 10" value={form.horas} onChange={handleChange} />

          <label style={labelStyle}>Cuéntanos algo de ti</label>
          <textarea
            style={{ ...styles.input, height: "90px", resize: "none" } as CSSProperties}
            name="descripcion"
            placeholder="Aficionado a los RPGs, streamer ocasional..."
            value={form.descripcion}
            onChange={handleChange}
          />

          <button style={{ ...styles.btn, width: "100%", marginTop: "4px" }} onClick={handleSubmit}>
            Registrarme
          </button>
        </div>
      </div>
    </div>
  );
}

//Agregar juegos

interface GameForm {
  title:  string;
  genre:  string;
  rating: string;
  image:  string;
}

function AgregarJuegoPage() {
  const [form, setForm] = useState<GameForm>({ title: "", genre: "", rating: "3", image: "" });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [ultimoJuego, setUltimoJuego] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.genre || !form.image) {
      setError("Por favor completa todos los campos.");
      return;
    }
    try {
      await axios.post("https://react-proyect-u58e.onrender.com", {
        ...form,
        rating: parseInt(form.rating),
      });
      setUltimoJuego(form.title);
      setEnviado(true);
      setError("");
    } catch {
      setError("Error al agregar el juego. Intenta de nuevo.");
    }
  };

  const handleNuevo = () => {
    setForm({ title: "", genre: "", rating: "3", image: "" });
    setEnviado(false);
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <h1 style={{ color: C.accent, textAlign: "center", marginBottom: "6px" }}>Agregar Juego</h1>
        <p style={{ color: C.text, textAlign: "center", marginBottom: "24px" }}>
          Añade un juego al catálogo de GameVault.
        </p>

        {enviado ? (
          <div style={{
            ...styles.card,
            textAlign: "center",
            border: `1px solid ${C.teal}`,
            padding: "40px 30px",
          }}>
            <p style={{ fontSize: "2.5rem", margin: "0 0 12px" }}>🕹️</p>
            <h2 style={{ color: C.teal, margin: "0 0 10px" }}>¡Juego agregado!</h2>
            <p style={{ color: C.text, marginBottom: "20px" }}>
              <strong style={{ color: C.white }}>{ultimoJuego}</strong> ya está en el catálogo.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button style={styles.btn} onClick={handleNuevo}>Agregar otro</button>
              <Link to="/" style={{ ...styles.btn, textDecoration: "none", display: "inline-block" } as CSSProperties}>
                Ver catálogo
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ ...styles.card, border: `1px solid ${C.accent}`, padding: "28px" }}>
            {error && <p style={{ color: C.accent, marginBottom: "12px" }}>{error}</p>}

            <label style={{ color: C.teal, fontSize: "0.85rem", display: "block", marginBottom: "4px" }}>Nombre del juego</label>
            <input style={styles.input} name="title" placeholder="Ej: Elden Ring" value={form.title} onChange={handleChange} />

            <label style={{ color: C.teal, fontSize: "0.85rem", display: "block", marginBottom: "4px" }}>Género</label>
            <select style={styles.input} name="genre" value={form.genre} onChange={handleChange}>
              <option value="">Selecciona un género</option>
              <option>Aventura</option>
              <option>RPG</option>
              <option>J-RPG</option>
              <option>Sandbox</option>
              <option>FPS</option>
              <option>Plataforma</option>
              <option>Deportes</option>
              <option>Estrategia</option>
              <option>Terror</option>
              <option>Simulación</option>
              <option>Puzzle</option>
            </select>

            <label style={{ color: C.teal, fontSize: "0.85rem", display: "block", marginBottom: "4px" }}>Rating</label>
            <select style={styles.input} name="rating" value={form.rating} onChange={handleChange}>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <label style={{ color: C.teal, fontSize: "0.85rem", display: "block", marginBottom: "4px" }}>URL de la imagen</label>
            <input style={styles.input} name="image" placeholder="https://..." value={form.image} onChange={handleChange} />

            <button style={{ ...styles.btn, width: "100%", marginTop: "4px" }} onClick={handleSubmit}>
              Agregar juego
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

//Autores

interface Autor {
  nombre: string;
  rol: string;
  dato: string;
}

function AutoresPage() {
  const autores: Autor[] = [
    {
      nombre: "Allan Ascencio",
      rol: "Estudiante de Programacion Web",
      dato: "Aprendiendo React y amante de los videojuegos.",
    },
  ];

  return (
    <div style={styles.page}>
      <h1 style={{ color: C.accent }}>Autores</h1>
      <p>Proyecto desarrollado para la materia de Desarrollo Web — React Router.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {autores.map((a, i) => (
          <div key={i} style={{
            ...styles.card,
            textAlign: "center",
            flex: "1 1 240px",
            border: `1px solid ${C.accent}`,
          }}>
            <img
              src={imgAutor}
              alt={a.nombre}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 12px",
                display: "block",
                border: `3px solid ${C.accent}`,
                boxShadow: "0 0 12px rgba(233,69,96,0.5)",
              }}
            />
            <h2 style={{ color: C.white }}>{a.nombre}</h2>
            <p style={{ color: C.accent, fontWeight: "bold" }}>{a.rol}</p>
            <p>{a.dato}</p>
          </div>
        ))}
      </div>

      <div style={{ ...styles.card, marginTop: "30px" }}>
        <h2 style={{ color: C.teal }}>Sobre el proyecto</h2>
        <p>GameVault es una aplicación de catálogo de videojuegos construida con:</p>
        <ul style={{ lineHeight: "2" }}>
          <li>React 18</li>
          <li>React Router v6 — NavLink, rutas anidadas</li>
          <li>React Hooks — useState, useEffect</li>
          <li>CSS-in-JS con estilos inline</li>
          <li>MongoDB + Express en el backend</li>
        </ul>
      </div>
    </div>
  );
}

//404

function NotFound() {
  return (
    <div style={{ ...styles.page, textAlign: "center", paddingTop: "80px" }}>
      <h1 style={{ fontSize: "5rem", color: C.accent }}>404</h1>
      <p style={{ fontSize: "1.3rem" }}>Página no encontrada</p>
      <Link to="/" style={{ color: C.teal }}>Volver al inicio</Link>
    </div>
  );
}

//App

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: C.bg, minHeight: "100vh", color: C.text }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<FormularioPage />} />
          <Route path="/agregar-juego" element={<AgregarJuegoPage />} />
          <Route path="/autores" element={<AutoresPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
