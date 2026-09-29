import { ArrowRight, BookOpen, Check, Compass, FileText, MessageSquareText, Plus, Sparkles, WandSparkles } from "lucide-react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import { ExampleFrame } from "../../components/ExampleFrame";
import type { GoldenExampleProps } from "./exampleTypes";

const tools = [
  { icon: WandSparkles, name: "AI writer", text: "Shape campaign ideas into finished content.", accent: "violet" },
  { icon: FileText, name: "Document review", text: "Extract decisions and unresolved questions.", accent: "blue" },
  { icon: MessageSquareText, name: "Response studio", text: "Turn feedback into clear next actions.", accent: "graphite" },
  { icon: BookOpen, name: "Help center", text: "Find guidance without leaving the workflow.", accent: "green" },
];

export function HomeLauncherExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Good afternoon, Nora" description="Continue a recent task or start with a focused tool." actions={<button className="button button--primary" type="button"><Plus size={16} /> New workspace</button>}>
      <DemoStateBoundary state={state}>
        <div className="tool-launcher-grid">
          {tools.map(({ icon: Icon, name, text, accent }) => (
            <button className="tool-launcher-card" data-tool-accent={accent} type="button" key={name}>
              <span className="tool-launcher-card__icon"><Icon size={20} /></span>
              <span><strong>{name}</strong><small>{text}</small></span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
        <div className="recent-strip">
          <span><strong>Quarterly campaign</strong><small>AI writer · edited 18 min ago</small></span>
          <span><strong>Supplier responses</strong><small>Response studio · yesterday</small></span>
          <button className="button button--quiet" type="button">See all activity</button>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function DashboardExample({ state }: GoldenExampleProps) {
  const metrics = [
    ["Active projects", "18", "+3 this week"],
    ["Completion rate", "87%", "+4.2%"],
    ["Needs attention", "5", "2 overdue"],
  ];
  return (
    <ExampleFrame title="Operations overview" eyebrow="Monday, 29 September" description="The three signals that need a decision today." actions={<button className="button button--secondary" type="button">Download report</button>}>
      <DemoStateBoundary state={state}>
        <div className="metric-row">
          {metrics.map(([label, value, note]) => <article className="metric" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}
        </div>
        <div className="dashboard-layout">
          <article className="panel panel--chart">
            <div className="panel__heading"><div><strong>Weekly throughput</strong><span>Completed work across all teams</span></div><span className="trend-chip">+12%</span></div>
            <div className="spark-bars" aria-label="Weekly throughput chart">
              {[42, 58, 49, 72, 66, 88, 76].map((height, index) => <span key={index} style={{ "--bar-height": `${height}%` } as React.CSSProperties} />)}
            </div>
          </article>
          <article className="panel">
            <div className="panel__heading"><div><strong>Needs attention</strong><span>Ordered by impact</span></div></div>
            <ul className="attention-list">
              <li><span className="attention-dot attention-dot--danger" /><span><strong>2 imports failed validation</strong><small>Customer operations</small></span><ArrowRight size={15} /></li>
              <li><span className="attention-dot attention-dot--warning" /><span><strong>Campaign approval is overdue</strong><small>Growth team</small></span><ArrowRight size={15} /></li>
              <li><span className="attention-dot" /><span><strong>3 reports are ready</strong><small>Research workspace</small></span><ArrowRight size={15} /></li>
            </ul>
          </article>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function AuthExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="auth-layout">
        <section className="auth-story">
          <span className="auth-story__mark"><Sparkles size={24} /></span>
          <blockquote>“The interface stays quiet until there is something worth your attention.”</blockquote>
          <span>Personal frontend system</span>
        </section>
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to continue</h2>
          <p>Use your work email to open the design workspace.</p>
          <label className="field"><span>Email</span><input type="email" defaultValue="nora@example.com" /></label>
          <label className="field"><span>Password</span><input type="password" defaultValue="not-a-real-password" /></label>
          <div className="form-inline"><label className="check"><input type="checkbox" defaultChecked /> Keep me signed in</label><button className="text-action" type="button">Forgot password?</button></div>
          <button className="button button--primary button--block" type="submit">Sign in <ArrowRight size={16} /></button>
          <span className="auth-form__legal">By continuing, you agree to the workspace terms.</span>
        </form>
      </div>
    </DemoStateBoundary>
  );
}

export function OnboardingExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Set up your workspace" description="Three choices tailor the starting point. You can change them later.">
      <DemoStateBoundary state={state}>
        <div className="onboarding-layout">
          <ol className="step-list">
            <li className="is-complete"><span><Check size={14} /></span><div><strong>Workspace</strong><small>Name and purpose</small></div></li>
            <li className="is-current"><span>2</span><div><strong>Working style</strong><small>Defaults and density</small></div></li>
            <li><span>3</span><div><strong>Invite</strong><small>Optional collaborators</small></div></li>
          </ol>
          <section className="onboarding-card">
            <span className="icon-tile icon-tile--accent"><Compass size={20} /></span>
            <h3>How will you use this workspace?</h3>
            <p>This selects a starting preset, not a permanent limitation.</p>
            <div className="choice-list">
              {[
                ["Focused tools", "A small collection of independent utilities"],
                ["Product workspace", "Related workflows around one product"],
                ["Operations platform", "Dense data and administrative work"],
              ].map(([title, text], index) => <label className="choice-card" key={title}><input type="radio" name="workspace-type" defaultChecked={index === 1} /><span><strong>{title}</strong><small>{text}</small></span></label>)}
            </div>
            <div className="form-actions"><button className="button button--secondary" type="button">Back</button><button className="button button--primary" type="button">Continue <ArrowRight size={16} /></button></div>
          </section>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}
