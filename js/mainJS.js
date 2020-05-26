var
animationBusy = false,
timeouts = [],
playbackSpeed = 1,
interval,
asap = false,
skipIntro = false,
isShowDown = false,
isCoverVideoFinish = false,

tapGrid1 = 0,
tapGrid2 = 0,
tapGrid3 = 0,
tapGrid4 = 0,
tapGrid5 = 0,
tapGrid6 = 0,
tapGrid7 = 0,
tapGrid8 = 0;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

var isFirefox = false;
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){isFirefox = true;}
//On hash change and On load

function changePage(position) {
  console.log("changePage Called")
  asap = true;
  if (position == "#works") {goToWorks();}
  else if (position == "#aboutMe") {goToAbout();}
  else if (position.substring(0, 8) == "#content") {goToSingleWork(position.substr(1));}
  else {console.log(position+" is not a valid position.")}
  asap = false;
};

window.onhashchange = function(){
  if ((animationBusy!=true)||(isFirefox)) changePage(window.location.hash);
  console.log("window hash changed")
};

window.onload = function () {
  if (window.location.hash!="") {
    skipShowDown();
    changePage(window.location.hash);
  }
  if (isMobile && !skipIntro) {
    document.querySelector("#videoCover").remove();
    document.querySelector("#wrapperCover").innerHTML = '<img src="res/Images/bgStill.png" class="slowRotation_fadeIn col-12 col-md-7 col-lg-6"><div id="coverQuote" style="margin-top: 15px;" class="col-12 coverQuoteHover fadeInQuote">"Design, like creativity, is a process that go <br> from chaos to order"</div>'
  }
};

//utilites:
function clearAllTimeOuts() {
  for (var i = 0; i < timeouts.length; i++) {clearTimeout(timeouts[i]);}
  timeouts = [];
}

function removeTransition() {
  $("#containerTitle").css('transition', 'opacity 0s');

  $("#worksGrid").css('transition', 'opacity 0s');
  $("#workWrapper").css('transition', 'opacity 0s');
  $("#about").css('transition', 'opacity 0s');

  $("#workBack").css('transition', 'opacity 0s');
  $("#backTop").css('transition', 'opacity 0s');

  $("#legal").css('transition', 'opacity 0s');
}

function addTransition() {
  $("#containerTitle").css('transition', 'opacity 1s');

  $("#worksGrid").css('transition', 'opacity 1s');
  $("#workWrapper").css('transition', 'opacity 1s');
  $("#about").css('transition', 'opacity 1s');

  $("#workBack").css('transition', 'opacity 1s');
  $("#backTop").css('transition', 'opacity 1s');

  $("#legal").css('transition', 'opacity 1s');
}

//Cover video//

document.onclick = function(){ if (skipIntro==false) {triggerShowOff()}};
document.ontouchend = function(){ if (skipIntro==false) {triggerShowOff()}};
document.onkeyup = function(){ if (skipIntro==false) {triggerShowOff()}};

function triggerShowOff() {
  isShowDown = true;
  preventVideo = true;
  skipIntro = true;

  document.getElementById("coverQuote").classList.remove("coverQuoteHover");

  if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Chrome") {playbackSpeed = 6;}
  else if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Firefox") {playbackSpeed = 6;}
  else if (bowser.getParser(navigator.userAgent).getResult().browser.name=="Safari") {playbackSpeed = 6;}
  else {playbackSpeed = 6;}

  if (isCoverVideoFinish) {showDown();};

  if (!isMobile) {
    document.getElementById("videoCover").playbackRate = playbackSpeed;
    console.log(document.getElementById("videoCover").playbackRate);
  }
  else {showDown();}

}

document.getElementById('videoCover').addEventListener('ended',videoOver,false);

function videoOver(e) {
  if (isShowDown==true && isCoverVideoFinish==false) {showDown();}

  var lastFrame = this.duration;
  //this.currentTime = lastFrame;
  //this.pause();
  isCoverVideoFinish=true;

  console.log("Video Finished")
}

document.getElementsByTagName('video')[0].addEventListener('error', function(event) { isCoverVideoFinish = true; }, true);

function showDown() {
  animationBusy = true;

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

      animationBusy = false;
      window.location.hash="works";
      console.log("Intro finished")
    }, 9000))  //wait before show works

  }

  function skipShowDown() {
    skipIntro = true;

    $("#coverContainer").empty();

    $("#coverContainer").addClass("hide");
    $("#mainPanel").removeClass("hide");
    $("#homeTitle").removeClass("hide");
    $("#legal").css('opacity', '1');
    $("#containerTitle").css('marginTop', '0px');
    $("#containerTitle").removeClass("BlurIn");
    $("#menuTitle").css('opacity', '1');
    $(".collapse_works").removeClass("hide");

    console.log("showdown skipped")
  }


document.querySelector("#worksLink").onclick = function() {goToWorks()};
document.querySelector("#aboutLink").onclick = function() {goToAbout()};


function goToWorks() {
  clearAllTimeOuts();
  $(".menuSelected").removeClass("menuSelected");
  $("#worksLink").addClass("menuSelected");

  if ((window.location.hash !="#works")&&(animationBusy == false)&&(asap != true)) { //go to works with Animation
      animationBusy = true;
      window.location.hash="works"

      $("#about").css('opacity', '0');
      $("#legal").css('opacity', '0');
      $("#containerTitle").css('opacity', '0');

      $("#workWrapper").css("opacity","0");
      $("#backTop").css("opacity","0");
      $("#workBack").css("opacity","0");

      $("#worksGrid").css('opacity', '0');

      timeouts.push(setTimeout(function() {
        $("#about").addClass("hide");
        $("#workWrapper").addClass("hide");
        $("#backTop").addClass("hide");
        $("#workBack").addClass("hide");

        $("#containerTitle").removeClass("hide");
        $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")
        $("#containerTitle").css('opacity', '1');

        $("#worksGrid").removeClass("hide");
        $("#legal").removeClass("hide");

      }, 1000))

      timeouts.push(setTimeout(function() {
        $("#worksGrid").css('opacity', '1');
        $("#legal").css('opacity', '1');
        animationBusy = false;
      }, 2000))
  }
  else if ((animationBusy == true)||(asap == true)) {  //if click and animtion is arlady running (or is called from hash changed, i.e. page refleshed), go to works ASAP
    if (asap == false) {window.location.hash="works"};
    removeTransition()

    $("#about").addClass("hide");

    $("#workWrapper").addClass("hide");
    $("#workBack").addClass("hide");
    $("#backTop").addClass("hide");

    $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")
    $("#containerTitle").css('opacity', '1');
    $("#containerTitle").removeClass("hide");
    $("#worksGrid").removeClass("hide");
    $("#worksGrid").css('opacity', '1');
    $("#legal").css('opacity', '1');

    addTransition()

    animationBusy = false;
  }
}

function goToAbout() {
  clearAllTimeOuts();
  $(".menuSelected").removeClass("menuSelected");
  $("#aboutLink").addClass("menuSelected");

  if ((window.location.hash !="#aboutMe")&&(animationBusy == false)&&(asap != true)) { //go to about with Animation
    animationBusy = true;
    window.location.hash="aboutMe";

    $("#worksGrid").css('opacity', '0');
    $("#legal").css('opacity', '0');
    $("#containerTitle").css('opacity', '0');

    $("#workWrapper").css("opacity","0");
    $("#backTop").css("opacity","0");
    $("#workBack").css("opacity","0");

    $("#about").css('opacity', '0');

    timeouts.push(setTimeout(function() {
      $("#worksGrid").addClass("hide");
      $("#workWrapper").addClass("hide");
      $("#backTop").addClass("hide");
      $("#workBack").addClass("hide");

      $("#containerTitle").html('<h1><span class="line">Lets know eachother </span> <span class="line"> a little better!</span></h1>')
      $("#containerTitle").removeClass("hide");
      $("#containerTitle").css('opacity', '1');

      $("#about").removeClass("hide");
      $("#legal").removeClass("hide");

    }, 1000))

    timeouts.push(setTimeout(function() {
      $("#about").css('opacity', '1');
      $("#legal").css('opacity', '1');

      animationBusy = false;

    }, 2000))
  }
  else if ((animationBusy == true)||(asap == true)) {    //if click and animtion is arlady running (or is called from hash changed, i.e. page refleshed), go to about ASAP
    if (asap == false) {window.location.hash="aboutMe"};
    removeTransition()

    $("#worksGrid").addClass("hide");

    $("#workWrapper").addClass("hide");
    $("#workBack").addClass("hide");
    $("#backTop").addClass("hide");

    $("#containerTitle").html('<h1><span class="line">Lets know eachother </span> <span class="line"> a little better!</span></h1>')
    $("#containerTitle").css('opacity', '1');
    $("#containerTitle").removeClass("hide");
    $("#about").removeClass("hide");
    $("#about").css('opacity', '1');
    $("#legal").css('opacity', '1');

    addTransition()

    animationBusy = false;
  }
}

function goToSingleWork(path) {
  clearAllTimeOuts();
  $(".menuSelected").removeClass("menuSelected");
  $("#aboutLink").removeClass("menuSelected");

  if ((animationBusy == false)&&(asap != true)) {  //go to selected work with Animation
    animationBusy = true;
    window.location.hash=path;

    $("#workWrapper").empty();
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

    animationBusy = false;
  }, 1010))
  }
  else if ((animationBusy == true)||(asap == true)) {  //if click and animtion is arlady running (or is called from hash changed, i.e. page refleshed), go to selected work ASAP
    if (asap == false) {window.location.hash=path};
    removeTransition()

    window.scroll({
      top: 0,
      left: 0,
    });

    $("#workWrapper").empty();
    $("#workWrapper").load( path+" #workContenet" );

    $("#worksGrid").addClass("hide");
    $("#about").addClass("hide");
    $("#containerTitle").addClass("hide");

    $("#workWrapper").removeClass("hide");
    $("#workBack").removeClass("hide");
    $("#backTop").removeClass("hide");

    $("#workBack").css("opacity","1");
    $("#backTop").css("opacity","1");
    $("#workWrapper").css("opacity","1");
    $("#legal").css("opacity","1");

    addTransition()

    animationBusy = false;
  }
}
function backWorks() {
  clearAllTimeOuts();
  $(".menuSelected").removeClass("menuSelected");
  $("#worksLink").addClass("menuSelected");

  if ((window.location.hash !="#works")&&(animationBusy == false)&&(asap != true)) { //return from selected work with Animation
      animationBusy = true;
      window.location.hash="works"

      $("#about").css('opacity', '0');
      $("#legal").css('opacity', '0');
      $("#containerTitle").css('opacity', '0');

      $("#workWrapper").css("opacity","0");
      $("#backTop").css("opacity","0");
      $("#workBack").css("opacity","0");

      $("#worksGrid").css('opacity', '0');

      timeouts.push(setTimeout(function() {

        $("#about").addClass("hide");
        $("#workWrapper").addClass("hide");
        $("#backTop").addClass("hide");
        $("#workBack").addClass("hide");

        $("#containerTitle").removeClass("hide");
        $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")

        $("#worksGrid").removeClass("hide");
        $("#legal").removeClass("hide");

      }, 1000))

      timeouts.push(setTimeout(function() {
        $("#worksGrid").css('opacity', '1');
        $("#containerTitle").css('opacity', '1');
        $("#legal").css('opacity', '1');
        animationBusy = false;
      }, 1200))
  }
  else if ((animationBusy == true)||(asap == true)) {  //if click and animtion is arlady running (or is called from hash changed, i.e. page refleshed) return from selected work ASAP
    if (asap == false) {window.location.hash="works"};
    removeTransition()

    $("#about").addClass("hide");

    $("#workWrapper").addClass("hide");
    $("#workBack").addClass("hide");
    $("#backTop").addClass("hide");

    $("#containerTitle").html("<h1><span class='line'>Hey, nice to meet you! </span> <span class='line'> I'm Andrea,</span><br><span class='line'> and I'm an Interaction Designer </span> <span class='line'> based in Milan.</span></h1>")
    $("#containerTitle").css('opacity', '1');
    $("#containerTitle").removeClass("hide");
    $("#worksGrid").removeClass("hide");
    $("#worksGrid").css('opacity', '1');
    $("#legal").css('opacity', '1');

    addTransition()

    animationBusy = false;
  }
}

$("#workBack").click(function() {backWorks();});

$("#backTop").click(function(event) {
    event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    return false;
});


//Works grid interactions:

$(".gridWrpaper").hover(function(){
  if (animationBusy==false) {
//  console.log("Enter");
  $(this.querySelectorAll("div")).addClass("imageHover");
  $(this.querySelectorAll("label")).css("opacity","1");
  $(this).css("cursor","pointer");
}}, function(){
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
  $("#gridItem-To_Anagrafe").click(function() { goToSingleWork("content/To_Anagrafe.html"); });
  $("#gridItem-AV_Trust").click(function() { goToSingleWork("content/AV_Trust.html"); });
  $("#gridItem-BlaBlaCar_UX").click(function() {  goToSingleWork("content/BlaBlaCar_UX.html"); });
  $("#gridItem-Il_Nemico").click(function() { goToSingleWork("content/Il_Nemico.html"); });
  $("#gridItem-Cretive_Coding").click(function() { goToSingleWork("content/Cretive_Coding.html") });
  $("#gridItem-Trenord_Redesig").click(function() { goToSingleWork("content/Trenord_Redesign.html"); });
  $("#gridItem-StraightUp").click(function() { goToSingleWork("content/StraightUp.html"); });
  $("#gridItem-Ansiocromo").click(function() { goToSingleWork("content/Ansiocromo.html"); });
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

    if (tapGrid1>1) {goToSingleWork("content/To_Anagrafe.html"); tapGrid1=0}
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

    if (tapGrid2>1) {goToSingleWork('content/BlaBlaCar_UX.html'); tapGrid2=0}
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

    if (tapGrid3>1) {goToSingleWork('content/Trenord_Redesign.html'); tapGrid3=0}
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

    if (tapGrid4>1) {goToSingleWork('content/Il_Nemico.html'); tapGrid4=0}
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

    if (tapGrid5>1) {goToSingleWork('content/Cretive_Coding.html'); tapGrid5=0}
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

    if (tapGrid6>1) {goToSingleWork('content/AV_Trust.html'); tapGrid6=0}
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

    if (tapGrid7>1) {goToSingleWork('content/StraightUp.html'); tapGrid7=0}
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

    if (tapGrid8>1) {goToSingleWork('content/Ansiocromo.html'); tapGrid8=0}
  });
}

window.addEventListener("resize", function() {changeElementsOnDimension();});
window.addEventListener("load", function() {setTimeout(function () {changeElementsOnDimension()}, 10)});

function changeElementsOnDimension() {
  if ((window.innerWidth >= 768) && (window.innerWidth <= 992)) {
    document.querySelector("#gridItem-Trenord_Redesig").parentElement.style.paddingLeft=0;
    document.querySelector("#gridItem-Trenord_Redesig").parentElement.style.paddingRight=0;
  }
  else {
    document.querySelector("#gridItem-Trenord_Redesig").parentElement.removeAttribute("style");
  };

  if (window.innerWidth > 768) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.1.svg");}
  else if ((window.innerWidth > 400) && (window.innerWidth < 768)) {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.2.svg");}
  else {$("#StrightUp-2_Img").attr("src", "../res/Images/StraightUp/02.3.svg");};

  if (window.innerWidth > 1928) {
    $(".container-fluid").addClass("container");
    $(".container-fluid").removeClass("container-fluid");
  }
  else {
    $(".container").addClass("container-fluid");
    $(".container").removeClass("container");
  }

}
