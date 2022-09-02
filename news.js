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

  loadCategory();

  