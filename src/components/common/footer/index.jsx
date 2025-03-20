import { Link } from "react-router-dom";
import btn3 from "@/assets/images/review/btn3.png";
import btn4 from "@/assets/images/review/btn4.png";
import logo from "@/assets/images/logo2.png";
import flag from "@/assets/images/review/flag.png";
import { Mail } from "lucide-react";
Footer.propTypes = {};

function Footer() {
  return (
    <footer className="footer">
      <div className="top-footer">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-2 col-md-4">
              <div className="footer-logo">
                <img src={logo} alt="images" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-footer">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-cl-1">
                <div className="icon-infor d-flex aln-center">
                  <div className="icon">
                    <span className="icon-call-calling">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                    </span>
                  </div>
                  <div className="content">
                    <p>Need help? 24/7</p>
                    <h6>
                      <Link to="tel:0123456678">090819040</Link>
                    </h6>
                  </div>
                </div>
                <p>
                  Job Searching Just Got Easy. Use CareerBridge to run a hiring site
                  and earn money in the process!
                </p>
                <div className="ft-icon">
                  {" "}
                  <i className="icon-map-pin"></i> 101 E 129th St, East Chicago,
                  IN 46312, US
                </div>
                {/* <form action="#" id="subscribe-form">
                            <input type="email" placeholder="Your email address" required="" id="subscribe-email" />
                            <button className="tf-button" type="submit" id="subscribe-button"><i
                                className="icon-paper-plane-o"></i></button>
                        </form> */}
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  hoaianhnguyenchi1994@gmail.com
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="footer-cl-2">
                <h6 className="ft-title">Job Sources</h6>
                <ul className="navigation-menu-footer">
                  <li>
                    {" "}
                    <Link to="find-jobs-list.html">TopCVs</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="find-jobs-list.html">ITviec</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="find-jobs-list.html">Vietnamworks</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="find-jobs-list.html">Linkedin Jobs</Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="footer-cl-3">
                <h6 className="ft-title">Jobs For Location</h6>
                <ul className="navigation-menu-footer">
                  <li>
                    {" "}
                    <Link to="dashboard.html">Ho Chi Minh</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="sample-cv.html">ha Noi</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="candidate-list-sidebar.html">Can Tho</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="candidate-grid.html">Da Nang</Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-6">
              <div className="footer-cl-4">
                <h6 className="ft-title">jobs For Category</h6>
                <ul className="navigation-menu-footer">
                  <li>
                    {" "}
                    <Link to="find-jobs-list.html">Accounting</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="employers-list.html">
                      Software Developer
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="employers-grid-sidebar.html">
                      IT support/Helpdesk
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-4 col-6">
                        <div className="footer-cl-5">
                        <h6 className="ft-title">
                            Download App
                        </h6>
                        <ul className="ft-download">
                            <li> <Link to="#"><img src={btn3} alt="images" /></Link></li>
                            <li> <Link to="#"><img src={btn4} alt="images" /></Link></li>
                        </ul>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="bt-left">
                <div className="copyright">
                  ©2025 CareerBridge. All Rights Reserved.
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <ul className="menu-bottom d-flex aln-center">
                <li>
                  <Link to="term-of-use.html">Contact Us</Link>{" "}
                </li>
                <li>
                  <Link to="pricing.html">Terms Of Services</Link>{" "}
                </li>
                <li>
                  <Link to="contact-us.html">Privacy Policy</Link>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
