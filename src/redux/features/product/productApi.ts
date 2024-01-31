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
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductsMutation,
} = productApi;
