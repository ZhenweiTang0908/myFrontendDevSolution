import { BookOpen, Boxes, Github, Home, Layers3, Shapes, Sparkles } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ConfigControl } from "./ConfigControl";
import { patterns } from "../patterns/patternRegistry";
import { useDesignConfig } from "../config/designConfigContext";

export function AppShell() {
  const { config } = useDesignConfig();
  const location = useLocation();
  const navigationByScale = {
    "small-toolbox": ["home-launcher", "ai-workspace", "content-editor", "help-docs"],
    "medium-product": ["dashboard", "search-list", "workflow", "reports-analytics"],
    "large-platform": ["dashboard", "data-table", "reports-analytics", "settings"],
  } as const;
  const scaleLabels = {
    "small-toolbox": "Tools",
    "medium-product": "Product areas",
    "large-platform": "Platform modules",
  } as const;
  const featuredPatterns = patterns.filter((pattern) => navigationByScale[config.scale].some((id) => id === pattern.id));
  const withSearch = (pathname: string) => ({ pathname, search: location.search });

  return (
    <div className="app-shell">
      <header className="top-rail">
        <NavLink className="brand" to={withSearch("/")} aria-label="Frontend Design home">
          <span className="brand__mark"><Sparkles size={18} /></span>
          <span>
            <strong>Frontend Design</strong>
            <small>Personal production system</small>
          </span>
        </NavLink>
        <div className="top-rail__status" aria-label="Current configuration">
          <span>{config.profile}</span>
          <span>{config.theme}</span>
          <span>{config.density}</span>
        </div>
        <a className="icon-action" href="https://github.com/ZhenweiTang0908/myFrontendDevSolution" aria-label="Open repository">
          <Github size={18} />
        </a>
      </header>

      <div className="app-shell__body">
        <nav className="side-rail" aria-label="Primary navigation">
          <NavLink to={withSearch("/")} end><Home size={17} /> Overview</NavLink>
          <NavLink to={withSearch("/resources/icons")}><Shapes size={17} /> Icon library</NavLink>
          <div className="side-rail__label">{scaleLabels[config.scale]}</div>
          {featuredPatterns.map((pattern) => (
            <NavLink key={pattern.id} to={withSearch(`/patterns/${pattern.id}`)}>
              {pattern.id === "help-docs" ? <BookOpen size={17} /> : pattern.id === "ai-workspace" ? <Sparkles size={17} /> : pattern.id === "workflow" ? <Layers3 size={17} /> : <Boxes size={17} />}
              {pattern.name}
            </NavLink>
          ))}
          <div className="side-rail__footer">
            <span className="status-dot" />
            28 patterns registered
          </div>
        </nav>

        <main className="app-main" id="main-content">
          <Outlet />
        </main>

        <div className="control-rail">
          <ConfigControl />
        </div>
      </div>
    </div>
  );
}
