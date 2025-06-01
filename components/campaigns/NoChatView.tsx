import { Box, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";

const NoChatView = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        textAlign: "center",
        px: 2,
      }}
    >
      <ForumIcon sx={{ fontSize: 64, mb: 2 }} />
      <Typography variant="h6">No conversation initiated by bot yet</Typography>
      <Typography variant="body2">
        The conversation will appear here when it responds to the user.
      </Typography>
    </Box>
  );
};

export default NoChatView;
