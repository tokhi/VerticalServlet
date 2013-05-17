<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.tok.model.ClipMeta"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<c:set var="artClips" scope="session" value="${clips}"/>
<c:set var="slotID" scope="session" value="454"/>
<c:set var="domain" scope="session" value="en.ilovecars.tv"/>
<c:set var="title" scope="session" value="Cars"/>
<c:set var="logoTitle" scope="session" value="ilovecars"/>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><c:out value="${domain}" /></title>
  <meta name="description" content="{$description}"/>
  <meta name="viewport" content="width=device-width" />
  <link rel="stylesheet" href="css/all.css?cb=1" />
  
  <script src="js/vendor/modernizr.js"></script>
</head>
<body>
<header id="go-to-top" class="castaclip-verticals-site-header">
  <div class="castaclip-verticals-nav-container">
    <div class="container castaclip-p-r">
      <a class="castaclip-verticals-logo" href="/" >
          <img src="img/logo.png" alt="<c:out value="${logoTitle}" />">
      </a>
    </div> 
  </div>
</header>
<div class="container" style="margin-top: -432px; overflow: hidden;">
  <div class="row">
    <div class="span5 castaclip-p-r castaclip-verticals-hero-unit">
        <h1><c:out value="${title}" /></h1>
        <p>News and Videos! Whether luxury or sports car - here you can get the latest videos with brand new cars and test drives!</p>
    </div>
    <div class="span7 castaclip-p-r castaclip-verticals-stage-player-container-column">
      <div class="castaclip-verticals-stage-player-container castaclip-p-a castaclip-base">
<!-- START EMBEDCODE -->
<script type="text/javascript" class="castaclip-widget-script">
(function() {
    if (document.readyState === "complete") {
        var i = document.createElement('img'); i.src = 'http://cdn.castaclip.net/tracking/pixel-loading.gif?slotID=<c:out value="${slotID}" />&cb=' + parseInt(Math.random()*10000000000000000, 10); i.style.display = 'none'; document.body.appendChild(i);
        var s  = document.getElementsByTagName('script')[1]; var as = function(u) { var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true; sc.src = u; (s == null) ? document.getElementsByTagName("body")[1].appendChild(sc) : s.parentNode.insertBefore(sc, s); }
        as('http://api.castaclip.net/api/v1.0/slots/{$slot}/embed/init?cb='+parseInt(Math.random()*10000000000000000, 10));
    } else {
        document.write( '<img src="http://cdn.castaclip.net/tracking/pixel-loading.gif?slotID=285&cb='+ parseInt(Math.random()*10000000000000000, 10) +'" style="display: none;"/>' );
        document.write( '<scr'+'ipt type="text/javascript" src="http://api.castaclip.net/api/v1.0/slots/<c:out value="${slotID}" />/embed/init?cb='+ parseInt(Math.random()*10000000000000000, 10) +'" ></sc'+'ript>');
    }
})();
</script>
<!-- END EMBEDCODE -->
      </div>
    </div>
  </div>

  <div class="row" style="padding-top: 50px;">
    <div class="castaclip-verticals-unit-1 castaclip-verticals-unit castaclip-verticals-unit-border-top span6 castaclip-p-r">
      <a class="castaclip-verticals-unit-image-container" href="<c:out value="${artClips[1].url}" />">
          <img src="<c:out value="${artClips[1].thumb}" />/170x125.jpg" width="170" height="125" alt="<c:out value="${artClips[1].title}" />">
      </a>
      <a class="castaclip-verticals-title castaclip-verticals-unit-title" href="<c:out value="${artClips[1].url}" />">
        <h2><c:out value="${artClips[1].title}" /></h2>
      </a>
      <p class="castaclip-verticals-description castaclip-verticals-unit-description"><c:out value="${artClips[1].description}" /></p>


      <div class="castaclip-verticals-bottom-bar castaclip-p-a">
      <div class="castaclip-bypass castaclip-p-r">
          <span><i class="castaclip-icon castaclip-icon-calendar"></i><c:out value="${artClips[1].date}" /></span>
          <a href="die-neue-kinowoche-startet-mit-haien-und-monstern.html" class="castaclip-btn castaclip-verticals-btn-more-ico castaclip-ir castaclip-p-a"><c:out value="${artClips[1].title}" /></a>
      </div>
      </div>
    </div>

    <div class="castaclip-verticals-unit-2 castaclip-verticals-unit castaclip-verticals-unit-border-top span6 castaclip-p-r">
      <ul>
        <li class="castaclip-verticals-item">
          <a class="castaclip-bypass castaclip-p-r" href="<c:out value="${artClips[2].url}" />">
            <div class="castaclip-verticals-image-container castaclip-p-r">
              <img src="<c:out value="${artClips[2].thumb}" />/100x74.jpg" width="100" height="74" alt="<c:out value="${artClips[2].title}" />">
              <div class="castaclip-btn castaclip-btn-play-small"></div>
            </div>
            <h2 class="castaclip-p-a"><c:out value="${artClips[2].title}" /></h2>
          </a>
        </li>
        <li class="castaclip-verticals-item">
          <a class="castaclip-bypass castaclip-p-r" href="<c:out value="${artClips[3].url}" />">
            <div class="castaclip-verticals-image-container castaclip-p-r">
              <img src="<c:out value="${artClips[3].thumb}" />/100x74.jpg" width="100" height="74" alt="<c:out value="${artClips[3].title}" />">
              <div class="castaclip-btn castaclip-btn-play-small"></div>
            </div>
            <h2 class="castaclip-p-a"><c:out value="${artClips[3].title}" /></h2>
          </a>
        </li>
        <li class="castaclip-verticals-item">
          <a class="castaclip-bypass castaclip-p-r" href="<c:out value="${artClips[4].url}" />">
            <div class="castaclip-verticals-image-container castaclip-p-r">
              <img src="<c:out value="${artClips[4].thumb}" />/100x74.jpg" width="100" height="74" alt="<c:out value="${artClips[4].title}" />">
              <div class="castaclip-btn castaclip-btn-play-small"></div>
            </div>
            <h2 class="castaclip-p-a"><c:out value="${artClips[4].title}" /></h2>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="row" style="padding-top: 50px;">
    <div class="castaclip-verticals-unit-3 castaclip-verticals-unit castaclip-verticals-unit-border-top span4 castaclip-p-r">
      <a class="castaclip-verticals-image-container castaclip-p-r" href="<c:out value="${artClips[5].url}" />">
        <img src="<c:out value="${artClips[5].thumb}" />/370x200.jpg" width="370" height="200" alt="<c:out value="${artClips[5].title}" />">
      </a>

      <a href="<c:out value="${artClips[5].url}" />"><h2><c:out value="${artClips[5].title}" /></h2></a>
      <p><c:out value="${artClips[5].description}" /></p>

      <div class="castaclip-verticals-bottom-bar">
      <div class="castaclip-bypass castaclip-p-r">
          <span><i class="castaclip-icon castaclip-icon-calendar"></i><c:out value="${artClips[5].date}" /></span>
          <a href="<c:out value="${artClips[5].url}" />" class="castaclip-btn castaclip-verticals-btn-more-ico castaclip-ir castaclip-p-a"><c:out value="${artClips[5].title}" /></a>
      </div>
      </div>
    </div>
    
    <div class="castaclip-verticals-unit-3 castaclip-verticals-unit castaclip-verticals-unit-border-top span4 castaclip-p-r">
      <a class="castaclip-verticals-image-container castaclip-p-r" href="<c:out value="${artClips[6].url}" />">
        <img src="<c:out value="${artClips[6].thumb}" />/370x200.jpg" width="370" height="200" alt="<c:out value="${artClips[6].title}" /> ">
      </a>

      <a href="<c:out value="${artClips[6].url}" />"><h2><c:out value="${artClips[6].title}" /></h2></a>
      <p><c:out value="${artClips[6].description}" /></p>

      <div class="castaclip-verticals-bottom-bar">
      <div class="castaclip-bypass castaclip-p-r">
          <span><i class="castaclip-icon castaclip-icon-calendar"></i><c:out value="${artClips[6].date}" /></span>
          <a href="<c:out value="${artClips[6].url}" />" class="castaclip-btn castaclip-verticals-btn-more-ico castaclip-ir castaclip-p-a"><c:out value="${artClips[6].title}" /></a>
      </div>
      </div>
    </div>
    
    <div class="castaclip-verticals-unit-3 castaclip-verticals-unit castaclip-verticals-unit-border-top span4 castaclip-p-r">
      <a class="castaclip-verticals-image-container castaclip-p-r" href="<c:out value="${artClips[7].url}" />">
        <img src="<c:out value="${artClips[7].thumb}" />/370x200.jpg" width="370" height="200" alt="<c:out value="${artClips[7].title}" />">
      </a>

      <a href="<c:out value="${artClips[7].url}" />"><h2><c:out value="${artClips[7].title}" /></h2></a>
      <p><c:out value="${artClips[7].description}" /></p>

      <div class="castaclip-verticals-bottom-bar">
      <div class="castaclip-bypass castaclip-p-r">
          <span><i class="castaclip-icon castaclip-icon-calendar"></i><c:out value="${artClips[7].date}" /></span>
          <a href="<c:out value="${artClips[7].url}" />" class="castaclip-btn castaclip-verticals-btn-more-ico castaclip-ir castaclip-p-a"><c:out value="${artClips[7].title}" /></a>
      </div>
      </div>
    </div>
  </div>
</div>

  <footer class="castaclip-verticals-footer">
    <div class="container castaclip-p-r">
        <a href="#go-to-top" class="castaclip-btn castaclip-btn-go-to-top castaclip-p-a"></a>
        <nav class="castaclip-p-a castaclip-verticals-nav castaclip-verticals-footer-nav-secondary">
          <ul>
            <li class="castaclip-verticals-copyright">Copyright (©) 2012 Castaclip</li>
            <li><a href="impressum.html">Impressum</a></li>
          </ul>
        </nav>
    </div>
</footer>

</body>
</html>