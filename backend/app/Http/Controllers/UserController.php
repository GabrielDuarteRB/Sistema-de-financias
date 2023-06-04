<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function create(Request $request) {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            "nome" => $request->nome,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);

        $credenciais = $request->only('email', 'password');
        $token = auth()->attempt($credenciais);


        return response()->json([
            "message" => "Usuario criado com sucesso",
            "id" => $user->id,
            "nome" => $user->nome,
            "email" => $user->email,
            ...$this->respondWithToken($token)->original,
        ]);
    }

    public function delete(Request $request) {
        $request->validate(["id" => "required|int"]);

        $user = User::find($request->id);

        if(!$user){
            return response()->json(
                ["message" => "Usuario nao encontrado"],
                404
            );
        }

        $user->delete();

        return response(["message" => "Usuario deletado com sucesso"]);
    }

    public function update(Request $request, int $id)
    {
        $user = User::find($id);

        if(!$user) {
            return response()->json(
                ["message" => "Usuario nao encontrado"],
                404
            );
        }

        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        $user->nome = $request->nome;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(
            ["message" => "Usuario atualizado com sucesso"]
        );
    }

}
