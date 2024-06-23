import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductDto } from "../services";

type ProductCardProps = {
  product: ProductDto;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const { id, title, price, description, images } = product;

  const handleOpenProduct = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      sx={{
        width: 450,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1)",
          boxShadow: 6,
        },
      }}
      onClick={handleOpenProduct}
    >
      <CardMedia
        component="img"
        image={images[1]}
        alt={title}
        sx={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <Divider />
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ minHeight: 80 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 700 }}>
          {price} $
        </Typography>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: 40,
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
