import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { iconCategories, iconEntries, iconRegistry } from "../icons/iconRegistry";

const AddIcon = iconRegistry.add.icon;
const CopyIcon = iconRegistry.copy.icon;
const HelpIcon = iconRegistry.help.icon;
const SuccessIcon = iconRegistry.success.icon;

export function IconLibraryPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredEntries = useMemo(() => iconEntries.filter(([key, definition]) => {
    if (!normalizedQuery) return true;
    return [key, definition.label, definition.category, definition.use, ...definition.aliases]
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  }), [normalizedQuery]);

  return (
    <div className="page-stack icon-library-page">
      <header className="resource-header">
        <span className="eyebrow">Semantic asset library</span>
        <h1>Choose icons by meaning, not appearance.</h1>
        <p>One curated Lucide icon represents each common product meaning. Search for the user intent, then use the registered key and keep the accompanying label accessible.</p>
        <label className="icon-search">
          <span className="icon-search__label">Search icons</span>
          <span className="icon-search__control">
            <Search aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try search, delete, company, pending…" />
          </span>
        </label>
        <div className="resource-header__summary" aria-live="polite">
          {filteredEntries.length} semantic icon{filteredEntries.length === 1 ? "" : "s"}
        </div>
      </header>

      <section className="icon-usage-strip" aria-labelledby="icon-usage-title">
        <div>
          <span className="eyebrow">Three reliable forms</span>
          <h2 id="icon-usage-title">Match the icon treatment to the job.</h2>
        </div>
        <div className="icon-usage-examples">
          <button className="button button--primary" type="button"><AddIcon aria-hidden="true" /> Create report</button>
          <button className="icon-action" type="button" aria-label="Copy link" title="Copy link">
            <CopyIcon aria-hidden="true" />
          </button>
          <span className="status-example status-example--success">
            <SuccessIcon aria-hidden="true" />
            Import complete
          </span>
        </div>
      </section>

      {filteredEntries.length > 0 ? (
        <div className="icon-category-list">
          {iconCategories.map((category) => {
            const entries = filteredEntries.filter(([, definition]) => definition.category === category);
            if (entries.length === 0) return null;
            return (
              <section className="icon-category" key={category} aria-labelledby={`icon-category-${category.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`}>
                <div className="icon-category__heading">
                  <h2 id={`icon-category-${category.toLowerCase().replaceAll(" ", "-").replace("&", "and")}`}>{category}</h2>
                  <span>{entries.length}</span>
                </div>
                <div className="icon-grid">
                  {entries.map(([key, definition]) => {
                    const Icon = definition.icon;
                    return (
                      <article className="icon-card" key={key}>
                        <div className="icon-card__topline">
                          <span className="icon-card__glyph"><Icon aria-hidden="true" /></span>
                          <div><h3>{definition.label}</h3><code>{key}</code></div>
                        </div>
                        <dl>
                          <div><dt>Use</dt><dd>{definition.use}</dd></div>
                          <div><dt>Avoid</dt><dd>{definition.avoid}</dd></div>
                        </dl>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="icon-empty" aria-labelledby="icon-empty-title">
          <HelpIcon className="icon-empty__glyph" aria-hidden="true" />
          <h2 id="icon-empty-title">No semantic icon matches “{query}”.</h2>
          <p>Search by intent—such as action, status, object, or navigation—rather than by shape.</p>
          <button className="button button--secondary" type="button" onClick={() => setQuery("")}>Clear search</button>
        </section>
      )}
    </div>
  );
}
