# Shell ########################################################################


class this.Shell extends Root

  constructor: (@nar, @id, cb)->
    super
    shell = @nar.shell[@id]
    loadSurfaces shell, (surfaces)=>
      loadBaseSurfaces shell, surfaces, (surfaces)=>
        composeBaseSurfaces shell, surfaces, (@surfaces)=>
          cb(@)


  loadSurfaces = (shell, cb)->
    shell["surfaces.txt"].load (text)->
      cb(new Surfaces(text))
    undefined

  loadBaseSurfaces = (shell, surfaces, cb)->
    que = new TaskQueue()
    for filename, file of shell when /surface(\d+)\.png/.test(filename) then do (file)->
      que.push (surfaces, next)->
        loadBaseSurface shell, surfaces, file, (surfaces)-> next(surfaces)
    que.run surfaces, (surfaces)-> cb(surfaces)
    undefined

  loadBaseSurface = (shell, surfaces, file, cb)->
    console.log "unzipping #{file.filename}"
    id = Number /surface(\d+)\.png/.exec(file.filename)[1]
    srf = surfaces.surface[id] ?= {}
    file.load (img)->
      srf.base = transImage(img)
      cb(surfaces)
    undefined

  composeBaseSurfaces = (shell, surfaces, cb)->
    que = new TaskQueue()
    for id, srf of surfaces.surface then do (srf)->
      que.push (surfaces, next)->
        loadElements shell, srf, (elms)->
          srf.base ?= copyCanvas(new Image())
          srf.base = composeElements(srf.base, elms)
          next(surfaces)
    que.run surfaces, (surfaces)-> cb(surfaces)

  loadElements = (shell, srf, cb)->
    que = new TaskQueue()
    for n, elm of srf.elements then do (elm)->
      que.push (elms, next)->
        loadElement shell, elm, (elm)->
          elms.push(elm)
          next(elms)
    que.run [], (elms)-> cb(elms)
    undefined

  loadElement = (shell, elm, cb)->
    console.log "unzipping #{elm.src}"
    shell[elm.src].load (img)->
      cb({
        cnv: transImage(img)
        x:   elm.x
        y:   elm.y
        cmp: elm.compositeOperation
      })
    undefined


