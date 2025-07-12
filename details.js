let allProducts = [];
let myArray = JSON.parse(localStorage.getItem("loved")) || [];

const container = document.getElementById("details");
const id = localStorage.getItem("viewDetails");

fetch("https://edu-me01.github.io/Json-Data/properties.json")
    .then(res => res.json())
    .then(data => {
        const item = data.properties.find(p => p.id == id);
        allProducts = data.properties;


        if (item) {
            showDetails(item);
            showImages(item.images);
            initSwiper();
            showFeatures(item.features);
            showDetails2(item);


        } else {
            container.textContent = "not found";
        }
    });

function showDetails(item) {
    localStorage.setItem("viewDetails", id);
    container.innerHTML = `
       
         <div class="right text-end">
            <p><strong>$</strong> ${item.price.toLocaleString()}</p>
           <button class="love p-2 bg-danger text-light" onclick="loved(${item.id})">
    <i class="fa-solid fa-heart"></i> favorite
</button>

            </div>
        <h3 class="thename">${item.slug}</h3>
        <p class="locatin"><strong><i class="fa-solid fa-location-dot"></i></strong> ${item.location}</p>
        <div class="type">
            <p>${item.type}</p>
            <p>${item.status}</p>
        </div>

        <div class="swiper mySwiper">
            <div class="swiper-wrapper" id="imageSlider"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>

        <div class="alldescriptions">
            <div class="des">
                <p><strong>Description</strong></p>
                <div class="description"><p>${item.description}</p></div>
            </div>
            <div class="features">
               <p><strong>Features & Amenities</strong></p>
                <div id="featuresContainer"></div>
            </div>
        </div>
       
    `;
}


function showImages(images) {
    const slider = document.getElementById("imageSlider");
    images.slice(0, 3).forEach(img => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.innerHTML = `<img src="${img}" class="theimge" alt="صورة">`;
        slider.appendChild(slide);
    });
}

function initSwiper() {
    new Swiper(".mySwiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
function showFeatures(features) {
    const featuresContainer = document.getElementById("featuresContainer");


    if (!features || features.length === 0) {
        featuresContainer.innerHTML = "<p>No features available</p>";
        return;
    }


    const ul = document.createElement("ul");

    features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
    });

    featuresContainer.appendChild(ul);
}

function showDetails2(item) {
    const extraDetails = document.createElement("div");
    extraDetails.className = "property des";

    extraDetails.innerHTML = `
             <p class="text "><strong>Property Details</strong></p>
           <div class="main">
           
              <div class="sec1">
                <p><strong>Bedrooms:</strong> ${item.bedrooms}</p>
        <p><strong>Bathrooms:</strong> ${item.bathrooms}</p>
        <p><strong>Area:</strong> ${item.squareFeet} sqft</p>
        <p><strong>Year Built:</strong> ${item.yearBuilt}</p>
        
        </div>
         <div class="sec2">
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>parking:</strong> ${item.parking}</p>
          <p><strong>furnished:</strong> ${item.furnished}</p>
           <p><strong>condition:</strong> ${item.condition}</p>
           </div>
            </div>
    `;

    container.appendChild(extraDetails);
}
function loved(id) {
    const favItem = allProducts.find(p => p.id === id);

    if (!favItem) {
        Swal.fire({
            title: "Item not found!",
            icon: "error"
        });
        return;
    }

    const existIndex = myArray.findIndex(p => p.id === id);

    if (existIndex === -1) {
        // مش موجود، نضيفه
        myArray.push(favItem);
        localStorage.setItem("loved", JSON.stringify(myArray));

        Swal.fire({
            title: "Added to favorites!",
            icon: "success"
        });
    } else {
        // موجود، نحذفه
        myArray.splice(existIndex, 1);
        localStorage.setItem("loved", JSON.stringify(myArray));

        Swal.fire({
            title: "Removed from favorites!",
            icon: "warning"
        });
    }
}


