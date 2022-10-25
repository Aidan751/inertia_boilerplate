@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>A business has requested to join the Order It platform</p>

    <p>Registration name: {{ $name }},</p>
    <p>Contact number: {{ $contact }}</p>
    <p>Email address: {{ $email }}</p>
    
    <p>Their restaurant details include: </p>
    <p>Business name: {{ $restaurantName }}</p>
    <p>Business address: {{ $addressLine1 }}, {{ $addressLine2 }}, {{ $town }}, {{ $county }}, {{ $postcode }}</p>
    <p>Business category: {{ $category }}</p>
    <p>Business bio: {{ $bio }}</p>
    <p>Logo</p>
    <img src={{$logo}} alt={{$logo}}>
    <br>
    <p>Banner</p>
    <img src={{$banner}} alt={{$banner}}>

@endsection