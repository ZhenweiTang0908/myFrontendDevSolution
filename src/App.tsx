import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./app/AppShell";
import { DesignConfigProvider } from "./config/DesignConfigProvider";
import { HomePage } from "./pages/HomePage";
import { IconLibraryPage } from "./pages/IconLibraryPage";
import { PatternPage } from "./pages/PatternPage";

export function App() {
  return (
    <DesignConfigProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="resources/icons" element={<IconLibraryPage />} />
          <Route path="patterns/:patternId" element={<PatternPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </DesignConfigProvider>
  );
}
