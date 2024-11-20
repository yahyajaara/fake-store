
const getCategory = async () =>
{
    
    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);
    return data ;
}


const displayCategory = async () =>
{
    document.querySelector("._loding").classList.add("active");
    
    try
    {
        const Category = await getCategory();
        const result = Category.map((productName) => 
        {

            return `
            
                        <div class = "product-name">

                        <h2> ${productName} </h2>
                        <a href = "detils.html?category=${productName}">  Detils   </a>

                        </div>
            `
        }
        
        ).join(" ");

        document.querySelector(".category .row").innerHTML = result ;
        document.querySelector("._loding").classList.remove("active");

    }

    catch(error)
    {
        document.querySelector("._loding").classList.add("active");
    }

        
}

displayCategory();




const timerr = ()=>
    {
        const ramadanDay = new Date("2025-03-01T00:00:00").getTime();
        const inday = new Date().getTime();
        const distance = (ramadanDay-inday);
    
        const day = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor(((distance % 86400000) % 3600000) / 60000);
        const seconds = Math.floor((((distance % 86400000) % 3600000) % 60000) / 1000);


        document.querySelector(".ramadan .row").innerHTML = 
        `
            <span> Ramadan </span>

            <div class="ramadanTime">

                    <div class="day"> day : ${day}</div>
                    <div class="hours"> hours : ${hours} </div>
                    <div class="minutes"> minutes : ${minutes} </div>
                    <div class="seconds"> seconds : ${seconds} </div>
        
            </div>
            

        `;

    }

    setInterval(() => {
        timerr();
    }, 1000);




    const getProdut = async (page) =>
        {
            const limit = 30 ;
            const skip = (page - 1) * limit;
            const {data} = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
            return data ;
        }
        
        const displayProduct = async (page = 1) =>
        {
            document.querySelector("._loding").classList.add("active");
            
            try
            {
                
                const data = await getProdut(page);
                const limit = 30 ;
                const numberOfPages = Math.ceil(data.total / limit);
                const result = data.products.map((product)=>
                {
                    return`
                                 <div class = "aproduct">
            
                                        <img src = "${product.thumbnail} " class = 'imgess' /> 
                                        <h3> ${product.title} </h3> 
                                        <span>${product.price} </span>
                                 </div>
                    `
                }
                
                ).join(" ");
                
                document.querySelector(".all_product .row").innerHTML = result;
                document.querySelector("._loding").classList.remove("active");

                let paginationJS = ``;

                if (page == 1)
                {
                     paginationJS += `<li class="page-item"> <button class="page-link" >&laquo</button> </li>`;
                }

                else
                {
                     paginationJS += `<li class="page-item"> <button onclick=displayProduct(${page-1}) class="page-link" >&laquo</button> </li>`;
                }
               
               

               for(let i = 1; i <= numberOfPages; i++)
                {
                    paginationJS += `<li class="page-item${i==page?'active':''} "> <button onclick=displayProduct(${i}) class="page-link">${i}</button> </li>`;
                }


                if (page == numberOfPages)
                {
                    paginationJS += `<li class="page-item"> <button class="page-link">&raquo</button> </li>`;

                }

                else
                {
                    paginationJS += `<li class="page-item"> <button onclick=displayProduct(${parseInt(page)+1}) class="page-link">&raquo</button> </li>`;

                }
                

                document.querySelector(".pagination").innerHTML = paginationJS;

                myModal();

            }
        
            catch(error)
            {
                document.querySelector("._loding").classList.add("active");
            }
        
        }


    displayProduct();

    function myModal ()
    {
        const modal = document.querySelector(".my_modal");
        const closeButton = document.querySelector(".closeButton");
        const rightButton = document.querySelector(".rightButton");
        const leftButton = document.querySelector(".leftButton");
        const image = Array.from(document.querySelectorAll(".imgess"));
        let indexOfImage = 0 ;
    
        image.forEach(function(img)
            {
                img.addEventListener("click" , function(e)
                {
                    modal.classList.remove("nonDisabled");
                    const source = e.target;
                    modal.querySelector('img').setAttribute("src", source.src);
                    indexOfImage = image.indexOf(source);

                });

            }
        );

        closeButton.addEventListener("click" , function(e)
            {
                modal.classList.add("nonDisabled");
            }

        );


        rightButton.addEventListener("click" , function(e)
            {
                indexOfImage++;
                if(indexOfImage >= image.length)
                {
                    indexOfImage = 0 ;
                }
                modal.querySelector('img').setAttribute("src", image[indexOfImage].src);
            }
    );

        leftButton.addEventListener("click" , function(e)
            {
                indexOfImage--;
                if(indexOfImage < 0)
                {
                    indexOfImage = image.length - 1 ;
                }
                modal.querySelector('img').setAttribute("src", image[indexOfImage].src);
            }

    );

        document.addEventListener("keydown" , function(e)
                {
                    console.log(e.key)
                    
                    if(e.code == "Escape")
                    {
                        modal.classList.add("nonDisabled");
                    }

                    else if(e.code == "ArrowRight")
                    {
                        indexOfImage++;
                        if(indexOfImage >= image.length)
                        {
                            indexOfImage = 0 ;
                        }
                        modal.querySelector('img').setAttribute("src", image[indexOfImage].src);
                    }


                    else if(e.code == "ArrowLeft")
                    {
                        indexOfImage--;
                        if(indexOfImage < 0)
                        {
                            indexOfImage = image.length - 1 ;
                        }
                        modal.querySelector('img').setAttribute("src", image[indexOfImage].src);
                    }
                }
        );


    }

    