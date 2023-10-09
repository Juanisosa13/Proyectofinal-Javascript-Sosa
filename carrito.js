let carrito = [];

function agregarCarrito(e){

    //console.log("Producto agregado al carrito", e.target);

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    /*
    console.log(hijo);
    console.log(padre);
    console.log(abuelo);
    */
    let nombreProducto = padre.querySelector("h5").innerText;
    //console.log(nombreProducto);

    let precioProducto =  padre.querySelector("span").innerText;
    //console.log(precioProducto);

    let imgProducto = abuelo.querySelector("img").src;
    //console.log(imgProducto);


    let producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        img:imgProducto,
        cantidad:1
    };

    carrito.push(producto);

    mostrarCarrito();
}

function mostrarCarrito(){

    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    for( let producto of carrito ){
   
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${producto.img}"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td>${producto.cantidad}</td>
                          <td>${producto.precio}</td>
                          <td><button class="btn btn-danger btnBorrarProducto">Borrar</button></td>`;
        tabla.append(fila);
        
    }

    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");
   
    for( let btn of btnBorrar){
        btn.addEventListener("click" , borrarProducto );
    }

}

function borrarProducto(e){
    console.log("BORRAR ESTE ELEMENTO: ", e.target );

    let abuelo = e.target.parentNode.parentNode;
    let productoEliminar = abuelo.querySelector("p").innerText;
    console.log(productoEliminar);    
    abuelo.remove();



    function eliminarProducto( producto ){
        return producto.nombre != productoEliminar
    }


    let resultadoFilter = carrito.filter( eliminarProducto );
    carrito = resultadoFilter;
    console.log(resultadoFilter)

}

// EVENTOS 

let btnCompra = document.querySelectorAll(".botonCompra");

console.log(btnCompra);

for( let boton of btnCompra ){

    boton.addEventListener("click" , agregarCarrito);
}

// Fench

function mostrar_posicion(posicion) {
    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;
    let key = "24412d2a9df697abeb846d7b81fa3f0e";
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Actualiza los elementos HTML con la información del clima
        document.getElementById('ciudad').textContent = `Ciudad: ${data.name}`;
        document.getElementById('temperatura').textContent = `Temp: ${data.main.temp}°C`;
        document.getElementById('descripcion').textContent = `Clima: ${data.weather[0].description}`;
      });
  }
  
  navigator.geolocation.getCurrentPosition(mostrar_posicion);
