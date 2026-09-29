import type { PropsWithChildren, ReactNode } from "react";

interface ExampleFrameProps extends PropsWithChildren {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function ExampleFrame({ title, eyebrow, description, actions, className = "" , children }: ExampleFrameProps) {
  return (
    <section className={`golden-page ${className}`.trim()}>
      <header className="golden-page__header">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {actions && <div className="golden-page__actions">{actions}</div>}
      </header>
      {children}
    </section>
  );
}
