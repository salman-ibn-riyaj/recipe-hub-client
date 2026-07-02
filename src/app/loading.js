export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background px-4 select-none">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <div className="relative flex items-center justify-center h-20 w-20">
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          <div className="relative flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
            <svg
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>


        <div className="text-center space-y-3">
          <p className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Loading...
            </span>
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>

        <div className="w-full space-y-3 mt-2">
          <div className="h-3 w-3/4 mx-auto rounded-lg bg-gradient-to-r from-muted/10 via-primary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
          <div className="h-3 w-1/2 mx-auto rounded-lg bg-gradient-to-r from-muted/10 via-secondary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
        </div>

        <div className="w-full rounded-xl border border-border/40 bg-surface/50 p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/3 rounded-lg bg-gradient-to-r from-muted/10 via-primary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
              <div className="h-3 w-1/3 rounded-lg bg-gradient-to-r from-muted/10 via-secondary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded-lg bg-gradient-to-r from-muted/10 via-primary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
            <div className="h-3 w-5/6 rounded-lg bg-gradient-to-r from-muted/10 via-secondary/10 to-muted/10 bg-[length:200%_100%] animate-shimmer" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 flex-1 rounded-lg bg-primary/10 animate-pulse" />
            <div className="h-9 flex-1 rounded-lg bg-muted/10 animate-pulse" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground/50 tracking-widest uppercase animate-pulse">
          RecipeHub
        </p>
      </div>
    </div>
  );
}
