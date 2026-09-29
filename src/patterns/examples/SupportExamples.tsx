import { ArrowRight, BookOpen, Check, ChevronRight, CreditCard, ExternalLink, HelpCircle, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import { ExampleFrame } from "../../components/ExampleFrame";
import type { GoldenExampleProps } from "./exampleTypes";

export function HelpDocsExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="help-layout">
        <header className="help-hero"><span className="icon-tile icon-tile--accent"><BookOpen size={20} /></span><h2>How can we help?</h2><p>Clear guidance, short paths, and context that stays connected to the product.</p><div className="help-search"><Search size={18} /><input aria-label="Search help" placeholder="Search setup, campaigns, exports…" /><kbd>⌘ K</kbd></div></header>
        <section className="help-categories"><button type="button"><span className="icon-tile"><Sparkles size={18} /></span><span><strong>Getting started</strong><small>Set up your first workspace and tool.</small></span><ChevronRight size={16} /></button><button type="button"><span className="icon-tile"><Zap size={18} /></span><span><strong>Campaign workflows</strong><small>Move safely from shortlist to launch.</small></span><ChevronRight size={16} /></button><button type="button"><span className="icon-tile"><ShieldCheck size={18} /></span><span><strong>Data and permissions</strong><small>Understand access, exports, and retention.</small></span><ChevronRight size={16} /></button></section>
        <div className="help-content"><section><span className="eyebrow">Popular guides</span>{["Create a workspace for several tools", "Choose the right data-table profile", "Review an AI result before publishing", "Resume an interrupted import"].map((guide, index) => <button className="guide-row" type="button" key={guide}><span>{index + 1}</span><strong>{guide}</strong><small>{4 + index * 2} min</small><ArrowRight size={15} /></button>)}</section><aside><HelpCircle size={22} /><h3>Still need help?</h3><p>Send context with your question. We usually reply within one working day.</p><button className="button button--secondary" type="button">Contact support</button></aside></div>
      </div>
    </DemoStateBoundary>
  );
}

export function BillingPlanExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Plan & billing" description="Usage, limits, price, and change consequences remain visible before a decision." actions={<button className="button button--secondary" type="button">Billing history</button>}>
      <DemoStateBoundary state={state}>
        <section className="plan-summary"><div><span className="eyebrow">Current plan</span><h3>Product Studio</h3><p>For focused teams building and operating multiple tools.</p></div><div className="plan-price"><strong>€48</strong><span>per month<br />renews Oct 18</span></div><button className="button button--primary" type="button">Change plan</button></section>
        <div className="usage-grid"><article><span><strong>AI runs</strong><small>Resets Oct 18</small></span><strong>742 / 1,000</strong><div className="usage-bar"><span style={{ width: "74%" }} /></div></article><article><span><strong>Storage</strong><small>Across all projects</small></span><strong>18 / 50 GB</strong><div className="usage-bar"><span style={{ width: "36%" }} /></div></article><article><span><strong>Team seats</strong><small>2 seats available</small></span><strong>6 / 8</strong><div className="usage-bar"><span style={{ width: "75%" }} /></div></article></div>
        <section className="payment-row"><span className="icon-tile"><CreditCard size={18} /></span><span><strong>Visa ending in 1842</strong><small>Expires 09/28</small></span><button className="button button--quiet" type="button">Update payment method</button></section>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function MarketingLandingExample({ state }: GoldenExampleProps) {
  return (
    <DemoStateBoundary state={state}>
      <div className="marketing-page">
        <nav className="marketing-nav"><span className="brand"><span className="brand__mark"><Sparkles size={18} /></span><strong>Northstar</strong></span><div><a href="#features">Features</a><a href="#approach">Approach</a><a href="#stories">Stories</a></div><button className="button button--primary" type="button">Start building</button></nav>
        <section className="marketing-hero"><span className="eyebrow">Operational clarity, built in</span><h2>Turn scattered work into a system people trust.</h2><p>Plan, review, and run customer operations without losing the context that makes each decision useful.</p><div><button className="button button--primary" type="button">Start with a proven workflow <ArrowRight size={16} /></button><button className="button button--secondary" type="button">See the system <ExternalLink size={15} /></button></div><div className="marketing-proof"><span><Check size={14} /> No backend setup</span><span><Check size={14} /> Accessible by default</span><span><Check size={14} /> Source-owned components</span></div></section>
        <section className="marketing-visual"><div className="floating-stat floating-stat--one"><span>Qualified replies</span><strong>+18%</strong></div><div className="floating-stat floating-stat--two"><span>Setup time</span><strong>2 days</strong></div><div className="marketing-window"><header><span /><span /><span /></header><div><aside /><main><span className="mock-line mock-line--title" /><span className="mock-line" /><span className="mock-line mock-line--short" /><div className="mock-chart">{[32, 46, 38, 64, 58, 82].map((height) => <span style={{ height: `${height}%` }} key={height} />)}</div></main></div></div></section>
      </div>
    </DemoStateBoundary>
  );
}
