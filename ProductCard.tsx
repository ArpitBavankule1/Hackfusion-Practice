import { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProductCard() {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized position (-0.5 to 0.5)
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-[1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
      >
        {/* Shine effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: isHovered
              ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.3) 0%, transparent 50%)'
              : 'none',
            '--mouse-x': useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']),
            '--mouse-y': useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']),
          } as any}
        />

        {/* Product Image */}
        <div className="relative h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
          <Badge className="absolute top-4 left-4 z-20">New Arrival</Badge>
          <motion.div
            style={{
              transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1738920424218-3d28b951740a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzNzIxNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Premium Wireless Headphones"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-slate-900">Premium Wireless Headphones</h3>
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-slate-600">4.9</span>
              </div>
            </div>
            <p className="text-slate-600">
              Experience crystal-clear audio with active noise cancellation and 30-hour battery life.
            </p>
          </div>

          {/* Features */}
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Bluetooth 5.0</Badge>
            <Badge variant="secondary">ANC</Badge>
            <Badge variant="secondary">30h Battery</Badge>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <p className="text-slate-500 line-through">$299.99</p>
              <p className="text-slate-900">$249.99</p>
            </div>
            <Button className="gap-2">
              <ShoppingCart className="size-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* 3D depth layers */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
