class window.SurfaceDefine
  constructor: (shell, id, callback)->
    n = id # alias process
    if @surfaceCache[n]? # use cache
      return setTimeout => callback(@surfaceCache[n])
    if !@surfaces[n]? and !@surfaceN[n]? # undefined and non-exist surface
      return setTimeout -> callback(false)
    if !@surfaces[n]? and  @surfaceN[n]? # non-exist surface
      return @surfaceN[n] (img)-> 
        srfdef = {collisions: null, elements: null, animations: null}
        srfdef.baseSurfaceCanvas = util.transImg(img)
        callback srfdef
    srfdef = util.deepcopy @surfaces[n]
    @surfaceN[n] (img)=>
      if img then elmingCnv = util.transImg(img)
      else        elmingCnv = util.whiteCanvas()
      recursiveCall = (i)=>
        elm = srfdef.elements[i++]
        unless elm?
          srfdef.surfaceNumber = n
          srfdef.baseSurfaceCanvas = elmingCnv
          @surfaceCache[n] = srfdef
          return callback(srfdef)
        {layer, src, x, y} = elm
        @filelist[src] (img)=>
          if elmingCnv.width * elmingCnv.height is 0 then layer = "base"
          elmingCnv = switch layer
            when "base" then util.transImg(img)
            else             util.overlayfast elmingCnv, util.transImg(img), x, y
          recursiveCall(i)
      recursiveCall(0)