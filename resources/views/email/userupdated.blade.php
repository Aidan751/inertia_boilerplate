@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>Hi {{ $name }},</p>

    <p>Your login details have been updated and are as below:</p>

    <ul>
        <li>Email Address: {{ $email }}</li>
        <li>Password: {{ $password }}</li>
    </ul>

    <p>You can access your account at:</p>
    <a href="https://foodserviceapp.createaclients.co.uk/admin/login">https://foodserviceapp.createaclients.co.uk/admin/login</a>

@endsection