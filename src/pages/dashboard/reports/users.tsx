import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo} from 'react';
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

import {Pagination} from '@/components/ui/pagination';

import {useNavigate} from 'react-router-dom';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const users = [
  {
    id: '1',
    no: '10',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '2',
    no: '20',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '3',
    no: '5',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '4',
    no: '1',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '5',
    no: '20',
    date: '24/10/2020',
    action: '',
  },
];

const Users = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
    },

    {
      accessorKey: 'no',
      header: 'Number of Users',
    },

    {
      id: 'action',
      header: 'Action',
      enableHiding: false,
      cell: ({row}) => {
        // Check if row is empty
        const isEmptyRow = !row.original.id && !row.original.name;

        if (isEmptyRow) {
          return null; // nothing rendered for empty row
        }
        return (
          <div
            onClick={() =>
              navigate(`/reports/users/user-details/${row.original.id}`)
            }
            className="flex text-center w-36 justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]"
          >
            View Details
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: paginatedProviders,
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

  const hasData = users.length > 0;

  return (
    <DashboardLayout>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">
            You have no registered users yet
          </p>
          <p className="text-gray-500 mt-2">All registered users appears here</p>
        </div>
      ) : (
        <div className="bg-gray-100 overflow-scroll h-full ">
          <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[600px] mb-36">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">Users</h1>
              </div>
            </div>

            <div className="flex-1 overflow-auto lg:px-0 lg:mt-4">
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
            <div className="p-4 flex items-center justify-end">
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
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Users;
