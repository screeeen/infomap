import { Box, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'

export const Header = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactElement
}) => (
  <Box
    position="absolute"
    top={10}
    left={10}
    bgcolor="white"
    borderBottom={0.2}
    zIndex={1000}
    minWidth={250}
  >
    <Paper square={false}>
      <Box
        onClick={() => setIsOpen(!isOpen)}
        p="12px 16px"
        sx={{ cursor: 'pointer' }} // única excepción: cursor
        borderBottom={isOpen ? '1px solid #eee' : 'none'}
        fontWeight={600}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">Editor</Typography>
        <Typography variant="h6">{isOpen ? '▼' : '▶'}</Typography>
      </Box>
    </Paper>
    {children}
  </Box>
)
