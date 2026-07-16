import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDynamicInputSchema } from '@meridian-nexus/validation';
import { WorkflowInputDefinition } from '@meridian-nexus/shared-types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';

export interface DynamicFormProps {
  inputDefinitions: WorkflowInputDefinition[];
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  defaultValues?: Record<string, any>;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  inputDefinitions,
  onSubmit,
  onCancel,
  defaultValues = {},
}) => {
  // 1. Generate validation schema dynamically
  const schema = createDynamicInputSchema(inputDefinitions);

  // 2. Initialize Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...inputDefinitions.reduce((acc, def) => {
        acc[def.fieldKey] = def.defaultValue ?? (def.type === 'checkbox' || def.type === 'toggle' ? false : '');
        return acc;
      }, {} as Record<string, any>),
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-5">
        {inputDefinitions
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((def) => {
            const error = errors[def.fieldKey]?.message as string | undefined;

            return (
              <div key={def.id} className="w-full">
                {def.type === 'textarea' && (
                  <Controller
                    name={def.fieldKey}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label={def.label}
                        placeholder={def.placeholder || ''}
                        required={def.required}
                        error={error}
                        description={def.description || undefined}
                      />
                    )}
                  />
                )}

                {def.type === 'select' && (
                  <Controller
                    name={def.fieldKey}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={def.label}
                        required={def.required}
                        error={error}
                        description={def.description || undefined}
                      >
                        <option value="">Select option...</option>
                        {def.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                )}

                {(def.type === 'checkbox' || def.type === 'toggle') && (
                  <Controller
                    name={def.fieldKey}
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center justify-between border border-zinc-800 bg-zinc-950 p-4 rounded-xl">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-zinc-300">
                            {def.label} {def.required && <span className="text-rose-500">*</span>}
                          </label>
                          {def.description && (
                            <span className="text-[11px] text-zinc-500">{def.description}</span>
                          )}
                        </div>
                        <Toggle checked={!!field.value} onChange={field.onChange} />
                      </div>
                    )}
                  />
                )}

                {def.type !== 'textarea' && def.type !== 'select' && def.type !== 'checkbox' && def.type !== 'toggle' && (
                  <Controller
                    name={def.fieldKey}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type={def.type === 'number' || def.type === 'currency' ? 'number' : 'text'}
                        label={def.label}
                        placeholder={def.placeholder || ''}
                        required={def.required}
                        error={error}
                        description={def.description || undefined}
                      />
                    )}
                  />
                )}
              </div>
            );
          })}
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-5">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Back
        </Button>
        <Button type="submit" variant="primary" size="sm" className="font-bold">
          Review & Authorize
        </Button>
      </div>
    </form>
  );
};
export default DynamicForm;
