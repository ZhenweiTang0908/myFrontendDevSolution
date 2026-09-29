import { ArrowRight, Check, FileSpreadsheet, GripVertical, Link2, Settings2, ShieldAlert, UploadCloud, WandSparkles } from "lucide-react";
import { useState } from "react";
import { DemoStateBoundary } from "../../components/DemoStateBoundary";
import { ExampleFrame } from "../../components/ExampleFrame";
import { AsyncActionButton } from "../../components/AsyncActionButton";
import { RangeSliderField, SliderField } from "../../components/SliderField";
import type { GoldenExampleProps } from "./exampleTypes";

export function FormExample({ state }: GoldenExampleProps) {
  const [creativity, setCreativity] = useState(62);
  return (
    <ExampleFrame title="Create campaign" description="Related fields are grouped; validation stays beside its owner." actions={<><button className="button button--secondary" type="button">Save draft</button><AsyncActionButton onAction={() => new Promise((resolve) => setTimeout(resolve, 450))} successMessage="Review ready.">Review campaign <ArrowRight size={16} /></AsyncActionButton></>}>
      <DemoStateBoundary state={state}>
        <form className="structured-form" onSubmit={(event) => event.preventDefault()}>
          <section className="form-section"><div className="form-section__intro"><span>01</span><div><h3>Campaign identity</h3><p>Name this work so it remains recognizable later.</p></div></div><div className="form-fields"><label className="field field--wide"><span>Name</span><input defaultValue="Q4 operations leaders" /><small>Visible only inside your workspace.</small></label><label className="field"><span>Audience</span><select defaultValue="shortlist"><option value="shortlist">Operations shortlist · 24</option></select></label><label className="field"><span>Language</span><select defaultValue="english"><option value="english">English</option><option>German</option></select></label></div></section>
          <section className="form-section"><div className="form-section__intro"><span>02</span><div><h3>Message style</h3><p>Set intent, then tune only what materially changes the result.</p></div></div><div className="form-fields"><label className="field field--wide"><span>Objective</span><textarea defaultValue="Start a useful conversation about reducing manual campaign operations." /></label><div className="field--wide"><SliderField label="Creative variation" description="Higher values produce more diverse wording." value={creativity} min={0} max={100} unit="%" precise onCommit={setCreativity} /></div></div></section>
        </form>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function SettingsExample({ state }: GoldenExampleProps) {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [balance, setBalance] = useState(58);
  const [threshold, setThreshold] = useState(72);
  return (
    <ExampleFrame title="Workspace settings" description="Stable sections, local save feedback, and an isolated danger zone.">
      <DemoStateBoundary state={state}>
        <div className="settings-layout">
          <nav className="settings-nav" aria-label="Settings sections"><button className="is-active" type="button"><Settings2 size={16} /> General</button><button type="button"><Link2 size={16} /> Integrations</button><button type="button"><WandSparkles size={16} /> AI defaults</button><button type="button"><ShieldAlert size={16} /> Security</button></nav>
          <div className="settings-content">
            <section><div className="settings-section-heading"><div><h3>General</h3><p>Shared defaults for every tool in this workspace.</p></div><span className="saved-state"><Check size={14} /> Saved</span></div><div className="form-fields"><label className="field"><span>Workspace name</span><input defaultValue="Northstar Studio" /></label><label className="field"><span>Default language</span><select><option>English</option><option>German</option></select></label></div></section>
            <section>
              <div className="settings-section-heading"><div><h3>Slider interaction contract</h3><p>Use continuous input only when the space between values is meaningful.</p></div></div>
              <div className="slider-showcase">
                <SliderField label="Exploration balance" description="A perceptual choice with visible output." value={balance} min={0} max={100} unit="%" onCommit={setBalance} />
                <SliderField label="Approval threshold" description="Precise values pair with numeric entry." value={threshold} min={0} max={100} unit="%" precise onCommit={setThreshold} />
                <RangeSliderField label="Preferred match score" value={range} min={0} max={100} step={5} onCommit={setRange} />
                <SliderField label="Managed retention" description="Disabled because policy manages this value." value={30} min={0} max={90} unit=" days" disabled onCommit={() => undefined} />
                <SliderField label="Confidence floor" description="The selected value conflicts with the current policy." value={12} min={0} max={100} unit="%" error="Choose at least 20% for automated recommendations." onCommit={() => undefined} />
              </div>
            </section>
            <section className="danger-zone"><div><h3>Delete workspace</h3><p>Permanently remove projects, files, and configuration.</p></div><button className="button button--danger" type="button">Delete workspace</button></section>
          </div>
        </div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function WorkflowExample({ state }: GoldenExampleProps) {
  return (
    <ExampleFrame title="Launch a campaign" description="The current decision is prominent; completed context stays compact.">
      <DemoStateBoundary state={state}>
        <div className="workflow-overview">
          {["Audience", "Message", "Review", "Launch"].map((step, index) => <div className={index < 2 ? "is-complete" : index === 2 ? "is-current" : ""} key={step}><span>{index < 2 ? <Check size={14} /> : index + 1}</span><strong>{step}</strong></div>)}
        </div>
        <section className="workflow-card">
          <div className="workflow-card__main"><span className="eyebrow">Step 3 of 4</span><h3>Review before launch</h3><p>Confirm the audience and message. Only information that changes the decision is repeated here.</p><div className="review-summary"><article><span>Audience</span><strong>24 operations leaders</strong><small>Germany · B2B software</small></article><article><span>Message</span><strong>Operational efficiency</strong><small>English · concise tone</small></article><article><span>Schedule</span><strong>Tomorrow, 09:30</strong><small>Recipient local time</small></article></div></div>
          <aside className="workflow-card__aside"><strong>Ready to launch</strong><ul><li><Check size={14} /> All recipients have contact data</li><li><Check size={14} /> Message variables resolved</li><li><Check size={14} /> Sending window configured</li></ul><button className="button button--primary button--block" type="button">Launch campaign</button><button className="button button--quiet button--block" type="button">Back to message</button></aside>
        </section>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}

export function ImportMappingExample({ state }: GoldenExampleProps) {
  const rows = [["Full name", "name", "Maya Chen", "Matched"], ["Work email", "email", "maya@northstar.dev", "Matched"], ["Company size", "employees", "240", "Review"], ["Notes", "—", "Met at Summit", "Skipped"]];
  return (
    <ExampleFrame title="Import customer records" description="Upload, map, validate, preview, then commit—without hiding the data consequence.">
      <DemoStateBoundary state={state}>
        <div className="import-summary"><span className="icon-tile icon-tile--accent"><FileSpreadsheet size={20} /></span><span><strong>northstar-accounts.csv</strong><small>248 rows · 4 columns · 18 KB</small></span><button className="text-action" type="button">Replace file</button></div>
        <div className="workflow-overview workflow-overview--compact">{["Upload", "Map columns", "Validate", "Import"].map((step, index) => <div className={index === 0 ? "is-complete" : index === 1 ? "is-current" : ""} key={step}><span>{index === 0 ? <Check size={14} /> : index + 1}</span><strong>{step}</strong></div>)}</div>
        <div className="mapping-table"><div className="mapping-table__head"><span>Source column</span><span>Maps to</span><span>Sample</span><span>Status</span></div>{rows.map(([source, target, sample, status]) => <div className="mapping-table__row" key={source}><GripVertical size={15} /><strong>{source}</strong><select aria-label={`Map ${source}`} defaultValue={target}><option value="name">Full name</option><option value="email">Email</option><option value="employees">Employee count</option><option value="—">Do not import</option></select><code>{sample}</code><span className={`status-text status-text--${status.toLowerCase()}`}>{status}</span></div>)}</div>
        <div className="form-actions"><button className="button button--secondary" type="button"><UploadCloud size={16} /> Download mapping</button><button className="button button--primary" type="button">Validate 248 rows <ArrowRight size={16} /></button></div>
      </DemoStateBoundary>
    </ExampleFrame>
  );
}
