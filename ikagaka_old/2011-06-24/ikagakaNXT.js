(function(global){
	var Scope = function(obj){	// 如何かコアとは独立した描画処理系。jQuery、DOM、window依存。めざせWebGL！
		this.nar = obj.nar;
		this.PID = obj.PID;
		this.curShell = obj.curShell;
		this.curBalloon = obj.curBalloon;
		this.curScope = obj.curScope;
		this.curSurface = -1;
		this.curBlimp = -1;
		$("<div>")
			.addClass("scope scope" + this.curScope)
			.css({position:"absolute", visibility: "hidden", bottom: "0px", right: 250 * this.curScope + "px"})
			.append(
				$("<canvas>")
					.addClass("surface")
					.attr({width: "0", height: "0"})
				,$("<div>")
					.addClass("blimp")
					.css({position:"absolute", visibility: "hidden"})
					.append(
						$("<canvas>")
							.attr({width: "0", height: "0"})
							.css({"overflow-y": "hidden", "word-break": "break-all"})
					,$("<div>")
						.addClass("text")
					)
			)
			.appendTo("body");
		return this;
	};
	Scope.prototype.surface = function(id){
		$("#scope" + this.PID).appendTo("body");	// scopeを最前面に持ってくる処理
		$("#scope" + this.PID + ">canvas").
	};
	Scope.prototype.blimp = function(id){
	};
	global.Scope = Scope;

	var Named = function(nar){	// ゴースト1体分の管理オブジェクトを生成するコンストラクタ。windowに非依存。
		nar = nar || {
			homeurl: null,
			shell: {
				master: {
					descript: {},
					surface: {
						0: {
							src: localStorage["surface"],
						}
					},
				}
			},
		};	// プリインストールゴースト
		this.nar = nar;
		this.PID = Math.floor(Math.random() * (new Date()).getTime() * 10000);
		this.curShell = (function(){return "master";}());
		this.curBalloon = (function(){return null;}());
		this.curScope = 0;
	};
	Named.prototype.playEvent = function(obj, callback){
	};
	Named.prototype.playScript = function(str, callback){
	};
	Named.prototype.scope = (function(){	// スコープ管理システム
		var scopeAry = [];
		return function(num){
			if(! isFinite(Number(num))){
				return scopeAry[this.curScope];
			}
			this.curScope = Number(num);
			if(! scopeAry[this.curScope]){
				scopeAry[this.curScope] = new Scope(this);	// new Scope({/* map */})で渡すべき。 Scopeは今でこそ伺かのシェル仕様に従っているが、今後MMDなども扱うかも。
			}
			scopeAry[this.curScope].surface()	// scopeを最前面に持ってくる処理
			return scopeAry[this.curScope];
		};
	}());
	global.Named = Named;
	
	
}(this));