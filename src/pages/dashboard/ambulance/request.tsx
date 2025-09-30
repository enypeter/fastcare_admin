import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo} from 'react';
import {Button} from '@/components/ui/button';
import {ArrowDownLeft} from 'lucide-react';
import claim from '/svg/totalamb.svg';
import approved from '/svg/avbamb.svg';
import disputed from '/svg/unamb.svg';
import en from '/svg/enroute.svg';
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

import { RequestFilter } from '@/features/modules/ambulance/filter';
import RequestDetails from '@/features/modules/ambulance/request-details';


const requests = [
  {
    id: '1',
    location: '23 Ogui rd, Achara layout, Enugu',
    request_id: 'REQ2301',
    type: 'Emergency, Headache',
    no: 'AMB-12011 : LAG23AEJ',
    time: '11/03/25; 11:30am',
    action: 'Assign team',
    isNew: true, // new row
  },
  {
    id: '2',
    location: '63 Peace Avenue, Yaba, Lagos',
    request_id: 'REQ2301',
    type: 'Standby',
    no: 'AMB-12011 : LAG23LSR',
    time: '11/03/25; 11:30am',
    action: 'View trip',
    isNew: false,
  },
  {
    id: '3',
    location: '63 Eriga Bashorun, Ojota, Lagos',
    request_id: 'REQ2301',
    type: 'Vomitting',
    no: 'AMB-12021 : LAG23LSR',
    time: '11/03/25; 11:30am',
    action: 'Assign team',
    isNew: false,
  },
];

const claimStats = [
  {
    id: 1,
    title: 'Total Ambulance',
    value: 0,
    borderColor: 'gray',
    bgColor: 'white',
    icon: claim,
  },
  {
    id: 2,
    title: 'Available Ambulance',
    value: 0,
    borderColor: '#0e9f2e',
    bgColor: 'rgba(14, 159, 46, 0.05)', // #0e9f2e 5%
    icon: approved,
  },
  {
    id: 3,
    title: 'En Route',
    value: 0,
    borderColor: '#CFC923',
    bgColor: 'rgba(207, 201, 35, 0.05)', // fixed
    icon: en,
  },
  {
    id: 4,
    title: 'Unavailable',
    value: 0,
    borderColor: '#cf2323',
    bgColor: 'rgba(207, 35, 35, 0.05)', // #cf2323 5%
    icon: disputed,
  },
];

const Request = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredClaims = requests.filter(
    item =>
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.no.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredClaims.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredClaims.slice(start, start + pageSize);
  }, [filteredClaims, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'location',
      header: 'Pickup Location',
      cell: ({row}) => (
        <div
          className={
            row.original.isNew
              ? 'font-semibold text-gray-900 flex flex-col '
              : ''
          }
        >
          {row.original.isNew && (
            <span className=" text-sm text-red-500 ">New</span>
          )}
          {row.original.location}
        </div>
      ),
    },
    {
      accessorKey: 'time',
      header: 'Request Time',
      cell: ({row}) => (
        <span className={row.original.isNew ? 'font-semibold text-gray-900' : ''}>
          {row.original.time}
        </span>
      ),
    },
    {
      accessorKey: 'request_id',
      header: 'Request ID',
      cell: ({row}) => (
        <span className={row.original.isNew ? 'font-semibold text-gray-900' : ''}>
          {row.original.request_id}
        </span>
      ),
    },
    {
      accessorKey: 'no',
      header: 'Ambulance Number',
      cell: ({row}) => (
        <span className={row.original.isNew ? 'font-semibold text-gray-900' : ''}>
          {row.original.no}
        </span>
      ),
    },
    {
      id: 'action',
      header: 'Action',
      cell: ({row}) => (
       <RequestDetails data={row.original} />
      ),
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
    if (filters.time) {
      newFilters.push({id: 'time', value: filters.time});
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
                <h4 className="text-2xl  leading-tight mb-2">{stat.value}</h4>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
              <div>
                <img src={stat.icon} alt={stat.title} className='w-8 h-8' />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:mx-8 mt-10 bg-white mb-32 rounded-md flex flex-col ">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-4">
              <h1 className="text-lg text-gray-800">All Ambulances Request</h1>
              <input
                type="text"
                placeholder="Search driver or ambulance number"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            <div className="flex gap-4 items-center">
              <RequestFilter
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
                        <span className="font-medium">No ambulance request found</span>
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

export default Request;
