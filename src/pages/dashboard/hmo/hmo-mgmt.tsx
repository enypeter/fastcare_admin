import { DashboardLayout } from "@/layout/dashboard-layout"
import { Button } from "@/components/ui/button";
import { Edit2Icon, InfoIcon, MoreVertical, PlusCircleIcon } from "lucide-react";


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
import { useMemo, useState } from "react";
import { HmoFilter } from "@/features/modules/hmo/filter";
import { Pagination } from "@/components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CreateHMO from "@/components/form/hmo/create-hmo";
import EditHMO from "@/components/form/hmo/edit-hmo-details";
import HMODetails from "@/features/modules/hmo/hmo-details";



const hmosData = [
    {
        id: '1',
        name: 'Xy1234Zq',
        code: '128892HMO',
        admin: 'Mariam',
        email: 'mariam.alamina@hmo.com',
        phone: '0593847567',
        status: 'Active',
        date: '2023/02/10',
        action: '',
    },
    {
        id: '2',
        name: 'Xy1234Zq',
        code: '128892HMO',
        admin: 'Mariam',
        email: 'mariam.alamina@hmo.com',
        phone: '0593847567',
        status: 'Active',
        date: '2023/02/10',
        action: '',
    },

    {
        id: '3',
        name: 'Xy1234Zq',
        code: '128892HMO',
        admin: 'Mariam',
        email: 'mariam.alamina@hmo.com',
        phone: '0593847567',
        status: 'Active',
        date: '2023/02/10',
        action: '',
    },

    {
        id: '4',
        name: 'Xy1234Zq',
        code: '128892HMO',
        admin: 'Mariam',
        email: 'mariam.alamina@hmo.com',
        phone: '0593847567',
        status: 'Active',
        date: '2023/02/10',
        action: '',
    },

    {
        id: '5',
        name: 'Xy1234Zq',
        code: '128892HMO',
        admin: 'Mariam',
        email: 'mariam.alamina@hmo.com',
        phone: '0593847567',
        status: 'Active',
        date: '2023/02/10',
        action: '',
    },




];

const HMOMgmt = () => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [columnFilters, setColumnFilters] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedHmo, setSelectedHmo] = useState<any | null>(null);

    const totalPages = Math.ceil(hmosData.length / pageSize);
    const paginatedhmos = useMemo(() => {
        const start = (page - 1) * pageSize;
        return hmosData.slice(start, start + pageSize);
    }, [hmosData, page]);



    const columns: ColumnDef<any>[] = [

        {
            accessorKey: 'name',
            header: 'HMO Name',
        },
        {
            accessorKey: 'code',
            header: 'HMO Code',
        },

        {
            accessorKey: 'admin',
            header: 'Admin Name',
        },
        {
            accessorKey: 'email',
            header: 'Admin Email',
        },
        {
            accessorKey: 'phone',
            header: 'Admin Phone',

        },

        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'date',
            header: 'Created Date',
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
                                        setSelectedHmo(row.original)
                                        setOpenDetails(true)
                                    }}
                                >
                                    <InfoIcon className="text-neutral-600" />
                                    View details
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedHmo(row.original)
                                        setOpenEdit(true)
                                    }}
                                >
                                    <Edit2Icon className="text-neutral-600" />
                                    Edit
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                );
            },
        },




    ];

    const table = useReactTable({
        data: paginatedhmos,
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
        if (filters.status) newFilters.push({ id: "status", value: filters.status });
        if (filters.date) newFilters.push({ id: "date", value: filters.date }); // make sure your data has a 'date' field
        setColumnFilters(newFilters);
    };
    // Function to reset filters
    const handleResetFilter = () => {
        setColumnFilters([]);
    };



    return (
        <DashboardLayout>
            <div className="bg-gray-100 overflow-scroll h-full">
                <div className="lg:mx-8 mt-10 bg-white mb-10 rounded-md flex flex-col h-[670px]">
                    <div className="flex justify-between items-center p-6">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl text-gray-800">All HMO's</h1>

                            <HmoFilter
                                onApply={handleApplyFilter}
                                onReset={handleResetFilter}
                            />
                        </div>
                        <div className="flex gap-4 items-center">
                            <Button onClick={() => setOpen(true)} className="py-3">
                                <PlusCircleIcon size={30} />
                                Create New HMO
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto px-6 mt-10">
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
                                        ></TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination stuck at bottom */}
                    <div className="p-4 flex items-center justify-end">
                        <Pagination
                            totalEntriesSize={hmosData.length}
                            currentEntriesSize={paginatedhmos.length}
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

            <CreateHMO
                open={open}
                setOpen={setOpen}

            />
            <EditHMO
                open={openEdit}
                setOpen={setOpenEdit}
                data={selectedHmo}

            />

            <HMODetails
                open={openDetails}
                setOpen={setOpenDetails}
                data={selectedHmo}

            />
        </DashboardLayout>
    );
}

export default HMOMgmt
