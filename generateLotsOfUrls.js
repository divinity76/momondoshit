(function(){

var buildGetUrl=function buildGetUrl($url,$getdata){
var $ret=$url;
//fixme,  $url="foo.com/?foo=bar";
if($ret.split("?").length<2){
$ret=$ret+"?";
}
if($ret.substr(-1)!="&" && $ret.substr(-1)!="?"){
$ret=$ret+"&";
}
var $n,$i=0;
for($n in $getdata){
$ret=$ret+encodeURIComponent($n)+"="+encodeURIComponent($getdata[$n])+"&";
++$i;
}
if($i>0){
$ret=$ret.slice(0,-1);//remove the last & :p
}
return $ret;
}
var $url="http://www.momondo.no/multicity/";
//"http://www.momondo.no/multicity/?Search=true&TripType=oneway&SegNo=1&SO0=SGN&SD0=OSL&SDP0=10-09-2014&AD=1&TK=ECO&DO=false&NA=true#Search=true&TripType=oneway&SegNo=1&SO0=SGN&SD0=OSL&SDP0=10-09-2014&AD=1&TK=ECO&DO=false&NA=true";
 var $getdata={};
 $getdata["Search"]="true";
 $getdata["TripType"]="oneway";
 $getdata["SegNo"]="1";//<??? 
 $getdata["SO0"]="SGN";//<TRAVEL FROM CODE
 $getdata["SD0"]="OSL";//<TRAVEL TO, CODE
 $getdata["SDP0"]="10-09-2014";//<TRAVEL FROM DATE
 $getdata["AD"]="1";//<??? 
 $getdata["TK"]="ECO";//<??? (probably "ECO"=economy / business / firstclass, etc, but not confirmed...);
 $getdata["DO"]="false";//<???
 $getdata["NA"]="true";//<???
 return buildGetUrl($url,$getdata);
 })();
