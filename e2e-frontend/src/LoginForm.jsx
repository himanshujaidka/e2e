import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

export default function LoginForm({ onLoginSuccess }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      setError('Please enter both User ID and Password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/login', {
        id,
        password
      });
      if (response.data.success) {
        setError('');
        onLoginSuccess(); // notify parent
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        animation: 'backgroundShift 15s ease infinite'
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          p: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: '700',
            mb: 4,
            color: '#5e35b1',
            animation: 'bounceIn 1s ease',
            userSelect: 'none',
          }}
        >
          Welcome Back
        </Typography>

        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          value={id}
          onChange={(e) => setId(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease',
              '&.Mui-focused fieldset': {
                borderColor: '#5e35b1',
                boxShadow: '0 0 8px #5e35b1',
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease',
              '&.Mui-focused fieldset': {
                borderColor: '#5e35b1',
                boxShadow: '0 0 8px #5e35b1',
              },
            },
          }}
        />

        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              opacity: error ? 1 : 0,
              transition: 'opacity 0.5s ease',
              fontWeight: 600,
            }}
          >
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 4,
            py: 1.8,
            fontSize: '1.1rem',
            fontWeight: '700',
            background: 'linear-gradient(90deg, #5e35b1, #7e57c2)',
            boxShadow: '0 4px 15px rgba(94,53,177,0.5)',
            '&:hover': {
              background: 'linear-gradient(90deg, #7e57c2, #5e35b1)',
              boxShadow: '0 6px 20px rgba(126,87,194,0.7)',
            },
            transition: 'all 0.3s ease',
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
        </Button>
      </Container>

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            60% {
              opacity: 1;
              transform: translateY(15px);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes backgroundShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </Box>
  );
}
