import { Card, Skeleton, Box, CardContent } from "@mui/material";

const BookCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "16px",
        boxShadow: 1,
        "&:hover": { boxShadow: 3 },
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={208}
        animation="wave"
      />
      <CardContent>
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="100%" animation="wave" />
          <Skeleton width="80%" animation="wave" />
          <Skeleton width="90%" animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCardSkeleton;
