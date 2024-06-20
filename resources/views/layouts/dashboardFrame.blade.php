<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} free to use QR Code Generator</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146097342775096"
     crossorigin="anonymous"></script>
</head>
<body class="the_body">
    <div id="dashboard-app-outer">
        {{-- <div id="dashboard-nav">
            <ul>
                <li>home</li>
                @if(auth()->user()->cannot('manage campaigns'))
                    <li>QR Codes</li>
                @endif
                @if(auth()->user()->can('manage campaigns'))
                    <li>Manage Campaigns</li>
                @endif

                <li>Manage Account</li>
            </ul>
        </div> --}}
        @yield('content')
    </div>
</body>
</html>
