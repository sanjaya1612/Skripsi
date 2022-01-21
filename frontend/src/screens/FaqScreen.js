import React, { useState } from 'react'
import FAQ from '../components/FAQ'

const FaqScreen = () => {
    const [faqs, setfaqs] = useState([
        {
          question: 'Do I need to register to use the Travel.ID website ?',
          answer: 'No, if you only want to see information about tourist destinations but if you want to order activity, food and fiber hotels to give a rating you must register an account',
          open: true
        },
        {
          question: 'I am already have an account. Do I need to register again ?',
          answer: 'No, if you are already a member, you don’t need to register again. From the home screen you can login with your email',
          open: false
        },
        {
          question: 'I am already a member. I can’t remember my log in information? What should I do ?',
          answer: 'If you are already a member and can’t remember the email you registered with, simply send us an email at customerservicetravel.id@gmail.com and we will help you out in finding out the correct information.',
          open: false
        },
        {
          question: 'Is there any cost involved in using this app ?',
          answer: 'No,Travel.ID will only charge you when you purchase activity, foods or hotels',
          open: false
        },
        {
          question: 'Can I change my account information ?',
          answer: 'Yes, all of this information can be changed in the website. In the app you go to ‘Account Information’ and log in with your email. Once you are logged in you can change your account information in this section.',
          open: false
        },
        {
          question: 'How do I Book a Activity ?',
          answer: 'In the website, you can click on the Activity tab. Then you will be redirected to activity page where you can book your activity.',
          open: false
        },
        {
          question: 'How do Order a Food ?',
          answer: 'In the website, you can click on the Food tab. Then you will be redirected to food page where you can order your food.',
          open: false
        },
        {
          question: 'How do Order a Hotel ?',
          answer: 'In the website, you can click on the Hotel tab. Then you will be redirected to hotel page where you can book your rooms.',
          open: false
        },
      ]);

      const toggleFAQ = index => {
        setfaqs(faqs.map((faq, i) => {
          if (i === index) {
            faq.open = !faq.open
          } else {
            faq.open = false;
          }
    
          return faq;
        }))
      }
    
    return (
        <div className="App">
      <h1>FAQ</h1>
      <div className="faqs">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
    )
}

export default FaqScreen
