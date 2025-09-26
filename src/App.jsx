import { useState } from "react";
import Produtos from "./pages/Produtos";
import Categorias from "./pages/Categorias";
import Usuarios from "./pages/Usuarios";

export default function App() {
  const [page, setPage] = useState('produtos');

  return (
    <div style={{ padding: '20px', maxWidth:'900px', margin:'0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom:'20px' }}>Painel de Administração</h1>
      <nav>
        <button onClick={() => setPage('produtos')}>Produtos</button>
        <button onClick={() => setPage('categorias')}>Categorias</button>
        <button onClick={() => setPage('usuarios')}>Usuários</button>
      </nav>
      {page === 'produtos' && <Produtos />}
      {page === 'categorias' && <Categorias />}
      {page === 'usuarios' && <Usuarios />}
    </div>
  );
}