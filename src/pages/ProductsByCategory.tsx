import { useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import {
  useGetAllProductsByCategoryQuery,
  useGetAllProductsByCategoryWithPaginationQuery,
} from "../services";
import { ProductCard } from "../components";
import { ArrowBack } from "@mui/icons-material";

const LIMIT = 4;

export const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [page, setPage] = useState(1);

  const { data: allProductsByCategory, isLoading: isLoadingAll } =
    useGetAllProductsByCategoryQuery(Number(categoryId));

  const { data: products, isLoading: isLoadingProducts } =
    useGetAllProductsByCategoryWithPaginationQuery({
      categoryId: Number(categoryId),
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    });

  const isLoading = isLoadingAll || isLoadingProducts;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!allProductsByCategory || allProductsByCategory.length < 1) {
    return (
      <Typography textAlign="center" variant="h6">
        No products
      </Typography>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="baseline">
        <IconButton
          component={RouterLink}
          to="/"
          aria-label="Go back"
          sx={{ alignSelf: "flex-start" }}
        >
          <ArrowBack />
        </IconButton>

        {products && products.length > 0 && (
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", flex: 1 }}
          >
            {products[0].category.name}
          </Typography>
        )}
      </Stack>

      <Divider sx={{ borderBottomWidth: "medium" }} />

      <Grid container spacing={3} pt={5}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Stack mt={8} direction="row" justifyContent="center">
        <Pagination
          count={Math.ceil(allProductsByCategory.length / LIMIT)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
};
