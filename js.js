function renderProduct(id) {
    request(`https://api.escuelajs.co/api/v1/products/?categoryId = ${id}`).then(data => {
      data.map(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[300px] bg-[#f8f9fa] rounded-[10px] scale-[1.05] shadow-md shadow-black p-2 hover:scale-[1.2] hover:bg-slate-400 hover:text-white hover:rounded-tr-[40px] hover:rounded-tl-[40px] duration-[0.4s]"
        elItem.innerHTML = `
            <strong class="font-bold text-[18px] text-gray-500 text-center mt-3">${item.category.id}</strong>
            <h2 class="font-bold text-[22px] mb-2 text-center">${item.title}</h2>
            <p class="font-normal text-[20px] line-clamp-3 text-center">${item.description}</p>
        `
        elProductList.appendChild(elItem)
      })
  })
  }
  renderProduct(0)