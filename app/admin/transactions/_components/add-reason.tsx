'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query"
import { toastMessage } from "@/lib/custom-toast";
import { adminTransactions } from "@/services/transaction"
import { SpinnerCustom } from "@/components/ui/spinner"

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
})

interface addReasonModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    id: string,
    refetch: any,
    refetchSummary: any,
}

const addReasonModal = ({
    open,
    setOpen,
    id,
    refetch,
    refetchSummary
}: addReasonModalProps) => {

    const { mutateAsync: addReason, isPending } = useMutation({
    mutationFn: adminTransactions.reviewTransaction,
    mutationKey: ["state-reason"],
  });

    const formik = useFormik({
        initialValues: {
            reason: ""
        },
        validationSchema: Yup.object().shape({
            reason: Yup.string().required("Reason is required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await addReason({
                    reason: values.reason,
                    status: 'rejected',
                    id
                })

                toastMessage('success', "Success",
                'Transaction rejected successfully'
                )
                refetch()
                refetchSummary()
                setOpen(false)
            } catch (error: any) {
                toastMessage( 'error','Error', error?.response?.data?.message)
            }  
        }
    })

    const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Add reson for rejecting transaction...',
      height: 300,
      width: 750
    }),
    []
  );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[800px] w-full  max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Reason</DialogTitle>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Reason Field */}
                    <div className="space-y-2 ">  
                        <JoditEditor
                            value={formik.values.reason}
                            config={config}
                            onBlur={(content) => {
                                formik.setFieldTouched("reason", true)
                                formik.setFieldValue("reason", content)
                            }}
                        />
                        {formik.touched.reason && formik.errors.reason && (
                            <p className="text-red-500 text-sm">{formik.errors.reason}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? <SpinnerCustom /> : "Submit"}
                        </Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default addReasonModal
