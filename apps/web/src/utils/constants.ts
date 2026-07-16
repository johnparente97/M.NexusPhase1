import {
  Search,
  Megaphone,
  TrendingUp,
  Settings,
  BarChart3,
  Code,
  FileText,
  DollarSign,
  Headphones,
  Zap,
  ShoppingCart,
  Target,
} from 'lucide-react';

export const CATEGORY_ICONS: Record<string, React.ComponentType<any>> = {
  research: Search,
  marketing: Megaphone,
  sales: TrendingUp,
  'business-operations': Settings,
  'data-analysis': BarChart3,
  development: Code,
  content: FileText,
  finance: DollarSign,
  'customer-support': Headphones,
  productivity: Zap,
  procurement: ShoppingCart,
  strategy: Target,
};

export const CATEGORY_LABELS: Record<string, string> = {
  research: 'Research',
  marketing: 'Marketing',
  sales: 'Sales',
  'business-operations': 'Business Operations',
  'data-analysis': 'Data Analysis',
  development: 'Development',
  content: 'Content',
  finance: 'Finance',
  'customer-support': 'Customer Support',
  productivity: 'Productivity',
  procurement: 'Procurement',
  strategy: 'Strategy',
};

export const CATEGORY_COLORS: Record<string, string> = {
  research: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  marketing: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  sales: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'business-operations': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  'data-analysis': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  development: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  content: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  finance: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'customer-support': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  productivity: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  procurement: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  strategy: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};
