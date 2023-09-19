<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Empleados</title>
    <link rel="stylesheet" type="text/css" href="./assets/css/estilos.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body class="p-5">


    <div class="h-auto row">
        <div class="card text-bg-dark w-auto p-3">
            <form action="#" id="formulario">

            <div class="mb-3">
            <label class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre">
            </div>

            <div class="mb-3">
            <label class="form-label">Apellido</label>
            <input type="text" class="form-control" id="apellido" placeholder="Ingrese su apellido">
            </div>

            <div class="mb-3">
            <label class="form-label">Dirección</label>
            <input type="text" class="form-control" id="direccion" placeholder="Ingrese su dirección">
            </div>

            <div class="mb-3">
            <label class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="telefono" placeholder="Ingrese su teléfono">
            </div>

            <div class="mb-3">
            <label class="form-label">Id puesto</label>
            <input type="text" class="form-control" id="id_puesto" placeholder="Ingrese su puesto">
            </div>

                <button type="submit" id="btnAgregar" class="btn btn-info">Agregar</button>
            </form>
        </div>

        <div class="card text-bg-light w-auto p-3">
            <h2 class="text-center p-3">Listado de empleados</h2>
            <div class="div-empleados text-center"></div>
        </div>

    </div>

    <script src="./assets/javascript/app.js"></script>
    
</body>
</html>