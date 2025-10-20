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
import {DoctorFilter} from '@/features/modules/doctor/filter';
import DoctorVerificationDetails from '@/features/modules/doctor/doctor-veri-details';
import {Loader} from '@/components/ui/loading';

const VerificationRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {pendingDoctors, loading, error, totalCount, currentPage} = useSelector(
    (state: RootState) => state.doctors,
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filterStatus, setFilterStatus] = useState<string | undefined>();

  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [openVerify, setOpenVerify] = useState(false);

 useEffect(() => {
   dispatch(fetchPendingDoctors({ page, pageSize }));
 }, [dispatch, page, pageSize]);

  const filteredDoctors = useMemo(() => {
    return pendingDoctors.filter(d => {
      const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
      const matchesName = searchTerm
        ? fullName.includes(searchTerm.toLowerCase())
        : true;

      const matchesStatus = filterStatus
        ? filterStatus === 'online'
          ? d.isDoctorAvailable
          : !d.isDoctorAvailable
        : true;

      return matchesName && matchesStatus;
    });
  }, [pendingDoctors, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredDoctors.length / pageSize);
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredDoctors.slice(start, start + pageSize);
  }, [filteredDoctors, page, pageSize]);

  const columns: ColumnDef<any>[] = [
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
    // {
    //   accessorKey: 'createdAt',
    //   header: 'Submission Date',
    //   cell: ({ row }) => {
    //     const value = (row.original as Doctor).createdAt;
    //     return value ? new Date(value).toLocaleDateString() : '--';
    //   }
    // },
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
        } else if (value === false) {
          statusText = 'Rejected';
          statusClasses += 'text-red-800';
        } else {
          statusText = 'Pending';
          statusClasses += 'text-yellow-600';
        }

        return <span className={statusClasses}>{statusText}</span>;
      },
    },
    {
      id: 'action',
      enableHiding: false,
      header: 'Action',
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
    data: paginatedDoctors,
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

  const handleApplyFilter = (filters: any) => {
    setSearchTerm(filters.name || '');
    setFilterStatus(filters.status);
    setPage(1);
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setFilterStatus(undefined);
    setPage(1);
  };

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
            <div className="flex gap-4 items-center">
              <DoctorFilter
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
              <Button variant="ghost" className="py-2.5 w-36 rounded-md">
                Export
              </Button>
            </div>
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
                    onPageChange={setPage}
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
          data={selectedDoctor}
          open={openVerify}
          setOpen={setOpenVerify}
        />
      </div>
    </DashboardLayout>
  );
};

export default VerificationRequest;
