import { useLocation } from "react-router-dom";
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { ProductCard } from "../components";
import { useSearchProductQuery } from "../services";

export const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = (queryParams.get("title") || "").trim().toLowerCase();

  const {
    data: products,
    isLoading,
    isError,
  } = useSearchProductQuery(query, {
    skip: !query,
  });

  if (isLoading) return <CircularProgress />;

  if (isError || !products)
    return (
      <Typography textAlign="center" variant="h6">
        Error fetching products.
      </Typography>
    );

  if (products.length === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        {`No results for "${query}"`}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        textAlign="center"
        variant="h5"
        mb={3}
      >{`${products.length} products were found for the search query "${query}"`}</Typography>

      <Divider sx={{ borderBottomWidth: "medium" }} />

      <Grid container spacing={3} pt={5}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
