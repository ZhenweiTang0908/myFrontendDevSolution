import { ArrowLeft, Info, Sparkles } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDesignConfig } from "../config/designConfigContext";
import { getPattern } from "../patterns/patternRegistry";
import { PatternExample } from "../patterns/examples/PatternExample";

export function PatternPage() {
  const { patternId } = useParams();
  const location = useLocation();
  const pattern = getPattern(patternId);
  const { config } = useDesignConfig();

  if (!pattern) {
    return (
      <section className="state-panel">
        <h1>Pattern not found</h1>
        <p>The requested Page Pattern is not registered.</p>
        <Link className="button button--primary" to={{ pathname: "/", search: location.search }}>Return to catalog</Link>
      </section>
    );
  }

  return (
    <div className="page-stack">
      <header className="pattern-header">
        <Link className="back-link" to={{ pathname: "/", search: location.search }}><ArrowLeft size={15} /> Pattern catalog</Link>
        <div className="pattern-header__title">
          <div>
            <span className="eyebrow">{pattern.category}</span>
            <h1>{pattern.name}</h1>
            <p>{pattern.summary}</p>
          </div>
          <span className="profile-chip">{config.profile}</span>
        </div>
      </header>

      <section className="example-stage" aria-label={`${pattern.name} Golden Example`}>
        <div className="example-stage__glow" aria-hidden="true" />
        <div className="example-window">
          <header className="example-window__bar">
            <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
            <span>Golden Example · {config.state}</span>
            <button className="button button--quiet" type="button">Preview action</button>
          </header>
          <PatternExample patternId={pattern.id} />
        </div>
      </section>

      <section className="pattern-notes">
        <article><Info size={18} /><div><h2>Use when</h2><p>{pattern.suitedFor}.</p></div></article>
        <article><Sparkles size={18} /><div><h2>Supported profiles</h2><p>{pattern.profiles.join(", ")}.</p></div></article>
      </section>
    </div>
  );
}
