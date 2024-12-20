let elCategoryList = document.querySelector(".category-list");
let elProductList = document.querySelector(".products-list")
let elSearchInput = document.querySelector(".search-input")
let elItemInspect = document.querySelector(".item-inspect")

const request = async (API) => {
  const resolve = await fetch(API);
  const data = await resolve.json();
  return data;
};

request("https://api.escuelajs.co/api/v1/categories").then((data) => {
  if (Array.isArray(data)) {
    elCategoryList.innerHTML = ""; 

    data.forEach((item) => {
      let elItem = document.createElement("li");
      elItem.className = "category-item cursor-pointer"; 
      elItem.innerHTML = `
        <h2 class="font-bold mb-2 text-[22px]">${item.name || "No Title"}</h2>
      `;
      elCategoryList.appendChild(elItem);

      // Add click event listener to category item
      elItem.addEventListener("click", function() {
        renderProduct("", item.id);  // Pass category id to renderProduct
        elProductList.innerHTML = `<img src="images/Double Ring@1x-0.9s-200px-200px.png" class="mx-auto mt-[200px]" width="50" height="50">`
      });
    });
  }
});

function renderProduct(title, id) {
  request(`https://api.escuelajs.co/api/v1/products/?title=${title}&categoryId=${id}`).then(data => {
    elProductList.innerHTML = ''; 
    if (data.length === 0) {
      elProductList.innerHTML = `<p class="text-center">No products found for this category.</p>`;  
    } else {
      data.forEach(item => {
        let elItem = document.createElement("li");
        elItem.className = "w-[300px] bg-[#f8f9fa] rounded-[10px] scale-[1.05] shadow-md shadow-black p-2 hover:scale-[1.2] hover:bg-slate-400 hover:text-white hover:rounded-tr-[40px] hover:rounded-tl-[40px] duration-[0.4s]";
        elItem.innerHTML = `
          <strong class="font-bold text-[18px] text-gray-500 text-center mt-3">${item.category.id}</strong>
          <h2 class="font-bold text-[22px] mb-2 text-center">${item.title}</h2>
          <p class="font-normal text-[20px] line-clamp-3 text-center">${item.description}</p>
        `;
        elProductList.appendChild(elItem);

        elItem.addEventListener("click", function() {
          elItemInspect.innerHTML = `
            <strong class="font-bold text-[28px] text-yellow-500 text-center mt-3">${item.category.id}</strong>
            <h2 class="font-bold text-[32px] mb-2 text-center">${item.title}</h2>
            <p class="font-normal text-[30px] line-clamp-3 text-center">${item.description}</p>
          `;
        });
      });
    }
  });
}

renderProduct("", 0);




function renderProduct(title, id) {
  request(`https://api.escuelajs.co/api/v1/products/?title=${title}&categoryId=${id}`).then(data => {
    elProductList.innerHTML = null
    data.map(item => {
      let elItem = document.createElement("li")
      elItem.className = "w-[300px] h-[300px] bg-[#f8f9fa] rounded-[10px] scale-[1.05] shadow-md shadow-black p-2 hover:scale-[1.2] hover:bg-slate-400 hover:text-white hover:rounded-tr-[40px] hover:rounded-tl-[40px] duration-[0.4s]"
      elItem.innerHTML = `
          <strong class="font-bold text-[18px] text-gray-500 text-center mt-3">${item.category.id}</strong>
          <h2 class="font-bold text-[22px] mb-2 text-center">${item.title}</h2>
          <p class="font-normal text-[20px] line-clamp-3 text-center">${item.description}</p>
      `
      elProductList.appendChild(elItem)

      elItem.addEventListener("click", function(e) {
        elItemInspect.innerHTML = `
          <strong class="font-bold text-[28px] text-yellow-500 text-center mt-3">${item.category.id}</strong>
          <h2 class="font-bold text-[32px] mb-2 text-center">${item.title}</h2>
          <p class="font-normal text-[30px] line-clamp-3 text-center">${item.description}</p>
        `
      })
    })
})
}
renderProduct("", 0)



elSearchInput.addEventListener("input", function(e){
  console.log(e.target.value)
  renderProduct(e.target.value, 0)
})