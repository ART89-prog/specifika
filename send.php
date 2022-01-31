<?
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';


/*Обработка файла*/

$input_name = 'file';
 
// Разрешенные расширения файлов.
$allow = array();
 
// Запрещенные расширения файлов.
$deny = array(
    'phtml', 'php', 'php3', 'php4', 'php5', 'php6', 'php7', 'phps', 'cgi', 'pl', 'asp', 
    'aspx', 'shtml', 'shtm', 'htaccess', 'htpasswd', 'ini', 'log', 'sh', 'js', 'html', 
    'htm', 'css', 'sql', 'spl', 'scgi', 'fcgi', 'exe'
);
 
// Директория куда будут загружаться файлы.
$path = __DIR__ . '/files/';


$error = $success = '';
if (!isset($_FILES[$input_name])) {
    $error = 'Файл не загружен.';

} else {
    $file = $_FILES[$input_name];    
    // Проверим на ошибки загрузки.
    if (!empty($file['error']) || empty($file['tmp_name'])) {
        $error = 'Не удалось загрузить файл.';
    } elseif ($file['tmp_name'] == 'none' || !is_uploaded_file($file['tmp_name'])) {
        $error = 'Не удалось загрузить файл.';
    } else {
        // Оставляем в имени файла только буквы, цифры и некоторые символы.
        $pattern = "[^a-zа-яё0-9,~!@#%^-_\$\?\(\)\{\}\[\]\.]";
        $name = mb_eregi_replace($pattern, '-', $file['name']);
        $name = mb_ereg_replace('[-]+', '-', $name);
        $parts = pathinfo($name);
 
        if (empty($name) || empty($parts['extension'])) {
            $error = 'Недопустимый тип файла';
        } elseif (!empty($allow) && !in_array(strtolower($parts['extension']), $allow)) {
            $error = 'Недопустимый тип файла';
        } elseif (!empty($deny) && in_array(strtolower($parts['extension']), $deny)) {
            $error = 'Недопустимый тип файла';
        } else {
            // Перемещаем файл в директорию.
            if (move_uploaded_file($file['tmp_name'], $path . $name)) {
                // Далее можно сохранить название файла в БД и т.п.
                $success = '<p style="color: green">Файл «' . $name . '» успешно загружен.</p>';
            } else {
                $error = 'Не удалось загрузить файл.';
            }
        }
    }
}

/*Конец загрузки файла*/
 
// Вывод сообщения о результате загрузки.
/*if (!empty($error)) {
    $error = '<p style="color: red">' . $error . '</p>';  
    echo $error;
}
else
{*/
    
    $mail  = new PHPMailer(); // По умолчанию использует php "mail ()"
    $body ="";

    if($_POST['name'])
    {
        $body .= "Имя: <b>".$_POST['name']." </b> <br><br>";   
    }

    if($_POST['phone'])
    {
        $body .= "Телефон: <b>".$_POST['phone']."  </b><br><br>";   
    }  

    if($_POST['text'])
    {
        $body .= "Вопрос: <b>".$_POST['text']." </b><br><br>";   
    }  

    $mail->setLanguage('ru', 'language/');
    $mail->CharSet = "utf-8";

    $mail->AddReplyTo("admin@specifika-spb.ru","Специфика");
    $mail->SetFrom('admin@specifika-spb.ru', 'Специфика');

    $address = "cccp-zomb@yandex.ru";
    $mail->AddAddress($address, "Специфика");

   
    $mail->Subject    = $_POST["title"];
    $mail->AltBody    = "Чтобы просмотреть сообщение, используйте HTML-совместимый просмотрщик электронной почты!"; // optional, Закомментировать и протестировать.

    $mail->MsgHTML($body);

    if (sizeof($_FILES)!=0) {
        $mail->AddAttachment("files/".$name); // pdf file path
    }

    if(!$mail->Send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
      echo "Message sent!";
    }
/*}*/


?>