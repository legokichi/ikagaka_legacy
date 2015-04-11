# surface ######################################################################


class this.Surface extends Root

  constructor: (@shell, @id, handler, cb)->
    super
    @surface = @shell.surfaces.surface[@id]
    @canvas = copyCanvas(@surface.base)
    @click = @createEventListener("OnMouseClick", handler)
    @canvas.addEventListener("click", @click)
    @animationLayers = {}
    for n of @surface.animations
      @animationLayers[n] = new AnimationLayer(@, n)
    render = =>
      if @rendering
        @draw()
        requestAnimationFrame(render)
    @rendering = true
    @showFPS = true
    @showCollision = false
    @old = Date.now()
    requestAnimationFrame(render)
    cb(@)

  destructor: ->
    @rending = false
    @canvas.removeEventListener("click", @click)
    super

  draw: ->
    now = Date.now()
    past = now - @old
    @fps = 1000/past|0
    clearCanvas(@canvas)
    drawImage(@canvas, @surface.base, 0, 0)
    for n, layer of @animationLayers
      {x, y, cnv, cmp} = layer.getFrame(now)
      drawImage(@canvas, cnv, x, y, cmp)
    ctx = @canvas.getContext("2d")
    if @showCollision
      ctx.strokeStyle = "rgb(200, 0, 0)";
      for n, collision of @surface.collisions
        {x, y, width, height, name} = collision
        ctx.strokeRect(x, y, width, height)
    if @showFPS
      ctx.font = "18px 'Unknown Font'";
      ctx.fillText(@fps, 10, 20);
    @old = now
    undefined

  createEventListener: (id, handler)->
    (e)=>
      offset = calcOffset(e)
      if isHit(@canvas, offset.x, offset.y)
        e.preventDefault()
        e.stopPropagation()
        event =
          "ID": id
          "Reference0": offset.x
          "Reference1": offset.y
          "Reference2": 0
          "Reference3": null
          "Reference4": ""
          "Reference5": 0
        delete event.Reference5 if id is "OnMouseMove"
        for n, collision of @surface.collisions
          {x, y, width, height, name} = collision
          if x < offset.x < x+width and y < offset.y < y+height
            event.Reference4 = name
        handler(event)
      undefined






