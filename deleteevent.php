<?php
require "conn.php";
$id=$_POST['id'];
$q="delete from events where id=$id";
if(mysqli_query($conn,$q))
{
    echo "1";
}
else
{
    echo "0";
}
?>