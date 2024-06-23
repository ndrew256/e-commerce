import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { useGetProductByIdQuery } from "../services";

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(productId));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !product) {
    return (
      <Typography textAlign="center" variant="h6">
        Error fetching product data.
      </Typography>
    );
  }

  const { title, price, description, images, category } = product;

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <IconButton
          component={RouterLink}
          to={`/products/${category.id}`}
          aria-label="Go back to products"
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
      </Stack>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Carousel
              animation="slide"
              duration={500}
              navButtonsAlwaysVisible
              sx={{ "& .Carousel-root": { height: "100%" } }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: { xs: 300, sm: 400, md: 500 },
                    objectFit: "cover",
                  }}
                />
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              ${price}
            </Typography>

            <Divider sx={{ borderBottomWidth: "medium" }} />

            <Typography variant="body1" paragraph pt={1}>
              {description}
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
              <Button variant="outlined" color="secondary">
                Add to Wishlist
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
