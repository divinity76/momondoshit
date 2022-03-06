// https://www.momondo.no/flight-search/OSL-SGN/2022-03-14?sort=bestflight_a
function generateUrls(from, to, startDate, endDate) {
    document.body.innerHTML="";
    while (startDate <= endDate) {
        let strdate = startDate.toISOString().split('T')[0];
        let url = `https://www.momondo.no/flight-search/${from}-${to}/${strdate}?sort=bestflight_a`;
        let ele = document.createElement("a");
        ele.href = url;
        ele.textContent = url;
        ele.addEventListener("click", function () { 
            this.parentNode.removeChild(this.nextSibling); // br
            this.parentNode.removeChild(this);
        });
        document.body.appendChild(ele);
        document.body.appendChild(document.createElement("br"));
        startDate.setDate(startDate.getDate() + 1);
    }
}
generateUrls("OSL", "SGN", new Date("2022-03-06"), new Date("2022-10-06"));
