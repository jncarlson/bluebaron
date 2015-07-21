'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # rmCtrl
 * Controller of the angularApp
 */
stat.controller("runesController", function ($scope, apiFactory, $rootScope) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getRunes(id, region).then(function(response) {

        $scope.runePages = response.data.data[id]['pages'];
        //console.log($scope.runePages);
        var staticRune = {"5001": ["-96px", "-0px"], "5002": ["-144px", "-0px"], "5003": ["-192px", "-0px"], "5005": ["-96px", "-0px"], "5007": ["-192px", "-0px"], "5009": ["-96px", "-0px"], "5011": ["-192px", "-0px"], "5012": ["-240px", "-0px"], "5013": ["-96px", "-0px"], "5015": ["-192px", "-0px"], "5016": ["-240px", "-0px"], "5021": ["-96px", "-0px"], "5023": ["-192px", "-0px"], "5024": ["-240px", "-0px"], "5025": ["-96px", "-0px"], "5026": ["-144px", "-0px"], "5027": ["-192px", "-0px"], "5029": ["-96px", "-0px"], "5031": ["-288px", "-0px"], "5032": ["-336px", "-0px"], "5033": ["-384px", "-0px"], "5035": ["-288px", "-0px"], "5037": ["-384px", "-0px"], "5041": ["-384px", "-0px"], "5042": ["-432px", "-0px"], "5043": ["-288px", "-0px"], "5045": ["-384px", "-0px"], "5046": ["-432px", "-0px"], "5047": ["-288px", "-0px"], "5051": ["-288px", "-0px"], "5052": ["-336px", "-0px"], "5053": ["-384px", "-0px"], "5054": ["-432px", "-0px"], "5055": ["-288px", "-0px"], "5056": ["-336px", "-0px"], "5057": ["-384px", "-0px"], "5058": ["-432px", "-0px"], "5059": ["-288px", "-0px"], "5061": ["-0px", "-48px"], "5062": ["-48px", "-48px"], "5063": ["-96px", "-48px"], "5065": ["-0px", "-48px"], "5067": ["-96px", "-48px"], "5071": ["-96px", "-48px"], "5072": ["-144px", "-48px"], "5073": ["-0px", "-48px"], "5074": ["-48px", "-48px"], "5075": ["-96px", "-48px"], "5076": ["-144px", "-48px"], "5077": ["-0px", "-48px"], "5078": ["-48px", "-48px"], "5081": ["-0px", "-48px"], "5083": ["-96px", "-48px"], "5084": ["-144px", "-48px"], "5085": ["-0px", "-48px"], "5086": ["-48px", "-48px"], "5087": ["-96px", "-48px"], "5088": ["-144px", "-48px"], "5091": ["-192px", "-48px"], "5092": ["-240px", "-48px"], "5093": ["-288px", "-48px"], "5095": ["-192px", "-48px"], "5097": ["-288px", "-48px"], "5099": ["-192px", "-48px"], "5101": ["-288px", "-48px"],"5102": [    "-336px",    "-48px"],"5103": [    "-192px",    "-48px"],"5104": [    "-240px",    "-48px"],"5105": [    "-288px",    "-48px"],"5106": [    "-336px",    "-48px"],"5107": [    "-192px",    "-48px"],"5108": [    "-240px",    "-48px"],"5111": [    "-192px",    "-48px"],"5112": [    "-240px",    "-48px"],"5113": [    "-288px",    "-48px"],"5114": [    "-336px",    "-48px"],"5115": [    "-192px",    "-48px"],"5116": [    "-240px",    "-48px"],"5117": [    "-288px",    "-48px"],"5118": [    "-336px",    "-48px"],"5119": [    "-192px",    "-48px"],"5121": [    "-288px",    "-48px"],"5123": [    "-384px",    "-48px"],"5124": [    "-432px",    "-48px"],"5125": [    "-0px",    "-96px"],"5127": [    "-384px",    "-48px"],"5129": [    "-0px",    "-96px"],"5131": [    "-384px",    "-48px"],"5133": [    "-0px",    "-96px"],"5134": [    "-48px",    "-96px"],"5135": [    "-384px",    "-48px"],"5137": [    "-0px",    "-96px"],"5138": [    "-48px",    "-96px"],"5143": [    "-384px",    "-48px"],"5145": [    "-0px",    "-96px"],"5146": [    "-48px",    "-96px"], "5147": ["-384px", "-48px"], "5148": ["-432px", "-48px"], "5149": ["-0px", "-96px"], "5151": ["-384px", "-48px"], "5153": ["-96px", "-96px"], "5154": ["-144px", "-96px"], "5155": ["-192px", "-96px"], "5157": ["-96px", "-96px"], "5159": ["-192px", "-96px"], "5163": ["-192px", "-96px"], "5164": ["-240px", "-96px"], "5165": ["-96px", "-96px"], "5167": ["-192px", "-96px"], "5168": ["-240px", "-96px"], "5169": ["-96px", "-96px"], "5173": ["-96px", "-96px"], "5174": ["-144px", "-96px"], "5175": ["-192px", "-96px"], "5176": ["-240px", "-96px"], "5177": ["-96px", "-96px"], "5178": ["-144px", "-96px"], "5179": ["-192px", "-96px"], "5180": ["-240px", "-96px"], "5181": ["-96px", "-96px"], "5183": ["-288px", "-96px"], "5184": ["-336px", "-96px"], "5185": ["-384px", "-96px"], "5187": ["-288px", "-96px"], "5189": ["-384px", "-96px"], "5193": ["-384px", "-96px"], "5194": ["-432px", "-96px"], "5195": ["-288px", "-96px"], "5196": ["-336px", "-96px"], "5197": ["-384px", "-96px"], "5198": ["-432px", "-96px"], "5199": ["-288px", "-96px"], "5200": ["-336px", "-96px"], "5203": ["-288px", "-96px"], "5205": ["-384px", "-96px"], "5206": ["-432px", "-96px"], "5207": ["-288px", "-96px"], "5208": ["-336px", "-96px"], "5209": ["-384px", "-96px"], "5210": ["-432px", "-96px"], "5213": ["-0px", "-144px"], "5214": ["-48px", "-144px"], "5215": ["-96px", "-144px"], "5217": ["-0px", "-144px"], "5219": ["-96px", "-144px"], "5221": ["-0px", "-144px"], "5223": ["-96px", "-144px"], "5224": ["-144px", "-144px"], "5225": ["-0px", "-144px"], "5226": ["-48px", "-144px"], "5227": ["-96px", "-144px"], "5228": ["-144px", "-144px"], "5229": ["-0px", "-144px"], "5230": ["-48px", "-144px"], "5233": ["-0px", "-144px"], "5234": ["-48px", "-144px"], "5235": ["-96px", "-144px"], "5236": ["-144px", "-144px"], "5237": ["-0px", "-144px"], "5238": ["-48px", "-144px"], "5239": ["-96px", "-144px"], "5240": ["-144px", "-144px"], "5241": ["-0px", "-144px"], "5243": ["-96px", "-144px"], "5245": ["-192px", "-144px"], "5246": ["-240px", "-144px"], "5247": ["-288px", "-144px"], "5249": ["-192px", "-144px"], "5251": ["-288px", "-144px"], "5253": ["-192px", "-144px"], "5255": ["-288px", "-144px"], "5256": ["-336px", "-144px"], "5257": ["-192px", "-144px"], "5259": ["-288px", "-144px"], "5260": ["-336px", "-144px"], "5265": ["-192px", "-144px"], "5267": ["-288px", "-144px"], "5268": ["-336px", "-144px"], "5269": ["-192px", "-144px"], "5270": ["-240px", "-144px"], "5271": ["-288px", "-144px"], "5273": ["-192px", "-144px"], "5275": ["-384px", "-144px"], "5276": ["-432px", "-144px"], "5277": ["-0px", "-192px"], "5279": ["-384px", "-144px"], "5281": ["-0px", "-192px"], "5285": ["-0px", "-192px"], "5286": ["-48px", "-192px"], "5287": ["-384px", "-144px"], "5289": ["-0px", "-192px"], "5290": ["-48px", "-192px"], "5291": ["-384px", "-144px"], "5295": ["-384px", "-144px"], "5296": ["-432px", "-144px"], "5297": ["-0px", "-192px"], "5298": ["-48px", "-192px"], "5299": ["-384px", "-144px"], "5300": ["-432px", "-144px"], "5301": ["-0px", "-192px"], "5302": ["-48px", "-192px"], "5303": ["-384px", "-144px"], "5305": ["-96px", "-192px"], "5306": ["-144px", "-192px"], "5307": ["-192px", "-192px"], "5309": ["-96px", "-192px"], "5311": ["-192px", "-192px"], "5315": ["-192px", "-192px"], "5316": ["-240px", "-192px"], "5317": ["-96px", "-192px"], "5318": ["-144px", "-192px"], "5319": ["-192px", "-192px"], "5320": ["-240px", "-192px"], "5321": ["-96px", "-192px"], "5322": ["-144px", "-192px"], "5325": ["-96px", "-192px"], "5327": ["-192px", "-192px"], "5328": ["-240px", "-192px"], "5329": ["-96px", "-192px"], "5330": ["-144px", "-192px"], "5331": ["-192px", "-192px"], "5332": ["-240px", "-192px"], "5335": ["-288px", "-192px"], "5336": ["-336px", "-192px"], "5337": ["-384px", "-192px"], "5339": ["-288px", "-192px"], "5341": ["-384px", "-192px"], "5343": ["-288px", "-192px"], "5345": ["-384px", "-192px"], "5346": ["-432px", "-192px"], "5347": ["-288px", "-192px"], "5348": ["-336px", "-192px"], "5349": ["-384px", "-192px"], "5350": ["-432px", "-192px"], "5351": ["-288px", "-192px"], "5352": ["-336px", "-192px"], "5355": ["-288px", "-192px"], "5356": ["-336px", "-192px"], "5357": ["-384px", "-192px"], "5358": ["-432px", "-192px"], "5359": ["-288px", "-192px"], "5360": ["-336px", "-192px"], "5361": ["-384px", "-192px"], "5362": ["-432px", "-192px"], "5363": ["-288px", "-192px"], "5365": ["-384px", "-192px"], "5366": ["-288px", "-192px"], "5367": ["-432px", "-192px"], "5368": ["-336px", "-192px"], "5369": ["-96px", "-192px"], "5370": ["-192px", "-192px"], "5371": ["-0px", "-192px"], "5372": ["-432px", "-144px"], "5373": ["-336px", "-192px"], "5374": ["-384px", "-192px"], "5400": ["-96px", "-0px"], "5401": ["-384px", "-48px"], "5402": ["-192px", "-144px"], "5403": ["-192px", "-192px"], "5404": ["-240px", "-48px"], "5405": ["-48px", "-144px"], "5406": ["-384px", "-192px"], "5407": ["-336px", "-48px"], "5408": ["-144px", "-144px"], "5409": ["-432px", "-192px"], "5410": ["-192px", "-48px"], "5411": ["-0px", "-144px"], "5412": ["-288px", "-192px"], "5413": ["-48px", "-48px"], "5414": ["-336px", "-96px"], "5415": ["-192px", "-192px"], "5416": ["-336px", "-48px"], "5417": ["-144px", "-144px"], "5418": ["-432px", "-192px"], "8001": ["-0px", "-240px"], "8002": ["-48px", "-240px"], "8003": ["-96px", "-240px"], "8005": ["-144px", "-240px"], "8006": ["-192px", "-240px"], "8007": ["-240px", "-240px"], "8008": ["-288px", "-240px"], "8009": ["-336px", "-240px"], "8011": ["-384px", "-240px"], "8012": ["-432px", "-240px"], "8013": ["-0px", "-288px"], "8014": ["-48px", "-288px"], "8015": ["-96px", "-288px"], "8016": ["-144px", "-288px"], "8017": ["-192px", "-288px"], "8019": ["-240px", "-288px"], "8020": ["-288px", "-288px"], "8021": ["-336px", "-288px"], "8022": ["-384px", "-288px"], "8035": ["-0px", "-384px"], "10001": ["-0px", "-0px"], "10002": ["-48px", "-0px"]};

        $scope.getPosition = function(runePage){
            $scope.active = $scope.runePages[runePage]['name'];
            apiFactory.getStaticRuneData(id, region).then(function(response) {
                $scope.runeToolTip = response.data.data.data;

                var tip = [];
                var thirty = [];

                for (var i = 0; i < 30; i++){
                    var runeValue = $scope.runes[i]['runeId'];
                    var runeTip = $scope.runeToolTip[runeValue];
                    tip.push(runeTip);
                    thirty.push(i);
                }

                $scope.tip = tip;
                $scope.thirty = thirty;


            });

            $scope.runes = response.data.data[id]['pages'][runePage]['slots'];

            var x = [];
            var y = [];


            for (var i = 0; i < 30; i++){

                var runeValue = $scope.runes[i]['runeId'];

                x.push(staticRune[runeValue][0]);
                y.push(staticRune[runeValue][1]);

            }
            $scope.x = x;
            $scope.y = y;
            $scope.top = [
                    "376px",
                    "376px",
                    "378px",
                    "320px",
                    "317px",
                    "330px",
                    "270px",
                    "272px",
                    "229px",
                    "185px",
                    "181px",
                    "136px",
                    "113px",
                    "68px",
                    "41px",
                    "23px",
                    "4px",
                    "54px",
                    "7px",
                    "55px",
                    "7px",
                    "94px",
                    "46px",
                    "6px",
                    "81px",
                    "40px",
                    "134px",
                    "59px",
                    "245px",
                    "188px"
            ];
            $scope.left = [
                "26px",
                "87px",
                "161px",
                "12px",
                "73px",
                "128px",
                "35px",
                "114px",
                "75px",
                "37px",
                "109px",
                "69px",
                "123px",
                "155px",
                "212px",
                "270px",
                "334px",
                "361px",
                "401px",
                "435px",
                "467px",
                "481px",
                "512px",
                "551px",
                "557px",
                "599px",
                "580px",
                "53px",
                "209px",
                "428px"
            ];


            var position = [];

            for (var b = 0; b < 30; b++){
                position.push("background-image: url('../images/runes/runes.png'); background-position-x:" + $scope.x[b] + "; background-position-y:" + $scope.y[b] + "; top:" + $scope.top[b] + "; left:" + $scope.left[b] + "; position: absolute; width: 48px; height: 48px; z-index: 999;");
            }

            $scope.position = position;

        };

        $scope.getPosition(0);

    });



});


stat.controller("masteryController", function ($scope, apiFactory, $rootScope) {

    var id = $rootScope.player_id;
    var region = $rootScope.region;

    apiFactory.getMasteries(id, region).then(function(response) {

        $scope.getActive = function(page){

            var name = [];
            var description = [];

            $scope.rule = {"type":"mastery","version":"5.2.1","tree":{"Offense":[[{"masteryId":"4111","prereq":"0"},{"masteryId":"4112","prereq":"0"},{"masteryId":"4113","prereq":"0"},{"masteryId":"4114","prereq":"0"}],[{"masteryId":"4121","prereq":"0"},{"masteryId":"4122","prereq":"0"},{"masteryId":"4123","prereq":"0"},{"masteryId":"4124","prereq":"4114"}],[{"masteryId":"4131","prereq":"0"},{"masteryId":"4132","prereq":"4122"},{"masteryId":"4133","prereq":"4123"},{"masteryId":"4134","prereq":"0"}],[{"masteryId":"4141","prereq":"4131"},{"masteryId":"4142","prereq":"0"},{"masteryId":"4143","prereq":"0"},{"masteryId":"4144","prereq":"4134"}],[{"masteryId":"4151","prereq":"0"},{"masteryId":"4152","prereq":"0"},null,{"masteryId":"4154","prereq":"0"}],[null,{"masteryId":"4162","prereq":"0"}]],"Defense":[[{"masteryId":"4211","prereq":"0"},{"masteryId":"4212","prereq":"0"},{"masteryId":"4213","prereq":"0"},{"masteryId":"4214","prereq":"0"}],[{"masteryId":"4221","prereq":"4211"},{"masteryId":"4222","prereq":"0"},null,{"masteryId":"4224","prereq":"4214"}],[{"masteryId":"4231","prereq":"0"},{"masteryId":"4232","prereq":"4222"},{"masteryId":"4233","prereq":"0"},{"masteryId":"4234","prereq":"0"}],[{"masteryId":"4241","prereq":"0"},{"masteryId":"4242","prereq":"0"},{"masteryId":"4243","prereq":"4233"},{"masteryId":"4244","prereq":"4234"}],[{"masteryId":"4251","prereq":"4241"},{"masteryId":"4252","prereq":"0"},{"masteryId":"4253","prereq":"0"}],[null,{"masteryId":"4262","prereq":"0"}]],"Utility":[[{"masteryId":"4311","prereq":"0"},{"masteryId":"4312","prereq":"0"},{"masteryId":"4313","prereq":"0"},{"masteryId":"4314","prereq":"0"}],[null,{"masteryId":"4322","prereq":"0"},{"masteryId":"4323","prereq":"4313"},{"masteryId":"4324","prereq":"0"}],[{"masteryId":"4331","prereq":"0"},{"masteryId":"4332","prereq":"0"},{"masteryId":"4333","prereq":"0"},{"masteryId":"4334","prereq":"4324"}],[{"masteryId":"4341","prereq":"4331"},{"masteryId":"4342","prereq":"0"},{"masteryId":"4343","prereq":"0"},{"masteryId":"4344","prereq":"0"}],[null,{"masteryId":"4352","prereq":"4342"},{"masteryId":"4353","prereq":"0"}],[null,{"masteryId":"4362","prereq":"0"}]]},"data":{"4111":{"id":4111,"name":"Double-Edged Sword","description":["Melee - Deal an additional 2% damage and receive an additional 1% damage<br>Ranged - Deal an additional 1.5% damage and receive an additional 1.5% damage"],"image":{"full":"4111.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":0,"w":48,"h":48},"ranks":1,"prereq":"0"},"4112":{"id":4112,"name":"Fury","description":["+1.25% Attack Speed","+2.5% Attack Speed","+3.75% Attack Speed","+5% Attack Speed"],"image":{"full":"4112.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":0,"w":48,"h":48},"ranks":4,"prereq":"0"},"4113":{"id":4113,"name":"Sorcery","description":["+1.25% Cooldown Reduction","+2.5% Cooldown Reduction","+3.75% Cooldown Reduction","+5% Cooldown Reduction"],"image":{"full":"4113.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":0,"w":48,"h":48},"ranks":4,"prereq":"0"},"4114":{"id":4114,"name":"Butcher","description":["Basic attacks and single target spells deal an additional 2 damage to minions and monsters<br><br>This does not trigger off of area of effect damage or damage over time effects"],"image":{"full":"4114.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":0,"w":48,"h":48},"ranks":1,"prereq":"0"},"4121":{"id":4121,"name":"Expose Weakness","description":["Damaging an enemy with a spell increases allied champions' damage to that enemy by 1% for the next 3 seconds"],"image":{"full":"4121.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":0,"w":48,"h":48},"ranks":1,"prereq":"0"},"4122":{"id":4122,"name":"Brute Force","description":["+4 Attack Damage at level 18 (+0.22 Attack Damage per level)","+7 Attack Damage at level 18 (+0.39 Attack Damage per level)","+10 Attack Damage at level 18 (+0.55 Attack Damage per level)"],"image":{"full":"4122.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":0,"w":48,"h":48},"ranks":3,"prereq":"0"},"4123":{"id":4123,"name":"Mental Force","description":["+6 Ability Power at level 18 (+0.33 Ability Power per level)","+11 Ability Power at level 18 (+0.61 Ability Power per level)","+16 Ability Power at level 18 (+0.89 Ability Power per level)"],"image":{"full":"4123.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":0,"w":48,"h":48},"ranks":3,"prereq":"0"},"4124":{"id":4124,"name":"Feast","description":["Killing a unit restores 3 Health and 1 Mana"],"image":{"full":"4124.png","sprite":"mastery0.png","group":"gray_mastery","x":336,"y":0,"w":48,"h":48},"ranks":1,"prereq":"4114"},"4131":{"id":4131,"name":"Spell Weaving","description":["Damaging an enemy champion with a Basic Attack increases Spell Damage by 1%, stacking up to 3 times (max 3% damage increase)"],"image":{"full":"4131.png","sprite":"mastery0.png","group":"gray_mastery","x":384,"y":0,"w":48,"h":48},"ranks":1,"prereq":"0"},"4132":{"id":4132,"name":"Martial Mastery","description":["+4 Attack Damage"],"image":{"full":"4132.png","sprite":"mastery0.png","group":"gray_mastery","x":432,"y":0,"w":48,"h":48},"ranks":1,"prereq":"4122"},"4133":{"id":4133,"name":"Arcane Mastery","description":["+6 Ability Power"],"image":{"full":"4133.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":48,"w":48,"h":48},"ranks":1,"prereq":"4123"},"4134":{"id":4134,"name":"Executioner","description":["Increases damage dealt to champions below 20% Health by 5%","Increases damage dealt to champions below 35% Health by 5%","Increases damage dealt to champions below 50% Health by 5%"],"image":{"full":"4134.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":48,"w":48,"h":48},"ranks":3,"prereq":"0"},"4141":{"id":4141,"name":"Blade Weaving","description":["Damaging an enemy champion with a spell increases Basic Attack Damage by 1%, stacking up to 3 times (max 3% damage increase)"],"image":{"full":"4141.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":48,"w":48,"h":48},"ranks":1,"prereq":"4131"},"4142":{"id":4142,"name":"Warlord","description":["Increases bonus Attack Damage by 2%","Increases Bonus Attack Damage by 3.5%","Increases Bonus Attack Damage by 5%"],"image":{"full":"4142.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":48,"w":48,"h":48},"ranks":3,"prereq":"0"},"4143":{"id":4143,"name":"Archmage","description":["Increases Ability Power by 2%","Increases Ability Power by 3.5%","Increases Ability Power by 5%"],"image":{"full":"4143.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":48,"w":48,"h":48},"ranks":3,"prereq":"0"},"4144":{"id":4144,"name":"Dangerous Game","description":["Champion kills and assists restore 5% missing Health and Mana"],"image":{"full":"4144.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":48,"w":48,"h":48},"ranks":1,"prereq":"4134"},"4151":{"id":4151,"name":"Frenzy","description":["Critical hits grant +5% Attack Speed for 3 seconds (stacks up to 3 times)"],"image":{"full":"4151.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":48,"w":48,"h":48},"ranks":1,"prereq":"0"},"4152":{"id":4152,"name":"Devastating Strikes","description":["+2% Armor and Magic Penetration","+4% Armor and Magic Penetration","+6% Armor and Magic Penetration"],"image":{"full":"4152.png","sprite":"mastery0.png","group":"gray_mastery","x":336,"y":48,"w":48,"h":48},"ranks":3,"prereq":"0"},"4154":{"id":4154,"name":"Arcane Blade","description":["Basic Attacks also deal bonus magic damage equal to 5% of Ability Power"],"image":{"full":"4154.png","sprite":"mastery0.png","group":"gray_mastery","x":384,"y":48,"w":48,"h":48},"ranks":1,"prereq":"0"},"4162":{"id":4162,"name":"Havoc","description":["+3% increased damage"],"image":{"full":"4162.png","sprite":"mastery0.png","group":"gray_mastery","x":432,"y":48,"w":48,"h":48},"ranks":1,"prereq":"0"},"4211":{"id":4211,"name":"Block","description":["Reduces incoming damage from champion basic attacks by 1","Reduces incoming damage from champion basic attacks by 2"],"image":{"full":"4211.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":96,"w":48,"h":48},"ranks":2,"prereq":"0"},"4212":{"id":4212,"name":"Recovery","description":["+1 Health per 5 seconds","+2 Health per 5 seconds"],"image":{"full":"4212.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":96,"w":48,"h":48},"ranks":2,"prereq":"0"},"4213":{"id":4213,"name":"Enchanted Armor","description":["Increases bonus Armor and Magic Resist by 2.5%","Increases bonus Armor and Magic Resist by 5%"],"image":{"full":"4213.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":96,"w":48,"h":48},"ranks":2,"prereq":"0"},"4214":{"id":4214,"name":"Tough Skin","description":["Reduces damage taken from neutral monsters by 1<br><br>This does not affect lane minions","Reduces damage taken from neutral monsters by 2<br><br>This does not affect lane minions"],"image":{"full":"4214.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":96,"w":48,"h":48},"ranks":2,"prereq":"0"},"4221":{"id":4221,"name":"Unyielding","description":["Melee - Reduces all incoming damage from champions by 2<br>Ranged - Reduces all incoming damage from champions by 1"],"image":{"full":"4221.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":96,"w":48,"h":48},"ranks":1,"prereq":"4211"},"4222":{"id":4222,"name":"Veteran's Scars","description":["+12 Health","+24 Health","+36 Health"],"image":{"full":"4222.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":96,"w":48,"h":48},"ranks":3,"prereq":"0"},"4224":{"id":4224,"name":"Bladed Armor","description":["Taking Basic Attack Damage from neutral monsters cause them to bleed, dealing physical damage equal to 1% of their current Health each second<br>This does not work against lane minions"],"image":{"full":"4224.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":96,"w":48,"h":48},"ranks":1,"prereq":"4214"},"4231":{"id":4231,"name":"Oppression","description":["Reduces damage taken by 3% from enemies that have impaired movement (slows, snares, taunts, stuns, etc.)"],"image":{"full":"4231.png","sprite":"mastery0.png","group":"gray_mastery","x":336,"y":96,"w":48,"h":48},"ranks":1,"prereq":"0"},"4232":{"id":4232,"name":"Juggernaut","description":["+3% Maximum Health"],"image":{"full":"4232.png","sprite":"mastery0.png","group":"gray_mastery","x":384,"y":96,"w":48,"h":48},"ranks":1,"prereq":"4222"},"4233":{"id":4233,"name":"Hardiness","description":["+2 Armor","+3.5 Armor","+5 Armor"],"image":{"full":"4233.png","sprite":"mastery0.png","group":"gray_mastery","x":432,"y":96,"w":48,"h":48},"ranks":3,"prereq":"0"},"4234":{"id":4234,"name":"Resistance","description":["+2 Magic Resist","+3.5 Magic Resist","+5 Magic Resist"],"image":{"full":"4234.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":144,"w":48,"h":48},"ranks":3,"prereq":"0"},"4241":{"id":4241,"name":"Perseverance ","description":["Regenerates 0.35% of missing Health every 5 seconds","Regenerates 0.675% of missing Health every 5 seconds","Regenerates 1% of missing Health every 5 seconds"],"image":{"full":"4241.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":144,"w":48,"h":48},"ranks":3,"prereq":"0"},"4242":{"id":4242,"name":"Swiftness","description":["Reduces the effectiveness of slows by 10%"],"image":{"full":"4242.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":144,"w":48,"h":48},"ranks":1,"prereq":"0"},"4243":{"id":4243,"name":"Reinforced Armor","description":["Reduces the total damage taken from critical strikes by 10%"],"image":{"full":"4243.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":144,"w":48,"h":48},"ranks":1,"prereq":"4233"},"4244":{"id":4244,"name":"Evasive","description":["Reduces damage taken by 4% from Area of Effect magic damage"],"image":{"full":"4244.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":144,"w":48,"h":48},"ranks":1,"prereq":"4234"},"4251":{"id":4251,"name":"Second Wind","description":["Increases self-healing, Health Regen, Lifesteal, and Spellvamp by 10% when below 25% Health"],"image":{"full":"4251.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":144,"w":48,"h":48},"ranks":1,"prereq":"4241"},"4252":{"id":4252,"name":"Legendary Guardian","description":["+1 Armor and 0.5 Magic Resist for each nearby enemy champion","+2 Armor and 1 Magic Resist for each nearby enemy champion","+3 Armor and 1.5 Magic Resist for each nearby enemy champion","+4 Armor and 2 Magic Resist for each nearby enemy champion"],"image":{"full":"4252.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":144,"w":48,"h":48},"ranks":4,"prereq":"0"},"4253":{"id":4253,"name":"Runic Blessing","description":["Start the game with a 50 Health shield. This shield regenerates each time after respawning"],"image":{"full":"4253.png","sprite":"mastery0.png","group":"gray_mastery","x":336,"y":144,"w":48,"h":48},"ranks":1,"prereq":"0"},"4262":{"id":4262,"name":"Tenacious","description":["Reduces the duration of crowd control effects by 15%"],"image":{"full":"4262.png","sprite":"mastery0.png","group":"gray_mastery","x":384,"y":144,"w":48,"h":48},"ranks":1,"prereq":"0"},"4311":{"id":4311,"name":"Phasewalker","description":["Reduces the casting time of Recall by 1 second<br><br>Dominion - Reduces the casting time of Enhanced Recall by 0.5 seconds"],"image":{"full":"4311.png","sprite":"mastery0.png","group":"gray_mastery","x":432,"y":144,"w":48,"h":48},"ranks":1,"prereq":"0"},"4312":{"id":4312,"name":"Fleet of Foot","description":["+0.5% Movement Speed","+1% Movement Speed","+1.5% Movement Speed"],"image":{"full":"4312.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":192,"w":48,"h":48},"ranks":3,"prereq":"0"},"4313":{"id":4313,"name":"Meditation","description":["+1 Mana Regen per 5 seconds","+2 Mana Regen per 5 seconds","+3 Mana Regen per 5 seconds"],"image":{"full":"4313.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":192,"w":48,"h":48},"ranks":3,"prereq":"0"},"4314":{"id":4314,"name":"Scout","description":["Increases the cast range of trinket items by 15%"],"image":{"full":"4314.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":192,"w":48,"h":48},"ranks":1,"prereq":"0"},"4322":{"id":4322,"name":"Summoner's Insight","description":["Reduces the cooldown of Summoner Spells by 4%","Reduces the cooldown of Summoner Spells by 7%","Reduces the cooldown of Summoner Spells by 10%"],"image":{"full":"4322.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":192,"w":48,"h":48},"ranks":3,"prereq":"0"},"4323":{"id":4323,"name":"Strength of Spirit","description":["+1 Health Regen per 5 seconds for every 300 maximum Mana"],"image":{"full":"4323.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":192,"w":48,"h":48},"ranks":1,"prereq":"4313"},"4324":{"id":4324,"name":"Alchemist","description":["Increases the duration of potions and elixirs by 10%"],"image":{"full":"4324.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":192,"w":48,"h":48},"ranks":1,"prereq":"0"},"4331":{"id":4331,"name":"Greed","description":["+0.5 Gold every 10 seconds","+1 Gold every 10 seconds","+1.5 Gold every 10 seconds"],"image":{"full":"4331.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":192,"w":48,"h":48},"ranks":3,"prereq":"0"},"4332":{"id":4332,"name":"Runic Affinity","description":["Increases the duration of shrine, relic, quest, and neutral monster buffs by 20%"],"image":{"full":"4332.png","sprite":"mastery0.png","group":"gray_mastery","x":336,"y":192,"w":48,"h":48},"ranks":1,"prereq":"0"},"4333":{"id":4333,"name":"Vampirism","description":["+1% Lifesteal and Spellvamp","+2% Lifesteal and Spellvamp","+3% Lifesteal and Spellvamp"],"image":{"full":"4333.png","sprite":"mastery0.png","group":"gray_mastery","x":384,"y":192,"w":48,"h":48},"ranks":3,"prereq":"0"},"4334":{"id":4334,"name":"Culinary Master","description":["Health potions are upgraded into Biscuits that restore an additional 20 Health and 10 Mana instantly upon consumption"],"image":{"full":"4334.png","sprite":"mastery0.png","group":"gray_mastery","x":432,"y":192,"w":48,"h":48},"ranks":1,"prereq":"4324"},"4341":{"id":4341,"name":"Scavenger","description":["+1 Gold each time an ally kills a nearby lane minion"],"image":{"full":"4341.png","sprite":"mastery0.png","group":"gray_mastery","x":0,"y":240,"w":48,"h":48},"ranks":1,"prereq":"4331"},"4342":{"id":4342,"name":"Wealth","description":["+40 Starting Gold"],"image":{"full":"4342.png","sprite":"mastery0.png","group":"gray_mastery","x":48,"y":240,"w":48,"h":48},"ranks":1,"prereq":"0"},"4343":{"id":4343,"name":"Expanded Mind","description":["+2% increased maximum Mana","+3.5% increased maximum Mana","+5% increased maximum Mana"],"image":{"full":"4343.png","sprite":"mastery0.png","group":"gray_mastery","x":96,"y":240,"w":48,"h":48},"ranks":3,"prereq":"0"},"4344":{"id":4344,"name":"Inspiration","description":["+5 Experience every 10 seconds while near a higher level allied champion","+10 Experience every 10 seconds while near a higher level allied champion"],"image":{"full":"4344.png","sprite":"mastery0.png","group":"gray_mastery","x":144,"y":240,"w":48,"h":48},"ranks":2,"prereq":"0"},"4352":{"id":4352,"name":"Bandit","description":["Melee - Grants +15 Gold on champion kill or assist<br>Ranged - Grants +3 Gold each time an enemy champion is attacked. This cannot trigger on the same champion more than once every 5 seconds"],"image":{"full":"4352.png","sprite":"mastery0.png","group":"gray_mastery","x":192,"y":240,"w":48,"h":48},"ranks":1,"prereq":"4342"},"4353":{"id":4353,"name":"Intelligence","description":["+2% Cooldown Reduction and reduces the cooldown of Activated Items by 4%","+3.5% Cooldown Reduction and reduces the cooldown of Activated Items by 7%","+5% Cooldown Reduction and reduces the cooldown of Activated Items by 10%"],"image":{"full":"4353.png","sprite":"mastery0.png","group":"gray_mastery","x":240,"y":240,"w":48,"h":48},"ranks":3,"prereq":"0"},"4362":{"id":4362,"name":"Wanderer","description":["+5% Movement Speed out of combat"],"image":{"full":"4362.png","sprite":"mastery0.png","group":"gray_mastery","x":288,"y":240,"w":48,"h":48},"ranks":1,"prereq":"0"}}};
            $scope.masteries = response.data.data[id]['pages'];
            $scope.activePage = $scope.masteries[page]['masteries'];
            $scope.currentPageName = $scope.masteries[page]['name'];
            for (var i = 0; i < $scope.activePage.length; i++){
                var masteryId = $scope.activePage[i]['id'];
                var rank = $scope.activePage[i]['rank'];
                rank = rank - 1;
                name.push($scope.rule['data'][masteryId]['name']);
                description.push($scope.rule['data'][masteryId]['description'][rank]);
            }

            $scope.name = name;
            $scope.description = description;

        }

        $scope.getActive(0);

    });


});

$(function () {
    $('[data-toggle="popover"]').popover()
})