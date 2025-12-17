'use client';

import React from 'react';
import AdminPageLayout from '../_components/admin-page-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { permissions as permissionsApi } from '@/api/permissions';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';
import Pagination from '@/components/pagination';
import { usePermission } from '@/hooks/use-permission';
import AccessDeniedFullScreen from '../_components/access-denied';

const Page = () => {
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);

    const { hasAccess, loading } = usePermission("permissions", "view_permissions");

    const {
        data: permissions,
        isPending: permissionsPending,
        refetch
    } = useQuery({
        queryKey: ["permissions", search, page, limit],
        queryFn: () =>
            permissionsApi.getPermissions({
                search,
                page,
                limit,
            }),
        select: (data: any) => data,
    });

    if (loading) return <Loader />;

    if (!hasAccess) return <AccessDeniedFullScreen />;

    return (
        <AdminPageLayout>
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">System Permissions Overview ({permissions?.pagination?.totalItems})</h2>
                    
                    <Button
                        variant="outline"
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-md border bg-white">
                    {permissionsPending ? (
                        <Loader />
                    ) : !permissions?.data?.length ? (
                        <EmptyData />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Module</TableHead>
                                    <TableHead>Date Created</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissions?.data?.map((permission: any, index: number) => (
                                    <TableRow key={permission.id}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                ((permissions?.pagination?.currentPage || 1) - 1) *
                                                limit}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {permission?.name}
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                                {permission?.module}
                                            </span>
                                        </TableCell>
                                         
                                        <TableCell>
                                            {new Date(permission?.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(permission?.updatedAt).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {permissions?.pagination ? (
                    <Pagination
                        pagination={permissions?.pagination}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(s) => setLimit(s)}
                    />
                ) : null}
            </div>
        </AdminPageLayout>
    );
};

export default Page;