import baseApi from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: `/products/create-product`,
        method: "POST",
        body: productInfo,
      }),
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
    }),

    deleteProducts: builder.mutation({
      query: (idList) => ({
        url: `/products`,
        method: "DELETE",
        body: idList,
      }),
    }),

    sellProduct: builder.mutation({
      query: (sellInfo) => ({
        url: `/sales/sell`,
        method: "POST",
        body: sellInfo,
      }),
    }),

    sellsHistory: builder.query({
      query: (historyType) => ({
        url: `/sales?historyType=${historyType}`,
        method: "GET",
      }),
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
