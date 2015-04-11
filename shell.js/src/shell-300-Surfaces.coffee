# surfaces #####################################################################


class Surfaces extends Root

  constructor: (text)->
    super
    extend(@, root(text))

  commentout = (text)->
    execmap /(?:(?:^|\s)\/\/.*)$|^\s+?$/g, text, ([match])->
      text = text.replace(match, "")
    text

  space = (text)->
    text
      .split(" ").join("")
      .split("\t").join("")

  root = (text)->
    defs = {}
    apnds = {}
    _text = commentout(space(text))
    execmap ///
      ([^\{\}]+) #head
      \{
      ([^\{\}]+) #body
      \}
    ///g, _text, ([_, head, body])->
      if /surface/.test(head)
        isApnd = /surface\.append/.test(head)
        for n in parseHead(compatibleHead(head))
          if isApnd
            apnds[n] ?= {}
            overwrite(apnds[n], parseBody(compatibleBody(body)))
          else
            defs[n] ?= {}
            overwrite(defs[n], parseBody(compatibleBody(body)))
    for n, srf of apnds then overwrite(defs[n], srf)
    {surface: defs}

  compatibleHead = (text)->
    execmap /\,surface(\d+)/g, text, ([match,num])->
      text = text.replace match, ","+num
    execmap /sakura/g, text, ([match])->
      text = text.replace match, "char0"
    execmap /kero/g, text, ([match])->
      text = text.replace match, "char1"
    text

  compatibleBody = (text)-> #seriko 1.0 -> 2.0
    execmap  ///
      (\d+)         #animationGroup
      interval\,
      (.+)          #interval
    ///g, text, ([match,
                  animId,
                  timing])-> #seriko 1.0 -> 2.0
      text = text.replace match,
        "animation#{animId}" +
        ".interval," +
        "#{timing}"
    execmap ///
      (\d+)           #animationGroup
      pattern(\d+)\,  #pattrnId
      (\-?\d+)\,      #surfaceId
      (\d+)\,         #interval
      (\w+)           #method
      (?:\,   
        (\-?\d+)\,    #offsetX
        (\-?\d+)      #offsetY
      )?
    ///g, text, ([match,
                 anmId,
                 ptnId,
                 srfId,
                 wait,
                 layer,
                 x,
                 y])-> #seriko 1.0 -> 2.0
      text = text.replace match,
        "animation#{anmId}" +
        ".pattern#{ptnId}," +
        "#{layer}," +
        "#{srfId}," +
        "#{wait}," +
        "#{x or 0}," +
        "#{y or 0}"
    text

  parseHead = (head)->
    head = head.replace(/surface/g, "")
    rjcts = []
    aplys = []
    execmap ///
      (\!)?        #notFlag
      (\d+)        #begin
      (?:\-(\d+))? #end
      \,?
    ///g, head, ([match,
                  isRjct,
                  begin,
                  end])->
      _begin = Number begin
      _end = Number end
      nums = if isFinite _end then [_begin.._end] else [_begin]
      if isRjct? then rjcts = rjcts.concat nums
      else            aplys = aplys.concat nums
    difference(unique(aplys), unique(rjcts))

  parseBody = (body)->
    collisions: parseCollisions(body)
    elements:   parseElements(body)
    animations: parseAnimations(body)

  parseCollisions = (body)->
    hash = {}
    execmap ///
      collision(\d+)\, #collisionId
      (\-?\d+)\,       #beginX
      (\-?\d+)\,       #beginY
      (\-?\d+)\,       #endX
      (\-?\d+)\,       #endY
      (\w+)            #id
    ///g, body, ([match,
                  n,
                  beginX,
                  beginY,
                  endX,
                  endY,
                  id])->
      hash[Number(n)] =
        x: Number(beginX)
        y: Number(beginY)
        width: Number(endX) - Number(beginX)
        height: Number(endY) - Number(beginY)
        name: id
    hash

  parseElements = (body)->
    hash = {}
    execmap ///
      element(\d+)\,   #elementId
      (\w+)\,          #pattern
      ([\w\.]+)        #filename
      (?:\,
        (\-?\d+)\,     #x
        (\-?\d+)       #y
      )?
    ///g, body, ([match,
                  n,
                  layer,
                  src,
                  x,
                  y])->
      hash[Number(n)] = 
        compositeOperation: layer
        src: src
        x: Number(x or 0)
        y: Number(y or 0)
    hash

  parseAnimations = (body)->
    return {} if !body?
    animNBodies = {}
    execmap ///
      animation(\d+)\.
      ([^\r\n]+)
    ///g, body, ([match
                  num,
                  str])->
      n = Number(num)
      animNBodies[n] = (animNBodies[n] or "") + "\r\n" + str
    hash = {}
    for i, body of animNBodies
      rslts = ///
        interval\,
        (.+)
      ///.exec(body)
      if rslts?
        hash[i] =
          interval: rslts[1]
          patterns: parsePatterns body
    hash

  parsePatterns = (body)->
    hash = {}
    execmap ///
      pattern(\d+)\,    #patternId
      (\w+)\,           #layer
      (\-?\d+)\,        #surfaceId
      (\d+)             #minWait
      (?:\-(\d+))?      #maxWait
      (?:\,  
        ([\-|\+]?\d+)\, #x
        ([\-|\+]?\d+)   #y
      )?
    ///g, body, ([__,
                  n,
                  layer,
                  num,
                  minWait,
                  maxWait,
                  x,
                  y])->
      hash[n] =
        compositeOperation: layer
        surfaceID: Number(num)
        wait: Number(minWait)
        x: Number(x or 0)
        y: Number(y or 0)
      if maxWait?
        hash[n].maxWait = Number(maxWait)
    hash


