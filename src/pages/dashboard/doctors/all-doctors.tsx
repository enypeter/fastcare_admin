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


import { useNavigate } from 'react-router-dom';
import { AllDoctorFilter } from '@/features/modules/doctor/all-doctor-filter';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const doctors = [
  {
    id: '1',
    code: '000CDG45',
    name: 'John Doe',
    speciality: 'Chiropractor',
    license: 'MCDN20018390',
    status: 'Online',
    date: '2hrs 30mins',
    action: '',
  },
  {
    id: '2',
    code: '000CDG45',
    name: 'John Doe',
    speciality: 'Medical',
    license: 'MCDN20018390',
    status: 'Offline',
    date: '2hrs ago',
    action: '',
  },
];

const AllDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate()

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
      accessorKey: 'status',
      header: 'Status',
      cell: ({getValue}) => {
        const value = getValue() as string; // ✅ cast from unknown to string
        const status = (value || '').toLowerCase();

        let statusClasses = ' py-1  text-md font-semibold w-fit';

        if (status === 'successful' || status === 'approved' || status === 'online') {
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
        accessorKey: 'date',
        header: 'Upcoming Appt',
        cell: ({ getValue }) => {
            const value = getValue() as string;
            const isPast = value.toLowerCase().includes('ago');

            return (
            <span className={isPast ? 'text-red-600 font-semibold' : 'text-gray-700 font-semibold'}>
                {value}
            </span>
            );
        },
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
          <div onClick={() => navigate('/doctors/doctor-details')} className="flex text-center justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]">
            View Profile
          </div>
        );
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
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[600px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl text-gray-800">All Doctors</h1>

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center mr-24">
              <AllDoctorFilter
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
    </DashboardLayout>
  );
};

export default AllDoctors;
