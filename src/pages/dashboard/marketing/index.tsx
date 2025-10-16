/* eslint-disable @typescript-eslint/no-explicit-any */
import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo} from 'react';
import {Button} from '@/components/ui/button';
import {ArrowDownLeft} from 'lucide-react';
import claim from '/svg/claim.svg';
import approved from '/svg/approved.svg';
import disputed from '/svg/top.svg';
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
import Summary from '@/features/modules/marketing/summary';
import { MarketingFilter } from '@/features/modules/marketing/filter';

const claims = [
  {
    id: '1',
    referral_code: 'FC2022-XYZ',
    name: 'Thelma George',
    total: '4',
    status: 'Active',
    date: '2023-01-01',
    action: '',
  },

  {
    id: '2',
    referral_code: 'FC2022-XYZ',
    name: 'Thelma George',
    total: '24',
    status: 'Expired',
    date: '2023-01-01',
    action: '',
  },
  {
    id: '3',
    referral_code: 'FC2022-XYZ',
    name: 'Thelma George',
    total: '23',
    status: 'Active',
    date: '2023-01-01',
    action: '',
  },
];

const claimStats = [
  {
    id: 1,
    title: 'Total Referrals Used',
    value: 29,
    borderColor: '#2f80ed',
    bgColor: 'rgba(80, 159, 239, 0.2)', // #509fef 20%
    icon: claim,
  },
  {
    id: 2,
    title: 'Most Used Code',
    value: 'FC2022-XYZ',
    borderColor: '#0e9f2e',
    bgColor: 'rgba(14, 159, 46, 0.05)', // #0e9f2e 5%
    icon: approved,
  },
  {
    id: 3,
    title: 'Top Peforming Staff',
    value: 'Kelechi',
    borderColor: '#CFC923',
    bgColor: 'rgba(207, 201, 35, 0.05)', // fixed
    icon: disputed,
  },
];

const MarketingCampaign = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredClaims = claims.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredClaims.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClaims.slice(start, start + pageSize);
  }, [filteredClaims, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'referral_code',
      header: 'Referral Code',
    },
    {
      accessorKey: 'name',
      header: 'Referring Staff Name',
    },

    {
      accessorKey: 'total',
      header: 'Total Users Registered',
    },

    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({getValue}) => {
        const value = getValue() as string; // ✅ cast from unknown to string
        const status = (value || '').toLowerCase();

        let statusClasses = ' py-1  text-md font-medium w-fit';

        if (status === 'approved' || status === 'active') {
          statusClasses += '  text-green-500';
        } else if (status === 'pending') {
          statusClasses += '  text-yellow-500';
        } else if (status === 'disputed') {
          statusClasses += '  text-red-500';
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
      cell: ({row}) => {
        // Check if row is empty
        const isEmptyRow = !row.original.id && !row.original.name;

        if (isEmptyRow) {
          return null; // nothing rendered for empty row
        }
        return (
          <div>
            <Summary data={row.original} />
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
  const handleApplyFilter = (filters: any) => {
    const newFilters: any[] = [];

    if (filters.status) {
      newFilters.push({id: 'status', value: filters.status});
    }
    if (filters.total) {
      newFilters.push({id: 'total', value: filters.total});
    }

    setColumnFilters(newFilters);
  };
  // Function to reset filters
  const handleResetFilter = () => {
    setColumnFilters([]);
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="my-10 mx-8 flex flex-col lg:flex-row justify-between gap-6 items-center">
          {claimStats.map(stat => (
            <div
              key={stat.id}
              className="flex justify-between items-center rounded-md bg-white p-6 w-full"
              style={{
                border: `2px solid ${stat.borderColor}`,
                backgroundColor: stat.bgColor,
              }}
            >
              <div>
                <h4 className="text-xl  leading-tight mb-2">{stat.value}</h4>
                <p className="text-md text-gray-600">{stat.title}</p>
              </div>
              <div>
                <img src={stat.icon} alt={stat.title} />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:mx-8 mt-10 bg-white mb-32 rounded-md flex flex-col ">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center">
              <MarketingFilter
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
              <Button variant="ghost" className="py-2.5 w-44">
                <ArrowDownLeft size={30} />
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
              totalEntriesSize={filteredClaims.length}
              // currentEntriesSize={paginatedProviders.length}
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

export default MarketingCampaign;
