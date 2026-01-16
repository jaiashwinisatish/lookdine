## 2024-03-24 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** High-traffic pages like `RestaurantDetailPage` often use icon-only buttons (Back, Share, Heart) for aesthetic reasons but frequently miss `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always check `Button` components with `size="icon"` for `aria-label`. Use conditional labels for toggle states (like Favorite).
