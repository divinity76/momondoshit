function generateMomondoTimeString(date) {
    //return toLocaleDateString().replace(/\./ig,"-");//Date.getMonth() returns the month of the year -1?????? for crying out loud
    return (("00" + date.getDate()).slice(-2)) + "-" + (("00" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0000" + date.getFullYear()).slice(-4));
    //just in case someone want to travel to Nazareth at year 0000 ? ;) will malfunction on dates earlier than 0000, 
    // and right now i don't care enough to fix it
};

function generateMomondoTimeStrings(_fromDate, _toDate) {
    var $ret = [],
        fromDate = new Date(),
        toDate = new Date();
    fromDate.setTime(_fromDate.getTime());
    toDate.setTime(_toDate.getTime());

    while (fromDate.getTime() < (toDate.getTime() + 1)) {
        $ret.push(generateMomondoTimeString(fromDate));
        fromDate.setTime(fromDate.getTime() + (24 * 1000 * 60 * 60));
    }
    return $ret;
};


function buildGetUrl($url, $getdata) {
    var $ret = $url;
    //fixme,  $url="foo.com/?foo=bar";
    if ($ret.split("?").length < 2) {
        $ret = $ret + "?";
    }
    if ($ret.substr(-1) != "&" && $ret.substr(-1) != "?") {
        $ret = $ret + "&";
    }
    var $n, $i = 0;
    for ($n in $getdata) {
        $ret = $ret + encodeURIComponent($n) + "=" + encodeURIComponent($getdata[$n]) + "&";
        ++$i;
    }
    if ($i > 0) {
        $ret = $ret.slice(0, -1); //remove the last & :p
    }
    return $ret;
};

function buildGetUrls($url, $getdata, $fromDate, $toDate) {
    var $ret = [];
    var originalSDP0 = $getdata["SDP0"]; //where is Erlang when i need it
    var timeStrings = generateMomondoTimeStrings($fromDate, $toDate);
    var i = 0,
        tmp = "";
    for (i = 0; i < timeStrings.length; ++i) {
        $getdata["SDP0"] = timeStrings[i];
        $ret.push(buildGetUrl($url, $getdata));
    };
    $getdata["SDP0"] = originalSDP0; //fuuuuu
    return $ret;
};
var $url = "http://www.momondo.no/flightsearch/";
//"http://www.momondo.no/flightsearch/?Search=true&TripType=1&SegNo=1&SO0=SGN&SD0=OSL&SDP0=10-09-2014&AD=1&TK=ECO&DO=false&NA=true#Search=true&TripType=1&SegNo=1&SO0=SGN&SD0=OSL&SDP0=10-09-2014&AD=1&TK=ECO&DO=false&NA=true";
var $getdata = {};
$getdata["Search"] = "true";
$getdata["TripType"] = "1";
$getdata["SegNo"] = "1"; //?? 
$getdata["SO0"] = "SGN"; //<TRAVEL FROM CODE
$getdata["SD0"] = "OSL"; //<TRAVEL TO, CODE
$getdata["SDP0"] = "11-11-1111"; //<TRAVEL FROM DATE
$getdata["AD"] = "1"; //<??? 
$getdata["TK"] = "ECO"; //<??? (probably "ECO"=economy / business / firstclass, etc, but not confirmed...);
$getdata["DO"] = "false"; //<???
$getdata["NA"] = "true"; //<???
var urls = buildGetUrls($url, $getdata, (new Date("2016-06-17")), (new Date("2016-12-5")));
document.body.innerHTML = "";
var i = 0,
    tmpe;
	var onclickfun=function(ev){
	ev.target.parentNode.removeChild(ev.target.nextSibling);
	ev.target.parentNode.removeChild(ev.target.nextSibling);
	ev.target.parentNode.removeChild(ev.target.nextSibling);
	ev.target.parentNode.removeChild(ev.target);
	
	};
for (i = 0; i < urls.length; ++i) {
    tmpe = document.createElement("a");
    tmpe.setAttribute("href", tmpe.href = urls[i]);
    tmpe.setAttribute("target", tmpe.target = "_blank");
    tmpe.textContent = tmpe.href;
	tmpe.addEventListener("click",onclickfun);
    document.body.appendChild(tmpe);
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));
}
