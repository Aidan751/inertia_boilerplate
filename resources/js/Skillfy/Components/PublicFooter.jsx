import { Link, usePage } from "@inertiajs/inertia-react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function PublicFooter({}){

    const categories = usePage().props.categories;

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__list">
                    <ul className="flex--r--a--s">
                        <li>
                        <div className="list__Img">
                            <a href="index.html">
                            <img src="img/logowhite.png" alt="" />
                            </a>
                        </div>
                        <div className="foot__content">
                            <ul>
                            <li>
                                <div className="foot__main">
                                <span>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 368.16 368.16" style={{enableBackground: 'new 0 0 368.16 368.16'}} xmlSpace="preserve">
                                    <g>
                                        <path d="M184.08,0c-74.992,0-136,61.008-136,136c0,24.688,11.072,51.24,11.536,52.36c3.576,8.488,10.632,21.672,15.72,29.4
                                                    l93.248,141.288c3.816,5.792,9.464,9.112,15.496,9.112s11.68-3.32,15.496-9.104l93.256-141.296
                                                    c5.096-7.728,12.144-20.912,15.72-29.4c0.464-1.112,11.528-27.664,11.528-52.36C320.08,61.008,259.072,0,184.08,0z
                                                    M293.8,182.152c-3.192,7.608-9.76,19.872-14.328,26.8l-93.256,141.296c-1.84,2.792-2.424,2.792-4.264,0L88.696,208.952
                                                    c-4.568-6.928-11.136-19.2-14.328-26.808C74.232,181.816,64.08,157.376,64.08,136c0-66.168,53.832-120,120-120
                                                    c66.168,0,120,53.832,120,120C304.08,157.408,293.904,181.912,293.8,182.152z" />
                                        <path d="M184.08,64.008c-39.704,0-72,32.304-72,72c0,39.696,32.296,72,72,72c39.704,0,72-32.304,72-72
                                                    C256.08,96.312,223.784,64.008,184.08,64.008z M184.08,192.008c-30.872,0-56-25.12-56-56s25.128-56,56-56s56,25.12,56,56
                                                    S214.952,192.008,184.08,192.008z" />
                                    </g>
                                    </svg>
                                </span>
                                <p className="foot__link-i">93 Clovelly Road, Greenside, Johannesburg 2193</p>
                                </div>
                            </li>
                            <li>
                                <div className="foot__main">
                                <span>
                                    <svg enableBackground="new 0 0 511.997 511.997" height={512} viewBox="0 0 511.997 511.997" width={512} xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="m65.891 381.458 64.642 64.641c70.749 70.75 179.644 85.686 266.466 39.198 2.529-1.207 14.039-7.746 24.375-15.143 22.39-16.021 24.823-48.799 5.209-68.414l-61.707-61.707c-17.544-17.544-46.094-17.546-63.64 0l-21.213 21.213c-17.585 17.586-46.05 17.588-63.64 0l-65.64-65.64c-17.584-17.584-17.59-46.043-.005-63.634.001-.001.002-.001.002-.002l.005-.005 21.211-21.211c17.546-17.546 17.546-46.094 0-63.64l-61.706-61.707c-19.607-19.607-52.389-17.189-68.414 5.208-63.032 88.087-54.679 212.11 24.055 290.843zm277.772-20.211 61.707 61.706c6.464 6.466 5.926 17.524-1.453 22.804-3.574 2.557-7.216 4.975-10.919 7.256l-81.158-81.158 10.609-10.609c5.851-5.849 15.366-5.847 21.214.001zm-148.492 21.212c25.887 25.886 65.567 28.69 94.396 9.55l75.273 75.273c-71.463 29.104-156.916 13.784-213.096-42.397l-64.642-64.641c-56.179-56.18-71.5-141.633-42.396-213.096l75.273 75.273c-19.12 28.799-16.365 68.482 9.551 94.397zm-106.134-275.838 61.707 61.707c5.862 5.863 5.863 15.351 0 21.213l-10.609 10.609-81.158-81.158c2.281-3.703 4.699-7.345 7.256-10.919 5.272-7.366 16.331-7.925 22.804-1.452z" />
                                        <path d="m301.99 30c99.252 0 180 80.748 180 180 0 8.284 6.716 15 15 15s15-6.716 15-15c0-115.794-94.206-210-210-210-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                                        <path d="m301.99 209.986s.001.004.001.014c0 8.284 6.716 15 15 15s15-6.716 15-15c0-16.542-13.458-30-30-30-8.284 0-15 6.709-15 14.993-.001 8.284 6.714 14.993 14.999 14.993z" />
                                        <path d="m301.99 150c33.084 0 60 26.916 60 60 0 8.284 6.716 15 15 15s15-6.716 15-15c0-49.626-40.374-90-90-90-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                                        <path d="m301.99 90c66.168 0 120 53.832 120 120 0 8.284 6.716 15 15 15s15-6.716 15-15c0-82.71-67.29-150-150-150-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
                                    </g>
                                    </svg>
                                </span>
                                <p className="foot__link-i">+27 67 763 7199</p>
                                </div>
                            </li>
                            <li>
                                <div className="foot__main">
                                <span>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve">
                                    <g>
                                        <path d="M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106
                                                    C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z
                                                    M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787
                                                    L338.213,256L482,112.212V399.787z" />
                                    </g>
                                    </svg>
                                </span>
                                <p className="foot__link-i">admin@saguildofactors.co.za</p>
                                </div>
                            </li>
                            <li>
                                <div className="footer__social">
                                    {/* Facebook */}
                                    <a target={"_blank"} href="https://www.facebook.com/southafricanguildofactors/">
                                        <Facebook className="text-zinc-700 " />
                                    </a>
                                    {/* Twitter */}
                                    <a target={"_blank"} href="https://twitter.com/SAGActors">
                                        <Twitter className="text-zinc-700 " />
                                    </a>
                                    {/* Instagram */}
                                    <a target={"_blank"} href="https://www.instagram.com/saguildofactors/">
                                        <Instagram className="text-zinc-700 " />
                                    </a>
                                    {/* Soundcloud */}
                                    <a target={"_blank"} href="https://www.youtube.com/channel/UCico30fsGOojMMNxLznHqYQ">
                                        <Youtube className="text-zinc-700 " />
                                    </a>
                                </div>
                            </li>
                            </ul>
                        </div>
                        </li>
                        <li>
                        <div className="list__heading">
                            <h2>Links</h2>
                            <svg version="1.1" fill="#FFF" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 491.996 491.996" style={{enableBackground: 'new 0 0 491.996 491.996'}} xmlSpace="preserve">
                            <g>
                                <g>
                                <path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
                                            L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
                                            c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
                                            c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
                                            C491.996,136.902,489.204,130.046,484.132,124.986z" />
                                </g>
                            </g>
                            </svg>
                        </div>
                        <div className="foot__links">
                            <ul className="foot__pages">
                            <li>
                                <a href="https://www.saguildofactors.co.za/" className="foot__link">Home</a>
                            </li>
                            
                            <li>
                                <a href="https://www.saguildofactors.co.za/about-us" className="foot__link">About Us</a>
                            </li>
                            <li>
                                <Link href="/" className="foot__link">Skills Portal</Link>
                            </li>
                            <li>
                                <Link href="/category" className="foot__link">Categories</Link>
                            </li>
                            <li>
                                <Link href="/courses" className="foot__link">Courses</Link>
                            </li>
                            <li>
                                <a href="https://www.saguildofactors.co.za/why-join-saga" className="foot__link">Membership</a>
                            </li>
                            <li>
                                <a href="https://www.saguildofactors.co.za/blog" className="foot__link">Blog</a>
                            </li>
                            <li>
                                <a href="https://www.saguildofactors.co.za/contact-us" className="foot__link">Contact Us</a>
                            </li>
                           
                            </ul>
                        </div>
                        </li>
                        <li>
                        <div className="list__heading">
                            <h2>Top Categories</h2>
                        </div>
                        <div className="foot__links">
                            <ul>
                                {
                                    categories.map(category => (
                                        <li key={category.id}>
                                            <Link href={route("public.category.show",{slug:category.slug})} className="foot__link">{category.name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="copy__right">
                    <div className="copy__right__text">
                        <p>© 2009-{(new Date().getFullYear())} South African Guild of Actors. All rights reserved</p>
                    </div>
                    </div>
                </div>
            </footer>
        </>
    )
}