import type { ProductCondition, ProductMeta } from "@/lib/site-control";

const PRODUCT_META_PREFIX = "__JCGAMER_PRODUCT_META_V1__";

type StoredProductMeta = ProductMeta & {
  badge: string | null;
};

export function encodeProductBadge(
  badge: unknown,
  condition: unknown,
  unit: unknown,
) {
  const data: StoredProductMeta = {
    badge: String(badge || "").trim() || null,
    condition: condition === "USED" ? "USED" : "NEW",
    unit: String(unit || "unidade").trim() || "unidade",
  };

  return `${PRODUCT_META_PREFIX}${JSON.stringify(data)}`;
}

export function decodeProductBadge(value: string | null | undefined): {
  badge: string | null;
  metadata: ProductMeta | null;
} {
  if (!value?.startsWith(PRODUCT_META_PREFIX)) {
    return {
      badge: value || null,
      metadata: null,
    };
  }

  try {
    const data = JSON.parse(
      value.slice(PRODUCT_META_PREFIX.length),
    ) as Partial<StoredProductMeta>;

    return {
      badge: String(data.badge || "").trim() || null,
      metadata: {
        condition: data.condition === "USED" ? "USED" : "NEW",
        unit: String(data.unit || "unidade").trim() || "unidade",
      },
    };
  } catch {
    return {
      badge: null,
      metadata: null,
    };
  }
}

export function normalizeProductCondition(
  condition: unknown,
): ProductCondition {
  return condition === "USED" ? "USED" : "NEW";
}
