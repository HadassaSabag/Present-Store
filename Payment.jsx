

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CartSum, thaCart } from '../states/cartSlice';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

export const Payment = () => {

    const sumCart = useSelector(CartSum);
    const arrCart = useSelector(thaCart);
    const navigate = useNavigate();

    const [inputValueCC, setInputValueCC] = useState('');
    const [inputValueCvv, setInputValueCvv] = useState('');
    const [inputValueId, setInputValueId] = useState('');


    const [isValidCC, setIsValidCC] = useState(false);
    const [isValidCvv, setIsValidCvv] = useState(false);
    const [isValidId, setIsValidId] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const [lastInput, setLastInput] = useState('');
    const [finalSum, setFinalSum] = useState(0);
    const [formData, setFormData] = useState({

        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
        fullName: '',
        idNumber: '',
        couponCode: '',
        deliveryOption: 'pickup',
        shippingAddresscity: '',
        shippingAddress: ''
    });
    

    useEffect(() => {
        if (lastInput === 'couponCode') {
            if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
                toast.success("קוד הקופון תקין! הנחה של 50₪ התווספה לסכום התשלום");
            }
        } else if (lastInput === 'deliveryOption' && formData.deliveryOption === 'shipping') {
            toast.success("נוספו 30₪ על עלות המשלוח");
        }
        setFinalSum(updateFinalSum());
    }, [lastInput, formData.deliveryOption, formData.couponCode,navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setLastInput(name);
    };

    const updateFinalSum = () => {
        let finalSum = sumCart;
        if (formData.deliveryOption === 'shipping') {
            finalSum += 30;
        }
        if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
            finalSum -= 50;
        }
        return finalSum;
    };

    const handleSubmit = (e) => {
        if(isValidCC && isValidCvv && isValidId){
        toast.success("התשלום שלך נקלט בהצלחה");
        navigate("/AfterPayment")
        }
        else
                toast.error("יש להזין את כל הפרטים לפני שליחה");
    };
      
        
        const handleChangeCC = (event) => {
            let newValue = event.target.value.replace(/\D/g, ''); // מוריד כל תו שאינו ספרה
            newValue = newValue.slice(0, 16); // מוגבל ל-16 תווים
            newValue = newValue.match(/.{1,4}/g); // מחלק לקבוצות של 4 תווים
            newValue = newValue ? newValue.join('-') : ''; // מצרף מקפים '-' בין קבוצות
            const isValidInput = /^\d{15,16}$/.test(newValue.replace(/-/g, '')); // בודק תקינות של המספר
            setIsValidCC(isValidInput);
            setInputValueCC(newValue);
          };
          const handleChangeCvv = (event) => {
            let newValue = event.target.value.replace(/\D/g, ''); // מוריד כל תו שאינו ספרה
            newValue = newValue.slice(0, 4); // מוגבל ל-16 תווים
            const isValidInput = /^\d{3,4}$/.test(newValue.replace(/-/g, '')); // בודק תקינות של המספר
            setIsValidCvv(isValidInput);
            setInputValueCvv(newValue);
          };
          const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleChangeId = (event) => {
        let newValue = event.target.value.replace(/\D/g, ''); // מוריד כל תו שאינו ספרה
        newValue = newValue.slice(0, 9); // מוגבל ל-16 תווים
        const isValidInput = /^\d{9,9}$/.test(newValue.replace(/-/g, '')); // בודק תקינות של המספר
        setIsValidId(isValidInput);
        setInputValueId(newValue);
      };
          
    
        
          
    

    return (
        <>
            <div>
                <h2>דף תשלום</h2>
                <ul>
                    {arrCart.map((product, index) => (
                        <li key={index}>
                            <p>{product.fullName}</p>    
                            <img id='paymentImg' src={product.img} alt={product.fullName}></img>
                            <p>כמות {product.quantity}</p>
                            <p> מחיר ליחידה ₪{product.price}</p>
                            <p>מחיר סופי למוצר ₪{product.quantity * product.price} </p>
                            <p>----------------------------------------------------------------------------------------------------</p>
                        </li>
                    ))}
                </ul>
            </div>
          
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                 <TextField
                     id="number-input"
                    label="מספר כרטיס אשראי"
                    value={inputValueCC}
                    onChange={handleChangeCC}
                    error={!isValidCC && inputValueCC.length > 0}
                    helperText={!isValidCC && inputValueCC.length > 0 ? 'יש להזין לפחות  15  ספרות' : ''}
                    variant="outlined"
                    fullWidth
                    />
                    </Grid> 
                   
                    <Grid item xs={6} md={3}>
    <FormControl fullWidth>
        <InputLabel>חודש</InputLabel>
        <Select
            value={selectedMonth}
            onChange={handleMonthChange}
        >
            <MenuItem value={1}>01</MenuItem>
            <MenuItem value={2}>02</MenuItem>
            <MenuItem value={3}>03</MenuItem>
            <MenuItem value={4}>04</MenuItem>
            <MenuItem value={5}>05</MenuItem>
            <MenuItem value={6}>06</MenuItem>
            <MenuItem value={7}>07</MenuItem>
            <MenuItem value={8}>08</MenuItem>
            <MenuItem value={9}>09</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
        </Select>
    </FormControl>
</Grid>
<Grid item xs={6} md={3}>
    <FormControl fullWidth>
        <InputLabel>שנה</InputLabel>
        <Select
            value={selectedYear}
            onChange={handleYearChange}
        >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2025}>2025</MenuItem>
            <MenuItem value={2026}>2026</MenuItem>
            <MenuItem value={2027}>2027</MenuItem>
            <MenuItem value={2028}>2028</MenuItem>
            <MenuItem value={2029}>2029</MenuItem>
            <MenuItem value={2030}>2030</MenuItem>
            <MenuItem value={2031}>2031</MenuItem>
            <MenuItem value={2032}>2032</MenuItem>
            <MenuItem value={2033}>2033</MenuItem>
            <MenuItem value={2034}>2034</MenuItem>
        </Select>
    </FormControl>
</Grid>

              
                    <Grid item xs={12} md={6}>
                 <TextField
                     id="number-input"
                    label="CVV"
                    value={inputValueCvv}
                    onChange={handleChangeCvv}
                    error={!isValidCvv && inputValueCvv.length > 0}
                    helperText={!isValidCvv && inputValueCvv.length > 0 ? 'יש להזין לפחות  3  ספרות' : ''}
                    variant="outlined"
                    fullWidth
                    />
                    </Grid>                    

                    <Grid item xs={12} md={6}>
                       <TextField
                            fullWidth
                            label="שם מלא בעל הכרטיס"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            minLength={2}
                            required
                        />
                    </Grid>
                   
                    <Grid item xs={12} md={6}>
                 <TextField
                     label="מספר תעודת זהות"
                    value={inputValueId}
                    type="text"
                    onChange={handleChangeId}
                    error={!isValidId && inputValueId.length > 0}
                    helperText={!isValidId && inputValueId.length > 0 ? ' נא להזין 9  ספרות כולל ספרת ביקורת' : ''}
                    variant="outlined"
                    fullWidth
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="קוד קופון (אם יש)"
                            type="text"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>בחר אפשרות משלוח</InputLabel>
                            <Select
                                name="deliveryOption"
                                value={formData.deliveryOption}
                                onChange={handleChange}
                            >
                                <MenuItem value="pickup">איסוף עצמי</MenuItem>
                                <MenuItem value="shipping">משלוח בעלות של ₪30</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {formData.deliveryOption === 'shipping' && (
                        <>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="עיר"
                                    type="text"
                                    name="shippingAddresscity"
                                    value={formData.shippingAddresscity}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="רחוב או תא דואר"
                                    type="text"
                                    name="shippingAddress"
                                    value={formData.shippingAddress}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
                {/* <NavLink to='/AfterPayment'> */}
                <Button onClick={handleSubmit} type="submit" variant="contained" color="primary"> שלח תשלום</Button>
                {/* </NavLink> */}

            </form>
            {finalSum > 0 && <h3>סכום סופי לתשלום: ₪{finalSum} </h3>}
            
        </>
    );
};

export default Payment;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { toCartSum, thaCart } from '../states/cartSlice'; // נאמפל יכול להיות כלשהו
// import { NavLink } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';

// const Payment = () => {
//     const sumCart = useSelector(toCartSum);
//     const arrCart = useSelector(thaCart);
//     const [inputValueCC, setInputValueCC] = useState('');
//     const [isValidCC, setIsValidCC] = useState(false);
//     const [lastInput, setLastInput] = useState('');
//     const [finalSum, setFinalSum] = useState(0);
//     const [formData, setFormData] = useState({
//         creditCardNumber: '',
//         expirationDate: '',
//         cvv: '',
//         fullName: '',
//         idNumber: '',
//         couponCode: '',
//         deliveryOption: 'pickup',
//         shippingAddresscity: '',
//         shippingAddress: ''
//     });

//     useEffect(() => {
//         if (lastInput === 'couponCode') {
//             if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
//                 toast.success("קוד הקופון תקין! הנחה של 50₪ התווספה לסכום התשלום");
//             }
//         } else if (lastInput === 'deliveryOption' && formData.deliveryOption === 'shipping') {
//             toast.success("נוספו 30₪ על עלות המשלוח");
//         }
//         setFinalSum(updateFinalSum());
//     }, [lastInput, formData.deliveryOption, formData.couponCode]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setLastInput(name);
//     };

//     const updateFinalSum = () => {
//         let finalSum = sumCart;
//         if (formData.deliveryOption === 'shipping') {
//             finalSum += 30;
//         }
//         if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
//             finalSum -= 50;
//         }
//         return finalSum;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isFormValid()) {
//             toast.success("התשלום שלך נקלט בהצלחה");
//             // הפניה לדף AfterPayment
//         } else {
//             toast.error("יש למלא את כל השדות בטופס");
//         }
//     };

//     const isFormValid = () => {
//         // בדיקת תקינות הטופס - האם כל השדות מלאים כראוי
//         return (
//             formData.creditCardNumber &&
//             formData.expirationDate &&
//             formData.cvv &&
//             formData.fullName &&
//             formData.idNumber &&
//             (formData.deliveryOption === 'pickup' || (formData.shippingAddresscity && formData.shippingAddress))
//         );
//     };

//     const handleChangeCC = (event) => {
//         let newValue = event.target.value.replace(/\D/g, ''); // מוריד כל תו שאינו ספרה
//         newValue = newValue.slice(0, 16); // מוגבל ל-16 תווים
//         newValue = newValue.match(/.{1,4}/g); // מחלק לקבוצות של 4 תווים
//         newValue = newValue ? newValue.join('-') : ''; // מצרף מקפים '-' בין קבוצות
//         const isValidInput = /^\d{15,16}$/.test(newValue.replace(/-/g, '')); // בודק תקינות של המספר
//         setIsValidCC(isValidInput);
//         setInputValueCC(newValue);
//     };

//     return (
//         <>
//             <div>
//                 <h2>דף תשלום</h2>
//                 <ul>
//                     {arrCart.map((product, index) => (
//                         <li key={index}>
//                             <p>{product.fullName}</p>
//                             <img id='paymentImg' src={product.img} alt={product.fullName}></img>
//                             <p>כמות {product.quantity}</p>
//                             <p> מחיר ליחידה ₪{product.price}</p>
//                             <p>מחיר סופי למוצר ₪{product.quantity * product.price} </p>
//                             <p>----------------------------------------------------------------------------------------------------</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             id="number-input"
//                             label="מספר כרטיס אשראי"
//                             value={inputValueCC}
//                             onChange={handleChangeCC}
//                             error={!isValidCC && inputValueCC.length > 0}
//                             helperText={!isValidCC && inputValueCC.length > 0 ? 'יש להזין מספר בין 15 ל-16 ספרות' : ''}
//                             variant="outlined"
//                             fullWidth
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             type="date"
//                             name="expirationDate"
//                             value={formData.expirationDate}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="CVV"
//                             type="text"
//                             maxLength={4}
//                             inputProps={{ minLength: 3 }} // גבול מינימאלי ל-3 תווים
//                             name="cvv"
//                             value={formData.cvv}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="שם מלא בעל הכרטיס"
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             pattern="[a-zA-Z\s]+"
//                             minLength={2}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="מספר תעודת זהות"
//                             type="text"
//                             name="idNumber"
//                             value={formData.idNumber}
//                             maxLength={9}
//                             pattern="[0-9]+"
//                             onChange={handleChange}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="קוד קופון (אם יש)"
//                             type="text"
//                             name="couponCode"
//                             value={formData.couponCode}
//                             onChange={handleChange}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel>בחר אפשרות משלוח</InputLabel>
//                             <Select
//                                 name="deliveryOption"
//                                 value={formData.deliveryOption}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <MenuItem value="pickup">איסוף עצמי</MenuItem>
//                                 <MenuItem value="shipping">משלוח בעלות של ₪30</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {formData.deliveryOption === 'shipping' && (
//                         <>
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="עיר"
//                                     type="text"
//                                     name="shippingAddresscity"
//                                     value={formData.shippingAddresscity}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="רחוב או תא דואר"
//                                     type="text"
//                                     name="shippingAddress"
//                                     value={formData.shippingAddress}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                         </>
//                     )}
//                 </Grid>

//                 <NavLink to='/AfterPayment'>
//                     <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>שלח תשלום</Button>
//                 </NavLink>

//             </form>

//             {finalSum > 0 && <h3>סכום סופי לתשלום: ₪{finalSum} </h3>}

//         </>
//     );
// };

// // export default Payment;
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { CartSum, thaCart } from '../states/cartSlice';
// import { toast } from 'react-toastify';
// import Button from '@mui/material/Button';
// import { NavLink } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Grid from '@mui/material/Grid';

// export const Payment = () => {
//     const sumCart = useSelector(CartSum);
//     const arrCart = useSelector(thaCart);
//     const [inputValueCC, setInputValueCC] = useState('');
//     const [isValidCC, setIsValidCC] = useState(false);
//     const [isValidForm, setIsValidForm] = useState(false);
//     const [lastInput, setLastInput] = useState('');
//     const [finalSum, setFinalSum] = useState(0);
//     const [formData, setFormData] = useState({
//         creditCardNumber: '',
//         expirationDate: '',
//         cvv: '',
//         fullName: '',
//         idNumber: '',
//         couponCode: '',
//         deliveryOption: 'pickup',
//         shippingAddresscity: '',
//         shippingAddress: ''
//     });
    

//     useEffect(() => {
//         if (lastInput === 'couponCode') {
//             if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
//                 toast.success("קוד הקופון תקין! הנחה של 50₪ התווספה לסכום התשלום");
//             }
//         } else if (lastInput === 'deliveryOption' && formData.deliveryOption === 'shipping') {
//             toast.success("נוספו 30₪ על עלות המשלוח");
//         }
//         setFinalSum(updateFinalSum());
//     }, [lastInput, formData.deliveryOption, formData.couponCode]);

//     useEffect(() => {
//         validateForm();
//     }, [formData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setLastInput(name);
//     };

//     const updateFinalSum = () => {
//         let finalSum = sumCart;
//         if (formData.deliveryOption === 'shipping') {
//             finalSum += 30;
//         }
//         if (formData.couponCode === '111' || formData.couponCode === '222' || formData.couponCode === '333') {
//             finalSum -= 50;
//         }
//         return finalSum;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isValidForm) {
//             toast.success("התשלום שלך נקלט בהצלחה");

//         } else {
//             toast.error("יש למלא את כל השדות בטופס");
//         }
//     };

//     const validateForm = () => {
//         let isValid = true;
//         for (const key in formData) {
//             if (formData.hasOwnProperty(key)) {
//                 const value = formData[key];
//                 if (value === '') {
//                     isValid = false;
//                     break;
//                 }
//                 switch (key) {
//                     case 'expirationDate':
//                         // Validate expiration date here
//                         break;
//                     case 'cvv':
//                         if (!/^\d{3,4}$/.test(value)) {
//                             isValid = false;
//                         }
//                         break;
//                     case 'idNumber':
//                         if (!/^\d{9}$/.test(value)) {
//                             isValid = false;
//                         }
//                         break;
//                     case 'fullName':
//                         if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(value)) {
//                             isValid = false;
//                         }
//                         break;
//                     case 'shippingAddresscity':
//                         // Validate city here
//                         break;
//                     case 'shippingAddress':
//                         // Validate address here
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         }
//         setIsValidForm(isValid);
//     };

//     const handleChangeCC = (event) => {
//         let newValue = event.target.value.replace(/\D/g, ''); // מוריד כל תו שאינו ספרה
//         newValue = newValue.slice(0, 16); // מוגבל ל-16 תווים
//         newValue = newValue.match(/.{1,4}/g); // מחלק לקבוצות של 4 תווים
//         newValue = newValue ? newValue.join('-') : ''; // מצרף מקפים '-' בין קבוצות
//         const isValidInput = /^\d{15,16}$/.test(newValue.replace(/-/g, '')); // בודק תקינות של המספר
//         setIsValidCC(isValidInput);
//         setInputValueCC(newValue);
//     };

//     return (
//         <>
//             <div>
//                 <h2>דף תשלום</h2>
//                 <ul>
//                     {arrCart.map((product, index) => (
//                         <li key={index}>
//                             <p>{product.fullName}</p>
//                             <img id='paymentImg' src={product.img} alt={product.fullName}></img>
//                             <p>כמות {product.quantity}</p>
//                             <p> מחיר ליחידה ₪{product.price}</p>
//                             <p>מחיר סופי למוצר ₪{product.quantity * product.price} </p>
//                             <p>----------------------------------------------------------------------------------------------------</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             id="number-input"
//                             label="מספר כרטיס אשראי"
//                             value={inputValueCC}
//                             onChange={handleChangeCC}
//                             error={!isValidCC && inputValueCC.length > 0}
//                             helperText={!isValidCC && inputValueCC.length > 0 ? 'יש להזין מספר בין 15 ל-16 ספרות' : ''}
//                             variant="outlined"
//                             fullWidth
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             type="month"
//                             name="expirationDate"
//                             value={formData.expirationDate}
//                             onChange={handleChange}
//                             inputProps={{ min: new Date().toISOString().slice(0, 7) }}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="CVV"
//                             type="text"
//                             maxLength={4}
//                             inputProps={{ minLength: 3 }}
//                             name="cvv"
//                             value={formData.cvv}
//                             onChange={handleChange}
//                             error={formData.cvv.length < 3 || formData.cvv.length > 4}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="שם מלא בעל הכרטיס"
//                             type="text"
//                             name="fullName"
//                             value={formData.fullName}
//                             onChange={handleChange}
//                             error={!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(formData.fullName)}
//                             helperText={!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(formData.fullName) ? 'יש להזין שם פרטי ומשפחה' : ''}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="מספר תעודת זהות"
//                             type="text"
//                             name="idNumber"
//                             value={formData.idNumber}
//                             maxLength={9}
//                             onChange={handleChange}
//                             error={!/^\d{9}$/.test(formData.idNumber)}
//                             helperText={!/^\d{9}$/.test(formData.idNumber) ? 'יש להזין 9 ספרות בלבד' : ''}
//                             required
//                         />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <TextField
//                             fullWidth
//                             label="קוד קופון (אם יש)"
//                             type="text"
//                             name="couponCode"
//                             value={formData.couponCode}
//                             onChange={handleChange}
//                         />
//                     </Grid>

//                     <Grid item xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel>בחר אפשרות משלוח</InputLabel>
//                             <Select
//                                 name="deliveryOption"
//                                 value={formData.deliveryOption}
//                                 onChange={handleChange}
//                                 required
//                             >
//                                 <MenuItem value="pickup">איסוף עצמי</MenuItem>
//                                 <MenuItem value="shipping">משלוח בעלות של ₪30</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     {formData.deliveryOption === 'shipping' && (
//                         <>
//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="עיר"
//                                     type="text"
//                                     name="shippingAddresscity"
//                                     value={formData.shippingAddresscity}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>

//                             <Grid item xs={12} md={6}>
//                                 <TextField
//                                     fullWidth
//                                     label="רחוב או תא דואר"
//                                     type="text"
//                                     name="shippingAddress"
//                                     value={formData.shippingAddress}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                         </>
//                     )}
//                 </Grid>

//                 <NavLink to='/AfterPayment'>
//                     <Button type="submit" variant="contained" color="primary" disabled={!isValidForm}>שלח תשלום</Button>
//                 </NavLink>

//             </form>

//             {finalSum > 0 && <h3>סכום סופי לתשלום: ₪{finalSum} </h3>}

//         </>
//     );
// };

// export default Payment;

