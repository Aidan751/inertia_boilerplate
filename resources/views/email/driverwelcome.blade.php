@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>Hi {{ $name }},</p>

    <p>Congratulations, your application to become a Order It driver has been accepted.</p>

    <p>A new account has been setup for you, your login details are listed below.</p>

    <ul>
        <li>Email Address: {{ $email }}</li>
        <li>Password: {{ $password }}</li>
    </ul>

@endsection