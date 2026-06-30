import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Dashboard } from "./routes/Dashboard";

function ErrorFallback({ resetErrorBoundary }: Readonly<FallbackProps>) {
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("error.loadFailed")}</p>
      <button type="button" onClick={resetErrorBoundary}>
        {t("action.retry")}
      </button>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useTranslation();
  return <p>{t("state.loading")}</p>;
}

export default function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
