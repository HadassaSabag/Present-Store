
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getAllFlowers from '../services/Flowers';
import AddToCart from './AddToCart';
import "react-toastify/dist/ReactToastify.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: '20px auto', // Add margin for spacing
  borderRadius: '20px', // Add rounded corners to the card
}));

export default function Product() {
  const { name } = useParams();
  const [item, setItem] = useState();
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const toggleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Flowers = await getAllFlowers();
        const foundItem = Flowers.find(c => c.name === name);
        foundItem ? setItem(foundItem) : navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [name, navigate]);

  return (
    <>                 
    <ProductCard>
      <CardContent>

        <Typography variant="h5" component="div">
          {item?.fullName}
        </Typography>
        <img src={item?.img} alt={item?.fullName} style={{ width: '100%', borderRadius: '20px', marginTop: '10px' }} />
        <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                <div > <div>{"₪"  +item?.price}</div></div>
                <NavLink to={'/store'}>
                 <div style={{color:'gray'}}>בחזרה לחנות</div> 
                </NavLink>
        </Typography>
      </CardContent>
      <CardContent>
        <IconButton aria-label="show more" onClick={toggleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          לחץ להצגת פרטים נוספים
        </Typography>
      </CardContent>
      {expanded && (
        <CardContent>
          <Typography>
                  <div >{item?.information}: &nbsp; </div>
          </Typography>

        </CardContent>
      )}
    </ProductCard>       
     <AddToCart/>

    <div>
               <p className='description'>
               <h4 style={{textAlign:'center'}}> ?מחפשים אחר זר פרחים מושקע ומרהיב ביופיו לכל מטרה</h4>
     Happy  זרי פרחים זה <br></br>
       תוכלו למצוא עשרות סוגים שונים של זרי פרחים שיכניסו צבע ויופי
      לחייכם או לחיי האנשים האהובים עליכם והיקרים לליבכם.
     שדות ורודים, שמש כתומה, אהבה פורחת ו-ניחוח הלבנה הם רק חלק
     מהשמות המקוריים של זרי הפרחים המושקעים והמרהיבים ביופיים הממתינים לכם אצלנו , אתר הפרחים של ישראל לרכישה ומשלוחי פרחים בפריסה ארצית.
    
     זרי הפרחים המשווקים על ידינו, נשזרו על ידי מיטב השוזרים והם משלבים בתוכם אך ורק פרחים טריים שזה עתה נקטפו על מנת להרכיב עבורכם את הזר המושלם.
     זרי הפרחים שלנו מגיעים בשלוש מידות  שונות: רגיל, בינוני וגדול, והם ניתנים גם להרכבה על פי העדפות הלקוח בהתאמה אישית מלאה.
    
     מייד רואים שזה זרים של 
    
    זרי הפרחים שלנו הנשזרים באהבה על ידי מיטב השוזרים, מותאמים לכל מטרת משלוח או רכישה עצמית, כאשר חלק גדול מדגמי הזרים שלנו מיועדים ליצירת מארזים מיוחדים המשלבים בתוכם זר פרחים טריים ומתנות בוטיק נלוות כגון: מארזי שוקולד, יינות בוטיק ומוצרי קונפיטוריה.
    
    על מנת לאפשר לכם ליהנות מזרי פרחים טריים, אנו עושים הכול על מנת לספק לכם את הזמנת רכישה/משלוח עוד באותו היום ולכל המאוחר ביום שלאחר קליטת ההזמנה במערכת המקוונת שלנו.
    בנוסף, אנו מאפשרים ביצוע הזמנה הכולל גם תזמון מועדי המשלוח הרצויים לכם.
    
     היחס והטיפול האישי אותנו אנו מעניקים לכל זר פרחים היוצא מאיתנו בדרך אליכם, מבטיח לכם זר פרחים מהודר, מושקע ומרהיב ביופיו.
     בקטגוריית זרי פרחים, תוכלו להתרשם מכל דגמי הזרים שלנו ולמצוא מידע מלא על סוגי הפרחים המרכיבים את הזר.
    
              </p>
            </div></>
  );
}
