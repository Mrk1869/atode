(function() {

  function twitter(title, url){
    if(m=prompt('Twitter投稿','')){
      f='http://twitter.com/home?status='+encodeURIComponent(m+'/'+title+' '+url);
      if(!window.open(f,'_blank'))location.href=f
    }
  }

  function tumblr(title, url){
    if(text=prompt('Tumblr投稿','')){
      var e=window.getSelection,k=document.getSelection,x=document.selection,s=(e?e():(k)?k():(x?x.createRange().text:0)),e=encodeURIComponent,f='http://www.tumblr.com/share?v=3&u='+e(e(url)) +'&t='+e(e(title)) +'&s='+e(s),l=document.location;
      try{if(!/^(.*\.)?tumblr[^.]*$/.test(document.location.host))throw(0);
        tstbklt();
      }catch(z){a =function(){
        if(!w.open(f,'t','toolbar=0,resizable=0,status=1,width=450,height=430'))
          document.location.href=f;
      };
      if(/Firefox/.test(navigator.userAgent))
        setTimeout(a,0);
      else
        a();
      }void(0)
    }
  }

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
      result[paramName] = decodeURIComponent(paramValue);
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
    elm3.value = getScriptParams()["id"];;
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
    var comment = prompt("ブックマーク:", "" + selection);
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

  twitter(document.title, location.href);
  tumblr(document.title, location.href);

})();
