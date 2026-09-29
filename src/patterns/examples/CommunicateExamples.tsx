import { ArrowRight, Check, Copy, File, FileText, Folder, Image, MessageSquareText, MoreHorizontal, Paperclip, Plus, Search, Send, Sparkles, UploadCloud, WandSparkles } from "lucide-react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import { ExampleFrame } from "../../components/ExampleFrame";
import type { GoldenExampleProps } from "./exampleTypes";

export function ContentEditorExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="editor-layout">
        <header className="editor-topbar"><div><span className="eyebrow">Campaign article</span><input aria-label="Document title" defaultValue="Why focused operations create better growth" /></div><span className="saved-state"><Check size={14} /> Saved</span><button className="button button--secondary" type="button">Preview</button><button className="button button--primary" type="button">Publish</button></header>
        <aside className="editor-outline"><strong>Outline</strong>{["Introduction", "The hidden cost", "A focused system", "Practical next step"].map((item, index) => <button className={index === 1 ? "is-active" : ""} type="button" key={item}><span>{index + 1}</span>{item}</button>)}</aside>
        <main className="editor-canvas"><article><span className="eyebrow">Operations</span><h2>Why focused operations create better growth</h2><p className="lead">A team rarely needs more dashboards. It needs fewer gaps between a decision and the work that follows.</p><h3>The hidden cost of fragmented tools</h3><p>Every handoff asks someone to recover context: who this customer is, what was promised, and which step comes next. The interface can reduce that cost when it keeps the important object visible and lets supporting detail arrive only when needed.</p><blockquote>Good operational design makes the next correct action feel obvious without making every action loud.</blockquote><p>That is why a calm information hierarchy and active interaction feedback belong together.</p></article></main>
        <aside className="editor-assistant"><header><span className="icon-tile icon-tile--accent"><WandSparkles size={18} /></span><div><strong>Writing assistant</strong><small>Works with the selected section</small></div></header><button className="assistant-prompt" type="button"><Sparkles size={15} /> Make the argument more concrete</button><button className="assistant-prompt" type="button"><Sparkles size={15} /> Add a shorter example</button><div className="assistant-composer"><textarea aria-label="Ask writing assistant" placeholder="Ask for a change…" /><button className="icon-action" aria-label="Send prompt" type="button"><Send size={16} /></button></div></aside>
      </div>
    </DemoStateBoundary>
  );
}

export function ConversationExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="conversation-layout">
        <aside className="conversation-list"><header><div><span className="eyebrow">Inbox</span><h2>Conversations</h2></div><button className="icon-action" aria-label="Start conversation" type="button"><Plus size={17} /></button></header><div className="compact-search"><Search size={16} /><input aria-label="Search conversations" placeholder="Search" /></div>{["Maya Chen", "Jonas Keller", "Priya Nair", "Luis Romero"].map((name, index) => <button className={index === 0 ? "is-active" : ""} type="button" key={name}><span className="avatar avatar--small">{name[0]}</span><span><strong>{name}</strong><small>{index === 0 ? "The checklist looks useful…" : "Thanks for the update…"}</small></span><time>{index + 9}:12</time></button>)}</aside>
        <section className="conversation-thread"><header><span className="avatar">MC</span><div><strong>Maya Chen</strong><small>Northstar Labs · online</small></div><button className="icon-action" aria-label="Conversation actions" type="button"><MoreHorizontal size={17} /></button></header><div className="message-thread message-thread--roomy"><time>Today, 09:08</time><div className="message message--incoming">The checklist looks useful. Can we include our CRM owner in the setup?</div><div className="message message--outgoing">Absolutely. I added one step for permissions and data ownership so they can review it before kickoff.</div><div className="message message--incoming">Perfect. Thursday morning works for us.</div></div><div className="composer"><button className="icon-action" aria-label="Attach file" type="button"><Paperclip size={17} /></button><textarea aria-label="Message Maya" placeholder="Write a message…" /><button className="button button--primary" type="button"><Send size={15} /> Send</button></div></section>
        <aside className="conversation-context"><span className="avatar avatar--large">MC</span><h3>Maya Chen</h3><p>VP Operations at Northstar Labs</p><dl><div><dt>Stage</dt><dd>Qualified</dd></div><div><dt>Owner</dt><dd>Nora Tang</dd></div><div><dt>Last campaign</dt><dd>Q4 operations</dd></div></dl><button className="button button--secondary button--block" type="button">Open account</button></aside>
      </div>
    </DemoStateBoundary>
  );
}

export function AIWorkspaceExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Research workspace" eyebrow="AI-assisted" description="Prompt, evidence, progress, and editable result stay in one controllable flow." actions={<button className="button button--secondary" type="button">New research</button>}>
      <DemoStateBoundary state={state}>
        <div className="ai-workspace">
          <section className="ai-prompt-panel"><div className="prompt-box"><textarea aria-label="Research prompt" defaultValue="Compare the strongest operational signals across the shortlisted B2B software accounts." /><footer><button className="button button--quiet" type="button"><Paperclip size={15} /> Sources</button><span className="toolbar-spacer" /><button className="button button--primary" type="button"><Sparkles size={15} /> Run analysis</button></footer></div><div className="source-chips"><span><FileText size={14} /> 24 account profiles</span><span><MessageSquareText size={14} /> 18 conversations</span><span><File size={14} /> campaign-results.csv</span></div></section>
          <section className="ai-result"><header><div><span className="live-label"><span /> Analysis complete</span><h3>Three signals separate the highest-fit accounts</h3></div><div><button className="icon-action" aria-label="Copy result" type="button"><Copy size={16} /></button><button className="icon-action" aria-label="More result actions" type="button"><MoreHorizontal size={16} /></button></div></header><ol className="finding-list"><li><span>01</span><div><strong>Manual coordination is visible in public hiring plans</strong><p>Eight high-fit accounts mention campaign operations or CRM process ownership in current roles.</p><small>12 supporting sources</small></div></li><li><span>02</span><div><strong>Team growth precedes tooling changes</strong><p>Companies adding a second operations role show stronger response intent than larger established teams.</p><small>7 supporting sources</small></div></li><li><span>03</span><div><strong>Specific setup language increases replies</strong><p>Messages that describe the two-day setup outperform general productivity claims.</p><small>5 supporting sources</small></div></li></ol><footer><span>Generated 2 min ago · Review sources before use</span><button className="button button--primary" type="button">Create brief <ArrowRight size={15} /></button></footer></section>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function FileLibraryExample({ state }: GoldenExampleProps) {
  const files = [["Campaign brief", "DOCX", "Edited today", FileText], ["Results dashboard", "XLSX", "Updated yesterday", File], ["Brand photography", "12 items", "Updated Sep 24", Image], ["Research archive", "38 items", "Updated Sep 18", Folder]] as const;
  return (
    <ExampleFrame title="Files" description="Upload, organize, preview, and understand ownership without turning every file into a form." actions={<button className="button button--primary" type="button"><UploadCloud size={16} /> Upload files</button>}>
      <DemoStateBoundary state={state}>
        <div className="file-toolbar"><div className="compact-search"><Search size={16} /><input aria-label="Search files" placeholder="Search files and folders" /></div><button className="button button--secondary" type="button">New folder</button></div>
        <div className="file-grid">{files.map(([name, type, updated, Icon], index) => <article className="file-card" key={name}><div className={`file-preview file-preview--${index}`}><Icon size={30} /></div><div><strong>{name}</strong><small>{type} · {updated}</small></div><button className="icon-action" aria-label={`Actions for ${name}`} type="button"><MoreHorizontal size={16} /></button></article>)}</div>
        <section className="upload-zone"><UploadCloud size={22} /><div><strong>Drop files to upload</strong><span>PDF, images, CSV, and office documents up to 50 MB</span></div><button className="button button--secondary" type="button">Choose files</button></section>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}
