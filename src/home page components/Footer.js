import {FaFacebookSquare,FaTwitterSquare,FaLinkedin,FaPinterestSquare,FaYoutubeSquare,FaInstagramSquare} from 'react-icons/fa'
function footer(){
    return(
        // style={{backgroundColor:"#D0D3D4"}}
        <div className="bg-secondary bg-gradient" >
            <div className="d-none d-md-block">
                <div className="d-flex container-fluid justify-content-around mt-2 pt-2" >
                    <ul className="footerList">
                        <li><h6>Company</h6></li>
                        <li><a href="" className="footerLink">About Us</a></li>
                        <li><a href="" className="footerLink">Career</a></li>
                        <li><a href="" className="footerLink">Blog</a></li>
                        <li><a href="" className="footerLink">Contact Us</a></li>
                    </ul>
                    <ul className="footerList">
                        <li><h6>Policies</h6></li>
                        <li><a href="" className="footerLink">Policies</a></li>
                        <li><a href="" className="footerLink">Privacy Policies</a></li>
                        <li><a href="" className="footerLink">Secure Shopping</a></li>
                        <li><a href="" className="footerLink">Copyright Policy</a></li>
                    </ul>
                    <ul className="footerList">
                        <li><h6>Help</h6></li>
                        <li><a href="" className="footerLink">Return</a></li>
                        <li><a href="" className="footerLink">Payment</a></li>
                        <li><a href="" className="footerLink">Shipping</a></li>
                        <li><a href="" className="footerLink">FAQ</a></li>
                    </ul>
                    <ul className="footerList">
                        <li><h6>Misc</h6></li>
                        <li><a href="" className="footerLink">Affiliate</a></li>
                        <li><a href="" className="footerLink">Request a Book</a></li>
                        <li><a href="" className="footerLink">Sitemap</a></li>
                    </ul>
                </div>
            </div>
            <div className="d-block d-md-none">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item bg-secondary bg-gradient">
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed bg-secondary bg-gradient footerLink" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne"><strong>Company</strong></button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="container-fluid">
                                <ul className="footerList">
                                    <li><a href="" className="footerLink">About Us</a></li>
                                    <li><a href="" className="footerLink">Career</a></li>
                                    <li><a href="" className="footerLink">Blog</a></li>
                                    <li><a href="" className="footerLink">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-secondary bg-gradient">
                        <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed bg-secondary bg-gradient footerLink" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo"><strong>Policies</strong></button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="container-fluid">
                                <ul className="footerList">
                                    <li><a href="" className="footerLink">Policies</a></li>
                                    <li><a href="" className="footerLink">Privacy Policies</a></li>
                                    <li><a href="" className="footerLink">Secure Shopping</a></li>
                                    <li><a href="" className="footerLink">Copyright Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-secondary bg-gradient">
                        <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed bg-secondary bg-gradient footerLink" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree"><strong>Help</strong></button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="container-fluid">
                                <ul className="footerList">
                                    <li><a href="" className="footerLink">Return</a></li>
                                    <li><a href="" className="footerLink">Payment</a></li>
                                    <li><a href="" className="footerLink">Shipping</a></li>
                                    <li><a href="" className="footerLink">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item bg-secondary bg-gradient">
                        <h2 className="accordion-header" id="flush-headingFour">
                        <button className="accordion-button collapsed bg-secondary bg-gradient footerLink" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour"><strong>Misc</strong></button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                            <div className="container-fluid">
                                <ul className="footerList">
                                    <li><a href="" className="footerLink">Affiliate</a></li>
                                    <li><a href="" className="footerLink">Request a Book</a></li>
                                    <li><a href="" className="footerLink">Sitemap</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h5>Follow Us</h5>
                <div className="d-flex justify-content-center">
                    <h5 className="footerLink ms-2 me-2"><FaFacebookSquare/></h5>
                    <h5 className="footerLink ms-2 me-2"><FaTwitterSquare/></h5>
                    <h5 className="footerLink ms-2 me-2"><FaLinkedin/></h5>
                    <h5 className="footerLink ms-2 me-2"><FaPinterestSquare/></h5>
                    <h5 className="footerLink ms-2 me-2"><FaYoutubeSquare/></h5>
                    <h5 className="footerLink ms-2 me-2"><FaInstagramSquare/></h5>
                </div>
            </div>
            <hr />
            <div className="container-fluid text-center">
                <p className="pb-0"><strong>Address:</strong> V.V.M Ecommerce Factory Pvt. Ltd., 2/14, ground floor , Stalin road , Semmandalam, Cuddalore, Tamil Nadu-607001 </p> 
                <p className="pb-0"><strong>Email:</strong> customerservice@mybookshelf.com</p>
                <p className="pb-0"><strong>Phone:</strong> 011-41521153</p>
            </div>
            <hr />
            <div className="container-fluid text-center">
                <p className="pb-0">Copyright 2021. MyBookShelf.com. All Rights Reserved </p>
                <p className="pb-0"> Privacy PolicyTerms & conditions</p>
            </div>
        </div>
    )
}
export default footer