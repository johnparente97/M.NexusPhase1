import React from 'react';
import { WorkflowInputDefinition } from '@meridian-nexus/shared-types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { generateId } from '../../utils/id';

export interface InputFieldEditorProps {
  values: WorkflowInputDefinition[];
  onChange: (defs: WorkflowInputDefinition[]) => void;
}

export const InputFieldEditor: React.FC<InputFieldEditorProps> = ({ values, onChange }) => {
  const handleAddField = () => {
    const newField: WorkflowInputDefinition = {
      id: generateId('inp'),
      versionId: '',
      fieldKey: `param_${values.length + 1}`,
      label: `Parameter ${values.length + 1}`,
      description: '',
      type: 'text',
      placeholder: '',
      required: true,
      defaultValue: '',
      displayOrder: values.length,
      options: null,
      validation: null,
    };
    onChange([...values, newField]);
  };

  const handleRemoveField = (idx: number) => {
    const next = values.filter((_, i) => i !== idx);
    // re-index display orders
    next.forEach((item, i) => {
      item.displayOrder = i;
    });
    onChange(next);
  };

  const handleFieldChange = (idx: number, key: keyof WorkflowInputDefinition, val: any) => {
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
    
    // Swap
    const temp = next[idx]!;
    next[idx] = next[targetIdx]!;
    next[targetIdx] = temp;

    // re-index display order values
    next.forEach((item, i) => {
      item.displayOrder = i;
    });

    onChange(next);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <h4 className="text-xs font-semibold text-zinc-300">Input Parameters Definition</h4>
        <Button variant="secondary" size="sm" onClick={handleAddField} className="font-semibold gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Input Parameter
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {values.length === 0 ? (
          <p className="text-xs text-zinc-500 py-6 text-center italic">No parameters defined yet. Add at least one parameter.</p>
        ) : (
          values.map((field, idx) => (
            <div key={field.id || idx} className="flex gap-4 items-start p-4 bg-zinc-950 border border-zinc-900 rounded-xl">
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
                  value={field.fieldKey}
                  onChange={(e) => handleFieldChange(idx, 'fieldKey', e.target.value)}
                  label="Field Key (machine name)"
                  placeholder="e.g., target_audience"
                  required
                />
                
                <Input
                  value={field.label}
                  onChange={(e) => handleFieldChange(idx, 'label', e.target.value)}
                  label="Field Label (display name)"
                  placeholder="e.g., Target Audience"
                  required
                />

                <Select
                  value={field.type}
                  onChange={(e) => handleFieldChange(idx, 'type', e.target.value)}
                  label="Input Field Type"
                  options={[
                    { label: 'Short Text input', value: 'text' },
                    { label: 'Paragraph text Area', value: 'textarea' },
                    { label: 'Numeric limit', value: 'number' },
                    { label: 'Simulated currency value', value: 'currency' },
                    { label: 'Dropdown options Select', value: 'select' },
                    { label: 'Toggling switch', value: 'toggle' },
                  ]}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveField(idx)}
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
export default InputFieldEditor;
