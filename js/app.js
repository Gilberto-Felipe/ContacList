var agregarContacto = document.getElementById('agregar'); // jalo del html id=agregar -> agregarContacto.addEventListener
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total');
var checkTodos = document.getElementById('borrar_todos');


// imprimir que el registro fue exitoso
function registroExitoso(nombre) {
     // crear div y agregar id
     var divMensaje = document.createElement('DIV')
     divMensaje.setAttribute('id', "mensaje")

     // agregar texto
     var texto = document.createTextNode(`Creado ${nombre}`)
     divMensaje.appendChild(texto)

     // ubico dentro de divCrear donde agregar el texto
     divCrear.insertBefore(divMensaje, divCrear.childNodes[4])

     // agregar clase mostrar al div
     divMensaje.classList.add('mostrar')

     // ocultar mensaje de creación
     setTimeout(function() {
          divMensaje.classList.add('ocultar')
          setTimeout(function() {
               var divPadreMensaje = divMensaje.parentNode
               divPadreMensaje.removeChild(divMensaje)
          }, 500)
     }, 3000)
}

// cronstruir un template/plantilla para insertar datos dinámicamente
function construirTemplate(nombre, telefono, registro_id) {
     //crear nombre de contacto
     var tdNombre = document.createElement('TD');
     var textoNombre = document.createTextNode(nombre);
     var parrafoNombre = document.createElement('P');
     parrafoNombre.appendChild(textoNombre)
     tdNombre.appendChild(parrafoNombre);

     // agregar input con el nombre
     var inputNombre = document.createElement('INPUT');
     inputNombre.type = 'text';
     inputNombre.name = 'contacto_' + registro_id;
     inputNombre.value = nombre;
     inputNombre.classList.add('nombre_contacto')

     // crear teléfono de contacto
     var tdTelefono = document.createElement('TD');
     var textoTelefono = document.createTextNode(telefono);
     var parrafoTelefono = document.createElement('P');
     parrafoTelefono.appendChild(textoTelefono)
     tdTelefono.appendChild(parrafoTelefono);

     // agregar input con el telefono
     var inputTelefono = document.createElement('INPUT');
     inputTelefono.type = 'text';
     inputTelefono.name = 'telefono_' + registro_id;
     inputTelefono.value = telefono;
     inputTelefono.classList.add('telefono_contacto')

     // crear enlace para editar
     var nodoBtn = document.createElement('A');
     var textoEnlace = document.createTextNode('Editar');
     nodoBtn.appendChild(textoEnlace);
     nodoBtn.href = '#';
     nodoBtn.classList.add('editarBtn');

     // crear botón para Guardar
     var btnGuardar = document.createElement('A');
     var textoGuardar = document.createTextNode('Guardar');
     btnGuardar.appendChild(textoGuardar);
     btnGuardar.href = '#';
     btnGuardar.classList.add('guardarBtn');

     // agrear nombre y teléfono para editar
     tdNombre.appendChild(inputNombre);
     tdTelefono.appendChild(inputTelefono);

     // agregar el botón Editar y al td
     var nodoTdEditar = document.createElement('TD');
     nodoTdEditar.appendChild(nodoBtn);
     nodoTdEditar.appendChild(btnGuardar);

     // crear checkbox para borrar
     var checkBorrar = document.createElement('INPUT');
     checkBorrar.type = 'checkbox';
     checkBorrar.name = registro_id; // doy un id único a cada checkbox
     checkBorrar.classList.add('borrar_contacto');

     // agregar checkbox a td
     var tdCheckbox = document.createElement('TD');
     tdCheckbox.classList.add('borrar');
     tdCheckbox.appendChild(checkBorrar);

     // crear tr y agregarle los atributos
     var trContacto = document.createElement('TR');
     trContacto.setAttribute('id', registro_id);
     trContacto.appendChild(tdNombre);
     trContacto.appendChild(tdTelefono);
     trContacto.appendChild(nodoTdEditar);
     trContacto.appendChild(tdCheckbox);

     tablaRegistrados.childNodes[3].append(trContacto);

     actualizarNumero();
     recorrerBotonesEditar();
     recorrerBotonesGuardar(registro_id);
     recorrerCheckBoxes();
}

// crear un usuario nuevo
function crearUsuario() {
    var form_datos = new FormData(formulario);
    for([key, value] of form_datos.entries()) {
      console.log(key + ": " + value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var resultado = xhr.responseText;
            console.log("Resultado: " + resultado); // compruebo
            var json = JSON.parse(resultado);
            //console.log(json.respuesta);
            if (json.respuesta == true) {
                 //alert('¡Contacto creado exitosamente!')
                 registroExitoso(json.nombre)
                 construirTemplate(json.nombre, json.telefono, json.id)
                 //console.log(tableBody[0].getElementsByTagName('tr'));

            }
        }
    }
    xhr.send(form_datos);
}

// f para mostrar mensaje contacto eliminado
function mostrarEliminado() {
     //crear div y agregar id
     var divEliminado = document.createElement('DIV');
     divEliminado.setAttribute('id', 'borrado')

     //agregar texto
     var texto = document.createTextNode('Contacto eliminado');
     divEliminado.appendChild(texto);

     divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);

     //agregar clase de css
     divEliminado.classList.add('mostrar');

     // ocultar mensaje de eliminado
     setTimeout(function() {
          divEliminado.classList.add('ocultar');
          setTimeout(function() {
               var divPadreMensaje = divEliminado.parentNode;
               divPadreMensaje.removeChild(divEliminado);
          }, 500)
     }, 3000)
}


// f para eliminar html del dom
function eliminarHTML(ids_borrados) { // ids_borrados es el arrray contactos() de abajo.
     console.log(ids_borrados);
     for (i = 0; i < ids_borrados.length; i++) {
          var elementoBorrar = document.getElementById(ids_borrados[i]);
          tableBody[0].removeChild(elementoBorrar);
     }
     actualizarNumero();
}

// f para eliminar lista contactos (seleccionados)
function contactosEliminar(contactos) {
     var xhr = new XMLHttpRequest()
     xhr.open('GET', 'borrar.php?id=' + contactos, true)
     console.log('borrar.php?id=' + contactos); // comprobamos
     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.onreadystatechange = function() {
         if(xhr.readyState == 4 && xhr.status == 200) {
              var resultadoBorrar = xhr.responseText;
              var json = JSON.parse(resultadoBorrar);
              if (json.respuesta == false) {
                   alert('¡Selecciona un elemento!');
              } else {
                    console.log(`Resultado: ${resultadoBorrar}`);
                    //console.log(`SQL: ${json.sql}`); // reviso el código sql
                    eliminarHTML(contactos); // los registros que quiero borrar
                    mostrarEliminado();
                    //console.log(tableBody[0].getElementsByTagName('tr'));
                    //var totalActualizado = parseInt(totalRegistros.textContent) - json.borrados;
                    //totalRegistros.innerHTML = totalActualizado;
                    //console.log(`Actualizar registros eliminados ${totalActualizado}`);
              }
         }
     }
     xhr.send()
}

// f para asegurarte que solo borras los registros seleccionados
function checkboxSeleccionado() {
     var contactos = []
     for (var i = 0; i < checkboxes.length; i++) { // recorro todos los checkboxes
          if (checkboxes[i].checked === true) {
               contactos.push(checkboxes[i].name) // guardo contactos.checked en la lista contactos
          }
     }
     //console.log(contactos); compruebo que tome los checkboxes seleccionados
     contactosEliminar(contactos);
}

// ciclo para agregar clase activo (resaltar) los registros seleccionados
function recorrerCheckBoxes() {
     for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].addEventListener('change', function() {
               if (this.checked) {
                    this.parentNode.parentNode.classList.add('activo')
               } else {
                    this.parentNode.parentNode.classList.remove('activo')
               }
          })
     }

}

// evento para agregar contacto
agregarContacto.addEventListener('click', function(e) {
     e.preventDefault()
     crearUsuario()
})

//evento para borrar registros/filas
btn_borrar.addEventListener('click', function() {
     checkboxSeleccionado();
})

// f actuctualizar núm total de resultados (contactos) cuando se usa el buscador
function actualizarNumero() {
     var registros = tableBody[0].getElementsByTagName('tr');
     console.log("Act num: ", registros.length); // pruebo

     // actualizar número del buscador
     var cantidad = 0
     var ocultos = 0
     for (var i = 0; i < registros.length; i++) {
          var elementos = registros[i];
          if (elementos.style.display == 'table-row') {
               cantidad++
               console.log('cantidad: ', cantidad);
               totalRegistros.innerHTML = cantidad;
          } else if (elementos.style.display == 'none') {
               ocultos++
               if (ocultos == registros.length) {
                    ocultos -= registros.length
                    console.log('ocultos: ', ocultos);
                    totalRegistros.innerHTML = ocultos;
               }
          } else {
               totalRegistros.innerHTML = registros.length;
               console.log('ultimo num', registros.length);
               registros.innerHTML = registros.length;
          }
     }
}

// f buscar registros x nombre y ocultar los que no buscamos
function ocultarRegistros(nombre_buscar) {
     //console.log(nombre_buscar); // compruebo
     // variable para todos los registros
     var registros = tableBody[0].getElementsByTagName('tr');

     //expresión regular que busca el nombre "i" = insensitive case
     var expression = new RegExp(nombre_buscar, "i")

     //accedemos a cada uno de los registros
     for (var i = 0; i < registros.length; i++) {
          registros[i].classList.add('ocultar');
          registros[i].style.display = 'none';

          if (registros[i].childNodes[0].textContent.replace(/\s/g, "").search(expression) != -1 || registros[i].childNodes[1].textContent.replace(/\s/g, "").search(expression) != -1 || nombre_buscar == '') {
               registros[i].classList.add('mostrar');
               registros[i].classList.remove('ocultar');
               registros[i].style.display = 'table-row';
          }
     }
     actualizarNumero();
}

//evento para buscar
inputBuscador.addEventListener('input', function() {
     //console.log(this.value); // compruebo
     ocultarRegistros(this.value)
})

// Seleccionar todos para borrar
checkTodos.addEventListener('click', function(){
     //alert('¡Funciona!') prueba
     if (this.checked) {
          var todosRegistros = tableBody[0].getElementsByTagName('tr')
          //console.log(todosRegistros);
          for (var i = 0; i < checkboxes.length; i++) {
               checkboxes[i].checked = true
               todosRegistros[i].classList.add('activo')
          }
     } else {
          var todosRegistros = tableBody[0].getElementsByTagName('tr')
          for (var i = 0; i < checkboxes.length; i++) {
               checkboxes[i].checked = false
               todosRegistros[i].classList.remove('activo')
          }
     }
})

// Editar registros en la misma página
// f recorrer botones editar al cargar la página
function recorrerBotonesEditar() {
     var btn_editar = tableBody[0].querySelectorAll('.editarBtn')

     for (var i = 0; i < btn_editar.length; i++) {
          btn_editar[i].addEventListener('click', function(e) {
               event.preventDefault()
               //alert('¡Hasta aquí vamos bien!') //pruebo
               deshabilitarEdición()
               var registroActivo = this.parentNode.parentNode; // accedo a td (al padre td, y al abuelo tr)
               registroActivo.classList.add('modo-edicion')
               registroActivo.classList.remove('desactivado')
               actualizarRegistro(registroActivo.id)
               // console.log(registroActivo.id); // pruebo
          })
     }
}

// f recorrer btnGuardar
function recorrerBotonesGuardar(id) {
          var btn_guardar = tableBody[0].querySelectorAll('.guardarBtn');

          for (var i = 0; i < btn_guardar.length; i++) {
               btn_guardar[i].addEventListener('click', function() {
                    actualizarRegistro(id)
               })
          }
}

//deshabilitar edición
function deshabilitarEdición() {
     var registrosTr = document.querySelectorAll('#registrados tbody tr')
     //console.log(registrosTr); // compruebo
     for (var i = 0; i < registrosTr.length; i++) {
          registrosTr[i].classList.add('desactivado')
     }
}

//habilitar edición
function habilitarEdición() {
     var registrosTr = document.querySelectorAll('#registrados tbody tr')
     //console.log(registrosTr); // compruebo
     for (var i = 0; i < registrosTr.length; i++) {
          registrosTr[i].classList.remove('desactivado')
     }
}

// actualizar el registro específico al guardar
function actualizarRegistro(idRegistro) {
     //console.log(idRegistro); pruebo
     //seleccionar botón guardar de un registro específico; pasa el (id_registro)
     var btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn')
     //console.log(btnGuardar); //pruebo
     btnGuardar[0].addEventListener('click', function(e) {
          e.preventDefault()
          //alert('¡Diste click en guardar!') //pruebo
          //obtiene el valor del campo nombre
          var inputNombreNuevo = document.getElementById(idRegistro).getElementsByClassName('nombre_contacto')
          //console.log(inputNombreNuevo);
          var nombreNuevo = inputNombreNuevo[0].value
          //console.log(nombreNuevo);

          //obtiene el valor del campo teléfono
          var inputTelefonoNuevo = document.getElementById(idRegistro).getElementsByClassName('telefono_contacto')
          var telefonoNuevo = inputTelefonoNuevo[0].value
          //console.log(telefonoNuevo);

          // crear ojeto contacto con todos los datos
          var contacto = {
               nombre: nombreNuevo,
               telefono: telefonoNuevo,
               id: idRegistro
          }
          //console.log(contacto);
          actualizarAjax(contacto)
     })
}

function actualizarAjax(datosContacto) {
     //console.log(datosContacto);
     //convertir objeto a json
     var jsonContacto = JSON.stringify(datosContacto) // JSON.stringify convierte un valor a una cadena json
     //console.log(jsonContacto);
     // crear conexión al servidor con Ajax
     var xhr = new XMLHttpRequest();
     xhr.open('GET', 'actualizar.php?datos=' + jsonContacto, true);
     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.onreadystatechange = function() {
         if(xhr.readyState == 4 && xhr.status == 200) {
              var resultado = xhr.responseText;
              var resultadoJson = JSON.parse(resultado);
              if (resultadoJson.respuesta == true) {
                   //console.log("¡El registro se actualizó correctamente!");
                   var registroActivo = document.getElementById(datosContacto.id);
                   //console.dir(registroActivo); //ubicar elemento DOM que necesito
                   //inserto dinámicamente el nombre y el teléfono
                   registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = resultadoJson.nombre;
                   console.dir(registroActivo.getElementsByTagName('td'));
                   registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = resultadoJson.telefono;
                   // Borrar modo edición
                   registroActivo.classList.remove('modo-edicion')
                   habilitarEdición()
              } else {
                   console.log("¡Error!");

              }
              //console.log(resultadoJson);
         }
    };
     xhr.send();
}

// evento DOMContentLoaded para que la función recorrerBotornesEditar se ejecute al cargarse la página
document.addEventListener('DOMContentLoaded', function(e) {
     recorrerBotonesEditar();
     recorrerCheckBoxes()
})









//
