@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>Your password reset code is: {{$code}}</p>

   <p>Thank you</p>

@endsection