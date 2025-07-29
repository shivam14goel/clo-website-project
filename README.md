🧥 Clo Fashion Website App
A React-based frontend app that fetches and displays clothing content using filtering, keyword search, infinite scroll, and responsive layout — all without using browser storage for state persistence.

🚀 Live Preview
Host this on Vercel / Netlify or run locally to view.

📦 Features Implemented
✅ Content Fetching
Pulls data from:
https://closet-recruiting-api.azurewebsites.net/api/data

Renders each content item with:

Image

Creator name

Title

Pricing option (Free / View Only / Paid with price)

✅ Pricing Filter
Supports 3 filter options:

Paid

Free

View Only

Multiple selections allowed

Default: All unchecked (shows everything)

Reset button clears all selections

✅ Keyword Search
Matches title or creator name

Supports multi-word input (e.g., adam yellow)

Case-insensitive

Combined with filters

✅ Responsive Grid Layout
Adapts based on screen size:

≥1200px: 4 columns

<1200px: 3 columns

<768px: 2 columns

<480px: 1 column

✅ Infinite Scroll
Loads 12 items at a time

Loads more as you scroll near bottom

✅ Search + Filters Persist on Reload

No browser storage (no localStorage, no cookies)

Uses URL query parameters:
?q=yellow+coat&paid=true&free=false&viewOnly=true


🛠️ Tech Stack

Category	        Tech
Framework	        React
Styling	            CSS Modules
Infinite Scroll	    Custom Hook (useEffect)
API Data	        REST
State	            useState / useEffect
URL Handling	    window.history, URLSearchParams


📁 Folder Structure

📦 src
├── components
│   ├── ContentCard.jsx
│   ├── FilterPanel.jsx
│   ├── SearchBar.jsx
├── hooks
│   └── useInfiniteScroll.js
├── App.jsx
├── App.css


🧪 Setup Instructions

# 1. Clone the repo
git clone https://github.com/shivam14goel/clo-website-project.git

# 2. Navigate to project
cd closet-browser

# 3. Install dependencies
npm install

# 4. Run the dev server
npm start


🔮 Potential Enhancements

Here’s what else can be added to improve the app:

💡 Feature Ideas
Pagination Toggle: Let users switch between infinite scroll & manual pagination.

Sorting Options: Sort by title, price, or creator name.

Filter by Price Range: Add sliders for filtering paid items by cost.

Favorites / Save Items: Allow users to mark items they like.

Dark/Light Mode Toggle

Debounced Search: Improve performance on large data sets.

Loading Skeletons: Better user feedback while data is loading.

Accessibility Improvements (ARIA roles, focus states)

Unit/Integration Testing (e.g., React Testing Library + Jest)

🧑‍💻 Author
SHivam Goel.