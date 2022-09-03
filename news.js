const loadCategory =  () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.data.news_category))
  .catch(console.error('error'));
}
  
const displayCategory = (categories)=>{
 const navbarNews = document.getElementById('navbar-news');
 navbarNews.textContent = '';
categories.forEach(category => {
  // console.log(category)
  const categoriesLi= document.createElement('li');
  categoriesLi.classList.add('nav-item');
  categoriesLi.classList.add('border');
    categoriesLi.classList.add('rounded')
    categoriesLi.classList.add('mx-2');
  categoriesLi.innerHTML = `
          <a onclick="loadNewsCategory('${category.category_id}')" class="nav-link text-secondary fs-5" aria-current="page" href="#">${category.category_name}</a>
  `
  navbarNews.appendChild(categoriesLi)
 });
}
const loadNewsCategory = (id) => {
  loadSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data =>displayNewsCategory(data.data))}

  const displayNewsCategory = (newsItems) =>{
    // show news items:
    const newsItem = document.getElementById('news-items-count');
    // newsItem.innerText = newsItems.length;
    const num = newsItems.length;
    newsItem.innerText = `${num <= 0 ? 'No Data Found': num + ' items found'}`;
    const totalView = newsItems.sort((a,b) => b.total_view - a.total_view);
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.textContent = '';
    newsItems.forEach(news =>{
    // console.log(news);
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('row');
    // newsDiv.classList.add('');
    newsDiv.innerHTML = `
    <div class="card mb-3 container mt-5 p-4 shadow">
           <div class="row g-0 ">
          <div class="col-md-3">
            <img src="${news.thumbnail_url?news.thumbnail_url:'no image found'}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${news.title?news.title:'no data found'}</h5>
            <p class="card-text">${news.details.length>300 ?news.details.slice(0,300) + '....':'no data available'}</p>
              <p class="card-text mt-5 pt-5 py-5">
              <div class= 'd-flex justify-content-between'>
              <div class = 'd-flex'>
              <div><img src="${news.author.img?news.author.img:'no image found'}" class="img-fluid w-100 rounded-circle"  style="height:50px;" alt="..."> </div>
              <div class="ms-3">
              <div><span class =' ms-1'>${news.author.name === null ||news.author.name === ''?`No name found`:news.author.name}</span></div>
              <div><small class="text-muted">${news.author.published_date === null || news.author.published_date === ''?`no date found`:news.author.published_date}</small></div></div>
              </div>
              <div><span><i class="fa-regular fa-eye"></i></span>
              <span>${news.total_view === null ? `Information not found` : news.total_view}</span>
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
              <categoriesLi type="categoriesLi" onclick = "loadNewsDetail('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">  Details </categoriesLi>
              </div></div>
              </div>
              </p>
            </div>
          </div>
        </div> 
      </div>
    `
    categoryContainer.appendChild(newsDiv)
    })
    loadSpinner(false);
  }
  // load news detail
  const loadNewsDetail = (dataId) => {
    const url = `https://openapi.programming-hero.com/api/news/${dataId}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayNewsDetails(data.data))
    .catch(console.error('error'));
  }

    const displayNewsDetails = (details) =>{
      details.forEach(detail =>{
        const modalTittle = document.getElementById('newsDetailsModalLabel');
        modalTittle.innerText = detail.category_id;
        modalTittle.innerText = detail.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
        <p>Id: ${detail.details.length>250 ?detail.details.slice(0,250) + '....':'no data available'}</p>
        <h4 class='fw-bold'>Author Name : ${detail.author.name?detail.author.name:'no data available'}</h4>
        <h6>Publish Date:- ${detail.author.published_date?detail.author.published_date:'no data available'}</h6>
        <img class="w-50 h-50" src = "${detail.author.img?detail.author.img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuLNH63Z50DVYfyM4ukaYZFjv1K9e_qPaJuVc9Kq6ifXE49GMfvZpEvmDRwMh2aZtys94&usqp=CAU'}" alt="news-image">
        <h6 class = 'fw-bolder mt-3'>Total View: <span><i class="fa-regular fa-eye"></i></span> ${detail.total_view?detail.total_view:'no view'}</h6>
        <p class = 'mt-3'> ${detail.details.length>200 ?detail.details.slice(0,200) + '....':'no data available'}</p>
        <img class="w-50" src = "${detail.thumbnail_url?detail.thumbnail_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuLNH63Z50DVYfyM4ukaYZFjv1K9e_qPaJuVc9Kq6ifXE49GMfvZpEvmDRwMh2aZtys94&usqp=CAU'}" alt="news-image">
        `
      
      })
    }

    // spin 
const loadSpinner = isLoading => {
  const loader = document.getElementById('loader')
  if (isLoading) {
      loader.classList.remove('d-none')
  } else {
      loader.classList.add('d-none')
  }
}
loadNewsDetail()
loadNewsCategory();
loadCategory();
