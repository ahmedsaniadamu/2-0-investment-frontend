import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface AccessDeniedProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function AccessDeniedFullScreen({
    title = "Access Denied",
    description = "You do not have permission to access this resource. Please contact your administrator or return to a valid page",
    actionLabel = "Go Back",
    onAction,
}: AccessDeniedProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-muted p-4">
            <Card className="w-full max-w-lg rounded-2xl shadow-lg">
                <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                        <ShieldX className="h-10 w-10 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>

                    {onAction && (
                        <Button
                            variant="default"
                            className="mt-2"
                            onClick={onAction}
                        >
                            {actionLabel}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
