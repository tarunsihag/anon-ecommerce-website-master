const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files (index.html, CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Serve assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Default route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
  console.log(`Serving index.html from: ${__dirname}`);
  console.log(`Backend API available at: http://localhost:5000`);
});
