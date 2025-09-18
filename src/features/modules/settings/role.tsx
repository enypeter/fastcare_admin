import {useState} from 'react';
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

//import {Pagination} from '@/components/ui/pagination';

import UpdateService from '@/components/form/settings/update-service';

import Deactivate from '../hospital/deactivate';
import {Trash} from 'lucide-react';
import AddUser from '@/components/form/settings/add-user';
import NewRole from '@/components/form/settings/new-role';
import GenerateCode from '@/components/form/settings/generate-code';

//import {ProviderFilter} from '@/features/modules/providers/filter';

const service = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    date: '24/10/2020',
    action: '',
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
    date: '24/10/2020',
    action: '',
  },
];

const UserRole = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  //const [page, setPage] = useState(1);
  //const [pageSize, setPageSize] = useState(10);

  const [open, setOpen] = useState(false);

  //   const totalPages = Math.ceil(users.length / pageSize);
  //   const paginatedProviders = useMemo(() => {
  //     const start = (page - 1) * pageSize;
  //     return users.slice(start, start + pageSize);
  //   }, [users, page]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },

    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Role assigned',
    },
    {
      accessorKey: 'date',
      header: 'Last login',
    },

    {
      id: 'action',

      enableHiding: false,
      cell: ({row}) => {
        // Check if row is empty
        const isEmptyRow = !row.original.id && !row.original.name;

        if (isEmptyRow) {
          return null; // nothing rendered for empty row
        }
        return (
          <div className="flex items-center gap-4">
            <UpdateService data={row.original} />

            <div
              onClick={() => setOpen(true)}
              className="flex text-center w-36  justify-center cursor-pointer font-semibold items-center gap-2 bg-red-100 p-2 rounded-md text-red-600"
            >
              <Trash className="w-4 h-4" />
              Remove
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: service,
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

  const hasData = service.length > 0;

  return (
    <div>
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-[70vh] ">
          <p className="text-lg font-semibold text-gray-800">
            You have no service settings
          </p>
          <p className="text-gray-500 mt-2">
            All registered users appears here
          </p>
        </div>
      ) : (
        <div>
          <div className=" bg-white  rounded-md flex flex-col ">
            <div className="flex flex-wrap gap-4 justify-between items-center p-6">
              <div className="flex items-center gap-8">
                <h1 className="text-xl text-gray-800">Teammates</h1>
              </div>

              <GenerateCode />
            </div>

            <div className="flex-1 overflow-auto lg:px-0 lg:mt-2">
              <Table className="min-w-[600px]">
                <TableHeader className="border-y border-[#CDE5F9]">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead className="px-16" key={header.id}>
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
                                cell.column.id === 'actions'
                                  ? 'text-right px-24'
                                  : 'px-16'
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
                          <span className="font-medium">
                            You have no provider yet
                          </span>
                          <span className="font-medium">
                            All your registered providers appears here
                          </span>
                          <Button className="py-3">Add Hospital</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className=' p-6 mt-10 space-x-6'> 
                <AddUser />
                
                <NewRole />
            
            </div>
          </div>

          <Deactivate open={open} setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default UserRole;
