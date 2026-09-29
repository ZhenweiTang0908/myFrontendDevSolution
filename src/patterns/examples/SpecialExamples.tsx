import { AlertTriangle, ArrowRight, CloudOff, Command, FileWarning, Layers3, LockKeyhole, Maximize2, MousePointer2, RotateCcw, Search, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import type { GoldenExampleProps } from "./exampleTypes";

export function StateExample({ state }: GoldenExampleProps) {
  if (state !== "populated" && state !== "partial" && state !== "disabled") {
    return <DemoStateBoundary state={state} />;
  }
  const states = [
    [CloudOff, "You are offline", "Changes will sync when the connection returns.", "Retry connection"],
    [LockKeyhole, "Access required", "Ask the workspace owner for campaign permissions.", "Request access"],
    [FileWarning, "Report not found", "It may have been moved, renamed, or deleted.", "Back to reports"],
  ] as const;
  return (
    <div className="state-gallery">
      <header><span className="eyebrow">Recovery patterns</span><h2>Make the next safe action clear.</h2><p>State pages explain what happened without repeating technical detail or blaming the user.</p></header>
      <div>{states.map(([Icon, title, text, action], index) => <article className={index === 0 ? "state-card state-card--featured" : "state-card"} key={title}><span className="state-card__art"><Icon size={28} /></span><h3>{title}</h3><p>{text}</p><button className={index === 0 ? "button button--primary" : "button button--secondary"} type="button">{action} <ArrowRight size={15} /></button></article>)}</div>
    </div>
  );
}

export function FullScreenWorkspaceExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="canvas-workspace">
        <header className="canvas-toolbar"><span className="brand"><span className="brand__mark"><Sparkles size={17} /></span><strong>Journey canvas</strong></span><span className="toolbar-divider" /><button className="tool-button is-active" aria-label="Select tool" type="button"><MousePointer2 size={16} /></button><button className="tool-button" aria-label="Add frame" type="button"><Layers3 size={16} /></button><span className="toolbar-spacer" /><button className="tool-button" aria-label="Undo" type="button"><RotateCcw size={16} /></button><button className="tool-button" aria-label="Zoom out" type="button"><ZoomOut size={16} /></button><span className="zoom-level">84%</span><button className="tool-button" aria-label="Zoom in" type="button"><ZoomIn size={16} /></button><button className="tool-button" aria-label="Full screen" type="button"><Maximize2 size={16} /></button></header>
        <aside className="canvas-library"><div className="compact-search"><Search size={15} /><input aria-label="Search canvas objects" placeholder="Search" /></div><span className="eyebrow">Blocks</span>{["Customer signal", "Decision", "Automated step", "Human review"].map((item, index) => <button type="button" key={item}><span className={`block-swatch block-swatch--${index}`} />{item}<Command size={13} /></button>)}</aside>
        <main className="canvas-stage"><div className="canvas-grid" /><article className="canvas-node canvas-node--one"><span className="node-type">Signal</span><strong>Campaign response</strong><p>Customer asks about implementation timing.</p><span className="node-port" /></article><article className="canvas-node canvas-node--two"><span className="node-type">Decision</span><strong>Qualified intent?</strong><p>Score intent and account fit together.</p><span className="node-port node-port--left"/><span className="node-port" /></article><article className="canvas-node canvas-node--three"><span className="node-type">Human review</span><strong>Confirm next step</strong><p>Owner reviews evidence before outreach.</p><span className="node-port node-port--left"/></article><svg className="canvas-links" viewBox="0 0 900 520" preserveAspectRatio="none" aria-hidden="true"><path d="M255 170 C340 170 330 275 410 275"/><path d="M600 275 C680 275 650 385 735 385"/></svg></main>
        <aside className="canvas-inspector"><span className="eyebrow">Properties</span><h3>Qualified intent?</h3><label className="field"><span>Condition</span><select><option>Intent score is at least 70</option></select></label><label className="field"><span>Fallback</span><select><option>Send to nurture queue</option></select></label><div className="inline-notice"><AlertTriangle size={15} /> 2 paths leave this decision.</div></aside>
      </div>
    </DemoStateBoundary>
  );
}
