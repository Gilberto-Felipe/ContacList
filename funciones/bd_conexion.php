<?php
	// conexión al servidor mysqli y bd contactos
	$conn =  new mysqli('localhost', 'root', '', 'contactos'); // var de conexión msqli es la forma de conectar con mysql(sgbd); Los parámetros (servidor, usuario, contraseña, basedatos)
	if ($conn->connect_error) { // si hay un error de conexión, muéstralo
	      echo $error = $conn->connect_error; // funciones de mysqli
	}

	// f para pedir conexión con ajax
     function peticion_ajax() {
          return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
     }
 ?>
