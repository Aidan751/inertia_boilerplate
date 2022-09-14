import React from 'react';

export default function Footer({ appName  }) {
    return (
        <footer
        className="p-6 text-center text-sm"
        style={{ backgroundColor: '#fff' }}
        >


                <p className="mb-1">&copy; { new Date().getFullYear() } { appName }</p>
                <p>Design &amp; Technology by <a href="https://www.createanet.co.uk" target="_blank" style={{color: 'rgb(183, 38, 126)'}}>Createanet</a></p>

        </footer>
    );
}
