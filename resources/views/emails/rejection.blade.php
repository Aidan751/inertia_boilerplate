@extends('email', [
])
@section('subject', $subject)

@section('content')

    <p>Hi {{ $name }},</p>

    <p>Unfortunately, your application to list your business on {{config('app.name')}}  has not been successful at this time.</p>

    <p>If you would like to re-apply, you can do so by visiting our website at: <a href="{{config('app.url'}}"></a></p>

@endsection