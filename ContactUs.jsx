import React from 'react'
import contact from '../pictures/contact.jpg'

const ContactUs = () => {
  return (
    <div className='contant'>
        <div className='contentImg'>
          <img src={contact}></img>
        </div>
        <div className='contentTxt'>
          <div id='border'></div>
          <b>
      רוצים לקבל הצעת מחיר, לבקש משהו <br></br>
            ?לשאול או סתם לפרגן <br></br>
            מוזמנים ליצור איתנו קשר
          </b>
          <br/><br/>
          
          <form action="#" method="POST">
          
              <label for="name">שם פרטי + שם משפחה</label><br/>
              <input type="text" id="name" name="name" required/><br/><br/>
              
              <label for="email">Email:</label><br/>
              <input type="email" id="email" name="email" required/><br/><br/>
              
              <label for="subject">נושא </label><br/>
              <input type="text" id="subject" name="subject" required/><br/><br/>
              
              <label for="message">כאן כותבים מה שבא לכם</label><br/>
              <textarea id="message" name="message" rows="4" required></textarea><br/><br/>
              
              <input type="submit" value="שלח"/>
            </form>   
      </div>
    </div>
  )
}

export default ContactUs