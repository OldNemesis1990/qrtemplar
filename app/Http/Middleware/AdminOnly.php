<?php

namespace App\Http\Middleware;

use Closure;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AdminOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

    use AuthenticatesUsers;

    public function handle(Request $request, Closure $next)
    {
        if(!Auth::user()->hasPermissionTo('manage users')) {
            return redirect('/');
        }
        return $next($request);
    }
}
