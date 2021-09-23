import { useState } from "react"
import {FaFacebookSquare,FaTwitterSquare,FaLinkedin,FaPinterestSquare,FaYoutubeSquare,FaInstagramSquare} from 'react-icons/fa'
import { Modal,Button } from "react-bootstrap"
import { useForm } from 'react-hook-form';

function ContactUs(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { reset,handleSubmit } = useForm()
    function formSubmit(){
        reset()
    }
    return(
        <div className="container-fluid row mt-2 mb-2">
            <div className="col-sm-6">
                <h5 className="text-center">About us</h5>
                <div style={{fontSize:"80%"}}><strong>“I declare after all there is no enjoyment like reading!”- Jane Austen, Pride and Prejudice.</strong></div><br />
                <div>Dear readers,</div>
                <div style={{textIndent:"40px",fontSize:"80%"}}> We offer huge collection of books in diverse category of Fiction, Non-fiction, Biographies, History, Religions, Self -Help, Children. We also sell in vast collection of Investments and Management, Computers, Engineering, Medical, College and School text references books proposed by different institutes as syllabus across the country. Besides to this, we also offer a large collection of E-Books at very fair pricing.</div><br />
                <div style={{textIndent:"40px" ,fontSize:"80%"}}>We attempt to extend the customer satisfaction by catering easy user-friendly search engine, quick and user-friendly payment options and quicker delivery systems. Upside to all of this, we are disposed to provide exciting offers and pleasant discounts on our books.</div><br />
                <div style={{textIndent:"40px", fontSize:"80%"}}>As well, we humbly invite all the sellers around the country to partner with us. We will surely provide you the platform for many sparkling domains and grow the “BooksWagon” family.We would like to thank you for shopping with us. You can write us for any new thoughts at “email-id” helping us to improvise for the reader satisfaction</div><br />
                <div>From the owners:</div>
                <div style={{textIndent:"40px", fontSize:"80%"}}>“I have been reading from a young age. I have read at every stage of my life and there has never been a time when I have not enjoyed it. I feel they are the most diligent teachers and pedantic counselors who help you throughout your life. They are the nicest friend, quietest and faithful. I feel the joy, the peace in reading and wanted to divvy up the joy with others. I trust the readers to help me grow the MyBookShelf family.”<strong>- Vignesh V, Cuddalor, TamilNadu, India.</strong></div><br />
                <div style={{textIndent:"40px", fontSize:"80%"}}>“My passion for reading roots from my curious neural wiring that viscerally relates non-fictitious and fictitious world resulting into a genial interdisciplinary approach. Over the years I have made myself a mini library in my house. For me books are a narcotic. I believe this avenue has many sparkling domains to offer at its resort for the readers and also for the sellers. Like Erasmus said- When I have a little money, I buy books; and if I have left any then I buy food and clothes.”“My passion for reading roots from my curious neural wiring that viscerally relates non-fictitious and fictitious world resulting into a genial interdisciplinary approach. Over the years I have made myself a mini library in my house. For me books are a narcotic. I believe this avenue has many sparkling domains to offer at its resort for the readers and also for the sellers. Like Erasmus said- When I have a little money, I buy books; and if I have left any then I buy food and clothes.”<strong>-Venkatesan P</strong></div>
            </div>
            <div className="col-sm-6">
            <div className="text-center">
                <h5>Follow Us</h5>
                <div className="d-flex justify-content-center">
                    <h5 className="categoryLink ms-2 me-2"><FaFacebookSquare/></h5>
                    <h5 className="categoryLink ms-2 me-2"><FaTwitterSquare/></h5>
                    <h5 className="categoryLink ms-2 me-2"><FaLinkedin/></h5>
                    <h5 className="categoryLink ms-2 me-2"><FaPinterestSquare/></h5>
                    <h5 className="categoryLink ms-2 me-2"><FaYoutubeSquare/></h5>
                    <h5 className="categoryLink ms-2 me-2"><FaInstagramSquare/></h5>
                </div>
            </div>
            <hr />
            <div className="container-fluid text-center">
                <p ><strong>Address:</strong> V.V.M Ecommerce Factory Pvt. Ltd., 2/14, ground floor , Stalin road , Semmandalam, Cuddalore, Tamil Nadu-607001 </p> 
                <p ><strong>Email:</strong> customerservice@mybookshelf.com</p>
                <p ><strong>Phone:</strong> 011-41521153</p>
            </div>
            <hr />
            <div className="container-fluid text-center">
                <p >Copyright 2021. MyBookShelf.com. All Rights Reserved </p>
                <p > Privacy PolicyTerms & conditions</p>
            </div>
            <div className="mt-2">
                <h5 className="text-center">Your Query</h5>
                <form className="mx-auto shadow" onSubmit={handleSubmit(formSubmit)}>
                    <div class="form-floating">
                        <textarea class="form-control h-100" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Query</label>
                    </div>
                    <>
                        <Button className="float-end mt-2 mb-2" variant="danger" type="submit" onClick={handleShow}>
                            CheckOut
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Query Sent Successfully</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Your query has been received. Our admin will contact you soon.</Modal.Body>
                        </Modal>
                    </>
                </form>
            </div>
            </div>
        </div>
    )
}
export default ContactUs