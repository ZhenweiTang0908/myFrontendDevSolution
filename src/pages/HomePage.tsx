import { ArrowRight, Blocks, Gauge, Palette, Shapes, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { patterns, type PatternCategory } from "../patterns/patternRegistry";

const categories = [...new Set(patterns.map((pattern) => pattern.category))] as PatternCategory[];

const pillars = [
  { icon: ShieldCheck, title: "Dependable", text: "Validated configurations and explicit states reduce AI guesswork." },
  { icon: Gauge, title: "Responsive", text: "Feedback is immediate, local, accessible, and motion-aware." },
  { icon: Palette, title: "Visually alive", text: "Color, depth, and motion add energy without obscuring the task." },
  { icon: Blocks, title: "Composable", text: "Patterns guide composition while source-owned components stay adaptable." },
];

export function HomePage() {
  const location = useLocation();
  const withSearch = (pathname: string) => ({ pathname, search: location.search });

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__content">
          <div className="eyebrow"><Sparkles size={14} /> A system for building, not browsing</div>
          <h1>Choose a proven page shape.<br />Keep the product unmistakably yours.</h1>
          <p>Concise information, rich feedback, controlled visual energy, and dependable task completion—encoded for people and AI.</p>
          <div className="hero-panel__actions">
            <Link className="button button--primary" to={withSearch("/patterns/home-launcher")}>Explore the first pattern <ArrowRight size={16} /></Link>
            <Link className="button button--secondary" to={withSearch("/resources/icons")}><Shapes size={16} /> Browse semantic icons</Link>
            <a className="button button--secondary" href="#catalog">View all 28 patterns</a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="hero-orbit__core"><Sparkles size={28} /></div>
          <span className="hero-orbit__node hero-orbit__node--one" />
          <span className="hero-orbit__node hero-orbit__node--two" />
          <span className="hero-orbit__node hero-orbit__node--three" />
        </div>
      </section>

      <section aria-labelledby="principles-title">
        <div className="section-heading">
          <div><span className="eyebrow">Design contract</span><h2 id="principles-title">Calm information. Active interface.</h2></div>
          <p>Restraint applies to what we say. Feedback and visual craft determine how the product feels.</p>
        </div>
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article className="pillar-card" key={title}>
              <span className="icon-tile"><Icon size={18} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="catalog" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div><span className="eyebrow">Golden examples</span><h2 id="catalog-title">Page Pattern catalog</h2></div>
          <p>Each route is a runnable answer to a recurring product-design problem.</p>
        </div>
        <div className="catalog-groups">
          {categories.map((category) => (
            <section className="catalog-group" key={category} aria-labelledby={`category-${category}`}>
              <h3 id={`category-${category}`}>{category}</h3>
              <div className="catalog-grid">
                {patterns.filter((pattern) => pattern.category === category).map((pattern) => (
                  <Link className="pattern-card" to={withSearch(`/patterns/${pattern.id}`)} key={pattern.id}>
                    <div><strong>{pattern.name}</strong><span>{pattern.summary}</span></div>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
