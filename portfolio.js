// Get the portfolio grid element
const portfolioGrid = document.getElementById('portfolio-grid');

// Path to the images folder
const imagesPath = 'images/';

// Get a list of all image files in the images folder
fetch(`${imagesPath}`)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    const imageFiles = Array.from(htmlDoc.querySelectorAll('a')).map(link => link.href.replace(window.location.origin + '/', ''));

    // Filter out non-image files
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const images = imageFiles.filter(file => imageExtensions.includes(file.split('.').pop().toLowerCase()));

    // Create the portfolio grid
    images.forEach(image => {
      const portfolioItem = document.createElement('div');
      portfolioItem.classList.add('portfolio-card');

      const img = document.createElement('img');
      img.src = `${imagesPath}${image}`;
      img.alt = image;

      const content = document.createElement('div');
      content.classList.add('portfolio-content');

      const title = document.createElement('h2');
      title.textContent = image.split('.')[0]; // Use the filename as the title

      content.appendChild(title);
      portfolioItem.appendChild(img);
      portfolioItem.appendChild(content);
      portfolioGrid.appendChild(portfolioItem);
    });
  })
  .catch(error => console.error('Error fetching image files:', error));