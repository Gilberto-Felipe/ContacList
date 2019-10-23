<?php

     ini_set("display_errors", "1"); // muestro línea de error php
     error_reporting(E_ALL); // muestro línea de error php

     if (isset($_GET['id'])) { // comrpuebo que recbí el id de editar.
          $id = htmlspecialchars($_GET['id']); // guardo en var.
     }

     try{ // try y catch son funciones de php
          require_once('funciones/bd_conexion.php'); // pido la conexión una vez
          $sql = "DELETE FROM `contactos` WHERE `id` IN ({$id});"; // las `` hacen referencia a tablas y campos; '' son del lado php
          $resultado = $conn->query($sql); // guardo el resutado de la conexión en una var.

          if (peticion_ajax()) {
               echo json_encode(array(
                    'respuesta' => $resultado,
                    'sql' => $sql
               ));
          } else {
               exit;
          }

     } catch (Exception $e){ // en el caso de error
          $error = $e->getMessage(); // muestra el mensaje de error
     }

     $conn->close(); // siempre cierro la conexión para no gastar recursos de pc.
?>
