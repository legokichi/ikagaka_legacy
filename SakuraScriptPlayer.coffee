

class SakuraScriptPlayer
  # new SakuraScriptPlayer(named:Named):SakuraScriptPlayer
  constructor: (@named)->
  # SakuraScriptPlayer#play(script:SakuraScriptString, callback:Function():void):void
  play: (script, callback)->
    if script.length is 0 then return setTimeout((=> @break() ), 10000)
    reg =
      "Y0": /^\\0/
      "Y1": /^\\1/
      "Yp": /^\\p\[(\d+)\]/
      "Ys": /^\\s\[([^\]]+)\]/
      "Yb": /^\\b\[([^\]]+)\]/
      "Yi": /^\\i\[(\d+)\]/
      "YwN": /^\\w(\d+)/
      "Y_w": /^\\_w\[(\d+)\]/
      "Yq": /^\\q\[([^\]]+)\]/
      "Y_aS": /^\\_a\[([^\]]+)\]/
      "Y_aE": /^\\_a/
      "Yc": /^\\c/
      "Yn": /^\\n/
      "YnH": /^\\n\[half\]/
      "YY": /^\\\\/
      "Ye": /^\\e/
    switch true
      when reg["Y0"].test(script)  then _script = script.replace(reg["Y0"],  ""); @named.scope(0)
      when reg["Y1"].test(script)  then _script = script.replace(reg["Y1"],  ""); @named.scope(1)
      #when reg["Yp"].test(script)  then _script = script.replace(reg["Yp"],  ""); @named.scope(Number(reg["Yp"].exec(script)[1]))
      when reg["Ys"].test(script)  then _script = script.replace(reg["Ys"],  ""); @named.scope().surface(Number(reg["Ys"].exec(script)[1]))
      when reg["Yb"].test(script)  then _script = script.replace(reg["Yb"],  ""); @named.scope().balloon(Number(reg["Yb"].exec(script)[1]))
      #when reg["Yi"].test(script)  then _script = script.replace(reg["Yi"],  ""); @named.scope().surface().playAnimation(Number(reg["Yi"].exec(script)[1]), ->)
      when reg["YwN"].test(script) then _script = script.replace(reg["YwN"], ""); wait = Number(reg["YwN"].exec(script)[1])*100
      when reg["Y_w"].test(script) then _script = script.replace(reg["Y_w"], ""); wait = Number(reg["Y_w"].exec(script)[1])
      #when reg["Yq"].test(script)  then _script = script.replace(reg["Yq"],  ""); [title, id] = reg["Yq"].exec(script)[1].split(",", 2); @named.scope().balloon().select(title, id)
      when reg["YnH"].test(script) then _script = script.replace(reg["YnH"], ""); @named.scope().balloon().br()
      when reg["Yn"].test(script)  then _script = script.replace(reg["Yn"],  ""); @named.scope().balloon().br()
      when reg["Yc"].test(script)  then _script = script.replace(reg["Yc"],  ""); @named.scope().balloon().clear()
      when reg["Ye"].test(script)  then _script = ""
      when reg["YY"].test(script)  then _script = script.replace(reg["YY"],  ""); @named.scope().balloon().talk("\\")
      else                              _script = script.slice(1);                @named.scope().balloon().talk(script[0])
    setTimeout((=> @play(_script, callback)), 80)
    undefined
  # SakuraScript#break():void
  break: ->
    @named.scope(0).balloon(-1)
    @named.scope(1).balloon(-1)
