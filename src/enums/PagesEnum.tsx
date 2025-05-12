export const Pages = {
  CYCLES: "CYCLES",
  CUSTOMER: "CUSTOMER",
  PRODUCT: "PRODUCT"
}

export type PagesEnum = typeof Pages[keyof typeof Pages];