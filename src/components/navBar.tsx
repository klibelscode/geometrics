import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import TerminalIcon from '@mui/icons-material/Terminal';

export default function navbar() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.85)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
        boxShadow: 'none',
        zIndex: 1100
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '70px' }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                bgcolor: 'rgba(56, 189, 248, 0.1)', 
                p: 1, 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LanguageIcon sx={{ color: '#0ea5e9', fontSize: 26 }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              Geo<span style={{ color: '#0ea5e9' }}>Metrics</span>
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              bgcolor: 'rgba(30, 41, 59, 0.7)',
              px: 2,
              py: 0.7,
              borderRadius: '20px',
              border: '1px solid rgba(51, 65, 85, 0.4)'
            }}
          >
            <TerminalIcon sx={{ color: '#10b981', fontSize: 16 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#94a3b8', 
                fontWeight: '700',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              Klibel's Code
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}