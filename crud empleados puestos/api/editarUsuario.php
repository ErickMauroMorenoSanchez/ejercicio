<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require "conexion.php";

    $json = file_get_contents("php://input");

    $empleado = json_decode($json);

    $sql = "UPDATE empleados SET Nombre='$empleado->Nombre', Apellido='$empleado->Apellido', Direccion='$empleado->Direccion', Telefono='$empleado->Telefono', Id_puesto='$empleado->Id_puesto' WHERE Id_emp='$empleado->Id_emp'";
    
    $query = $mysqli->query($sql);

    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
