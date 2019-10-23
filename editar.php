<?php

     ini_set("display_errors", "1"); // función para reportar línea error en php
     error_reporting(E_ALL);

     if (isset($_GET['id'])) { // reviso si se recibió $_GET['id']
          $id = $_GET['id'];  // guardo en una var
     }
     try{ // método php para pedir la conexión y mostrar error
          require_once('funciones/bd_conexion.php'); // pide la conexión una vez
          $sql = "SELECT * FROM contactos WHERE `id` = {$id}"; // selecciono datos con la condición de la tabla de contactos. Las comillas tienen que ser "" !!
          $resultado = $conn->query($sql); // guardo el resultado de la query
     } catch (Exception $e){ // en caso de error de conexión, muéstralo
          $error = $e->getMessage();
     }

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
     <head>
          <meta charset="utf-8">
          <title>Agenda PHP</title>
          <link rel="stylesheet" href="css/estilos.css" media="screen">
     </head>
     <body>
          <div class="contenedor">
               <h1>Agenda de contactos</h1>

               <h2><?php echo $id; // compruebo imprimiendo que sí existe id?></h2>
               <?php echo $sql; // compruebo que el valor del id es el correcto en la query?>

               <div class="contenido">
                    <h2>Editar contacto</h2>

                    <form action="actualizar.php" method="get">
                         <?php while ($registro = $resultado->fetch_assoc()) { ?>
                              <div class="campo">
                                   <label for="nombre">Nombre</label>
                                   <input type="text" id="nombre" name="nombre" placeholder="nombre" value="<?php echo $registro['nombre']; ?>">
                              </div>

                              <div class="campo">
                                   <label for="numero">Número</label>
                                   <input type="text" id="numero" name="numero" placeholder="numero" value="<?php echo $registro['telefono']; ?>">
                              </div>
                              <input type="hidden" name="id" value="<?php echo $registro['id']; ?>">
                              <input type="submit" value="Modificar">
                         <?php } ?>
                    </form>
               </div>

          </div>
          <?php $conn->close();// cerrar la conexión ?>
     </body>
</html>
