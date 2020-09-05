import React from 'react';

import DataTable from 'react-data-table-component';

const paginationComponentOptions = {
  rowsPerPageText: 'Linhas por página:',
  rangeSeparatorText: 'de',
  noRowsPerPage: true,
  selectAllRowsItem: false,
  selectAllRowsItemText: 'Todos',
};

const defaultClicked = e => {
  return false;
};

function UsersTable({
  data,
  columns,
  onRowClicked = defaultClicked,
  count,
  hasNext,
  hasPrevious,
  handlePageChange,
  amountPerPage = 10,
  expandableRows = false,
  subHeader = false,
  isClickable = false,
  subHeaderComponent,
  expandableRowsComponent,
}) {
  return (
    <DataTable
      style={{ cursor: isClickable ? 'pointer' : 'default' }}
      noHeader
      striped
      responsive
      columns={columns}
      data={data?.rows}
      pagination
      minWidth="30"
      expandableRows={expandableRows}
      paginationServer
      noDataComponent={<p className="mt-5">Nenhum dado cadastrado!</p>}
      paginationComponentOptions={paginationComponentOptions}
      paginationTotalRows={data?.count}
      onChangePage={handlePageChange}
      paginationPerPage={amountPerPage}
      onRowClicked={onRowClicked}
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
      subHeaderAlign="left"
      expandableRowsComponent={expandableRowsComponent}
    />
  );
}

export default UsersTable;
