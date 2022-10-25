<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <title>Welcome User</title>
</head>
<body>

<div class="p-5">
    <p>Hi {{ $details['first_name'] }} {{ $details['last_name'] }},</p>

    <p>A new account has been setup for you for the Order It platform, your login details are listed below.</p>

    <ul>
        <li>Email Address: {{ $details['email'] }}</li>
        <li>Password: {{ $details['password'] }}</li>
    </ul>

    <p>You can access your account at:</p>
    <a href={{config('app.url') . "/login"}}>{{config('app.url') . "/login"}}</a>
</div>
</body>
</html>



