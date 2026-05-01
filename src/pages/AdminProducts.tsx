import { useState } from 'react';
import { Search, Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const NAVY = '#141B2C';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [productList, setProductList] = useState(products);

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setProductList(productList.map((p) =>
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Admin</p>
          <h1 className="text-2xl font-display font-semibold">Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your product catalogue</p>
        </div>
        <Button
          className="rounded-xl gap-2 text-white"
          style={{
            background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
            color: NAVY,
          }}
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Table card */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">{filtered.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Product</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Stock</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-border/30"
                      />
                      <span className="font-medium text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 capitalize text-muted-foreground">{product.category}</td>
                  <td className="py-3 px-2">
                    <span className="font-medium">৳{product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-muted-foreground line-through ml-2 text-xs">৳{product.compareAtPrice}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">
                    {product.variants.reduce((sum, v) => sum + v.stock, 0)}
                  </td>
                  <td className="py-3 px-2">
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      product.isActive
                        ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400'
                    )}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                        title={product.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {product.isActive
                          ? <EyeOff className="w-4 h-4 text-muted-foreground" />
                          : <Eye className="w-4 h-4 text-muted-foreground" />
                        }
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-10">No products match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
