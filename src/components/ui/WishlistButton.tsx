"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import styles from "./WishlistButton.module.css";

type WishlistButtonProps = {
  slug: string;
  size?: number;
};

export default function WishlistButton({ slug, size = 22 }: WishlistButtonProps) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(slug);

  return (
    <button
      className={`${styles.button} ${wishlisted ? styles.wishlisted : styles.notWishlisted}`}
      onClick={() => toggle(slug)}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wishlisted}
    >
      <Heart
        size={size}
        fill={wishlisted ? "currentColor" : "none"}
      />
    </button>
  );
}
