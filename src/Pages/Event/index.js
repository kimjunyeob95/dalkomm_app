/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useParams,useHistory } from "react-router-dom";
import {fn_click_init,fn_click_off,fn_first_init,fn_reset_interval,fn_action,fn_event_start} from "Jquery/event_jquery";
import { tabLink } from "Jquery/Jquery";
import { Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";

import { SERVER_DALKOMM_SUGAR } from "Config/Server";

export default function Index() {
  const [axioData, setData] = useState();
  const [Init,setInit] = useState(true);
  const history = useHistory(true);
  const {tu_email,tu_phone,tu_nick,tu_birthday} = useParams();
  
  useEffect(() => {
    axios
        .all([
          axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/createUser?tu_email=${tu_email}&tu_phone=${tu_phone}&tu_nick=${tu_nick}&tu_birthday=${tu_birthday}`),
        ])
        .then(
          axios.spread((res1) => {
            let res1_data = res1.data;
            let userType = res1_data.msg === "기존유저" ? "기존유저" : "신규유저";
            setData((origin) => {
              return {
                ...origin,
                userType
              };
            });
            fn_first_init();
          })
        );
    return ()=>{
        fn_first_init();
        fn_reset_interval();
    }
  }, []);
  
  useEffect(() => {
    SwiperCore.use([Autoplay]);
    fn_fruit_update();
    if(axioData && Init){
        fn_click_init();
        setInit(false);
    }
  }, [axioData]);

  const goEvent_page = () =>{
      if(axioData.userType === "기존유저"){
        fn_getBean();
        $('#CoffeeTreeGame').addClass('active');
      }else{
        //신규유저
        if($("#CoffeeTreeIntro").hasClass("active")){
            fn_getBean();
            $('#CoffeeTreeIntro').removeClass('active');
            $('#CoffeeTreeGame').addClass('active');
        }else{
            $('#CoffeeTreeGame').removeClass('active');
            $('#CoffeeTreeIntro').addClass('active');
        }
      }
  }
  const fn_getBean = () => {
    axios
    .all([
      axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/getBean?tu_email=${tu_email}`),
      axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/getInfo?tu_email=${tu_email}`),
    ])
    .then(
      axios.spread((res1,res2) => {
        let getBean = res1?.data?.data?.getBean;
        let userInfo = {...res1?.data?.data?.user , ...res2?.data?.data};
        setData((origin) => {
          return {
            ...origin,
            getBean,
            userInfo,
          };
        });
        fn_event_start();
      })
    );
  }

  const handleFruitChart = () => {
    window.$('.fruit-chart').easyPieChart({
        barColor: "#ff592e",
        trackColor: "#f0f0f0",
        scaleLength: 0,
        lineWidth: 5,
        lineCap: "circle",
        animate: 1200,
    });
    for (let index = 0; index < 5; index++) {
        window?.$('.fruit-chart')?.eq(index)?.data("easyPieChart")?.update(0);    
    }
    fn_fruit_update();
  }

  const fn_fruit_update = () =>{
    let _length = $('.fruit-chart').length;
    for (let index = 0; index < _length; index++) {
        let _value = $('.fruit-chart')?.eq(index)?.attr('data-percent');
        window?.$('.fruit-chart')?.eq(index)?.data("easyPieChart")?.update(_value);    
    }
  }
  const handleToggle = (e,type="sound") =>{
      if(type==="sound"){
        $('.btn.sound').toggleClass('mute');
      }else{
        let attention = $(e).parents('.item.attention');
        attention.toggleClass('active');
        if(attention.hasClass('active')){
            $(e).text('접기');
        } else {
            $(e).text('펼치기');
        }
      }
  }

  const backPage = () => {
    if(axioData.userType === "기존유저"){
        $('#CoffeeTreeGame').removeClass('active');
        $('#CoffeeTreeHome').addClass('active');
      }else{
        $('#CoffeeTreeGame').removeClass('active');
        $('#CoffeeTreeIntro').addClass('active');
      }
  }

  const handleHarvest = (e) => {
      if(axioData?.userInfo?.tt_step >= 3){
        axios
        .all([
          axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/harvestTree?tu_email=${tu_email}`),
        ])
        .then(
          axios.spread((res1) => {
              if(res1.data.code==="true"){
                let userInfo = { ...axioData?.userInfo,...res1?.data?.userInfo};
                let harvestBean = res1?.data?.harvestBean;
                setData((origin) => {
                    return {
                        ...origin,
                        userInfo,
                        harvestBean
                    };
                });
              }
          })
        );
      }
  }

  const handleChangeBean = (type) => {
    axios
    .all([
      axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/changeBean?tu_email=${tu_email}&bean_color=${type}`),
    ])
    .then(
      axios.spread((res1) => {
          if(res1.data.code==="true"){
            let userInfo = {...axioData.userInfo,ts_bean_count:res1.data.data.ts_bean_count,ts_bean_orange:res1.data.data.ts_bean_orange,ts_bean_pink:res1.data.data.ts_bean_pink,ts_bean_purple:res1.data.data.ts_bean_purple,ts_bean_red:res1.data.data.ts_bean_red,ts_bean_yellow:res1.data.data.ts_bean_yellow};
            setData((origin) => {
                return {
                    ...origin,
                    userInfo
                };
            });
            
          }
      })
    );
  }

  const goMain = () =>{
    fn_click_off();
    fn_reset_interval();
      history.push('/');
  }

  const handleAction = (type) => {
    axios
    .all([
      axios.get(`${SERVER_DALKOMM_SUGAR}/api/event/postAction?tu_email=${tu_email}`),
    ])
    .then(
      axios.spread((res1) => {
        if(res1.data.code==="true"){
            let userInfo = {...axioData.userInfo,tu_possible_action: "F"};
            setData((origin) => {
              return {
                ...origin,
                userInfo,
              };
            });
        }
        fn_action(type);
      })
    );
  }

  if (axioData) {
    console.log(axioData);
    return (
      <React.Fragment>
     {/* 나의 달콤 커피나무 - 메인 */}
    <div id="CoffeeTreeHome" className="overlay coffee-tree active">
		<div className="modal-wrap">
            <div className="header modal-header">
                <button onClick={()=>goMain()} type="button" className="btn back">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="title-wrap">
                        <h2 className="section-title x-large">
                            나의<br />
                            달콤 커피나무
                        </h2>
                        <p className="text">
                            달콤앱 출석체크 하고<br />
                            매일 커피나무를 키워보세요!
                        </p>
                    </div>

                    <div className="img-wrap">
                        <img src="/@resource/images/event/illust_intro.png" alt="나의 달콤 커피나무 일러스트 이미지" className="img" />
                    </div>

                    <div className="btn-area">
                        <button type="button" className="btn close-modal webtoon-start" onClick={()=>goEvent_page()}>
                            커피나무 키우기를 시작할래요
                        </button>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 메인 */}

    {/* 나의 달콤 커피나무 - 인트로 */}
    <div id="CoffeeTreeIntro" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <button type="button" className="btn back btn-close">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="webtoon-wrap">
                        <img src="/@resource/images/event/webtoon.jpg" alt="" className="img" />
                    </div>

                    <div className="btn-area">
                        <button type="button" className="btn dark large full event-start" pop-target="#CoffeeTreeGame" onClick={()=>goEvent_page()}>커피나무 키우러 가기</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 인트로 */}

    {/* 나의 달콤 커피나무 - 게임 */}
    <div id="CoffeeTreeGame" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <button type="button" className="btn back" onClick={()=>backPage()}>
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
                <div className="btn-area flex-center">
                    <button type="button" className="btn close-modal game-state" pop-target="#myCoffeeTree">
                        <strong className="num fc-orange">{axioData?.userInfo?.ts_bean_count}</strong>
                    </button>

					<button type="button" className="btn close-modal event-benefit">
						<i className="ico benefit">
							<span>이벤트 혜택</span>
						</i>
					</button>
					<button type="button" className="btn close-modal event-guide">
						<i className="ico info">
							<span>이벤트 안내</span>
						</i>
					</button>
                    <button type="button" className="btn sound" onClick={(e)=>handleToggle(e.currentTarget)}> {/* [D] 볼륨 음소거시 .mute 클래스명 활성화 */}
						<span className="blind">볼륨</span>
					</button>
				</div>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="title-wrap">

                        <h2 className="section-title large">
                            오늘 나의 커피나무가<br />
                            이만큼 자랐어요!
                        </h2>

                        <p className="text">
                            커피나무에 <span className="fc-orange">물이 부족</span> 하네요!
                        </p> 
                    </div>
                    
                    <div className={`game-sec ${
                        //나무 업그레이드X 분기
                        axioData?.userInfo?.tt_upgrade_flag !== "T" ? 
                        axioData?.userInfo?.tt_step === 0 ? "ready" : 
                        axioData?.userInfo?.tt_step === 1 ? "step1-roop" :
                        axioData?.userInfo?.tt_step === 2 ? "step2-roop" :
                        axioData?.userInfo?.tt_step === 3 ? "step3-roop" :
                        axioData?.userInfo?.tt_step === 4 && axioData?.userInfo?.tt_bean_count > 0 ? "step4-roop fruit" :
                        axioData?.userInfo?.tt_step === 4 && axioData?.userInfo?.tt_bean_count === 0 ? "step4-roop" : ""
                    : 
                    //나무 업그레이드O 분기
                    axioData?.userInfo?.tt_upgrade_flag === "T" ? 
                    axioData?.userInfo?.tt_step === 1 ? "step1" :
                    axioData?.userInfo?.tt_step === 2 ? "step2" :
                    axioData?.userInfo?.tt_step === 3 ? "step3" :
                    axioData?.userInfo?.tt_step === 4 ? "step4" : ""
                    :""}`}> {/* .game-sec 상태
                        .game-sec.ready : 최초 준비상태
                        .game-sec.step1 : 1단계 진화
                        .game-sec.step1-roop : 1단계 진행
                        .game-sec.step2 : 1단계 -> 2단계 진화
                        .game-sec.step2-roop : 2단계 진행
                        .game-sec.step3 : 2단계 -> 3단계 진화
                        .game-sec.step3-roop : 3단계 진행
                        .game-sec.step4 : 3단계 -> 4단계 진화
                        .game-sec.step4-roop : 4단계 진행
                        .game-sec.step4-roop.fruit : 4단계 진행 열매
                    */}
                        <div className="sequence-area">
                            <div className="sequence-tree">
                                <div className="animation-wrap">
                                    <img src="/@resource/images/event/tree_normal.png" alt="커피나무 0단계" className="img normal" />

                                    <img src="/@resource/images/event/sequence/tree1/tree_step1_0.png" alt="커피나무 1단계" className="img tree-animation step1" />
                                    <img src="/@resource/images/event/sequence/tree1_roop/tree_step1_roop_0.png" alt="커피나무 1단계 루핑" className="img tree-animation step1-roop" />
                                    
                                    <img src="/@resource/images/event/sequence/tree2/tree_step2_0.png" alt="커피나무 2단계" className="img tree-animation step2" />
                                    <img src="/@resource/images/event/sequence/tree2_roop/tree_step2_roop_0.png" alt="커피나무 2단계 루핑" className="img tree-animation step2-roop" />

                                    <img src="/@resource/images/event/sequence/tree3/tree_step3_0.png" alt="커피나무 3단계" className="img tree-animation step3" />
                                    <img src="/@resource/images/event/sequence/tree3_roop/tree_step3_roop_0.png" alt="커피나무 3단계 루핑" className="img tree-animation step3-roop" />

                                    <img src="/@resource/images/event/sequence/tree4/tree_step4_0.png" alt="커피나무 4단계" className="img tree-animation step4" />
                                    <img src="/@resource/images/event/sequence/tree4_roop/tree_step4_roop_164.png" alt="커피나무 4단계 루핑" className="img step4-roop" />
                                    <img src="/@resource/images/event/sequence/tree4_roop/tree_step4_roop_0.png" alt="커피나무 4단계 루핑" className="img tree-animation step4-roop" />
                                </div>
                            </div>
                            <div className="float sequence-fruit">
                                <div className="fruit-brunch top fruit-3 growing"> 
                                {/* [D]  
                                     * 열매 생겼을때 : .fruit-brunch.growing
                                     * 열매 갯수 상태 
                                    .fruit-brunch.fruit-1 : 열매 하나
                                    .fruit-brunch.fruit-2 : 열매 두개
                                    .fruit-brunch.fruit-3 : 열매 세개 
                                */}
                                    <div className="img-wrap img1">
                                        <img src="/@resource/images/event/sequence/fruit_red/fruit_red_0.png" alt="" className="img fruit-animation fruit purple" />
                                        {/* [D] 열린 열매 색상 
                                        .fruit.yellow : Yellow 열매
                                        .fruit.orange : Orange 열매
                                        .fruit.pink   : Pink 열매
                                        .fruit.red    : Red 열매
                                        .fruit.purple : Purple 열매
                                        */}
                                    </div>
                                    <div className="img-wrap img2">
                                        <img src="/@resource/images/event/sequence/fruit_orange/fruit_orange_0.png" alt="" className="img fruit-animation fruit red" />
                                    </div>
                                    <div className="img-wrap img3">
                                        <img src="/@resource/images/event/sequence/fruit_red/fruit_red_0.png" alt="" className="img fruit-animation fruit orange" />
                                    </div>
                                </div>
                                <div className="fruit-brunch bottom fruit-3 growing"> {/* [D]  
                                     * 열매 생겼을때 : .fruit-brunch.growing
                                     * 열매 갯수 상태 
                                    .fruit-brunch.fruit-1 : 열매 하나
                                    .fruit-brunch.fruit-2 : 열매 두개
                                    .fruit-brunch.fruit-3 : 열매 세개 */}
                                    <div className="img-wrap img1">
                                        <img src="/@resource/images/event/sequence/fruit_red/fruit_red_0.png" alt="" className="img fruit-animation fruit red" />
                                    </div>
                                    <div className="img-wrap img3">
                                        <img src="/@resource/images/event/sequence/fruit_red/fruit_red_0.png" alt="" className="img fruit-animation fruit pink"/>
                                    </div>
                                    <div className="img-wrap img2">
                                        <img src="/@resource/images/event/sequence/fruit_red/fruit_red_0.png" alt="" className="img fruit-animation fruit purple" />
                                    </div>
                                </div>
                            </div>
                            <div className="float sequence-water">
                                <img src="/@resource/images/event/sequence/water/water_25.png" alt="물" className="img water-animation" />
                            </div>
                            <div className="float sequence-heart">
                                <img src="/@resource/images/event/sequence/heart/heart_0.png" alt="하트" className="img heart-animation" />
                            </div>
                        </div>
                        
                        <ul className="btn-area ingredient-list">
                            <li>
                                <button type="button" className="btn sunshine" onClick={()=>handleAction('sunshine')}>
                                    <svg viewBox="0 0 24 24">
                                        <g>
                                            <circle className="path-stroke" cx="5" cy="5" r="5" transform="translate(6 6)"/>
                                            <path className="path-stroke" d="M0 0v2" transform="translate(11)"/>
                                            <path className="path-stroke" d="M0 0v2" transform="translate(11 20)"/>
                                            <path className="path-stroke" d="m0 0 1.42 1.42" transform="translate(3.22 3.22)"/>
                                            <path className="path-stroke" d="m0 0 1.42 1.42" transform="translate(17.36 17.36)"/>
                                            <path className="path-stroke" d="M0 0h2" transform="translate(0 11)"/>
                                            <path className="path-stroke" d="M0 0h2" transform="translate(20 11)"/>
                                            <path className="path-stroke" d="M0 1.42 1.42 0" transform="translate(3.22 17.36)"/>
                                            <path className="path-stroke" d="M0 1.42 1.42 0" transform="translate(17.36 3.22)"/>
                                        </g>
                                    </svg>
                                </button>
                                <span className="speech-bubble small ani"> {/* [D] 해당 텍스트 들어오는지 확인 필요 */}
                                    햇빛을 주세요!
                                </span>
                            </li>
    
                            <li>
                                <button type="button" className="btn water" onClick={()=>handleAction('water')}>
                                    <svg viewBox="0 0 24 23.999">
                                        <g>
                                            <path className="path-transparent" d="M430 354h-24v-24h24v24z" transform="translate(-406 -330)"/>
                                            <path className="path-stroke" d="m7.3 0 5.168 5.168a7.3 7.3 0 1 1-10.327 0z" transform="translate(5 3)"/>
                                        </g>
                                    </svg>
                                </button>
                                <span className="speech-bubble small ani"> {/* [D] 해당 텍스트 들어오는지 확인 필요 */}
                                    물을 주세요!
                                </span>
                            </li>
                            
                            <li>
                                <button type="button" className="btn heart" onClick={()=>handleAction('heart')}>
                                    <svg viewBox="0 0 24 23.999">
                                        <g>
                                            <path className="path-stroke" d="M7207.5-7198.431 7200-7191l-7.5-7.431m0 0a5 5 0 0 1-.1-7.069 5 5 0 0 1 7.07-.091 3.851 3.851 0 0 1 .53.6 5 5 0 0 1 7-1 5 5 0 0 1 1 7 4.934 4.934 0 0 1-.49.56" transform="translate(-7187.993 7211.004)"/>
                                        </g>
                                    </svg>
                                </button>
                                <span className="speech-bubble small ani"> {/* [D] 해당 텍스트 들어오는지 확인 필요 */}
                                    사랑을 주세요!
                                </span>
                            </li>
                            
                            <li className={axioData?.userInfo?.tt_bean_count > 0 ? "active" : ""}> {/* [D] 커피나무 키우기 액션 .active 활성화 */}
                                <button type="button" className="btn harvest" onClick={(e)=>handleHarvest(e.currentTarget)}>
                                    <svg viewBox="0 0 24 24">
                                        <path className="path-transparent" d="M430 354h-24v-24h24v24z" transform="translate(-406 -330)"/>
                                        <g>
                                            <path className="path-stroke" d="M7193-7191c.5-4.5 2.5-8 7-10" transform="translate(-7187.992 7212)"/>
                                            <path className="path-stroke" d="M7197-7194c6.22 0 10.5-3.29 11-12v-2h-4c-9 0-12 4-12 9a6.462 6.462 0 0 0 2 5z" transform="translate(-7187.992 7212)"/>
                                        </g>
                                    </svg>
                                </button>
                                <span className="speech-bubble small ani">
                                    열매를 따요!
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 게임 */}

    {/* 나의 달콤 커피나무 - 게임_열매수확 팝업 */}
    <div id="layerHarvest" className="overlay layer-fruit">
        <div className="popup">
            <div className="popup-body">
                <p className="title">열매를 수확했어요!</p>
                <ul className="data-list col">
                    {axioData?.harvestBean?.map((e,i) => {
                        if(e?.value > 0){
                            return (
                                <li>
                                    <div className={`item fruit ${e.type}`}>
                                        <div className="img-wrap medium"></div>
                                        <span className="number">{e.value}개</span>
                                    </div>
                                </li>
                            )
                        }
                    }
                    )}
                </ul>
                <p className="text">
                {axioData?.harvestBean?.map((e,i) => {
                    if(e?.value > 0){
                        if(i===4){
                            return (
                                e.type+" "
                            )
                        }else{
                            return (
                                e.type+","
                            )
                        }
                    }
                })}
                    열매를 획득했어요.
                </p>
            </div>
            <div className="popup-footer">
                <button className="btn full bg-point large btn-close">확인</button>
            </div>
        </div>
    </div>
    {/* 나의 달콤 커피나무 - 게임_열매수확 팝업 */}

    {/* 나의 달콤 커피나무 - 나의 커피열매 */}
    <div id="myCoffeeTree" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <h1 className="page-title">
					나의 커피열매
				</h1>
                <button type="button" className="btn back btn-close">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="section title-wrap">
                        <h2 className="section-title large">
                            총 <span className="number fc-orange">{axioData?.userInfo?.ts_bean_count}</span>개의 열매를<br />
                            모으셨어요!
                        </h2>
                    </div>

                    <div className="section state-wrap">

                        <div className="flex-list">
                            <h3 className="section-title small">열매 모으는 중</h3>
                            <button type="button" className="btn open-pop" pop-target="#layerMethod">
                                <i className="ico help-g"></i>
                            </button>
                        </div>

                        <div className="section fruit-bar">
                            <div className="bar">
                                <span className="bar-ex"></span>
                                <span className="bar-state" style={{width:`${( ((axioData?.userInfo?.ts_bean_yellow && 1) + (axioData?.userInfo?.ts_bean_orange && 1) + (axioData?.userInfo?.ts_bean_pink && 1)+ (axioData?.userInfo?.ts_bean_red && 1)+ (axioData?.userInfo?.ts_bean_purple && 1)) / 5 *100)}%`}}> {/* [D] 0%일때 ' style="width:0%" ' 으로 반영되어야 디자인에 맞는 화면으로 나옵니다. */}
                                    <em className="num">{( ((axioData?.userInfo?.ts_bean_yellow && 1) + (axioData?.userInfo?.ts_bean_orange && 1) + (axioData?.userInfo?.ts_bean_pink && 1)+ (axioData?.userInfo?.ts_bean_red && 1)+ (axioData?.userInfo?.ts_bean_purple && 1)) / 5 *100)}%</em>
                                </span>
                            </div>

                            <div className="text">열매 {5-( (axioData?.userInfo?.ts_bean_yellow && 1) + (axioData?.userInfo?.ts_bean_orange && 1) + (axioData?.userInfo?.ts_bean_pink && 1)+ (axioData?.userInfo?.ts_bean_red && 1)+ (axioData?.userInfo?.ts_bean_purple && 1))}
                            개 더 모으면 참여 완료!</div>
                        </div>

                        <ul className="section data-list">
                            <li>
                                <div className="item fruit yellow">
                                    <div className="fruit-wrap">
                                        <div className="img-wrap"></div>
                                        <span className="name en">Yellow</span>
                                    </div>
                                    <div className="number">
                                        <span className="fc-orange">{axioData?.userInfo?.ts_bean_yellow}</span>개
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="item fruit orange">
                                    <div className="fruit-wrap">
                                        <div className="img-wrap"></div>
                                        <span className="name en">Orange</span>
                                    </div>
                                    <div className="number">
                                        <span className="fc-orange">{axioData?.userInfo?.ts_bean_orange}</span>개
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="item fruit pink">
                                    <div className="fruit-wrap">
                                        <div className="img-wrap"></div>
                                        <span className="name en">Pink</span>
                                    </div>
                                    <div className="number">
                                        <span className="fc-orange">{axioData?.userInfo?.ts_bean_pink}</span>개
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="item fruit red" >
                                    <div className="fruit-wrap">
                                        <div className="img-wrap"></div>
                                        <span className="name en">Red</span>
                                    </div>
                                    <div className="number">
                                        <span className="fc-orange">{axioData?.userInfo?.ts_bean_red}</span>개
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="item fruit purple" >
                                    <div className="fruit-wrap">
                                        <div className="img-wrap"></div>
                                        <span className="name en">Purple</span>
                                    </div>
                                    <div className="number">
                                        <span className="fc-orange">{axioData?.userInfo?.ts_bean_purple}</span>개
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className={`btn-area ${axioData?.userInfo?.ts_bean_yellow > 30 || axioData?.userInfo?.ts_bean_orange > 30 || axioData?.userInfo?.ts_bean_pink > 30 || axioData?.userInfo?.ts_bean_red > 30 ? "active" : ""}`}>
                        <button type="button" className="btn dark large full close-modal fruit-change" onClick={()=>handleFruitChart()}>열매 교환하기</button>
                        <span className="speech-bubble small bg-point ani">
                            교환 가능한 열매가 있어요!
                        </span>
                    </div>

                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 나의 커피열매 */}

    {/* 나의 달콤 커피나무 - 나의 커피열매 (열매 모으는 방법 팝업) */}
    <div id="layerMethod" className="overlay layer-fruit">
        <div className="popup">
            <div className="popup-body">
                <p className="title">열매 모으는 방법</p>
                <ul className="data-list col-2">
                    <li>
                        <div className="item harvest-method">
                            <div className="change-wrap">
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_yellow.png" alt="" className="img" />
                                </span>
                                <i className="ico change"></i>
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_red.png" alt="" className="img" />
                                </span>
                            </div>
                            <div className="text-wrap">
                                <p className="text">Yellow 30개</p>
                                <p className="text"><strong>Red 1개로 교환</strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item harvest-method">
                            <div className="change-wrap">
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_orange.png" alt="" className="img" />
                                </span>
                                <i className="ico change"></i>
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_red.png" alt="" className="img" />
                                </span>
                            </div>
                            <div className="text-wrap">
                                <p className="text">Orange 30개</p>
                                <p className="text"><strong>Red 1개로 교환</strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item harvest-method">
                            <div className="change-wrap">
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_pink.png" alt="" className="img" />
                                </span>
                                <i className="ico change"></i>
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_red.png" alt="" className="img" />
                                </span>
                            </div>
                            <div className="text-wrap">
                                <p className="text">Pink 30개</p>
                                <p className="text"><strong>Red 1개로 교환</strong></p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item harvest-method">
                            <div className="change-wrap">
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_red.png" alt="" className="img" />
                                </span>
                                <i className="ico change"></i>
                                <span className="img-wrap">
                                    <img src="/@resource/images/event/fruit_purple.png" alt="" className="img" />
                                </span>
                            </div>
                            <div className="text-wrap">
                                <p className="text">Red 30개</p>
                                <p className="text"><strong>Purple 1개로 교환</strong></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="popup-footer">
                <button className="btn full dark large btn-close">확인</button>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 나의 커피열매 (열매 모으는 방법 팝업) */}

    {/* 나의 달콤 커피나무 - 커피열매교환 */}
    <div id="fruitChange" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <h1 className="page-title">
					커피열매 교환
				</h1>
                <button type="button" className="btn back btn-close">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="section">
                        <h3 className="section-title small">현재 보유 열매</h3>

                        <div className="slider-area">
                        <Swiper
                            id="fruitSlider"
                            className="swiper-container section-slider"
                            slidesPerView={"auto"}
                            freeMode={false}
                            observer={true}
                            observeParents={true}
                        >
                                <ul className="swiper-wrapper data-list">
                                    <li className="swiper-slide">
                                        <div className="item fruit yellow">
                                            <div className="chart-wrap">
                                                <div className="fruit-chart" data-percent={axioData?.userInfo?.ts_bean_yellow ? Math.floor((axioData?.userInfo?.ts_bean_yellow /30)*100) : 0}></div>
                                                <div className="img-wrap"></div>
                                            </div>
                                            <div className="data-wrap">
                                                <span className="name en">Yellow</span>
                                                <span className="number">{axioData?.userInfo?.ts_bean_yellow}개</span>
                                            </div>
                                        </div>
                                    </li>
    
                                    <li className="swiper-slide">
                                        <div className="item fruit orange">
                                            <div className="chart-wrap">
                                                <div className="fruit-chart" data-percent={axioData?.userInfo?.ts_bean_orange ? Math.floor((axioData?.userInfo?.ts_bean_orange /30)*100) : 0}></div>
                                                <div className="img-wrap"></div>
                                            </div>
                                            <div className="data-wrap">
                                                <span className="name en">Orange</span>
                                                <span className="number">{axioData?.userInfo?.ts_bean_orange}개</span>
                                            </div>
                                        </div>
                                    </li>
    
                                    <li className="swiper-slide">
                                        <div className="item fruit pink">
                                            <div className="chart-wrap">
                                                <div className="fruit-chart" data-percent={axioData?.userInfo?.ts_bean_pink ? Math.floor((axioData?.userInfo?.ts_bean_pink /30)*100) : 0}></div>
                                                <div className="img-wrap"></div>
                                            </div>
                                            <div className="data-wrap">
                                                <span className="name en">Pink</span>
                                                <span className="number">{axioData?.userInfo?.ts_bean_pink}개</span>
                                            </div>
                                        </div>
                                    </li>
    
                                    <li className="swiper-slide">
                                        <div className="item fruit red" >
                                            <div className="chart-wrap">
                                                <div className="fruit-chart " data-percent={axioData?.userInfo?.ts_bean_red ? Math.floor((axioData?.userInfo?.ts_bean_red /30)*100) : 0}></div>
                                                <div className="img-wrap"></div>
                                            </div>
                                            <div className="data-wrap">
                                                <span className="name en">Red</span>
                                                <span className="number">{axioData?.userInfo?.ts_bean_red}개</span>
                                            </div>
                                        </div>
                                    </li>
    
                                    <li className="swiper-slide">
                                        <div className="item fruit purple" >
                                            <div className="chart-wrap">
                                                <div className="fruit-chart" data-percent={axioData?.userInfo?.ts_bean_purple ? Math.floor((axioData?.userInfo?.ts_bean_purple /30)*100) : 0}></div>
                                                <div className="img-wrap"></div>
                                            </div>
                                            <div className="data-wrap">
                                                <span className="name en">Purple</span>
                                                <span className="number">{axioData?.userInfo?.ts_bean_purple}개</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </Swiper>
                        </div>
                    </div>

                    <div className="section fruit-exchange">
                        <div className="fruit-red">
                            <h3 className="section-title small">Red 열매 교환하기</h3>

                            <ul className="data-list">
                                <li className={axioData?.userInfo?.ts_bean_yellow >= 30  ? "exchange" : ""}> {/* [D] 열매 교환 가능시 .exchange 활성화 */}
                                    <div className="item fruit-ticket">
                                        <div className="fruit-wrap">
                                            <div className="img-wrap">
                                                <img src="/@resource/images/event/fruit_yellow.png" alt="" className="img" />
                                            </div>
                                            <div className="text-wrap">
                                                <p className="name">Yellow</p>
                                                <p className="text">
                                                {axioData?.userInfo?.ts_bean_yellow >= 30 
                                                ? `열매 ${Math.floor(axioData?.userInfo?.ts_bean_yellow /30)}개를 교환할 수 있어요.`
                                                : "열매가 부족해요."}
                                                </p> 
                                            </div>
                                        </div>
                                        <div className="data-wrap">
                                            <button onClick={()=>handleChangeBean("yellow")} type="button" className={`btn ${axioData?.userInfo?.ts_bean_yellow >= 30  ? "fruit-red" : ""}`}>
                                                <p className="data">교환</p>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className={axioData?.userInfo?.ts_bean_orange >= 30  ? "exchange" : ""}>
                                    <div className="item fruit-ticket">
                                        <div className="fruit-wrap">
                                            <div className="img-wrap">
                                                <img src="/@resource/images/event/fruit_orange.png" alt="" className="img" />
                                            </div>
                                            <div className="text-wrap">
                                                <p className="name">Orange</p>
                                                <p className="text">
                                                {axioData?.userInfo?.ts_bean_orange >= 30 
                                                ? `열매 ${Math.floor(axioData?.userInfo?.ts_bean_orange /30)}개를 교환할 수 있어요.`
                                                : "열매가 부족해요."}
                                                </p> 
                                            </div>
                                        </div>
                                        <div className="data-wrap">
                                            <button onClick={()=>handleChangeBean("orange")} type="button" className={`btn ${axioData?.userInfo?.ts_bean_orange >= 30  ? "fruit-red" : ""}`} pop-target="#layerChange">
                                                <p className="data">교환</p>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className={axioData?.userInfo?.ts_bean_pink >= 30 ? "exchange" : ""}>
                                    <div className="item fruit-ticket">
                                        <div className="fruit-wrap">
                                            <div className="img-wrap">
                                                <img src="/@resource/images/event/fruit_pink.png" alt="" className="img" />
                                            </div>
                                            <div className="text-wrap">
                                                <p className="name">Pink</p>
                                                <p className="text">
                                                {axioData?.userInfo?.ts_bean_pink >= 30 
                                                ? `열매 ${Math.floor(axioData?.userInfo?.ts_bean_pink /30)}개를 교환할 수 있어요.`
                                                : "열매가 부족해요."}
                                                </p> 
                                            </div>
                                        </div>
                                        <div className="data-wrap">
                                            <button onClick={()=>handleChangeBean("pink")} type="button" className={`btn ${axioData?.userInfo?.ts_bean_pink >= 30  ? "fruit-red" : ""}`} pop-target="#layerChange">
                                                <p className="data">교환</p>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="fruit-purple" >
                            <h3 className="section-title small">Purple 열매 교환하기</h3>

                            <ul className="data-list">
                                <li className={axioData?.userInfo?.ts_bean_red >= 30  ? "exchange" : ""}> {/* [D] 열매 교환 가능시 .exchange 활성화 */}
                                    <div className="item fruit-ticket">
                                        <div className="fruit-wrap">
                                            <div className="img-wrap">
                                                <img src="/@resource/images/event/fruit_red.png" alt="" className="img" />
                                            </div>
                                            <div className="text-wrap">
                                                <p className="name">Red</p>
                                                <p className="text">
                                                {axioData?.userInfo?.ts_bean_red >= 30 
                                                ? `열매 ${Math.floor(axioData?.userInfo?.ts_bean_red /30)}개를 교환할 수 있어요.`
                                                : "열매가 부족해요."}
                                                </p> 
                                            </div>
                                        </div>
                                        <div className="data-wrap">
                                            <button onClick={()=>handleChangeBean("red")} type="button" className={`btn close-modal ${axioData?.userInfo?.ts_bean_red >= 30  ? "fruit-pruple" : ""}`}>
                                                <p className="data">교환</p>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 커피열매교환 */}

    {/* 나의 달콤 커피나무 - 커피열매교환 팝업 */}
    <div id="layerChange" className="overlay layer-fruit">
        <div className="popup">
            <div className="popup-header">
                <div className="item fruit red" >
                    <div className="img-wrap"></div>
                </div>
            </div>
            <div className="popup-body">
                <p className="title">Red 열매 1개 획득!</p>
                <p className="text">열매를 교환했어요.</p>
            </div>
            <div className="popup-footer">
                <button className="btn full bg-point large btn-close">확인</button>
            </div>

            <div className="sequence-wrap">
                <img src="/@resource/images/event/sequence/paper/paper_0.png" alt="색종이 팡파레" className="img paper-animation" />
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 커피열매교환 팝업 */}

    {/* 나의 달콤 커피나무 - 커피열매교환 퍼플열매 수확 */}
    <div id="fruitPruple" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <button type="button" className="btn back">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
                <div className="btn-area flex-center">
                    <button type="button" className="btn close-modal game-state">
                        <strong className="num fc-orange">74</strong>
                    </button>

					<button type="button" className="btn close-modal event-benefit">
						<i className="ico benefit">
							<span>이벤트 혜택</span>
						</i>
					</button>
					<button type="button"  className="btn close-modal event-guide">
						<i className="ico info">
							<span>이벤트 안내</span>
						</i>
					</button>
                    <button type="button" className="btn sound"> {/* [D] 볼륨 음소거시 .mute 클래스명 활성화 */}
						<span className="blind">볼륨</span>
					</button>
				</div>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    <div className="success-wrap">
                        <div className="sequence-area">
                            <div className="img-wrap">
                                <img src="/@resource/images/event/illust_success.png" alt="Purple 열매를 획득 일러스트 이미지" className="img" />
                            </div>
                            <div className="float">
                                <img src="/@resource/images/event/sequence/paper/paper_0.png" alt="색종이 팡파레" className="img paper-animation" />
                            </div>
                        </div>
                        <h2 className="section-title large">
                            축하해요!<br />
                            Purple 열매를 획득했어요.
                        </h2>
                        <p>열매를 모을수록 당첨 확률이 올라가요!</p>
                    </div>

                    <div className="btn-area">
                        <button className="btn dark large full change-btn">확인</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 커피열매교환 퍼플열매 수확  */}

    {/* 나의 달콤 커피나무 - 이벤트 혜택 */}
    <div id="eventBenefit" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <h1 className="page-title">
					이벤트 혜택
				</h1>
                <button type="button" className="btn back btn-close">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <div className="content-wrap">
                    
                    <div className="section">
                        <h2 className="section-title large">
                            매일매일 물을 주고 <br />
                            커피열매를 모아보세요!
                        </h2>

                        <ul className="benefit-list">
                            <li>
                                <dl className="text-wrap">
                                    <dt className="title fc-orange">혜택1.</dt>
                                    <dd className="text">
                                        5가지 열매를 획득하면,<br />
                                        쿠폰 3종 세트가 기본 제공
                                    </dd>
                                </dl>
                                <div className="img-wrap flex-end">
                                    <img src="/@resource/images/event/illust_benefit_01.png" alt="" className="img" />
                                </div>
                            </li>
                            <li>
                                <dl className="text-wrap">
                                    <dt className="title fc-orange">혜택2.</dt>
                                    <dd className="text">
                                        5가지 열매를 획득하면,<br />
                                        쿠폰 3종 세트가 기본 제공
                                    </dd>
                                </dl>
                                <div className="img-wrap flex-end">
                                    <img src="/@resource/images/event/illust_benefit_02.png" alt="" className="img" />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="section pdb-0">
                        <div className="attention-wrap">
                            <div className="item attention">
                                <div className="title">이벤트 유의사항</div>
                                <ol>
                                    <li>
                                        <dl>
                                            <dt className="title">01. 이벤트 내용</dt>
                                            <dd className="text">
                                                <ul className="attention-list">
                                                    <li>이벤트의 내용과 기간 등 자세한 내용은 이벤트 페이지를 통해 확인해주시기 바랍니다.</li>
                                                    <li>이벤트 내용과 기간은 부득이한 경우 사전 공지 없이 변경될 수 있습니다.</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>

                                    <li>
                                        <dl>
                                            <dt className="title">02. 이벤트 당첨 및 당첨 취소</dt>
                                            <dd className="text">
                                                한 이벤트에서 복수 당첨될 경우 상위 경품 하나만 인정됩니다.<br />
                                                아래의 사유에 해당하시는 분은 이벤트 경품 당첨에서 제외되며, 당첨 이후라도 아래 사유에 해당될 경우 당첨이 취소될 수 있습니다.
                                                <ul className="attention-list">
                                                    <li>안내된 배송정보 등록기간에 정보를 입력하지 않은 경우</li>
                                                    <li>회원정보를 허위로 입력한 경우</li>
                                                    <li>회원정보에 등록한 이메일 또는 전화로 연락되지 않는 경우</li>
                                                    <li>경품 수령의사를 명백히 밝히지 않거나 수령 거부 의사를 밝힌 경우</li>
                                                    <li>발송된 이벤트 경품이 장기 부재, 허위정보 등의 기타 사유로 반송된 경우</li>
                                                    <li>안내한 사전 공지 기간까지 제세공과금을 입금하지 않은 경우</li>
                                                    <li>이벤트 당첨 계정이 운영정책에 의해 제재가 되거나 회원 탈퇴한 경우</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>

                                    <li>
                                        <dl>
                                            <dt className="title">03. 배송정보 등록</dt>
                                            <dd className="text">
                                                <ul className="attention-list">
                                                    <li>당첨자 공지를 통해 안내된 배송정보 등록기간 동안 경품을 받으실 곳의 정확한 주소와 연락처를 입력해주시기 바랍니다.</li>
                                                    <li>경품 배송은 배송정보 등록기간이 종료된 후 시작되며, 배송업체의 사정에 따라 1~2주의 기간이 소요됩니다.</li>
                                                    <li>당첨자가 아닌 분은 배송정보를 등록해도 경품이 배송되지 않습니다.</li>
                                                    <li>잘못된 주소를 등록하여 경품이 반송된 경우 재발송 해드리지 않습니다.</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>

                                    <li>
                                        <dl>
                                            <dt className="title">02. 경품 배송</dt>
                                            <dd className="text">
                                                <ul className="attention-list">
                                                    <li>실제 경품은 상기 이미지와 다를 수 있으며,  부득이한 경우 동등한 가치를 가진 다른 경품으로 대체될 수 있습니다.</li>
                                                    <li>실물 경품인 경우, 수형 후 고장/파손 시 반품 및 AS는 불가 합니다.<br /> ( * 제품불량시 해당 제조사 A/S센터 문의 )</li>
                                                    <li>경품은 타인에게 양도할 수 없으며, 현금이나 기타 경품으로 요구할 수 없습니다.</li>
                                                    <li>제세공과금을 부담해야 하는 경품의 경우 제세공과금을 납부한 후에 배송이 시작되며, <br />회원정보에 등록한 이메일 또는 전화를 통해 제세공과금 입금 계좌 및 신분증 사본 요청 등을 포함한 자세한 방법이 안내됩니다.</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>

                                    <li>
                                        <dl>
                                            <dt className="title">05. 개인 정보 보호</dt>
                                            <dd className="text">
                                                <ul className="attention-list">
                                                    <li>경품 배송을 위해 계정, 닉네임의 일부가 홈페이지에 공지될 수 있습니다.</li>
                                                    <li>배송을 위해 당첨된 분들의 이름, 전화번호, 주소 정보가 배송 업체로 전달됩니다. </li>
                                                    <li>이를 원치 않을 경우 당첨을 거부할 수 있습니다.</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>

                                    <li>
                                        <dl>
                                            <dt className="title">06. 이벤트 참여 제한</dt>
                                            <dd className="text">
                                                <ul className="attention-list">
                                                    <li>운영 정책을 위반하여 활동이 제재된 계정은, 모든 이벤트 참여가 제한되거나 불이익이 발생할 수 있습니다.</li>
                                                    <li>계정별 1회 참여 완료만 가능합니다.</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </li>
                                </ol>

                                <div className="btn-area flex-end">
                                    <button type="button" className="btn text" onClick={(e)=>handleToggle(e.currentTarget,"text")}>
                                        펼치기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 이벤트 혜택 */}

    {/* 나의 달콤 커피나무 - 이벤트 안내 */}
    <div id="eventGuide" className="overlay coffee-tree">
		<div className="modal-wrap">
            <div className="header modal-header">
                <h1 className="page-title">
					이벤트 안내
				</h1>
                <button type="button" className="btn back btn-close">
                    <i className="ico back">
                        <span className="blind">뒤로</span>
                    </i>
                </button>
            </div>

            <div className="modal-body">
                <ul className="tabs">
                    <li className="current"><Link to="#" data-href="#guideTab01" onClick={(e) => tabLink(e)}>참여 안내</Link></li>
                    <li><Link to="#" data-href="#guideTab02" onClick={(e) => tabLink(e)}>경품 안내</Link></li>
                </ul>
                <div className="content-wrap">

                    {/* 참여 안내 */}
                    <div id="guideTab01" className="tab-content active">
                        <div className="section">
                            <h2 className="section-title medium ta-c">
                                커피나무를<br />
                                더 잘 키우고 싶다면!
                            </h2>
    
                            <ul className="data-list guide-list">
                                <li>
                                    <dl className="guide-box">
                                        <dt className="title">
                                            작은 달콤 커피나무 매일매일 보러오기
                                        </dt>
                                        <dd className="text">
                                            커피나무가 열매를 맺게하려면, <br />
                                            매일 물과 사랑을 가득 주세요!
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className="guide-box">
                                        <dt className="title">
                                            매일매일 다른 열매가 열리는 커피나무
                                        </dt>
                                        <dd className="text">
                                            커피나무가 다 자라면, 매일 다른 열매가 열려요. <br />
                                            행운의 PURPLE 열매가 맺힐지도 모르니까 잘 지켜봐주세요!
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className="guide-box">
                                        <dt className="title">
                                            PURPLE 열매를 수확했다면?
                                        </dt>
                                        <dd className="text">
                                            커피나무에 열린 PURPLE 열매를 수확하면 <br />
                                            이벤트에 자동으로 응모되요!
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl className="guide-box">
                                        <dt className="title">
                                            커피나무에 PURPLE 열매가 없어도 실망금지!
                                        </dt>
                                        <dd className="text">
                                            열매 종류에 따라 교환에 필요한 갯수가 다르지만, <br />
                                            일반 열매를 모아 PURPLE 열매로 교환하면, <br />
                                            이벤트에 자동 응모되요!
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="section">
                            <h3 className="section-title medium  ta-c">
                                <span className="fc-orange">TIP!</span>
                            </h3>
                            <p className="text">
                                PURPLE 열매를 모을수록 <strong>당첨 확률</strong>이 올라가요! <br />
                                열매가 열리면 <strong>바로바로 수확</strong>해 주세요! <br />
                                나무에 달리는 <strong>열매의 갯수는 제한</strong>이 있어요!
                            </p>
                        </div>
    
                        <div className="section">
                            <div className="attention-wrap">
                                <div className="item attention">
                                    <div className="title">이벤트 유의사항</div>
                                    <div className="text">
                                        <ul className="attention-list">
                                            <li>본 이벤트는 식목일 이벤트 미션 완료 고객에 한하여 자동 응모됩니다.</li>
                                            <li>식목일 이벤트 미션 완료 시 개인 정보 수집/이용에 동의한 것으로 간주됩니다.</li>
                                            <li>이벤트 응모는 ID당 1회 가능하며 1인 1당첨을 원칙으로 합니다.</li>
                                            <li>당첨자 발표 후 7일 이내 연락 혹은 정보를 기입하지 않을 경우 자동 취소 처리되며 당첨자를 재선정합니다.</li>
                                            <li>경품 발송은 당첨자 발표 및 정보 수집 이후 진행됩니다.</li>
                                            <li>이벤트 내용과 기간은 사전 공지 없이 취소, 변경될 수 있습니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // 참여 안내 */}

                    {/* 경품 안내 */}
                    <div id="guideTab02" className="tab-content">
                        <div className="section">
                            <h2 className="section-title medium ta-c">
                                <span className="fc-400">Purple 열매를 획득한 참여자 중</span> <br />
                                추첨을 통해
                            </h2>
    
                            <ol className="data-list ranking-list col-2">
                                <li className="first">
                                    <div className="item giveaway">
                                        <div className="img-wrap">
                                            <img src="/@resource/images/event/img_giveaway_applewatch.png" alt="애플워치7" className="img" />
                                        </div>
                                        <dl className="text-wrap">
                                            <dt className="title">
                                                1등
                                            </dt>
                                            <dd className="text">애플워치7</dd>
                                            <dd className="text">
                                                <strong>1명</strong>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                <li className="second">
                                    <div className="item giveaway">
                                        <div className="img-wrap">
                                            <img src="/@resource/images/event/img_giveaway_coffeemachine.png" alt="에센자 미니 C30 블랙 &  달콤 컵슐커피 2종 세트" className="img" />
                                        </div>
                                        <dl className="text-wrap">
                                            <dt className="title small">
                                                2등
                                            </dt>
                                            <dd className="text">
                                                에센자 미니 C30 블랙 & <br />
                                                달콤 컵슐커피 2종 세트
                                            </dd>
                                            <dd className="text">
                                                <strong>2명</strong>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                                <li className="third">
                                    <div className="item giveaway">
                                        <div className="img-wrap">
                                            <img src="/@resource/images/event/img_giveaway_tumbler.png" alt="시그니처 텀블러" className="img" />
                                        </div>
                                        <dl className="text-wrap">
                                            <dt className="title small">
                                                3등
                                            </dt>
                                            <dd className="text">
                                                시그니처 텀블러
                                            </dd>
                                            <dd className="text">
                                                <strong>10명</strong>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="section">
                            <h2 className="section-title medium ta-c">
                                <span className="fc-400">Purple 열매를 획득한 모든 참여자에게</span> <br />
                                달콤 3종 쿠폰 세트 발급!
                            </h2>

                            <ul className="data-list coupon col-3">
                                <li>
                                    <div className="img-wrap">
                                        <img src="/@resource/images/event/coupon_tea.png" alt="Dal.komm Thanks to 스프링티" className="img" />
                                    </div>
                                </li>
                                <li>
                                    <div className="img-wrap">
                                        <img src="/@resource/images/event/coupon_ade.png" alt="Dal.komm Weekend 한라봉에이드" className="img" />
                                    </div>
                                </li>
                                <li>
                                    <div className="img-wrap">
                                        <img src="/@resource/images/event/coupon_blended.png" alt="Dal.komm Teatime 스프링블라썸 블렌디드" className="img" />
                                    </div>
                                </li>
                            </ul>

                            <div className="item giveaway">
                                <dl className="text-wrap">
                                    <dt className="title">당첨자 발표: 05/13</dt>
                                    <dd className="text">
                                        당첨자 경품 제세공과금 본사 부담 <br />
                                        메인 배너 및 스토리를 통해 당첨자 발표
                                    </dd>
                                </dl>
                            </div>
                        </div>
    
                        <div className="section">
                            <div className="attention-wrap">
                                <div className="item attention">
                                    <div className="title">이벤트 유의사항</div>
                                    <div className="text">
                                        <ul className="attention-list">
                                            <li>본 이벤트는 식목일 이벤트 미션 완료 고객에 한하여 자동 응모됩니다.</li>
                                            <li>식목일 이벤트 미션 완료 시 개인 정보 수집/이용에 동의한 것으로 간주됩니다.</li>
                                            <li>이벤트 응모는 ID당 1회 가능하며 1인 1당첨을 원칙으로 합니다.</li>
                                            <li>당첨자 발표 후 7일 이내 연락 혹은 정보를 기입하지 않을 경우 자동 취소 처리되며 당첨자를 재선정합니다.</li>
                                            <li>경품 발송은 당첨자 발표 및 정보 수집 이후 진행됩니다.</li>
                                            <li>이벤트 내용과 기간은 사전 공지 없이 취소, 변경될 수 있습니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // 경품 안내 */}
                </div>
            </div>
        </div>
	</div>
    {/* 나의 달콤 커피나무 - 이벤트 안내 */}
     
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        
      </React.Fragment>
    );
}
