const CONTENT_KEY = 'dnpSiteContent';

const TEXT_FIELDS = [
  'heroTitle',
  'heroBtnOne',
  'heroBtnTwo',
  'challengeTitle',
  'techTitle',
  'jobSearchTitle',
  'appTitle',
  'blogOneTitle',
  'blogTwoTitle',
  'blogThreeTitle',
];

const IMAGE_FIELDS = [
  'heroImage',
  'cardOneImage',
  'cardTwoImage',
  'cardThreeImage',
  'cardFourImage',
  'challengeImage',
  'techImage',
  'jobSearchImage',
  'appImage',
  'blogOneImage',
  'blogTwoImage',
  'blogThreeImage',
];

const UPLOADABLE_IMAGE_FIELDS = [
  'heroImage',
  'challengeImage',
  'techImage',
  'jobSearchImage',
  'appImage',
];

const defaults = {
  heroTitle: 'Your Partner in the Mission of Care',
  heroBtnOne: 'Search Jobs',
  heroBtnTwo: 'Employer Solutions',
  challengeTitle: 'Solving the Biggest Workforce Challenges',
  techTitle: 'A Technology to Manage and Optimize Your Entire Workforce',
  jobSearchTitle: 'Simplify Your Job Search',
  appTitle: 'Download DNP Passport',
  blogOneTitle: '2025 Review of Physician Recruiting Trends',
  blogTwoTitle: 'Watch Now: Carey Grace Interview',
  blogThreeTitle: '2025 Survey of Registered Nurses',
  heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  cardOneImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  cardTwoImage: 'https://images.unsplash.com/photo-1584516150909-c43483ee7938?auto=format&fit=crop&w=900&q=80',
  cardThreeImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=900&q=80',
  cardFourImage: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=900&q=80',
  challengeImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  techImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  jobSearchImage: 'https://images.unsplash.com/photo-1612531385446-f7b2b9e0b76b?auto=format&fit=crop&w=1200&q=80',
  appImage: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80',
  blogOneImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=80',
  blogTwoImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  blogThreeImage: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=900&q=80',
};

function loadContent() {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    const stored = raw ? JSON.parse(raw) : {};
    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) {
      return { ...defaults };
    }
    return { ...defaults, ...stored };
  } catch {
    return { ...defaults };
  }
}

function saveContent(content) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function applyContent(content) {
  TEXT_FIELDS.forEach((id) => setText(id, content[id]));
  IMAGE_FIELDS.forEach((id) => setImage(id, content[id]));
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const editorPanelEl = document.getElementById('editorPanel');
const openEditorEl = document.getElementById('openEditor');
const closeEditorEl = document.getElementById('closeEditor');
const resetDefaultsEl = document.getElementById('resetDefaults');
const editorFormEl = document.getElementById('editorForm');

let content = loadContent();
applyContent(content);

if (editorPanelEl && openEditorEl && closeEditorEl && resetDefaultsEl && editorFormEl) {
  openEditorEl.addEventListener('click', () => editorPanelEl.classList.add('open'));
  closeEditorEl.addEventListener('click', () => editorPanelEl.classList.remove('open'));

  TEXT_FIELDS.forEach((name) => {
    const input = editorFormEl.elements.namedItem(name);
    if (input) input.value = content[name];
  });

  editorFormEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    const next = { ...content };

    TEXT_FIELDS.forEach((name) => {
      const input = editorFormEl.elements.namedItem(name);
      if (input) next[name] = String(input.value || '').trim() || defaults[name];
    });

    for (const field of UPLOADABLE_IMAGE_FIELDS) {
      const input = editorFormEl.elements.namedItem(field);
      if (input && input.files && input.files[0]) {
        next[field] = await fileToDataURL(input.files[0]);
      }
    }

    content = next;
    saveContent(content);
    applyContent(content);
    editorPanelEl.classList.remove('open');
  });

  resetDefaultsEl.addEventListener('click', () => {
    localStorage.removeItem(CONTENT_KEY);
    content = { ...defaults };
    applyContent(content);
    editorFormEl.reset();
    TEXT_FIELDS.forEach((name) => {
      const input = editorFormEl.elements.namedItem(name);
      if (input) input.value = content[name];
    });
  });
}

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

function initJobsModule() {
  const jobsListEl = document.getElementById('jobsList');
  const jobsEmptyEl = document.getElementById('jobsEmpty');
  const disciplineFilterEl = document.getElementById('disciplineFilter');
  const locationFilterEl = document.getElementById('locationFilter');
  const typeFilterEl = document.getElementById('typeFilter');
  const keywordFilterEl = document.getElementById('keywordFilter');

  if (!jobsListEl || !jobsEmptyEl || !disciplineFilterEl || !locationFilterEl || !typeFilterEl || !keywordFilterEl) {
    return;
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
    jobsListEl.innerHTML = filtered
      .map(
        (job) => `
      <article>
        <h3>${job.title}</h3>
        <p>${job.discipline} • ${job.location} • ${job.type}</p>
        <p><strong>${job.pay}</strong> — ${job.schedule}</p>
      </article>
    `,
      )
      .join('');
    jobsEmptyEl.hidden = filtered.length !== 0;
  }

  [disciplineFilterEl, locationFilterEl, typeFilterEl].forEach((selectEl) => {
    selectEl.addEventListener('change', renderJobs);
  });
  keywordFilterEl.addEventListener('input', renderJobs);
  renderJobs();
}

initJobsModule();

const downloadFormEl = document.querySelector('.download-form');
if (downloadFormEl) {
  downloadFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}


const contactFormEl = document.getElementById('contactForm');
const contactMessageEl = document.getElementById('contactMessage');
if (contactFormEl && contactMessageEl) {
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
    contactMessageEl.textContent = 'Request received. Our team will contact you soon.';
  });
}
