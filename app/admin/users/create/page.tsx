"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminPageLayout from "../../_components/admin-page-layout";
import Loader from "@/components/loader";
import AccessDeniedFullScreen from "../../_components/access-denied";
import { usePermission } from "@/hooks/use-permission";
import { toastMessage } from "@/lib/custom-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { users } from "@/api/users";
import { permissions as permissionsApi } from '@/api/permissions';
import { useRouter, useSearchParams } from "next/navigation";
import { SpinnerCustom } from "@/components/ui/spinner";

// Types
interface UserDetails {
    name: string;
    email: string;
    password: string;
    userType: string;
    phone_number: string;
}

interface Permission {
    id: string;
    name: string;
    module: string;
    createdAt: string;
    updatedAt: string;
}

interface AssignPermissions {
    permissionIds: string[];
}

export const formatPermissionName = (name: string): string => {
    return name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

// Validation schemas
const userDetailsSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
        .required("Password is required"),
    userType: Yup.string().required("User type is required"),
    phone_number: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .required("Phone number is required"),
});

const permissionsSchema = Yup.object().shape({
    permissionIds: Yup.array()
        .of(Yup.string())
        .min(1, "At least one permission must be selected"),
});

export default function CreateUserAccount() {
    const [currentStep, setCurrentStep] = useState(1);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [createdUserId, setCreatedUserId] = useState<string | null>(null);
    const { hasAccess, loading: loadingPermissions } = usePermission("users", "create_user");
    const searchParams = useSearchParams();
    const isEdit = searchParams.get("action") === "edit";
    const {push} = useRouter();
    const {
        data: permissions,
        isPending: permissionsPending,
    } = useQuery({
        queryKey: ["permissions",],
        queryFn: () =>
            permissionsApi.getPermissions({
                search: '',
                page: 1,
                limit: 10000,
            }),
        select: (data: any) => data?.data,
    });

    const { mutateAsync: createUser, } = useMutation({
            mutationFn: users.createUser,
            mutationKey: ["create-user"],
          });
    
       const { mutateAsync: assignUserPermissions, } = useMutation({
            mutationFn: users.assignPermissionsToUser,
            mutationKey: ["assign-permissions"],
          });
    
    const { mutateAsync: updateUserPermissions, } = useMutation({
        mutationFn: users.updateUserPermissions,
        mutationKey: ["update-user-permissions"],
    });

    useEffect(() => {
        document.querySelectorAll('*').forEach((e:any) => {
          e.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        })
    }, [currentStep]);

    const groupedPermissions = permissions?.length && permissions.reduce((acc: any, permission: any) => {
        if (!acc[permission.module]) {
            acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const handleUserDetailsSubmit = async (values: UserDetails) => {
        setLoading(true);
        try {
            const response =  await createUser(
            isEdit ?  
                    values.password === 'defaultPassword123@' ?
                    {
                        ...values,
                        password: null
                    } : values
            : values);
           setCreatedUserId(response?.user?.id);  
           setUserDetails(values);
           toastMessage('success', 'Success', isEdit ? 'User account updated successfully.' : 'User account created successfully, they will receive an email onbaording email with their credentials.');
          setCurrentStep(2);
        } catch (error: any) {
             toastMessage('error', 'Error', error?.response?.data?.message || 'Failed to create user account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionsSubmit = async (values: AssignPermissions) => {
        setLoading(true);
        try {
            let response;
            if (isEdit) {
                response =  await updateUserPermissions({ permissionIds: values.permissionIds, userId: createdUserId as string  });
            } else {
              response =  await assignUserPermissions({ permissionIds: values.permissionIds, userId: createdUserId as string });
            }
            toastMessage("success", "Success", response?.message || "Permissions assigned successfully.");              
             push('/admin/users');
        } catch (error: any) {
            toastMessage("error", "Error", error?.response?.data?.message || "Failed to assign permissions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingPermissions) return <Loader />;
    
        if (!hasAccess) return <AccessDeniedFullScreen />;

    const progressPercentage = (currentStep / 2) * 100;

    return (
        <AdminPageLayout>
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create New User Account</CardTitle>
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium">Template Progress</span>
                                <span className="text-sm font-medium">{progressPercentage}%</span>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Step Indicator */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 1
                                        ? "bg-primary text-white"
                                        : "bg-green-500 text-white"
                                        }`}
                                >
                                    1
                                </div>
                                <div className="ml-3 text-left">
                                    <div className="text-sm font-semibold">Step 1</div>
                                    <div className="text-xs text-gray-600">User Details</div>
                                </div>
                            </div>

                            <div className="w-32 h-1 bg-gray-300 mx-4"></div>

                            <div className="flex items-center">
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep === 2
                                        ? "bg-primary text-white"
                                        : "bg-gray-300 text-gray-600"
                                        }`}
                                >
                                    2
                                </div>
                                <div className="ml-3 text-left">
                                    <div className="text-sm font-semibold">Step 2</div>
                                    <div className="text-xs text-gray-600">Assign Permissions</div>
                                </div>
                            </div>
                        </div>

                        {/* Step 1: User Details */}
                        {currentStep === 1 && (
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    password: "",
                                    userType: "",
                                    phone_number: "",
                                }}
                                validationSchema={userDetailsSchema}
                                onSubmit={handleUserDetailsSubmit}
                            >
                                {({ errors, touched, setFieldValue, values }) =>{
                                    useEffect(() => {
                                        if (isEdit) {
                                            const user = JSON.parse(sessionStorage.getItem('active-user') as string);
                                            if(user){
                                                setFieldValue('name', user?.name);
                                                setFieldValue('email', user?.email);
                                                setFieldValue('password', 'defaultPassword123@');
                                                setFieldValue('userType', user?.userType);
                                                setFieldValue('phone_number', user?.phone_number);
                                            }
                                        }
                                    }, [isEdit])
                                    return (
                                    <Form className="space-y-6">
                                        <div>
                                            <Label htmlFor="name">
                                                Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="name"
                                                name="name"
                                                placeholder="Enter full name"
                                                className={errors.name && touched.name ? "border-red-500" : ""}
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="email">
                                                Email <span className="text-red-500">*</span>
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                className={errors.email && touched.email ? "border-red-500" : ""}
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="password">
                                                Password <span className="text-red-500">*</span>
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter password"
                                                className={errors.password && touched.password ? "border-red-500" : ""}
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="userType">
                                                Account Role <span className="text-red-500">*</span>
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="userType"
                                                name="userType"
                                                type="text"
                                                placeholder="e.g Accountant"
                                                className={
                                                    errors.phone_number && touched.phone_number ? "border-red-500" : ""
                                                }
                                            />
                                            <ErrorMessage
                                                name="userType"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="phone_number">
                                                Phone Number <span className="text-red-500">*</span>
                                            </Label>
                                            <Field
                                                as={Input}
                                                id="phone_number"
                                                name="phone_number"
                                                placeholder="+2348012345678"
                                                className={
                                                    errors.phone_number && touched.phone_number ? "border-red-500" : ""
                                                }
                                            />
                                            <ErrorMessage
                                                name="phone_number"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="submit" className="bg-primary hover:bg-orange-600 px-16" disabled={loading}>
                                                {loading ? <SpinnerCustom /> : "Save Changes"}
                                            </Button>
                                        </div>
                                    </Form>
                                )}}
                            </Formik>
                        )}

                        {/* Step 2: Assign Permissions */}
                        {currentStep === 2 ?
                          permissionsPending ? 
                           <Loader />
                          : 
                                <Formik
                                    initialValues={{
                                        permissionIds: [],
                                    }}
                                    validationSchema={permissionsSchema}
                                    onSubmit={handlePermissionsSubmit}
                                >
                                    {({ values, setFieldValue, errors, touched }: any) => {
                                       
                                       const [activeUser, setActiveUser] = useState<any>(null); 

                                        useEffect(() => {
                                            if (isEdit) {
                                                const user = JSON.parse(sessionStorage.getItem("active-user") || "");
                                                setActiveUser(user);
                                            }
                                        }, [])
                                        console.log(activeUser, 'user');
                                        
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
                                            enabled: !!isEdit && !!activeUser?.id,
                                        });

                                        useEffect(() => {
                                            if(isEdit && userPermissions?.length) {
                                                setFieldValue("permissionIds", userPermissions.map((permission: any) => permission?.id))
                                            }
                                        }, [userPermissions])

                                        if(isEdit && !activeUser && permissionsPending) return <Loader />

                                        return (
                                            <Form className="space-y-6">
                                                <div>
                                                    <Label className="text-lg font-semibold mb-4 block">
                                                        Assign Permissions <span className="text-red-500">*</span>
                                                    </Label>
                                                    <div className="space-y-6">
                                                        {Object.entries(groupedPermissions).map(([module, perms]: any) => (
                                                            <div key={module} className="border-2  border-dotted border-primary  rounded-lg p-4">
                                                                <h3 className="font-semibold text-base mb-3 capitalize">
                                                                    {formatPermissionName(module)}
                                                                </h3>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    {perms.map((permission: any) => (
                                                                        <div key={permission.id} className="flex items-center space-x-2">
                                                                            <Checkbox
                                                                                id={permission.id}
                                                                                checked={values.permissionIds.includes(permission?.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    if (checked) {
                                                                                        setFieldValue("permissionIds", [
                                                                                            ...values.permissionIds,
                                                                                            permission.id,
                                                                                        ]);
                                                                                    } else {
                                                                                        setFieldValue(
                                                                                            "permissionIds",
                                                                                            values.permissionIds.filter(
                                                                                                (id: any) => id !== permission.id
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                }}
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
                                                    {errors.permissionIds && touched.permissionIds && (
                                                        <div className="text-red-500 text-sm mt-2">{errors.permissionIds}</div>
                                                    )}
                                                </div>

                                                <div className="flex justify-end">
                                                    {/* <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setCurrentStep(1)}
                                                >
                                                    Back
                                                </Button> */}
                                                    <Button type="submit" className="bg-primary hover:bg-orange-600 px-16" disabled={loading}>
                                                        {loading ? <SpinnerCustom /> : "Save Changes"}
                                                    </Button>
                                                </div>
                                            </Form> 
                                        )
                                    }}
                                </Formik>
                        : null}
                    </CardContent>
                </Card>
            </div>
        </AdminPageLayout>
    );
}