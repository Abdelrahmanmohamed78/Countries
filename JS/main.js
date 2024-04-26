// Create Country Boxes

let countries = document.querySelector("main .container .countries");
let searchInput = document.querySelector("main .container .filter form input");
let filterBox = document.querySelector("main .container .filter-box");
let selectedFilter = filterBox.querySelector("p");
let filter = document.querySelector("main .container .filter-box > i");
let selectCountry = document.querySelector("main .container .filter-box .select-counrty");
let selectElement = document.querySelectorAll("main .container .filter-box .select-counrty li");

// Handle Http Request

let myReq = new XMLHttpRequest();

myReq.open("GET", "JS/data.json");

myReq.send();

myReq.onreadystatechange = function() {
  if(this.status == 200 && this.readyState == 4) {
    let data = JSON.parse(this.response);
    let filterdData = data;

    filterdData.forEach((item, i) => {
      item.id = i + 1;
      let product = document.createElement("div");
      product.id = item.id;
      let imageBox = document.createElement("div");
      let imageElement = document.createElement("img");
      let infoBox = document.createElement("div");
      let ul = document.createElement("ul");
      let population = document.createElement("li");
      population.textContent = "Population: ";
      let populationSpan = document.createElement("span");
      populationSpan.textContent = item.population;
      population.appendChild(populationSpan);
      let region = document.createElement("li");
      region.textContent = "Region: ";
      let regionSpan = document.createElement("span");
      regionSpan.textContent = item.region;
      region.appendChild(regionSpan);
      let capital = document.createElement("li");
      capital.textContent = "Capital: ";
      let capitalSpan = document.createElement("span");
      capitalSpan.textContent = item.capital;
      capital.appendChild(capitalSpan);
      ul.appendChild(population);
      ul.appendChild(region);
      ul.appendChild(capital);
      product.classList.add("product");
      imageBox.classList.add("image");
      imageElement.src = item.flags.png;
      imageBox.appendChild(imageElement);
      infoBox.classList.add("info");
      let countryLink = document.createElement("a");
      countryLink.setAttribute("href", "country.html");
      countryLink.setAttribute("title", item.name);
      countryLink.id = item.id;
      let h3 = document.createElement("h3");
      h3.textContent = item.name;
      countryLink.appendChild(h3);
      infoBox.appendChild(countryLink);
      infoBox.appendChild(ul);
      product.appendChild(imageBox);
      product.appendChild(infoBox);
      countries.appendChild(product);
    });

    // When Country Clicked

    let links = document.querySelectorAll(".product .info a");

    links.forEach(link => {
      link.addEventListener("click", () => {
        localStorage.setItem("id-link", link.id);
      })
    })

    let products = document.querySelectorAll("main .container .countries .product");
    
    selectElement.forEach(element => {
      element.addEventListener("click", () => {
        products.forEach(product => {
          product.classList.add("hide");
          if(product.children[1].children[1].children[1].children[0].textContent.toLowerCase() === element.textContent.toLowerCase()) {
            product.classList.remove("hide");
          }
        })
        selectedFilter.textContent = element.textContent;
        filter.classList.remove("close");
        selectCountry.classList.remove("show");
      })
    })

    // Handle Country Filter Using Regions

    filter.addEventListener("click", () => {
      filter.classList.toggle("close");
      selectCountry.classList.toggle("show");
    })

    // Handle Country Search Using The Name If Country

    searchInput.addEventListener("input", () => {
      looping();
    })

    function looping() {
      if(searchInput.value.length === 0) {
        products.forEach(product => {
          product.classList.remove("hide");
        })
      } else if(searchInput.value.length !== 0) {
        products.forEach(product => {
          product.classList.add("hide");

          if(product.children[1].children[0].textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1) {
            product.classList.remove("hide");
          }
        })
      }
    }
  }
}

// Handle Dark Mode

let darkBtn = document.querySelector("header .container .dark-mode");
let rootElement = document.querySelector(":root");

if(window.localStorage.getItem("dark-mode") === "yes") {
  rootElement.id = "dark";
  darkBtn.innerHTML = `<i class="fa-solid fa-sun-bright"></i> Light Mode`;
} else if(window.localStorage.getItem("dark-mode") === "yes") {
  rootElement.id = "";
  darkBtn.innerHTML = `<i class="fa-regular fa-moon"></i> Dark Mode`;
}

darkBtn.addEventListener("click", () => {
  if(darkBtn.classList.contains("light")) {
    darkBtn.classList.remove("light");
    darkBtn.classList.add("dark");
    rootElement.id = "dark";
    window.localStorage.setItem("dark-mode", "yes");
    darkBtn.innerHTML = `<i class="fa-solid fa-sun-bright"></i> Light Mode`;
  } else {
    darkBtn.classList.add("light");
    darkBtn.classList.remove("dark");
    rootElement.id = "";
    window.localStorage.setItem("dark-mode", "no");
    darkBtn.innerHTML = `<i class="fa-regular fa-moon"></i> Dark Mode`;
  }
});