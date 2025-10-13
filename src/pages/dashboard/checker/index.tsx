import {DashboardLayout} from '@/layout/dashboard-layout';
import {useEffect, useState} from 'react';
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


import { CheckerFilter } from '@/features/modules/checker/checker-filter';
import CheckerDetails from '@/features/modules/checker/checker-details';
import { InfoIcon, MoreVertical } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Using live refunds from API instead of static transactions
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/store';
import { fetchRefunds } from '@/services/thunks';
import { Refund } from '@/types';

interface CheckerFilters {
  status?: string;
  account?: string;
  startDate?: string;
  endDate?: string;
}

// Pagination & filtering notes:
// - Backend expects query keys: Status (number), Page, PageSize, PatientName, Date (single date)
// - We always fetch only pending refunds (Status=1) for this checker view
// - Applying any filter resets pageNumber to 1 and re-dispatches fetchRefunds with Page/PageSize
// - Date range UI currently sends only startDate as Date param (backend supports single date)
// - To extend: support multiple statuses or true date range if API adds start/end params
// - metaData from API is used for controls & Showing X-Y of Z summary

const Checkers = () => {
  //const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<import('@tanstack/react-table').ColumnFiltersState>([]);

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Refund | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { refunds, loading, error } = useSelector((s: RootState) => s.refunds);
  const metaData = useSelector((s: RootState) => s.refunds.metaData);

  // pagination local state (1-based page indexing)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // initial fetch: only pending refunds (Status=1)
  useEffect(() => {
    dispatch(fetchRefunds({ Status: 1, Page: pageNumber, PageSize: pageSize }));
  }, [dispatch, pageNumber, pageSize]);

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

  const columns: ColumnDef<Refund>[] = [
    {
      accessorKey: 'requestDate',
      header: 'Request Date',
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
      accessorKey: 'refundReference',
      header: 'Refund Reference',
    },
    {
      accessorKey: 'refundAmount',
      header: 'Refund Amount',
    },
    {
      accessorKey: 'walletNumber',
      header: 'Wallet ID',
    },
    {
      accessorKey: 'refundReason',
      header: 'Refund Reason',
    },
    {
      accessorKey: 'disputeDate',
      header: 'Dispute Date',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({getValue}) => {
  const value = getValue() as string; // status text
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
                  const refund = row.original as Refund;
                  const isEmptyRow = !refund.id && !refund.refundReference;
    
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

  const pendingTransactions: Refund[] = (refunds || []).filter((r: Refund) => (r.status || '').toLowerCase() === 'pending');

  const table = useReactTable<Refund>({
    data: pendingTransactions,
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

  const handleApplyFilter = (filters: CheckerFilters) => {
    const newFilters: { id: string; value: unknown }[] = [];

    if (filters.status) {
      newFilters.push({id: 'status', value: filters.status});
    }
   
   
    if (filters.account) {
      newFilters.push({id: 'walletNumber', value: filters.account});
    }
    if (filters.startDate || filters.endDate) {
      newFilters.push({
        id: 'requestDate',
        value: {start: filters.startDate, end: filters.endDate},
      });
    }

    setColumnFilters(newFilters);

    // Build API params (backend currently supports single Date + PatientName)
    // reset to first page when filters change
    setPageNumber(1);
    const params: { Status: number; PatientName?: string; Date?: string; Page: number; PageSize: number } = { Status: 1, Page: 1, PageSize: pageSize };
    if (filters.account) params.PatientName = filters.account; // adjust if API expects WalletNumber
    if (filters.startDate) params.Date = filters.startDate; // using start date as representative
    dispatch(fetchRefunds(params));
  };

  // Function to reset filters
  const handleResetFilter = () => {
    setColumnFilters([]);
    setPageNumber(1);
    dispatch(fetchRefunds({ Status: 1, Page: 1, PageSize: pageSize }));
  };

  const hasData = pendingTransactions.length > 0;

  return (
    <DashboardLayout>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">
            You have no initiated a refund yet
          </p>
          <p className="text-gray-500 mt-2 mb-6">All refund appears here</p>
          
        </div>
      ) : (
        <div className="bg-gray-200 overflow-scroll h-full ">
          <div className="bg-white p-6 rounded-md flex justify-between items-center mx-8 mt-10">
            <CheckerFilter
              onApply={handleApplyFilter}
              onReset={handleResetFilter}
            />
          </div>

          <div className="lg:mx-8 mt-10 bg-white mb-32 pb-10 rounded-md flex flex-col">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">Pending Refund Requests</h1>
                {metaData && (
                  <span className="text-sm text-gray-500">Showing {(metaData.currentPage - 1) * metaData.pageSize + 1} - {Math.min(metaData.currentPage * metaData.pageSize, metaData.totalCount)} of {metaData.totalCount}</span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                
                <Button variant="ghost" className="py-2.5 w-44">
                  Export
                </Button>
              </div>
            </div>
            {metaData && (
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between px-6 pb-2 mt-2">
                <div className="flex items-center gap-3 text-sm">
                  <button
                    disabled={!metaData.hasPrevious || loading}
                    onClick={() => metaData.hasPrevious && setPageNumber(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded border text-xs disabled:opacity-40"
                  >Prev</button>
                  <span className="text-gray-600">Page {metaData.currentPage} of {metaData.totalPages}</span>
                  <button
                    disabled={!metaData.hasNext || loading}
                    onClick={() => metaData.hasNext && setPageNumber(p => p + 1)}
                    className="px-3 py-1.5 rounded border text-xs disabled:opacity-40"
                  >Next</button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <label htmlFor="pageSize" className="text-gray-600">Rows per page:</label>
                  <select
                    id="pageSize"
                    value={pageSize}
                    onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); }}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {[10,20,30,50].map(sz => <option key={sz} value={sz}>{sz}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-auto px-6 lg:px-0 mt-4">
              {loading && (
                <div className="p-6 text-sm text-gray-500">Loading refunds...</div>
              )}
              {error && !loading && (
                <div className="p-6 text-sm text-red-600">{error}</div>
              )}
              {!loading && !error && (
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
                        onClick={() => {
                          setSelectedTransaction(row.original); // save row data
                          setOpen(true);
                        }}
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
                        <div className="flex flex-col items-center">
                          <span className="font-medium">No data available</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              )}
            </div>

            {/* Pagination stuck at bottom */}
            {/* <div className="p-4 flex items-center justify-end ">
            <Pagination
              totalEntriesSize={filteredClaims.length}
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
          </div> */}
          </div>
        </div>
      )}

      {/* transaction details modal */}
      <CheckerDetails open={open} setOpen={setOpen} data={selectedTransaction} />
    </DashboardLayout>
  );
};

export default Checkers;
