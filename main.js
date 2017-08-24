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
       setTimeout(function() {
          getData()
       },100)
     }
   }

   xmlhttp.open("GET", "chat.data", true);
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
