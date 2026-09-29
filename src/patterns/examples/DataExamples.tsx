import { ArrowRight, Check, ChevronDown, Filter, Mail, MoreHorizontal, Search, Star, X } from "lucide-react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import { ExampleFrame } from "../../components/ExampleFrame";
import type { GoldenExampleProps } from "./exampleTypes";

const contacts = [
  { name: "Maya Chen", role: "VP Operations", company: "Northstar Labs", score: 94, status: "Qualified" },
  { name: "Jonas Keller", role: "Head of Growth", company: "Anker Works", score: 88, status: "Review" },
  { name: "Priya Nair", role: "Director, People", company: "Fieldline", score: 82, status: "Qualified" },
  { name: "Luis Romero", role: "COO", company: "Arc Systems", score: 78, status: "New" },
];

export function SearchListExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Find the right accounts" description="Search broadly, then use only the filters that change the decision." actions={<button className="button button--primary" type="button">Create shortlist</button>}>
      <DemoStateBoundary state={state}>
        <div className="search-command">
          <Search size={19} />
          <input aria-label="Search accounts" defaultValue="B2B software operations leaders" />
          <button className="button button--primary" type="button">Search</button>
        </div>
        <div className="filter-row">
          <button className="filter-button" type="button"><Filter size={15} /> Industry <ChevronDown size={14} /></button>
          <button className="filter-button" type="button">Team size <ChevronDown size={14} /></button>
          <button className="filter-button" type="button">Region <ChevronDown size={14} /></button>
          <span className="filter-chip">Germany <X size={13} /></span>
          <button className="text-action" type="button">Clear</button>
        </div>
        <div className="result-heading"><span><strong>124 accounts</strong><small>Sorted by relevance</small></span><button className="button button--quiet" type="button">Relevance <ChevronDown size={14} /></button></div>
        <div className="result-list">
          {contacts.map((contact) => (
            <article className="result-card" key={contact.name}>
              <span className="avatar">{contact.name.split(" ").map((part) => part[0]).join("")}</span>
              <span className="result-card__identity"><strong>{contact.name}</strong><small>{contact.role} · {contact.company}</small></span>
              <span className="score-ring">{contact.score}</span>
              <span className={`status-text status-text--${contact.status.toLowerCase()}`}>{contact.status}</span>
              <button className="icon-action" aria-label={`Save ${contact.name}`} type="button"><Star size={16} /></button>
            </article>
          ))}
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function DataTableExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Candidate pipeline" eyebrow="42 active records" description="Selection reveals actions; routine status stays inside the table." actions={<button className="button button--secondary" type="button">Export</button>}>
      <DemoStateBoundary state={state}>
        <div className="table-toolbar">
          <div className="compact-search"><Search size={16} /><input aria-label="Search candidates" placeholder="Search candidates" /></div>
          <button className="filter-button" type="button"><Filter size={15} /> Filters <span className="count-badge">2</span></button>
          <span className="toolbar-spacer" />
          <button className="button button--primary" type="button">Add candidate</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th><input aria-label="Select all candidates" type="checkbox" /></th><th>Candidate</th><th>Company</th><th>Fit</th><th>Stage</th><th>Last activity</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>{contacts.map((contact, index) => <tr key={contact.name}><td><input aria-label={`Select ${contact.name}`} type="checkbox" defaultChecked={index === 1} /></td><td><span className="table-person"><span className="avatar avatar--small">{contact.name[0]}</span><span><strong>{contact.name}</strong><small>{contact.role}</small></span></span></td><td>{contact.company}</td><td><strong>{contact.score}%</strong></td><td><span className="status-pill">{contact.status}</span></td><td>{index + 1}d ago</td><td><button className="icon-action" aria-label={`Actions for ${contact.name}`} type="button"><MoreHorizontal size={16} /></button></td></tr>)}</tbody>
          </table>
        </div>
        <div className="bulk-bar"><span><strong>1 selected</strong><small>Jonas Keller</small></span><button className="button button--quiet" type="button"><Mail size={15} /> Email</button><button className="button button--primary" type="button">Add to shortlist</button></div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function DetailExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Northstar Labs" eyebrow="Account" description="One durable identity with current context and next actions." actions={<><button className="button button--secondary" type="button">Edit</button><button className="button button--primary" type="button">Start outreach</button></>}>
      <DemoStateBoundary state={state}>
        <div className="detail-summary">
          <span className="company-mark">NL</span>
          <dl><div><dt>Industry</dt><dd>B2B software</dd></div><div><dt>Employees</dt><dd>240</dd></div><div><dt>Location</dt><dd>Berlin, DE</dd></div><div><dt>Fit score</dt><dd>92 / 100</dd></div></dl>
        </div>
        <div className="detail-layout">
          <section className="panel"><div className="panel__heading"><div><strong>People</strong><span>Key contacts at this account</span></div><button className="text-action" type="button">View all</button></div>{contacts.slice(0, 3).map((contact) => <div className="person-row" key={contact.name}><span className="avatar avatar--small">{contact.name[0]}</span><span><strong>{contact.name}</strong><small>{contact.role}</small></span><button className="icon-action" aria-label={`Open ${contact.name}`} type="button"><ArrowRight size={15} /></button></div>)}</section>
          <section className="panel"><div className="panel__heading"><div><strong>Recent activity</strong><span>Most recent first</span></div></div><ol className="timeline"><li><span /><div><strong>Shortlist created</strong><small>Today, 10:24 · Nora</small></div></li><li><span /><div><strong>Account enriched</strong><small>Yesterday · Automation</small></div></li><li><span /><div><strong>First discovered</strong><small>22 Sep · Search</small></div></li></ol></section>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function MasterDetailExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="master-detail">
        <section className="master-pane">
          <header><div><span className="eyebrow">Review queue</span><h2>Messages</h2></div><span className="count-badge">8</span></header>
          <div className="compact-search"><Search size={16} /><input aria-label="Search messages" placeholder="Search" /></div>
          {contacts.map((contact, index) => <button className={`master-item${index === 0 ? " is-active" : ""}`} type="button" key={contact.name}><span className="avatar avatar--small">{contact.name[0]}</span><span><strong>{contact.name}</strong><small>{index === 0 ? "Asked about implementation timing…" : "Shared an update on the project…"}</small></span><time>{index + 9}:20</time></button>)}
        </section>
        <section className="detail-pane">
          <header><span className="avatar">MC</span><div><h3>Maya Chen</h3><span>Northstar Labs · Qualified</span></div><button className="button button--secondary" type="button">Open account</button></header>
          <div className="message-thread"><div className="message message--incoming">Could you share how long the initial setup normally takes?</div><div className="message message--outgoing">Most teams are ready in two working days. I can send the exact checklist.</div><div className="message message--incoming">That would be helpful, thank you.</div></div>
          <div className="reply-box"><textarea aria-label="Reply to Maya" placeholder="Write a reply…" /><button className="button button--primary" type="button">Send reply</button></div>
        </section>
      </div>
    </DemoStateBoundary>
  );
}

export function ComparisonExample({ state }: GoldenExampleProps) {
  const rows = [["Fit score", "94", "88", "82"], ["Team size", "240", "92", "480"], ["Buying signal", "Strong", "Medium", "Strong"], ["Last activity", "Today", "2 days", "6 days"]];
  return (
    <ExampleFrame title="Compare shortlisted accounts" description="Criteria align vertically so differences are visible without repeated explanation." actions={<button className="button button--primary" type="button">Continue with 2 accounts</button>}>
      <DemoStateBoundary state={state}>
        <div className="comparison-table">
          <div className="comparison-table__head"><span>Criteria</span>{contacts.slice(0, 3).map((contact, index) => <article key={contact.name} className={index === 0 ? "is-recommended" : ""}><span className="avatar">{contact.name[0]}</span><strong>{contact.company}</strong><small>{contact.name}</small>{index === 0 && <span className="recommendation"><Check size={12} /> Best fit</span>}</article>)}</div>
          {rows.map(([label, ...values]) => <div className="comparison-table__row" key={label}><strong>{label}</strong>{values.map((value, index) => <span key={`${label}-${index}`}>{value}{label === "Fit score" && index === 0 ? <Star size={13} /> : null}</span>)}</div>)}
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}
