import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Loader from "@/components/loader";
import { adminPlans } from "@/services/plan";
import { useMutation } from "@tanstack/react-query";
import { toastMessage } from "@/lib/custom-toast";

export default function CreatePlanModal({ open, setOpen, refetch }:{
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    refetch?: () => void
}) {

 const { mutateAsync: createPlan, isPending: createPending } = useMutation({
        mutationFn: adminPlans.createPlan,
        mutationKey: ["create-plan"],
      });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      minDeposit: "",
      maxDeposit: "",
      roi: "",
    },
     validationSchema: Yup.object({
        name: Yup.string().required("Name is required"),

        description: Yup.string()
            .required("Description is required")
            .max(200, "Description too long"),

        minDeposit: Yup.number()
            .typeError("Must be a number")
            .required("Minimum deposit is required")
            .min(1, "Must be at least 1"),

        maxDeposit: Yup.number()
            .typeError("Must be a number")
            .required("Maximum deposit is required")
            .moreThan(Yup.ref("minDeposit"), "Max must be greater than min"),

        roi: Yup.string()
            .required("ROI is required")
            .matches(
            /^[0-9]+-[0-9]+%$/,
            "ROI must be in the format 2-5% (e.g., 3-7%)"
            ),
        }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await createPlan(values);
        toastMessage("success", "Success", res?.message || 'Plan created successfully');
         refetch?.();
        resetForm();
        setOpen(false);
      } catch (err) {
        console.error(err);
      }  
      finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md h-[96vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create New Plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Seed Starter"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Entry-level plan for new or cautious investors"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm">{formik.errors.description}</p>
                )}
              </div>

              <div>
                <Label>Min Deposit</Label>
                <Input
                  name="minDeposit"
                  type="number"
                  value={formik.values.minDeposit}
                  onChange={formik.handleChange}
                  placeholder="100"
                />
                {formik.touched.minDeposit && formik.errors.minDeposit && (
                  <p className="text-red-500 text-sm">{formik.errors.minDeposit}</p>
                )}
              </div>

              <div>
                <Label>Max Deposit</Label>
                <Input
                  name="maxDeposit"
                  type="number"
                  value={formik.values.maxDeposit}
                  onChange={formik.handleChange}
                  placeholder="500"
                />
                {formik.touched.maxDeposit && formik.errors.maxDeposit && (
                  <p className="text-red-500 text-sm">{formik.errors.maxDeposit}</p>
                )}
              </div>

              <div>
                <Label>ROI</Label>
                <Input
                  name="roi"
                  value={formik.values.roi}
                  onChange={formik.handleChange}
                  placeholder="2-5%"
                />
                {formik.touched.roi && formik.errors.roi && (
                  <p className="text-red-500 text-sm">{formik.errors.roi}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={formik.isSubmitting || createPending} className="w-full">
            {formik.isSubmitting || createPending ? (
              <span className="flex items-center gap-2">
                <Loader />
              </span>
            ) : (
              "Create Plan"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
