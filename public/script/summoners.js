const topCon = document.querySelector('.top-container');
const tierCon = document.querySelector('.tier-container');
const macthCon = document.querySelector('.match-container');
const token = 'RGAPI-98d55c3a-9912-4fe1-a8e2-1312641ce70a'
const url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${document.cookie.split('=')[1]}?api_key=${token}`
fetch(url)
    .then(res => res.json())
    .then(res => {
        const puuid = res.puuid;
        const sumId = res.id;
        const sumName = res.name;
        const matchIdUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${token}`
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
            console.log(res[0])
            let doms = '';
            const tier = `${res[0].tier}`
            const tierImg = `/images/${tier} (1).png`
            const tierTag = 
            `
            <p>솔로랭크</p>
            <div class="tierInfo">
                <div class='tierImg-box'>
                    <img src="${tierImg}" alt="" class='tierImg'>
                </div>
                <div class="tier">${res[0].tier} ${res[0].rank}</div>
                <div class='resultInfo'>
                    <span>${res[0].wins}승 ${res[0].losses}패</span>
                    <span></span>
                </div>  
            </div>
            `
            doms += tierTag;
            tierCon.innerHTML += doms;
        })


        fetch(matchIdUrl)
        .then(res=>res.json())
        .then(res=>{
            const matchUrl = `https://asia.api.riotgames.com/lol/match/v5/matches/${res[1]}?api_key=${token}`
            fetch(matchUrl).then(res=>res.json())
            .then(res=>{
                console.log(res.info); 
                let userTeamId = 0;
                res.info.participants.forEach(player=> {
                    if(player.summonerName==sumName){
                        if(player.teamId==100){
                            userTeamId = 0;
                        }else {
                            userTeamId = 1;
                        }
                    }
                });
                let result = 'win'
                if(res.info.teams[userTeamId].win == false){
                    result = 'lose'
                }else {
                    result = 'win'
                }
                let gameType = '';
                let gameDuraMin = Math.floor(res.info.gameDuration/60);
                let gameDuraSec = res.info.gameDuration%60;
                let gameDura = `${gameDuraMin}분 ${gameDuraSec}초`
                if(res.info.gameMode == 'CLASSIC'){gameType = '클래식'}
                else gameType = '무작위 총력전';
                let doms = '';
                const macthTag = `
                        <li class='match-box ${result}'>
                            <div class='result-color'></div>
                            <div class='game-info'>
                                <div>
                                    <span class='game-type'>${gameType}</span>
                                    <span class='game-dura'>${gameDura}</span>
                                </div>
                            </div>
                            <div class='user-info'></div>
                            <div class='player-info'></div>
                            <div class='more-info'></div>
                        </li>
                `
                doms += macthTag;
                macthCon.innerHTML += doms;
            })
        })
    })

