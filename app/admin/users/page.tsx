'use client';

import React, { useState } from 'react';
import AdminPageLayout from '../_components/admin-page-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useMutation, useQuery } from '@tanstack/react-query';
import { users as usersApi } from '@/services/users';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';
import Pagination from '@/components/pagination';
import { usePermission } from '@/hooks/use-permission';
import AccessDeniedFullScreen from '../_components/access-denied';
import { toastMessage } from '@/lib/custom-toast';
import { useConfirmModal } from '@/components/useConfirmationModal';
import Link from 'next/link';
import ViewUserPermissions from './_components/view-user-permssions';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [open, setOpen] = useState(false)
    const [activeUser, setActiveUser] = useState<any>(null)
    const { hasAccess, loading } = usePermission("users", "view_users");
 const { hasAccess: hasAccessToDelete } = usePermission("users", "delete_user");
    const { hasAccess: hasAccessToUpdate } = usePermission("users", "update_user");
  const {confirm, ConfirmModalElement} = useConfirmModal();
 const router = useRouter();
  const { mutateAsync: deleteUserAccount, } = useMutation({
              mutationFn: usersApi.deleteUser,
              mutationKey: ["create-user"],
            });
    const {
        data: users,
        isPending: usersPending,
        refetch
    } = useQuery({
        queryKey: ["users", search, page, limit],
        queryFn: () =>
            usersApi.getUsers({
                search,
                page,
                limit,
            }),
        select: (data: any) => data,
    });

    const handleDelete = async(id: string) => {
        if(!hasAccessToDelete) return toastMessage("error", "Error", "You don't have permission to delete user account");
        try {
          const ok = await confirm({
            title: "Delete User Account",
            description: "Are you sure you want to delete this user Account?",
            confirmText: "Delete",
            type: 'reject'
          });
          if (!ok) return;
          await deleteUserAccount({id});
          toastMessage("success", "Success", "User Account deleted successfully");
          refetch?.();
        } catch (error: any) {
          toastMessage("error", "Error", error?.response?.data?.message || "Failed to delete user account");
        }
      };

    if (loading) return <Loader />;

    if (!hasAccess) return <AccessDeniedFullScreen />;

    return (
        <AdminPageLayout>
            {ConfirmModalElement}
            {
                open && <ViewUserPermissions
                    open={open}
                    setOpen={setOpen}
                    activeUser={activeUser}
                />
            }
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Users Accounts Roles Overview ({users?.pagination?.totalItems})</h2>
                     <div>
                        <Button asChild>
                            <Link href="/admin/users/create">Create New User Account</Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                window.history.back();
                            }}
                        >
                            <ArrowLeft className="mr-2 ml-4 h-4 w-4" />
                            Back
                        </Button>
                     </div>
                </div>

                {/* Table */}
                <div className="rounded-md border bg-white">
                    {usersPending ? (
                        <Loader />
                    ) : !users?.data?.length ? (
                        <EmptyData />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Date Created</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users?.data?.map((user: any, index: number) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                ((users?.pagination?.currentPage || 1) - 1) *
                                                limit}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.email}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.phone_number}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.userType}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user?.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user?.updatedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="flex items-center justify-center gap-2">
                                            <Eye
                                                size={16}
                                                className="cursor-pointer text-slate-600 hover:text-blue-800"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setActiveUser(user);
                                                }}
                                             />
                                            <Pencil
                                            size={16}
                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                            onClick={() => {
                                              if(!hasAccessToUpdate) return toastMessage("error", "Error", "You don't have permission to update user account");
                                               sessionStorage.setItem("active-user", JSON.stringify(user));
                                              router.push(`/admin/users/create?action=edit`);
                                            }}
                                            />
                                            <Trash2
                                            size={16}
                                            className="cursor-pointer text-red-600 hover:text-red-800"
                                             onClick={() => handleDelete(user?.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {users?.pagination ? (
                    <Pagination
                        pagination={users?.pagination}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(s) => setLimit(s)}
                    />
                ) : null}
            </div>
        </AdminPageLayout>
    );
};

export default Page;