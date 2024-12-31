const logo = document.getElementById('logo-reset');

logo.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Scroll to the top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });

    // Optionally reset any dynamic content here
    console.log('Page reset to the top!');
});