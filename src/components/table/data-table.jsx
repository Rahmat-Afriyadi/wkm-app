import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/20/solid";
import { useDebounce } from "@/lib/hooks/useDebounce";
import Pagination from "../Pagination";

const DataTable = ({ columns, data, rowSelection, setRowSelection, currentPage, totalRows, totalPages }) => {
  const [selected, setSelected] = useState([]);

  // Debounced search function
  // const debouncedGlobalFilter = useDebounce(globalFilter, 300); // 300ms debounce

  // Konfigurasi tabel
  const table = useReactTable({
    columns,
    data: data,
    state: {
      rowSelection: selected,
      // sorting,
      // globalFilter: debouncedGlobalFilter,
    },
    // onSortingChange: setSorting,
    // onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedRowModel: getFacetedRowModel(),
    onRowSelectionChange: setSelected,
    initialState: {
      pagination: { pageSize: 10 },
      columnVisibility: { id: false },
    },
  });

  useEffect(() => {
    setRowSelection(table.getSelectedRowModel());
  }, [selected]); // eslint-disable-line

  useEffect(() => {
    if (rowSelection == false) {
      setSelected([]);
    }
  }, [rowSelection]); // eslint-disable-line

  const visibleRows = table.getRowModel().rows;

  return (
    <div className="flow-root">
      {/* <Search value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} /> */}
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className=" overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer ${
                          header.column.getCanSort() ? "hover:bg-gray-100" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUpIcon className="w-5 h-5 ml-2 text-gray-500" />
                            ) : (
                              <ArrowDownIcon className="w-5 h-5 ml-2 text-gray-500" />
                            )
                          ) : null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleRows.length > 0 ? (
                  visibleRows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) =>
                          cell.column.id == "actions" ? (
                            <td key={cell.id} className="w-1/12 px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ) : (
                            <td key={cell.id} className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          )
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="w-1/12 px-6 py-4 text-sm text-center text-gray-900 whitespace-nowrap"
                    >
                      No data available
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={10}>
                    <Pagination
                      rows={data.length}
                      postsPerPage={10}
                      currentPage={currentPage}
                      totalRows={totalRows}
                      totalPages={totalPages}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
