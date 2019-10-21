
        let cards = document.getElementsByClassName('card');
        let fronts = document.getElementsByClassName('front');
        let backs = document.getElementsByClassName('back');
        let cardData=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
        let show = new Array; //儲存點擊的html標籤
        let position;
        let index ;
        let compare = []; //儲存卡牌的實際index
        let setSecond=0;
        let complete = 0;
        let counterHandle;
        let gap=[1,1];          //用來計算卡牌翻面時間的基準值
        let frames=[0,0];       //用來計算翻牌期間的幀數，作為條件判斷的值
        let ani=new Array();   //儲存設置的函數

  
    function initail(){
        cardData=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
        show = new Array;
        compare = [];
        setSecond=0;
        complete = 0;
        gap=[1,1];
        frames=[0,0];
        ani.length=0;

        for(i=0;i<cards.length;i++){
            cards[i].removeAttribute('style');
            cards[i].firstChild.removeAttribute('style');
            cards[i].lastChild.removeAttribute('style');
        }


    }
 	
    function startGame(){
        document.getElementsByClassName('seccessMask')[0].style.display="none";
        document.getElementsByClassName('mask')[0].style.display="none";
        document.getElementById('timeCount').innerHTML='0分0秒';

        initail();
        shuffle(cardData);
        counterHandle=setInterval(countDown,1000);
        
        //設定卡片背景圖
        for (let i = 0; i < fronts.length ; i++) {
            fronts[i].style.background="url('img/"+cardData[i]+".png')"
            fronts[i].style.backgroundSize='contain';
            fronts[i].style.backgroundRepeat= 'no-repeat';


        }
     
        //設定卡片點擊事件
        for(i=0;i<cards.length;i++){
            cards[i].onclick=function() {


            //防止選到重複的卡
            if (show.indexOf(this)== -1) {
                document.getElementById('wall').style.display='block';
                show.push(this);
                position = this.attributes.value.value;
                index = cardData[position-1];
                compare.push(index);
                ani[0]=setInterval(fade,25,this,0);

             }
            }
        }

    }
    function countDown(){
        setSecond+=1;
        let Check_i = document.getElementById("timeCount");
        let Cal_Minute = Math.floor(setSecond / 60);
        let Cal_Second = setSecond % 60;//每60秒進位

        Check_i.innerHTML = Cal_Minute + "分" + Cal_Second + "秒";

    }

    function stop(){

        let theButton = document.getElementById('timeStop');
        switch(theButton.value){
            case'暫停遊戲':
                theButton.value = '繼續遊戲';
                clearInterval(counterHandle);
                document.getElementsByClassName('stopMask')[0].style.display='block';
                break;
            case'繼續遊戲':
                theButton.value = '暫停遊戲';
                counterHandle=setInterval(countDown,1000);
                document.getElementsByClassName('stopMask')[0].style.display='none';
                break;
            
        }
    }



 	

    function check(){
        
        if (show.length ==2) {
            if (compare[0]==compare[1]) {
                // console.log('succeed!')
                success();
            }
            else {
                // console.log('failed!')
                document.getElementById("wall").style.display="block";
                ani[0]=setInterval(fade,25,show[0],0);
                ani[1]=setInterval(fade,25,show[1],1);
                show=[];
                compare =[];

            }
        }
    }

    function success(){
            //forwards讓動畫保持在結束的狀態
            show[0].style.animation="opa 1s ease forwards";
            show[1].style.animation="opa 1s ease forwards";
            //display=none排版會自動跑掉
            show[0].onclick=null;
            show[1].onclick=null;
            complete+=2;
            document.getElementById("wall").style.display="none";

            show=[];
            compare =[];
            if (complete == 16) {
                win();
            }

    }



    function win(){
        clearInterval(counterHandle);
        document.getElementsByClassName('seccessMask')[0].style.display="block";

        let finalTimeCount = document.getElementById("timeCount");
        let finalTimeShow=document.getElementById('finalTime');
        finalTimeShow.innerHTML=finalTimeCount.innerHTML;


        }
    
    function shuffle(array){
        for(i=0;i<array.length;i++){
            let seed=Math.floor(Math.random()*array.length);
            let temp=array[i];
            array[i]=array[seed];
            array[seed]=temp;
        }

    }

    function fade(obj,d) {

        if (frames[d] == 10) {
            if (obj.firstChild.style.display=="none" || obj.firstChild.style.display==""){
                obj.lastChild.style.display = 'none';
                obj.firstChild.style.display = 'block';

            }else{
                obj.lastChild.style.display = 'block';
                obj.firstChild.style.display = 'none';


            }
        }
         if(frames[d]>=20){
            if(show.length<2){
                document.getElementById("wall").style.display="none";

            }else{
                document.getElementById("wall").style.display="block";
                setTimeout(check,600);

            }
            clearInterval(ani[d]);
            frames[d]=0;
        }
        else if (frames[d] >= 10) {
            gap[d] += 0.1;
            obj.style.transform = "scaleX(" + gap[d] + ")";
            frames[d] += 1;


        }


        else {
            gap[d] -= 0.1;
            obj.style.transform = 'scaleX(' + gap[d] + ')';
            frames[d] += 1;


        }

    }