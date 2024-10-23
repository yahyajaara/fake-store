
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

        console.log(ramadanDay)

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