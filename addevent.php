<?php
require "conn.php";
$dt=$_POST['day'];
$mt=$_POST['month'];
$yt=$_POST['year'];
$ev=$_POST['event'];
$q="insert into events(day,month,year,event) values($dt,$mt,$yt,'$ev')";
if(mysqli_query($conn,$q))
{
    echo "1";
}
else
{
    echo "0";
}
?>