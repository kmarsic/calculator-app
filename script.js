const selector = document.querySelector("#selector")
const form = document.querySelector(".theme-switch")
const inputs = document.querySelectorAll("input");
console.log(inputs)

inputs.forEach(input => {
    input.addEventListener("change", (e) => {
        if (e.target.value === 'two') { 
            selector.classList.remove("first");
            selector.classList.remove("third");
            selector.classList.add("second");
        } else if (e.target.value === 'one') {
            selector.classList.remove("second");
            selector.classList.remove("third");
            selector.classList.add("first");
        } else if (e.target.value === 'three') {
            selector.classList.remove("second");
            selector.classList.remove("first");
            selector.classList.add("third");
        }


    })
})

