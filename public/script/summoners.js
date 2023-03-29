const topCon = document.querySelector('.top-container');
const tierCon = document.querySelector('.tier-content');
const matchCon = document.querySelector('.match-content');
const topSearch = document.querySelector('#topSearch');
const chart = document.querySelector('.chart');

const gameVersion = '13.6.1'
const token = config.apikey;
const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${location.search.split('?')[1]}?api_key=${token}`
// topCon.innerHTML = '<p>OP.GG에 등록되지 않은 소환사입니다. 확인 후 다시 검색해주세요.</p>'
topCon.innerHTML = '<p>Loading ...</p>'
document.querySelector('.bottom-container').style.display = 'none';
fetch(url)
    .then(res => res.json())
    .then(res => {
        if(res.id){
        topCon.innerHTML = ''
        document.querySelector('.bottom-container').style.display = 'flex';
        const puuid = res.puuid;
        const sumId = res.id;
        const sumName = res.name;
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
                        <div class='tier-box'>
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
            let totalWin = 0;
            let totalLose = 0;
            let totalKill = 0;
            let totalDeath = 0;
            let totalAssist = 0;
            for(i=0;i<gameCount;i++){
                const matchUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/${res[i]}?api_key=${token}`
                fetch(matchUrl).then(res=>res.json())
                .then(res=>{
                    console.log(res)
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
                    let playersData = [];
                    res.info.participants.forEach(player=> {
                        playerData = {champName : `<img src="http://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/champion/${player.championName}.png" alt="">` , playerName : player.summonerName};
                        playersData.push(playerData)
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
                            totalKill += player.kills;
                            totalDeath += player.deaths;
                            totalAssist += player.assists;
                            document.querySelector('.totalKill').innerHTML = totalKill / 10 + "/";
                            document.querySelector('.totalDeath').innerHTML = totalDeath / 10;
                            document.querySelector('.totalAssist').innerHTML = "/" + totalAssist / 10;
                            document.querySelector('.totalKillPer').innerHTML = ((totalKill + totalAssist) / totalDeath).toFixed(2) + ":1";
                            let killPoint = Math.round((player.kills + player.assists)*100 / res.info.teams[userTeamId].objectives.champion.kills);
                            let wardPoint = player.visionWardsBoughtInGame;
                            let csPoint = player.totalMinionsKilled + player.neutralMinionsKilled
                            let csPerMin = csPoint*60 / res.info.gameDuration
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
                                userItemImg,
                                killPoint,
                                wardPoint,
                                csPoint,
                                csPerMin
                            }
                        }
                    });
                    let result = 'win';
                    let resultKo = '승리';
                    if(res.info.teams[userTeamId].win == false){
                        result = 'lose'
                        resultKo = '패배'
                        totalLose ++;
                        console.log(totalLose)
                    }else {
                        result = 'win'
                        resultKo = '승리'
                        totalWin ++;
                    }
                    let totalPer = (totalWin/(totalWin+totalLose))*100

                    // 최근전적 차트
                    chart.style.background = `conic-gradient(#5383e8 0% ${totalPer}%, #e84057 ${totalPer}% 100%)`
                    document.querySelector('.center').innerHTML = Math.round(totalPer)+'%'
                    document.querySelector('.totalresult').innerHTML = "10전 " + totalWin + "승 " + totalLose + "패";
                    
                    let runeInfo = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${userData.userMainRune[0]}/${userData.userMainRune[1]}/${userData.userMainRune[1]}.png`;
                    if(userData.userMainRune[1] == 'LethalTempo'){
                        runeInfo = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${userData.userMainRune[0]}/${userData.userMainRune[1]}/${userData.userMainRune[2]}.png`;
                    }else if(userData.userMainRune[1] == 'Aftershock'){
                        runeInfo = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${userData.userMainRune[0]}/Veteran${userData.userMainRune[1]}/Veteran${userData.userMainRune[1]}.png`;
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
                                <div class='match-first-content'>
                                    <div class='result-color'></div>
                                    <div class='game-info'>
                                        <div>
                                            <span class='game-type'>${gameType[gameNum]}</span>
                                            <span class='game-ago ${result}'>${gameAgo}</span>
                                            <span class='game-result'>${resultKo}</span>
                                            <span class='game-dura'>${gameDura}</span>
                                        </div>
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
                                <div class='play-data'>
                                    <p class='killPoint'>킬관여 ${userData.killPoint}%</p>
                                    <p class='wardPoint'>제어와드 ${userData.wardPoint}</p>
                                    <p class='csPoint'>CS ${userData.csPoint} (${userData.csPerMin.toFixed(1)})</p>
                                </div>
                                <div class='player-info'>
                                    <ul>
                                        <li><div class='champ-img-box'>${playersData[0].champName}</div><span class='player-name'>${playersData[0].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[1].champName}</div><span class='player-name'>${playersData[1].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[2].champName}</div><span class='player-name'>${playersData[2].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[3].champName}</div><span class='player-name'>${playersData[3].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[4].champName}</div><span class='player-name'>${playersData[4].playerName}</span></li>
                                    </ul>
                                    <ul>
                                        <li><div class='champ-img-box'>${playersData[5].champName}</div><span class='player-name'>${playersData[5].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[6].champName}</div><span class='player-name'>${playersData[6].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[7].champName}</div><span class='player-name'>${playersData[7].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[8].champName}</div><span class='player-name'>${playersData[8].playerName}</span></li>
                                        <li><div class='champ-img-box'>${playersData[9].champName}</div><span class='player-name'>${playersData[9].playerName}</span></li>
                                    </ul>
                                </div>
                                <div class='more-info ${result}'>
                                    <span> <i class='bx bx-chevron-down'></i> </span>
                                </div>
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
        })}else {topCon.innerHTML = '<p>OP.GG에 등록되지 않은 소환사입니다. 확인 후 다시 검색해주세요.</p>'
        document.querySelector('.bottom-container').style.display = 'none';}
    }).catch(err =>{
        topCon.innerHTML = '<p>OP.GG에 등록되지 않은 소환사입니다. 확인 후 다시 검색해주세요.</p>'
        document.querySelector('.bottom-container').style.display = 'none';
    })

topSearch.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        location.href = `/summoners?${e.target.value}`;
    }
})