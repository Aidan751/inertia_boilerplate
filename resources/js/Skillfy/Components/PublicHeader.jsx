import { Link, usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function PublicHeader({}){
    const navbarColour = true;

    // const [cartAmount, setCartAmount] = useState(0);

    // useEffect(() => {
    //     axios.get("/api/v1/cart/amount").then((response) => {
    //         setCartAmount(response.data);
    //     });
    // }, []);


    const props = usePage().props;
    return (
        <>
            {/* Header Start */}
            <header className="header--active header header-v1 sticky-header bg-white shadow-2xl">
                <div className="container">
                    <div className="header__inner">
                        <div className="logo">
                            <Link href="/">
                                <img src="/img/logo.png" alt="" />
                            </Link>
                        </div>
                        {/* responsive nav start */}
                        <div className="responsive__header dis--none">
                            {/* Nav Icons Start */}
                            <div className="nav__icons">
                                <ul className="nav__navbar">
                                    <li className="nav__item">
                                        <a href="checkout-page.html" className="nav__icon">
                                            <img src="/img/Cart.png" alt="" />
                                        </a>
                                    </li>
                                    <li className="nav__item">
                                        <button type="button" className="nav__toggle">
                                            <svg height="25px" viewBox="0 -53 384 384" fill="#544E7A" width="30px" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                                            <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                                            <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li className="nav__item at--480">
                                        {/* Nav Btns Start */}
                                        <div className="nav__btns">
                                            <ul className="nav__navbar">
                                            <li className="nav__items">
                                                <div className="nav__btn">
                                                <a href="registerform.html">
                                                    Register
                                                </a>
                                                </div>
                                            </li>
                                            </ul>
                                        </div>
                                        {/* Nav Btns end */}
                                    </li>
                                </ul>
                            </div>
                            {/* Nav Icons end */}    
                        </div>
                        {/* responsive nav End */}
                        {/* Nav Start */}
                        <nav className="nav">
                            <ul className="nav__navbar" id="toggle__navbar">
                                <li className="nav__item">
                                    <Link className="nav__link" href="/">Home</Link>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__link" href="https://www.saguildofactors.co.za/about-us">About Us</a>
                                </li>
                                <li className="nav__item">
                                    <Link className="nav__link" href="/courses">Courses</Link>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__link" href="https://www.saguildofactors.co.za/blog">Blog</a>
                                </li>
                                <li className="nav__item">
                                    <a className="nav__link" href="https://www.saguildofactors.co.za/contact-us">Contact Us</a>
                                </li>
                            </ul>
                            {/* Nav Icons Start */}
                            <div className="nav__icons ">
                                <ul className="nav__navbar">
                                    <li className="nav__item">
                                        {
                                            props.cart.length !== 0 ?
                                            <Link href="/cart" className="nav__icon relative px-4">
                                                <span className="inline-block bg-teal-600 text-zinc-100 text-xs font-bold font-sans rounded-full py-1 px-2 " >{props.cart.length}</span>
                                                <img src="/img/Cart.png" alt="" />
                                            </Link>
                                            :
                                            <span className="nav__icon relative px-4">
                                                <span className="inline-block bg-teal-600 text-zinc-100 text-xs font-bold font-sans rounded-full py-1 px-2 " >{props.cart.length}</span>
                                                <img src="/img/Cart.png" alt="" />
                                            </span>
                                        }
                                    </li>
                                    
                                </ul>
                            </div>
                            {/* Nav Icons end */}
                            {/* Nav Button Start */}
                            <div className="nav__btns">
                                <ul className="nav__navbar">
                                    <li className="nav__items">
                                        <div className="nav__btn">
                                            {
                                                props.auth.user ? 
                                                <a href="/dashboard">
                                                    Account
                                                </a>
                                                :
                                                <a href="/register">
                                                    Join Today
                                                </a>
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Nav Button end */}
                        </nav>
                        {/* Nav Start */}
                    </div>
                </div>
            </header>
            {/* Header End */}
        </>
    )
}