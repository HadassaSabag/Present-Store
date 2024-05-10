
import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import video from '../pictures/video.mp4'

const HomePage = () => {
  return (
    <>
      <Box id='containerHP' sx={{ display: 'flex' }}>
        <Box className='contentVideo' sx={{ flex: '1 1 50%' }}>
          <video id='video' autoPlay muted>
            <source src={video} alt='video' title='video' type="video/mp4" />
            הדפדפן שלך לא תומך בסרטון שלנו, מצטערים
          </video>
        </Box>
        <Box sx={{ flex: '1 1 50%', padding: '20px' }}>
          <Box className='contentLogo'>
            <Typography variant="h2" gutterBottom>Happy- ברוכים הבאים ל</Typography>
            <Typography variant="body1" gutterBottom id='videoText'>
              אנחנו שוזרים פרחים עם שוקולד
              <br />
              <strong> באהבה גדולה </strong>
              כבר יותר מ35 שנה
              <br />
              מוזמנים להתרשם
              <br />
              <strong>מבטיחים שתהנו</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>
                חקלאים, שוזרים, עוטפים ושליחים הם רק חלק קטן מהמערך שלנו
                <br />
                אנו בוחרים את אנשינו בקפידה- וקמים כל בוקר לעשייה
                <br />
                מתוך אהבה ותחושת שליחות לכך שתשמחו ותשמחו את האהובים והאהובות שלכם
                <br />
                בצורה איכותית ובדרך הקלה ביותר
              </strong>
            </Typography>
            <Button variant="contained" color="primary" id='ourStoreButton'>
              <NavLink id='ourStoreLButton' to="/store" style={{ textDecoration: 'none', color: 'white' }}>לחנות</NavLink>
            </Button>
          </Box>
        </Box>
      </Box>
      <br />
      <Box className='contentTxtHP' sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="body5" >
           תשכחו מכל מה שידעתם עד היום על משלוחי פרחים בישראל ובואו להכיר את הפלטפורמה המקוונת המתקדמת מסוגה להזמנת משלוחי פרחים בפריסה ארצית תוך הקפדה על טריות הפרחים ושביעות רצון הלקוחות.
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;
