import { useRef, useState, type ReactNode } from "react";

interface AsyncActionButtonProps {
  children: ReactNode;
  onAction: () => Promise<void>;
  successMessage: string;
  errorMessage?: string;
  className?: string;
}

export function AsyncActionButton({
  children,
  onAction,
  successMessage,
  errorMessage = "The action did not complete. Try again.",
  className = "button button--primary",
}: AsyncActionButtonProps) {
  const locked = useRef(false);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");

  const run = async () => {
    if (locked.current) return;
    locked.current = true;
    setStatus("running");
    try {
      await onAction();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      locked.current = false;
    }
  };

  return (
    <span className="async-action">
      <button className={className} type="button" disabled={status === "running"} aria-busy={status === "running"} onClick={run}>
        {status === "running" ? "Working…" : children}
      </button>
      {status === "success" && <span className="async-action__status" role="status">{successMessage}</span>}
      {status === "error" && <span className="async-action__status async-action__status--error" role="alert">{errorMessage}</span>}
    </span>
  );
}
