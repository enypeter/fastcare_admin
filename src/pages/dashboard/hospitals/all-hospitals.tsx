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
import AddHospital from '@/components/form/hospitals/add-hospital';
import { useNavigate } from 'react-router-dom';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const hospitals = [
  {
    id: '1',
    code: '000CDG45',
    name: 'UNTH,Enugu',
    email: 'info@fmcasaba.com',
    address: '23 Nnebisi rd Asaba, Delta state',
    clinic_no: '1',
    ip: 'https://ipadress/n34567...',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '2',
    code: '000CDG45',
    name: 'UNTH,Enugu',
    email: 'info@fmcasaba.com',
    address: '23 Nnebisi rd Asaba, Delta state',
    clinic_no: '4',
    ip: 'https://ipadress/n34567...',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '3',
    code: '000CDG45',
    name: 'UNTH,Enugu',
    email: 'info@fmcasaba.com',
    address: '23 Nnebisi rd Asaba, Delta state',
    clinic_no: '2',
    ip: 'https://ipadress/n34567...',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '4',
    code: '000CDG45',
    name: 'UNTH,Enugu',
    email: 'info@fmcasaba.com',
    address: '23 Nnebisi rd Asaba, Delta state',
    clinic_no: '4',
    ip: 'https://ipadress/n34567...',
    date: '2023-01-01',
    action: '',
  },
];

const AllHospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const filteredProviders = hospitals.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProviders.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProviders.slice(start, start + pageSize);
  }, [filteredProviders, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: 'S/N',
    },
    {
      accessorKey: 'code',
      header: 'Hospital Code',
    },

    {
      accessorKey: 'name',
      header: 'Hospital Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'address',
      header: 'Hospital Address',
    },
    {
      accessorKey: 'clinic_no',
      header: 'No. Clinics',
    },
    {
      accessorKey: 'ip',
      header: 'Ip Address',
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
          <div onClick={() => navigate('/doctors/doctor-details')} className="flex text-center justify-center  text-sm whitespace-nowrap cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]">
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

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[600px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-lg text-gray-800">All Hospitals</h1>

              <input
                type="text"
                placeholder="Search hospital"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center">
               <AddHospital />
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
                          You have no hospital
                        </span>
                        <span className="font-medium">
                          All your hospitals appears here
                        </span>
                         <AddHospital />
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

export default AllHospitals;
