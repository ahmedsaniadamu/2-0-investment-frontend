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

const InvestmentForm: React.FC<{setOpen: React.Dispatch<React.SetStateAction<boolean>>}> = ({
  setOpen,
}) => {
  const [withdrawalDate, setWithdrawalDate] = useState<string | null>(null)

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
        .min(5000, "Minimum investment is $5,000")
        .required("Amount is required"),
      paymentMethod: Yup.string().required("Select a payment method"),
      startDate: Yup.date().nullable().required("Select a start date"),
      investmentGoal: Yup.string()
        .min(5, "Goal must be at least 5 characters")
        .required("Please describe your investment goal"),
      agreement: Yup.boolean().oneOf([true], "You must agree to the terms"),
    }),
    onSubmit: (values) => {
      toastMessage("success", 
        `You invested $${values.amount} via ${values.paymentMethod}.`,
        `Payment is under review. you will be nofitied once approved.`
      )
      console.log(values)
      setOpen(false)
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formik.values.startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formik.values.startDate ? (
                format(formik.values.startDate, "PPP")
              ) : (
                <span>Select date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formik.values.startDate || undefined}
              onSelect={(date) => formik.setFieldValue("startDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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

      {/* Submit */}
      <Button type="submit" className="w-full bg-primary text-white">
        Proceed to Invest
      </Button>
    </form>
  )
}

export default InvestmentForm
