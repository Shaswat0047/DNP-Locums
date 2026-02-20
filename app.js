const CONTENT_KEY = 'dnpSiteContent';

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
  const stored = JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}');
  return { ...defaults, ...stored };
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
  setText('heroTitle', content.heroTitle);
  setText('heroBtnOne', content.heroBtnOne);
  setText('heroBtnTwo', content.heroBtnTwo);
  setText('challengeTitle', content.challengeTitle);
  setText('techTitle', content.techTitle);
  setText('jobSearchTitle', content.jobSearchTitle);
  setText('appTitle', content.appTitle);
  setText('blogOneTitle', content.blogOneTitle);
  setText('blogTwoTitle', content.blogTwoTitle);
  setText('blogThreeTitle', content.blogThreeTitle);

  [
    'heroImage', 'cardOneImage', 'cardTwoImage', 'cardThreeImage', 'cardFourImage',
    'challengeImage', 'techImage', 'jobSearchImage', 'appImage',
    'blogOneImage', 'blogTwoImage', 'blogThreeImage',
  ].forEach((id) => setImage(id, content[id]));
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


openEditorEl.addEventListener('click', () => editorPanelEl.classList.add('open'));
closeEditorEl.addEventListener('click', () => editorPanelEl.classList.remove('open'));

['heroTitle', 'heroBtnOne', 'heroBtnTwo', 'challengeTitle', 'techTitle', 'jobSearchTitle', 'appTitle', 'blogOneTitle', 'blogTwoTitle', 'blogThreeTitle']
  .forEach((name) => {
    const input = editorFormEl.elements.namedItem(name);
    if (input) input.value = content[name];
  });

editorFormEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const next = { ...content };
  const textFields = ['heroTitle', 'heroBtnOne', 'heroBtnTwo', 'challengeTitle', 'techTitle', 'jobSearchTitle', 'appTitle', 'blogOneTitle', 'blogTwoTitle', 'blogThreeTitle'];

  textFields.forEach((name) => {
    const input = editorFormEl.elements.namedItem(name);
    if (input) next[name] = String(input.value || '').trim() || defaults[name];
  });

  const imageFields = ['heroImage', 'challengeImage', 'techImage', 'jobSearchImage', 'appImage'];
  for (const field of imageFields) {
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
  ['heroTitle', 'heroBtnOne', 'heroBtnTwo', 'challengeTitle', 'techTitle', 'jobSearchTitle', 'appTitle', 'blogOneTitle', 'blogTwoTitle', 'blogThreeTitle']
    .forEach((name) => {
      const input = editorFormEl.elements.namedItem(name);
      if (input) input.value = content[name];
    });
});
