import React, { useState, useMemo } from 'react';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const SortableTable = ({ data, columns }) => {
  const { items, requestSort, sortConfig } = useSortableData(data);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              onClick={() => requestSort(column.key)}
              className={`px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider ${getClassNamesFor(column.key)}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {item[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
