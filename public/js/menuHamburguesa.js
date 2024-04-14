document.addEventListener('DOMContentLoaded', function() {
    let categoriasBtn = document.getElementById('categoriasBtn');
    let categoriasOptions = document.getElementById('categoriasOptions');

    categoriasBtn.addEventListener('click', function() {
        categoriasOptions.style.display = (categoriasOptions.style.display === 'block') ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!categoriasBtn.contains(event.target)) {
            categoriasOptions.style.display = 'none';
        }
    });
});