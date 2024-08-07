// GlobalScrollbarStyles.js
import { GlobalStyles } from '@mui/system';

const GlobalScrollbarStyles = () => (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#168fe1',
        borderRadius: '4px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#1270b3',
      },
    }}
  />
);

export default GlobalScrollbarStyles;
