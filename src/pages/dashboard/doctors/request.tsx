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

import {DoctorFilter} from '@/features/modules/doctor/filter';
import DoctorVerificationDetails from '@/features/modules/doctor/doctor-veri-details';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const requests = [
  {
    id: '1',
    code: '000CDG45',
    name: 'John Doe',
    speciality: 'Chiropractor',
    license: 'MCDN20018390',
    status: 'pending',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '2',
    code: '000CDG45',
    name: 'John Doe',
    speciality: 'Chiropractor',
    license: 'MCDN20018390',
    status: 'rejected',
    date: '2023-01-01',
    action: '',
  },
];

const VerificationRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const filteredProviders = requests.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProviders.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProviders.slice(start, start + pageSize);
  }, [filteredProviders, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Doctor Name',
    },
    {
      accessorKey: 'speciality',
      header: 'Speciality',
    },
    {
      accessorKey: 'license',
      header: 'License Number',
    },
    {
      accessorKey: 'date',
      header: 'Submission Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({getValue}) => {
        const value = getValue() as string; // ✅ cast from unknown to string
        const status = (value || '').toLowerCase();

        let statusClasses = ' py-1  text-md font-semibold w-fit';

        if (status === 'successful' || status === 'approved') {
          statusClasses += '  text-green-700';
        } else if (status === 'pending') {
          statusClasses += '  text-yellow-600';
        } else if (
          status === 'disputed' ||
          status === 'failed' ||
          status === 'rejected'
        ) {
          statusClasses += '  text-red-800';
        } else {
          statusClasses += '  text-gray-500';
        }

        return <span className={statusClasses}>{value || '-'}</span>;
      },
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
          <div>
            <DoctorVerificationDetails data={row.original} />
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

  //Function to apply filters from FilterDialog
  const handleApplyFilter = (filters: any) => {
    const newFilters: any[] = [];
    if (filters.status) newFilters.push({id: 'status', value: filters.status});
    if (filters.name) newFilters.push({id: 'name', value: filters.name});

    if (filters.date) newFilters.push({id: 'date', value: filters.date}); // make sure your data has a 'date' field
    setColumnFilters(newFilters);
  };
  //Function to reset filters
  const handleResetFilter = () => {
    setColumnFilters([]);
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[600px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl text-gray-800">Recent Doctor Uploads</h1>

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center">
              <DoctorFilter
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
              <Button variant="ghost" className="py-2.5 w-36 rounded-md">
                Export
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto lg:px-0 lg:mt-4">
            <Table className="min-w-[600px]">
              <TableHeader className="border-y border-[#CDE5F9]">
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
                      className="cursor-pointer hover:bg-gray-100"
                      
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell
                          key={cell.id} // ✅ moved key here
                          className={
                            cell.column.id === 'action' ? 'text-right' : ''
                          } // ✅ fixed mismatch
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
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
                        <span className="font-medium">You have no doctors</span>
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
              totalEntriesSize={filteredProviders.length}
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

export default VerificationRequest;
