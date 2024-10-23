
const getTitle = ()=>
    {
        const nameProduct = new URLSearchParams( window.location.search).get('category');
        const title = 
        `          
    
        <p> ${nameProduct} </p>
        
        `;
    
        document.querySelector(".title").innerHTML = title;
    
    }




const getAProduct = async () =>
{
    const params = new URLSearchParams( window.location.search).get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${params}`);
    return data ;

}

const displayAProduct = async () =>
{
    document.querySelector("._loding").classList.add("active");
    try
    {
        const data = await getAProduct();

        const result = data.products.map((product)=>
        {
            return`
                         <div class = "aproduct">
    
                                <img src = "${product.thumbnail}" /> 
                                <h3>${product.name}</h3>
                                <span>${product.price} </span>
    
                         </div>
    
            `
        }
    
        ).join(' ');
        
        document.querySelector(".products .row").innerHTML = result;

        document.querySelector("._loding").classList.remove("active");
    }
    catch(error)
    {
        document.querySelector("._loding").classList.add("active");
    }

}




    

getTitle();
displayAProduct();




