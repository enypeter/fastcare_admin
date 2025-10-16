import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

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
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {Pagination} from '@/components/ui/pagination';
import AddHospital from '@/components/form/hospitals/add-hospital';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/services/store';
import {fetchHospitals, exportHospitals} from '@/services/thunks';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Download} from 'lucide-react';
import {Loader} from '@/components/ui/loading';

export const AllHospitals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  interface HospitalRow {
    sn: number;
    code: string;
    name: string;
    email: string;
    hospitalAddress: string;
    clinic_no: number;
    ip: string;
    date?: string | null;
    id: string | number;
  }
  // Column filters not used for search (handled manually)
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // get hospitals from redux
  const {hospitals, loading, error} = useSelector(
    (state: RootState) => state.hospitals,
  );

  // fetch once
  useEffect(() => {
    if (!hospitals || !Array.isArray(hospitals) || !hospitals.length) {
      dispatch(fetchHospitals());
    }
  }, [dispatch, hospitals]);

  // map into table data
  const mappedHospitals = useMemo(() => {
    // Ensure hospitals is an array before mapping
    if (!hospitals || !Array.isArray(hospitals)) {
      return [];
    }
    
    const base: HospitalRow[] = hospitals.map((item, index) => ({
      sn: index + 1,
      code: item.hospitalCode || '',
      name: item.hospitalName || '',
      email: item.email || '--',
      hospitalAddress: item.address || '--',
      clinic_no: Number(item.hospitalNumber) || 0,
      ip: item.hospitalAddresses
        ? item.hospitalAddresses.length > 15
          ? item.hospitalAddresses.slice(0, 15) + '...'
          : item.hospitalAddresses
        : '--',
      date: item.date,
      id: item.id,
    }));
    if (!searchTerm.trim()) return base;
    const q = searchTerm.trim().toLowerCase();
    return base.filter(h =>
      h.name.toLowerCase().includes(q) || h.code.toLowerCase().includes(q),
    );
  }, [hospitals, searchTerm]);

  const columns: ColumnDef<HospitalRow>[] = [
    {accessorKey: 'sn', header: 'S/N'},
    {accessorKey: 'code', header: 'Hospital Code'},
    {accessorKey: 'name', header: 'Hospital Name'},
    {accessorKey: 'email', header: 'Email'},
    {accessorKey: 'hospitalAddress', header: 'Hospital Address'},
    {accessorKey: 'clinic_no', header: 'No. Clinics'},
    // {accessorKey: 'ip', header: 'Ip Address'},
    {
      id: 'action',
      enableHiding: false,
      cell: ({row}) => {
        if (!row.original.id && !row.original.name) return null;
        return (
          <div
            onClick={() => navigate(`/hospitals/details/${row.original.id}`)}
            className="flex text-center justify-center text-sm whitespace-nowrap cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]"
          >
            View Details
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mappedHospitals,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: {pageIndex, pageSize},
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        <div className="lg:mx-8 mt-10 bg-white rounded-md flex flex-col mb-36">
          {/* Header */}
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-lg text-gray-800">All Hospitals</h1>
              <div className="hidden lg:block lg:w-96 lg:max-w-2xl">
                <Input
                  label="Search Hospital Name / Code"
                  placeholder="Search by name or code"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  fullWidth
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <AddHospital />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="py-2.5 w-36 rounded-md flex items-center gap-2">
                    <Download size={16} /> Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    dispatch(exportHospitals({format: 0}))
                      .unwrap()
                      .then(payload => {
                        const blob = payload.blob as Blob;
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'hospitals.csv';
                        a.click();
                        URL.revokeObjectURL(url);
                      })
                      .catch(() => {/* error handled via rejectWithValue */});
                  }}>CSV</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    dispatch(exportHospitals({format: 1}))
                      .unwrap()
                      .then(payload => {
                        const blob = payload.blob as Blob;
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'hospitals.xlsx';
                        a.click();
                        URL.revokeObjectURL(url);
                      })
                      .catch(() => {/* swallow - state can reflect error */});
                  }}>Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-10">
                Failed to load hospitals: {error}
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="flex-1 lg:px-0 lg:mt-4">
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
                          <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                              <TableCell key={cell.id}>
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
                            <div className="flex flex-col items-center gap-4">
                              <span className="font-medium">
                                You have no hospital
                              </span>
                              <span className="font-medium">
                                All your hospitals appear here
                              </span>
                              <AddHospital />
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
                    totalEntriesSize={table.getFilteredRowModel().rows.length}
                    currentPage={pageIndex + 1}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={p => setPageIndex(p - 1)}
                    onPageSizeChange={size => {
                      setPageSize(size); // update page size
                      setPageIndex(0); // reset to first page
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
