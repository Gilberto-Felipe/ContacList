<?php
     ini_set("display_errors", "1"); // muestro línea de error php
     error_reporting(E_ALL); // muestro línea de error php

     $datos = $_GET['datos'];
     $datos = json_decode($datos,true);
     //var_dump($datos);

     if (isset($datos['nombre'])) { // isset función para verificar si existe / llegaron datos $datos del método post
          $nombre = $datos['nombre']; // guárdo valor que llegó en una var
     }
     if (isset($datos['telefono'])) { // compruebo con isset que el valor llegó
          $numero = $datos['telefono']; // guardo valor en var.
     }
     if (isset($datos['id'])) {
          $id = $datos['id'];
     }

     try{ // try y catch son funciones de php
          require_once('funciones/bd_conexion.php'); // pido la conexión una vez
          if (peticion_ajax()) {
               $sql = "UPDATE `contactos` SET "; // selecciono tabla
               $sql .= "`nombre` = '{$nombre}', "; // actualizo en la tabla campo nombre con var php nombreModificado
               $sql .= "`telefono` = '{$numero}' "; // actualizo en la tabla campo telefono con var php telefomoModificado
               $sql .= "WHERE `id` = '{$id}' "; // es la sentencia más importante del UPDATE. Debe haber un respaldo de la bd

               $resultado = $conn->query($sql); // guardo el resutado de la conexión que pide la query en una var.
               echo json_encode(array(
                    'respuesta' => $resultado,
                    'nombre' => $nombre,
                    'telefono' => $numero,
                    'id' => $id
               ));
          } else {
               exit;
          }
     } catch (Exception $e){ // en el caso de error
          $error = $e->getMessage(); // muestra el mensaje de error
     }
     $conn->close(); // siempre cierro la conexión para no gastar recursos de pc.

?>
