import { useEffect, useState } from "react";
import { fetchCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/api";
import Table from "../components/Table";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nome: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadCategorias();
  }, []);

  // Carregar categorias e mapear nome_categoria → nome
  async function loadCategorias() {
    try {
      const data = await fetchCategorias();
      const mapped = data.map(cat => ({
        id_categoria: cat.id_categoria,
        nome: cat.nome_categoria
      }));
      setCategorias(mapped);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }

  // Criar ou atualizar categoria
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editId) {
        await updateCategoria(editId, { nome_categoria: form.nome });
        setEditId(null);
      } else {
        await createCategoria({ nome_categoria: form.nome });
      }
      setForm({ nome: '' });
      await loadCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  }

  // Deletar categoria
  async function handleDelete(id_categoria) {
    try {
      await deleteCategoria(id_categoria);
      await loadCategorias();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  }

  // Preparar edição
  function handleEdit(cat) {
    setEditId(cat.id_categoria);
    setForm({ nome: cat.nome });
  }

  return (
    <div>
      <h1>Categorias</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          style={{ flex: 1 }}
          placeholder="Nome da Categoria"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <Table
        data={categorias}
        columns={[{ key: 'nome', label: 'Nome' }]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idField="id_categoria"
      />
    </div>
  );
}