# BRCDC: One Folder for GitHub and Render

This `Upload` folder contains the complete deployable website: the diagnostic,
Homework Quizzes #1-3, and the 114-question full-length practice exam. You do
not need files from the parent `diagnostic-50` folder to run the website.

## 1. GitHub

Use a **private** GitHub repository. The answer keys are in the server-side
question-bank files; a public repository would expose them.

Upload **everything inside this `Upload` folder**, preserving the `vendor`
subfolder. The top level of your GitHub repository should show `package.json`
and `server.js`. The complete file list is:

```text
.node-version
package.json
server.js
index.html
full-exam.html
homework-1.html
homework-2.html
homework-3.html
styles.css
homework.css
app.js
homework-app.js
homework-report.js
icons.js
diagrams.js
exam-engine.js
adaptive-bank.js
questions.js
homework-engine.js
homework-bank.js
homework-passages.json
homework-2-engine.js
homework-2-bank.js
homework-2-passages.json
homework-3-engine.js
homework-3-bank.js
homework-3-passages.json
full-length-bank.js
full-length-english.json
full-length-passages.json
vendor/pdf-lib.min.js
vendor/LICENSE.md
START-HERE-GITHUB-RENDER.md
```

On GitHub, use **Add file > Upload files**, drag in the contents of `Upload`,
and commit the upload. If GitHub will not preserve the `vendor` folder, create
files named `vendor/pdf-lib.min.js` and `vendor/LICENSE.md` with **Add file >
Create new file**; typing the slash makes GitHub create that folder. On macOS,
`.node-version` is hidden by default; it says `24.21.0`. If you cannot upload
it, set `NODE_VERSION=24.21.0` in Render instead.

Do **not** upload `data/`, `attempts.sqlite*`, `node_modules/`, `.env`, student
result PDFs, or the supplied source PDFs. Do not upload a ZIP expecting GitHub
or Render to unpack it. Upload the files themselves.

## 2. Render

Create a **Web Service**, connect it to that private GitHub repository, and use:

```text
Language: Node
Root Directory: leave blank if package.json is at the repository top level
Build Command: npm install
Start Command: node server.js
```

If GitHub shows `Upload/package.json` instead, set **Root Directory** to
`Upload`. Do not type `server.jsarn` or `npm start` into the wrong field.

Set these environment variables in Render:

```text
HOST=0.0.0.0
BRCDC_SECURE_COOKIE=1
BRCDC_FULL_EXAM_MINUTES=180
```

`NODE_VERSION=24.21.0` is needed only if `.node-version` was not uploaded.
Leave `PORT` unset; Render provides it. Leave `BRCDC_DATA_DIR` unset unless a
persistent disk really exists and is mounted at the path you choose. Never set
`BRCDC_DATA_DIR=/var/data` without that disk.

After changing files on GitHub, use **Manual Deploy > Deploy latest commit** if
Render does not deploy automatically. Do not redeploy during a live exam.

## 3. Share the Correct Link

Replace `YOUR-SITE` with your own Render site name:

```text
Full-length exam: https://YOUR-SITE.onrender.com/full-exam/
Homework #1:     https://YOUR-SITE.onrender.com/homework-1/
Homework #2:     https://YOUR-SITE.onrender.com/homework-2/
Homework #3:     https://YOUR-SITE.onrender.com/homework-3/
Diagnostic:      https://YOUR-SITE.onrender.com/index.html
```

Post the public **HTTPS** link in Google Classroom, not `127.0.0.1` or a file
path. Students should use the same browser/device throughout, then download
their results PDF and attach it to the Classroom assignment. This website does
not submit to Classroom automatically.

Without a persistent disk or external database, Render storage is temporary.
Attempts and results can disappear after a restart or redeploy. That may be
acceptable for a supervised pilot with immediate PDF downloads, but use
durable storage before relying on it for a formal 180-minute administration.
The exam cannot technically prevent searching or other forms of cheating;
supervision and school-approved testing controls still matter.
