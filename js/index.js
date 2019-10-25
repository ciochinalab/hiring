$(function () {

  if (getQueryString("category") && getQueryString("index")) {
    $("#hiringPage").css("display","none");
    $("#detailPage").css("display","block");
    const job = jobs[getQueryString("category")][getQueryString("index")];
    $(".position-name").append(`
          <p class="cio-career-h1 text-center">${job.position}</p>
          <p class="cio-career-h3 text-center job-info-top-pad">
            <span>${job.location}</span> |
            <span>${job.level}</span> |
            <span>${job.experience}</span>
          </p>
        `);
    $(".job-details").append(`
        <p>${job.description}</p>
        <p class="cio-career-h2 detail-title-pad">Responsibilities:</p>
        ${job.responsibilities.map((responsibility,index) => `
          <p>${index+1}. ${responsibility}</p>
        `).join('')}
        <p class="cio-career-h2 detail-title-pad">Requirements:</p>
        ${job.requirements.map((requirement,index) => `
          <p>${index+1}. ${requirement}</p>
        `).join('')}
        <p class="cio-career-h2 detail-title-pad">How to Apply:</p>
        ${job.applications.map((application,index) => `
          <p>${application}</p>
        `).join('')}
      `);

  } else {
    $("#detailPage").css("display","hidden");
    $("#hiringPage").css("display","block");
    //Job Opportunities Tab
    var tabNeedToShow = 'experienceHire';
    var hireTab = ['experienceHire', 'campusHire', 'internship']

    // initialize the wechat popover
    $("#wechat-link").popover({
      trigger: "hover",
      content: '<div id="qrcode"></div>',
      placement: "bottom",
      html: true
    });

    $('#opp-nav-tab a').click(function (e) {
      tabNeedToShow = ($(this)[0].id).slice(4);
    })


    $('#wechat-link').on('show.bs.popover', function () {
      var currentHref = window.location.origin + window.location.pathname + "?tab=" + tabNeedToShow
      setTimeout(function () {
        $('#qrcode').qrcode({
          text: currentHref,
          width: 75,
          height: 75
        });
      }, 0);
    })

    if (GetParamFromUrl('tab')) {
      var tabId = GetParamFromUrl('tab');
      if (hireTab.indexOf(tabId)) {
        $('#tab-' + tabId).tab('show');
      }
    }


    //add hammer in carousel
    var meetOurTeamElement = document.getElementById('meetOurTeam');
    var hm = new Hammer(meetOurTeamElement);
    hm.on("swipeleft", function () {
      $('#Mycarousel').carousel('next');
    })
    hm.on("swiperight", function () {
      $('#Mycarousel').carousel('prev');
    })

    var becomePartOfElement = document.getElementById('becomePartOf');
    var hm = new Hammer(becomePartOfElement);
    hm.on("swipeleft", function () {
      $('#Mycarousel').carousel('next');
    })
    hm.on("swiperight", function () {
      $('#Mycarousel').carousel('prev');
    })

    $('#industryHire')

    // $.i18n.properties({
    //   name : 'i18n',
    //   path : './i18n/', 
    //   mode : 'map',
    //   langugage : 'zh'
    //   });
    //initialize out teams module
    var pageSize = $(window).width();
    var indicatorNumArray;
    var showCardNumInCom;

    function generateTeamIndicator() {
      if ($(window).width() <= 1240) {
        showCardNumInCom = 2;
      } else if ($(window).width() > 1240) {
        showCardNumInCom = 4;
      }
      if ($(window).width() < 768) {
        indicatorNumArray = teams;
      } else {
        let teamNum = teams.length;
        let indicatorNum = Math.ceil(teamNum / showCardNumInCom);
        indicatorNumArray = new Array(indicatorNum).join(',').split(',');
      }
      let teamCarouselIndicator = ``;
      indicatorNumArray.forEach((item, index) => {
        teamCarouselIndicator = teamCarouselIndicator + `<li data-target="#carouselMeetOurTeam" data-slide-to="${index}" ${index === 0? 'class="active"' : ''}></li>`
      })
      $('#meetOurTeamIndicator').append(teamCarouselIndicator);
    }

    function generateTeamInnerCard() {
      let teamCard = [];
      var cardWidth = 12 / showCardNumInCom;
      teams.forEach((team, index) => {
        let item = `
      <div class="col-sm-12 col-md-${cardWidth} col-lg-${cardWidth}">
      <div class="team-card-pad">
        <div class="task-card" style="overflow:hidden">
          <img src="img/${team.icon}.png" align="top" class="icon-size">
          <p class="ibm-bold teamName-top-pad" style="padding-bottom:5px">${team.teamName}</p>
          <p>${team.teamDetail}
        </p>
        </div>
        </div>
      </div>`
        teamCard.push(item);
      })
      var teamInner = ``;
      if ($(window).width() < 768) {
        indicatorNumArray.forEach((item, index) => {
          teamInner = teamInner + `<div  ${index === 0? 'class="carousel-item active cio-career-padding-bottom-normal"' : 'class="carousel-item cio-career-padding-bottom-normal"'}>` + teamCard[index] + `</div>`
        })
      } else {
        var currentCardIndex = 0;
        var index1 = 0;
        indicatorNumArray.forEach((item, index) => {
          currentCardIndex = index1;
          var teamCardInner = ``;
          for (index1; index1 < currentCardIndex + showCardNumInCom && index1 < teams.length; index1++) {
            teamCardInner = teamCardInner + teamCard[index1]
          }
          teamInner = teamInner + `<div  ${index === 0? 'class="carousel-item active cio-career-padding-bottom-normal"' : 'class="carousel-item cio-career-padding-bottom-normal"'}> <div class="row">` + teamCardInner +
            `</div></div>`;
        })
      }
      $('#meetOurTeamInner').append(teamInner)
    }

    function GetParamFromUrl(name) {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\/|\?|\&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS, "g");
      var results = regex.exec(window.location.href);
      if (results === null) {
        return "";
      }
      return results[1];
    }

    var mobileJobOppType = new Map();
    mobileJobOppType.set('Developer', '#996BFA');
    mobileJobOppType.set('Manager', '#C874D9');
    mobileJobOppType.set('BA', '#526CE0');

    function generateJobOpp() {
      hireTab.forEach((item, index) => {
        $('#' + item).empty()
      })
      if ($(window).width() >= 768) {
        for (var j = 0; j < hireTab.length; j++) {
          // initialize job opportunities
          if (jobs[hireTab[j]].length === 0) {
            $('#' + hireTab[j]).append(`
          <p style="padding-left:16px;margin-top: 1rem;">No job available.</p>`)
          } else {
            jobs[hireTab[j]].forEach((job, index) => {
              $('#' + hireTab[j]).append(`
      <div class="job-card row">
        <div class="industryHireImg col-sm-0 col-md-2 col-lg-2">
          <img src="img/Card-icon-${job.type}-Web.png" style="width:auto;height:100%"></img>
        </div>
        <div class="col-sm-11 col-md-10 col-lg-10" style="overflow:hidden;position:relative">
        <div class="job-card-content">
          <p class="cio-career-h2 xs-pad">${job.position}</p>
          <p class="xs-pad subtitle-job-card">
              <span>${job.location}</span> |
              <span>${job.level}</span> |
              <span>${job.experience}</span>
          </p>
          <p class="ellipsis-2 imitate_ellipsis">
          ${job.requirements.map((requirement,index) => `
          <span>${requirement}</span>
        `).join('')}
          </p>
          <p style="position:absolute;bottom:25px;">
              <a class="view-more" href="?category=${hireTab[j]}&index=${index}">View More -></a>
          </p>
          </div>
        </div>
      </div>
      `);
            });
          }
        }
      } else {
        for (var j = 0; j < hireTab.length; j++) {
          // initialize job opportunities
          if (jobs[hireTab[j]].length === 0) {
            $('#' + hireTab[j]).append(`
          <p style="padding-left:16px;margin-top: 1rem;">No job available.</p>`)
          } else {
            jobs[hireTab[j]].forEach((job, index) => {
              $('#' + hireTab[j]).append(`
            <div class="job-card" style="overflow:hidden;border-left: 6px solid ${mobileJobOppType.get(job.type)}">
               <div class="job-card-content">
                <p class="cio-career-h2">${job.position}</p>
                <p class="subtitle-job-card">
                    <span>${job.location}</span> |
                    <span>${job.level}</span> |
                    <span>${job.experience}</span>
                </p>
                <p class="ellipsis-3 imitate_ellipsis">
                    ${job.requirements.map((requirement,index) => `
                    <span>${requirement}</span>
                    `).join('')}
                </p>
                <p style="padding-top:20px">
                    <a class="view-more" href="details.html?category=${hireTab[j]}&index=${index}">View More -></a>
                </p>
               </div>
             </div>
        `);
            });
          }
        }
      }
    }

    generateTeamIndicator();
    generateTeamInnerCard();
    generateJobOpp()

    $(window).resize(function () {
      if ((pageSize < 768 && $(window).width() >= 768) || pageSize >= 768 && $(window).width() < 768) {
        generateJobOpp();
      }
      if ((pageSize < 768 && $(window).width() >= 768) || (pageSize >= 768 && $(window).width() < 768) || (pageSize > 1240 && $(window).width() <= 1240) || (pageSize <= 1240 && $(window).width() > 1240)) {
        $('#meetOurTeamInner').empty();
        $('#meetOurTeamIndicator').empty();
        generateTeamIndicator();
        generateTeamInnerCard();
        pageSize = $(window).width();
      }
    })


  }


});


function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}