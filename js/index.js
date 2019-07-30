$(function () {
  // initialize the wechat popover
  $("#wechatImg").popover({
    trigger: "hover",
    content: '<div id="qrcode"></div>',
    placement: "bottom",
    html: true
  });

  $('#wechatImg').on('show.bs.popover', function () {
    setTimeout(function () {
      $('#qrcode').qrcode({
        text: window.location.href,
        width: 75,
        height: 75
      });
    }, 0);
  })


  // $.i18n.properties({
  //   name : 'i18n',
  //   path : './i18n/', 
  //   mode : 'map',
  //   langugage : 'zh'
  //   });
  //initialize out teams module
  var pageSize = $(window).width();
  var showCardNumInCom = 4;
  var indicatorNumArray;

  function generateTeamIndicator() {
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
        <div class="task-card">
          <img src="img/icon.png" align="top">
          <p class="ibm-bold">${team.teamName}</p>
          <p class="ibm-light">${team.teamDetail}
        </p>
        </div>
      </div>`
      teamCard.push(item);
    })
    var teamInner = ``;
    if ($(window).width() < 768) {
      indicatorNumArray.forEach((item, index) => {
        teamInner = teamInner + `<div  ${index === 0? 'class="carousel-item active"' : 'class="carousel-item"'}>` + teamCard[index] + `</div>`
      })
    } else {
      var currentCardIndex = 0;
      var index1 = 0;
      indicatorNumArray.forEach((item, index) => {
        currentCardIndex = index1;
        var teamCardInner = ``;
        for (index1; index1 < currentCardIndex + 4 && index1 < teams.length; index1++) {
          teamCardInner = teamCardInner + teamCard[currentCardIndex]
        }
        teamInner = teamInner + `<div  ${index === 0? 'class="carousel-item active"' : 'class="carousel-item"'}> <div class="row">` + teamCardInner +
          `</div></div>`;
      })
    }
    $('#meetOurTeamInner').append(teamInner)
  }

  $(window).resize(function () {
    if ((pageSize < 768 && $(window).width() >= 768) || pageSize >= 768 && $(window).width() < 768) {
      pageSize = $(window).width();
      $('#meetOurTeamInner').empty();;
      $('#meetOurTeamIndicator').empty();;
      generateTeamIndicator();
      generateTeamInnerCard();
    }
  })

  generateTeamIndicator();
  generateTeamInnerCard();


  // initialize job opportunities
  jobs.industry.forEach((job, index) => {
    $('#industryHire').append(`
    <div class="job-card row">
      <div class="jobCardImgDiv col-sm-2">
        <img src="img/icon.png" class="industryHireImg"></img>
      </div>
      <div class="col-sm-10">
        <h2 class="ibm-h2 ibm-padding-bottom-1">${job.position}</h2>
        <p>
            <span>${job.location}</span> |
            <span>${job.level}</span> |
            <span>${job.experience}</span>
        </p>
        <p>${job.description}</p>
        <p>
            <a class="view-more" href="details.html?category=industry&index=${index}">View More -></a>
        </p>
      </div>
    </div>
    `);
  });

});