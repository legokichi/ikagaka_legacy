# Animation ####################################################################


class AnimationLayer extends Root
  
  constructor: (@surface, @id, @handler=->)->
    @animation = @surface.surface.animations[@id]
    @patterns = @animation.patterns
    @interval = @getInterval()
    @playing = false
    @none = document.createElement("canvas")
    @none.width = @none.height = 1
    @frame = @none
    @i = 0
    @wait = 0
    @count = 0


  getInterval: ->
    switch @animation.interval
      when "sometimes" then random(2)
      when "rarely"    then random(4)
      when "runonce"   then (if @count is 0 then 0 else Infinity)
      when "always"    then 0
      else                  Infinity

  getFrame: (now)->
    if @playing # playing animation
      if now > @wait # frame change
        id = Number @patterns[@i].surfaceID
        if id is -1 then @frame = @none
        else             @frame = @surface.shell.surfaces.surface[id].base
        @wait = now + @patterns[@i].wait
        @i++
        if !@patterns[@i]?
          @i = 0
          @playing = false
          @interval = now + @getInterval()
          @count++
          @handler()
    else if now > @interval # waiting interval timing
      @playing = true
    {
      cnv: @frame
      x: @patterns[@i].x
      y: @patterns[@i].y
      cmp: @patterns[@i].compositeOperation
    }


  random = (n)->
    ms = 0
    ms++ while 1/n < Math.random()
    ms*1000

