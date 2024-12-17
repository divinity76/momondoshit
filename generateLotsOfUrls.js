if (typeof moment === 'undefined') {
    // i am professional programmer
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js", false);
    xhr.send();
    eval(xhr.responseText);
}
// https://www.momondo.no/flight-search/OSL-SGN/2022-03-14?sort=bestflight_a
function generateUrls(from, to, startDate, endDate, requireCheckinLuggage) {
    document.body.innerHTML = "";
    while (startDate <= endDate) {
        let strdate = startDate.toISOString().split('T')[0];
        let url = `https://www.momondo.no/flight-search/${from}-${to}/${strdate}?sort=bestflight_a`;
        if (requireCheckinLuggage) {
            url += "&fs=bfc=1";
        }
        let ele = document.createElement("a");
        ele.href = url;
        ele.textContent = url;
        ele.addEventListener("click", function () {
            this.parentNode.removeChild(this.nextSibling); // br
            this.parentNode.removeChild(this);
        });
        ele.target = "_blank";
        ele.classList.add("momondo-link");
        document.body.appendChild(ele);
        document.body.appendChild(document.createElement("br"));
        startDate.setDate(startDate.getDate() + 1);
    }
}
generateUrls("SGN", "OSL", moment().add(1, "days").toDate(), moment().add(2, "months").toDate(), requireCheckinLuggage = true);
auto_click = 1;
if(auto_click) {
    function autoclicker(){
        let ele = document.querySelector(".momondo-link");
        if(ele) {
            console.log("clicking", ele.href);
            ele.click();
            setTimeout(autoclicker, 30*1000);
        } else {
        }
    }
    autoclicker();
}
