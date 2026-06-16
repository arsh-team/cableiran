export interface Product {
  id: string;
  slug: string;
  icon: string;
  category: "fiber" | "power" | "network" | "infrastructure";
}

export const products: Product[] = [
  {
    id: "fiber-optic-telecom",
    slug: "fiber-optic-telecom",
    icon: "fiber",
    category: "fiber",
  },
  {
    id: "acsr-abc",
    slug: "acsr-abc",
    icon: "power",
    category: "power",
  },
  {
    id: "overhead-lines",
    slug: "overhead-lines",
    icon: "overhead",
    category: "power",
  },
  {
    id: "rigid-aluminum",
    slug: "rigid-aluminum",
    icon: "rigid",
    category: "power",
  },
  {
    id: "network-cables",
    slug: "network-cables",
    icon: "network",
    category: "network",
  },
  {
    id: "micro-fiber",
    slug: "micro-fiber",
    icon: "micro",
    category: "fiber",
  },
  {
    id: "drop-cables",
    slug: "drop-cables",
    icon: "drop",
    category: "fiber",
  },
  {
    id: "microducts",
    slug: "microducts",
    icon: "duct",
    category: "infrastructure",
  },
];

export const categories = [
  { id: "all", key: "filter_all" },
  { id: "fiber", key: "filter_fiber" },
  { id: "power", key: "filter_power" },
  { id: "network", key: "filter_network" },
  { id: "infrastructure", key: "filter_infrastructure" },
] as const;
