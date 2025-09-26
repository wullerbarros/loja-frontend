export default function Table({ data, columns, onEdit, onDelete, idField }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => <th key={col.key}>{col.label}</th>)}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row[idField]}>
            {columns.map(col => <td key={col.key}>{row[col.key]}</td>)}
            <td>
              <button onClick={() => onEdit(row)}>Editar</button>{' '}
              <button onClick={() => onDelete(row[idField])}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}