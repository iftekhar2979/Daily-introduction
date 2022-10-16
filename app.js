function news(){
    const url='https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res=>res.json())
    .then(data=>catagories(data.data.news_category))
}
const catagories=(data)=>{
    const navbar=document.getElementById('catagory')
    data.forEach(item=>{
        // console.log(item);
        navbar.innerHTML=`
        <nav class="navbar container navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ">
                  <li class="nav-item mx-2">
                    <a class="nav-link active" aria-current="page" onclick="breakingNews('01')" href="#">Home</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('02')">Regular News</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('03')">Internation News</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('04')">Sports</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('05')">Entertainment</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('06')">Culture </a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('07')">Arts</a>
                  </li>
                  <li class="nav-item  mx-2">
                    <a class="nav-link" href="#"  onclick="breakingNews('08')">ALL News</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        `
    })
}


const breakingNews=(id)=>{
    const url=`https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res=>res.json())
   .then(data=>breakingNewsData(data.data))
    
}

const breakingNewsData=(data)=>{
    const getSeciton=document.getElementById('section')
    getSeciton.innerHTML=''
    const otherElement=document.createElement('othersection')
    otherElement.innerHTML=
    `
    <div class="alert alert-light" role="alert">
        Total ${data.length} Items found
    </div>
      <div class="sorted-item">
        <h5 class="d-inline-block">Sort by : </h5>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Default
            </a>
          
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
      </div>
    
    `
    getSeciton.appendChild(otherElement)
    data.map(item=>{
      
        const newElement=document.createElement('div')
    newElement.classList.add('d-flex','my-3','rounded')
    console.log(item);
    newElement.innerHTML=`
    
    <div class="col-md-3">
    <img src=${item.thumbnail_url} class='img-fluid rounded' srcset="">
</div>
<div class="col-md-9 mx-2">
    <h4>${item.title}</h4>
    <p>${item.details}</p>
    <div class="d-flex align-items-center">
        <div class="d-flex w-25 h-25">
            <div class="col-md-3">
                <img src=${item.author.img} class="img-fluid" alt="">

            </div>
            <div class="col-md-9 mx-1">
                <h6>${item.author.name}</h6>
                <h6 class="text-secondary">${item.author.published_date}</h6>
            </div>
        </div>
        <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-solid fa-eye"></i><span>${item.total_view}</span>   
        </div>
        <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>
        <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-solid fa-arrow-right"></i>
        </div>

    </div>
</div>
    `
    getSeciton.appendChild(newElement)
    getSeciton.appendChild(otherElement)
})
}