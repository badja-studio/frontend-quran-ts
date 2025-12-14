import { Box } from "@mui/material";

export default function VideoView() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          right: 16,
          top: 100,
          bgcolor: "black",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 4,
          // zIndex: 1300,
        }}
      >
        <video
          src="/src/assets/dummy/tilawah.mp4"
          controls
          style={{ width: "200px", height: "auto" }}
        />
      </Box>
    </>
  );
}
