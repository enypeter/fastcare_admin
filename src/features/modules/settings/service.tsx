import {useState} from 'react';
import {Button} from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

//import {Pagination} from '@/components/ui/pagination';


import UpdateService from '@/components/form/settings/update-service';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const service = [
  {
    id: '1',
    name: 'Virtual Consultation',
    fee: '#0.00',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '2',
    name: 'Physical Consultation',
    fee: '#0.00',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '3',
   name: 'Registration',
    fee: '#0.00',
    date: '24/10/2020',
    action: '',
  },
];

const Services = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<import('@tanstack/react-table').ColumnFiltersState>([]);
  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);

 


  //   const totalPages = Math.ceil(users.length / pageSize);
  //   const paginatedProviders = useMemo(() => {
  //     const start = (page - 1) * pageSize;
  //     return users.slice(start, start + pageSize);
  //   }, [users, page]);

  interface ServiceRow { id: string; name: string; fee: string; date: string; action: string }
  const columns: ColumnDef<ServiceRow>[] = [
    {
      accessorKey: 'name',
      header: 'Service name',
    },

    {
      accessorKey: 'fee',
      header: 'Service fee',
    },

    {
      id: 'action',

      enableHiding: false,
      cell: ({row}) => {
        // Check if row is empty
        const isEmptyRow = !row.original.id && !row.original.name;

        if (isEmptyRow) {
          return null; // nothing rendered for empty row
        }
        return (
          <div className="flex items-center gap-4">
            <UpdateService
            data={row.original}
             />

            {/* Deactivate action removed pending real service activation feature */}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: service,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Function to apply filters from FilterDialog
  //   const handleApplyFilter = (filters: any) => {
  //     const newFilters: any[] = [];
  //     if (filters.status) newFilters.push({id: 'status', value: filters.status});
  //     if (filters.location)
  //       newFilters.push({id: 'location', value: filters.location});
  //     if (filters.ranking)
  //       newFilters.push({id: 'ranking', value: filters.ranking});
  //     if (filters.date) newFilters.push({id: 'date', value: filters.date}); // make sure your data has a 'date' field
  //     setColumnFilters(newFilters);
  //   };
  // Function to reset filters
  //   const handleResetFilter = () => {
  //     setColumnFilters([]);
  //   };

  const hasData = service.length > 0;

  return (
    <div>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">
            You have no service settings
          </p>
          <p className="text-gray-500 mt-2">
            All registered users appears here
          </p>
        </div>
      ) : (
        <div>
          <div className=" bg-white  rounded-md flex flex-col ">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">All Services</h1>
              </div>
            </div>

            <div className="flex-1 overflow-auto lg:px-0 lg:mt-2">
              <Table className="min-w-[600px]">
                <TableHeader className="border-y border-[#CDE5F9]">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead className="px-16" key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map(row => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map(cell => (
                          <>
                            <TableCell
                              key={cell.id}
                              className={
                                cell.column.id === 'actions'
                                  ? 'text-right px-24'
                                  : 'px-16'
                              }
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">
                            You have no provider yet
                          </span>
                          <span className="font-medium">
                            All your registered providers appears here
                          </span>
                          <Button className="py-3">Add Hospital</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination stuck at bottom */}
            {/* <div className="p-4 flex items-center justify-end">
              <Pagination
                totalEntriesSize={users.length}
                currentEntriesSize={paginatedProviders.length}
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                pageSize={pageSize}
                onPageSizeChange={size => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div> */}
          </div>

        </div>
      )}
    </div>
  );
};

export default Services;
