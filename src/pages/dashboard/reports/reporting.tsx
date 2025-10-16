/* eslint-disable @typescript-eslint/no-explicit-any */
import {DashboardLayout} from '@/layout/dashboard-layout';
import {useMemo, useState} from 'react';
import {Button} from '@/components/ui/button';
//import {ArrowDownLeft, Edit2Icon, InfoIcon, MoreVertical} from 'lucide-react';

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

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

import {ReportingFilter} from '@/features/modules/report/reporting-filter';
import { Pagination } from '@/components/ui/pagination';

const transactions = [
  {
    id: '1',
    doctor: 'Dr Thelma George',
    hospital: 'FMC Asaba',
    duration: '1 hour, 45 mins',
    date: '24/07/2023',
    action: '',
  },
  {
    id: '2',
    doctor: 'Dr Thelma George',
    hospital: 'FMC Asaba',
    duration: '45 mins',
    date: '24/07/2023',
    action: '',
  },
  {
    id: '3',
    doctor: 'Dr Thelma George',
    hospital: 'FMC Asaba',
    duration: '1 hour',
    date: '24/07/2023',
    action: '',
  },
];

const Reporting = () => {
  //const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

   
    const totalPages = Math.ceil(transactions.length / pageSize);
    const paginatedReporting = useMemo(() => {
      const start = (page - 1) * pageSize;
      return transactions.slice(start, start + pageSize);
    }, [transactions, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      filterFn: (row, id, filterValue) => {
        const rowDate = new Date(row.getValue(id));
        const start = filterValue?.start ? new Date(filterValue.start) : null;
        const end = filterValue?.end ? new Date(filterValue.end) : null;

        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
        return true;
      },
    },

    {
      accessorKey: 'doctor',
      header: 'Doctor in charge',
    },

    {
      accessorKey: 'duration',
      header: 'Session Duration',
    },
  ];

  const table = useReactTable({
    data: paginatedReporting,
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

  const handleApplyFilter = (filters: any) => {
    const newFilters: any[] = [];

    if (filters.clinic) {
      newFilters.push({id: 'clinic', value: filters.clinic});
    }
    if (filters.duration) {
      newFilters.push({id: 'duration', value: filters.duration});
    }
    if (filters.appointment) {
      newFilters.push({id: 'appointment', value: filters.appointment});
    }
    if (filters.doctor) {
      newFilters.push({id: 'doctor', value: filters.doctor}); // accessorKey is "name"
    }
    if (filters.hospital) {
      newFilters.push({id: 'hospital', value: filters.hospital});
    }
    if (filters.startDate || filters.endDate) {
      newFilters.push({
        id: 'date',
        value: {start: filters.startDate, end: filters.endDate},
      });
    }

    setColumnFilters(newFilters);
  };

  // Function to reset filters
  const handleResetFilter = () => {
    setColumnFilters([]);
  };

  const hasData = transactions.length > 0;

  return (
    <DashboardLayout>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">
            You have report yet
          </p>
          <p className="text-gray-500 mt-2">All transactions appear here</p>
        </div>
      ) : (
        <div className="bg-gray-200 overflow-scroll h-full ">
          <div className="bg-white p-6 rounded-md flex justify-between items-center mx-8 mt-10">
            <ReportingFilter
              onApply={handleApplyFilter}
              onReset={handleResetFilter}
            />
          </div>

          <div className="lg:mx-8 mt-10 bg-white mb-32 pb-10 rounded-md flex flex-col">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">Appointment</h1>
              </div>
              <div className="flex gap-4 items-center">
                <Button variant="ghost" className="py-2.5 w-44">
                  Export
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto px-6 lg:px-0 mt-4">
              <Table className="min-w-[600px]">
                <TableHeader>
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
                        className="cursor-pointer hover:bg-gray-100"
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map(cell => (
                          <>
                            <TableCell
                              key={cell.id}
                              className={
                                cell.column.id === 'actions'
                                  ? 'text-right px-16'
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
                          <span className="font-medium">No data available</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination stuck at bottom */}
            <div className="p-4 flex items-center justify-end ">
            <Pagination
              totalEntriesSize={transactions.length}
              // currentEntriesSize={paginatedReporting.length}
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

export default Reporting;
