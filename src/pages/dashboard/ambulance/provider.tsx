import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo} from 'react';

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

import {EyeIcon, Trash} from 'lucide-react';
import AddProviders from '@/components/form/ambulance/providers/add-provider';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const providers = [
  {
    id: '1',
    provider_id: 'PRO-001',
    name: 'John Doe',
    cac: '234567888',
    email: 'info.@company.com',
    phone: '0902 798 6721',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '2',
    provider_id: 'PRO-002',
    name: 'John Doe',
    cac: '234567888',
    email: 'info.@company.com',
    phone: '0902 798 6721',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '3',
    provider_id: 'PRO-003',
    name: 'John Doe',
    cac: '234567888',
    email: 'info.@company.com',
    phone: '0902 798 6721',
    date: '2023-01-01',
    action: '',
  },
];

const Providers = () => {
  //   const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //   const filteredProviders = hospitals.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );

  const totalPages = Math.ceil(providers.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return providers.slice(start, start + pageSize);
  }, [providers, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'provider_id',
      header: 'Provider ID',
    },

    {
      accessorKey: 'cac',
      header: 'CAC Number',
    },
    {
      accessorKey: 'email',
      header: 'Company Email',
    },
    {
      accessorKey: 'name',
      header: 'Contact Person',
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
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
          <div className="flex items-center gap-4">
            <div>
               <EyeIcon className='cursor-pointer w-6 h-6' />
            </div>

            <div>
              <Trash className="text-red-500 w-6 h-6 cursor-pointer" />
            </div>
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

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[500px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl text-gray-800">All Providers</h1>

              {/* <input
                type="text"
                placeholder="Search hospital"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              /> */}
            </div>
            <div className="flex gap-4 items-center">
              <AddProviders />
            </div>
          </div>

          <div className="flex-1 overflow-auto lg:px-0 lg:mt-4">
            <Table className="min-w-[600px]">
              <TableHeader className="border border-[#CDE5F9]">
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
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
                              cell.column.id === 'actions' ? 'text-right' : ''
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
                          No ambulance ambulance provider found
                        </span>
                        <span className="font-medium">
                          All your ambulance provider appear here
                        </span>
                        <AddProviders />
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
              totalEntriesSize={providers.length}
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
    </DashboardLayout>
  );
};

export default Providers;
