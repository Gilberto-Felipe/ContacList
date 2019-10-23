<?php

     ini_set("display_errors", "1"); // función para reportar línea error en php
     error_reporting(E_ALL);

     try{ // método php para pedir la conexión y mostrar error
          require_once('funciones/bd_conexion.php'); // pide la conexión una vez
          $sql = 'SELECT * FROM contactos'; // selecciono toda la tabla contactos
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

               <div class="contenido">
                    <div id="crear_contacto" class="crear">
                         <h2>Nuevo contacto</h2>
                         <form action="crear.php" method="post" id="formulario_crear_usuario">
                              <div class="campo">
                                   <label for="nombre">Nombre</label>
                                   <input type="text" id="nombre" name="nombre" placeholder="nombre">
                              </div>

                              <div class="campo">
                                   <label for="numero">Número</label>
                                   <input type="text" id="numero" name="numero" placeholder="numero">
                              </div>

                              <input type="submit" value="Agregar" id="agregar" class="boton">
                         </form>
                    </div><!--.crear_contacto-->
               </div><!--.contenido-->
               <div class="contenido existentes">
                    <div class="buscar">
                         <h2>Buscar</h2>
                         <input type="text" id="buscador" class="buscador"name="buscador" placeholder="Buscar">
                    </div>
                    <h2>Contactos existentes</h2>
                    <p>Número de contactos <span id="total"><?php echo $resultado->num_rows; //método de mysqli p/obtener núm de registros?></span> </p>
                    <table id="registrados">
                         <thead>
                              <tr>
                                   <th>Nombre</th>
                                   <th>Teléfono</th>
                                   <th>Editar</th>
                                   <th>
                                        <button type="button" id="btn_borrar" class="borrar" name="borrar">Borrar</button>
                                        <input type="checkbox" id="borrar_todos" name="" value="">
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              <?php while ($registros = $resultado->fetch_assoc()) {
                                   // fetch_assoc interta los datos en un array asociativo
                                   // fetch_row() inserta los datos en un array indexado
                                   // fetch_array() es la mezcla de assoc y row: muestra los datos repetidos, indexados y asociados
                                   // fetch_all() te muestra todo en un array (bidimensional, etc.)
                                   // echo '<pre>'; var_dump($registros); echo '</pre>'; // comprobar los fetch ?>
                                   <tr id="<?php echo $registros['id']; ?>">
                                        <td>
                                             <p><?php echo $registros['nombre']; ?></p>
                                             <input type="text" class="nombre_contacto" name="contacto_<?php echo $registros['id']; ?> " value="<?php echo $registros['nombre']; ?>">
                                        </td>
                                        <td>
                                             <p><?php echo $registros['telefono']; ?></p>
                                             <input type="text" class="telefono_contacto" name="telefono_<?php echo $registros['id']; ?>" value="<?php  echo $registros['telefono']; ?>">

                                        </td>
                                        <td>
                                             <a href="#" class="editarBtn">Editar</a>
                                             <a href="#" class="guardarBtn">Guardar</a>
                                        </td>
                                        <td class="borrar">
                                             <input type="checkbox" class="borrar_contacto" name="<?php echo $registros['id'];?>">
                                        </td>
                                   </tr>
                              <?php } ?>
                         </tbody>
                    </table>
               </div>
          </div>
          <?php $conn->close();// cerrar la conexión ?>
          <script src="js/app.js"></script>
     </body>
</html>
