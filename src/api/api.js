const API_URL = '/api';

// Produtos
export async function fetchProdutos() {
  const res = await fetch(`${API_URL}/produtos`);
  return res.json();
}

export async function createProduto(produto) {
  const res = await fetch(`${API_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar produto');
  return data;
}

export async function updateProduto(id, produto) {
  const res = await fetch(`${API_URL}/produtos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar produto');
  return data;
}

export async function deleteProduto(id) {
  const res = await fetch(`${API_URL}/produtos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar produto');
  return res;
}

// Categorias
export async function fetchCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function createCategoria(cat) {
  const res = await fetch(`${API_URL}/categorias`, {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(cat)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar categoria');
  return data;
}

export async function updateCategoria(id, cat) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method:'PUT',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(cat)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar categoria');
  return data;
}

export async function deleteCategoria(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, { method:'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar categoria');
  return res;
}

// Usuários
export async function fetchUsuarios() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUsuario(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao criar usuário');
  return data;
}

export async function updateUsuario(id, user) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method:'PUT',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao atualizar usuário');
  return data;
}

export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/users/${id}`, { method:'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar usuário');
  return res;
}