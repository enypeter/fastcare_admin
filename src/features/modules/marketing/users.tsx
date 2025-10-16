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

//import {ProviderFilter} from '@/features/modules/providers/filter';

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '1234566789',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '1234566789',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '1234566789',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '1234566789',
    date: '24/10/2020',
    action: '',
  },
];

const UsersWho = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, page]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'User name',
    },
    {
      accessorKey: 'phone',
      header: 'Email/Phone Number',
    },
    {
      accessorKey: 'date',
      header: 'Registration Date',
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

  return (
    <>
      <div className="flex-1 overflow-auto lg:px-0 lg:mt-2">
        <Table className="min-w-[600px]">
          <TableHeader className="border border-[#CDE5F9]">
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
          // currentEntriesSize={paginatedProviders.length}
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
    </>
  );
};

export default UsersWho;
