document.addEventListener('DOMContentLoaded', function() {
    const textSearchInput = document.getElementById('searchInput');
    const textSearchBtn = document.getElementById('textSearchBtn');
    const textResults = document.getElementById('textResults');
    const imageSearchInput = document.getElementById('imageSearchInput');
    const imageSearchBtn = document.getElementById('imageSearchBtn');
    const imageResults = document.getElementById('imageResults');

    const apiKey = 'AIzaSyA7sgDobLcW7uLdmY4TaTJJsVmxBvvk5Ac'; // Replace with your Google API Key
    const cx = 'e2d3dc53111ac468d'; // Replace with your Custom Search Engine ID

    textSearchBtn.addEventListener('click', function() {
        const query = textSearchInput.value.trim();
        if (query !== '') {
            search(query, 'text');
        } else {
            textResults.innerHTML = '<p>Please enter a search query</p>';
        }
    });

    imageSearchBtn.addEventListener('click', function() {
        const query = imageSearchInput.value.trim();
        if (query !== '') {
            search(query, 'image');
        } else {
            imageResults.innerHTML = '<p>Please enter a search query</p>';
        }
    });

    function search(query, type) {
        let searchUrl;
        if (type === 'image') {
            searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=image`;
        } else {
            searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;
        }

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displayResults(data.items, type);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    function displayResults(items, type) {
        const resultsContainer = type === 'image' ? imageResults : textResults;
        resultsContainer.innerHTML = '';

        if (items && items.length > 0) {
            items.forEach(item => {
                const title = item.title;
                const link = item.link;
                const snippet = item.snippet;

                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result');

                const titleElement = document.createElement('a');
                titleElement.setAttribute('href', link);
                titleElement.setAttribute('target', '_blank');
                titleElement.textContent = title;

                const snippetElement = document.createElement('p');
                snippetElement.textContent = snippet;

                resultDiv.appendChild(titleElement);
                resultDiv.appendChild(snippetElement);

                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = `<p>No ${type === 'image' ? 'image' : 'text'} results found</p>`;
        }
    }
});

function openTab(tabName) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }

    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}
