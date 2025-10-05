import {DashboardLayout} from '@/layout/dashboard-layout';
import {useEffect, useMemo, useState} from 'react';
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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

//import {Pagination} from '@/components/ui/pagination';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

import {TransactionFilter} from '@/features/modules/transactions/filter';
import TransactionDetails from '@/features/modules/transactions/transaction-details';
import { InfoIcon, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/store';
import { fetchTransactions } from '@/services/thunks';
import { Pagination } from '@/components/ui/pagination';
import { Loader } from '@/components/ui/loading';
import { formatNaira } from '@/helpers/naira';

// Adapt API transaction payload to existing row structure
interface TransactionRow {
  id: string;
  transaction_id: string;
  name: string;
  type: string;
  hospital: string;
  amount: string; // formatted
  status: string;
  date: string;
}

import type { Transaction } from '@/types';

const mapTransactionToRow = (t: Transaction): TransactionRow => ({
  id: t.transactionId,
  transaction_id: t.transactionId,
  name: t.patientName || '-',
  type: t.serviceType,
  hospital: t.hospitalName || '-',
  amount: formatNaira(t.amount ?? 0),
  status: t.paymentStatus?.toLowerCase() === 'completed' ? 'Successful' : t.paymentStatus,
  date: t.date,
});

const AllTransactions = () => {
  //const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<{ id: string; value: unknown }[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);

  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);

  //   const filteredClaims = transactions.filter(
  //     item =>
  //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       item.claim_id.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );

  //   const totalPages = Math.ceil(filteredClaims.length / pageSize);
  //   const paginatedProviders = useMemo(() => {
  //     const start = (page - 1) * pageSize;
  //     return filteredClaims.slice(start, start + pageSize);
  //   }, [filteredClaims, page]);

  const columns: ColumnDef<TransactionRow>[] = [
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
      accessorKey: 'transaction_id',
      header: 'Transaction ID',
    },

    {
      accessorKey: 'name',
      header: 'Patient Name',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'type',
      header: 'Transaction Type',
    },
    {
      accessorKey: 'hospital',
      header: 'Hospital',
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
        } else if (status === 'disputed' || status === 'failed') {
          statusClasses += '  text-red-800';
        } else {
          statusClasses += '  text-gray-500';
        }

        return <span className={statusClasses}>{value || '-'}</span>;
      },
    },
    {
          id: 'action',
          header: 'Action',
          enableHiding: false,
          cell: ({ row }) => {

              // Check if row is empty
              const isEmptyRow = !row.original.id && !row.original.name;

              if (isEmptyRow) {
                  return null; // nothing rendered for empty row
              }
              return (
                  <div className="flex text-center justify-start items-center gap-2">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <MoreVertical className="text-neutral-400 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[200px]">
                              <DropdownMenuItem
                                  onClick={() => {
                                setSelectedTransaction(row.original); // save row data
                                setOpen(true);
                              }}
                              >
                                  <InfoIcon className="text-neutral-600" />
                                  View details
                              </DropdownMenuItem>

                            

                          </DropdownMenuContent>
                      </DropdownMenu>

                  </div>
              );
          },
    },

  ];

  const dispatch = useDispatch<AppDispatch>();
  const {transactions, loading, error, metaData} = useSelector((s: RootState) => s.transactions);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown>>({});

  useEffect(() => {
    dispatch(fetchTransactions({
      Page: page,
      PageSize: pageSize,
      Status: appliedFilters.status as string | undefined,
      HospitalName: appliedFilters.hospital as string | undefined,
      PatientName: appliedFilters.patient as string | undefined,
      Date: appliedFilters.startDate as string | undefined, // using startDate as single date param
      ServiceType: appliedFilters.type as string | undefined,
    }));
  }, [dispatch, page, pageSize, appliedFilters]);

  const mappedTransactions = useMemo(() => transactions.map(mapTransactionToRow), [transactions]);

  const table = useReactTable({
    data: mappedTransactions,
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

  const handleApplyFilter = (filters: Record<string, unknown>) => {
    const newFilters: { id: string; value: unknown }[] = [];

    if (filters.status) {
      newFilters.push({id: 'status', value: filters.status});
    }
    if (filters.type) {
      newFilters.push({id: 'type', value: filters.type});
    }
    if (filters.patient) {
      newFilters.push({id: 'name', value: filters.patient}); // accessorKey is "name"
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

  // Track initial load to avoid flashing the empty state before first fetch resolves
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (!loading) {
      setInitialLoad(false);
    }
  }, [loading]);

  const hasData = mappedTransactions.length > 0;
  const isEmpty = !initialLoad && !loading && !error && mappedTransactions.length === 0;
  const showLoader = loading || initialLoad;

  return (
    <DashboardLayout>
      {showLoader && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <Loader height="h-40" />
        </div>
      )}

      {!showLoader && error && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <p className="text-lg font-semibold text-red-600">Failed to load transactions</p>
          <p className="text-gray-500 mt-2">{error}</p>
          <Button className="mt-4" variant="outline" onClick={() => {
            dispatch(fetchTransactions({
              Page: page,
              PageSize: pageSize,
              Status: appliedFilters.status as string | undefined,
              HospitalName: appliedFilters.hospital as string | undefined,
              PatientName: appliedFilters.patient as string | undefined,
              Date: appliedFilters.startDate as string | undefined,
              ServiceType: appliedFilters.type as string | undefined,
            }));
          }}>Retry</Button>
        </div>
      )}

      {!showLoader && !error && isEmpty && (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">You have no transactions yet</p>
          <p className="text-gray-500 mt-2">All transactions appear here</p>
        </div>
      )}

      {!showLoader && !error && hasData && (
        <div className="bg-gray-200 overflow-scroll h-full ">
          <div className="bg-white p-6 rounded-md flex justify-between items-center mx-8 mt-10">
            <TransactionFilter
              onApply={(f: Record<string, unknown>) => { setAppliedFilters(f); handleApplyFilter(f); setPage(1);} }
              onReset={() => { setAppliedFilters({}); handleResetFilter(); setPage(1);} }
            />
          </div>

          <div className="lg:mx-8 mt-10 bg-white mb-32 pb-10 rounded-md flex flex-col">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">All Transactions</h1>
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
                            key={cell.id}
                            className={cell.column.id === 'actions' ? 'text-right' : ''}
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
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium">No data available</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {metaData && (
              <div className="p-4 flex items-center justify-end">
                <Pagination
                  totalEntriesSize={metaData.totalCount}
                  currentPage={metaData.currentPage || page}
                  totalPages={metaData.totalPages || 1}
                  onPageChange={setPage}
                  pageSize={pageSize}
                  onPageSizeChange={(size: number) => { setPageSize(size); setPage(1);} }
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* transaction details modal */}
      <TransactionDetails open={open} setOpen={setOpen} data={selectedTransaction} />
    </DashboardLayout>
  );
};

export default AllTransactions;
