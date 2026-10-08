# 🦊 Fox Haven Farm Stand — E-Commerce & POS Web Application

An interactive, responsive Point of Sale (POS) and online ordering platform built for a local farm stand, artisanal bakery, craft brewery, and winery. 

Designed with a modern glassmorphism UI, real-time basket calculation, user account management, delivery radius verification, and automated age-verification workflows for alcohol compliance.

---

## 🌟 Project Purpose & Passion

I believe local businesses, agriculture, farm stands, and craft breweries deserve modern, intuitive digital tools that match the quality of their products. This project was engineered to explore how important Point of Sale (POS) features—like instant item scanning/filtering, customer loyalty programs, split fulfillment (pickup/delivery), and compliance checks—can come together in a seamless, fast frontend user experience.

---

## 🛠️ Key Features & Workflows

* **Dynamic Inventory Filtering & Search:** Category tabs, real-time search filtering, and custom seasonal zero-result fallbacks.
* **Point of Sale (POS) Basket & Receipt Generator:** Real-time subtotal, 7% sales tax calculation, quantity adjustment controls, and print-ready thermal receipt layouts.
* **Customer Accounts & Profile Management:** Persistent user profiles and payment cards managed via browser `localStorage`.
* **Alcohol Age-Verification (21+) & Compliance:** Automated age calculations based on birthdate for logged-in accounts, mandatory physical ID warnings for deliveries, and verification modals for guests.
* **Fulfillment & Delivery Radius Check:** Split pickup/delivery fulfillment with 5-digit zip code distance validation and delivery time window scheduling.
* **Customer Loyalty Program:** Automatic 10 points per $1 spent rewarded on completed checkouts, displayed on customer profiles and sticky headers.

---

## 🚀 Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Styling:** Custom CSS Inline Styles & Glassmorphic UI Components (`GlassButton`)
* **State & Persistence:** React Hooks (`useState`, `useEffect`) + Browser `localStorage`
* **Deployment:** GitHub Pages (`gh-pages`)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/levired6/fox-haven-farm-stand.git](https://github.com/levired6/fox-haven-farm-stand.git)
   cd fox-haven-farm-stand

2. **Install Dependencies:**
   ```bash
   npm install

3. **Start Local Development Server:**
    ```bash
    npm run dev

4. **Build for production:**
   ```bash
   npm run build    

---  

  ## 📝 Demo Login Instructions
When testing the live site, you can either:

Click Log In / Sign Up and click Log In with any email address to load a pre-configured demo account with sample cards and loyalty points.

Fill out the Sign Up form to test custom birthdate validation, address loading, and promotion preferences.

### Ready for Launch

Whenever you're ready, run your deployment commands:

```bash
npm run deploy