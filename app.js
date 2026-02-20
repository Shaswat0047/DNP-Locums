const jobs = [
  { id: 1, title: 'Hospitalist Physician', discipline: 'Physician', location: 'Texas', type: 'Locum Tenens', pay: '$220/hr', schedule: '7 on / 7 off' },
  { id: 2, title: 'ER Registered Nurse', discipline: 'RN', location: 'California', type: 'Travel', pay: '$3,150/week', schedule: '3x12 nights' },
  { id: 3, title: 'Family Nurse Practitioner', discipline: 'NP / PA', location: 'Florida', type: 'Permanent', pay: '$142k/year', schedule: 'Mon-Fri' },
  { id: 4, title: 'Radiology Technologist', discipline: 'Allied Health', location: 'New York', type: 'Travel', pay: '$2,800/week', schedule: '4x10 days' },
  { id: 5, title: 'Critical Care Physician', discipline: 'Physician', location: 'Florida', type: 'Locum Tenens', pay: '$260/hr', schedule: 'Block schedule' },
  { id: 6, title: 'Operating Room RN', discipline: 'RN', location: 'Texas', type: 'Travel', pay: '$3,020/week', schedule: '5x8 days' },
  { id: 7, title: 'Psychiatry NP', discipline: 'NP / PA', location: 'Illinois', type: 'Locum Tenens', pay: '$98/hr', schedule: 'Outpatient weekdays' },
  { id: 8, title: 'Respiratory Therapist', discipline: 'Allied Health', location: 'California', type: 'Permanent', pay: '$95k/year', schedule: 'Rotating shifts' },
];

const jobsListEl = document.getElementById('jobsList');
const jobsEmptyEl = document.getElementById('jobsEmpty');
const disciplineFilterEl = document.getElementById('disciplineFilter');
const locationFilterEl = document.getElementById('locationFilter');
const typeFilterEl = document.getElementById('typeFilter');
const keywordFilterEl = document.getElementById('keywordFilter');

function jobCardMarkup(job) {
  return `
    <article>
      <h3>${job.title}</h3>
      <div class="job-badges">
        <span>${job.discipline}</span>
        <span>${job.location}</span>
        <span>${job.type}</span>
      </div>
      <p class="jobs-meta">Compensation: <strong>${job.pay}</strong></p>
      <p class="jobs-meta">Schedule: ${job.schedule}</p>
      <button class="btn btn-outline" data-job-id="${job.id}">Apply Now</button>
    </article>
  `;
}

function selectedFilters() {
  return {
    discipline: disciplineFilterEl.value,
    location: locationFilterEl.value,
    type: typeFilterEl.value,
    keyword: keywordFilterEl.value.trim().toLowerCase(),
  };
}

function filterJobs() {
  const { discipline, location, type, keyword } = selectedFilters();
  return jobs.filter((job) => {
    const disciplineMatch = discipline === 'all' || job.discipline === discipline;
    const locationMatch = location === 'all' || job.location === location;
    const typeMatch = type === 'all' || job.type === type;
    const keywordMatch = !keyword || `${job.title} ${job.discipline} ${job.location} ${job.type}`.toLowerCase().includes(keyword);
    return disciplineMatch && locationMatch && typeMatch && keywordMatch;
  });
}

function renderJobs() {
  const filtered = filterJobs();
  jobsListEl.innerHTML = filtered.map(jobCardMarkup).join('');
  jobsEmptyEl.hidden = filtered.length !== 0;
}

[disciplineFilterEl, locationFilterEl, typeFilterEl].forEach((selectEl) => {
  selectEl.addEventListener('change', renderJobs);
});
keywordFilterEl.addEventListener('input', renderJobs);

jobsListEl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-job-id]');
  if (!button) return;

  const jobId = Number(button.getAttribute('data-job-id'));
  const job = jobs.find((item) => item.id === jobId);
  if (!job) return;

  alert(`Thanks for your interest in ${job.title}. Submit Quick Apply and our recruiter will contact you in 1 business day.`);
});

const quickApplyFormEl = document.getElementById('quickApplyForm');
const quickApplyMessageEl = document.getElementById('quickApplyMessage');

quickApplyFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(quickApplyFormEl);

  const candidate = {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    discipline: String(formData.get('discipline') || '').trim(),
    submittedAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('quickApplicants') || '[]');
  existing.push(candidate);
  localStorage.setItem('quickApplicants', JSON.stringify(existing));

  quickApplyFormEl.reset();
  quickApplyMessageEl.textContent = 'Thanks! Your profile is in our recruiter queue.';
});

const contactFormEl = document.getElementById('contactForm');
const contactMessageEl = document.getElementById('contactMessage');

contactFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactFormEl);

  const lead = {
    facility: String(formData.get('facility') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    need: String(formData.get('need') || '').trim(),
    submittedAt: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('staffingLeads') || '[]');
  existing.push(lead);
  localStorage.setItem('staffingLeads', JSON.stringify(existing));

  contactFormEl.reset();
  contactMessageEl.textContent = 'Request received. A staffing consultant will reach out shortly.';
});

document.getElementById('year').textContent = String(new Date().getFullYear());
renderJobs();
