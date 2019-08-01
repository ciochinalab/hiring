$(function() {
  const job = jobs[getQueryString("category")][getQueryString("index")];
  $(".position-name").append(`
        <p class="cio-career-h1">${job.position}</p>
        <p class="cio-career-h3">
          <span>${job.location}</span> |
          <span>${job.level}</span> |
          <span>${job.experience}</span>
        </p>
      `);
  $(".job-details").append(`
      <p class="cio-career-h2">${job.description}</p>
      <h5>Role and Responsibility:</h5>
      <ol>
      ${job.responsibilities.map(responsibility => `
        <li>${responsibility}</li>
      `).join('')}
      </ol>
      <h5>Job Requirements:</h5>
      <ul>
      ${job.requirements.map(requirement => `
        <li>${requirement}</li>
      `).join('')}
      </ul>
      <h5>Job Requirements:</h5>
      <p>${job.application}</p>
    `);
});

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
