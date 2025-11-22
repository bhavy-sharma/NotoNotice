// src/components/blocks/TableBlock.js

export default function TableBlock({ rows, onChange }) {
  const updateCell = (rowIndex, cellIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][cellIndex] = value;
    onChange(newRows);
  };

  const addRow = () => {
    const newRow = Array(rows[0]?.length || 2).fill('');
    onChange([...rows, newRow]);
  };

  const addColumn = () => {
    const newRows = rows.map(row => [...row, '']);
    onChange(newRows);
  };

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border p-1">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(i, j, e.target.value)}
                      className="w-full p-1 text-sm border-none outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addRow}
          className="text-sm text-green-600 hover:underline"
        >
          + Add Row
        </button>
        <button
          type="button"
          onClick={addColumn}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add Column
        </button>
      </div>
    </div>
  );
}