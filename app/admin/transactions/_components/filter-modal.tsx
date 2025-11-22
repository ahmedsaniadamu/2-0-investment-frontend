"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Filter } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { filterType } from "../page";

export default function FilterModal({ open, setOpen, filters, setFilters }: { 
    filters: filterType,
    setFilters: React.Dispatch<React.SetStateAction<filterType>>,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) {

    const [initFilters, setInitFilters] = useState<filterType>(filters);
  
     const handleApplyFilter = (filters: any) => {
    console.log("Applied Filters:", filters);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Filter Transactions</DialogTitle>
        </DialogHeader>
         <Formik
            enableReinitialize
            initialValues={{
              status: filters.status || "",
              paymentMethod: filters.paymentMethod || "",
              startDateFrom: filters.startDateFrom ? new Date(filters.startDateFrom) : null,
              startDateTo: filters.startDateTo ? new Date(filters.startDateTo) : null,
              createdFrom: filters.createdFrom ? new Date(filters.createdFrom) : null,
              createdTo: filters.createdTo ? new Date(filters.createdTo) : null,
            }}
            onSubmit={(values) => {
              const formatted = {
                status: values.status,
                paymentMethod: values.paymentMethod,
                startDateFrom: values.startDateFrom ? values.startDateFrom.toISOString() : "",
                startDateTo: values.startDateTo ? values.startDateTo.toISOString() : "",
                createdFrom: values.createdFrom ? values.createdFrom.toISOString() : "",
                createdTo: values.createdTo ? values.createdTo.toISOString() : "",
              };

              setFilters(formatted);
              setOpen(false);
            }}
          >
            {({ values, setFieldValue, resetForm }) => (
              <Form className="space-y-4">

                {/* Status */}
                <div>
                  <Label>Status</Label>
                  <Select
                    value={values.status || undefined}
                    onValueChange={(value) => setFieldValue("status", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Method */}
                <div>
                  <Label>Payment Method</Label>
                  <Select
                    value={values.paymentMethod || undefined}
                    onValueChange={(value) => setFieldValue("paymentMethod", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Crypto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range – StartDateFrom & StartDateTo */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="pb-1">Start Date From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.startDateFrom
                            ? format(values.startDateFrom, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={values.startDateFrom || undefined}
                          onSelect={(date) => setFieldValue("startDateFrom", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="pb-1">Start Date To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.startDateTo
                            ? format(values.startDateTo, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={values.startDateTo || undefined}
                          onSelect={(date) => setFieldValue("startDateTo", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Created Range – createdFrom & createdTo */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="pb-1">Created From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.createdFrom
                            ? format(values.createdFrom, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={values.createdFrom || undefined}
                          onSelect={(date) => setFieldValue("createdFrom", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="pb-1">Created To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.createdTo
                            ? format(values.createdTo, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <Calendar
                          mode="single"
                          selected={values.createdTo || undefined}
                          onSelect={(date) => setFieldValue("createdTo", date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setFilters(initFilters);
                      setOpen(false);
                    }}
                  >
                    Reset
                  </Button>

                  <Button type="submit">Apply</Button>
                </div>
              </Form>
            )}
          </Formik>
      </DialogContent>
    </Dialog>
  );
}
