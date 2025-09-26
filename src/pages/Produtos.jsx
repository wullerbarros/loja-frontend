import { useEffect, useState } from "react";
import { fetchProdutos, createProduto, updateProduto, deleteProduto } from "../api/api";
import Table from "../components/Table";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome:'', preco:'' });
  const [editId, setEditId] = useState(null);

  useEffect(()=>{ loadProdutos(); }, []);

  async function loadProdutos(){ const data = await fetchProdutos(); setProdutos(data); }

  async function handleSubmit(e){
    e.preventDefault();
    if(editId){ await updateProduto(editId, form); setEditId(null); }
    else { await createProduto(form); }
    setForm({ nome:'', preco:'' });
    loadProdutos();
  }

  async function handleDelete(id){ await deleteProduto(id); loadProdutos(); }

  function handleEdit(prod){ setEditId(prod.id); setForm({ nome: prod.nome, preco: prod.preco }); }

  return (
    <div>
      <h2>Produtos</h2>
      <form onSubmit={handleSubmit}>
        <input style={{flex:1}} placeholder="Nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})} required />
        <input style={{flex:1}} placeholder="Preço" value={form.preco} onChange={e=>setForm({...form,preco:e.target.value})} required />
        <button type="submit">{editId ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      <Table data={produtos} 
      columns={[{key:'nome',label:'Nome'},{key:'preco',label:'Preço'}]} 
      onEdit={handleEdit} 
      onDelete={handleDelete} 
      idField="id"
      />
    </div>
  );
}