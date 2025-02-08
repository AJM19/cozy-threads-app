import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stripeAPI = createApi({
  reducerPath: "stripeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cozy-threads-stripe-api.onrender.com/cozy-threads/",
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query<any, void>({
      query: () => ({
        url: `/customers`,
        method: "GET",
      }),
    }),
    getProdcuts: builder.query<any, void>({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
    }),
    createPaymentIntent: builder.query<any, { items: { id: number }[] }>({
      query: ({ items }) => ({
        url: `/create-payment-intent`,
        method: "POST",
        body: { products: items.map((item) => item.id) },
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetProdcutsQuery,
  useCreatePaymentIntentQuery,
} = stripeAPI;
