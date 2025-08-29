<h1>CINET – Managing Loans App</h1>
<p>A simple full-stack app for branch managers to log in and manage loan applications.</p>

<h2>Tech Stack</h2>
<ul>
  <li>Frontend: React + Vite (http://localhost:5173)</li>
  <li>Backend: Node.js + Express (http://localhost:4000)</li>
  <li>Database: PostgreSQL (via Docker on port 5433)</li>
  <li>Auth: JWT (JSON Web Tokens)</li>
</ul>

<h2>Setup Instructions</h2>
<ol>
  <li><strong>Start PostgreSQL</strong><br>
    In the project root:
    <pre><code>docker compose up -d</code></pre>
    This runs Postgres inside Docker so you don’t need to install it manually.
  </li>

  <li><strong>Backend Setup</strong><br>
    <pre><code>cd backend
npm install
npm run db:migrate    # create sql tables
npm run db:seed       # seed base data
npm run seed:user     # add user manager / manager123
npm run dev           # start API at http://localhost:4000</code></pre>

  <li><strong>Frontend Setup</strong><br>
    <pre><code>cd ../frontend
npm install
npm run dev   # UI at http://localhost:5173</code></pre>
  </li>
</ol>

<h2>How It Works</h2>
<ul>
  <li>Login with <code>manager / manager123</code>.</li>
  <li>Backend checks password (bcrypt) and returns a JWT token.</li>
  <li>Frontend saves the token and sends it with every request.</li>
  <li>Middleware checks the token to protect all <code>/loans</code> APIs.</li>
</ul>

<h2>API Overview</h2>
<ul>
  <li><code>POST /auth/login</code> → returns JWT token</li>
  <li><code>GET /loans</code> → list loans (requires token)</li>
  <li><code>GET /loans/:id</code> → get loan by id</li>
  <li><code>POST /loans</code> → create loan</li>
  <li><code>PUT /loans/:id/status</code> → approve or reject loan</li>
</ul>

<h2>Notes</h2>
<ul>
  <li>If login fails, re-run <code>npm run seed:user</code>.</li>
  <li>Reset DB anytime with <code>docker compose down -v &amp;&amp; docker compose up -d</code>.</li>
</ul>


<section>
  <h2>System Architecture</h2>

<img width="952" height="183" alt="Untitled Diagram drawio drawio (1)" src="https://github.com/user-attachments/assets/6dcde231-177b-41ba-91e8-91730b7438bd" />
</section>
