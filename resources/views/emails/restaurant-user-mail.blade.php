
    <p>Hi {{ $details['first_name'] }} {{ $details['last_name'] }},</p>

    <p>A new account has been setup for you for the Order It platform, your login details are listed below.</p>

    <ul>
        <li>Email Address: {{ $details['email'] }}</li>
        <li>Password: {{ $details['password'] }}</li>
    </ul>

    <p>You can access your account at:</p>
    <a href={{config('app.url') . "/login"}}>{{config('app.url') . "/login"}}</a>
