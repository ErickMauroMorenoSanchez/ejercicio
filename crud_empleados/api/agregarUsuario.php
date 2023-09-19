<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");
    
    $empleadoSeleccionado = json_decode($json);

    $sql = "INSERT INTO empleados(Id_emp, Nombre, Apellido, Direccion, Telefono, Id_puesto) 
    VALUES('$empleadoSeleccionado->Id_emp', '$empleadoSeleccionado->Nombre', '$empleadoSeleccionado->Apellido', 
    '$empleadoSeleccionado->Direccion', '$empleadoSeleccionado->Telefono', '$empleadoSeleccionado->Id_puesto')";
    
    $query = $mysqli->query($sql);

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
