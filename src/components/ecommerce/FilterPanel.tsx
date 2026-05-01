import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { categories, sizeOptions, colorOptions, priceRanges } from '@/data/products';
import { cn } from '@/lib/utils';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: string | null;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  productCount?: number;
  className?: string;
}

export function FilterPanel({ filters, onFilterChange, className }: FilterPanelProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const clearFilters = () => {
    onFilterChange({ categories: [], sizes: [], colors: [], priceRange: null });
  };

  const activeCount = filters.categories.length + filters.sizes.length + filters.colors.length + (filters.priceRange ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold" style={{ color: '#202432' }}>Filters</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="text-xs hover:underline" style={{ color: '#B8924A' }}>
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium mb-3">Categories</h4>
        <div className="space-y-2.5">
          {categories.slice(1).map((cat) => (
            <div key={cat.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={filters.categories.includes(cat.id)}
                onCheckedChange={() => updateFilter('categories', toggleArray(filters.categories, cat.id))}
              />
              <Label htmlFor={`cat-${cat.id}`} className="text-sm text-muted-foreground cursor-pointer">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h4 className="text-sm font-medium mb-3">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter('sizes', toggleArray(filters.sizes, size))}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
              style={{
                backgroundColor: filters.sizes.includes(size) ? '#C8A57A' : '#FFFFFF',
                color: filters.sizes.includes(size) ? '#FFFFFF' : '#69707D',
                borderColor: filters.sizes.includes(size) ? '#C8A57A' : '#E8DED2',
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h4 className="text-sm font-medium mb-3">Colors</h4>
        <div className="space-y-2.5">
          {colorOptions.map((color) => (
            <div key={color.name} className="flex items-center gap-2.5">
              <Checkbox
                id={`col-${color.name}`}
                checked={filters.colors.includes(color.name)}
                onCheckedChange={() => updateFilter('colors', toggleArray(filters.colors, color.name))}
              />
              <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
              <Label htmlFor={`col-${color.name}`} className="text-sm text-muted-foreground cursor-pointer">
                {color.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price */}
      <div>
        <h4 className="text-sm font-medium mb-3">Price Range</h4>
        <div className="space-y-2.5">
          {priceRanges.map((range) => (
            <div key={range.label} className="flex items-center gap-2.5">
              <Checkbox
                id={`price-${range.label}`}
                checked={filters.priceRange === range.label}
                onCheckedChange={(checked) => updateFilter('priceRange', checked ? range.label : null)}
              />
              <Label htmlFor={`price-${range.label}`} className="text-sm text-muted-foreground cursor-pointer">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn('hidden lg:block w-64 flex-shrink-0', className)}>
        <FilterContent />
      </div>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeCount > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center text-white"
                  style={{ backgroundColor: '#C8A57A' }}
                >
                  {activeCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
