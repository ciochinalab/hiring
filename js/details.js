$(function() {
  const job = jobs[getQueryString("category")][getQueryString("index")];
  $(".position-name").append(`
        <h1>${job.position}</h1>
        <h4>
          <span>${job.location}</span> |
          <span>${job.level}</span> |
          <span>${job.experience}</span>
        </h4>
      `);
  $(".job-details").append(`
      <p>${job.description}</p>
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
