<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdmin', function($user){
            return $user->access === 'admin';
        });

        Gate::define('isParent', function($user){
            return $user->access === 'parent';
        });
        Gate::define('isChildren', function($user){
            return $user->access === 'children';
        });
        Gate::define('isGuest', function($user){
            return $user->access === 'guest';
        });

        Passport::routes();
        //
    }
}
