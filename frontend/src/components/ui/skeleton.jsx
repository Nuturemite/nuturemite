import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse bg-muted bg-slate-300", className)} {...props} />);
}

export { Skeleton }
