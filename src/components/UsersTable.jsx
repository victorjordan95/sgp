import React from 'react';

import DataTable from 'react-data-table-component';

const paginationComponentOptions = {
  rowsPerPageText: 'Linhas por página:',
  rangeSeparatorText: 'de',
  noRowsPerPage: true,
  selectAllRowsItem: false,
  selectAllRowsItemText: 'Todos',
};

function UsersTable({
  data,
  columns,
  count,
  hasNext,
  hasPrevious,
  handlePageChange,
  amountPerPage = 10,
  expandableRows = false,
}) {
  return (
    <DataTable
      noHeader
      striped
      responsive
      columns={columns}
      data={data?.rows}
      pagination
      minWidth="30"
      expandableRows={expandableRows}
      paginationServer
      paginationComponentOptions={paginationComponentOptions}
      paginationTotalRows={data?.count}
      onChangePage={handlePageChange}
      paginationPerPage={amountPerPage}
    />
  );
}

export default UsersTable;
