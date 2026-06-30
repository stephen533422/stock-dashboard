import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Dashboard } from "./routes/Dashboard";
import { StockDetail } from "./routes/StockDetail";

function ErrorFallback({ resetErrorBoundary }: Readonly<FallbackProps>) {
  const { t } = useTranslation();
  return (
    <div className="state-box" role="alert">
      <p>{t("error.loadFailed")}</p>
      <button type="button" className="state-btn" onClick={resetErrorBoundary}>
        {t("action.retry")}
      </button>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useTranslation();
  return (
    <div className="state-box" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{t("state.loading")}</span>
    </div>
  );
}

export default function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
