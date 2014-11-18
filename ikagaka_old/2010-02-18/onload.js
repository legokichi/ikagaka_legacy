﻿

window.onload = function(){
	a = new Named();
	a.Nar = eval(
//JSONここから
{
	"homeurl":"http://home.384.jp/evidence/update/bee/",
	"updates2":[
		"shell/master/descript.txt",
		"shell/master/install.txt",
		"shell/master/readme.txt",
		"shell/master/surfaces.txt",
		"shell/master/surfacetable.txt",
		"shell/master/element002.png",
		"shell/master/element005.png",
		"shell/master/element007.png",
		"shell/master/element008.png",
		"shell/master/element009.png",
		"shell/master/menu_background.png",
		"shell/master/menu_foreground.png",
		"shell/master/menu_sidebar.png",
		"shell/master/surface000.png",
		"shell/master/surface001.png",
		"shell/master/surface003.png",
		"shell/master/surface010.png",
		"shell/master/surface100.png",
		"shell/master/surface101.png",
		"shell/master/surface102.png",
		"shell/master/surface800.png",
		"shell/master/surface801.png",
		"shell/master/surface802.png",
		"shell/master/surface803.png",
		"shell/master/surface804.png",
	],
	"shell":{
		"master":{
			"dir":"shell/master/",
			"descript":{
				"charset":"Shift_JIS",
				"type":"shell",
				"name":"魔法小娘",
				"craftman":"Benta Ito/Towa",
				"craftmanw":"いとうべん太/とわ",
				"craftmanurl":"http://www.towano.net/",
				"sakura.balloon.offsetx":25,
				"sakura.balloon.offsety":-15,
				"kero.balloon.offsetx":0,
				"kero.balloon.offsety":10
			},
			"surface":{
				0:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				1:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[],
						[60,105,95,140,"Bust"],
					],
					"element":[],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				2:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","element002.png",70,80],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				3:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[],
						[60,105,95,140,"Bust"],
					],
					"element":[],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				4:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface003.png",0,0],
						["overlay","surface102.png",50,60],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				5:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","element005.png",50,60],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				6:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","surface100.png",50,60],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				7:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","element007.png",50,50],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				8:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","element008.png",50,50],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				9:{
					"src":"shell/master/surface000.png",
					"collision":[
						[51,2,106,35,"Head"],
						[63,60,90,83,"Face"],
						[60,105,95,140,"Bust"],
					],
					"element":[
						["base","surface000.png",0,0],
						["overlay","element009.png",50,50],
					],
					"interval":[
						{
							"timing":"bind",
							"pattern":[
								["add",800,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",801,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",802,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",803,0,73,96],
							]
						},
						{
							"timing":"bind",
							"pattern":[
								["add",804,0,73,96],
							]
						},
						{
							"timing":"sometimes",
							"pattern":[
								["overlay",-1,50,0,0],
								["overlay",100,50,50,60],
								["overlay",101,50,50,60],
								["overlay",-1,50,0,0],
							]
						},
					]
				},
				10:{
					"src":"shell/master/surface010.png",
					"collision":[],
					"element":[],
					"interval":[]
				}
			}
		}
	}
}
//JSONここまで
	);

	$("body").css("border","1px solid #000000")
	$("body").append("Hello World!<br />");
	$("body").append(
		$("<input>")
		.attr("type","text")
		.val("\\0\\s[9]テキストボックスにSakuraScriptを入力して実行してください。\\w8\\e")
		.addClass("input")
		.width("98%")
	);
	$("body").append("<br />");
	$("body").append(
		$("<input>")
		.attr("type","submit")
		.val("しゃべる")
		.width("98%")
		.click(function(){
			a.plyScript($("input.input").val());
		})
	);
	$("body").append("<br />");
	$("body").append("・webkit専用です。<del>他のブラウザ試してない</del>Chrome4、Opera10で動作確認<br />");
	$("body").append("・\\h,\\u,\\0,\\1,\\p[0],\\s0,\\s[0],\\b[0],\\c,\\n,\\w8,\\_w[800],\\e等に対応<br />");
	$("body").append("・collision対応serikoやmayuraはまだ<br />");
	$("body").append("・element合成はbaseとoverlayに対応<br />");
	$("body").append("・「にこらとてすらを置いてるところ」[http://home.384.jp/evidence/]の「びーふれんず」のupdates2.dauから手作業で抽出したJSONを利用しています<br />");
	$("body").append("・誰かupdates2からnarのJSON作るjs書いてー<br />");
	$("body").append("・だが仕様が定まらない<br />");
	$("body").append("<br />");
	a.plyScript($("input.input").val());
};



