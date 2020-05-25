var animationBusy = false;
var timeouts = [];
var playbackSpeed = 1,
interval,
ebablePageChange = true,
skipIntro = false,
isShowDown = false,
isCoverVideoFinish = false;

var tapGrid1 = 0;
var tapGrid2 = 0;
var tapGrid3 = 0;
var tapGrid4 = 0;
var tapGrid5 = 0;
var tapGrid6 = 0;
var tapGrid7 = 0;
var tapGrid8 = 0;


function changePage(position) {
  if (position == "#works") {goToWorksASAP(); skipIntro = true;}
  else if (position == "#aboutMe") {goToAboutASAP(); skipIntro = true;}
  else if (position.substring(0, 12) == "#works_pages") {goToSingleWorkASAP(position.substr(1)); skipIntro = true;}
  else {console.log(position+" is not a valid position.")}
};


window.onhashchange = function(){if (ebablePageChange == true) {changePage(window.location.hash);}};
window.onload = function () {changePage(window.location.hash);};

function clearAllTimeOuts() {
  for (var i = 0; i < timeouts.length; i++) {clearTimeout(timeouts[i]);}
  timeouts = [];
}

//Cover video//



document.onclick = function(){ if (skipIntro==false) {triggerShowOff();} };

document.ontouchend = function(){ if (skipIntro==false) {triggerShowOff();} };

document.onkeyup = function(){ if (skipIntro==false) {triggerShowOff();} };

function triggerShowOff() {
  isShowDown = true;
  preventVideo = true;
  skipIntro = true;

  document.getElementById("coverQuote").classList.remove("coverQuoteHover");

  if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Chrome") {
    playbackSpeed = 9;
  }

  else if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Firefox") {
    playbackSpeed = 6;
  }

  else if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Safari") {
    playbackSpeed = 6;
  }

  else {
    playbackSpeed = 6;
  }

  if (isCoverVideoFinish) {showDown();};

  document.getElementById("videoCover").playbackRate = playbackSpeed;
  console.log(document.getElementById("videoCover").playbackRate);
}


document.getElementById('videoCover').addEventListener('ended',videoOver,false);

function videoOver(e) {
  if (isShowDown==true && isCoverVideoFinish==false) {showDown();}

  var lastFrame = this.duration;
  this.currentTime = lastFrame;
  this.pause();
  isCoverVideoFinish=true;
}

document.getElementsByTagName('video')[0].addEventListener('error', function(event) { isCoverVideoFinish = true; }, true);

function showDown() {

    timeouts.push(setTimeout(function() {
      $('#coverContainer').css('opacity', '0');
    }, 1000)) //wait before cover fade out

    timeouts.push(setTimeout(function() {
      $("#coverContainer").addClass("hide");
      $("#mainPanel").removeClass("hide");
      $("#homeTitle").removeClass("hide");
    }, 2000)) //wait after cover fade out

    timeouts.push(setTimeout(function() {
      $('#containerTitle').css('marginTop', '0px');
      $("#containerTitle").removeClass("BlurIn");
    }, 5200))  //wait before title movment

    timeouts.push(setTimeout(function() {
      $('#menuTitle').css('opacity', '1');
    }, 8000))  //wait before menu fadeIn

    timeouts.push(setTimeout(function() {
      $('.collapse_works').removeClass("hide");
      $('.collapse_works').collapse()
      $(".collapse_works").addClass("show");
      $('#legal').css('opacity', '1');

      window.location.hash="works";
      console.log("Intro finished")
    }, 9000))  //wait before show works

//    prevPanel = currentPanel;
//    currentPanel = nextPanel;
  }


//Works and About menu logic:

document.querySelector("#aboutLink").onclick = function () {
  if ((window.location.hash !="#aboutMe")&&(animationBusy == false)) {
    animationBusy = true;
    ebablePageChange = false;
    clearAllTimeOuts();

    $("#worksGrid").css('opacity', '0');
    $("#legal").css('opacity', '0');
    $("#containerTitle").css('opacity', '0');

    $("#workWrapper").css("opacity","0");
    $("#backTop").css("opacity","0");
    $("#workBack").css("opacity","0");

    $(".menuSelected").removeClass("menuSelected");
    $("#aboutLink").addClass("menuSelected");

    $("#about").css('opacity', '0');

    timeouts.push(setTimeout(function() {
      $("#worksGrid").addClass("hide");
      $("#workWrapper").addClass("hide");
      $("#backTop").addClass("hide");

      $("#containerTitle").html('<h1><span class="line">Lets know eachother </span> <span class="line"> a little better!</span></h1>')
      $("#containerTitle").css('opacity', '1');
      $("#about").removeClass("hide");

    }, 1200))

    timeouts.push(setTimeout(function() {
      $("#about").css('opacity', '1');
      $("#legal").css('opacity', '1');

      window.location.hash="aboutMe";
      animationBusy = false;
      ebablePageChange = true;

    }, 2600))
  }

  else if (animationBusy == true) { //if click and animtion is arlady running
    goToAboutASAP()
  }
}

document.querySelector("#worksLink").onclick = function () {
  if ((window.location.hash !="#works")&&(animationBusy == false)) {
    animationBusy = true;
    ebablePageChange = false;
    clearAllTimeOuts();

    $("#about").css('opacity', '0');
    $("#legal").css('opacity', '0');
    $("#containerTitle").css('opacity', '0');

    $("#workWrapper").css("opacity","0");
    $("#backTop").css("opacity","0");
    $("#workBack").css("opacity","0");

    $(".menuSelected").removeClass("menuSelected");
    $("#worksLink").addClass("menuSelected");

    $("#worksGrid").css('opacity', '0');

    timeouts.push(setTimeout(function() {
      $("#about").addClass("hide");
      $("#workWrapper").addClass("hide");
      $("#backTop").addClass("hide");


      $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")
      $("#containerTitle").css('opacity', '1');
      $("#worksGrid").removeClass("hide");

    }, 1200))

    timeouts.push(setTimeout(function() {
      $("#worksGrid").css('opacity', '1');

      window.location.hash="works"
      animationBusy = false;
      ebablePageChange = true;
    }, 2600))
  }

    else if (animationBusy == true) {  //if click and animtion is arlady running
      goToWorksASAP()
    }
}

function goToWorksASAP() { //go to Works ASAP
  clearAllTimeOuts();

  animationBusy = false;
  ebablePageChange = false;
  window.location.hash="works";
  ebablePageChange = true;

  $("#coverContainer").addClass("hide");
  $("#mainPanel").removeClass("hide");
  $("#homeTitle").removeClass("hide");
  $("#legal").css('opacity', '1');
  $("#containerTitle").css('marginTop', '0px');
  $("#containerTitle").removeClass("BlurIn");
  $("#menuTitle").css('opacity', '1');
  $(".collapse_works").removeClass("hide");

  $("#containerTitle").removeClass("hide");
  $("#workBack").addClass("hide");
  $("#workWrapper").addClass("hide");
  $("#backTop").addClass("hide");

  $("#containerTitle").css('transition', '0s');
  $("#worksGrid").css('transition', '0s');
  $("#about").css('transition', '0s');
  $("#legal").css('transition', '0s');

  $("#about").css('opacity', '0');
  $("#legal").css('opacity', '1');

  $(".menuSelected").removeClass("menuSelected");
  $("#worksLink").addClass("menuSelected");

  $("#about").addClass("hide");

  $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")
  $("#containerTitle").css('opacity', '1');
  $("#worksGrid").removeClass("hide");
  $("#worksGrid").css('opacity', '1');

  $("#containerTitle").css('transition', 'opacity 1s');
  $("#worksGrid").css('transition', 'opacity 1s');
  $("#about").css('transition', 'opacity 1s');
  $("#legal").css('transition', 'opacity 1s');
}

function goToAboutASAP() { //go to About ASAP
  clearAllTimeOuts();

  animationBusy = false;
  ebablePageChange = false;
  window.location.hash="aboutMe";
  ebablePageChange = true;

  $("#coverContainer").addClass("hide");
  $("#mainPanel").removeClass("hide");
  $("#homeTitle").removeClass("hide");
  $("#legal").css('opacity', '1');
  $("#containerTitle").css('marginTop', '0px');
  $("#containerTitle").removeClass("BlurIn");
  $("#menuTitle").css('opacity', '1');
  $(".collapse_works").removeClass("hide");

  $("#containerTitle").removeClass("hide");
  $("#workBack").addClass("hide");
  $("#workWrapper").addClass("hide");
  $("#backTop").addClass("hide");

  $("#containerTitle").css('transition', '0s');
  $("#worksGrid").css('transition', '0s');
  $("#workWrapper").css("opacity","0");
  $("#about").css('transition', '0s');
  $("#legal").css('transition', '0s');

  $("#worksGrid").css('opacity', '0');
  $("#legal").css('opacity', '1');

  $(".menuSelected").removeClass("menuSelected");
  $("#aboutLink").addClass("menuSelected");

  $("#worksGrid").addClass("hide");

  $("#containerTitle").html('<h1><span class="line">Lets know eachother </span> <span class="line"> a little better!</span></h1>')
  $("#containerTitle").css('opacity', '1');
  $("#about").removeClass("hide");
  $("#about").css('opacity', '1');

  $("#containerTitle").css('transition', 'opacity 1s');
  $("#worksGrid").css('transition', 'opacity 1s');
  $("#about").css('transition', 'opacity 1s');
  $("#legal").css('transition', 'opacity 1s');
}

function goToSingleWork(path) {
    animationBusy = true;
    ebablePageChange = false;
    $("#workWrapper").load( path+" #workContenet" );

    $("#containerTitle").css("opacity","0");
    $("#worksGrid").css("opacity","0");
    $("#workWrapper").css("opacity","0");
    $("#workBack").css("opacity","0");
    $("#legal").css("opacity","0");

  timeouts.push(setTimeout(function() {
    window.scroll({
      top: 0,
      left: 0,
    });

    $("#containerTitle").addClass("hide");
    $("#worksGrid").addClass("hide");

    $("#workWrapper").removeClass("hide");
    $("#workBack").removeClass("hide");
    $("#backTop").removeClass("hide");
  }, 1000))

  timeouts.push(setTimeout(function() {
    $("#workBack").css("opacity","1");
    $("#backTop").css("opacity","1");
    $("#workWrapper").css("opacity","1");
    $("#legal").css("opacity","1");

    window.location.hash=path;
    animationBusy = false;
    ebablePageChange = true;
  }, 1010))
}

function goToSingleWorkASAP(path) {
  $("#workWrapper").load( path+" #workContenet" );

  clearAllTimeOuts();
  animationBusy = false;
  ebablePageChange = false;
  window.location.hash=path;
  ebablePageChange = true;

  window.scroll({
    top: 0,
    left: 0,
  });

  $("#coverContainer").addClass("hide");
  $("#mainPanel").removeClass("hide");
  $("#homeTitle").removeClass("hide");
  $("#legal").css('opacity', '1');
  $("#containerTitle").css('marginTop', '0px');
  $("#containerTitle").removeClass("BlurIn");
  $("#menuTitle").css('opacity', '1');
  $(".collapse_works").removeClass("hide");

  $("#containerTitle").css("opacity","0");
  $("#worksGrid").css("opacity","0");
  $("#workWrapper").css("opacity","0");
  $("#workBack").css("opacity","0");
  $("#backTop").css("opacity","0");
  $("#legal").css("opacity","0");

  $("#containerTitle").addClass("hide");
  $("#worksGrid").addClass("hide");
  $("#about").addClass("hide");

  $("#workWrapper").css("transition","opacity 0s");
  $("#workBack").css("transition","opacity 0s");
  $("#backTop").css("transition","opacity 0s");

  $("#workWrapper").removeClass("hide");
  $("#workBack").removeClass("hide");
  $("#backTop").removeClass("hide");

  $("#workBack").css("opacity","1");
  $("#backTop").css("opacity","1");
  $("#workWrapper").css("opacity","1");
  $("#legal").css("opacity","1");

  $("#workWrapper").css("transition","opacity 1s");
  $("#workBack").css("transition","opacity 1s");
  $("#backTop").css("transition","opacity 1s");
}


function dissolveContent() {
  animationBusy = true;
  ebablePageChange = false;

  $("#legal").css("opacity","0");
  $("#workWrapper").css("opacity","0");
  $("#workBack").css("opacity","0");
  $("#worksGrid").css("opacity","0");
  $("#backTop").css("opacity","0");

timeouts.push(setTimeout(function() {
  $("#workBack").addClass("hide");
  $("#backTop").addClass("hide");

  $("#workWrapper").empty();
  $("#workWrapper").addClass("hide");

  $("#worksGrid").removeClass("hide");
  $("#containerTitle").removeClass("hide");
}, 1000))

timeouts.push(setTimeout(function() {
  $("#containerTitle").css("opacity","1");
  $("#worksGrid").css("opacity","1");
  $("#legal").css("opacity","1");

  window.location.hash="works";
  animationBusy = false;
  ebablePageChange = true;
}, 1010))
};

function dissolveContentASAP() {
  clearAllTimeOuts();

  animationBusy = false;
  ebablePageChange = false;
  window.location.hash="works";

  $("#legal").css("opacity","0");
  $("#workWrapper").css("opacity","0");
  $("#workBack").css("opacity","0");
  $("#worksGrid").css("opacity","0");
  $("#backTop").css("opacity","0");

  $("#workBack").addClass("hide");
  $("#backTop").addClass("hide");
  $("#workWrapper").empty();
  $("#workWrapper").addClass("hide");

  $("#worksGrid").removeClass("hide");
  $("#containerTitle").removeClass("hide");

  $("#containerTitle").css("opacity","1");
  $("#worksGrid").css("opacity","1");
  $("#legal").css("opacity","1");
};


$("#workBack").click(function() {
  if (animationBusy == false) {
    dissolveContent();
    }
  else {dissolveContentASAP();}
});

  $("#backTop").click(function(event) {
          event.preventDefault();
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          return false;
      });

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.1.svg");}
  else if ((window.innerWidth > 350) &&(window.innerWidth < 768)) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.2.svg");}
  else {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.3.svg");}
});

$(".gridWrpaper").hover(function(){
//  console.log("Enter");
  $(this.querySelectorAll("div")).addClass("imageHover");
  $(this.querySelectorAll("label")).css("opacity","1");
  $(this).css("cursor","pointer");
  }, function(){
//  console.log("Exir");
  $(this.querySelectorAll("div")).removeClass("imageHover");
  $(this.querySelectorAll("label")).css("opacity","0");
  $(this).css("cursor","default");
});

function is_touch_device() {
 return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}

if (!is_touch_device()) {

$("#gridItem-To_Anagrafe").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/To_Anagrafe.html");
    }
  else {goToSingleWorkASAP("works_pages/To_Anagrafe.html");}
});

$("#gridItem2").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/AV_Trust.html");
    }
  else {goToSingleWorkASAP("works_pages/AV_Trust.html");}
});

$("#gridItem-BlaBlaCar_UX").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/BlaBlaCar_UX.html");
    }
  else {goToSingleWorkASAP("works_pages/BlaBlaCar_UX.html");}
});

$("#gridItem-Il_Nemico").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/Il_Nemico.html");
    }
  else {goToSingleWorkASAP("works_pages/Il_Nemico.html");}
});

$("#gridItem-Cretive_Coding").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/Cretive_Coding.html");
    }
  else {goToSingleWorkASAP("works_pages/Cretive_Coding.html");}
});

$("#gridItem-Trenord_Redesig").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/Trenord_Redesign.html");
    }
  else {goToSingleWorkASAP("works_pages/Trenord_Redesign.html");}
});

$("#gridItem-StraightUp").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/StraightUp.html");
    }
  else {goToSingleWorkASAP("works_pages/StraightUp.html");}
});

$("#gridItem-Ansiocromo").click(function() {
  if (animationBusy == false) {
    goToSingleWork("works_pages/Ansiocromo.html");
    }
  else {goToSingleWorkASAP("works_pages/Ansiocromo.html");}
});

}

else {
  $("#gridItem-To_Anagrafe").click(function() {
    tapGrid1++;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid1>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/To_Anagrafe.html'}, 1000);
  }
  });

  $("#gridItem-BlaBlaCar_UX").click(function() {
    tapGrid1=0;
    tapGrid2++;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid2>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/BlaBlaCar_UX.html'}, 1000);
  }
  });

  $("#gridItem-Trenord_Redesig").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3++;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid3>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/Trenord_Redesign.html'}, 1000);
  }
  });

  $("#gridItem-Il_Nemico").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4++;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid4>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/Il_Nemico.html'}, 1000);
  }
  });

  $("#gridItem-Cretive_Coding").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5++;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid5>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/Cretive_Coding.html'}, 1000);
  }
  });

  $("#gridItem-AV_Trust").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6++;
    tapGrid7=0;
    tapGrid8=0;

    if (tapGrid6>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/AV_Trust.html'}, 1000);
  }
  });

  $("#gridItem-StraightUp").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7++;
    tapGrid8=0;

    if (tapGrid7>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/StraightUp.html'}, 1000);
  }
  });

  $("#gridItem-Ansiocromo").click(function() {
    tapGrid1=0;
    tapGrid2=0;
    tapGrid3=0;
    tapGrid4=0;
    tapGrid5=0;
    tapGrid6=0;
    tapGrid7=0;
    tapGrid8++;

    if (tapGrid8>1) {
    dissolveGrid()
    setTimeout(function () {window.location.href = 'works_pages/Ansiocromo.html'}, 1000);
  }
  });
}
