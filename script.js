(function() {

  function getScriptParams(){
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;

    var query = src.substring(src.indexOf('?')+1);
    var param = query.split('&');

    var result = new Object();
    for(var i = 0; i < param.length; i++){
      var element = param[i].split('=');
      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);
    }
    return result;
  }

  function getdocumentcode(obj){
    var code = "";
    if (obj.document.childNodes.length > 1){
      code = obj.document.lastChild.innerHTML;
    }
    if (!code && obj.document.childNodes.length == 1){
      code = obj.document.childNodes[0].innerHTML;
    }
    if (!code){
      code = obj.document.body.innerHTML;
    }
    if (code){
      code = '<html>' + code + '</html>';
    }
    var objframes = obj.document.getElementsByTagName("frame");
    if (objframes && objframes.length > 0){
      // body
      if (code){
        code = '<framesetpart><url>' + obj.location.href + '</url>' + code;
      }

      for (var i = 0; i < objframes.length; i++){
        var frameobj = objframes[i];
        try{
          if (frameobj.contentWindow && obj != frameobj.contentWindow){
            code = code + '<framesetpart><url>' + frameobj.contentWindow.location.href + '</url>' + getdocumentcode(frameobj.contentWindow);
          }else{
            // inline. do nothing;
          }
        }catch(e){
          code = code + '<framesetpart><url>Unknown</url><html><body>' + e + '</body></html>';
        }
      }
    }
    return code;
  }

  if (!document.getElementById("atode_filter")){
    var documentcode = getdocumentcode(window);
    var atode_elm = document.createElement("div");
    atode_elm.id = "atode_filter";
    with(atode_elm.style){position="absolute";top=0;left=0;width="1600px";height="1200px";backgroundColor="#eeeeee";filter="alpha(opacity=50)";opacity=.5;MozOpacity=.5;zindex=9999;};
    try{
      document.body.appendChild(atode_elm);
    }catch(e){
      document.appendChild(atode_elm);
    }

    //mrk-add
    alert(getScriptParams());

    // send data
    var formelm = document.createElement('form');
    var elm1 = document.createElement('input');
    var elm2 = document.createElement('input');
    var elm3 = document.createElement('input');
    var elm4 = document.createElement('textarea');
    // title
    elm1.name = "t";
    elm1.value = document.title;
    // url
    elm2.name = "u";
    elm2.value = location.href;
    // secure
    elm3.name = "s";
    elm3.value = "4be9d73fa6e7";
    // body
    elm4.name = "b";
    elm4.appendChild(document.createTextNode(documentcode));
    // form
    formelm.appendChild(elm1);
    formelm.appendChild(elm2);
    formelm.appendChild(elm3);
    formelm.appendChild(elm4);
    // comment
    var selection = "";
    if (document.selection && document.selection.createRange){
      try{
        selection = document.selection.createRange().text;
      }catch(e){
        selection = "";
      }
    }else if (document.getSelection){
      selection = document.getSelection();
    }else if (window.getSelection){
      selection = window.getSelection();
    }
    var comment = prompt("Comment:", "" + selection);
    if (comment == null){
      try{
        document.body.removeChild(atode_elm);
      }catch(e){
        document.removeChild(atode_elm);
      }
      return false;
    }
    if (comment){
      var elm5 = document.createElement('input');
      elm5.name = "c";
      elm5.value = comment;
      formelm.appendChild(elm5);
    }

    formelm.style.display = 'none';
    try{
      document.body.appendChild(formelm);
    }catch(e){
      document.appendChild(formelm);
    }
    // submit
    var chr = document.charset;
    formelm.action = "http://atode.cc/b.php";
    formelm.method = "POST";
    formelm.acceptCharset = "utf-8";
    document.charset = "utf-8";
    formelm.submit();
    // close
    document.charset = chr;
  }

})();
