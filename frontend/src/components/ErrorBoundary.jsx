import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleCatch = (error, errorInfo) => {
    // You can log the error to a service or perform additional actions here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    // You can customize the error message or render a specific error component
    return (
      <div>
        <h1>Unexpected Application Error!</h1>
        <p>Sorry, something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <React.ErrorBoundary
      FallbackComponent={ErrorFallback}
      onCatch={handleCatch}
    >
      {children}
    </React.ErrorBoundary>
  );
};

// Custom error fallback component
const ErrorFallback = ({ error }) => (
  <div>
    <h1>Unexpected Application Error!</h1>
    <p>Error details: {error.message}</p>
    <p>Sorry, something went wrong. Please try again later.</p>
  </div>
);

export default ErrorBoundary;
