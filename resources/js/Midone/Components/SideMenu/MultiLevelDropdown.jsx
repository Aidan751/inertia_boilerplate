import { Link } from "@inertiajs/inertia-react";
import { Activity, ChevronDown, ChevronUp, Inspect, VideoOff } from "lucide-react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";


export default function MultiLevelDropdown(props){

    const [isShowing,setIsShowing] = useState(props.active);
    const [dropdown1,setDropdown1] = useState(props.secondActiveGroup == 1 ? true : false);
    const [dropdown2,setDropdown2] = useState(props.secondActiveGroup == 2 ? true : false);
    const [dropdown3,setDropdown3] = useState(props.secondActiveGroup == 3 ? true : false);
    const [dropdown4,setDropdown4] = useState(props.secondActiveGroup == 4 ? true : false);

    // Links
    const dropdown1Links = [
        {
            title:"Outdoor",
            href:"/admin/mass-media/outdoor"
        },
        {
            title:"TV",
            href:"/admin/mass-media/tv"
        },
        {
            title:"Radio",
            href:"/admin/mass-media/radio"
        },
        {
            title:"Paper",
            href:"/admin/mass-media/paper"
        },{
            title:"Digital",
            href:"/admin/mass-media/digital"
        },
    ];

    const dropdown2Links = [
       {
           href:"/admin/interventions/loud-hailer",
           title: "Loudhailer"
       },
       {
           href:"/admin/interventions/workshop-training",
           title: "Workshop - Training"
       },
       {
           href:"/admin/interventions/workshop-education",
           title: "Workshop - Education"
       },
       {
           href:"/admin/interventions/door-to-door",
           title: "Door To Door"
       },
       {
           href:"/admin/interventions/dialogue",
           title: "Dialogue"
       },
       {
           href:"/admin/interventions/webinar",
           title: "Webinar"
       },
       {
           href:"/admin/interventions/vaccine-drive",
           title: "Vaccine Drive"
       },
       {
           href:"/admin/interventions/pop-up-sites",
           title: "Pop Up Sites"
       },
       {
           href:"/admin/interventions/panel-discussion",
           title: "Panel Discussion"
       },
       {
           href:"/admin/interventions/influencing",
           title: "Influencing"
       },
       {
           href:"/admin/interventions/request-new-category",
           title: "Request New Category"
       },
    ];

    const dropdown3Links = [
        {
            title:"Upload Questionnaire",
            href:"/admin/research/upload-new-questionnaire"
        },
    ];

    // const dropdown4Links = [
    //     {
    //         title:"Paid Campaign",
    //         href:"/admin/social-media/outdoor"
    //     },
    //     {
    //         title:"Organic Campaign",
    //         href:"/admin/social-media/outdoor"
    //     }
    // ];


    const toggleDropdown = (event) => {
        event.preventDefault();
        setIsShowing(!isShowing);
    }
    const toggle1 = (event) => {
        event.preventDefault();
        setDropdown1(!dropdown1);
    }
    const toggle2 = (event) => {
        event.preventDefault();
        setDropdown2(!dropdown2);
    }
    const toggle3 = (event) => {
        event.preventDefault();
        setDropdown3(!dropdown3);
    }
    const toggle4 = (event) => {
        event.preventDefault();
        setDropdown4(!dropdown4);
    }
    return (
        <>
            <li>
                {/* Main Menu Toggler */}
                <Link onClick={toggleDropdown} className={props.active ? "side-menu side-menu--active": "side-menu"}>
                    <div className="side-menu__icon">
                        {props.children}
                    </div>
                    
                    <div className="side-menu__title">
                        {props.groupTitle} 
                        <div className="side-menu__sub-icon transform rotate-180">
                            {
                                isShowing && 
                                <ChevronDown />
                            }
                            {
                                isShowing == false &&
                                <ChevronUp />
                            }
                        </div>
                    </div>
                </Link>
                

                <Transition
                    as={Fragment}
                    show={isShowing}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <ul className={ "side-menu__sub-open"}>
                        <li>
                            <Link onClick={toggle1} className={dropdown1 ? "side-menu side-menu--active": "side-menu"}>
                                <div className="side-menu__icon">
                                    <Activity />
                                </div>
                                <div className="side-menu__title">
                                    Mass Media
                                    <div className="side-menu__sub-icon ">
                                        <ChevronDown />
                                    </div>

                                </div>
                            </Link>
                            <Transition
                                as={Fragment}
                                show={dropdown1}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <ul className={ "side-menu__sub-open"}>

                                    {
                                        dropdown1Links &&
                                        dropdown1Links.map(link => (

                                            <li key={link.href}>
                                                <Link href={link.href} className="side-menu">
                                                    <div className="side-menu__icon">
                                                        <Activity />
                                                    </div>
                                                    <div className="side-menu__title">{link.title}</div>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Transition>
                        </li>
                        

                        {/* Interventions */}
                        <li>
                            <Link onClick={toggle2} className={dropdown2 ? "side-menu side-menu--active": "side-menu"}>
                                <div className="side-menu__icon">
                                    <Activity />
                                </div>
                                <div className="side-menu__title">
                                    interventions
                                    <div className="side-menu__sub-icon ">
                                        <ChevronDown />
                                    </div>

                                </div>
                            </Link>
                            <Transition
                                as={Fragment}
                                show={dropdown2}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <ul className={ "side-menu__sub-open"}>

                                    {
                                        dropdown2Links &&
                                        dropdown2Links.map(link => (

                                            <li key={link.href}>
                                                <Link href={link.href} className="side-menu ">
                                                    <div className="side-menu__icon">
                                                        <Activity />
                                                    </div>
                                                    <div className="side-menu__title">{link.title}</div>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Transition>
                        </li>

                        {/* Research */}
                        <li>
                            <Link onClick={toggle3} className={dropdown3 ? "side-menu side-menu--active": "side-menu"}>
                                <div className="side-menu__icon">
                                    <Activity />
                                </div>
                                <div className="side-menu__title">
                                    Research
                                    <div className="side-menu__sub-icon ">
                                        <ChevronDown />
                                    </div>

                                </div>
                            </Link>
                            <Transition
                                as={Fragment}
                                show={dropdown3}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <ul className={ "side-menu__sub-open"}>

                                    {
                                        dropdown3Links &&
                                        dropdown3Links.map(link => (

                                            <li key={link.href}>
                                                <Link href={link.href} className="side-menu">
                                                    <div className="side-menu__icon">
                                                        <Activity />
                                                    </div>
                                                    <div className="side-menu__title">{link.title}</div>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Transition>
                        </li>

                        {/* Social Media */}
                        {/* <li>
                            <Link onClick={toggle4} className={dropdown4 ? "side-menu side-menu--active": "side-menu"}>
                                <div className="side-menu__icon">
                                    <Activity />
                                </div>
                                <div className="side-menu__title">
                                    Social Media
                                    <div className="side-menu__sub-icon ">
                                        <ChevronDown />
                                    </div>

                                </div>
                            </Link>
                            <Transition
                                as={Fragment}
                                show={dropdown4}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <ul className={ "side-menu__sub-open"}>

                                    {
                                        dropdown4Links &&
                                        dropdown4Links.map(link => (

                                            <li key={link.href}>
                                                <Link href={link.href} className="side-menu ">
                                                    <div className="side-menu__icon">
                                                        <Activity />
                                                    </div>
                                                    <div className="side-menu__title">{link.title}</div>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Transition>
                        </li> */}
                    </ul>

                </Transition>
                
            </li>
        </>
    )
}


