'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Star, Calendar, User, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

interface FeedbackProps {
    feedback: {
        id: string;
        rating: number;
        comment: string;
        createdAt: string;
        investor: {
            name: string;
            email: string;
        }
    }
}

const ViewMore = ({ feedback }: FeedbackProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Feedback Details
                    </DialogTitle>
                    <DialogDescription>
                        Detailed information about the investor feedback.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                Investor Name
                            </p>
                            <p className="text-base font-semibold">{feedback.investor.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                Rating
                            </p>
                            <div className="flex items-center gap-1">
                                <span className="text-base font-semibold">{feedback.rating}</span>
                                <span className="text-sm text-yellow-600">/ 5.0</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            Email Address
                        </p>
                        <p className="text-base">{feedback.investor.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            Date Submitted
                        </p>
                        <p className="text-base">
                            {format(new Date(feedback.createdAt), 'PPP p')}
                        </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Comment</p>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                            "{feedback.comment}"
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ViewMore
