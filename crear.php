<?php
     ini_set("display_errors", "1"); // muestro línea de error php
     error_reporting(E_ALL); // muestro línea de error php

     $nombre = htmlspecialchars($_POST['nombre']);
     $numero = htmlspecialchars($_POST['numero']);

     try{
          require_once('funciones/bd_conexion.php'); // pido la conexión una vez
          $sql = "INSERT INTO `contactos` (`id`, `nombre`, `telefono`) "; // escribo la query (mi peteición) = insertar valores
          $sql .= "VALUES (NULL, '{$nombre}', '{$numero}'); "; // como es larga la divido y la concateno con .=
          $resultado = $conn->query($sql); // guardo el resutado de la conexión que pide la query en una var.

          if (peticion_ajax()) {
               echo json_encode(array(
                    'respuesta' => $resultado,
                    'nombre' => $nombre,
                    'telefono' => $numero,
                    'id' => $conn->insert_id)); // la conexión gurda un registro (id)
          } else {
               exit;
          }
     } catch (Exception $e){ // en el caso de error
          $error = $e->getMessage(); // muestra el mensaje de error
     }

     $conn->close();
?>
