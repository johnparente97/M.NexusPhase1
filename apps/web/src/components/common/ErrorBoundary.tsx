import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside React Tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 p-6 flex flex-col items-center text-center gap-4">
            <div className="p-3 bg-rose-950/20 border border-rose-900/30 text-rose-400 rounded-lg">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-200">Something went wrong</h3>
            <p className="text-xs text-zinc-500 leading-normal max-w-[280px]">
              {this.state.error?.message || 'An unexpected runtime error occurred inside the user interface.'}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 font-bold"
            >
              Reset Interface
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
