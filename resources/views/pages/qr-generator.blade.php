@extends('layouts.app')

@section('content')
<div class="qr-container">
    <div class="row">
        <div class="col-md-12">
            <div class="homepage-title">
                <h1><span>QR Templar</span> is a free to use <span>QR code generator</span></h1>
            </div>
        </div>
        <div class="col-md-2">
            {{-- <p style="text-align: center">advert space</p> --}}
             <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146097342775096"
                crossorigin="anonymous"></script>
            <!-- vertical recommended ads -->
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-2146097342775096"
                data-ad-slot="5830251800"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
        <div class="col-md-8">
            <div class="qr-card">
                <div class="card-body">
                    {{-- free QR code --}}
                    @if( auth()->check() ) 
                        <div id="premium-qr-form"></div>
                    @else
                        <div id="free-qr-form"></div>
                    @endif
                        {{-- @can('manage users')
                            {{Auth::user()->roles->first()->name}}
                        @endcan
                        @can('premium products')
                            {{Auth::user()->roles->first()->name}}
                        @endcan --}}
                </div>
            </div>
        </div>
        <div class="col-md-2">
            {{-- <p style="text-align: center">advert space</p> --}}
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146097342775096"
                crossorigin="anonymous"></script>
            <!-- vertical recommended ads -->
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-2146097342775096"
                data-ad-slot="5830251800"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    </div>
</div>
<div class="container-qr-content">
    <div class="container-width">
        <section id="qr-templar-intro">
            <div class="row">
                <div class="col-md-12">
                    <div class="title">
                        <h2>The world of QR Codes</h2>
                    </div>
                    <div class="content">
                        <p>
                            QR Templar QR codes allow for a potential customer/client/user to obtain your information with a quick scan. A QR code makes the admin work less for a customer/client/user to get in touch with the data you want to provide them with. Let's consider a business card vs a Vcard, when you provide a business card a user needs to open their phone app on their mobile, then dial the number (human error may take place). With a Vcard QR code on a business card, your potential customer/client/user can scan it then choose to either call, email, add you to contacts list and even find your address (which you provide) that will open their navigation app of choice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id="qr-templar-reason">
            <div class="row g-3">
                <div class="col-md-4 logo">
                    <div class="logo-container">
                        <div class="logo-cube">
                            <div class="side front"></div>
                            <div class="side left"></div>
                            <div class="side right"></div>
                            <div class="side top"></div>
                            <div class="side bottom"></div>
                            <div class="side back"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="reason-content">
                        <div class="title">
                            <h2>Why <span class="digit">QR TEMPLAR</span>?</h2>
                            <h4>Why use QR TEMPLAR as your QR genrator app</h4>
                        </div>
                        <div class="content">
                            <p>QR Templar is the new kid on the block so to speak, the developer of this app is highly enthusiastic when it comes to technology and tries to push new limits. QR Templar is a free to use QR code generator which anyone may use. QR Templar is built to assist with the growth on your journey, whether it be your business, influencer growth or whatever you need your QR code to do. QR Templar has your back.</p>
                        </div>

                        <div id="feedback-form"></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
@endsection