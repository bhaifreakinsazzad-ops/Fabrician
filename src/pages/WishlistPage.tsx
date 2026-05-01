import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { useWishlist } from '@/store/useWishlist';
import { products } from '@/data/products';

export default function WishlistPage() {
  const { items } = useWishlist();
  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean) as typeof products;

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-flex mb-8">
            <div className="absolute inset-0 rounded-full bg-rose-400/15 blur-2xl" />
            <div className="relative w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-800/30 flex items-center justify-center">
              <Heart className="w-9 h-9 text-rose-400" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-semibold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            Save pieces you love — tap the heart on any product to add it here.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-2xl text-white"
            style={{
              background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
              boxShadow: '0 4px 20px rgba(184,146,74,0.28)',
            }}
          >
            <Link to="/shop">Explore Collection <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Saved</p>
          <h1 className="text-3xl font-display font-semibold">Your Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'piece' : 'pieces'} saved
          </p>
        </div>
        <Button asChild variant="outline" className="hidden sm:flex rounded-2xl border-border/60 gap-2">
          <Link to="/cart">
            <ShoppingBag className="w-4 h-4" /> View Cart
          </Link>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {wishlistProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Continue shopping */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">Looking for more?</p>
        <Button asChild variant="outline" className="rounded-2xl border-border/60">
          <Link to="/shop">Continue Exploring <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      </div>
    </motion.div>
  );
}
