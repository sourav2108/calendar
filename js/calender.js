$(document).ready(function () {
    var curdate = new Date();
    // for show year
    function showyear() {
        var year = "";
        for (var i = 1980; i <= 2025; i++) {
            if (i == curdate.getFullYear()) {
                year += "<option value='" + i + "' selected>" + i + "</option>";
            }
            else {
                year += "<option value='" + i + "'>" + i + "</option>";
            }

        }
        $("#year").html(year);
    }
    showyear();

    // for show month
    function showmonth() {
        var mnth = "";
        var monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        for (var m = 0; m < 12; m++) {
            if (m == curdate.getMonth()) {
                mnth += "<option  value='" + m + "' selected>" + monthname[m] + "</option>";
            }
            else {
                mnth += "<option  value='" + m + "'>" + monthname[m] + "</option>";
            }
        }
        $("#month").html(mnth);
    }
    showmonth();

    // add event by default
    function defaultevt(dt,mt,yt,event)
    {
        $.ajax({
            url: "defaultevent.php",
            type:"POST",
            data:{dt:dt,mt:mt,yt:yt,ev:event},
            success: function(data)
            {
            }
        });
    }

    // for show dates
    function dateshow(mn, yr) {
        var mon = parseInt(mn);
        var enddate = new Date(yr, mon + 1, 0).getDate();
        var startweek = new Date(yr, mon + 1, 0);
        startweek.setDate(1);
        var day = startweek.getDay();
        var prevdate = new Date(yr, mon, 0).getDate();
        var curd = new Date();
        var week = "";
        for (var d = day; d > 0; d--) {
            week += "<div class='prevdate'>" + (prevdate - d + 1) + "</div>";
        }
        for (var w = 1; w <= enddate; w++) {
            startweek.setDate(w);
            var a = startweek.getDay();
            if (w == curd.getDate() && curd.getMonth() == mn && curd.getFullYear() == yr) {
                week += "<div class='bg-primary rounded' data-target='#eventmodal' class='wd' data-dt='" + w + "' data-toggle='modal'>" + w + "</div>";
            }
            else if (a == 0) {
                week += "<div class='text-danger wd' data-target='#eventmodal' data-dt='" + w + "' data-toggle='modal'>" + w + "</div>";
            }
            else {
                week += "<div data-target='#eventmodal' class='wd' data-dt='" + w + "' data-toggle='modal'>" + w + "</div>";
            }
            if(w==1 && mon==0)
            {
                defaultevt(w,mon,yr,"New Year");
                setTimeout(()=>{
                    ckev(mon, yr, enddate);
                },100);
            }
            if(w==25 && mon==11)
            {
                defaultevt(w,mon,yr,"X-mas Day");
                setTimeout(()=>{
                    ckev(mon, yr, enddate);
                },100);
            }
            if(w==15 && mon==7)
            {
                defaultevt(w,mon,yr,"Independence Day");
                setTimeout(()=>{
                    ckev(mon, yr, enddate);
                },100);
            }
            if(w==26 && mon==0)
            {
                defaultevt(w,mon,yr,"Republic Day");
                setTimeout(()=>{
                    ckev(mon, yr, enddate);
                },100);
            }
            if(w==14 && mon==1)
            {
                defaultevt(w,mon,yr,"Valentine Day");
                setTimeout(()=>{
                    ckev(mon, yr, enddate);
                },100);
            }
        }
        $(".weekdate").html(week);
        ckev(mon, yr, enddate);
        
    }
    dateshow(curdate.getMonth(), curdate.getFullYear());

    $("#month").change(function () {
        var mon = $("#month").val();
        var yr = $("#year").val();
        dateshow(mon, yr);
    });
    $("#year").change(function () {
        var mon = $("#month").val();
        var yr = $("#year").val();
        dateshow(mon, yr);
    });

    // for next button
    $("#next").click(function () {
        curdate.setMonth(curdate.getMonth() + 1);
        dateshow(curdate.getMonth(), curdate.getFullYear());
        showmonth();
        showyear();
    });
    // for prev button
    $("#prev").click(function () {
        curdate.setMonth(curdate.getMonth() - 1);
        dateshow(curdate.getMonth(), curdate.getFullYear());
        showmonth();
        showyear();
    });

    // for event show and add
    $(document).on("click", ".wd", function () {
        var dt = $(this).data("dt");
        var mt = $("#month").val();
        var yt = $("#year").val();
        $("#eventday").attr("value", dt);
        $("#eventmonth").attr("value", mt);
        $("#eventyear").attr("value", yt);
        $.ajax({
            url: "event.php",
            type: "POST",
            data: { dt: dt, mt: mt, yt: yt },
            success: function (data) {
                $("#eventshow").html(data);
            }
        });

    });
    $("#eventfm").hide();
    $("#addmoreevent").click(function () {
        $("#eventfm").toggle();
    });

    $("#eventfm").submit(function (e) {
        e.preventDefault();
        var evn = $("#eventdata").val();
        var dt = $("#eventday").val();
        var mt = $("#eventmonth").val();
        var yt = $("#eventyear").val();
        if (evn != "") {
            $.ajax({
                url: "addevent.php",
                type: "POST",
                data: $(this).serialize(),
                success: function (data) {
                    if (data == 1) {
                        $("#eventfm").trigger("reset");
                        $("#eventfm").hide();
                        $.ajax({
                            url: "event.php",
                            type: "POST",
                            data: { dt: dt, mt: mt, yt: yt },
                            success: function (data) {
                                $("#eventshow").html(data);
                            }
                        });
                        var edt = new Date(yt, mt + 1, 0).getDate();
                        ckev(mt, yt, edt);
                    }
                    else {
                        alert("Something went wrong");
                    }
                }
            });
        }
        else {
            alert("Plz enter event");
        }
    });

    function ckev(mt, yt, enddt) {
        $.ajax({
            url: "checkevent.php",
            type: "POST",
            dataType: "JSON",
            data: { mt: mt, yt: yt },
            success: function (data) {
                var arr = [], i = 0;
                if (data != 0) 
                {
                    $.each(data, function (key, v) {
                        arr[i] = v.day;
                        i++;
                    })

                    for (var k = 0; k < enddt; k++) 
                    {
                        for (var z = 0; z < arr.length; z++) 
                        {
                            if ($(".wd")[k].innerText == arr[z]) 
                            {
                                $(".wd")[k].innerHTML += "*";
                            }
                        }
                    }
                }
            }
        });
    }

    // for delete event
    $(document).on("click", ".deleteevent", function () {
        var id = $(this).data("id");
        if (confirm("Do You Realy Want to Delete?")) {
            $.ajax({
                url: "deleteevent.php",
                type: "POST",
                data: { id: id },
                success: function (data) {
                    if (data == 1) {
                        alert("successfully Delete");
                        $(".eventcl").trigger("click");
                        location.reload();
                    }
                    else {
                        alert("error");
                    }
                }
            });
        }
    });
});