import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="row">
                    <div className="footer-col">
                        <h4>Travel.id</h4>
                        <ul className='list-unstyled'>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul className='list-unstyled'>
                            <li><a href="/FAQ">FAQ</a></li>
                            <li><a href="https://paxel.co/id/layanan-kami" target={"_blank"}>shipping</a></li>
                            <li><a href="#">COVID-19 Info</a></li>
                            <li><a href="https://www.paypal.com/id/business?kid=p32154139722" target={"_blank"}>payment options</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer
