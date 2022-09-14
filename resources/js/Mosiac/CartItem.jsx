import React from 'react';

import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { formatThousands } from '@/utils/Utils';

function CartItem({course,id}) {

	const removeItemFromCart = (event) => {
		event.preventDefault();
		const url = "/cart/"+id;
		Inertia.delete(url);
	}
	return (
		<>
			{/* Cart item */}
			<li key={id} className="sm:flex items-center py-6 border-b border-slate-200">

					<Link className="block mb-4 sm:mb-0 mr-5 md:w-32 xl:w-auto shrink-0" href={"/courses/"+course.slug}>
						<img className="rounded-sm" src={course.featureImage} width="200" height="142" alt={course.name} />
					</Link>
					<div className="grow">
						<a href="#0">
							<h3 className="text-lg font-semibold text-slate-800 mb-1">
								{course.name}
							</h3>
						</a>
						<div className="text-sm mb-2">
							{course.metaDescription}
						</div>
						{/* Product meta */}
						<div className="flex flex-wrap justify-between items-center">
							{/* Rating and price */}
							<div className="flex flex-wrap items-center space-x-2 mr-2">
								{/* Rating */}
								<div className="flex items-center space-x-2">
									{/* Stars */}
									<div className="flex space-x-1">
										<button>
											<span className="sr-only">1 star</span>
											<svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
												<path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
											</svg>
										</button>
										<button>
											<span className="sr-only">2 stars</span>
											<svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
												<path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
											</svg>
										</button>
										<button>
											<span className="sr-only">3 stars</span>
											<svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
												<path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
											</svg>
										</button>
										<button>
											<span className="sr-only">4 stars</span>
											<svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
												<path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
											</svg>
										</button>
										<button>
											<span className="sr-only">5 stars</span>
											<svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 16 16">
												<path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
											</svg>
										</button>
									</div>
									{/* Rate */}
									{/* <div className="inline-flex text-sm font-medium text-amber-600">4.2</div> */}
								</div>
								<div className="text-slate-400">·</div>
								{/* Price */}
								<div>
									<div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2 py-0.5">R {formatThousands(course.price)}</div>
								</div>
							</div>
							<button onClick={removeItemFromCart} className="text-sm underline hover:no-underline">Remove</button>
						</div>
					</div>
			</li>
		</>
	);
}

export default CartItem;