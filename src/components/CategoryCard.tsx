import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CategoryDto } from "../services";

type CategoryCardProps = {
  category: CategoryDto;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  const { id, name, image } = category;

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1)",
          boxShadow: 6,
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <Divider />
      <CardContent>
        <Typography textAlign="center" variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};
