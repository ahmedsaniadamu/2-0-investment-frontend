"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { toastMessage } from "@/lib/custom-toast";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { investorProfile } from "@/services/profile";
import { useSessionUserId } from "@/hooks/use-session-user-id";
import { Textarea } from "@/components/ui/textarea";
import { CountryDropdown } from "@/components/ui/country-dropdown";

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\+[1-9]\d{6,14}$/, "Please enter a valid phone number with country code"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
});

export default function UpdateProfile({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const userId = useSessionUserId();
    const queryClient = useQueryClient();
    const [initialData, setInitialData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setInitialData({
                    fullName: parsedUser.name || "",
                    email: parsedUser.email || "",
                    phone: parsedUser.phone_number || "",
                    address: parsedUser.address || "",
                    country: parsedUser.country || "",
                });
            } catch (error) {
                console.error("Failed to parse user from sessionStorage", error);
            }
        }
    }, []);

    const { mutateAsync: updateProfile, isPending: updatePending } = useMutation({
        mutationFn: investorProfile.updateProfileInfo,
        mutationKey: ["update-profile"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["check-profile-status"] });
            queryClient.invalidateQueries({ queryKey: ["investorProfile"] });
        }
    });

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            try {
                await updateProfile({
                    id: userId as string,
                    data: {
                        fullName: values.fullName,
                        email: values.email,
                        phone: values.phone,
                        address: values.address,
                        country: values.country,
                    }
                });
                toastMessage("success", "Success", "Profile updated successfully!");
                onClose();
            } catch (error: any) {
                toastMessage("error", "Error", error?.response?.data?.message || "Failed to update profile");
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
            <DialogContent className="sm:max-w-md h-[94vh] overflow-y-auto bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <p className="text-sm text-gray-500">Please complete your profile to continue.</p>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Full Name"
                            value={formik.values.fullName}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed opacity-70"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formik.values.email}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed opacity-70"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                        <PhoneInput
                            id="phone"
                            defaultCountry="NG"
                            placeholder="Phone Number"
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue("phone", value)}
                            onBlur={() => formik.setFieldTouched("phone", true)}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-sm text-red-500">{formik.errors.phone}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                        <CountryDropdown
                            defaultValue={formik.values.country}
                            onChange={(country) => formik.setFieldValue("country", country.alpha3)}
                        />
                        {formik.touched.country && formik.errors.country && (
                            <p className="text-sm text-red-500">{formik.errors.country}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                        <Textarea
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={formik.touched.address && formik.errors.address ? "border-red-500" : ""}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="text-sm text-red-500">{formik.errors.address}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={updatePending || !formik.isValid} className="w-full">
                            {updatePending ? <SpinnerCustom /> : "Update Profile"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
