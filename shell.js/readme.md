Shell.js
======================
  Shell.js can render Ukagaka Shell

Demo
----------
* https://dl.dropbox.com/u/265158/GitHub/shell.js/index.html

Usage
----------
    new Nar("hoge.nar", function(nar){

      // set current shell
      shell = new Shell(nar.shell.master);
      
      // need file download and compose surface
      shell.createSurface(0, {
        touchEventListener: function(e){
          script = shiori.on(e);
          shell.playSakuraScript(script);
        }
      }, function(surface){
        document.body.appendChild(surface.el);
        surface.playAnimation(0, callback);
        surface.stopAnimation();
      });
    });

Features
----------------

Dependence
----------
* Nar.js <[Nar.js](https://github.com/legokichi/nar.js/)>
* Surfaces.js <[Surfaces.js](https://github.com/legokichi/surfaces.js/)>

License
----------
Creative Commons [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)

Copyright &copy; 2012 Legokichi Duckscallion

Acknowledgements
----------
* ls for developing the original Ukagaka software <[usada.sakura.vg](http://usada.sakura.vg/)>
* SSP project <[ssp.shillest.net](http://ssp.shillest.net/)> for high quality Ukagaka clones. (I did not use their code, but studied them extensively)
* Thanks for ["UKAGAKA" System Documentation Project](http://code.google.com/p/ukadoc/)

See also
----------
* [Ikagaka.js](https://github.com/legokichi/ikagaka.js/)

Author
----------
Legokichi Duckscallion