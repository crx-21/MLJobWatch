# MLJobWatch React app

This folder contains the Vite-based React implementation. From this folder, run:

```sh
npm install
npm run dev
```

The current frontend includes:

- A landing page and project information page.
- Login and registration forms with client-side validation.
- A protected job browser with keyword and advanced filters, pagination, and job details.

Authentication is a frontend demo: it accepts any valid-looking credentials and stores the session in browser storage. It is not connected to an account service. Job listings are loaded from the Artificial Intelligence Jobs API.

Before production use, connect authentication to a backend and add automated coverage for routing, auth persistence, and job filtering.
