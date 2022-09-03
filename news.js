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
    const url = `https://openapi.programming-hero.com/api/news/category/01
    `
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
      <div class="card mb-3 container mt-5 p-4 shadow">
          
             <div class="row g-0 ">
            <div class="col-md-3">
              <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details.length>300 ?news.details.slice(0,300) + '....':'no data available'}</p>
                <p class="card-text mt-5 pt-5 py-5">
                <div class= 'd-flex justify-content-between'>
                <div><span><img src="${news.author.img}" class="img-fluid w-25 rounded-start" style="height:30px;" alt="..."></span>
                <div><small class="text-muted">${news.author.published_date}</small></div></div>
                <div><span><i class="fa-regular fa-eye"></i></span>
                <span>${news.total_view}</span>
                </div>
                <div>
                <span>
                <i class="fa-regular fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </span>
                </div>
                <div><span><i class="fa-solid fa-arrow-right-long"></i></span></div>
                <div><div>
                <button type="button" onclick = 'loadNewsDetail(${news.category_id})' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">  Details </button>
                </div></div>
                </div>
                </p>
              </div>
            </div>
          </div> 
        </div>
      `
      newsContainer.appendChild(newsDiv)
      })
    }

    // load news detail
    const loadNewsDetail = () => {
      const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
      fetch(url)
      .then(res => res.json())
      .then(data =>displayNewsDetails(data.data[0]))}

      const displayNewsDetails = (details) =>{
        const modalTittle = document.getElementById('newsDetailsModalLabel');
        modalTittle.innerText = details.category_id;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
        <p>Id: ${details.details}</p>
        <img class="w-50" src = "${details.thumbnail_url?details.thumbnail_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuLNH63Z50DVYfyM4ukaYZFjv1K9e_qPaJuVc9Kq6ifXE49GMfvZpEvmDRwMh2aZtys94&usqp=CAU'}" alt="news-image">
        `
      }




  loadNewsDetail()
  loadNewsCategory();
  loadCategory();

  