import { DashboardLayout } from '@/layout/dashboard-layout';
import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '@/store'; // Adjust import path as needed
// import { fetchAmbulanceProviders } from '@/store/thunks/ambulanceThunks'; // Adjust import path

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

import { EyeIcon, Trash } from 'lucide-react';
import AddProviders from '@/components/form/ambulance/providers/add-provider';
import { AppDispatch, RootState } from '@/services/store';
import { fetchAmbulanceProviders } from '@/services/thunks';

const Providers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { providers, loading, error } = useSelector((state: RootState) => state.ambulanceProviders);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchAmbulanceProviders());
  }, [dispatch]);

  // Transform the API data to match your table structure
  const transformedProviders = useMemo(() => {
    return providers.map(provider => ({
      id: provider.id,
      provider_id: provider.registrationNumber, // Map registrationNumber to provider_id
      name: provider.adminName, // Map adminName to name
      cac: provider.registrationNumber, // Using registrationNumber as CAC, adjust if needed
      email: provider.email,
      phone: provider.phoneNumber,
      date: '2023-01-01', // You might want to add this field to your API or calculate it
      action: '',
      // Include original data if needed
      originalData: provider,
    }));
  }, [providers]);

  const totalPages = Math.ceil(transformedProviders.length / pageSize);
  
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return transformedProviders.slice(start, start + pageSize);
  }, [transformedProviders, page, pageSize]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'provider_id',
      header: 'Provider ID',
    },
    {
      accessorKey: 'cac',
      header: 'CAC Number',
    },
    {
      accessorKey: 'email',
      header: 'Company Email',
    },
    {
      accessorKey: 'name',
      header: 'Contact Person',
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
    },
    {
      id: 'action',
      header: 'Action',
      enableHiding: false,
      cell: ({ row }) => {
        const isEmptyRow = !row.original.id && !row.original.name;

        if (isEmptyRow) {
          return null;
        }
        return (
          <div className="flex items-center gap-4">
            <div>
              <EyeIcon className='cursor-pointer w-4 h-4' />
            </div>
            <div>
              <Trash className="text-red-500 w-4 h-4 cursor-pointer" />
            </div>
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

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="bg-gray-100 overflow-scroll h-full">
          <div className="lg:mx-8 mt-10 bg-white rounded-md flex items-center justify-center h-64">
            <div className="text-lg">Loading ambulance providers...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-gray-100 overflow-scroll h-full">
          <div className="lg:mx-8 mt-10 bg-white rounded-md flex items-center justify-center h-64">
            <div className="text-lg text-red-500">Error: {error}</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[500px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-lg text-gray-800">All Providers</h1>
              <div className="text-sm text-gray-600">
                {transformedProviders.length} provider(s) found
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <AddProviders />
            </div>
          </div>

          <div className="flex-1 overflow-auto lg:px-0 lg:mt-4">
            <Table className="min-w-[600px]">
              <TableHeader className="border border-[#CDE5F9]">
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
                          No ambulance providers found
                        </span>
                        <span className="font-medium">
                          All your ambulance providers will appear here
                        </span>
                        <AddProviders />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-end">
            <Pagination
              totalEntriesSize={transformedProviders.length}
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

export default Providers;