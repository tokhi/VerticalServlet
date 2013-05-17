define("js/Player",[],function(){var e={};typeof castaclip=="undefined"&&(castaclip={});if(typeof castaclip.playersEventsHandler=="undefined"){e.EventsHandlerModel=Backbone.Model.extend({playerEvent:null,playerID:null});var t=Backbone.Collection.extend({model:e.EventsHandlerModel,handleEvent:function(e){if(!_.isUndefined(e)&&!_.isUndefined(e.playerID)){var t=this.find(function(t){return t.get("playerID")===e.playerID});typeof t!="undefined"&&typeof e!="undefined"&&t.set("playerEvent",e)}},getModelByPlayerID:function(e){return this.find(function(t){return t.get("playerID")===e})}});t.prototype.add=function(e){var t;if(!_.isUndefined(e)){if(_.isFunction(e.get))t=e.get("playerID");else{if(!!_.isUndefined(e.playerID))return!1;t=e.playerID}var n=this.any(function(e){return e.get("playerID")===t});return n?!1:(Backbone.Collection.prototype.add.call(this,e),!0)}return!1},castaclip.playersEventsHandler=new t}return e.Model=Backbone.Model.extend({actualClipID:null,actualClipIndex:null,playlist:null,slotID:null,defaults:{width:640,height:372,preloadPlaylist:!1,contextBased:!1,contextURL:null,playerSwfURL:"assets/player/749b5c1/player.swf",slotID:null,playMode:"auto",apiURL:"http://api.castaclip.net/api/v1.0",cdnBaseURL:"http://cdn.castaclip.net",playerID:null,parameters:{allowfullscreen:!0,allowscriptaccess:"always",allowscriptaccess:!0,wmode:"transparent"},flashVars:{bufferTime:0,playerTrackingUrl:"castaclip.playersEventsHandler.handleEvent",playerConfigUrl:"player-config.json",playMode:"click",muteMode:""}},initialize:function(e){if(_.isUndefined(e))throw new Error("Parameters are not defined");var t=_.defaults(_.pick(e,["width","height","preloadPlaylist","contextBased","contextURL","playerSwfURL","slotID","playMode","apiURL","cdnBaseURL"]),this.defaults);_.isBoolean(e.contextBased)&&e.contextBased===!0&&(t.contextBased=!0,_.isString(e.contextURL)&&$.trim(e.contextURL)!==""?t.contextURL=e.contextURL:/#[^!].*$/.test(window.location.href)===!0?t.contextURL=encodeURIComponent(window.location.href.split("#")[0]):t.contextURL=encodeURIComponent(window.location.href)),this.defaults.flashVars.playerConfigUrl=t.apiURL+"/slots/"+t.slotID+"/player/configuration/",t.contextBased===!0&&(this.defaults.flashVars.playerConfigUrl+="?context-url="+t.contextURL),t.flashVars=_.defaults(e.flashVars,this.defaults.flashVars),t.flashParameters=_.defaults(e.flashParameters,this.defaults.flashParameters);var n=!0;if(_.isNull(t.slotID)){if(_.isNull(t.flashVars.playerConfigUrl))throw new Error("slotID must be valid");n=!1}else t.contextBased===!0&&(t.playlistURL=t.apiURL+"/slots/"+t.slotID+"/playlist?context-url="+t.contextURL,t.flashVars.playlist=t.playlistURL);this.set(t),_.bindAll(this,"playerEventChangedHandler"),this.on("change:eventsHandler",this.eventHandlerSetHandler,this)},eventHandlerSetHandler:function(){_.bindAll(this,"eventHandlerSetHandler"),this.get("eventsHandler").on("change:playerEvent",this.playerEventChangedHandler)},playerEventChangedHandler:function(e){var t=e.get("playerEvent");if(t.trackAction==="playStartElement"){var n=this.get("playedClips")||[];_.isUndefined(this.get("playedClips"))?(n.push(t.movieID),this.trigger("playerStartPlaying")):t.movieID!==n[n.length-1]&&n.push(t.movieID),this.set("playedClips",n),this.set("actualPlayerEvent",t)}},getPreviewImageUrl:function(e,t,n){var r="http://api.castaclip.net/api/v1.0/";return r+="slots/"+this.get("slotID"),n!==!0&&(r+="/clips/"+this.get("id")),_.isNumber(e)&&_.isNumber(t)?r+"/banner?size="+e+"x"+t:null},getPlayer:function(){return _.isUndefined(this.player)&&this.setPlayer(),this.player},setPlayer:function(){this.player=swfobject.getObjectById(this.get("playerID"))},play:function(){this.getPlayer().playerPlay(),this.set("play",!0),this.set("pause",!1)},stop:function(){this.set("play",!1),this.set("pause",!0)},pause:function(){this.getPlayer().playerPause(),this.set("pause",!0),this.set("play",!1)},nextClip:function(){this.getPlayer().nextClip()},prevClip:function(){this.getPlayer().prevClip()},goToClipIndex:function(e){this.getPlayer().jumpToClip({id:e})},mute:function(e){this.getPlayer().mute(e)}}),e.View=Backbone.View.extend({initialize:function(e){this.application=e.application,this.$el.find(".cac-alternative-content").hide()},handleDefaults:function(e){},generatePlayerID:function(e){if(_.isBoolean(e)&&e===!0){var t="castaclip-player-",n=t+parseInt(Math.random()*1e16,10);while($("#"+n).length!==0)n=t+parseInt(Math.random()*1e16,10);return n}var r=this.model.get("playerID");if(_.isString(r)===!0&&$("#"+r).size()===0)this.$el.attr("id",r);else{var i=this.generatePlayerID(!0);this.model.set("playerID",i),this.$el.hasClass("castaclip-player")?$('<div id="'+i+'"></div>').appendTo(this.$el):$('<div id="'+i+'"></div>').appendTo(this.$el.find(".castaclip-player"))}},renderSwfPlayer:function(){var e=this,t,n=this.model.get("playerID"),r=this.model.get("width"),i=this.model.get("height");swfobject.hasFlashPlayerVersion("10.0.0")===!0?swfobject.embedSWF(this.model.get("playerSwfURL"),n,r,i,"10.0.0",!1,this.model.get("flashVars"),this.model.get("flashParameters"),{name:n},function(t){if(t.success!==!0)e.$el.find(".castaclip-player-flash-fallback").show();else{var n=e.model;_.isNull(n.get("playerID"))?n.on("change:playerID",this.afterPlayerIDLoaded,e):e.afterPlayerIDLoaded()}}):e.$el.find(".castaclip-player-flash-fallback").css({display:"block"})},afterPlayerIDLoaded:function(){var e=this.model.get("playerID"),t=this.model;t.off("change:playerID",this.afterPlayerIDLoaded),castaclip.playersEventsHandler.add({playerID:e}),t.set("eventsHandler",castaclip.playersEventsHandler.getModelByPlayerID(e)),t.get("eventsHandler").on("change:playerEvent",this.changePlayerEventHandler,this)},render:function(){return this.generatePlayerID(),this.model.get("preloadPlayer")&&renderSwfPlayer(),this.$el}}),e}),define("js/TimeRecorder",[],function(){var e;return e={_totalTime:0,_latestPlayDate:null,startRecording:function(){return this._latestPlayDate=(new Date).getTime(),!0},stopRecording:function(){return this._latestPlayDate!==null&&(this._totalTime+=(new Date).getTime()-this._latestPlayDate),this._latestPlayDate=null,!0},getRecordedTime:function(){return this._totalTime},getTotalTrackedTime:function(){return null!==this._latestPlayDate?this._totalTime+((new Date).getTime()-this._latestPlayDate):this._totalTime},setTotalTime:function(e){this._totalTime=e},clearTotalTime:function(){return this._totalTime=0,this._latestPlayDate=null,!0}},e}),define("text!js/templates/skip-button.tpl",[],function(){return'<a class="castaclip-btn castaclip-btn-zow-skip castaclip-p-a" style="display: block; overflow: hidden; width: 70px;">\n  <div class="castaclip-bypass castaclip-p-r">\n    <i class="castaclip-icon-dislike castaclip-p-a"></i>\n    <span class="castaclip-p-a" style="display: none;">\n      <h3 class="castaclip-title">ZAP</h3>\n      <p>to skip the clip</p>\n    </span>\n  </div>\n</a>'}),define("text!js/templates/watch-button.tpl",[],function(){return'<a class="castaclip-btn castaclip-btn-zow-watch castaclip-p-a" style="display: block; overflow: hidden; width: 70px;">\n  <div class="castaclip-bypass castaclip-p-r">\n    <i class="castaclip-icon-like castaclip-p-a"></i>\n    <span class="castaclip-p-a" style="display: none;">\n      <h3 class="castaclip-title">WATCH</h3>\n      <p>to watch the clip</p>\n    </span>\n  </div>\n</a>'}),define("text!js/templates/overlay.tpl",[],function(){return'<div class="castaclip-transparency-layer castaclip-overlay castaclip-p-a">\n  <div class="castaclip-zow-help-container castaclip-bypass castaclip-p-r">\n    <p class="castaclip-zow-help-text-watch castaclip-zow-help-text castaclip-p-a">Click the watch button if the<br />clip is interesting and You<br />want to watch it</p>\n    <p class="castaclip-zow-help-text-skip castaclip-zow-help-text castaclip-p-a">Click the zap button if the<br />clip is boring and You want<br />to go to the next one</p>\n  </div>\n</div>'}),define("js/Disorlike",["js/TimeRecorder","js/Player","text!js/templates/skip-button.tpl","text!js/templates/watch-button.tpl","text!js/templates/overlay.tpl"],function(e,t,n,r,i){var s={};return s.View=t.View.extend({options:{watchButoonClass:".castaclip-btn-zow-watch",skipButtonClass:".castaclip-btn-zow-skip",saveZone:100,duration:500,textAnimationDuration:200,begin:{width:0},end:{width:0}},preroll:!1,MAX_TIMEOUT:17e3,timerObject:e,setTimeoutObject:null,setTimeoutHandler:function(){this.timerObject.getTotalTrackedTime()<this.MAX_TIMEOUT||(this.model.pause(),this.displayGameFunctionality(),this.reachedDisorlikeFunctionalityFlag=!0)},initialize:function(e){_.bindAll(this,"eventsHandlerReadyHandler","playerStartPlayingHandler","startLikeButtonAnimation","stopLikeButtonAnimation","startDislikeButtonAnimation","stopDislikeButtonAnimation","playerEventsHandler","setTimeoutHandler","rebindButtonEvents"),this.model.on("change:eventsHandler",this.eventsHandlerReadyHandler),this.model.on("playerStartPlaying",this.playerStartPlayingHandler),t.View.prototype.initialize.call(this,e)},eventsHandlerReadyHandler:function(e){this.model.off("change:eventsHandler",this.eventsHandlerReadyHandler),this.model.get("eventsHandler").on("change:playerEvent",this.playerEventsHandler)},playerStartPlayingHandler:function(){var e=this;$("body").on("mouseover",function(){$("body").off("mouseover"),e.model.mute(!1),_gaq.push(["_trackEvent","Events","pb-u"]),$("body").append('<img src="'+trackingURL+"/pixel-pb-u.gif?slotID="+e.model.get("slotID")+"&cb="+parseInt(Math.random()*1e16,10)+'" style="display: none" />');var t=e.model;if(e.application.options.gameFunctionality===!1){e.application.options.gameFunctionality=!0;var n=!_.isUndefined(t.get("actualPlayerEvent"))&&t.get("actualPlayerEvent").movieCategory==="ad";e.preroll=!0,t.getPlayer().updateAdConfig({adConfig:"noprerolls"}),t.goToClipIndex(0)}})},truncateString:function(e,t){var n=e.length>t;return n===!0?(e=e.substr(0,t-1),e.substr(0,e.lastIndexOf(" "))+"..."):e},playerEventsHandler:function(e){var t=e.get("playerEvent"),n=this.MAX_TIMEOUT;if(this.application.options.gameFunctionality===!0){if(t.trackAction==="playStartElement"){this.timerObject.clearTotalTime(),this.reachedDisorlikeFunctionalityFlag=!1;if(t.movieCategory!=="ad"){this.preroll=!this.preroll,this.model.getPlayer().updateAdConfig({adConfig:this.preroll===!0?"":"noprerolls"}),this.votedClip=!1,this.showDisorlikeButtons();var r=this.timerObject.getRecordedTime();this.timerObject.startRecording(),this.setTimeoutObject=setTimeout(this.setTimeoutHandler,n-r);var i="",s="";i=this.truncateString(t.title,60),s=this.truncateString(t.desc,310),$(".castaclip-verticals-zow-video-title").text(i),$(".castaclip-info-container p").text(s)}else this.adStartTime=(new Date).getTime(),this.hideGameFunctionality()}else if(t.trackAction!=="playStopElement")if(t.trackAction==="play"){if(!this.votedClip){var r=this.timerObject.getRecordedTime();this.timerObject.startRecording(),this.setTimeoutObject=setTimeout(this.setTimeoutHandler,n-r)}}else t.trackAction==="pause"&&(this.timerObject.stopRecording(),clearTimeout(this.setTimeoutObject))}else t.trackAction==="playStartElement"&&(this.timerObject.clearTotalTime(),this.timerObject.startRecording())},templates:{transparencyLayer:i,likeButton:r,dislikeButton:n},render:function(){var e=this.application.models.playerModel,n="";return n+=this.templates.transparencyLayer,n+=this.templates.likeButton,n+=this.templates.dislikeButton,this.application.options.gameFunctionality===!1&&(n+='<div class="castaclip-transparency-layer castaclip-overlay castaclip-loading castaclip-p-a"></div>'),this.$el.append(n),this.$(".castaclip-transparency-layer").eq(0).hide(),this.setInitialAnimationOptions(),t.View.prototype.render.call(this),t.View.prototype.renderSwfPlayer.call(this),this.setDimensions(),this.bindButtonEvents(),this.stopDislikeButtonAnimation(),this.stopLikeButtonAnimation(),this.$el},setDimensions:function(){var e=this.model.get("width")+"px",t=this.model.get("height")+"px";this.$(".castaclip-player, .castaclip-transparency-layer").width(e).height(t)},setInitialAnimationOptions:function(){this.options.begin.width="70px",this.options.end.width=(parseInt(this.$el.width(),10)-this.options.saveZone)/2+"px"},bindButtonEvents:function(){var e=this.$(this.options.watchButoonClass),t=this.$(this.options.skipButtonClass),n=this;e.on("mouseenter",this.startLikeButtonAnimation),e.on("mouseleave",this.stopLikeButtonAnimation),t.on("mouseenter",this.startDislikeButtonAnimation),t.on("mouseleave",this.stopDislikeButtonAnimation),t.on("click",function(){return n.dislikeClipHandler(),!1}),e.on("click",function(){return n.likeButtonClickHandler(),!1})},rebindButtonEvents:function(){var e=this.$(this.options.watchButoonClass),t=this.$(this.options.skipButtonClass),n=this;e.on("mouseenter",this.startLikeButtonAnimation),e.on("mouseleave",this.stopLikeButtonAnimation),t.on("mouseenter",this.startDislikeButtonAnimation),t.on("mouseleave",this.stopDislikeButtonAnimation)},startLikeButtonAnimation:function(){var e=this.options.textAnimationDuration,t=this.$(this.options.watchButoonClass+" span").stop(),n=this.$(this.options.watchButoonClass).stop();n.animate({width:this.options.end.width},this.options.duration,function(){t.fadeIn(e)})},stopLikeButtonAnimation:function(){var e=this.options.duration,t=this.options.begin.width,n=this.$(this.options.watchButoonClass+" span").stop(),r=this.$(this.options.watchButoonClass).stop();n.fadeOut(this.options.textAnimationDuration,function(){r.animate({width:t},e)})},startDislikeButtonAnimation:function(){var e=this.options.textAnimationDuration,t=this.$(this.options.skipButtonClass+" span").stop(),n=this.$(this.options.skipButtonClass).stop();n.animate({width:this.options.end.width},this.options.duration,function(){t.fadeIn(e)})},stopDislikeButtonAnimation:function(){var e=this.options.duration,t=this.options.begin.width,n=this.$(this.options.skipButtonClass+" span").stop(),r=this.$(this.options.skipButtonClass).stop();n.fadeOut(this.options.textAnimationDuration,function(){r.animate({width:t},e)})},startLayerAnimation:function(){this.$(".castaclip-transparency-layer").show().animate({opacity:1},this.options.duration)},stopLayerAnimation:function(){this.$(".castaclip-transparency-layer").animate({opacity:0},this.options.duration,function(){$(this).hide()})},displayGameFunctionality:function(){this.$(this.options.skipButtonClass+", "+this.options.watchButoonClass).off("mouseenter"),this.$(this.options.skipButtonClass+", "+this.options.watchButoonClass).off("mouseleave"),this.startLayerAnimation(),this.startDislikeButtonAnimation(),this.startLikeButtonAnimation()},hideGameFunctionality:function(){this.$(this.options.skipButtonClass+", "+this.options.watchButoonClass).hide()},showDisorlikeButtons:function(){this.$(this.options.skipButtonClass+", "+this.options.watchButoonClass).show()},dislikeClipHandler:function(){this.votedClip=!0;var e=this.application.models.playerModel.get("playedClips"),t="null";e&&e.length>0&&(t=e[e.length-1]+""),_gaq.push(["_trackEvent","Events","dislike click",t]);var n=this.application.views.disorlikeView,r=this.application.models.playerModel;return n.reachedDisorlikeFunctionalityFlag===!1&&(n.preroll=!0,r.getPlayer().updateAdConfig({adConfig:"noprerolls"})),this.model.nextClip(),this.stopLikeButtonAnimation(),this.stopDislikeButtonAnimation(),this.stopLayerAnimation(),this.rebindButtonEvents(),!1},likeClipHandler:function(){this.votedClip=!0;var e=this.application.models.playerModel.get("playedClips"),t="null";e&&e.length>0&&(t=e[e.length-1]+""),_gaq.push(["_trackEvent","Events","like click",t]),this.timerObject.clearTotalTime(),clearTimeout(this.setTimeoutObject),this.stopLikeButtonAnimation(),this.stopDislikeButtonAnimation(),this.stopLayerAnimation(),this.rebindButtonEvents(),this.model.play()},likedClipHandler:function(){},likeButtonClickHandler:function(){this.likeClipHandler()},notifyClipIDChange:function(e){this.actualClipID!==e&&(this.actualClipID=e)}}),s}),_.templateSettings={interpolate:/\{\{(.+?)\}\}/g};var trackingURL="http://cdn.castaclip.net/tracking";requirejs.config({baseUrl:"./",paths:{text:"js/vendor/requirejs/plugins/text"}}),requirejs(["js/Player","js/Disorlike"],function(e,t){$("body").append('<img src="'+trackingURL+"/pixel-loading.gif?slotID="+window.slotID+"&cb="+parseInt(Math.random()*1e16,10)+'" style="display: none" />');var n=window.location.href.split("?")[1],r=!0,i=function(n,r){var i={articleID:"home",slotID:window.slotID};n===!0&&(_gaq.push(["_trackEvent","Events","pb"]),$("body").append('<img src="'+trackingURL+"/pixel-pb.gif?slotID="+i.slotID+"&cb="+parseInt(Math.random()*1e16,10)+'" style="display: none" />'));var s="http://cdn.castaclip.net/mediacase/disorlike/"+i.articleID,o="http://api.castaclip.net/api/v1.0/slots/",u={};u.models={},u.views={},u.options={playMode:"auto",playerSwfURL:"./assets/player/749b5c1/player.swf?slotID="+i.slotID,gameFunctionality:r};var a=u.options;u.models.playerModel=new e.Model({playerSwfURL:a.playerSwfURL,flashVars:{videoplazaFlags:n?"":"noprerolls",muteMode:n?"normal":""},width:a.width,height:a.height,slotID:i.slotID,playMode:a.playMode,contextBased:_.isBoolean(window.contextBased)?window.contextBased:!1}),u.views.disorlikeView=new t.View({application:u,model:u.models.playerModel,el:$(".castaclip-gate-container")}),$(function(){u.views.disorlikeView.render(),u.views.disorlikeView.hideGameFunctionality(),n===!0&&$(".castaclip-gate-container").append('<div calass="castaclip-p-a castaclip-loading castaclip-loading-dark" style="width: 640px; height: 372px; top: 0; left: 15px;"></div>'),$("body").append('<img src="'+trackingURL+"/pixel-end.gif?slotID="+u.models.playerModel.get("slotID")+"&cb="+parseInt(Math.random()*1e16,10)+'" style="display: none" />')})};n&&n.indexOf("c")===0?(n=!0,$("body").on("mouseover",function(){window.location.href=window.location.href.split("?")[0]}),r=!1,n=!0,i(n,r)):(n=!1,i(n,r))}),define("js/init",function(){})