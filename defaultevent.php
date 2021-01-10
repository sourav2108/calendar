<?php
require "conn.php";
$dt=$_POST['dt'];
$mt=$_POST['mt'];
$yt=$_POST['yt'];
$ev=$_POST['ev'];
$q2="select id from events where day=$dt and month=$mt and year=$yt and event='$ev'";
$r=mysqli_query($conn,$q2);
$row=mysqli_fetch_assoc($r);
if($row['id'])
{
    echo "0";
}else
{
    $q="insert into events(day,month,year,event) values($dt,$mt,$yt,'$ev')";
      $r2=mysqli_query($conn,$q);
      if($r2)
      {
          echo "1";
      }
      else
      {
          echo "0";
      }
}

?>