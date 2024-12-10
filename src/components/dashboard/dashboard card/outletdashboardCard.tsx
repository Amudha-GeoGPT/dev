/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

type Props = {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}: Props) => {
  return (
    <Card
    sx={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '24px',
        gap: '8px',
        width: '252px',
        minWidth: '180px',
        height: '120px',
        background: 'linear-gradient(102.11deg, #FF98BE 1.55%, #FF7193 97.06%), #001B04',
        border: '1px solid #E1E1E1',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        borderRadius: '12px',
        marginLeft:'500px',
        marginTop:'90px',
      }}
    >
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: '30px' }}>
          {title || subtitle ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box>
                {title && <Typography variant="h5">{title}</Typography>}
                {subtitle && (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>
              {action}
            </Stack>
          ) : null}
          {children}
        </CardContent>
      )}
      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;