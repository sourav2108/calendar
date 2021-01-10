<?php
require "conn.php";
$dt=$_POST['dt'];
$mt=$_POST['mt'];
$yt=$_POST['yt'];
$q="select * from events where day=$dt and month=$mt and year=$yt";
$r=mysqli_query($conn,$q);
if(mysqli_num_rows($r)>0)
{
    while($row=mysqli_fetch_assoc($r))
    {
        echo "<li style='font-size:20px; font-weight:bold;'>".$row['event']."<button class='btn btn-danger m-4 deleteevent' data-id='".$row['id']."'>Delete</button></li>";
    }
}
else
{
    echo "<li>No event added</li>";
}
?>