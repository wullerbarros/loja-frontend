import { useEffect, useState } from "react";
import { fetchUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../api/api";
import Table from "../components/Table";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', cpf: '', senha: '', cargo: '', ativo: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação CPF
    if (form.cpf.length !== 11) {
      alert("CPF deve ter exatamente 11 números.");
      return;
    }

    try {
      if (editId) {
        await updateUsuario(editId, form);
        setEditId(null);
      } else {
        await createUsuario(form);
      }
      setForm({ nome: '', email: '', cpf: '', senha: '', cargo: '', ativo: true });
      await loadUsuarios();
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

  async function handleDelete(id_usuario) {
    try {
      await deleteUsuario(id_usuario);
      await loadUsuarios();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  function handleEdit(user) {
    setEditId(user.id_usuario);
    setForm({
      nome: user.nome,
      email: user.email,
      cpf: user.cpf || '',
      senha: '', 
      cargo: user.cargo || '',
      ativo: user.ativo ?? true
    });
  }

  return (
    <div>
      <h1>Usuários</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="CPF"
          value={form.cpf}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) setForm({ ...form, cpf: value });
          }}
          required
        />
        <input
          placeholder="Cargo"
          value={form.cargo}
          onChange={e => setForm({ ...form, cargo: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={e => setForm({ ...form, senha: e.target.value })}
          required={!editId} 
        />
        <label>
          <input
            type="checkbox"
            checked={form.ativo}
            onChange={e => setForm({ ...form, ativo: e.target.checked })}
          /> Ativo
        </label>
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
      </form>

      <Table
        data={usuarios}
        columns={[
          { key: 'nome', label: 'Nome' },
          { key: 'email', label: 'Email' },
          { key: 'cpf', label: 'CPF' },
          { key: 'cargo', label: 'Cargo' },
          { key: 'ativo', label: 'Ativo' }
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idField="id_usuario"
      />
    </div>
  );
}