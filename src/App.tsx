import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Dashboard } from "./routes/Dashboard";

function ErrorFallback({ resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <div>
      <p>資料載入失敗</p>
      <button type="button" onClick={resetErrorBoundary}>
        重試
      </button>
    </div>
  );
}

export default function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
      <Suspense fallback={<p>載入中…</p>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
