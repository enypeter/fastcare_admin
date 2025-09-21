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

import {DoctorFilter} from '../filter';
import {Hospital, Monitor} from 'lucide-react';

const doctors = [
  {
    id: '1',
    code: '000CDG45',
    name: 'John Doe',
    type: 'Virtual',
    license: 'MCDN20018390',
    status: 'pending',
    duration: '2hrs 30mins',
    date: '15-06-2025, 10:52AM',
    action: '',
  },
  {
    id: '2',
    code: '000CDG45',
    name: 'John Doe',
    type: 'Physical',
    license: 'MCDN20018390',
    status: 'pending',
    duration: '2hrs 30mins',
    date: '15-06-2025, 10:52AM',
    action: '',
  },
];

const AllConsultation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredDoctors = doctors.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredDoctors.slice(start, start + pageSize);
  }, [filteredDoctors, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'S/N',
    },
    {
      accessorKey: 'name',
      header: 'Patient Name',
      cell: ({getValue}) => {
        const value = getValue() as string;
        return <span className="text-gray-900 font-medium">{value}</span>;
      },
    },

    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({getValue}) => {
        const value = getValue() as string;
        const isPast = value.toLowerCase().includes('ago');

        return (
          <span
            className={
              isPast
                ? 'text-red-600 font-semibold'
                : 'text-gray-700'
            }
          >
            {value}
          </span>
        );
      },
    },

    {
      accessorKey: 'type',
      header: 'Appointment Type',
      cell: ({getValue}) => {
        const value = (getValue() as string) || '';
        const isVirtual = value.toLowerCase() === 'virtual';
        return (
          <div className="flex items-center gap-2  font-medium">
            <span>{value}</span>
            {isVirtual ? <Monitor size={16} className='text-primary' /> : <Hospital size={16} className='text-primary' />}     
          </div>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({getValue}) => {
        const value = getValue() as string; // ✅ cast from unknown to string
        const status = (value || '').toLowerCase();

        let statusClasses = ' py-1  text-md font-semibold w-fit';

        if (
          status === 'successful' ||
          status === 'approved' ||
          status === 'online'
        ) {
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
  ];

  const table = useReactTable({
    data: paginatedDoctors,
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
      <div >
        <div className=" rounded-md flex flex-col">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-lg text-gray-800">All Consultations</h1>

              <input
                type="text"
                placeholder="Search patient name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center mr-10">
              <DoctorFilter
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
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
              totalEntriesSize={filteredDoctors.length}
              currentEntriesSize={paginatedDoctors.length}
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
    
  );
};

export default AllConsultation;
