import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const Progress = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
        zIndex: 1,
      }}
    />
    <Container>
      <CircularProgress
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}
      />
    </Container>
  </div>
);

export default Progress;