import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';

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

import { X, Edit2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/services/store';
import { fetchAdminUsers, updateAdminUser, toggleAdminUserActive, fetchRoles } from '@/services/thunks';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loading';
import {Trash} from 'lucide-react';
import AddUser from '@/components/form/settings/add-user';
import NewRole from '@/components/form/settings/new-role';
import GenerateCode from '@/components/form/settings/generate-code';


//import {ProviderFilter} from '@/features/modules/providers/filter';

interface AdminRow {
  id: string;
  name: string;
  email: string;
  role: string; // first role assigned (or '-')
  date: string; // last login formatted
  isActive: boolean;
}

const UserRole = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, updating, toggling } = useSelector((s: RootState) => s.adminUsers);
  const { roles, rolesLoading } = useSelector((s: RootState) => s.account);
  // pagination could be added later; currently server fetch default page

  useEffect(() => {
    dispatch(fetchAdminUsers(undefined));
  }, [dispatch]);

  useEffect(() => {
    if (!roles) dispatch(fetchRoles());
  }, [roles, dispatch]);

  const mapped: AdminRow[] = useMemo(() => (
    users.map(u => ({
      id: u.id,
      name: u.name || '-',
      email: u.email || '-',
      role: (u.roleAssigned && u.roleAssigned[0]) || '-',
      date: u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '-',
      isActive: u.isActive,
    }))
  ), [users]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<{ id: string; value: unknown }[]>([]);
  

  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AdminRow | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');

  const openEdit = (row: AdminRow) => {
    setSelectedRow(row);
    setEditName(row.name);
    setEditEmail(row.email);
    setEditRole(row.role);
    setEditOpen(true);
  };

  const submitEdit = () => {
    if (!selectedRow) return;
    dispatch(updateAdminUser({ id: selectedRow.id, name: editName, email: editEmail, role: editRole }))
      .unwrap()
      .then(() => setEditOpen(false))
      .catch(() => {/* errors reflected in slice */});
  };

  const toggleActive = (row: AdminRow) => {
    dispatch(toggleAdminUserActive({ userId: row.id, activate: !row.isActive }));
  };


  const columns: ColumnDef<AdminRow>[] = [
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
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ getValue }) => {
        const active = getValue() as boolean;
        return <span className={`px-2 py-1 rounded-md text-sm font-medium ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{active ? 'Active' : 'Inactive'}</span>;
      }
    },

    {
      id: 'action',

      enableHiding: false,
      cell: ({row}) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => openEdit(row.original)}
            className="flex text-center w-20 justify-center cursor-pointer font-semibold items-center gap-2 bg-[#E4F1FC] p-2 rounded-md text-[#135E9B]"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <div
            onClick={() => { setSelectedRow(row.original); setOpenDeactivate(true); }}
            className={`flex text-center w-32 justify-center cursor-pointer font-semibold items-center gap-2 p-2 rounded-md ${row.original.isActive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}
          >
            <Trash className="w-4 h-4" /> {row.original.isActive ? 'Deactivate' : 'Activate'}
          </div>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: mapped,
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

  const hasData = mapped.length > 0;

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
                <h1 className="text-lg text-gray-800">Teammates</h1>
              </div>

              <GenerateCode />
            </div>

            <div className="flex-1 overflow-auto lg:px-0 lg:mt-2">
              <Table className="min-w-[900px]">
                <TableHeader className="border-y border-[#CDE5F9]">
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableHead className="px-10" key={header.id}>
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
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex justify-center"><Loader height="h-16" /></div>
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && table.getRowModel().rows.length > 0 && (
                    table.getRowModel().rows.map(row => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map(cell => (
                          <TableCell
                            key={cell.id}
                            className={cell.column.id === 'actions' ? 'text-right px-24' : 'px-10'}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                  {!loading && table.getRowModel().rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">No teammates yet</span>
                          <span className="font-medium">All your teammates appear here</span>
                          <Button className="py-3">Add User</Button>
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

          {/* Edit User Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader className="flex w-full items-center justify-between">
                <DialogTitle className="flex w-full items-center justify-between border-b py-2">
                  <span className="text-gray-800 text-xl font-normal py-1">Edit User</span>
                  <button onClick={() => setEditOpen(false)} type="button" className="p-1 border border-gray-300 rounded-full hover:bg-gray-100"><X className="w-5 h-5 text-primary" /></button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700">Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 outline-none" placeholder="Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700">Email</label>
                  <input value={editEmail} onChange={e => setEditEmail(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 outline-none" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-700">Role</label>
                  {rolesLoading ? <span className="text-xs text-gray-500">Loading roles...</span> : (() => {
                    const rolesArray = Array.isArray(roles) ? roles : (roles?.data && Array.isArray(roles.data) ? roles.data : []);
                    return (
                      <select value={editRole} onChange={e => setEditRole(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 outline-none">
                        <option value="" disabled>Select role</option>
                        {rolesArray.map((r: unknown) => {
                          const raw = r as Record<string, unknown>;
                          const val = typeof r === 'string' ? r : (raw.role as string) || (raw.name as string) || '';
                          const key = typeof r === 'string' ? r : (raw.role as string) || (raw.id as string) || (raw.name as string) || val;
                          return <option key={key} value={val}>{val}</option>;
                        })}
                      </select>
                    );
                  })()}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <Button variant="ghost" type="button" onClick={() => setEditOpen(false)}>Cancel</Button>
                <Button type="button" disabled={updating} onClick={submitEdit}>{updating ? 'Saving...' : 'Save'}</Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Activate/Deactivate Confirmation */}
          <Dialog open={openDeactivate} onOpenChange={setOpenDeactivate}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="border-b py-2 text-lg font-medium">{selectedRow?.isActive ? 'Deactivate User' : 'Activate User'}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-600 mt-4">Are you sure you want to {selectedRow?.isActive ? 'deactivate' : 'activate'} this user?</p>
              <div className="flex justify-end gap-3 pt-6">
                <Button variant="ghost" onClick={() => setOpenDeactivate(false)}>Cancel</Button>
                <Button
                  variant={selectedRow?.isActive ? 'destructive' : 'default'}
                  disabled={toggling}
                  onClick={() => { if (selectedRow) { toggleActive(selectedRow); setOpenDeactivate(false); } }}
                >
                  {toggling ? 'Processing...' : 'Confirm'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default UserRole;
