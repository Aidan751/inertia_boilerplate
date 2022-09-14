import { usePage } from '@inertiajs/inertia-react';
import { useState,useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
	// Tailwind config
	return resolveConfig('./src/css/tailwind.config.js')
}


export const hexToRGB = (h) => {
	let r = 0;
	let g = 0;
	let b = 0;
	if (h.length === 4) {
		r = `0x${h[1]}${h[1]}`;
		g = `0x${h[2]}${h[2]}`;
		b = `0x${h[3]}${h[3]}`;
	} else if (h.length === 7) {
		r = `0x${h[1]}${h[2]}`;
		g = `0x${h[3]}${h[4]}`;
		b = `0x${h[5]}${h[6]}`;
	}
	return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'ZAR',
	maximumSignificantDigits: 3,
	notation: 'compact',
}).format(value);

export const formatThousands = (value) => Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 3,
	notation: 'compact',
}).format(value);



/**
 * Check is user has permission to a given permission.
 * @param {*} value 
 * @returns boolean 
 */
 export const hasPermission = (permission) => {
	// Get user permissions
	const permissions = usePage().props.auth.permissions;
    
    // set has permission to false
	const [hasPermission,setHasPermission] = useState(false);
    
    // loop through user permissions
	useEffect(() => {
        permissions.map(element => {
            // if user has permission
            if(element == permission){
                // set has permission to true
                setHasPermission(true);
            }
        });
    }, [permissions]);

    // return has permission
	return hasPermission;
	
}

export const trimText = (text, length)=> {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    } else {
        return text;
    }
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


export const provinces = [
    "Western Cape",
    "Eastern Cape",
    "Northern Cape",
    "North West",
    "Free State",
    "Kwazulu Natal",
    "Gauteng",
    "Limpopo",
    "Mpumlanga",
];

export const titles = [
    {id: "Mr", label: "Mr" , value: "Mr"},
    {id: "Mrs", label: "Mrs" , value: "Mrs"},
    {id: "Miss", label: "Miss" , value: "Miss"},
    {id: "Ms", label: "Ms" , value: "Ms"},
    {id: "Dr", label: "Dr" , value: "Dr"},
    {id: "Prof", label: "Prof" , value: "Prof"},
    {id: "Rev", label: "Rev" , value: "Rev"},
    {id: "Pastor", label: "Pastor" , value: "Pastor"},
    {id: "Sir", label: "Sir" , value: "Sir"},
    {id: "Lady", label: "Lady" , value: "Lady"},
    {id: "Majesty", label: "Majesty" , value: "Majesty"},
    {id: "Bishop", label: "Bishop" , value: "Bishop"},
    {id: "Archbishop", label: "Archbishop" , value: "Archbishop"},
    {id: "Baron", label: "Baron" , value: "Baron"},
    {id: "Count", label: "Count" , value: "Count"},
    {id: "Dame", label: "Dame" , value: "Dame"},
    {id: "Duke", label: "Duke" , value: "Duke"},
    {id: "Earl", label: "Earl" , value: "Earl"},
];

export const identityTypes = [
    {id: "Passport", label: "Passport" , value: "Passport"},
    {id: "Identity Card", label: "Identity Card" , value: "Identity Card"},
];


export const materialType = [
    {
        id: 1, label: "Sound Cloud",value: "soundCloud"
    },
    {
        id: 2, label: "Youtube",value: "youtube"
    },
    {
        id: 3, label: "Audio Upload",value: "audio"
    },
    {
        id: 4, label: "Video Upload",value: "video"
    },
    {
        id: 5, label: "Document",value: "document"
    },
    {
        id: 6, label: "Content",value: "content"
    },
    {
        id: 7, label: "Combined Resources",value: "combination"
    },
];
export const externalAudioProvider = [
    {
        id: 1, label: "Spotify",value: "spotify"
    },
    {
        id: 2, label: "Sound Cloud",value: "soundCloud"
    },
];

export const externalVideoProvider = [
    {
        id: 2, label: "Youtube",value: "youtube"
    },
    {
        id: 3, label: "Vimeo",value: "vimeo"
    },
];