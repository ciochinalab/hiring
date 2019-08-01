$(function() {
  const job = jobs[getQueryString("category")][getQueryString("index")];
  $(".position-name").append(`
        <p class="cio-career-h1 text-center">${job.position}</p>
        <p class="cio-career-h3 text-center">
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
});

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
