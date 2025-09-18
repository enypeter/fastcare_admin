import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState} from 'react';
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

const transactions = [
  {
    id: '1',
    transaction_id: 'JgD5XB160755',
    name: 'Thelma George',
    reason: 'No show appointment',
    hospital: 'FMC Asaba',
    amount: '#50,000.00',
    account: '12345678901',
    status: 'Pending',
    date: '24/07/2023',
    action: '',
  },
  {
    id: '2',
    transaction_id: 'JgD5XB160755',
    name: 'Thelma George',
    reason: 'No show appointment',
    hospital: 'FMC Asaba',
    account: '12345678901',
    amount: '#50,000.00',
    status: 'Pending',
    date: '24/07/2023',
    action: '',
  },
  {
    id: '3',
    transaction_id: 'JgD5XB160755',
    name: 'Thelma George',
    reason: 'No show appointment',
    hospital: 'FMC Asaba',
    account: '12345678901',
    amount: '#50,000.00',
    status: 'Approved',
    date: '24/07/2023',
    action: '',
  },
  {
    id: '4',
    transaction_id: 'JgD5XB160755',
    name: 'Thelma George',
    reason: 'No show appointment',
    account: '12345678901',
    hospital: 'FMC Asaba',
    amount: '#50,000.00',
    status: 'Approved',
    date: '24/07/2023',
    action: '',
  },
];

const Checkers = () => {
  //const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null,
  );

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

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'date',
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
      accessorKey: 'transaction_id',
      header: 'Refund Reference',
    },

    {
      accessorKey: 'amount',
      header: 'Refund Amount',
    },
    
    {
      accessorKey: 'account',
      header: 'Wallet ID',
    },
    {
      accessorKey: 'reason',
      header: 'Refund Reason',
    },
     {
      accessorKey: 'date',
      header: 'Dispute Date',
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

  const table = useReactTable({
    data: transactions,
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

    if (filters.status) {
      newFilters.push({id: 'status', value: filters.status});
    }
   
   
    if (filters.account) {
      newFilters.push({id: 'account', value: filters.account});
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
                <h1 className="text-xl text-gray-800">All refund request</h1>
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
