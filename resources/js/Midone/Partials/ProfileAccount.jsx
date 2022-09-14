import { Link, usePage } from "@inertiajs/inertia-react"
import {useState} from "react"
import { Activity, Box, Image, Lock, PersonStanding, Settings, Settings2 } from "lucide-react";
import AccountSettingsForm from "../Components/Forms/AccountSettingsForm";
import AccountPasswordForm from "../Components/Forms/AccountPasswordForm";
import ValidationSuccess from "@/Components/ValidationSuccess";
import AccountContactForm from "../Components/Forms/AccountContactForm";
import AccountImageForm from "../Components/Forms/AccountImageForm";

export default function ProfileAccount(props){

    const page = usePage().props;
    const user = page.auth.user;

    const [showAccount,setShowAccount] = useState(true)
    const [showPasswordChange,setShowPasswordChange] = useState(false);
    const [showContactInfo,setShowContactInfo] = useState(false);
    const [showImageUpload,setShowImageUpload] = useState(false);
    function toggle1(){
        setShowAccount(true);
        setShowPasswordChange(false);
        setShowContactInfo(false);
        setShowImageUpload(false);
    }
    function toggle2(){
        setShowAccount(false);
        setShowPasswordChange(true);
        setShowContactInfo(false);
        setShowImageUpload(false);
    }
    function toggle3(){
        setShowAccount(false);
        setShowPasswordChange(false);
        setShowContactInfo(true);
        setShowImageUpload(false);
    }
    function toggle4(){
        setShowAccount(false);
        setShowPasswordChange(false);
        setShowContactInfo(false);
        setShowImageUpload(true);
    }
    return (
        <>
            <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        Account Settings
                    </h2>
                </div>
                <div className="intro-x">
                    {
                        props.success &&
                        <ValidationSuccess message={props.message} />
                    }
                </div>
                <div className="grid grid-cols-12 gap-6">
                    {/*  BEGIN: Profile Menu  */}
                    <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
                        <div className="intro-y box mt-5">
                            {/* Intro */}
                            <div className="relative flex items-center p-5">
                                <div className="w-12 h-12 image-fit">
                                    <img alt="" className="rounded-full" src={ user.image?? "/images/preview.jpg"} />
                                </div>
                                <div className="ml-4 mr-auto">
                                    <div className="font-medium text-base">
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="text-slate-500">
                                        {user.organization}
                                    </div>
                                </div>
                            </div>
                            {/* Links */}
                            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                                <button 
                                    className={"flex items-center " + (showAccount ? " font-medium text-primary" : "")} onClick={toggle1} >
                                    <Activity className="w-4 h-4 mr-2" />
                                    Personal Information
                                </button>
                                <button 
                                    className={"flex items-center mt-5 " + (showContactInfo ? " font-medium text-primary" : "")} onClick={toggle3}> 
                                    <Box className="w-4 h-4 mr-2" />
                                    Contact Information
                                </button>
                                <button 
                                    className={"flex items-center mt-5 " + (showPasswordChange ? " font-medium text-primary" : "")} onClick={toggle2}> 
                                    <Lock className="w-4 h-4 mr-2" />
                                    Change Password
                                </button>
                                <button className={"flex items-center mt-5 " + (showImageUpload ? " font-medium text-primary" : "")} onClick={toggle4} > 
                                    <Image className="w-4 h-4 mr-2" />
                                    User Images
                                </button>
                            </div>
                        </div>
                    </div>
                    {/*  END: Profile Menu  */}
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        
                        {/* Account information */}
                        {
                            showAccount &&
                            <AccountSettingsForm />
                        }
                        {
                            showPasswordChange &&
                            <AccountPasswordForm />
                        }
                        {
                            showContactInfo &&
                            <AccountContactForm />
                        }
                        {
                            showImageUpload &&
                            <AccountImageForm />
                        }
                    </div>
                </div>
        </>
    )
}