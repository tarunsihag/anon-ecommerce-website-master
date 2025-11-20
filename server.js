const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (like index.html, CSS, etc.)
app.use(express.static('public')); // Or '.' if your files are in root

// Default route
app.get('/', (req, res) => {
  res.send('E-commerce app is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
