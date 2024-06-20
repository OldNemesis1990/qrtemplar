<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\SMTP;

use Log;

class Mailer extends Controller
{
    public function index(Request $request) {
        require base_path("vendor/autoload.php");
        $mail = new PHPMailer(true);
        
        $to = "info@qrtemplar.com";
        $fields = json_decode($request->fields);
        $msgType = $request->selection;

        try {
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = "smtp-qrtemplar.alwaysdata.net";
            $mail->SMTPAuth = true;
            $mail->Username = "feedback@qrtemplar.com";
            $mail->Password = "96544563plmokn";
            $mail->SMTPSecure = false;
            $mail->Port = 587;
            
            $mail->isHTML(true);

            $mail->setFrom("feedback@qrtemplar.com", $fields->name);
            $mail->addAddress("feedback@qrtemplar.com");
            $mail->addBCC("lee.baartman@outlook.com");

            $mail->addReplyTo($fields->email, $fields->name);

            $mail->Subject = ucfirst($msgType . " From Website");
            $mail->Body = $fields->message;

            // Log::debug(print_r($mail, true));
            if( !$mail->send() ) {
                Log::debug("Mail failed: " . $mail->ErrorInfo);
                return response()->json([
                    'message' => "Unfortunately the team could not see your $msgType. Please click on <a href='mailto:feedback@qrtemplar.com?subject=$mail->subject&body=$mail->body'>feedback@qrtemplar.com</a> and send your message",
                    'response_code' => 550
                ]);
            } else {
                $message = '';
                
                if($msgType == "suggestion") {
                    $message = "Hi $fields->name, we will review your suggestion and take it into consideration. Thank you for participating in the growth of the platform.";
                } else if($msgType == "compliment") {
                    $message = "Hi $fields->name, thank you very much for the compliment.";

                } else if($msgType == "complaint") {
                    $message = "Hi $fields->name, we are sorry to hear that you are having a bad experience and will try and resolve this ASAP.";

                } else if($msgType == "hi") {
                    $message = "Hi $fields->name, thank you for you message.";

                } else if($msgType == "other") {
                    $message = "Hi $fields->name, thank you for you message.";

                }
                return response()->json([
                    'message' => $message,
                    'response_code' => 200
                ]);
            }
        } catch(Exception $e) {
            Log::debug("Mail Error: " . $e);
            return response()->json([
                'message' => "Unfortunately the team could not see your $msgType. Please click on <a href='mailto:feedback@qrtemplar.com?subject=$mail->subject&body=$mail->body'>feedback@qrtemplar.com</a> and send your message",
                'response_code' => 401
            ]);
        }
    }
}
