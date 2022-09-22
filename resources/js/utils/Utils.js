import { usePage } from "@inertiajs/inertia-react"
import { useState,useEffect } from "react";

export const hasPermissions = (permission) => {

    // Get user permissions
    const permissions = usePage().props.auth.permissions;

    // set permission to false
    const [hasPermission, setHasPermission] = useState(false);

    // Check if user has permission, using a useEffect hook
    useEffect(() => {

        permissions.map(item => {

            // If user has permission, set hasPermission to true
            if (item == permission) {

                setHasPermission(true);
            }

        });
    }, [permissions]);

    // Return hasPermission
    return hasPermission;
        
}


export const hasRole = (role)=> {
    // Get user roles
    let roles = usePage().props.auth.roles ?? [];

    // set has role to false
    const [hasRole,setHasRole] = useState(false);
        
    // loop through user roles
    useEffect(() => {
        roles.map(element => {
            // if user has role
            if(element == role){
                // set has role to true
                setHasRole(true);
            }
        });
    }, [roles]);

    // return has role
    return hasRole;
}


export const trimText = (text, length)=> {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    } else {
        return text;
    }
}
