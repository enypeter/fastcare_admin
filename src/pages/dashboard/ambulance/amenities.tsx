import {DashboardLayout} from '@/layout/dashboard-layout';
import {useState, useMemo, useEffect} from 'react';

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
import CreateAmenities from '@/components/form/ambulance/amenities/create-amenities';
import EditAmenities from '@/components/form/ambulance/amenities/edit-amenities';
import { Trash } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/services/store';
import { fetchAmenities } from '@/services/thunks';


//import {ProviderFilter} from '@/features/modules/providers/filter';

// const amenities = [
//   {
//     id: '1',
//     name: 'Name',
//     type: 'Defibrillator',
//     serial: 'UYgh123456u8k',
//     date: '2023-01-01',
//     action: '',
//   }
 
 
// ];

const Amenities = () => {
  //   const [searchTerm, setSearchTerm] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Fixed: Properly typed Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const { amenities, loading, error } = useSelector((state: RootState) => state.amenities);

  const providerId = useSelector((state: RootState) => state.auth.user?.id); 

  useEffect(() => {
    if(!amenities.length && providerId){
      dispatch(fetchAmenities(providerId));
    }
  }, [dispatch, amenities.length, providerId]);

  //   const filteredProviders = hospitals.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );

  const totalPages = Math.ceil(amenities.length / pageSize);
  const paginatedProviders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return amenities.slice(start, start + pageSize);
  }, [amenities, page, pageSize]); // Added pageSize to dependencies

  // Fixed: Properly typed columns based on your amenities data structure
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'equipmentName', // Changed from 'name' to match your type
      header: 'Equipment Name', // Fixed capitalization
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    // {
    //   accessorKey: 'serial',
    //   header: 'Serial Number',
    // },
    {
      id: 'action',
      header: 'Action',
      enableHiding: false,
      cell: ({row}) => {
        // Check if row is empty - updated to match your data structure
        const isEmptyRow = !row.original.equipmentName && !row.original.description;

        if (isEmptyRow) {
          return null; // nothing rendered for empty row
        }
        return (
          <div className="flex items-center gap-4">
            <div>
              <EditAmenities data={row.original} />
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

  // Function to apply filters from FilterDialog
  //   const handleApplyFilter = (filters: any) => {
  //     const newFilters: any[] = [];
  //     if (filters.status) newFilters.push({id: 'status', value: filters.status});
  //     if (filters.location)
  //       newFilters.push({id: 'location', value: filters.location});
  //     if (filters.ranking)
  //       newFilters.push({id: 'ranking', value: filters.ranking});
  //     if (filters.date) newFilters.push({id: 'date', value: filters.date}); // make sure your data has a 'date' field
  //     setColumnFilters(newFilters);
  //   };
  // Function to reset filters
  //   const handleResetFilter = () => {
  //     setColumnFilters([]);
  //   };

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          Loading amenities...
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500 p-4 text-center">
          Error: {error}
        </div>
      </DashboardLayout>
    );
  }

  if(!providerId){
  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full ">
        <div className="lg:mx-8 mt-10 bg-white  rounded-md flex flex-col h-[500px] mb-36">
          <div className="flex flex-wrap gap-4 justify-between items-center p-6">
            <div className="flex items-center gap-8">
              <h1 className="text-xl text-gray-800">All Amenities</h1>

              {/* <input
                type="text"
                placeholder="Search hospital"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border rounded-lg hidden lg:block px-4 py-2 lg:w-96 lg:max-w-2xl focus:outline-none"
              /> */}
            </div>
            <div className="flex gap-4 items-center">
              <CreateAmenities />
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
                          key={cell.id} // Moved key here and removed fragment
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
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="font-medium">
                          No ambulance amenities found
                        </span>
                        <span className="font-medium">
                          All added amenities appear here
                        </span>
                        <CreateAmenities />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination stuck at bottom */}
          <div className="p-4 flex items-center justify-end">
            <Pagination
              totalEntriesSize={amenities.length}
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
  }

};

export default Amenities;