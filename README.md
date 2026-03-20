# E-Pharmacy 

An online pharmacy web application for browsing medicines, exploring nearby stores, and placing orders. Built as a team pet project with a full-stack architecture.

---

##  Live Demo

> _Coming soon  deploy link will be added here_

---

##  Design & Requirements

- **Figma Mockup:** [https://www.figma.com/design/qrKzOBVqM6zOZNFkTOpEO0/E-PHARMACY--clients-?node-id=0-1&p=f&t=Ae8vNCz05lNPDkWR-0]
- **Technical Specification:** [https://docs.google.com/spreadsheets/d/1TdZTkbTSEcscopFAAH1XiiAbkP8IOawIugpvaG9xnuw/edit?gid=0#gid=0]
- **Backend Repository:**  [https://github.com/AlenaHavaleshko/e-pharmacy]

---

##  Features

-  **Home page**  hero banner, promo sections, nearest medicine stores, customer reviews
-  **Medicine Store**  browse and search pharmacies
-  **Medicine**  paginated catalogue with filter by category and name search (protected route)
-  **Product page**  product details with tabs (description, reviews, etc.)
-  **Cart**  add/remove items, update quantity, checkout form with order placement (protected route)
-  **Auth**  login and registration with JWT, auto-login after register, persistent session
-  **Responsive**  mobile, tablet (768px) and desktop (1440px) layouts

---

##  Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework (App Router, SSR/SSG) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [React 19](https://react.dev/) | UI library |
| [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) | Form handling & validation |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client state (auth, cart) |
| [Axios](https://axios-http.com/) | HTTP client |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| CSS Modules | Scoped component styling |

### Backend

- Node.js REST API (separate repository)
- Proxied via Next.js API Routes (`src/app/api`)
- Images hosted on Cloudinary

---

##  Project Structure

```
src/
 app/                      # Next.js App Router
    (auth-layout)/        # /login, /register
    (main-layout)/
       (public routes)/  # /home, /medicine-store, /product, /store
       (privat routes)/  # /medicine, /cart   require auth
    api/                  # Next.js API Route handlers (proxy to backend)
 components/               # Feature and UI components
 lib/
    api/                  # API client (server/client)
    store/                # Zustand stores (auth, cart)
 types/                    # TypeScript interfaces
```

---

##  Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/<your-username>/e-pharmacy-front.git
cd e-pharmacy-front
npm install
```

### Environment variables

Create a `.env.local` file in the root:

```env
NODE_BACKEND_URL=http://localhost:3000
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

##  Authentication

- JWT-based auth stored via Zustand `persist` middleware (localStorage)
- Protected routes redirect unauthenticated users to `/login`
- Auto-login after successful registration

---

##  Deployment

The project is designed to be deployed on **Vercel**:

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add `NODE_BACKEND_URL` as an environment variable
4. Deploy 
