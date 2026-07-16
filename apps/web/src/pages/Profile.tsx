import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useThemeStore } from '../stores/theme-store';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { User, Shield, Moon, Sun, Settings } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { theme, setTheme } = useThemeStore();
  const { toast } = useToast();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      displayName: user?.displayName || '',
      bio: '',
      company: '',
      website: '',
      location: '',
      theme: theme,
    },
  });

  const handleSave = (data: any) => {
    if (data.theme) {
      setTheme(data.theme);
    }
    toast('Profile and theme preferences updated successfully!', 'success');
  };

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-6 py-6 gap-6 select-none pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-1.5 border-b border-zinc-900 pb-5">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">Account Settings</h1>
        <p className="text-xs text-zinc-500">Configure your profile details and design theme variables.</p>
      </div>

      <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-6">
        
        {/* Profile Card */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-1.5">
            <User className="h-4.5 w-4.5 text-zinc-400" />
            Profile Details
          </h3>

          <Input
            {...register('displayName')}
            label="Display Name"
            placeholder="e.g., Sarah Jenkins"
          />

          <Textarea
            {...register('bio')}
            label="Bio / Description"
            placeholder="Tell us about yourself..."
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register('company')}
              label="Company Name"
              placeholder="e.g., Acme Corp"
            />
            <Input
              {...register('location')}
              label="Location"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
        </Card>

        {/* Theme Settings Card */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-1.5">
            <Moon className="h-4.5 w-4.5 text-zinc-400" />
            Design Settings
          </h3>

          <div className="flex items-center justify-between gap-6 border-b border-zinc-800 pb-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-zinc-300">Design Theme Mode</span>
              <span className="text-[10px] text-zinc-500">Set dark-first templates globally</span>
            </div>
            
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-40 text-xs"
                  options={[
                    { label: 'Dark theme', value: 'dark' },
                    { label: 'Light theme', value: 'light' },
                    { label: 'System settings', value: 'system' },
                  ]}
                />
              )}
            />
          </div>
        </Card>

        <div className="flex justify-end gap-3 mt-2">
          <Button type="submit" variant="primary" className="font-bold">
            Save Preferences
          </Button>
        </div>

      </form>

    </div>
  );
}
