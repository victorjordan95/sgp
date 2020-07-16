import React from 'react';

import DataTable from 'react-data-table-component';

function UsersTable({ data, columns, count, hasNext, hasPrevious }) {
  return (
    <DataTable
      noHeader
      columns={columns}
      data={data?.rows}
      pagination
      noRowsPerPage
      paginationTotalRows={data?.count}
    />
  );
}

export default UsersTable;
