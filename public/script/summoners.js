const topCon = document.querySelector('.top-container');
const tierCon = document.querySelector('.tier-container');
const matchCon = document.querySelector('.match-container');
const topSearch = document.querySelector('#topSearch');

const gameVersion = '13.1.1'
const token = config.apikey;
const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${document.cookie.split('=')[1]}?api_key=${token}`
fetch(url)
    .then(res => res.json())
    .then(res => {
        const puuid = res.puuid;
        const sumId = res.id;
        const sumName = res.name;
        if(!sumName){
            topCon.innerHTML = '<p>OP.GG에 등록되지 않은 소환사입니다. 확인 후 다시 검색해주세요.</p>'
            document.querySelector('.bottom-container').style.display = 'none';
        }else {
            const matchIdUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${token}`
            const sumUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${token}`
            document.title = `${sumName} - 게임 전적`;
            console.log(res);
            let doms = '';
            const sumIcon = `https://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/${res.profileIconId}.png`;
            const sumTag = 
            `
            <div class="sumContent">
                <div class="sumInfo">
                    <img src="${sumIcon}" alt="" class='sumIcon'>
                    <span class ='sumLevel'>${res.summonerLevel}</span>
                </div>
                <div class="sumName">${sumName}</div>
            </div>
            `
            doms += sumTag;
            topCon.innerHTML += doms;

            fetch(sumUrl).then(res=>res.json())
            .then(res=>{
                let tierTag;
                let doms = '';
                if(res[0]){
                    console.log(res[0])      
                    const winPer = Math.ceil((res[0].wins/(res[0].wins + res[0].losses))*100)   
                    const tier = `${res[0].tier}`
                    const tierImg = `/images/T${tier.toLowerCase()}.png`
                    tierTag = 
                    `
                        <p>솔로랭크</p>
                        <div class="tierInfo">
                            <div class='tier-content'>
                                <div class='tierImg-box'>
                                    <img src="${tierImg}" alt="" class='tierImg'>
                                </div>
                                <div class='rank-box'>
                                    <div class="tier">${res[0].tier} ${res[0].rank}</div>
                                    <div class='lp'>${res[0].leaguePoints} LP</div>
                                </div>
                            </div>
                            <div class='resultInfo'>
                                <span>${res[0].wins}승 ${res[0].losses}패</span>
                                <span>승률 ${winPer}%</span>
                            </div>  
                        </div>
                    `
                }else {
                    tierTag = `
                        <p>솔로랭크</p>
                        <div class="tierInfo">
                            <span class='unrank'>Unranked</span>
                        </div>
                    `
                }
                doms += tierTag;
                tierCon.innerHTML += doms;
            })


            fetch(matchIdUrl)
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                let gameCount = res.length;
                let spellArys;
                let runeArys;
                fetch('/summonerSpell.json').then(res=>res.json())
                .then(res=>{
                    spellAry = res;
                })
                fetch('/runesReforged.json')
                .then(res=>res.json())
                .then(res=>{
                    runeArys = res;
                })
                let matchAry = [];
                for(i=0;i<gameCount;i++){
                    const matchUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/${res[i]}?api_key=${token}`
                    fetch(matchUrl).then(res=>res.json())
                    .then(res=>{
                        let date = Math.floor((new Date() - new Date(res.info.gameEndTimestamp))/60000);
                        let gameAgo;
                        if(date < 60){
                            gameAgo = Math.floor(date) + '분 전';
                        }else if(date < 1440){
                            gameAgo = Math.floor(date/60) + '시간 전';
                        }else if(date < 43200){
                            gameAgo = Math.floor(date/1440) + '일 전'
                        }else {
                            gameAgo = Math.floor(date/43200) + '달 전'
                        }
                        
                        let userTeamId = 0;
                        let userData = {};
                        res.info.participants.forEach(player=> {
                            if(player.summonerName==sumName){
                                if(player.teamId==100){
                                    userTeamId = 0;
                                }else {
                                    userTeamId = 1;
                                }
                                userChampName = player.championName;
                                let userChamp = userChampName.charAt(0) + userChampName.slice(1).toLowerCase();

                                // rune
                                let userMainRune = [];
                                let userSubRune;
                                runeArys.forEach(rune=>{
                                    if(rune.id == player.perks.styles[0].style){
                                        userMainRune.push(rune.key);
                                    }
                                    if(rune.slots[0].runes.find(rune => rune.id == player.perks.styles[0].selections[0].perk)){
                                        userMainRune.push(rune.slots[0].runes.find(rune => rune.id == player.perks.styles[0].selections[0].perk).key)
                                    }
                                    if(rune.id == player.perks.styles[1].style){
                                        userSubRune = rune.icon;
                                    }
                                })
                                userMainRune.push('LethalTempoTemp');
                                let userKda = [player.kills, player.deaths, player.assists]
                                let userItem = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6];
                                let userItemImg = [];
                                userItem.forEach(item=>{
                                    if(item == 0){
                                        userItemImg.push('<li></li>')
                                    }else{
                                        userItemImg.push(`<li><img src="https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/item/${item}.png" alt=""></li>`)
                                    }
                                })
                                userData = {
                                    userChampName,
                                    userChampLevel : player.champLevel,
                                    userSpell1 : spellAry.find(ary => ary.key == player.summoner1Id).id,
                                    userSpell2 : spellAry.find(ary => ary.key == player.summoner2Id).id,
                                    userMainRune,
                                    userSubRune,
                                    userKda,
                                    userItemImg
                                }
                            }
                        });
                        let result = 'win';
                        let resultKo = '승리';
                        if(res.info.teams[userTeamId].win == false){
                            result = 'lose'
                            resultKo = '패배'
                        }else {
                            result = 'win'
                            result = '승리'
                        }
                        let runeInfo = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${userData.userMainRune[0]}/${userData.userMainRune[1]}/${userData.userMainRune[1]}.png`;
                        if(userData.userMainRune[1] == 'LethalTempo'){
                            runeInfo = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${userData.userMainRune[0]}/${userData.userMainRune[1]}/${userData.userMainRune[2]}.png`;
                        }
                        let kdaPer = ((userData.userKda[0]+userData.userKda[2])/userData.userKda[1]).toFixed(2);
                        if(userData.userKda[1] == 0) {
                            kdaPer = 'Perfect';
                        }
                        let matchDoms = '';
                        let gameDuraMin = Math.floor(res.info.gameDuration/60);
                        let gameDuraSec = res.info.gameDuration%60;
                        let gameDura = `${gameDuraMin}분 ${gameDuraSec}초`
                        const gameType = {
                            400: '일반', //Normal Draft Pick
                            420: '솔랭',
                            430: '일반',
                            440: '자랭',
                            450: '무작위 총력전',
                            700: '격전',
                            800: 'AI 대전',  // Deprecated
                            810: 'AI 대전',  // Deprecated
                            820: 'AI 대전',  // Deprecated
                            830: 'AI 대전',
                            840: 'AI 대전',
                            850: 'AI 대전',
                            900: 'URF',
                            920: '포로왕',
                            1020: '단일모드',
                            1300: '돌격 넥서스',
                            1400: '궁극기 주문서', // Ultimate Spellbook
                            2000: '튜토리얼',
                            2010: '튜토리얼',
                            2020: '튜토리얼',
                        }
                        let gameNum = res.info.queueId
                        const macthTag = `
                                <li class='match-box ${result}'>
                                    <div class='result-color'></div>
                                    <div class='game-info'>
                                        <div>
                                            <span class='game-type'>${gameType[gameNum]}</span>
                                            <span class='game-ago ${result}'>${gameAgo}</span>
                                            <span class='game-result'>${resultKo}</span>
                                            <span class='game-dura'>${gameDura}</span>
                                        </div>
                                    </div>
                                    <div class='user-info'>
                                        <div class='user-middle'>
                                            <div class='champ-img'>
                                                <img src="http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/champion/${userData.userChampName}.png" alt="">
                                            </div>
                                            <span class='userChamp-level'>${userData.userChampLevel}</span>
                                            
                                            <div class='spell-box'>
                                                <img src="https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/spell/${userData.userSpell1}.png" alt="">
                                                <img src="https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/spell/${userData.userSpell2}.png" alt="">
                                            </div>
                                            <div class='rune-box'>
                                                <img src="${runeInfo}" alt="" class='mainRune'>
                                                <img src="https://ddragon.leagueoflegends.com/cdn/img/${userData.userSubRune}" alt="" class='subRune'>
                                            </div>
                                            <div class='kda-box'>
                                                <p><b>${userData.userKda[0]}</b> / <b>${userData.userKda[1]}</b> / <b>${userData.userKda[2]}</b></p>
                                                <p class='kdaPer'>${kdaPer} 평점</p>
                                            </div>
                                        </div>
                                        <ul class='item-box class='${result}''>
                                            ${userData.userItemImg[0]}
                                            ${userData.userItemImg[1]}
                                            ${userData.userItemImg[2]}
                                            ${userData.userItemImg[3]}
                                            ${userData.userItemImg[4]}
                                            ${userData.userItemImg[5]}
                                            ${userData.userItemImg[6]}
                                        </ul>
                                    </div>
                                    <div class='player-info'></div>
                                    <div class='more-info'></div>
                                </li>
                        `
                        matchDoms += macthTag;
                        let matchOb = {id: res.info.gameCreation, dom : matchDoms};
                        matchAry.push(matchOb);
                        if(matchAry.length == gameCount){
                            let matchResult;
                            matchResult = matchAry.sort(function(a,b){
                               return b.id - a.id
                            })
                            matchResult.forEach(match=>{
                                matchCon.innerHTML += match.dom
                            })
                        }
                        // matchCon.innerHTML += matchDoms;
                    })  
                }    
            })
        }
    })
function setCookieHandle(name){
    document.cookie = `Name=${name};max-age=${60*60}`;  
}

topSearch.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        setCookieHandle(`${topSearch.value}`);
        location.reload();
    }
})