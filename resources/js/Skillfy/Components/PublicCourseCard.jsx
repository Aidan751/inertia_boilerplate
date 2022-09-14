import { trimText } from "@/utils/Utils";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Heart, ShoppingCart } from "lucide-react";

export default function PublicCourseCard({coursePage,buyCourseLink,image,courseTitle,coursePrice,description,courseId}){

    /**
     * function to add course to cart
     * @param {Add Item to Card} event 
     */
    const addToCart = (event) => {

        // prevent default action
        event.preventDefault();

        // Add the course to cart, using the courseId as the key to identify the course in the cart object. This is a unique key for each course. The courseId is the same as the id of the course in the database. The method uses Inertia to make a post request to the cart/add endpoint.
        Inertia.post(route("cart.store"),{
            course : courseId       
        })
    }
    return (
        <>
            <div key={courseId} className="course__card__wrapper">
                <div className="course__card">
                    <div className="card__top">
                        {/* Course Card WishList  */}
                        <Link className="absolute right-1 top-1" >
                            <Heart className="" />
                        </Link>
                        {/* Course Card Feature Image */}
                        <Link href={route("public.courses.show",{slug:coursePage})}>
                            <div className="card__img">
                                <img src={image ?? ""} alt="" />
                            </div>
                        </Link>
                    </div>

                    {/* Course Card Main Section */}
                    <div className="card__footer">
                        {/* Course Card Title */}
                        <div className="heading ">

                            <Link href={route("public.courses.show",{slug:coursePage})}>                          
                                <h2>{courseTitle}</h2>
                            </Link>
                        </div>

                        {/* Course Card Price */}
                        <div className="card__profile">
                            <div class="card__text">
                                <p>{trimText(description,150)}</p>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    {/* Course Price */}
                                    <span className="text-zinc-800 font-sans font-semibold text-lg ">{coursePrice ?? ""}</span>
                                    {/* Buy Course Button */}
                                    <Link onClick={addToCart} className="bg-red-800 text-zinc-100 font-sans font-bold text-sm py-1 px-4 rounded-xl shadow-md hover:shadow-2xl flex items-center" href={buyCourseLink??""}>
                                        Add to Cart
                                        <ShoppingCart className="ml-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}