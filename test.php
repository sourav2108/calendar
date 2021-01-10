<?php
require "conn.php";
q2="select id from events where day= and month=$mt and year=$yt and event=$ev";
$r=mysqli_query($conn,$q2);
$row=mysqli_fetch_assoc($r);
if($row['id'])
{
    
}else
{
    $q="insert into events(day,month,year,event) values($dt,$mt,$yt,'$ev')";
      $r2=mysqli_query($conn,$q);
}
?>