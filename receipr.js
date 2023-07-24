let arr = []
const buttons = document.querySelector(".buttons")

const items = document.querySelector(".items")

const loading = document.querySelector(".fa-6x")

const slide = document.querySelector(".slide")

window.addEventListener("DOMContentLoaded", () => {

    fetch("https://api.spoonacular.com/recipes/random?apiKey=b2e81cdc50d04625aea3e403d8829fe0&number=21")
        .then(res => res.json())
        .then(json => {
            let values = json.recipes;
            for (let i = 0; i < values.length; i++) {
                arr.push(values[i]);
            }

            allProcess(arr)
            category(arr)
            displayAlert()
        })
})

function allProcess(arr) {
    loading.style.display = "none"

    //map for looping the lists
    //assigning the html tag

    let products = arr.map((item) =>
        `<div>
                <a href="${'list.html?id=' + item.id}"><img src="${item.image}"></a>
                <span>${item.title}</span>
                </div>`).join("")
    items.innerHTML = products

    let slider = arr.map((items) =>
        `<div>
                    <a href="${'list.html?id=' + items.id}"><img src="${items.image}"></a>
                    </div>`).join("")

    slide.innerHTML = slider

    const img = document.querySelectorAll(".items>div>a>img")
    const span1 = document.querySelectorAll("span")
    for (let x = 0; x < img.length; x++) {
        img[x].addEventListener("mouseover", () => {
            span1[x].style.display = "block"
            img[x].style.opacity = 0.5
        })
        img[x].addEventListener("mouseout", () => {
            span1[x].style.display = "none"
            img[x].style.opacity = 1

        })
        span1[x].addEventListener("mouseover", () => {
            span1[x].style.display = "block"
            // span1[x].style.opacity = 0.5
        })
        span1[x].addEventListener("mouseout", () => {
            span1[x].style.display = "none"
            // span1[x].style.opacity = 1

        })

    }

}




let sear = []
// console.log(sear);
function category(arr) {





    //map loop for only cuisines
    let allcategory = arr.map((elem) => elem.cuisines[0])
    //filter for  loop
    let Allitems = ["AllItems", ...allcategory.filter((elements, idx) => {
        // console.log(elements);
        //indexof is remove the dulicate cuisine and idx means shows the index value
        //comparing the cuisine and index
        //return the Allitems
        return allcategory.indexOf(elements) == idx

    })]
    // console.log(Allitems);

    //assigning the button tag 
    //filtered value in the AllitAllitemsems
    buttons.innerHTML = Allitems.map((cuisinesButtons) => {
        //handling the underfined error
        if (cuisinesButtons != undefined) {
            //asssigning the button innertext
            return `<button>${cuisinesButtons}</button>`
        }
        //join method for removing the commas
    }).join("")



    const btn = document.querySelectorAll("button")


    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", (e) => {
            btn[i].classList.toggle("categoryfield")
            let target = e.target.innerText

            //ternary operator 
            //filter the cuisine list         
            target == "AllItems" ? allProcess(arr) : allProcess(arr.filter((filterList) => filterList.cuisines[0] == target))

            //if else condition

            // if(target == "AllItems"){
            //     allProcess(arr)
            // }
            // else{
            //     allProcess(arr.filter((filterList)=>filterList.cuisines[0]==target))

            // }


        })
    }


    //Targeting the input 

    let input = document.querySelector("input")

    // console.log(arr);

    input.addEventListener("keyup", (e) => {

        let targets = e.target.value.toLowerCase().trim()

        let span = document.querySelectorAll("span")
        for (let x = 0; x < span.length; x++) {
            let text = span[x].innerText
            if (text.toLowerCase().includes(targets) === true) {
                span[x].parentElement.style.display = "block"
            }
            else {
                span[x].parentElement.style.display = "none"
            }
        }

    })


}























///second html page

let arr2 = []
const detail = document.querySelector(".detail")
let oneitem = window.location.search.slice(4);
// console.log(oneitem);
fetch("https://api.spoonacular.com/recipes/" + oneitem + "/information?apiKey=b2e81cdc50d04625aea3e403d8829fe0")
    .then(res => res.json())
    .then(json => {
        arr2.push(json)
        loading.style.display = "none"

        for (let i = 0; i < arr2.length; i++) {


            const imgs = document.createElement("img")

            imgs.setAttribute("src", arr2[i].image)
            detail.append(imgs)
            const receipeDetails = document.createElement("div")
            detail.append(receipeDetails)
            const li = document.createElement("li")
            const li1 = document.createElement("li")
            const li2 = document.createElement("li")
            const li3 = document.createElement("li")
            li.innerText = "Name: " + arr2[i].title
            li1.innerText = "Vegetarian: " + arr2[i].vegetarian
            li2.innerText = "sourceName: " + arr2[i].sourceName

            receipeDetails.append(li)
            receipeDetails.append(li1)
            receipeDetails.append(li2)

            if (arr2[i].cuisines == "") {
                li3.innerText = "cuisines: " + "Indian"
                receipeDetails.append(li3)
            }
            else if (arr2[i].cuisines !== "") {
                li3.innerText = "cuisines: " + arr2[i].cuisines
                receipeDetails.append(li3)
            }
        }
    })




//sliding part
const left = document.querySelector(".left>i")

left.addEventListener("click", () => {
    slide.scrollBy(-350, 0)
})



const right = document.querySelector(".right>i")

right.addEventListener("click", () => {
    slide.scrollBy(350, 0)
})




function displayAlert() {


    window.setInterval(() => {

        slide.scrollBy(350, 0)

    }, 2500)
}



let viewMore = document.querySelector(".views")
viewMore.addEventListener("click", () => {
    // loading.style.display = "block"
    fetch("https://api.spoonacular.com/recipes/random?apiKey=994be35b9f1649a9b9eb6d4ac33874f7&number=21")
        .then(res => res.json())
        .then(json => {
            let values = json.recipes;
            for (let i = 0; i < values.length; i++) {
                arr.push(values[i]);
            }

            allProcess(arr)
            category(arr)
            displayAlert()
        })
})
