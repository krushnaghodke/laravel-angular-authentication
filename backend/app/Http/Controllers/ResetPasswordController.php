<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\User;
use DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {
        if (!$this->validateEmail($request->get('email'))) {
            return $this->returnFailedResponse();
        }

        $token = $this->createSaveToken($request->get('email'));

        $this->send($request->get('email'), $token);

        return $this->returnSucessResponse();
    }

    public function validateEmail($email)
    {
        return !!User::where('email', $email)->first();
    }

    public function createSaveToken($email)
    {
        $oldToken = DB::Table('password_resets')->where('email', $email)->first();
        if($oldToken){
            return $oldToken;
        }
        $token = str_random(60);
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => new \DateTime()
        ]);

        return  $token;
    }

    public function returnFailedResponse()
    {
        return response()->json([
            'error' => 'User not found'
        ], Response::HTTP_NOT_FOUND);
    }

    public function returnSucessResponse()
    {
        return response()->json([
            'data' => 'Email sent successfully'
        ], Response::HTTP_OK);
    }

    public function send($email, $token)
    {
        Mail::to($email)->send(new ResetPasswordMail($token->token));
    }

    public function resetPassword(\Illuminate\Http\Request $request){
        return $request->all();
    }
}
