import { useState } from 'react';
import { Save, Store, Truck, CreditCard, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteSettings } from '@/data/site';
import { toast } from 'sonner';

const NAVY = '#141B2C';

export default function AdminSettings() {
  const [settings, setSettings] = useState(siteSettings);

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Admin</p>
          <h1 className="text-2xl font-display font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your store configuration</p>
        </div>
        <Button
          onClick={handleSave}
          className="rounded-xl gap-2"
          style={{
            background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
            color: NAVY,
            boxShadow: '0 4px 14px rgba(184,146,74,0.25)',
          }}
        >
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="rounded-xl mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="general"  className="rounded-lg gap-2"><Store      className="w-3.5 h-3.5" /> General</TabsTrigger>
          <TabsTrigger value="delivery" className="rounded-lg gap-2"><Truck      className="w-3.5 h-3.5" /> Delivery</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg gap-2"><CreditCard className="w-3.5 h-3.5" /> Payments</TabsTrigger>
          <TabsTrigger value="studio"   className="rounded-lg gap-2"><Palette    className="w-3.5 h-3.5" /> Studio</TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general">
          <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card space-y-6 max-w-xl">
            <h3 className="font-semibold flex items-center gap-2">
              <Store className="w-4 h-4" /> Store Information
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Store Name</Label>
                <Input defaultValue="Fabrician" className="mt-1.5 rounded-xl border-border/60" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact Email</Label>
                <Input defaultValue="hello@fabrician.com" className="mt-1.5 rounded-xl border-border/60" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact Phone</Label>
                <Input defaultValue="+880 1234-567890" className="mt-1.5 rounded-xl border-border/60" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Delivery */}
        <TabsContent value="delivery">
          <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card space-y-6 max-w-xl">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="w-4 h-4" /> Delivery Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Offer free delivery on all orders across Bangladesh</p>
                </div>
                <Switch
                  checked={settings.freeDelivery}
                  onCheckedChange={(checked) => setSettings({ ...settings, freeDelivery: checked })}
                />
              </div>
              <Separator />
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Delivery Fee (if not free)
                </Label>
                <Input
                  type="number"
                  defaultValue={settings.deliveryFee}
                  className="mt-1.5 rounded-xl border-border/60 max-w-[160px]"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card space-y-6 max-w-xl">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment Methods
            </h3>
            <div className="space-y-4">
              {Object.entries(settings.paymentMethods).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">
                      {key === 'bankTransfer' ? 'Bank Transfer' : key}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {key === 'bkash'        && 'bKash mobile payment'}
                      {key === 'nagad'        && 'Nagad mobile payment'}
                      {key === 'card'         && 'Visa / Mastercard'}
                      {key === 'cod'          && 'Cash on delivery'}
                      {key === 'bankTransfer' && 'Direct bank deposit'}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        paymentMethods: { ...settings.paymentMethods, [key]: checked },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Studio */}
        <TabsContent value="studio">
          <div className="p-6 rounded-2xl bg-card border border-border/40 shadow-card space-y-6 max-w-xl">
            <h3 className="font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4" /> Fabrician Studio Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Studio Enabled</p>
                  <p className="text-xs text-muted-foreground">Show Studio feature to customers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Trial Mode Badge</p>
                  <p className="text-xs text-muted-foreground">Display "Trial Preview" label in Studio</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Early Access Waitlist</p>
                  <p className="text-xs text-muted-foreground">Accept design submissions for review</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Max Reference Images per Submission
                </Label>
                <Input type="number" defaultValue="4" className="mt-1.5 rounded-xl border-border/60 max-w-[120px]" />
              </div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 text-xs text-amber-700 dark:text-amber-400">
              ⚠️ Fabrician Studio is currently in Trial/Preview mode. Custom manufacturing orders are not yet live.
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
