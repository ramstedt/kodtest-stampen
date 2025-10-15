# Star Wars Wiki

This is a small coding test project built with [Next.js](https://nextjs.org) and [Redux Toolkit](https://redux-toolkit.js.org).  
It uses the [Star Wars API (SWAPI)](https://swapi.dev/api/) to show films and characters.

I chose to use Redux for this code test because I know it is part of your own tech stack and I wanted to show that I can work with it effectively.

The app uses reusable Redux slices and thunks to get data from the API.

## 🧱 Project Structure

```
app/
 ├─ page.tsx                 → Main search view
 ├─ films/                   → Film list and film detail pages
 ├─ characters/              → Character list and character detail pages
 └─ not-found.tsx (TODO)     → Custom 404 page

store/
 ├─ filmsSlice.ts
 ├─ charactersSlice.ts
 └─ index.ts (Redux store setup)

utils/
 └─ slugify.ts (shared helper for slugs)
```

## 🛠️ Tech Stack

- **Next.js 15+**
- **TypeScript**
- **Redux Toolkit**
- **Axios**
- **Styled Components**
- **SWAPI (Star Wars API)**
- **starwars-databank-server (For fetching character images)**

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Remember to create the `.env.local` file.  
This app uses the API: `https://swapi.dev/api/`.

Open [http://localhost:3000](http://localhost:3000) in your browser to see the project.

## 🧩 Features

- Next.js App Router structure (`app/`)
- Redux Toolkit slices for films and characters
- Async data fetching with `createAsyncThunk`
- Shared helper to make slugs for names and titles
- Dynamic pages for film and character details
- Centralized loading and error handling
- Combined search for both films and characters
- Styling with Styled Components 💅

## ⁉️ Problems I ran in to

I really wanted to use a secodn API to fetch images and merge with SWAPI. It got a bit too timeconsuming however, so I abandoned it.

## 🧠 Next Steps

If I continue working on this project, I would focus on:

### 💅 Improved global styling

Global styling using styled components rather than the global css file

### 🌍 More content

Add more types of Star Wars data, for example:

- Planets (`/planets`)
- Vehicles (`/vehicles`)
- Species and starships
- And more...
  Each type can have its own Redux slice and its own pages, just like films and characters.

### 🚫 Custom 404 page

Create a custom `app/not-found.tsx` page with a themed 404 message.  
Possibly with the use of Next.js’s `notFound()` helper and design it with a Star Wars style.

## 🌟 Thank You!

Thank you for taking the time to look at my code test 💛
