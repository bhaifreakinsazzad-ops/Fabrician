import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Top-of-page gold progress bar — shows reading position.
 * Sits just below the fixed AppHeader. Spring-eased for smoothness.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 z-[60] origin-left pointer-events-none"
      style={{
        top: 0,
        height: '2px',
        scaleX,
        background: 'linear-gradient(90deg, #C7A36A 0%, #F0CE83 50%, #C7A36A 100%)',
        boxShadow: '0 1px 8px rgba(199,163,106,0.55)',
      }}
    />
  );
}
