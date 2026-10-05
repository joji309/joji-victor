# Joji Victor - Python Django Developer Portfolio 🚀

A modern, responsive, visually stunning portfolio website for **Joji Victor** (✝️ | Python Django Developer | Kerala, India). Built using pure **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Bootstrap 5.3**, showcasing Web Engineering, Software Design, IT Consulting, Experience, Education, and Certifications.

---

## ✨ Features & Highlights

- 🎨 **Luxury Dark & Light Theme Switcher**: Modern glassmorphism UI with smooth theme switching and `localStorage` memory.
- ⚡ **Dynamic Particle Canvas Background**: Interactive animated tech node canvas that responds to theme colors.
- ⌨️ **Typewriter Hero Effect**: Animated headline cycling through developer roles and specialties.
- 🛠️ **Filterable Projects Gallery**: Categorized showcase (Full Stack, Frontend, JS Apps) with interactive Bootstrap 5 detail modals.
- 📊 **Animated Skill Progress Bars**: Triggered seamlessly on scroll.
- 💻 **Live Terminal Playground Widget**: Interactive API response simulator showcasing JSON output.
- 📩 **Interactive Contact Form**: Complete with validation and toast notifications.
- 📱 **100% Mobile Responsive**: Mobile-first grid layout built with Bootstrap 5.
- 🚀 **Free GitHub Pages Ready**: Zero build steps required—just push and publish!

---

## 🛠️ Tech Stack

- **Frontend Structure**: HTML5 (Semantic elements & SEO Meta Tags)
- **Styling**: CSS3 (Custom Variables, Flexbox, Grid, Animations, Glassmorphism) & **Bootstrap 5.3.3**
- **Logic & Dynamics**: Vanilla JavaScript (ES6+, HTML Canvas, DOM Manipulation)
- **Icons**: Font Awesome 6.5.1
- **Typography**: Google Fonts (*Outfit*, *Plus Jakarta Sans*, *Fira Code*)

---

## 📂 File Structure

```
joji-victor/
├── index.html        # Main HTML structure with Bootstrap 5 & SEO tags
├── css/
│   └── style.css     # Custom design system, luxury gradients & glass card styling
├── js/
│   └── main.js       # Dynamic features (Canvas, Typewriter, Theme, Modals, Terminal)
└── README.md         # Deployment & documentation guide
```

---

## 🌐 How to Host on GitHub Pages for FREE (Step-by-Step)

Follow these simple steps to deploy your portfolio online for free with your own URL (e.g., `https://<your-username>.github.io` or `https://<your-username>.github.io/portfolio`):

### Step 1: Create a GitHub Repository
1. Log in to your account on [GitHub.com](https://github.com).
2. Click the **`+`** icon in the top right corner and select **New repository**.
3. Name your repository:
   - For a primary user site: Name it `username.github.io` (replace `username` with your actual GitHub username, e.g., `jojivictor.github.io`).
   - Or name it anything like `portfolio` or `joji-victor-portfolio`.
4. Keep it **Public** and click **Create repository**.

### Step 2: Push Your Code to GitHub
Open your terminal inside this project folder (`d:\Projects\joji-victor`) and execute:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit of Joji Victor Portfolio"

# Rename branch to main
git branch -M main

# Link to your remote GitHub repository (replace with your repository link)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on **GitHub.com**.
2. Click on the **Settings** tab.
3. On the left sidebar under *Code and automation*, click **Pages**.
4. Under **Build and deployment**:
   - Source: Select **Deploy from a branch**.
   - Branch: Select **`main`** branch and root folder **`/ (root)`**.
5. Click **Save**.

🎉 **That's it!** Within 1-2 minutes, GitHub will publish your site at:
`https://YOUR_GITHUB_USERNAME.github.io/`

---

---

## 📊 Google Sheets Contact Form Setup (ID: `1KNrUoW0CYIXAfr4trQuAwaVqkkT2M9mCM4b1d1RmUPs`)

To automatically append form submissions directly into your Google Sheet:

1. Open your Google Sheet: [Google Sheet Link](https://docs.google.com/spreadsheets/d/1KNrUoW0CYIXAfr4trQuAwaVqkkT2M9mCM4b1d1RmUPs/edit?usp=sharing)
2. In top menu click **Extensions** > **Apps Script**.
3. Replace existing script with this code:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.openById("1KNrUoW0CYIXAfr4trQuAwaVqkkT2M9mCM4b1d1RmUPs").getActiveSheet();
  var params = e.parameter;
  sheet.appendRow([new Date(), params.Name, params.Email, params.Subject, params.Message]);
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```
4. Click **Deploy** > **New deployment**.
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy** and copy the **Web App URL**.
6. Paste your Web App URL into the `action=""` attribute of `<form id="portfolio-contact-form">` in `index.html`.

---

## 📄 License
This portfolio template is open-source and free to use under the MIT License.
Designed with ❤️ for **Joji Victor**.
