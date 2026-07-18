import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useThemeStore } from '../stores/theme-store';
import { useWallet } from '../hooks/useWallet';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { User, Shield, Moon, Sun, Settings } from 'lucide-react';

export default function Profile() {
  const { user, linkedWallets } = useAuth();
  const wallet = useWallet();
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

        {/* Linked Wallets Card */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-1.5">
            <Shield className="h-4.5 w-4.5 text-zinc-400" />
            Linked Wallets & Cryptographic Security
          </h3>

          <div className="flex flex-col gap-4.5">
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Verify and link non-custodial wallets to authorize x402 payment requirements on the Base Sepolia network.
            </p>

            {linkedWallets && linkedWallets.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {linkedWallets.map((w) => (
                  <div key={w.walletAddress} className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-semibold text-zinc-300">
                        {w.walletAddress}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      Linked: {new Date(w.verifiedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl p-4.5 flex flex-col items-center justify-center text-center gap-1">
                <span className="text-xs font-semibold text-zinc-400">No linked wallets detected</span>
                <span className="text-[10px] text-zinc-600">Link a wallet to start executing paid capabilities</span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-zinc-300">
                  {wallet.isConnected ? `Connected: ${wallet.walletAddress?.substring(0, 6)}...${wallet.walletAddress?.substring(wallet.walletAddress.length - 4)}` : 'Wallet Disconnected'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {wallet.isConnected ? 'Ready to sign link challenge' : 'Connect via browser extension'}
                </span>
              </div>

              {!wallet.isConnected ? (
                <Button type="button" variant="secondary" size="sm" onClick={wallet.connectWallet} className="font-bold flex items-center gap-1.5">
                  Connect Wallet
                </Button>
              ) : (
                <Button 
                  type="button" 
                  variant="primary" 
                  size="sm" 
                  onClick={wallet.linkWalletAddress} 
                  className="font-bold flex items-center gap-1.5"
                  disabled={linkedWallets?.some((w) => w.walletAddress.toLowerCase() === wallet.walletAddress?.toLowerCase())}
                >
                  {linkedWallets?.some((w) => w.walletAddress.toLowerCase() === wallet.walletAddress?.toLowerCase())
                    ? 'Wallet Linked'
                    : 'Link Wallet Account'}
                </Button>
              )}
            </div>
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
