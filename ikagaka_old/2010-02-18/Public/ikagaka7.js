window.onerror = function(mes,file,num){ alert([ "file : " + file, "line : " + num, "message : " + mes ].join("\n")); return true; }
window.onload = IkagakaBootLoader;

function IkagakaBootLoader(){
////////////如何かブートローダー
	$("#EXAM").text("");
	$("#log").text("");
	$("#log").append("「如何か。」起動開始。<br />\n");

//////////ロード
	SurfaceLoader();
	BalloonLoader();

//////////変数の初期化
	$("#log").append("　初期化開始。<br />\n");

	Scope = new Number(0);
	NowSurface = new Array();
		NowSurface[0] = Surface[0];
		NowSurface[1] = Surface[10];
	NowBalloon = new Array();
		NowBalloon[0] = Balloon.s.L[0];
		NowBalloon[1] = Balloon.k.R[0];
	NowBalloonText = new Array();
		NowBalloonText[0] = new String();
		NowBalloonText[1] = new String();
	SakuraScript = new String();
	RemainScript = new String();
	AddScript = new String();
	Wait = new Number(0);
	Tid = new Number(0);

	$("#log").append("　完了。<br />\n");

//////////基礎構築
	rickDOM();
	rickCSS();

//////////タスク起動
	SurfaceMgr();
	BalloonMgr();

//////////タスク起動
//	EventMgr();

//	$("#Sakura").draggable({opacity:1,cursor:'move',axis:'x'});
//	$("#Kero").draggable({opacity:1,cursor:'move',axis:'x'});
	$("#SakuraCollision0").dblclick(function(){OnMouseDoubleClick("Head")});
	$("#SakuraCollision1").dblclick(function(){OnMouseDoubleClick("Face")});
	$("#SakuraCollision2").dblclick(function(){OnMouseDoubleClick("Bust")});
//	$("#SakuraSurface").dblclick(function(){OnMouseDoubleClick("Sakura")});
	$("#Kero").dblclick(function(){OnMouseDoubleClick("Kero")});

//	$("#Sakura").draggable({/*opacity:0.5,*/cursor:'move',axis:'x'});
//	$("#Kero").draggable({/*opacity:0.5,*/cursor:'move',axis:'x'});

	$("#SakuraBalloon").css("visibility","hidden");
	$("#KeroBalloon").css("visibility","hidden");

	var popup = new PopupMenu();
	popup.bind(document.getElementById("Sakura"));
	popup.add('あんいんすとーる', function(){Player("\\0\\s[0]\\1そんなことをすれば海が汚染されるぞ\\w8\\0\\s[3]されないされない。\\e")});
	popup.addSeparator();
	popup.add('終了', function(){Player("\\0\\s[5]窓を閉じてください。\\e")});

	SakuraScript = "\\0テキストボックスにSakuraScriptを入力して実行してください。\\w8\\e";

//////////えんいー
	$("#log").append("起動完了。<br />\n");

	Player(SakuraScript);
}







function OnClose(){	//バルーン非表示
	clearTimeout(Tid);
	NowBalloonText[0] = "";
	NowBalloonText[1] = "";
	$("#SakuraBalloon").css("visibility","hidden");
	$("#SakuraBalloonText").val(new String());
	$("#KeroBalloon").css("visibility","hidden");
	$("#KeroBalloonText").val(new String());
}

function Player(_){
	clearTimeout(Tid);
	NowBalloonText[0] = "";
	NowBalloonText[1] = "";
	$("#SakuraBalloon").css("visibility","hidden");
	$("#SakuraBalloonText").text("");
	$("#KeroBalloon").css("visibility","hidden");
	$("#KeroBalloonText").text("");
	Analyzer(_);
}

function Analyzer(_){
	RemainScript = _;
	AddScript = "";
//状態変更
	if(RemainScript.match(/^\\0/) || RemainScript.match(/^\\h/)){	//さくら
		Scope = 0;
		RemainScript = RemainScript.substr(2);
	}else if(RemainScript.match(/^\\1/) || RemainScript.match(/^\\u/)){	//うにゅう
		Scope = 1;
		RemainScript = RemainScript.substr(2);
	}else if(RemainScript.match(/^\\n/)){	//改行
		AddScript = "\n";
		RemainScript = RemainScript.substr(2);
	}else if(RemainScript.match(/^\\c/)){	//バルーンクリア
		NowBalloonText[Scope] = "";
		RemainScript = RemainScript.substr(2);
	}else if(RemainScript.match(/^\\w[1-9]/)){	//ウエイト
		Wait = RemainScript.substr(2,1)*50;
		RemainScript = RemainScript.substr(3);
	}else if(RemainScript.match(/^\\_w\[\d+\]/)){	//精密ウエイト
		Wait = RemainScript.substr(4).match(/^\d+/);
		RemainScript = RemainScript.replace(/^\\_w\[\d+\]/,'');
	}else if(RemainScript.match(/^\\s\[\d+\]/)){	//サーフェス切り替え
		NowSurface[Scope] = Surface[RemainScript.substr(3).match(/^\d+/)];
		RemainScript = RemainScript.replace(/^\\s\[\d+\]/,'');
	}else if(RemainScript.match(/^\\e/)){	//えんいー
		Tid = setTimeout("OnClose()",5000);
	}else{
		AddScript = RemainScript.substr(0,1);
		RemainScript = RemainScript.substr(1);
	}
//サーフェス
	SurfaceMgr();
//バルーン
	if(AddScript){
	NowBalloonText[Scope] += AddScript;
		if(Scope){
			$("#KeroBalloon").css("visibility","visible");
			$("#KeroBalloonText").val(NowBalloonText[Scope]);
		}else{
			$("#SakuraBalloon").css("visibility","visible");
			$("#SakuraBalloonText").val(NowBalloonText[Scope]);
		}
	}
//制御
	if(RemainScript.length>0){
		Tid = setTimeout("Analyzer(RemainScript)",50);
	}else{
		Tid = setTimeout("OnClose()",5000);
	}
}

function OnBoot(){	//フォームからSakuraScuript入力
	SakuraScript = new String($("#msg").val());
	Player(SakuraScript);
}

function OnMouseDoubleClick(_){	//触り反応
	a = new String(_);
	if(a.match(/^Head/)){
		SakuraScript = new String("\\0\\s[1]撫で機能は付いていません。\\w8\\1\\s[10]つつくな危険。\\e");
	}else if(a.match(/^Face/)){
		SakuraScript = new String("\\0\\s[6]目に入りますやめてください。\\w8\\1\\s[10]おぉ痛そう。\\e");
	}else if(a.match(/^Bust/)){
		SakuraScript = new String("\\0\\s[2]きゃっ\\w8\\n\\s[1]サイテーな人です。\\w8\\e");
	}else if(a.match(/^Kero/)){
		SakuraScript = new String("\\1あー\\w8\\w8\\nワイを突っついても無駄やで。\\w8\\w8\\0\\s[5]バケネコだもんね。\\w8\\e");
	}else{
		SakuraScript = new String("\\0\\s[6]めにゅーとかはありません。\\w8\\n\\1\\s[11]バルーンがテキストエリアなのでタグとか仕込めません。\\w8\\n\\0\\s[2]スクロールさせるだけなら素直にＤＩＶとＣＳＳを\\1\\s[10]それ以上は言うな。\\0\\s[3]ハイ。\\e");
	}
	Player(SakuraScript);
}




















































//////////////////////////////// Loader //////////////////////////////////

function SurfaceLoader(){
///////////サーフィス読込
	$("#log").append("　「surface.txt」読込開始。<br />\n");

	SurfaceText = new String();
	SurfaceText = $("#surface").text();
	SurfaceText = SurfaceText.replace(/\r\n/g,"\n");
	SurfaceText = SurfaceText.replace(/\r/g,"\n");
	SurfaceTextLine = new Array();
	SurfaceTextLine = SurfaceText.split("\n");

	$("#log").append("　　"+SurfaceTextLine.length+"行。<br />\n");

	Surface = new Array();
	a = new Boolean();
	b = new Boolean();
	num = new Number();
	for(i=0;i<SurfaceTextLine.length;i++){
		str = SurfaceTextLine[i].match(/^surface\d+/i)
		if(str&&a!=1){
			a=1;
			num = SurfaceTextLine[i].substr(7);
			Surface[num] = new Array();
			Surface[num]["Image"] = new Image();
			Surface[num]["Image"].src = "./img/surface"+num+".png"
		//何故かここでURL読込
			$("#log").append("　　「surface"+num+"」読込開始。<br />\n");
			$("#log").append("　　　「"+Surface[num]["Image"].src+"」読込。<br />\n");
		}else if(a==1){
			if(SurfaceTextLine[i].match(/^\{/)){
				b=1;
			}else if(b==1){
				if(SurfaceTextLine[i].match(/^\}/)){
					a="";
					b="";
					$("#log").append("　　完了。<br />\n");
				}else{
					str=SurfaceTextLine[i].match(/^collision\d+,\d+,\d+,\d+,\d+,.+/i);
					if(str){
						str2=str[0].split(",");
						Surface[num][str2[0]] = str[0];
						$("#log").append("　　　「"+str2[0]+"」読込。<br />\n");
					}
				}
			}
		}
	}

	$("#log").append("　完了。<br />\n");
}



function BalloonLoader(){
///////////バルーン読込
	$("#log").append("　デフォルトバルーン読込開始。<br />\n");

	Balloon = new Array();
	Balloon["s"] = new Array();
	Balloon["s"]["L"] = new Array();
	Balloon["s"]["R"] = new Array();
	Balloon["s"]["L"][0] = new Image();
	Balloon["s"]["L"][0].src = "./img/balloons0.png";
	Balloon["s"]["R"][0] = new Image();
	Balloon["s"]["R"][0].src = "./img/balloons1.png";
	Balloon["s"]["L"][2] = new Image();
	Balloon["s"]["L"][2].src = "./img/balloons2.png";
	Balloon["s"]["R"][2] = new Image();
	Balloon["s"]["R"][2].src = "./img/balloons3.png";
	Balloon["k"] = new Array();
	Balloon["k"]["L"] = new Array();
	Balloon["k"]["R"] = new Array();
	Balloon["k"]["L"][0] = new Image();
	Balloon["k"]["L"][0].src = "./img/balloonk0.png";
	Balloon["k"]["R"][0] = new Image();
	Balloon["k"]["R"][0].src = "./img/balloonk1.png";
	Balloon["k"]["L"][2] = new Image();
	Balloon["k"]["L"][2].src = "./img/balloonk2.png";
	Balloon["k"]["R"][2] = new Image();
	Balloon["k"]["R"][2].src = "./img/balloonk3.png";

	$("#log").append("　完了。<br />\n");
}













//////////////////////////////// rick //////////////////////////////////

function rickDOM(){
//////////リックドム。

	$("#log").append("　ＤＯＭ構築開始。<br />\n");

	$("body").prepend(
		$("<div>").attr("id","Ikagaka").text("Ikagaka").attr("class","ikagaka")
	);

	$("#Ikagaka").prepend(
		$("<div>").attr("id","Sakura").text("Sakura").attr("class","ikagaka")
	);
	$("#Sakura").prepend(
		$("<div>").attr("id","SakuraSurface").text("SakuraSurface").attr("class","ikagaka")
	);
	$("#Sakura").prepend(
		$("<div>").attr("id","SakuraBalloon").text("SakuraBalloon").attr("class","ikagaka")
	);
	$("#SakuraBalloon").prepend(
		$("<textarea>").attr("id","SakuraBalloonText").text("SakuraBalloonText").attr("class","ikagaka")
	);

	$("#Ikagaka").prepend(
		$("<div>").attr("id","Kero").text("Kero").attr("class","ikagaka")
	);
	$("#Kero").prepend(
		$("<div>").attr("id","KeroBalloon").text("KeroBalloon").attr("class","ikagaka")
	);
	$("#Kero").prepend(
		$("<div>").attr("id","KeroSurface").text("KeroSurface").attr("class","ikagaka")
	);
	$("#KeroBalloon").prepend(
		$("<textarea>").attr("id","KeroBalloonText").text("KeroBalloonText").attr("class","ikagaka")
	);

	$("#log").append("　完了。<br />\n");
}




function rickCSS(){
//////////リックしーえすえす。

	$("#log").append("　ＣＳＳ設定開始。<br />\n");

	$(".ikagaka")
		.css("background-repeat","no-repeat")
		.css("background-color","transparent")
		.css("margin","0px")
		.css("padding","0px")
		.css("border","0px")
		.css("overflow","visible")
		.css("line-height","100%")
		.css("text-align","left")
		.css("position","absolute")
		.css("visibility","visible")
		.css("border","1px solid #FF0000")
	;

	$("#Ikagaka")
		.width("100%")
		.height("100%")
		.css("left","0px")
		.css("bottom","0px")
		.css("z-index","0")
		.css("border","1px solid #0000FF")
		.css("visibility","hidden")
	;
	$("#Sakura")
		.css("left","60%")
		.css("bottom","0px")
		.css("z-index","100")
	;
	$("#Kero")
		.css("left","20%")
		.css("bottom","0px")
		.css("z-index","100")
	;


	$("#log").append("　完了。<br />\n");
}












//////////////////////////////// Mgr //////////////////////////////////

function SurfaceMgr(){
///////////サーフィスマネージャー
/////サーフィスチェンジとか
/////当たり判定とか（鋭意実装中）
/////サーフィスのアニメーションとか（企画構想段階）
	$("#Sakura")
		.width(NowSurface[0]["Image"].width+"px")
		.height(NowSurface[0]["Image"].height+"px")
	;
	$("#SakuraSurface")
		.css("background-image","url("+NowSurface[0]["Image"].src+")")
		.css("filter","Chroma(color=#0000ff)")
		.width(NowSurface[0]["Image"].width+"px")
		.height(NowSurface[0]["Image"].height+"px")
		.css("z-index","120")
	;

	i=0;
	while(1){
		if(NowSurface[0]["collision"+i]){
			$("#SakuraSurface").prepend(
				$("<div>").attr("id","SakuraCollision"+i).attr("class","ikagaka")
			);
			a=NowSurface[0]["collision"+i].split(",");
			$("#SakuraCollision"+i)
				.css("left",a[1]+"px")
				.css("top",a[2]+"px")
				.width(eval(a[3]-a[1])+"px")
				.height(eval(a[4]-a[2])+"px")
				.css("z-index","150")
				.css("visibility","inherit")
				.css("cursor","pointer")
				.css("position","absolute")
			;
		}else{
			break;
		}
		i++;
	}


	$("#Kero")
		.width(NowSurface[1]["Image"].width+"px")
		.height(NowSurface[1]["Image"].height+"px")
	;
	$("#KeroSurface")
		.css("background-image","url("+NowSurface[1]["Image"].src+")")
		.css("filter","Chroma(color=#0000ff)")
		.width(NowSurface[1]["Image"].width+"px")
		.height(NowSurface[1]["Image"].height+"px")
		.css("z-index","120")
	;

	i=0;
	while(1){
		if(NowSurface[1]["collision"+i]){
			$("#KeroSurface").prepend(
				$("<div>").attr("id","KeroCollision"+i).attr("class","ikagaka")
			);
			a=NowSurface[1]["collision"+i].split(",");
			$("#KeroCollision"+i)
				.css("left",a[1]+"px")
				.css("top",a[2]+"px")
				.width(eval(a[3]-a[1])+"px")
				.height(eval(a[4]-a[2])+"px")
				.css("z-index","150")
				.css("visibility","inherit")
				.css("cursor","pointer")
				.css("position","absolute")
			;
		}else{
			break;
		}
		i++;
	}
}





function BalloonMgr(){
///////////バルーンマネージャー
/////バルーン位置左右とか
/////バルーンの種類とかとか
	$("#SakuraBalloon")
		.css("background-image","url("+NowBalloon[0].src+")")
		.css("filter","Chroma(color=#dccdab)")
		.width(NowBalloon[0].width+"px")
		.height(NowBalloon[0].height+"px")
		.css("left","-"+NowBalloon[0].width+"px")
		.css("top","0px")
		.css("z-index","120")
	;
	$("#SakuraBalloonText")
		.css("background-color","transparent")
		.width(eval(NowBalloon[0].width-30)+"px")
		.height(eval(NowBalloon[0].height-20)+"px")
		.css("top","10px")
		.css("left","10px")
		.css("overflow","scroll")
		.css("z-index","150")
		.css("visibility","inherit")
	;
	$("#KeroBalloon")
		.css("background-image","url("+NowBalloon[1].src+")")
		.css("filter","Chroma(color=#dccdab)")
		.width(NowBalloon[1].width+"px")
		.height(NowBalloon[1].height+"px")
		.css("left",NowSurface[1]["Image"].width+"px")
		.css("top","0px")
		.css("z-index","120")
	;
	$("#KeroBalloonText")
		.css("background-color","transparent")
		.width(eval(NowBalloon[1].width-30)+"px")
		.height(eval(NowBalloon[1].height-20)+"px")
		.css("top","10px")
		.css("right","10px")
		.css("overflow","scroll")
		.css("z-index","150")
		.css("visibility","inherit")
	;
}




