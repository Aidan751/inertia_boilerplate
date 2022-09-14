import React from 'react';

export default function Footer({ appName = "Order It" }) {
    return (
        <footer
        >

            <div class="container">
                <p>&copy; { new Date().getFullYear() } { appName }</p>
                <p>Design &amp; Technology by <a href="https://www.createanet.co.uk" target="_blank">Createanet</a></p>
            </div>
        </footer>
    );
}
