// script.js
$(document).ready(function() {
    // Función para actualizar las opciones de marca según el producto seleccionado
    function actualizarOpcionesMarca(productoSeleccionado) {
      // Obtener el campo de selección de marca
      var selectMarca = $('#marca');
      
      // Limpiar las opciones actuales del campo de selección de marca
      selectMarca.empty();
      
      // Definir las opciones de marca correspondientes al producto seleccionado
      var marcas;
      switch (productoSeleccionado) {
        case 'notebook':
          marcas = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer'];
          break;
        case 'smartphone':
          marcas = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Google'];
          break;
        case 'camara':
          marcas = ['Canon', 'Nikon', 'Sony', 'Panasonic', 'Fujifilm'];
          break;
        case 'accesorio':
          marcas = ['Logitech', 'Belkin', 'Anker', 'SanDisk', 'JBL'];
          break;
        default:
          marcas = [];
      }
      
      // Agregar las nuevas opciones al campo de selección de marca
      marcas.forEach(function(marca) {
        selectMarca.append($('<option>', {
          value: marca,
          text: marca
        }));
      });
    }
    
    // Evento de cambio en el campo de selección de producto
    $('#producto').change(function() {
      // Obtener el valor seleccionado
      var productoSeleccionado = $(this).val();
      
      // Actualizar las opciones de marca según el producto seleccionado
      actualizarOpcionesMarca(productoSeleccionado);
    });
    
    // Manejar el evento de envío del formulario
    $('#cotizadorForm').submit(function(event) {
      event.preventDefault(); // Evitar que se recargue la página al enviar el formulario
      
      // Obtener valores del formulario
      var producto = $('#producto').val();
      var marca = $('#marca').val();
      var modelo = $('#modelo').val();
      var cantidad = parseInt($('#cantidad').val());
      
      // Realizar la cotización
      var precio;
      switch (producto) {
        case 'notebook':
          precio = 800; // Precio ficticio para el ejemplo
          break;
        case 'smartphone':
          precio = 500; // Precio ficticio para el ejemplo
          break;
        case 'camara':
          precio = 300; // Precio ficticio para el ejemplo
          break;
        case 'accesorio':
          precio = 50; // Precio ficticio para el ejemplo
          break;
        default:
          precio = 0;
      }
      
      // Calcular el precio total
      var precioTotal = precio * cantidad;
      
      // Construir fila de la cotización
      var filaCotizacion = "<tr>" +
                            "<td>" + producto + "</td>" +
                            "<td>" + marca + "</td>" +
                            "<td>" + modelo + "</td>" +
                            "<td>" + cantidad + "</td>" +
                            "<td>$" + precio.toFixed(2) + "</td>" +
                            "<td>$" + precioTotal.toFixed(2) + "</td>" +
                            "</tr>";
      
      // Agregar la fila a la tabla de cotización
      $('#cotizacionBody').append(filaCotizacion);
      
      // Mostrar la cotización
      $('#cotizacionDetalle').slideDown();
    });
  });

  function exportarExcel() {
    // Obtener los datos de la tabla de cotización
    var cotizacionData = $('#cotizacionBody').html();

    // Crear un libro de trabajo nuevo
    var wb = XLSX.utils.book_new();
    
    // Crear una hoja de trabajo
    var ws = XLSX.utils.table_to_sheet(document.getElementById('cotizacionBody'));

    // Agregar la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, "Cotización");

    // Guardar el archivo Excel
    XLSX.writeFile(wb, 'cotizacion.xlsx');
}

  