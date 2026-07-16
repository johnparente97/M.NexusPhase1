import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 p-6 flex flex-col items-center text-center gap-4">
        <div className="p-3 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-200">Page not found</h3>
        <p className="text-xs text-zinc-500 leading-normal max-w-[280px]">
          The resource or workspace page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="w-full mt-2">
          <Button variant="secondary" size="sm" className="w-full font-bold">
            Return Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
