const loadCategory =  () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))}
    

  const displayCategory = (categories)=>{
   const categoriesContainer = document.getElementById('categories-container');
   categoriesContainer.textContent = '';
  categories.forEach(category => {
    // console.log(category)
    const categoriesLi= document.createElement('li');
    categoriesLi.classList.add('nav-item')
    categoriesLi.innerHTML = `
            <a class="nav-link text-secondary fs-5" aria-current="page" href="#">${category.category_name}</a>
    `
    categoriesContainer.appendChild(categoriesLi)
   });
  }

  const loadNewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayNewsCategory(data.data))}

    const displayNewsCategory = (newsCategory) =>{
    const newsContainer = document.getElementById('newsCategory-container');
    newsContainer.textContent = '';
      newsCategory.forEach(news =>{
      // console.log(news);
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('row');
      // newsDiv.classList.add('');
      newsDiv.innerHTML = `
      <div class="card mb-3 container mt-5 p-4 shadow ">
          
             <div class="row g-0 ">
            <div class="col-md-3">
              <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details.slice(0,250)}</p>
                <p class="card-text"><small class="text-muted">${news.author.published_date}</small>
                <span><img src="${news.author.img}" class="img-fluid rounded-start" alt="..."></span>
                </p>
              </div>
            </div>
          </div> 
        </div>
      `
      newsContainer.appendChild(newsDiv)
      })
    }


  loadNewsCategory();
  loadCategory();

  