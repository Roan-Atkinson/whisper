function getData() {

   var xmlhttp;

   if (window.XMLHttpRequest) {
     xmlhttp = new XMLHttpRequest();
   }
   else {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }

   xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4) {
       var content = xmlhttp.responseText;
       var chat =  document.getElementById('chat')
       chat.innerHTML = content
       chat.scrollTop = chat.scrollHeight
     }
   }

   xmlhttp.open("GET", "chat.dat", true);
   xmlhttp.send();

}


function detectChange() {

   var xmlhttp;

   if (window.XMLHttpRequest) {
     xmlhttp = new XMLHttpRequest();
   }
   else {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }

   xmlhttp.onreadystatechange = function () {
     if (xmlhttp.readyState == 4) {
       console.log("md5 requested");
       var chatMD5 = xmlhttp.responseText;
       var prevMD5 = window.localStorage.chatMD5;
       if (chatMD5 != prevMD5) {
          window.localStorage.chatMD5 = chatMD5;
          getData();
       }
       setTimeout(function() {
          detectChange();
       },100)
     }
   }

   xmlhttp.open("GET", "chat.md5", true);
   xmlhttp.send();

}


function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}



params = getQueryParams(document.location.search);
if (!params.user || params.user == '' || params.user == null) {
   var username = prompt('username:');
   alert('you can change it in the URL later if you want...')
   var url = window.location.href;
   url = url + "?user=" + username;
   window.location = url;
}
getData();
detectChange();
