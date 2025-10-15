import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '@/services/store';
import {fetchPendingDoctors} from '@/services/thunks';
import {Pagination} from '@/components/ui/pagination';
import DoctorVerificationDetails from '@/features/modules/doctor/doctor-veri-details';
import {Loader} from '@/components/ui/loading';
import { Doctor } from '@/types';

const VerificationRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {pendingDoctors, loading, error, totalCount, currentPage, totalPages, pageSize: storePageSize} = useSelector(
    (state: RootState) => state.doctors,
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<import('@tanstack/react-table').ColumnFiltersState>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(storePageSize || 5);
  // Removed filterStatus (filter UI removed)

  // We can rely directly on Doctor type (updated to allow nullable isApproved & optional createdAt)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [openVerify, setOpenVerify] = useState(false);

 useEffect(() => {
   dispatch(fetchPendingDoctors({ page, pageSize }));
 }, [dispatch, page, pageSize]);

  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return pendingDoctors;
    const term = searchTerm.toLowerCase();
    return pendingDoctors.filter(d => `${d.firstName} ${d.lastName}`.toLowerCase().includes(term));
  }, [pendingDoctors, searchTerm]);

  const columns: ColumnDef<Doctor>[] = [
    {
      accessorKey: 'firstName',
      header: 'Doctor Name',
      cell: ({row}) => `${row.original.firstName} ${row.original.lastName}`,
    },
    {
      accessorKey: 'specialization',
      header: 'Speciality',
    },
    {
      accessorKey: 'licenseNumber',
      header: 'License Number',
    },
    {
      accessorKey: 'createdAt',
      header: 'Submission Date',
      cell: ({ row }) => {
        const value = (row.original as Doctor).createdAt;
        return value ? new Date(value).toLocaleDateString() : '--';
      }
    },
    {
      accessorKey: 'isApproved',
      header: 'Status',
      cell: ({getValue}) => {
        const value = getValue() as boolean | null;

        let statusText = '';
        let statusClasses = 'py-1 text-md font-semibold w-fit ';

        if (value === true) {
          statusText = 'Approved';
          statusClasses += 'text-green-700';
        } 
        // else if (value === false) {
        //   statusText = 'Rejected';
        //   statusClasses += 'text-red-800';
        // }
         else {
          statusText = 'Pending';
          statusClasses += 'text-yellow-600';
        }

        return <span className={statusClasses}>{statusText}</span>;
      },
    },
    {
      id: 'action',
      enableHiding: false,
      cell: ({row}) => {
       
        return (
          <Button
            className="flex whitespace-nowrap text-center border-none justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]"
            onClick={() => {
              setSelectedDoctor(row.original);
              setOpenVerify(true);
            }}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredDoctors,
    columns,
    state: {sorting, columnVisibility, rowSelection, columnFilters},
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Removed handleApplyFilter / handleResetFilter (filter UI removed)

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        <div className="lg:mx-8 mt-10 bg-white rounded-md flex flex-col mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl text-gray-800">
                Pending Doctor Approvals
              </h1>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              />
            </div>
            {/* Filter and export controls removed per request */}
          </div>

          <div className="flex-1  lg:px-0 lg:mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-60">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-10">{error}</div>
            ) : (
              <>
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
                              key={cell.id}
                              className={
                                cell.column.id === 'action' ? 'text-right' : ''
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
                          <span className="font-medium">
                            No pending doctors
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="p-4 flex items-center justify-end">
                  <Pagination
                    totalEntriesSize={totalCount}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p:number) => {
                      setPage(p);
                    }}
                    pageSize={pageSize}
                    onPageSizeChange={size => {
                      setPageSize(size);
                      setPage(1);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <DoctorVerificationDetails
          data={selectedDoctor || undefined}
          open={openVerify}
          setOpen={setOpenVerify}
        />
      </div>
    </DashboardLayout>
  );
};

export default VerificationRequest;
