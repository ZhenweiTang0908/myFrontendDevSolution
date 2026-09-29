import { AlertTriangle, Ban, Inbox, LoaderCircle, LockKeyhole } from "lucide-react";
import type { PropsWithChildren } from "react";
import type { DemoState } from "../config/designConfig";

const stateCopy = {
  loading: { icon: LoaderCircle, title: "Loading current data", text: "Stable structure stays visible while the result arrives." },
  empty: { icon: Inbox, title: "Nothing here yet", text: "Adjust the filters or create the first item to continue." },
  error: { icon: AlertTriangle, title: "We could not load this view", text: "Your changes are safe. Try the request again." },
  restricted: { icon: LockKeyhole, title: "Access is limited", text: "Ask an administrator for the required permission." },
} as const;

export function DemoStateBoundary({ state, children }: PropsWithChildren<{ state: DemoState }>) {
  if (state in stateCopy) {
    const copy = stateCopy[state as keyof typeof stateCopy];
    const Icon = copy.icon;
    return (
      <div className={`demo-state demo-state--${state}`} role={state === "error" ? "alert" : "status"}>
        <span className="icon-tile icon-tile--accent"><Icon size={20} className={state === "loading" ? "spin" : undefined} /></span>
        <h3>{copy.title}</h3>
        <p>{copy.text}</p>
        {state === "error" && <button className="button button--secondary" type="button">Try again</button>}
      </div>
    );
  }

  return (
    <div className={state === "disabled" ? "demo-content demo-content--disabled" : "demo-content"}>
      {state === "partial" && <div className="inline-notice"><AlertTriangle size={16} /> Some records are delayed. Available data is shown below.</div>}
      {state === "disabled" && <div className="disabled-notice"><Ban size={15} /> Previewing disabled behavior</div>}
      {children}
    </div>
  );
}
