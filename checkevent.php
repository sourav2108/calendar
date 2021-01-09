<?php
require "conn.php";
$mt=$_POST['mt'];
$yt=$_POST['yt'];
$q="select day from events where month=$mt and year=$yt";
$r=mysqli_query($conn,$q);
if(mysqli_num_rows($r)>0)
{
    $row=mysqli_fetch_all($r,MYSQLI_ASSOC);
    echo json_encode($row);
}
else
{
    echo "0";
}
?>