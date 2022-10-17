



function news() {
  const url = 'https://openapi.programming-hero.com/api/news/categories'
  fetch(url)
    .then(res => res.json())
    .then(data => catagories(data.data.news_category))
}
const catagories = (data) => {
  const navbar = document.getElementById('catagory')
  data.forEach(item => {
    navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Catagories</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <ul class="navbar-nav ">
            <li class="nav-item mx-2">
              <a class="nav-link " aria-current="page" onclick="breakingNews('01')" href="#">Home</a>
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
    </div>
  </nav>
        `
  })
}


const breakingNews = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => breakingNewsData(data.data))

}

const breakingNewsData = (data) => {
  let sorted = data.sort((a, b) => a.title.localeCompare(b.title))
  // console.log(sorted);
  // console.log(sorted);
  document.querySelector('.nav-link').classList.add('active')
  const getSeciton = document.getElementById('section')
  getSeciton.innerHTML = ''
  const otherElement = document.createElement('div')
  otherElement.innerHTML =
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
  toggleSpinner(true)
  data.map(item => {

    const newElement = document.createElement('div')
    newElement.classList.add('d-flex', 'my-3', 'rounded')
    console.log(item);
    newElement.innerHTML = `
    <div class='row'>
    <div class="col-md-3 col-sm-12">
    <img src=${item.thumbnail_url} class='img-fluid rounded ' srcset="">
</div>
<div class="col-md-9 col-sm-12 mx-2">
    <h4>${item.title}</h4>
    <p class='Para'>${item.details.substring(0,200)} <span >...</span></p>
    <div class="d-flex align-items-center">
        <div class="d-flex w-25 h-25">
            <div class="col-md-3">
                <img src=${item.author.img} class="img-fluid" alt="">

            </div>
            <div class="col-md-9 mx-1">
                <h6>${item.author.name?item.author.name:'Not Found'}</h6>
                <h6 class="text-secondary">${item.author.published_date?item.author.published_date:'Not Found'}</h6>
            </div>
        </div>
        <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-solid fa-eye"></i><span>${item.total_view?item.total_view:'0'}</span>   
        </div>
        <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
        </div>       
        <button type="button" onclick="dataLoad('${item._id}')" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#exampleModal">Show Details</button>
       </div>
       </div>
   <section id='hola'></section>


    `

    getSeciton.appendChild(newElement)
  })
  toggleSpinner(false)
}


const dataLoad = async newsId => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    dataLoader(data.data);
  } catch {
    return 'error 404 data not found'
  }
}
const dataLoader=(item)=>{
  const newsection=document.getElementById('hola')
  newsection.innerHTML=''
  newsection.innerHTML=

  `
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${item[0].title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src=${item[0].thumbnail_url} class="img-fluid rounded " alt="" srcset="">
      <p>Details: ${item[0].details}</p>
      <div>
      <img src=${item[0].author.img} class="img-fluid author-img "  alt="" srcset="">
      <small>Author : ${item[0].author.name}</small>
      <small>Time : ${item[0].author.published_date
      }</small>
      <div class="d-flex w-25 h-25 justify-content-center align-items-center">
            <i class="fa-solid fa-eye"></i>Views : <span>${item.total_view?item.total_view:'0'}</span>   
        </div>
      
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


  `
  
}


const blog=()=>{
  const getSeciton = document.getElementById('catagory')
  getSeciton.classList.add('container')
  const newElement=document.createElement('div')
  getSeciton.innerHTML=''
  newElement.innerHTML=
  `
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Difference Between var ,let and const
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <strong> var : <strong>
      <ol>
      <li>Variables declared with var are in the function scope</li>
      <li> var allowed Hoisting</li>
      <li>we can re asign a variable by using var</li>
      <li>we can re declare a variable by using var</li>
    </ol>
    <strong> let : <strong>
    <ol>
      <li>Variables declared as let are in the block scope.</li>
      <li>Hoisting is not allowed in let</li>
      <li>we can reasign a variable by using let</li>
      <li>we can not re declare a variable by using let</li>
    </ol>
    <strong> Const : <strong>
    <ol>
    <li>Variables declared as const are in the block scope.</li>
    <li>Hoisting is not allowed in const</li>
    <li>We can not re asign a variable by using const</li>
    <li>We can not re declare a variable by using const</li>
  </ol>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Difference between function and arrow function
       
      </button>

    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
     <div>
      <ol>
      <li>The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.</li>
      <li> Since regular functions are constructible, they can be called using the new keyword.
    
      However, the arrow functions are only callable and not constructible, i.e arrow functions can never be used as constructor functions. Hence, they can never be invoked with the new keyword.</li>
      <li>Arrow functions do not have an arguments binding. However, they have access to the arguments object of the closest non-arrow parent function. Named and rest parameters are heavily relied upon to capture the arguments passed to arrow functions.</li>
      </ol>
      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Difference Between forEach , map and filter
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <ol>
      <li>ForEach : Foreach takes a callback function and run that callback function on each element of array one by one.</li>
      <li>Map : Map like filter & foreach takes a callback and run it against every element on the array but whats makes it unique is it generate a new array based on your existing array.</li>
      <li>Filter : The main difference between forEach and filter is that forEach just loop over the array and executes the callback but filter executes the callback and check its return value. If the value is true element remains in the resulting array but if the return value is false the element will be removed for the resulting array.</li>
      </ol>
      </div>
    </div>
  </div>
  
</div>
  
  
  `
  getSeciton.appendChild(newElement)
}




const toggleSpinner =(isLoading)=>{
  const loaderSection=document.getElementById('spinner')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }else{
    loaderSection.classList.add('d-none')
  }
}