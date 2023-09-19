<?php
    
    $mysqli = new mysqli("localhost","root","","ejercicio");
    
    if($mysqli->connect_errno) {
        die("Falló la conexion");
    } else {
    }