import React from 'react';
import { useEffect } from 'react';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CssBaseline } from '@mui/material';

const lightTheme = createTheme({
  palette: { mode: 'light' },
});

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const defaultTheme = useDarkMode() ? darkTheme : lightTheme;

      useEffect(() => {
        const sbRoot = document.getElementsByClassName(
          'sb-show-main',
        )[0] as HTMLElement;
        if (sbRoot) {
          sbRoot.style.backgroundColor =
            defaultTheme.palette.background.default;
        }
      }, [useDarkMode()]);

      useEffect(() => {
        if (process.env.NODE_ENV === 'development') return;
        const script = document.createElement('script');
        script.src = 'https://plausible.io/js/script.js';
        script.setAttribute('data-domain', 'material-react-table.dev');
        script.defer = true;

        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

      return (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography
              sx={{
                pb: '0.5rem',
                color: useDarkMode() ? '#fff' : '#666',
              }}
              variant="subtitle2"
            >
              Looking for the main docs site? Click{' '}
              <Link
                href="https://www.material-react-table.com"
                target="_blank"
                rel="noopener"
              >
                here.
              </Link>
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                pb: '1rem',
                color: useDarkMode() ? '#fff' : '#666',
              }}
            >
              View Source code for these examples in the code tab below or{' '}
              <Link
                href="https://github.com/KevinVandy/material-react-table/tree/v2/packages/material-react-table/stories/features"
                target="_blank"
              >
                here on GitHub.
              </Link>
            </Typography>
            <Story {...context} />
          </LocalizationProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
