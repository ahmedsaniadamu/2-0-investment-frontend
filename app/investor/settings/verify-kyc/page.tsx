'use client'
import React, { useEffect } from 'react'
import InvestorPageLayout from '../../_components/investor-page-layout'
import { useSessionUserId } from '@/hooks/use-session-user-id';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { investorProfile } from '@/api/profile';
import { fileManagement } from '@/api/upload';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loader from '@/components/loader';
import { CloudUpload, Eye, Trash } from 'lucide-react';
import { SpinnerCustom } from '@/components/ui/spinner';
import { toastMessage } from '@/lib/custom-toast';
import EmptyData from '@/components/empty-data';

const page = () => {
      
        const userId = useSessionUserId(); 
        const {push} = useRouter();
        const [activeDocument, setActiveDocument] = React.useState<any>(null);
        const [uploadedDocuments, setUploadedDocuments] = React.useState<{name: string, url: string}[]>([]);

        const { data: kycDocuments, isPending, } = useQuery({
          queryKey: ["get-kyc-documents",],
          queryFn: () => investorProfile.getKycDocumentRequirements(),
          select: (data: any) => data?.data,
          enabled: !!userId,
          
        },);

        const {mutateAsync: verifyKyc, isPending: verifyPending} = useMutation({
          mutationFn: investorProfile.verifyKyc,
          mutationKey: ["verify-kyc"],
        })

        const {mutateAsync: uploadFile, isPending: uploadPending} = useMutation({
          mutationFn: fileManagement.uploadFile,
          mutationKey: ["upload-file"],
        })

        useEffect(
          () => {
            const uploadedDocs = sessionStorage.getItem('uploadedDocuments')
            if(uploadedDocs){ 
                const docs = JSON.parse(uploadedDocs);
                if(docs?.length){
                    const updatedDocs = docs?.map((doc: any) => ({name: doc?.title, url: doc?.url}))
                    setUploadedDocuments(updatedDocs);
                }
            }
          }, [kycDocuments, isPending]
        )

   const handleUpload = async (e: any, document: any) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowedTypes = document.fileTypes; 
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

        if (!allowedTypes.includes(fileExtension)) {
            toastMessage('error', "Error", `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`);
            return;
        }
        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
            toastMessage('error', "Error", "File size exceeds 5MB limit.");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await uploadFile(formData);
            toastMessage('success', "Success", "File uploaded successfully");
            if(!uploadedDocuments.length) return setUploadedDocuments((prev) => [...prev, {name: document?.name, url: res?.url}]);
            const existingDocument = uploadedDocuments?.find((doc) => doc?.name === document?.name);
            if (existingDocument) {
                setUploadedDocuments((prev) => prev.map((doc) => (doc.name === document?.name ? {...doc, url: res?.url} : doc)));
                return;
            }
            return setUploadedDocuments((prev) => [...prev, {name: document?.name, url: res?.url}]);
        } catch (err: any) {
            console.error("Upload failed:", err);
            toastMessage('error', "Error", err?.response?.data?.message || "Upload failed");
        }
    };

    const validateDocuments = () => {
        const requiredDocs = kycDocuments.filter((doc: any) => doc?.required);
        const missingDocs = requiredDocs.filter( (reqDoc: any) => {
            return !uploadedDocuments.some(
            uploaded => uploaded.name === reqDoc.name && uploaded.url
            );
        });
        if (missingDocs.length > 0) {
            toastMessage('error', "Error", 
            `Missing required documents: ${missingDocs.map( (doc: any) => doc.name).join(", ")}`
            );
            return false;
        }
        return true;
    }
    const submitDocuments = async () => {
      if(!validateDocuments()) return;
      try {
        console.log(uploadedDocuments, 'up');
        const payload = {
            investorId: userId,
            documents: uploadedDocuments?.map((doc: any) =>{ 
               const isImage =
                    doc?.url?.endsWith(".jpg") ||
                    doc?.url?.endsWith(".jpeg") ||
                    doc?.url?.endsWith(".png") ||
                    doc?.url?.endsWith(".webp");
              const isPDF = doc?.url?.endsWith(".pdf");
            return ({
                title: doc?.name, url: doc?.url,
                type: isImage ? "image" : isPDF ? "pdf" : "other"
              }
            )})
        }
        const res = await verifyKyc(payload);
        toastMessage('success', "Success", res?.message || "KYC documents verified successfully");
        setTimeout(() => {
            push('/investor/settings');
        }, 2000)
      } catch (err: any) {
        toastMessage('error', "Error", err?.response?.data?.message || "KYC verification failed");
        console.error("KYC verification failed:", err);
      }
    }

  return (
    <InvestorPageLayout>
        <header className='p-2 mt-3 mb-3 md:flex justify-between'>
          <h5 className='font-bold text-xl'>Verify KYC (Upload Documents Required) </h5>
        <Button className='max-[500px]:w-full max-[500px]:mt-3' asChild>
            <Link href={'/investor/settings'}>
              Back
            </Link>
          </Button>
      </header>
      <section>
        {
          isPending ?
           <Loader />
          :
          kycDocuments?.length ?
          kycDocuments?.map((document: any, index: number) => {
            const uploadedDocument = uploadedDocuments?.length ?  uploadedDocuments?.find((doc) => doc?.name === document?.name) : null
            let isImage = false
            let isPDF = false
            if(uploadedDocument?.url){
               isImage =
                    uploadedDocument?.url?.endsWith(".jpg") ||
                    uploadedDocument?.url?.endsWith(".jpeg") ||
                    uploadedDocument?.url?.endsWith(".png") ||
                    uploadedDocument?.url?.endsWith(".webp");
               isPDF = uploadedDocument?.url?.endsWith(".pdf");
            }

            return (
                <div key={document.id} className='rounded-lg mt-3 mb-5 bg-white p-3'>
              <header className='md:flex items-center'>
                 <h5 className='font-bold text-md'>{index + 1}. {document.name}</h5>
                  <span className='text-red-500 max-[500px]:mt-2 text-sm italic md:ml-4'>
                    (Please ensure the document is clear and legible and is one of the required file types)
                 </span>
              </header>
              <div className='border-dotted flex flex-col items-center justify-center border-2 border-primary rounded-lg md:w-[50%] mx-auto h-[300px] mt-4'>
                 {
                    uploadedDocument?.url ? 
                     <div className='w-auto h-auto'>
                        <header className='flex justify-end gap-4 items-center p-2 w-full border-b border-gray-100'>
                           <Button onClick={
                             () => setUploadedDocuments((prev) => prev.filter((doc) => doc?.name !== document?.name))
                           } size={'icon-sm'} variant={'destructive'}>
                             <Trash />
                           </Button>
                           <Button asChild size={'icon-sm'} variant={'outline'}>
                             <a href={uploadedDocument.url} target="_blank" rel="noopener noreferrer">
                                <Eye />
                             </a>
                           </Button>
                        </header>
                        {isImage && (
                            <img
                              src={uploadedDocument.url}
                              alt={uploadedDocument.name}
                              className="object-contain w-[250px] h-[250px]"
                            />
                          )}

                          {isPDF && (
                            <iframe
                              src={uploadedDocument.url}
                              className="w-[250px] h-[250px]"
                              title={uploadedDocument.name}
                            />
                          )}
                     </div>
                    : 
                    <div className='flex flex-col mt-12 w-[200px]  h-[200px] items-center'>
                     <CloudUpload className='w-12 h-12 text-primary' />
                     <p className='text-sm text-primary font-bold'>Upload ({document?.fileTypes?.join(', ')})</p>
                     <input id={document?.id} type="file" className='hidden' onChange={(e) => {
                         setActiveDocument(document);
                         handleUpload(e, document);
                       }}
                     />
                     <label className='bg-primary py-3 rounded-lg mt-3 px-12 text-white' htmlFor={document?.id}>
                       {
                        uploadPending && activeDocument?.id === document?.id ?
                        <SpinnerCustom /> : <span className='text-xs'>Upload</span>
                       }
                     </label>
                 </div>
                 }
              </div>
            </div>
            )
          })
          : <div className='mb-8'>
                <EmptyData text='No required documents added yet.' />
          </div>
        }
        <div className="flex justify-end gap-5 mt-3 items-center">
            <Button onClick={() => setUploadedDocuments([])} className='px-8' variant={'destructive'}>
                Clear All 
            </Button>
            <Button onClick={submitDocuments} disabled={verifyPending}>
                {
                    verifyPending ? <SpinnerCustom /> : 'Submit Documents'
                }
            </Button>
        </div>
      </section>
    </InvestorPageLayout>
  )
}

export default page