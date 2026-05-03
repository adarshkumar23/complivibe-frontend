"use client";
import React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type HeroParallaxProduct = {
  title: string;
  link: string;
  /** Image card (Aceternity default). Omit when using framework text card. */
  thumbnail?: string;
  category?: string;
  description?: string;
};

const categoryCardStyles: Record<
  string,
  { pill: string; explore: string }
> = {
  "AI & Privacy": {
    pill: "bg-[#0070F3]/15 text-[#60a5fa]",
    explore: "text-[#60a5fa] group-hover/product:text-[#93c5fd]",
  },
  Security: {
    pill: "bg-[#10B981]/15 text-[#34d399]",
    explore: "text-[#34d399] group-hover/product:text-[#6ee7b7]",
  },
  Industry: {
    pill: "bg-[#F59E0B]/15 text-[#fbbf24]",
    explore: "text-[#fbbf24] group-hover/product:text-[#fcd34d]",
  },
};

export const HeroParallax = ({
  products,
  header,
  className,
}: {
  products: HeroParallaxProduct[];
  /** When set, replaces the default Aceternity headline block. */
  header?: React.ReactNode;
  className?: string;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [8, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15], [1, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [6, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-80, 400]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-[180vh] flex-col overflow-x-hidden overflow-y-visible py-16 antialiased [perspective:1000px] [transform-style:preserve-3d] md:min-h-[220vh] md:py-24",
        className,
      )}
    >
      {header ?? <Header />}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          y: translateY,
          opacity,
        }}
      >
        <motion.div className="mb-12 flex flex-row-reverse space-x-reverse space-x-6 md:mb-16 md:space-x-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.link}
            />
          ))}
        </motion.div>
        <motion.div className="mb-12 flex flex-row space-x-6 md:mb-16 md:space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.link}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.link}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
      <h1 className="text-2xl font-bold md:text-7xl dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: HeroParallaxProduct;
  translate: MotionValue<number>;
}) => {
  const isFrameworkCard =
    !product.thumbnail &&
    product.category != null &&
    product.description != null;
  const cat =
    product.category != null
      ? categoryCardStyles[product.category] ?? categoryCardStyles["AI & Privacy"]
      : categoryCardStyles["AI & Privacy"];

  if (isFrameworkCard) {
    return (
      <motion.div
        style={{ x: translate }}
        whileHover={{ y: -12 }}
        className="group/product relative h-96 w-[min(85vw,26rem)] shrink-0 sm:w-[26rem]"
      >
        <Link
          href={product.link}
          className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-6 shadow-none transition-all duration-300 hover:border-white/[0.14] hover:bg-[#111] hover:shadow-2xl"
        >
          <h2 className="text-lg font-semibold tracking-tight text-white">{product.title}</h2>
          <span
            className={cn(
              "mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold",
              cat.pill,
            )}
          >
            {product.category}
          </span>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-white/45">{product.description}</p>
          <div
            className={cn(
              "mt-4 border-t border-white/[0.06] pt-4 text-xs font-semibold",
              cat.explore,
            )}
          >
            Explore →
          </div>
        </Link>
      </motion.div>
    );
  }

  if (!product.thumbnail) {
    return null;
  }

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative h-96 w-[min(85vw,30rem)] shrink-0 sm:w-[30rem]"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          alt={product.title}
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};
