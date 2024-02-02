import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/create-product`,
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),

    getProducts: builder.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (options) => {
        const { productId, updatedInfo } = options;
        return {
          url: `/products/${productId}`,
          method: "PATCH",
          body: updatedInfo,
        };
      },
      invalidatesTags: ["products"],
    }),

    deleteProducts: builder.mutation({
      query: (idList) => ({
        url: `/products`,
        method: "DELETE",
        body: idList,
      }),
      invalidatesTags: ["products"],
    }),

    sellProduct: builder.mutation({
      query: (sellInfo) => ({
        url: `/sales/sell`,
        method: "POST",
        body: sellInfo,
      }),
      invalidatesTags: ["products", "salesHistory"],
    }),

    sellsHistory: builder.query({
      query: (historyType) => ({
        url: `/sales?historyType=${historyType}`,
        method: "GET",
      }),
      providesTags: ["salesHistory"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductsMutation,
  useSellProductMutation,
  useSellsHistoryQuery,
} = productApi;
