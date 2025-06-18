import React, { useState } from "react";
import { connectToServer } from "../api/backend";  // only one function now
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";

const RemoteAccess = ({ app, env, user, onConnected }) => {
  const [status, setStatus] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [connectedIndex, setConnectedIndex] = useState(null);

  const isJumpServer = app === "jump-server";
  const isMultiServer = !isJumpServer && (env === "qs" || env === "prod");

  const handleConnect = async (index) => {
    setLoadingIndex(index);
    setConnectedIndex(null);
    setStatus(null);

    // Single unified connectToServer function handles jump-server internally
    const result = await connectToServer({
      app,
      env: isJumpServer ? undefined : env, // omit env for jump-server
      user,
      server_index: index,
    });

    setLoadingIndex(null);

    if (result.success) {
      setConnectedIndex(index);
      setStatus({
        type: "success",
        message: isJumpServer
          ? `Connected to Jump Server`
          : `Connected to ${env.toUpperCase()} ${index + 1}`,
      });
      if (onConnected) {
        onConnected(true);  // notify parent that connection succeeded
      }
    } else {
      setStatus({
        type: "error",
        message: `Error: ${result.error}`,
      });
      if (onConnected) {
        onConnected(false); // notify parent of failure
      }
    }
  };

  const renderButton = (index, label, outlined = false) => {
    const isLoading = loadingIndex === index;
    const isConnected = connectedIndex === index;

    return (
      <Button
        key={index}
        variant={isConnected ? "contained" : outlined ? "outlined" : "contained"}
        color={isConnected ? "success" : "primary"}
        onClick={() => handleConnect(index)}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : label}
      </Button>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {isJumpServer
          ? "Jump Server"
          : `${app.toUpperCase()} - ${env.toUpperCase()}`}
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        {isJumpServer ? (
          renderButton(0, "Connect to Jump Server")
        ) : isMultiServer ? (
          <>
            {renderButton(0, `Connect to ${env.toUpperCase()} 1`)}
            {renderButton(1, `Connect to ${env.toUpperCase()} 2`, true)}
          </>
        ) : (
          renderButton(0, `Connect to ${env.toUpperCase()} Server`)
        )}
      </Stack>

      {status && <Alert severity={status.type}>{status.message}</Alert>}
    </Box>
  );
};

export default RemoteAccess;
