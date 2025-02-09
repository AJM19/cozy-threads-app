import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../Carousel";

export const stripeAPI = createApi({
  reducerPath: "stripeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://cozy-threads-stripe-api-production.up.railway.app/cozy-threads/",
  }),
  endpoints: (builder) => ({
    getProdcuts: builder.query<Product[], void>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
    }),
    createPaymentIntent: builder.query<any, { items: Product[] }>({
      query: ({ items }) => ({
        url: `/create-payment-intent`,
        method: "POST",
        body: {
          total: items.reduce((acc: number, item: Product) => {
            acc += item.default_price.unit_amount;

            return acc;
          }, 0),
        },
      }),
    }),
  }),
});

export const { useGetProdcutsQuery, useCreatePaymentIntentQuery } = stripeAPI;
