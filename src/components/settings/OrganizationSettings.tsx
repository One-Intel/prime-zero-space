import React from 'react';
import { useOrganization } from '../auth/OrganizationProvider';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '../ui/use-toast';
import { Skeleton } from '../ui/skeleton';

const organizationSchema = z.object({
  name: z.string().min(2).max(100),
  domain: z.string().min(3).max(100),
  contact_email: z.string().email(),
  contact_phone: z.string().optional(),
  timezone: z.string(),
  primary_color: z.string(),
  secondary_color: z.string(),
  logo_url: z.string().url().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal_code: z.string()
  }).optional()
});

export function OrganizationSettings() {
  const { organization, isLoading, updateOrganization } = useOrganization();
  const form = useForm({
    resolver: zodResolver(organizationSchema),
    defaultValues: organization || undefined
  });

  const onSubmit = async (data: z.infer<typeof organizationSchema>) => {
    try {
      await updateOrganization(data);
      toast({
        title: "Settings updated",
        description: "Your organization settings have been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update organization settings.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Name</label>
          <Input {...form.register('name')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Domain</label>
          <Input {...form.register('domain')} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Email</label>
          <Input {...form.register('contact_email')} type="email" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Phone</label>
          <Input {...form.register('contact_phone')} type="tel" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Timezone</label>
          <Input {...form.register('timezone')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Color</label>
            <Input {...form.register('primary_color')} type="color" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Secondary Color</label>
            <Input {...form.register('secondary_color')} type="color" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Logo URL</label>
          <Input {...form.register('logo_url')} type="url" />
        </div>

        <div className="pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>

      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium">Subscription Information</h3>
        <div className="mt-2 space-y-2">
          <p>Tier: {organization?.subscription_tier}</p>
          <p>Users: {organization?.max_users} maximum</p>
          <p>Devices: {organization?.max_devices} maximum</p>
          {organization?.subscription_ends_at && (
            <p>Expires: {new Date(organization.subscription_ends_at).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
