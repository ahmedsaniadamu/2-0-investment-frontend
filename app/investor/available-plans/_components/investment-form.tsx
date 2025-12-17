"use client"

import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format, addMonths } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { toastMessage } from "@/lib/custom-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SpinnerCustom } from "@/components/ui/spinner"
import { investorInvestments } from "@/services/investment"
import { useMutation } from "@tanstack/react-query"
import { useSessionUserId } from "@/hooks/use-session-user-id"
import { formatNumberWithCommas } from "@/lib/format-number"

const InvestmentForm: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  open: boolean, activePlan: any, setActivePlan: any
}> = ({
  setOpen, open, activePlan, setActivePlan
}) => {

  const userId = useSessionUserId();
  const [withdrawalDate, setWithdrawalDate] = useState<string | null>(null)
  const { mutateAsync: initiateInvestment, isPending } = useMutation({
    mutationFn: investorInvestments.initiateInvestment,
    mutationKey: ["initiate-investment"],
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      paymentMethod: "",
      startDate: null as Date | null,
      investmentGoal: "",
      agreement: false,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .min(parseFloat(activePlan?.minDeposit), `Minimum investment is $${formatNumberWithCommas(activePlan?.minDeposit)}`)
        .required("Amount is required"),
      paymentMethod: Yup.string().required("Select a payment method"),
      startDate: Yup.date().nullable().required("Select a start date"),
      investmentGoal: Yup.string()
        .min(5, "Goal must be at least 5 characters")
        .required("Please describe your investment goal"),
      agreement: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    onSubmit: async(values) => {
      try{
        const payload = {
          amount: values.amount,
          paymentMethod: values.paymentMethod,
          startDate: values.startDate,
          investmentGoal: values.investmentGoal,
          agreement: values.agreement,
          planId: activePlan?.id,
          investorId: userId as string
        }
        const res = await initiateInvestment(payload);
        toastMessage("success", 
        `You invested $${values.amount} via ${values.paymentMethod}.`,
        `Payment is under review. you will be nofitied once approved.`
        )
        setTimeout(() => {
          setOpen(false)
          setActivePlan(null)
        }, 2000);

      } catch (error: any) {
        toastMessage("error", "Error", error?.response?.data?.message || "Failed to initiate investment"); 
      }
    },
  })

  // Automatically calculate expected withdrawal date (1 year after start)
  useEffect(() => {
    if (formik.values.startDate) {
      const endDate = addMonths(formik.values.startDate, 12)
      setWithdrawalDate(format(endDate, "PPP"))
    } else {
      setWithdrawalDate(null)
    }
  }, [formik.values.startDate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] w-full bg-white  max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Make Investment (Fill the form to proceed)</DialogTitle>
                </DialogHeader>
    <form onSubmit={formik.handleSubmit} className="space-y-6 bg-white">
      {/* Amount */}
      <div>
        <Label>Amount ($)</Label>
        <Input
          type="number"
          placeholder="Enter amount"
          {...formik.getFieldProps("amount")}
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <Label>Payment Method</Label>
        <Select
          onValueChange={(value) => formik.setFieldValue("paymentMethod", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wallet">Wallet</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="interswitch">Card (Interswitch)</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</p>
        )}
      </div>

      {/* Start Date */}
          <div>
            <Label>Start Date</Label>
            <Input
              type="date"
              className="w-full"
              min={format(new Date(), "yyyy-MM-dd")} 
              value={
                formik.values.startDate
                  ? format(formik.values.startDate, "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null
                formik.setFieldValue("startDate", date)
              }}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
            )}
          </div>

      {/* Expected Withdrawal Date */}
      {withdrawalDate && (
        <div className="bg-blue-50 border rounded-md p-3 mt-2">
          <p className="text-sm text-gray-700">
            <strong>Expected Withdrawal Date:</strong> {withdrawalDate}
          </p>
        </div>
      )}

      {/* Investment Goal */}
      <div>
        <Label>Investment Goal</Label>
        <Input
          type="text"
          placeholder="E.g., Save for property, earn steady ROI..."
          {...formik.getFieldProps("investmentGoal")}
        />
        {formik.touched.investmentGoal && formik.errors.investmentGoal && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.investmentGoal}</p>
        )}
      </div>

      {/* Agreement Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreement"
          checked={formik.values.agreement}
          onCheckedChange={(checked) =>
            formik.setFieldValue("agreement", checked)
          }
        />
        <Label htmlFor="agreement" className="text-sm text-gray-700">
          I agree to the terms and risk disclaimer
        </Label>
      </div>
      {formik.touched.agreement && formik.errors.agreement && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.agreement}</p>
      )}
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
                  {isPending ? <SpinnerCustom /> : "Initiate Investment"}
              </Button>
          </div>
    </form>
            </DialogContent>
        </Dialog>
  )
}

export default InvestmentForm
