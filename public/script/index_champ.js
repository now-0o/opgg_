const allBtn = document.querySelector('.all-btn');
const opionSearch = document.querySelector('.option-search input');
const champWraps = document.querySelectorAll('.champ-wrap');
const arrows= document.querySelectorAll('.arrow');
let searchValue;


window.onload = function(){
    allBtn.parentElement.classList.add('active');
}
fetch('/champ.json')
    .then(res => res.json())
    .then(res => {
        let sortData = [];
        let imgData = [];
        let nameData = [];
        for(champ in res) {
            sortData.push(res[champ].target);
            imgData.push(res[champ].image.full);
            nameData.push(res[champ].id);
        }
        const result = sortData.reduce((acc,curr,idx)=>{
            acc[curr] = imgData[idx];
            return acc;
        }, new Object);

        const out = Object.fromEntries(
            Object.entries(result).sort(([a],[b])=>a<b? -1 :1)
        );
        let num = 0;
        for(key in out){
            let champImg = Object.values(out);
            let champName = Object.keys(out);
            let doms = '';
            const imgTag = `<div class='champ-wrap'><div class='champ-img'><img src="http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champImg[num]}" alt=""></div><span class='champ-name'> ${champName[num]}</span>`
            doms += imgTag;
            document.querySelector('.champ-box').innerHTML += doms;
            num ++;
        }
        laneHandler();
        const optionImg = document.querySelectorAll('.option-btn img');
        const champWraps = document.querySelectorAll('.champ-wrap');
        champWraps.forEach(champWrap=>{
            champWrap.addEventListener('click',function(){
                document.querySelectorAll('.bottom-info').forEach(bottom=>{
                    bottom.classList.remove('accordion');
                })
                arrows.forEach(arrow=>{
                    arrow.classList.remove('active');
                })
                document.querySelector('.click-champ').classList.add('active');
                const champinfo = [];
                let imgInfo = champWrap.firstChild.firstChild.getAttribute('src');
                let koNameInfo = champWrap.lastChild.innerHTML;
                let enNameInfo;
                const laneInfo = [];
                if(champWrap.classList.contains('top')) laneInfo.push('탑');
                if(champWrap.classList.contains('jug')) laneInfo.push('정글');
                if(champWrap.classList.contains('mid')) laneInfo.push('미드');
                if(champWrap.classList.contains('bot')) laneInfo.push('바텀');
                if(champWrap.classList.contains('sup')) laneInfo.push('서폿');
                nameData.forEach(name=>{
                    if(champWrap.innerHTML.indexOf(name)>0) enNameInfo = name; 
                })
                let doms = '';
                const infoTag = `<div class='info-wrap'>
                <div class='img-wrap'>
                    <img src='${imgInfo}'>
                </div>
                <div class='content-wrap'>
                    <span class='name-info'>${koNameInfo}</span>
                    <span class='lane-info'>- ${laneInfo}</span>
                    <div class='skill-wrap'>
                        <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}Q.png'>
                        <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}W.png'>
                        <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}E.png'>
                        <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}R.png'>
                    </div>
                </div>
                </div>`
                doms += infoTag;
                const topInfo = document.querySelector('.top-info');
                topInfo.innerHTML = doms;
                topInfo.classList.add('active');
                document.querySelectorAll('.bottom-info').forEach(botInfo=>{
                    botInfo.classList.add('active');
                })
                fetch(`http://ddragon.leagueoflegends.com/cdn/13.1.1/data/ko_KR/champion/${enNameInfo}.json`)
                .then(res=>res.json())
                .then(res=>{
                    for(champ in res.data){
                        let skillDoms = '';
                        let loreDoms = '';
                        let illuDoms = '';
                        const resChamp = res.data[champ];
                        const skillBox =
                        `
                        <div class='skill-box'>
                            <div class='skillTop'>    
                                <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}Q.png'>
                                <div class='s-name'>${resChamp.spells[0].name}</div>
                            </div>
                            <div class='s-info'>${resChamp.spells[0].description}</div>
                            <div class='s-cooldown'>
                            재사용대기시간(초) : ${resChamp.spells[0].cooldown[0]}/${resChamp.spells[0].cooldown[1]}/${resChamp.spells[0].cooldown[2]}/${resChamp.spells[0].cooldown[3]}/${resChamp.spells[0].cooldown[4]}
                            </div>
                            <div class='skillTop'>    
                                <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}W.png'>
                                <div class='s-name'>${resChamp.spells[1].name}</div>
                            </div>
                            <div class='s-info'>${resChamp.spells[1].description}</div>
                            <div class='s-cooldown'>
                            재사용대기시간(초) : ${resChamp.spells[1].cooldown[0]}/${resChamp.spells[1].cooldown[1]}/${resChamp.spells[1].cooldown[2]}/${resChamp.spells[1].cooldown[3]}/${resChamp.spells[1].cooldown[4]}
                            </div>
                            <div class='skillTop'>    
                                <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}E.png'>
                                <div class='s-name'>${resChamp.spells[2].name}</div>
                            </div>
                            <div class='s-info'>${resChamp.spells[2].description}</div>
                            <div class='s-cooldown'>
                            재사용대기시간(초) : ${resChamp.spells[2].cooldown[0]}/${resChamp.spells[2].cooldown[1]}/${resChamp.spells[2].cooldown[2]}/${resChamp.spells[2].cooldown[3]}/${resChamp.spells[2].cooldown[4]}
                            </div>
                            <div class='skillTop'>    
                                <img src='http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/${enNameInfo}R.png'>
                                <div class='s-name'>${resChamp.spells[3].name}</div>
                            </div>
                            <div class='s-info'>${resChamp.spells[3].description}</div>
                            <div class='s-cooldown'>
                            재사용대기시간(초) : ${resChamp.spells[3].cooldown[0]}/${resChamp.spells[3].cooldown[1]}/${resChamp.spells[3].cooldown[2]}
                            </div>
                        `
                        skillDoms += skillBox;
                        document.querySelector('.skill').innerHTML = skillDoms;
                        const loreBox = 
                        `
                        ${resChamp.lore}
                        `
                        loreDoms += loreBox;
                        document.querySelector('.lore').innerHTML = loreDoms;
                        const illuBox = 
                        `
                        <img src='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${enNameInfo}_0.jpg' alt=''>
                        `
                        illuDoms = illuBox;
                        document.querySelector('.illu').innerHTML = illuDoms;
                    }
                })
            })
        })
        optionImg.forEach((img,i)=>{
            img.parentElement.addEventListener('click',function(e){
                e.preventDefault()
                for(img of optionImg){
                    img.parentElement.parentElement.classList.remove('active');
                    img.setAttribute('src',`/images/index_champ/icon-position-${img.parentElement.getAttribute('value')}.svg`)
                }
                optionImg[i].parentElement.parentElement.classList.add('active');
                optionImg[i].setAttribute('src',`/images/index_champ/icon-position-${optionImg[i].parentElement.getAttribute('value')}-wh.svg`)
                champWraps.forEach((champWrap)=>{
                    champWrap.classList.add('active');
                })
                const champWrapLanes = document.querySelectorAll(`.champ-wrap.${optionImg[i].parentElement.getAttribute('value')}`);
                champWrapLanes.forEach((champWrapLane)=>{
                    if(opionSearch.value===''){
                        champWrapLane.classList.remove('active');
                    }
                    else {
                        if(champWrapLane.innerHTML.indexOf(searchValue)>-1){
                            champWrapLane.classList.remove('active');
                        }
                    }
                })
            });
        })
        opionSearch.addEventListener('keyup',()=>{
            searchValue = opionSearch.value;
            champWraps.forEach(champ=>{
                champ.classList.add('active');
                if(champ.innerHTML.indexOf(searchValue)>-1){
                    champ.classList.remove('active');
                }
            })
        })
})

function laneHandler(){
    const champs = document.querySelectorAll('.champ-wrap');
    const top = [0,2,3,5,6,8,15,18,22,24,28,32,39,40,42,48,52,55,59,61,66,67,70,76,84,85,86,92,95,96,98,99,100,101,102,103,105,108,112,114,,118,124,126,129,134,137,140,141,142,148,151,154,156,158]
    const jug = [3,4,10,11,12,16,20,22,26,28,34,35,36,37,40,46,50,52,57,59,62,63,66,71,73,77,80,82,93,94,95,98,101,103,106,109,112,115,128,131,136,144,146,147,149,157,161]
    const mid = [1,2,3,13,16,18,21,22,24,31,33,38,47,49,51,55,57,58,62,65,67,72,75,76,79,81,83,84,85,89,90,92,93,97,99,105,112,115,116,118,119,120,121,125,127,128,129,132,139,143,146,147,150,151,152,156,159,160]
    const bot = [14,17,29,43,45,48,60,65,72,74,87,91,92,107,110,117,120,121,123,128,130,133,135,138,150,153]
    const sup = [7,9,19,21,23,25,27,30,37,41,44,51,53,54,56,63,64,65,68,69,72,78,80,88,91,104,111,112,113,116,122,125,145,153,155,156,160]
    top.forEach(num=>{
        champs[num].classList.add('top');
    })
    jug.forEach(num=>{
        champs[num].classList.add('jug');
    })
    mid.forEach(num=>{
        champs[num].classList.add('mid');
    })
    bot.forEach(num=>{
        champs[num].classList.add('bot');
    })
    sup.forEach(num=>{
        champs[num].classList.add('sup');
    })
    for(champ of champs){
        champ.classList.add('all')
    }
}

arrows.forEach(arrow=>{
    arrow.addEventListener('click',function(){
        arrow.classList.toggle('active');
        this.parentElement.parentElement.classList.toggle('accordion');
    })
})
