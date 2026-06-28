import { Category } from "@prisma/client";

export const CATEGORIES: Category[] = [
  Category.Food,
  Category.Transport,
  Category.Bills,
  Category.Shopping,
  Category.Entertainment,
  Category.Healthcare,
  Category.Other,
];

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.Food]: "Food",
  [Category.Transport]: "Transport",
  [Category.Bills]: "Bills",
  [Category.Shopping]: "Shopping",
  [Category.Entertainment]: "Entertainment",
  [Category.Healthcare]: "Healthcare",
  [Category.Other]: "Other",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  [Category.Food]: "fa-utensils",
  [Category.Transport]: "fa-car",
  [Category.Bills]: "fa-file-invoice-dollar",
  [Category.Shopping]: "fa-bag-shopping",
  [Category.Entertainment]: "fa-film",
  [Category.Healthcare]: "fa-heart-pulse",
  [Category.Other]: "fa-ellipsis",
};
