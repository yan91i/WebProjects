/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

//in case it's running on node.js
let win = {};

if (typeof window !== "undefined") {
    win = window;
}

var Detector = {

    canvas: !! win.CanvasRenderingContext2D,
    webgl: ( function () {

        try {

            var canvas = document.createElement( 'canvas' ); return !! ( win.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }

    } )(),
    workers: !! win.Worker,
    fileapi: win.File && win.FileReader && win.FileList && win.Blob,

     Check_Version: function() {
         var rv = -1; // Return value assumes failure.

         if (navigator.appName == 'Microsoft Internet Explorer') {

             var ua = navigator.userAgent,
                 re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

             if (re.exec(ua) !== null) {
                 rv = parseFloat(RegExp.$1);
             }
         }
         else if (navigator.appName == "Netscape") {
             /// in IE 11 the navigator.appVersion says 'trident'
             /// in Edge the navigator.appVersion does not say trident
             if (navigator.appVersion.indexOf('Trident') !== -1) rv = 11;
             else{
                 var ua = navigator.userAgent;
                 var re = new RegExp("Edge\/([0-9]{1,}[\\.0-9]{0,})");
                 if (re.exec(ua) !== null) {
                     rv = parseFloat(RegExp.$1);
                 }
             }
         }

         return rv;
     },

    supportVideoTexture: function () {
        //ie 11 and edge 12 doesn't support video texture.
        var version = this.Check_Version();
        return (version === -1 || version >= 13);
    },

    isLiveStreamOnSafari: function (videoElement) {
        //live stream on safari doesn't support video texture
        var videoSources = [].slice.call(videoElement.querySelectorAll("source"));
        var result = false;
        if(videoElement.src && videoElement.src.indexOf('.m3u8') > -1){
            videoSources.push({
                src: videoElement.src,
                type: "application/x-mpegURL"
            });
        }
        for(var i = 0; i < videoSources.length; i++){
            var currentVideoSource = videoSources[i];
            if((currentVideoSource.type === "application/x-mpegURL" || currentVideoSource.type === "application/vnd.apple.mpegurl") && /(Safari|AppleWebKit)/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)){
                result = true;
                break;
            }
        }
        return result;
    },

    getWebGLErrorMessage: function () {

        var element = document.createElement( 'div' );
        element.id = 'webgl-error-message';

        if ( ! this.webgl ) {

            element.innerHTML = win.WebGLRenderingContext ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' ) : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
            ].join( '\n' );

        }

        return element;

    },

    addGetWebGLMessage: function ( parameters ) {

        var parent, id, element;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        element = Detector.getWebGLErrorMessage();
        element.id = id;

        parent.appendChild( element );

    }

};

export default Detector;