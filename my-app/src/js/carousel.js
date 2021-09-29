$("#myCarousel").carousel({ 
    ride: "carousel"
});
$("#myCarousel").carousel("pause");

$("#myBtn").click(function(){
    $("#myCarousel").carousel(0);
    $("#myCarousel").carousel("pause");
    changeColor("red", "dodgerblue", "dodgerblue");
});

$("#myBtn2").click(function(){
    $("#myCarousel").carousel(1);
    $("#myCarousel").carousel("pause");
    changeColor("dodgerblue", "red", "dodgerblue");
});

$("#myBtn3").click(function(){
    $("#myCarousel").carousel(2);
    $("#myCarousel").carousel("pause");
    changeColor("dodgerblue", "dodgerblue", "red");
});


function changeColor(color1, color2, color3){
    document.getElementById("myBtn").style.backgroundColor= color1;
    document.getElementById("myBtn2").style.backgroundColor= color2;
    document.getElementById("myBtn3").style.backgroundColor= color3;
    document.getElementById("bar-code").style.background= color1;
    document.getElementById("bar-code2").style.background= color2;
    document.getElementById("bar-code3").style.background= color3;
}