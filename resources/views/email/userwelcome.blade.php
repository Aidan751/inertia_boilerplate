@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>Hi {{ $name }},</p>

    <p>A new account has been setup for you for the Order It platform, your login details are listed below.</p>

    <ul>
        <li>Email Address: {{ $email }}</li>
        <li>Password: {{ $password }}</li>
    </ul>

    <p>You can access your account at:</p>
    <a href="{{config('app.url'}}/admin/login">{{"{{config('app.url'}}"}}/admin/login</a>

@endsection