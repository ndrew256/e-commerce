import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiPaths } from "./routes.ts";

export type CategoryDto = {
  id: number;
  name: string;
  image: string;
};

export type ProductDto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};

type ProductReqDto = {
  categoryId: number;
  offset?: number;
  limit?: number;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({ baseUrl: ApiPaths.BASE_URL }),
  endpoints: (builder) => ({
    searchProduct: builder.query<ProductDto[], string>({
      query: (searchTerm) => `${ApiPaths.PRODUCTS}/?title=${searchTerm}`,
    }),

    getProductById: builder.query<ProductDto, number>({
      query: (productId) => `${ApiPaths.PRODUCTS}/${productId}`,
    }),

    getAllProductsByCategory: builder.query<ProductDto[], number>({
      query: (categoryId) => `${ApiPaths.CATEGORIES}/${categoryId}/products`,
    }),

    getAllProductsByCategoryWithPagination: builder.query<
      ProductDto[],
      ProductReqDto
    >({
      query: ({ categoryId, offset = 0, limit = 4 }) =>
        `${ApiPaths.CATEGORIES}/${categoryId}/products?offset=${offset}&limit=${limit}`,
    }),

    getCategories: builder.query<CategoryDto[], void>({
      query: () => `${ApiPaths.CATEGORIES}`,
    }),
  }),
});

export const {
  useSearchProductQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetAllProductsByCategoryQuery,
  useGetAllProductsByCategoryWithPaginationQuery,
} = productsApi;
