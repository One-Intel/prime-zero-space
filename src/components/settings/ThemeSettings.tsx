import React from 'react';
import { useTheme } from '../layout/ThemeProvider';
import { useOrganization } from '../auth/OrganizationProvider';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../ui/use-toast';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const { organization, updateOrganization } = useOrganization();

  const handleColorModeChange = (value: string) => {
    setTheme({ colorMode: value as 'light' | 'dark' | 'system' });
  };

  const handleColorChange = async (field: 'primaryColor' | 'secondaryColor' | 'accentColor', value: string) => {
    setTheme({ [field]: value });
    
    // If it's a primary or secondary color, update the organization settings too
    if (field === 'primaryColor' || field === 'secondaryColor') {
      try {
        await updateOrganization({
          [field === 'primaryColor' ? 'primary_color' : 'secondary_color']: value
        });
        toast({
          title: "Theme updated",
          description: "Your organization's theme has been updated successfully."
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update organization theme.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color Mode</Label>
            <Select 
              value={theme.colorMode} 
              onValueChange={handleColorModeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              />
              <Input 
                type="text" 
                value={theme.primaryColor}
                onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Secondary Color</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
              />
              <Input 
                type="text" 
                value={theme.secondaryColor}
                onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Accent Color</Label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
              />
              <Input 
                type="text" 
                value={theme.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Select 
              value={theme.borderRadius} 
              onValueChange={(value) => setTheme({ borderRadius: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="0.25rem">Small</SelectItem>
                <SelectItem value="0.5rem">Medium</SelectItem>
                <SelectItem value="1rem">Large</SelectItem>
                <SelectItem value="9999px">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select 
              value={theme.fontFamily} 
              onValueChange={(value) => setTheme({ fontFamily: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system-ui, -apple-system, sans-serif">System UI</SelectItem>
                <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setTheme(theme);
                toast({
                  title: "Theme Preview",
                  description: "Changes are saved automatically."
                });
              }}
            >
              Preview Changes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
