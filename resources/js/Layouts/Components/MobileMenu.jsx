import ApplicationLogo from "@/Images/logo_sml.png";
import {menuDropdown,menuLinks} from "@/Layouts/Components/NavigationLinks";

export default function mobileMenu() {

    return (
        <>
            {/* BEGIN: Mobile Menu */}
            <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href className="flex mr-auto">
                        <img alt="SAGA - Skill Portal" className="w-6" src={ApplicationLogo} />
                    </a>
                    <a href={null} id="mobile-menu-toggler">
                        <i data-lucide="bar-chart-2" className="w-8 h-8 text-white transform -rotate-90" />
                    </a>
                </div>
                <ul className="border-t border-white/[0.08] py-5 hidden">
                    {/*  Divider   */}
                    <li className="menu__devider my-6" />

                    <menuLinks
                        href={"/admin"}
                        title={"Home"}
                        active={true}
                        icon={"home"}
                    />

                </ul>

            </div>
            {/* END: Mobile Menu */}
        </>
    )
}
