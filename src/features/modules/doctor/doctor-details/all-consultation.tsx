import { useState, useMemo } from 'react';
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

import { Pagination } from '@/components/ui/pagination';
// import { Hospital, Monitor } from 'lucide-react';

export interface Consultation {
  id: string;
  patientName: string;
  type: string;
  duration: string;
  status: string;
  reason: string;
  amount: number;
  date: string;
}

interface AllConsultationProps {
  consultations: Consultation[];
}

const AllConsultation = ({ consultations }: AllConsultationProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // Removed external filter component; only simple search retained
  const [columnFilters, setColumnFilters] = useState<import('@tanstack/react-table').ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // ✅ search filter
  const filteredConsultations = useMemo(
    () =>
      consultations?.filter(item =>
        item.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [consultations, searchTerm]
  );

  const columns: ColumnDef<Consultation>[] = [
    { accessorKey: 'id', header: 'S/N' },
    { accessorKey: 'patientName', header: 'Patient Name' },
    {
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ getValue }) => {
        const raw = getValue() as string | number | null | undefined;
        // Sentinel value from backend meaning "no duration"
        const SENTINEL = '0001-01-01T00:00:00';
        if (!raw || raw === SENTINEL) return <span className="text-gray-400">--</span>;

        // If backend later switches to numeric seconds, support that.
        const formatFromSeconds = (totalSeconds: number) => {
          if (!isFinite(totalSeconds) || totalSeconds < 0) return '--';
          const h = Math.floor(totalSeconds / 3600);
          const m = Math.floor((totalSeconds % 3600) / 60);
          const s = Math.floor(totalSeconds % 60);
          return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
        };

        if (typeof raw === 'number') {
          return <span>{formatFromSeconds(raw)}</span>;
        }

        // Attempt to parse ISO date (even if it's a placeholder). Some backends may send duration as a Date starting at epoch.
        const date = new Date(raw);
        if (isNaN(date.getTime())) return <span className="text-gray-400">--</span>;
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const formatted = [hours, minutes, seconds]
          .map(v => v.toString().padStart(2, '0'))
          .join(':');
        // If all are zero and not sentinel, still treat as '--'
        if (formatted === '00:00:00') return <span className="text-gray-400">--</span>;
        return <span>{formatted}</span>;
      },
    },
    // {
    //   accessorKey: 'type',
    //   header: 'Appointment Type',
    //   cell: ({ getValue }) => {
    //     const value = (getValue() as string) || '-';
    //     const isVirtual = value.toLowerCase() === 'virtual';
    //     return (
    //       <div className="flex items-center gap-2 font-medium">
    //         <span>{value}</span>
    //         {value !== '-' &&
    //           (isVirtual ? (
    //             <Monitor size={16} className="text-primary" />
    //           ) : (
    //             <Hospital size={16} className="text-primary" />
    //           ))}
    //       </div>
    //     );
    //   },
    // },
    { accessorKey: 'reason', header: 'Reason' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ getValue }) => (
        <span>₦{Number(getValue() || 0).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
      cell: ({ getValue }) => {
        const raw = getValue() as string;
        if (!raw) return <span>-</span>;
        const date = new Date(raw);
        return (
          <span>
            {date.toLocaleDateString('en-GB')}{' '}
            {date.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const value = (getValue() as string) || '-';
        const status = value.toLowerCase();
        let statusClasses =
          'px-3 py-1 rounded-full text-sm font-semibold capitalize ';
        if (status === 'completed') {
          statusClasses += 'bg-green-100 text-green-700';
        } else if (status === 'missed') {
          statusClasses += 'bg-red-100 text-red-700';
        } else {
          statusClasses += 'bg-gray-100 text-gray-600';
        }
        return <span className={statusClasses}>{value}</span>;
      },
    },
  ];

  const table = useReactTable({
    data: filteredConsultations,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater(table.getState().pagination);
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalPages = table.getPageCount();

  // Removed apply/reset filter handlers (no longer needed)

  return (
    <div>
      <div className="rounded-md flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between items-center p-6">
          <div className="flex items-center gap-8">
            <h1 className="text-lg text-gray-800">All Consultations</h1>
            <input
              type="text"
              placeholder="Search patient name"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                table.setColumnFilters([
                  { id: 'patientName', value: e.target.value },
                ]);
              }}
              className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
            />
          </div>
          {/* Filter component removed */}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto lg:px-0 lg:mt-4">
          <Table className="min-w-[800px]">
            <TableHeader className="border-y border-[#CDE5F9]">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <span className="font-medium">No consultations found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-end">
          <Pagination
            totalEntriesSize={table.getFilteredRowModel().rows.length}
            currentPage={pageIndex + 1}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={p => setPageIndex(p - 1)}
            onPageSizeChange={size => {
              setPageSize(size);
              setPageIndex(0);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllConsultation;
