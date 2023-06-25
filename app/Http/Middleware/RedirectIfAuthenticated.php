<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check() && Auth::user()->roles()->first()->name == 'admin') {

                // return redirect(RouteServiceProvider::HOME);
                return redirect('/dashboardAdmin');
            } else if (Auth::guard($guard)->check() && Auth::user()->roles()->first()->name == 'pelamar') {

                // return redirect(RouteServiceProvider::HOME);
                return redirect('/lowonganKerja');
            } else if (Auth::guard($guard)->check() && Auth::user()->roles()->first()->name == 'perusahaan') {
                if (Auth::user()->is_active == 1) {

                    return redirect('/dashboard-perusahaan');
                } else {
                    return redirect('/modalVerification');
                    Auth::guard('web')->logout();

                    $request->session()->invalidate();
            
                    $request->session()->regenerateToken();
            
                    return redirect('/login');
                }
            }
        }

        return $next($request);
    }
}