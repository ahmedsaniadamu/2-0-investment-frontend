'use client';
import React, { useState } from 'react';
import AdminPageLayout from '../../_components/admin-page-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { adminKyc } from '@/api/kyc';
import Loader from '@/components/loader';
import EmptyData from '@/components/empty-data';
import Pagination from '@/components/pagination';
import { toastMessage } from '@/lib/custom-toast';
import { SpinnerCustom } from '@/components/ui/spinner';
import { useConfirmModal } from '@/components/useConfirmationModal';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Document name is required'),
  description: Yup.string().required('Description is required'),
  required: Yup.boolean(),
  acceptedFileTypes: Yup.array().min(1, 'Select at least one file type'),
});

const Page = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<any>(null);
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const {confirm, ConfirmModalElement} = useConfirmModal();
  const { data: kycDocuments, isPending: kycPending, refetch } = useQuery({
       queryKey: ["kycDocuments", search, page, limit],
       queryFn: () => adminKyc.getKycDocuments({
         search, page, limit, 
       }),
       select: (data: any) => data,
     });

  const { mutateAsync: addDocument, isPending: addDocumentPending } = useMutation({
        mutationFn: adminKyc.createKycDocument,
        mutationKey: ["add-document"],
      });

   const { mutateAsync: updateDocument, isPending: updateDocumentPending } = useMutation({
        mutationFn: adminKyc.updateKycDocument,
        mutationKey: ["update-document"],
      });

  const { mutateAsync: deleteDocument, isPending: deleteDocumentPending } = useMutation({
        mutationFn: adminKyc.deleteKycDocument,
        mutationKey: ["delete-document"],
      });

  const formik: any = useFormik({
    initialValues: {
      name: '',
      description: '',
      required: false,
      acceptedFileTypes: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try{
        let res;
      if(editDoc){
        res = await updateDocument({ id: editDoc.id, data: {...values, fileTypes: values.acceptedFileTypes} });
      } else {
        res = await addDocument({...values, fileTypes: values.acceptedFileTypes});
      }
      toastMessage("success", "Success", res?.message || "Document requirement added successfully");
      refetch?.();
      setIsModalOpen(false);
      setEditDoc(null);
      formik.resetForm();
      } catch (error: any) {
        toastMessage("error", "Error", error?.response?.data?.message || "Failed to add document requirement");
      }
    },
  });

  const handleEdit = (doc: any) => {
    setEditDoc(doc);
    formik.setValues(doc);
    setIsModalOpen(true);
  };

  const handleDelete = async(id: string) => {
    try {
      const ok = await confirm({
        title: "Delete Document Requirement",
        description: "Are you sure you want to delete this document requirement?",
        confirmText: "Delete",
        type: 'reject'
      });
      if (!ok) return;
      await deleteDocument(id);
      toastMessage("success", "Success", "Document requirement deleted successfully");
      refetch?.();
    } catch (error: any) {
      toastMessage("error", "Error", error?.response?.data?.message || "Failed to delete document requirement");
    }
  };

  return (
    <AdminPageLayout>
      {ConfirmModalElement}
      <header className="md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My KYC Document Requirements</h1>
        <div className="md:flex items-center">
          <Button
            className="h-10 max-[500px]:w-full max-[500px]:mb-3 text-white bg-primary ml-2"
            variant="outline"
            onClick={() => {
              setEditDoc(null);
              formik.resetForm();
              setIsModalOpen(true);
            }}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Document Requirement
          </Button>
          <Button
            onClick={() => window.history.back()}
            className="h-10 max-[500px]:w-full md:ml-2"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-4">
         {
          kycPending ? (
            <Loader size={8} color='text-primary'  />
          ):
          !kycDocuments?.data?.length ?
            <EmptyData text='No KYC documents added yet.' />
          :
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] text-sm font-semibold">ID</TableHead>
              <TableHead className="text-sm font-semibold">Name</TableHead>
              <TableHead className="text-sm font-semibold">Description</TableHead>
              <TableHead className="text-sm font-semibold text-center">Required</TableHead>
              <TableHead className="text-sm font-semibold">File Types</TableHead>
              <TableHead className="text-sm font-semibold">Date Added</TableHead>
              <TableHead className="text-sm font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kycDocuments?.data?.map((doc: any, index: number) => (
              <TableRow key={doc.id} className="hover:bg-gray-50 text-sm">
                <TableCell>{
                    index + 1 +
                    ( (kycDocuments?.pagination?.currentPage || 1) - 1) *
                    ( limit )
                    }</TableCell>
                <TableCell className="font-medium">{doc?.name}</TableCell>
                <TableCell>{doc?.description}</TableCell>
                <TableCell className="text-center">
                  {doc?.required ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </TableCell>
                <TableCell>{doc?.fileTypes.join(', ')}</TableCell>
                <TableCell>{new Date(doc?.createdAt).toLocaleString()}</TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Pencil
                    size={16}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() => handleEdit({...doc, acceptedFileTypes: doc.fileTypes})}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(doc.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         }
      </div>
       {kycDocuments?.pagination ?
      <Pagination
        pagination={kycDocuments?.pagination}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(s) => setLimit(s)}
       /> : null}
      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editDoc ? 'Edit Document Requirement' : 'Add Document Requirement'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block font-medium mb-1 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full border rounded p-2 text-sm"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm">Description</label>
              <textarea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full border rounded p-2 text-sm"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-600 text-xs mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="required"
                checked={formik.values.required}
                onChange={formik.handleChange}
              />
              <label className="text-sm">Required</label>
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm">
                Accepted File Types
              </label>
              <div className="flex flex-wrap gap-3 text-sm">
                {['.jpg', '.jpeg', '.png', '.pdf'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      checked={formik.values.acceptedFileTypes.includes(type)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        const updated = checked
                          ? [...formik.values.acceptedFileTypes, value]
                          : formik.values.acceptedFileTypes.filter((t: any) => t !== value);
                        formik.setFieldValue('acceptedFileTypes', updated);
                      }}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {formik.touched.acceptedFileTypes &&
                formik.errors.acceptedFileTypes && (
                  <p className="text-red-600 text-xs mt-1">
                    {formik.errors.acceptedFileTypes as string}
                  </p>
                )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateDocumentPending || addDocumentPending} className="bg-primary text-white">
                {
                 (updateDocumentPending || addDocumentPending) ? <SpinnerCustom /> :
                 editDoc ? 'Update' : 'Create'
                }
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
};

export default Page;
