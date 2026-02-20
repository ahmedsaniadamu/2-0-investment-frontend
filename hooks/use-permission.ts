import { useEffect, useState } from "react";

type Permission = {
    module?: string;
    actions?: string[];
};

export const usePermission = (moduleName: string, action?: string) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const user = JSON.parse(sessionStorage.getItem("user") || "{}");
            setPermissions(user?.permissions || []);
        } catch {
            setPermissions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const permission = permissions.find(
        (p) => p?.module?.toLowerCase().includes(moduleName.toLowerCase())
    );


    const hasAccess = action
        ? permissions.find(
            (p: any) => p?.name?.toLowerCase().includes(action.toLowerCase())
        ) ? true : false
        : Boolean(permission);

    return {
        loading,
        hasAccess,
        permission,
    };
};
