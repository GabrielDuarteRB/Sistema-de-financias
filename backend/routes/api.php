<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/user/login', [AuthController::class, 'login']);
Route::post('/user/create', [UserController::class, 'create']);

Route::group([
    'middleware' => 'api'
], function () {
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::delete('/user/delete', [UserController::class, 'delete']);
    Route::put('/user/update', [UserController::class, 'update']);
});


