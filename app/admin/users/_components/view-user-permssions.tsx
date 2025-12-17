"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useQuery } from "@tanstack/react-query"
import { permissions } from "@/api/permissions"
import { users } from "@/api/users"
import Loader from "@/components/loader"
import { formatPermissionName } from "../create/page"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ViewUserPermissionsProps {
    open: boolean
    setOpen: (open: boolean) => void
    activeUser: {
        id?: string
        name?: string
        email?: string
        permissions?: string[]
    } | null
}

export default function ViewUserPermissions({
    open,
    setOpen,
    activeUser,
}: ViewUserPermissionsProps) {

    const {
            data: userPermissions,
            isPending: permissionsPending,
        } = useQuery({
            queryKey: ["user permissions",],
            queryFn: () =>
                users.getUserPermissions({
                    id: activeUser?.id || "",
                }),
            select: (data: any) => data?.permissions,
            enabled(query) {
                return !!activeUser?.id
            },
        });

    const groupedPermissions = userPermissions?.length && userPermissions.reduce((acc: any, permission: any) => {
        if (!acc[permission.module]) {
            acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{activeUser?.name} Permissions</DialogTitle>
                </DialogHeader>
                {
                    permissionsPending ? <Loader /> :
                         <div className="space-y-6">
                    {Object.entries(groupedPermissions).map(([module, perms]: any) => (
                        <div key={module} className="border-2  border-dotted border-slate-300  rounded-lg p-4">
                            <h3 className="font-semibold text-base mb-3 capitalize">
                                {formatPermissionName(module)}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {perms.map((permission: any) => (
                                    <div key={permission.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={permission.id}
                                            checked
                                        />
                                        <Label
                                            htmlFor={permission.id}
                                            className="text-sm font-normal cursor-pointer"
                                        >
                                            {formatPermissionName(permission.name)}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                }
            </DialogContent>
        </Dialog>
    )
}
