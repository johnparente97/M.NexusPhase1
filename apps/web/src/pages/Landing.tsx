import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Workflow as WorkflowIcon,
  ShieldCheck,
  Cpu,
  BarChart,
} from 'lucide-react';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';
import { CATEGORY_ICONS } from '../utils/constants';
import logoSymbol from '../assets/logo-symbol.jpg';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="flex-1 flex flex-col w-full select-none overflow-hidden pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative py-24 sm:py-32 px-6 flex flex-col items-center text-center justify-center min-h-[80vh]">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 h-[250px] w-[350px] bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center gap-6 z-10"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <img 
              src={logoSymbol} 
              alt="Meridian Nexus logo" 
              className="h-16 w-16 rounded-2xl border border-zinc-800 shadow-[0_0_24px_rgba(39,242,147,0.25)] hover:rotate-6 transition-transform duration-300 object-cover cursor-pointer"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-full font-bold">
              Now Live: Meridian Nexus Phase 1 MVP
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-display font-bold text-zinc-100 tracking-tight leading-[1.2] max-w-3xl"
          >
            Build intelligence. <br />
            Market capabilities. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Synthesize outcomes.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-sans"
          >
            The open creation, marketplace, workflow, and Intelligence Synthesis layer built on Meridian. Nexus coordinates intelligence, Meridian coordinates value.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-3.5 mt-2">
            <Link to="/exchange">
              <Button variant="primary" size="lg" className="font-bold flex items-center gap-1.5 shadow-xl">
                Explore Exchange
                <Compass className="h-4.5 w-4.5" />
              </Button>
            </Link>
            <Link to="/studio">
              <Button variant="outline" size="lg" className="font-bold flex items-center gap-1.5">
                Nexus Studio
                <Layers className="h-4.5 w-4.5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col items-center text-center gap-2.5 mb-12">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">
            Built for Secure AI Operations
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm leading-normal">
            Meridian Nexus abstracts away complex parameter tuning and key exposures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg w-fit shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Outcome-First Interface</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Define the inputs and output schema once. The system coordinates instructions, context mappings, and validation checks.
            </p>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
            <div className="p-2.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-lg w-fit shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Zero Key Exposure</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All credentials and API tokens are hosted securely on the server-side. Creators run analyses without exposing internal systems.
            </p>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg w-fit shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Verification & Trust</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Review and audit output templates, data handling rules, and refund criteria before initiating settlement authorizations.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. Category Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full bg-zinc-900/10 border-y border-zinc-900">
        <div className="flex flex-col items-center text-center gap-2.5 mb-12">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">
            Explore Workflow Categories
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm leading-normal">
            Discover tailored strategic workflows built across 12 operational domains.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {WORKFLOW_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.value] || WorkflowIcon;
            return (
              <Link key={cat.value} to={`/exchange?category=${cat.value}`}>
                <Card hover className="p-4 flex flex-col items-center text-center gap-3 bg-zinc-900 border-zinc-800/80 cursor-pointer">
                  <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-indigo-400">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-300 group-hover:text-zinc-100 truncate w-full">
                    {cat.label}
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Final Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 tracking-tight">
          Ready to build your first AI workflow?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
          Open Nexus Studio to declare parameters, instructions, and templates. Publish your work to the marketplace in minutes.
        </p>
        <Link to="/studio" className="mt-2">
          <Button variant="primary" size="lg" className="font-bold flex items-center gap-1.5 shadow-lg">
            Create Custom Workflow
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

    </div>
  );
}
