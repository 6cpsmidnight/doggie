document.querySelector("#weight").value = "weight-all";
document.querySelector("#life-span").value = "life-span-all";

$(':input').change(function (evt) {

    var filter = $(':input:checked,select').map(function (index, el) {
        return "." + el.value;
    }).toArray().join("");

    $(".dog").hide().filter(filter).show();

});

for (let i = 1; i < 300; i++) {
    fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${i}`, {
            withCredentials: true,
            headers: {
                "x-auth-token": "1c6d1286-4f98-48ec-a730-43e0e4422259",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.length === 1) {
                let div = document.createElement("div");
                div.id = `dog-${i}`;
                div.classList.add("dog")
                div.classList.add("weight-all")
                div.classList.add("height-all")
                div.classList.add("life-span-all")
                div.innerHTML = `
                <img id="dog-img-${i}" class="dog-img"  />
                <p>
                <span class="dog-name"><span id="dog-name-${i}"></span> </span>
                <span class="dog-weight">averages about <span id="dog-weight-${i}"></span>lbs <span class="seperator">•</span> </span>
                <span class="dog-height">averages about <span id="dog-height-${i}"></span></span>in <span class="seperator">•</span> </span>
                <span class="dog-life-span">averages about <span id="dog-life-span-${i}"></span></span> years</span>
                </p>`
                setTimeout(() => {
                    document.getElementById("dogs").appendChild(div);
                    let dogWeight = result[0].breeds[0].weight.imperial;
                    let lowWeight = dogWeight.slice(0, 2)
                    let highWeight = dogWeight.slice(dogWeight.length - 2, dogWeight.length)
                    dogWeight = parseFloat(lowWeight.split(" ").join("")) + parseFloat(highWeight.split(" ").join(""))
                    dogWeight /= 2
                    let dogHeight = result[0].breeds[0].height.imperial;
                    let lowHeight = dogHeight.slice(0, 2)
                    let highHeight = dogHeight.slice(dogHeight.length - 2, dogHeight.length)
                    dogHeight = parseFloat(lowHeight.split(" ").join("")) + parseFloat(highHeight.split(" ").join(""))
                    dogHeight /= 2
                    let dogLifeSpan = result[0].breeds[0].life_span;
                    let lowLifeSpan = dogLifeSpan.slice(0, 2)
                    let highLifeSpan = dogLifeSpan.slice(dogLifeSpan.length - 8, dogLifeSpan.length - 5)
                    dogLifeSpan = parseFloat(lowLifeSpan.split(" ").join("")) + parseFloat(highLifeSpan.split(" ").join(""))
                    dogLifeSpan /= 2
                    document.querySelector(`#dog-img-${i}`).src = result[0].url
                    document.querySelector(`#dog-name-${i}`).innerHTML = result[0].breeds[0].name
                    document.querySelector(`#dog-weight-${i}`).innerHTML = dogWeight
                    document.querySelector(`#dog-height-${i}`).innerHTML = dogHeight
                    document.querySelector(`#dog-life-span-${i}`).innerHTML = dogLifeSpan
                    if (dogWeight >= 0 && dogWeight <= 25) {
                        div.classList.add("weight-small")
                    } else if (dogWeight >= 26 && dogWeight <= 60) {
                        div.classList.add("weight-medium")
                    } else if (dogWeight >= 61) {
                        div.classList.add("weight-large")
                    }
                    if (dogLifeSpan >= 0 && dogLifeSpan <= 10) {
                        div.classList.add("life-span-0-to-10")
                    } else if (dogLifeSpan >= 11 && dogLifeSpan <= 14) {
                        div.classList.add("life-span-11-to-14")
                    } else if (dogLifeSpan >= 15) {
                        div.classList.add("life-span-15+")
                    }
                    if (i === 264) {
                        document.querySelector("#loading").remove()
                    }
                }, result[0].breeds[0].id * 200);
            }
        })
}