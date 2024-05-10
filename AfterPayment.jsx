import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import back from '../pictures/back.jpg'
import { NavLink } from 'react-router-dom';

const labels = {
  0.5: 'ממש גרוע',
  1: ' + גרוע',
  1.5: 'בסדר',
  2: '+ בסדר ',
  2.5: 'טוב',
  3: ' + טוב ',
  3.5: 'טוב מאוד',
  4: ' + טוב מאוד ',
  4.5: 'מעולה',
  5: ' + מעולה ',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function PaymentConfirmation() {
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '100vh',
      margin:'15px',
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
    }}
    >
      <div style={{backgroundColor:'lightcoral',opacity:'0.8',padding:'15px'} }>
      <Typography variant="h4" gutterBottom>
        !הזמנתך התקבלה בהצלחה
      </Typography>
      <Typography variant="body1" gutterBottom>
        .תודה על הזמנתך. המוצרים שלך ישלחו בהקדם האפשרי
      </Typography>
      <Typography variant="body1" gutterBottom>
        .כדי לשפר את שירותינו, אנו מעריכים מאוד את דעתך
      </Typography>
      <Typography variant="body1" gutterBottom>
        :אנא תן לנו פידבק על השירות
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Typography variant="body2">
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Typography>
      </Box>
      </div>
      <NavLink to='/'>
      <Button variant="contained" sx={{ mt: 4 ,color:'pink',backgroundColor:'gray'}}>
        חזור לדף הבית
      </Button>
      </NavLink>
    </Box>
  );
}
