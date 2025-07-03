const header = document.getElementById('header');
  const stickyHeader = document.getElementById('sticky-header');
  const categories = document.querySelectorAll('.category');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      header.style.top = '-60vh';
      stickyHeader.classList.add('visible');
    } else {
      header.style.top = '0';
      stickyHeader.classList.remove('visible');
    }
    lastScrollY = window.scrollY;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  categories.forEach((category) => {
    observer.observe(category);
  });

//new code form here ........................................
 
let lawData = [];

// Load COI.json
 fetch('data/COI.json')
  .then(res => res.json())
  .then(data => {
    lawData = data.flat(); // ✅ FIX: flatten the nested array
    console.log("Loaded laws:", lawData);
  })
  .catch(err => {
    console.error("Failed to load data", err);
  });

// Search function
 function searchLaws() {
  const query = document.getElementById('searchBar').value.trim().toLowerCase();
  console.log("User searched:", query);

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.style.display = 'none';
    return;
  }

  resultsContainer.style.display = 'block';

  // 🔍 Multi-word support: split the query into words
  const queryWords = query.split(/\s+/);

  const filtered = lawData.filter(item => {
    const combinedText = [
      item.Name,
      item.ArtDesc,
      ...(item.Clauses || []).map(c => c.ClauseDesc),
      ...(item.Clauses || []).flatMap(c =>
        (c.SubClauses || []).map(sc => sc.SubClauseDesc)
      )
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // ✅ Match only if all query words exist in the text (AND-style search)
    return queryWords.every(word => combinedText.includes(word));
  });

  console.log("Filtered results:", filtered);

  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<p>No matching articles found.</p>`;
    return;
  }

  filtered.forEach(item => {
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    let previewText = "No preview available";
    if (item.ArtDesc) {
      previewText = item.ArtDesc.slice(0, 150) + "...";
    } else if (item.Clauses && item.Clauses.length > 0) {
      previewText = item.Clauses[0].ClauseDesc.slice(0, 150) + "...";
    }

    resultCard.innerHTML = `
      <a href="special.html?id=${item.ArtNo}" style="text-decoration: none; color: black;">
        <h3>${item.ArtNo} - ${item.Name}</h3>
        <p>${previewText}</p>
      </a>
    `;

    resultsContainer.appendChild(resultCard);
  });
}


document.getElementById("searchBar").addEventListener("keyup", searchLaws);
document.getElementById("searchButton").addEventListener("click", searchLaws);

