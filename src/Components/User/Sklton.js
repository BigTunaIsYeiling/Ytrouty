import { Skeleton, Stack } from "@mui/material";

export default function Sklton() {
  return (
    <Stack direction="column" width="100%" spacing="20px">
      <Stack
        direction="column"
        alignItems="flex-start"
        width="100%"
        sx={{
          borderRadius: { xs: "3px", md: "8px" },
        }}
        padding="10px"
      >
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing="7px"
          >
            <Skeleton
              variant="circular"
              width="55px"
              height="55px"
              sx={{ backgroundColor: "#100F0F" }}
            />

            <Stack direction="column" alignItems="flex-start">
              <Skeleton
                variant="text"
                sx={{ fontSize: "20px", backgroundColor: "#100F0F" }}
                width="100px"
              />
              <Skeleton
                variant="text"
                height="15px"
                sx={{ fontSize: "11px", backgroundColor: "#100F0F" }}
                width="70px"
              />
            </Stack>
          </Stack>
        </Stack>
        <Stack width="100%" marginY="26px">
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ backgroundColor: "#100F0F" }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          width="100%"
          paddingY="5px"
        >
          <Skeleton
            variant="rounded"
            width="100%"
            height={50}
            sx={{ backgroundColor: "#100F0F" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
