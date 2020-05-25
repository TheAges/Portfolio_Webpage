var isExting = false;

sessionStorage.setItem("backToWork",true);

window.onload = function () {
  $(".fadeOut").removeClass("fadeOut");
  $(".fadeIn").removeClass("fadeIn");

  $("#legal").css("opacity","0");
  $("#workContenet").css("opacity","0");
  $("#workBack > span > h1 > i").css("opacity","0");

  $("#legal").css('transition', '1s');
  $("#workContenet").css('transition', 'opacity 1s');
  $("#workBack > span > h1 > i").css('transition', '1s');

  $("#legal").css("opacity","1");
  $(".workContenet").css("opacity","1");
  $("#workBack > span > h1 > i").css("opacity","1");
};

function dissolveContent() {
  $("#legal").css("opacity","0");
  $(".workContenet").css("opacity","0");
  $("#workBack > span > h1 > i").css("opacity","0");
};

$("#workBack").click(function() {
    dissolveContent()
    setTimeout(function () {window.location.href = '../index.html#works'}, 1000);
  })

$("#backTop").click(function(event) {
        event.preventDefault();
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        return false;
    });

$("#worksLink").click(function() {
    if (isExting==true) {window.location.href = '../index.html#works'};
    isExting = true;
    $(".menuSelected").removeClass("menuSelected");
    $(this).addClass("menuSelected");

    dissolveContent()

    setTimeout(function () {window.location.href = '../index.html#works'}, 1000);
  })

  $("#aboutLink").click(function() {
      if (isExting==true) {window.location.href = '../index.html#about'};
      isExting = true;
      $(".menuSelected").removeClass("menuSelected");
      $(this).addClass("menuSelected");

      dissolveContent()

      setTimeout(function () {window.location.href = '../index.html#about'}, 1000);
    })

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.1.svg");}
  else if ((window.innerWidth > 350) &&(window.innerWidth < 768)) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.2.svg");}
  else {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.3.svg");}
});
