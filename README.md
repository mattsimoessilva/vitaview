# VitaView

VitaView is a nutrition-focused React + TypeScript web application that helps users manage dietary profiles, search for food products, and check product suitability based on personal dietary needs and preferences.

## Features

- **Profile Management:** Create, edit, and delete up to 3 dietary profiles with preferences, allergies, and health goals.
- **Product Search:** Search for food products and view detailed nutrition, ingredient, and packaging information.
- **Suitability Checker:** Instantly see if a product matches your dietary restrictions and preferences.
- **Local Storage:** Profiles and active selections are saved in your browser for convenience.
- **API Integration:** Optionally fetch real product data from an external API.

## Installation

1. **Clone the repository:**
	```bash
	git clone https://github.com/mattsimoessilva/vitaview.git
	cd vitaview
	```

2. **Install dependencies:**
	```bash
	npm install
	```

## Usage

1. **Start the development server:**
	```bash
	npm run dev
	```

2. **Open the app:**
- Visit [http://localhost:5173](http://localhost:5173) in your browser.

3. **Main Pages & Features:**
- **Home:** Welcome page and quick navigation.
- **Dietary Profile:** Manage your dietary profiles (add, edit, delete).
- **Product Search:** Search for products and view details.
- **Product Details:** See nutrition, ingredients, and suitability for your active profile.
- **Suitability Message:** Get instant feedback on whether a product fits your needs.

## API Information

- **API Usage:**  
Set `USE_API` to `true` in `src/config.ts` to enable real product data fetching.
- **API Name:** Open Food Facts API
- **License:** Non-commercial use only
- **API Key:** No key required for public access.
- **Endpoints Used:**  
- `/products` (example: fetch product details)

## Figma Design

- [View VitaView Prototype on Figma](https://www.figma.com/file/qHpJlgvrS3TAOtLKAuOUFN/VitaView?type=design&node-id=0%3A1&mode=design&t=WdWZDyiBmQWfKULZ-1)

## License

This project is for educational and demonstration purposes.

---