import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, size, color, ...props }: React.ComponentProps<"svg" > & {
  size?: 4 | 8
  color?: string
}) {
  return (
    <LoaderIcon
      role="status"
      size={50}
      aria-label="Loading"
      className={cn(`size-${size || 4} ${color || ""} animate-spin`, className)}
      {...props}
    />
  )
}

export function SpinnerCustom({size, color}: React.ComponentProps<"svg" > & {
  size?: 4 | 8
  color?: string
}) {
  return (
    <div className="flex items-center gap-4">
      <Spinner size={size} color={color} />
    </div>
  )
}
