const TableHeader = ({ onSort, sortColumn, columns }) => {
  const raizeSort = (path) => {
    const updatedSortColumn = { ...sortColumn };
    if (updatedSortColumn.path === path)
      updatedSortColumn.order =
        updatedSortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      updatedSortColumn.path = path;
      updatedSortColumn.order = 'asc';
    }
    onSort(updatedSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === 'asc') return <i className="fa  fa-sort-asc"></i>;
    return <i className="fa  fa-sort-desc "></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raizeSort(column.path)}
          >
            {column.labal}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
