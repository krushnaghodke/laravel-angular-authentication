@component('mail::message')

    @component('mail::button', ['url' => 'http://localhost:4200/response-password?token='.$token])
        Change Password
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}

@endcomponent