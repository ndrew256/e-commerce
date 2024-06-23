import {
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useGetCategoriesQuery } from "../services";
import { CategoryCard } from "./CategoryCard.tsx";

export const Categories = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography variant="h6" textAlign="center">
        Error fetching categories.
      </Typography>
    );
  }

  return (
    <Stack>
      <Typography variant="h4" gutterBottom alignSelf="center">
        Categories
      </Typography>

      <Divider sx={{ borderBottomWidth: "medium" }} />

      <Grid container spacing={3} pt={5}>
        {categories?.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
