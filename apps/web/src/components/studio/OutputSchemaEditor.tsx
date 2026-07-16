import React from 'react';
import { WorkflowOutputDefinition } from '@meridian-nexus/shared-types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { generateId } from '../../utils/id';

export interface OutputSchemaEditorProps {
  values: WorkflowOutputDefinition[];
  onChange: (defs: WorkflowOutputDefinition[]) => void;
}

export const OutputSchemaEditor: React.FC<OutputSchemaEditorProps> = ({ values, onChange }) => {
  const handleAddSection = () => {
    const newSection: WorkflowOutputDefinition = {
      id: generateId('out'),
      versionId: '',
      sectionKey: `section_${values.length + 1}`,
      label: `Section ${values.length + 1}`,
      type: 'paragraph',
      description: '',
      displayOrder: values.length,
    };
    onChange([...values, newSection]);
  };

  const handleRemoveSection = (idx: number) => {
    const next = values.filter((_, i) => i !== idx);
    next.forEach((item, i) => {
      item.displayOrder = i;
    });
    onChange(next);
  };

  const handleSectionChange = (idx: number, key: keyof WorkflowOutputDefinition, val: any) => {
    const next = [...values];
    next[idx] = {
      ...next[idx]!,
      [key]: val,
    };
    onChange(next);
  };

  const handleMove = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === values.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const next = [...values];
    
    const temp = next[idx]!;
    next[idx] = next[targetIdx]!;
    next[targetIdx] = temp;

    next.forEach((item, i) => {
      item.displayOrder = i;
    });

    onChange(next);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h4 className="text-xs font-semibold text-zinc-300">Output Layout Structure</h4>
        <Button variant="secondary" size="sm" onClick={handleAddSection} className="font-semibold gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Output Section
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {values.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center italic">No output sections defined yet. Add at least one section.</p>
        ) : (
          values.map((section, idx) => (
            <div key={section.id || idx} className="flex gap-4 items-start p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
              <div className="flex flex-col gap-1 shrink-0 pt-2.5">
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 cursor-pointer"
                  disabled={idx === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  className="text-zinc-600 hover:text-zinc-300 disabled:opacity-30 cursor-pointer"
                  disabled={idx === values.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  value={section.sectionKey}
                  onChange={(e) => handleSectionChange(idx, 'sectionKey', e.target.value)}
                  label="Section Key (machine name)"
                  placeholder="e.g., executive_summary"
                  required
                />
                
                <Input
                  value={section.label}
                  onChange={(e) => handleSectionChange(idx, 'label', e.target.value)}
                  label="Section Label (display title)"
                  placeholder="e.g., Executive Summary"
                  required
                />

                <Select
                  value={section.type}
                  onChange={(e) => handleSectionChange(idx, 'type', e.target.value)}
                  label="Render Output Format"
                  options={[
                    { label: 'Standard text Paragraph', value: 'paragraph' },
                    { label: 'Unordered bulleted List', value: 'list' },
                    { label: 'Key KPIs metrics blocks', value: 'metrics' },
                    { label: 'Risks & mitigations list', value: 'risks' },
                    { label: 'Prioritized checklist', value: 'action-items' },
                    { label: 'Comparison Matrix Table', value: 'table' },
                  ]}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveSection(idx)}
                className="text-zinc-600 hover:text-rose-400 p-2 shrink-0 pt-8 cursor-pointer"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default OutputSchemaEditor;
