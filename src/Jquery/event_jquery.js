/* eslint-disable no-loop-func */
/* eslint-disable no-cond-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import $ from "jquery";
import { modalClose } from "./Jquery";

var fn_interval1,
  fn_interval2,
  fn_interval3,
  fn_interval4,
  fn_interval5,
  fn_interval6,
  fn_interval7,
  fn_interval8,
  fn_interval9,
  fn_interval10,
  fn_interval11,
  fn_interval12,
  fn_interval13,
  fn_interval14;

export const fn_reset_interval = () => {
  clearInterval(fn_interval1);
  clearInterval(fn_interval2);
  clearInterval(fn_interval3);
  clearInterval(fn_interval4);
  clearInterval(fn_interval5);
  clearInterval(fn_interval6);
  clearInterval(fn_interval7);
  clearInterval(fn_interval8);
  clearInterval(fn_interval9);
  clearInterval(fn_interval10);
  clearInterval(fn_interval11);
  clearInterval(fn_interval12);
  clearInterval(fn_interval13);
  clearInterval(fn_interval14);
};

var imageArray;
export function loading_img(type) {
  let total_count = 0;
  let count_array;
  var loadCnt = 0;
  let flag = false;
  if (type === "ready") {
    count_array = [46, 59, 67];
    imageArray = new Array(count_array?.length);
  } else if (type === "step1") {
    count_array = [46, 59, 67, 32, 58];
    imageArray = new Array(count_array?.length);
  } else if (type === "step1-looping") {
    count_array = [46, 59, 67, 58];
    imageArray = new Array(count_array?.length);
  } else if (type === "step2") {
    count_array = [46, 59, 67, 66, 62];
    imageArray = new Array(count_array?.length);
  } else if (type === "step2-looping") {
    count_array = [46, 59, 67, 62];
    imageArray = new Array(count_array?.length);
  } else if (type === "step3") {
    count_array = [46, 59, 67, 75, 62];
    imageArray = new Array(count_array?.length);
  } else if (type === "step3-looping") {
    count_array = [46, 59, 67, 62];
    imageArray = new Array(count_array?.length);
  } else if (type === "step4") {
    count_array = [46, 59, 67, 85, 218];
    imageArray = new Array(count_array?.length);
  } else if (type === "step4-looping") {
    count_array = [46, 59, 67, 218, 15, 15, 15, 15, 15];
    imageArray = new Array(count_array?.length);
  }

  for (let index = 0; index < imageArray?.length; index++) {
    imageArray[index] = new Array(count_array[index]);
  }
  for (let i = 0; i < count_array?.length; i++) {
    total_count += count_array[i];
    for (let j = 0; j < imageArray[i]?.length; j++) {
      imageArray[i][j] = new Image();
      if (type === "ready") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        }
      } else if (type === "step1") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree1/tree_step1_" + j + ".png";
        } else if (i === 4) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree1_roop/tree_step1_roop_" + j + ".png";
        }
      } else if (type === "step1-looping") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree1_roop/tree_step1_roop_" + j + ".png";
        }
      } else if (type === "step2") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree2/tree_step2_" + j + ".png";
        } else if (i === 4) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree2_roop/tree_step2_roop_" + j + ".png";
        }
      } else if (type === "step2-looping") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree2_roop/tree_step2_roop_" + j + ".png";
        }
      } else if (type === "step3") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree3/tree_step3_" + j + ".png";
        } else if (i === 4) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree3_roop/tree_step3_roop_" + j + ".png";
        }
      } else if (type === "step3-looping") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree3_roop/tree_step3_roop_" + j + ".png";
        }
      } else if (type === "step4") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree4/tree_step4_" + j + ".png";
        } else if (i === 4) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree4_roop/tree_step4_roop_" + j + ".png";
        }
      } else if (type === "step4-looping") {
        if (i === 0) {
          imageArray[i][j].src = "/@resource/images/event/sequence/heart/heart_" + j + ".png";
        } else if (i === 1) {
          imageArray[i][j].src = "/@resource/images/event/sequence/paper/paper_" + j + ".png";
        } else if (i === 2) {
          imageArray[i][j].src = "/@resource/images/event/sequence/water/water_" + j + ".png";
        } else if (i === 3) {
          imageArray[i][j].src = "/@resource/images/event/sequence/tree4_roop/tree_step4_roop_" + j + ".png";
        } else if (i === 4) {
          imageArray[i][j].src = "/@resource/images/event/sequence/fruit_yellow/fruit_yellow_" + j + ".png";
        } else if (i === 5) {
          imageArray[i][j].src = "/@resource/images/event/sequence/fruit_orange/fruit_orange_" + j + ".png";
        } else if (i === 6) {
          imageArray[i][j].src = "/@resource/images/event/sequence/fruit_pink/fruit_pink_" + j + ".png";
        } else if (i === 7) {
          imageArray[i][j].src = "/@resource/images/event/sequence/fruit_red/fruit_red_" + j + ".png";
        } else if (i === 8) {
          imageArray[i][j].src = "/@resource/images/event/sequence/fruit_purple/fruit_purple_" + j + ".png";
        }
      }
    }
  }

  function fn_promise(count_array, imageArray) {
    return new Promise((resolve) => {
      for (let i = 0; i < count_array?.length; i++) {
        for (let j = 0; j < imageArray[i]?.length; j++) {
          imageArray[i][j].onload = function () {
            loadCnt++;
            if (loadCnt >= total_count) {
              resolve(true);
            }
          };
        }
      }
    });
  }
  return fn_promise(count_array, imageArray);
}

function treeStep() {
  fn_interval1 = setInterval(function () {
    if ($(".game-sec").hasClass("step1")) {
      step1();
    }
    if ($(".game-sec").hasClass("step2")) {
      step2();
    }
    if ($(".game-sec").hasClass("step3")) {
      step3();
    }
    if ($(".game-sec").hasClass("step4")) {
      step4();
    }
  }, 50);

  // 0단계 -> 1단계
  if ($(".game-sec").hasClass("step1")) {
    setTimeout(function () {
      $(".game-sec").addClass("step1-roop").removeClass("step1");
      fn_interval2 = setInterval(function () {
        step1roop("up");
      }, 50);
    }, 1800);
  }

  // 1단계 루핑
  if ($(".game-sec").hasClass("step1-roop")) {
    fn_interval3 = setInterval(function () {
      step1roop();
    }, 50);
  }

  // 1단계 -> 2단계
  if ($(".game-sec").hasClass("step2")) {
    $(".game-sec").removeClass(".step1-roop");
    step2();
    setTimeout(function () {
      $(".game-sec").addClass("step2-roop").removeClass("step2");
      fn_interval4 = setInterval(function () {
        step2roop("up");
      }, 50);
    }, 3500);
  }

  // 2단계 루핑
  if ($(".game-sec").hasClass("step2-roop")) {
    fn_interval5 = setInterval(function () {
      step2roop();
    }, 50);
  }

  // 2단계 -> 3단계
  if ($(".game-sec").hasClass("step3")) {
    $(".game-sec").removeClass(".step2-roop");
    step3();
    setTimeout(function () {
      $(".game-sec").addClass("step3-roop").removeClass("step3");
      fn_interval6 = setInterval(function () {
        step3roop("up");
      }, 50);
    }, 3900);
  }

  // 3단계 루핑
  if ($(".game-sec").hasClass("step3-roop")) {
    fn_interval7 = setInterval(function () {
      step3roop();
    }, 50);
  }

  // 3단계 -> 4단계
  if ($(".game-sec").hasClass("step4")) {
    $(".game-sec").removeClass(".step3-roop");
    // step4();
    setTimeout(function () {
      $(".game-sec").addClass("step4-roop").removeClass("step4");
      fn_interval8 = setInterval(function () {
        step4roop("up");
      }, 10);
    }, 4500);
  }

  // 4단계 루핑
  if ($(".game-sec").hasClass("step4-roop")) {
    fn_interval8 = setInterval(function () {
      step4roop();
    }, 50);
  }
}
function fruit() {
  fn_interval9 = setInterval(function () {
    fruitYellow();
    fruitOrange();
    fruitPink();
    fruitRed();
    fruitPurple();
  }, 100);
}

// 열매 수확 --
var frameNumberPaper1 = 0;
function paper1() {
  // red 열매 획득 색종이
  var $paper1 = $(".layer-fruit .paper-animation");
  var imagePathPaper1 = "/@resource/images/event/sequence/paper/";
  var totalFramesPaper1 = 58;
  var animationDurationPaper = 500;
  var timePerFramePaper1 = timePerFramePaper1 / totalFramesPaper1;
  //$paper1.attr("src", imagePathPaper1 + `paper_${frameNumberPaper1}.png`);
  $paper1.attr("src", imageArray[1][frameNumberPaper1]?.currentSrc);
  if (frameNumberPaper1 >= totalFramesPaper1) {
    frameNumberPaper1 = 0;
    if ((frameNumberPaper1 = totalFramesPaper1)) {
      frameNumberPaper1 = totalFramesPaper1;
    }
  } else {
    frameNumberPaper1 = frameNumberPaper1 + 1;
  }
}

// purple 열매 획득 색종이
var frameNumberPaper2 = 0;
function paper2() {
  var $paper2 = $(".coffee-tree .paper-animation");
  var imagePathPaper2 = "/@resource/images/event/sequence/paper/";
  var totalFramesPaper2 = 58;
  var animationDurationPaper2 = 500;
  var timePerFramePaper2 = timePerFramePaper2 / totalFramesPaper2;

  //$paper2.attr("src", imagePathPaper2 + `paper_${frameNumberPaper2}.png`);
  $paper2.attr("src", imageArray[1][frameNumberPaper2]?.currentSrc);
  if (frameNumberPaper2 >= totalFramesPaper2) {
    frameNumberPaper2 = 0;
    if ((frameNumberPaper2 = totalFramesPaper2)) {
      frameNumberPaper2 = totalFramesPaper2;
    }
  } else {
    frameNumberPaper2 = frameNumberPaper2 + 1;
  }
}

// 커피나무 키우기 액션 시퀀스 --
// 물
var frameNumberWater = 0;
function water() {
  var $water = $(".water-animation");
  var imagePathWater = "/@resource/images/event/sequence/water/";
  var totalFramesWater = 66;
  var animationDurationWater = 1300;
  var timePerFrame2 = animationDurationWater / totalFramesWater;
  //$water.attr("src", imagePathWater + `water_${frameNumberWater}.png`);
  $water.attr("src", imageArray[2][frameNumberWater]?.currentSrc);
  if (frameNumberWater >= totalFramesWater) {
    frameNumberWater = 0;
    if ((frameNumberWater = totalFramesWater)) {
      frameNumberWater = totalFramesWater;
    }
  } else {
    frameNumberWater = frameNumberWater + 1;
  }
}

// 하트
var frameNumberHeart = 0;
function heart() {
  var $heart = $(".heart-animation");
  var imagePathHeart = "/@resource/images/event/sequence/heart/";
  var totalFramesHeart = 45;
  var animationDuration2 = 1300;
  var timePerFrameHeart = timePerFrameHeart / totalFramesHeart;
  //$heart.attr("src", imagePathHeart + `heart_${frameNumberHeart}.png`);
  $heart.attr("src", imageArray[0][frameNumberHeart]?.currentSrc);
  if (frameNumberHeart >= totalFramesHeart) {
    frameNumberHeart = 0;
    if ((frameNumberHeart = totalFramesHeart)) {
      frameNumberHeart = totalFramesHeart;
    }
  } else {
    frameNumberHeart = frameNumberHeart + 1;
  }
}

var frameNumberStep1 = 0;
function step1() {
  // 커피나무 1단계
  var $elementStep1 = $(".tree-animation.step1");
  var imagePathStep1 = "/@resource/images/event/sequence/tree1/";
  var totalFramesStep1 = 31;
  var animationDurationStep1 = 6000;
  var timePerFrameStep1 = animationDurationStep1 / totalFramesStep1;
  //$elementStep1.attr("src", imagePathStep1 + `tree_step1_${frameNumberStep1}.png`);
  $elementStep1.attr("src", imageArray[3][frameNumberStep1]?.currentSrc);
  if (frameNumberStep1 >= totalFramesStep1) {
    frameNumberStep1 = 0;
    if ((frameNumberStep1 = totalFramesStep1)) {
      frameNumberStep1 = totalFramesStep1;
    }
  } else {
    frameNumberStep1 = frameNumberStep1 + 1;
  }
}
// // 커피나무 1단계 루핑
var frameNumberStep1roop = 0;
function step1roop(type) {
  var $elementStep1roop = $(".tree-animation.step1-roop");
  var imagePathStep1roop = "/@resource/images/event/sequence/tree1_roop/";
  var totalFramesStep1roop = 57;
  var roopStartStep1roop = 0;
  var animationDurationStep1roop = 6000;
  var timePerFrameStep1roop = animationDurationStep1roop / totalFramesStep1roop;

  //$elementStep1roop.attr("src", imagePathStep1roop + `tree_step1_roop_${frameNumberStep1roop}.png`);
  if (type === "up") {
    $elementStep1roop.attr("src", imageArray[4][frameNumberStep1roop]?.currentSrc);
  } else {
    $elementStep1roop.attr("src", imageArray[3][frameNumberStep1roop]?.currentSrc);
  }
  if (frameNumberStep1roop >= totalFramesStep1roop) {
    frameNumberStep1roop = 1;
    if ((frameNumberStep1roop = totalFramesStep1roop)) {
      frameNumberStep1roop = roopStartStep1roop;
    }
  } else {
    frameNumberStep1roop = frameNumberStep1roop + 1;
  }
}
// 커피나무 2단계
var frameNumberStep2 = 0;
function step2() {
  var $elementStep2 = $(".tree-animation.step2");
  var imagePathStep2 = "/@resource/images/event/sequence/tree2/";
  var totalFramesStep2 = 65;
  var animationDurationStep2 = 6000;
  var timePerFrameStep2 = animationDurationStep2 / totalFramesStep2;
  //$elementStep2.attr("src", imagePathStep2 + `tree_step2_${frameNumberStep2}.png`);
  $elementStep2.attr("src", imageArray[3][frameNumberStep2]?.currentSrc);
  if (frameNumberStep2 >= totalFramesStep2) {
    frameNumberStep2 = 0;
    if ((frameNumberStep2 = totalFramesStep2)) {
      frameNumberStep2 = totalFramesStep2;
    }
  } else {
    frameNumberStep2 = frameNumberStep2 + 1;
  }
}

// 커피나무 2단계 루핑
var frameNumberStep2roop = 0;
function step2roop(type) {
  var $elementStep2roop = $(".tree-animation.step2-roop");
  var imagePathStep2roop = "/@resource/images/event/sequence/tree2_roop/";
  var totalFramesStep2roop = 61;
  var roopStartStep2roop = 0;
  var animationDurationStep2roop = 6000;
  var timePerFrameStep2roop = animationDurationStep2roop / totalFramesStep2roop;

  //$elementStep2roop.attr("src", imagePathStep2roop + `tree_step2_roop_${frameNumberStep2roop}.png`);
  if (type === "up") {
    $elementStep2roop.attr("src", imageArray[4][frameNumberStep2roop]?.currentSrc);
  } else {
    $elementStep2roop.attr("src", imageArray[3][frameNumberStep2roop]?.currentSrc);
  }
  if (frameNumberStep2roop >= totalFramesStep2roop) {
    frameNumberStep2roop = 1;
    if ((frameNumberStep2roop = totalFramesStep2roop)) {
      frameNumberStep2roop = roopStartStep2roop;
    }
  } else {
    frameNumberStep2roop = frameNumberStep2roop + 1;
  }
}

//커피나무 3단계
var frameNumberStep3 = 0;
function step3() {
  var $elementStep3 = $(".tree-animation.step3");
  var imagePathStep3 = "/@resource/images/event/sequence/tree3/";
  var totalFramesStep3 = 74;
  var animationDurationStep3 = 6000;
  var timePerFrameStep3 = animationDurationStep3 / totalFramesStep3;
  //$elementStep3.attr("src", imagePathStep3 + `tree_step3_${frameNumberStep3}.png`);
  $elementStep3.attr("src", imageArray[3][frameNumberStep3]?.currentSrc);
  if (frameNumberStep3 >= totalFramesStep3) {
    frameNumberStep3 = 0;
    if ((frameNumberStep2 = totalFramesStep3)) {
      frameNumberStep3 = totalFramesStep3;
    }
  } else {
    frameNumberStep3 = frameNumberStep3 + 1;
  }
}

// 커피나무 3단계 루핑
var frameNumberStep3roop = 0;
function step3roop(type) {
  var $elementStep3roop = $(".tree-animation.step3-roop");
  var imagePathStep3roop = "/@resource/images/event/sequence/tree3_roop/";
  var totalFramesStep3roop = 61;
  var roopStartStep3roop = 0;
  var animationDurationStep3roop = 6000;
  var timePerFrameStep3roop = animationDurationStep3roop / totalFramesStep3roop;

  // $elementStep3roop.attr("src", imagePathStep3roop + `tree_step3_roop_${frameNumberStep3roop}.png`);
  if (type === "up") {
    $elementStep3roop.attr("src", imageArray[4][frameNumberStep3roop]?.currentSrc);
  } else {
    $elementStep3roop.attr("src", imageArray[3][frameNumberStep3roop]?.currentSrc);
  }
  if (frameNumberStep3roop >= totalFramesStep3roop) {
    frameNumberStep3roop = 1;
    if ((frameNumberStep3roop = totalFramesStep3roop)) {
      frameNumberStep3roop = roopStartStep3roop;
    }
  } else {
    frameNumberStep3roop = frameNumberStep3roop + 1;
  }
}

//커피나무 4단계
var frameNumberStep4 = 0;
function step4() {
  var $elementStep4 = $(".tree-animation.step4");
  var imagePathStep4 = "/@resource/images/event/sequence/tree4/";
  var totalFramesStep4 = 84;
  var animationDurationStep4 = 6000;
  var timePerFrameStep4 = animationDurationStep4 / totalFramesStep4;

  //$elementStep4.attr("src", imagePathStep4 + `tree_step4_${frameNumberStep4}.png`);
  $elementStep4.attr("src", imageArray[3][frameNumberStep4]?.currentSrc);
  if (frameNumberStep4 >= totalFramesStep4) {
    frameNumberStep4 = 0;
    if ((frameNumberStep4 = totalFramesStep4)) {
      frameNumberStep4 = totalFramesStep4;
    }
  } else {
    frameNumberStep4 = frameNumberStep4 + 1;
  }
}

//커피나무 4단계 루핑
var frameNumber4roop = 0;
function step4roop(type) {
  var $element4roop = $(".tree-animation.step4-roop");
  var imagePath4roop = "/@resource/images/event/sequence/tree4_roop/";
  var totalFrames4roop = 217;
  var roopStart4roop = 0;
  var animationDuration4roop = 1500;
  var timePerFrame4roop = animationDuration4roop / totalFrames4roop;
  // $element4roop.attr("src", imagePath4roop + `tree_step4_roop_${frameNumber4roop}.png`);
  if (type === "up") {
    $element4roop.attr("src", imageArray[4][frameNumber4roop]?.currentSrc);
  } else {
    $element4roop.attr("src", imageArray[3][frameNumber4roop]?.currentSrc);
  }
  if (frameNumber4roop >= totalFrames4roop) {
    frameNumber4roop = 1;
    if ((frameNumber4roop = totalFrames4roop)) {
      frameNumber4roop = roopStart4roop;
    }
  } else {
    frameNumber4roop = frameNumber4roop + 1;
  }
}

// 열매
var frameNumberFruitYellow = 0;
function fruitYellow() {
  // 열매 - Yellow
  var $fruitYellow = $(".fruit-animation.yellow");
  var imagePathFruitYellow = "/@resource/images/event/sequence/fruit_yellow/";
  var totalFramesFruitYellow = 14;
  var animationDurationFruitYellow = 1500;
  var timePerFrameFruitYellow = timePerFrameFruitYellow / totalFramesFruitYellow;

  //$fruitYellow.attr("src", imagePathFruitYellow + `fruit_yellow_${frameNumberFruitYellow}.png`);
  $fruitYellow.attr("src", imageArray[4] && imageArray[4][frameNumberFruitYellow]?.currentSrc);
  if (frameNumberFruitYellow >= totalFramesFruitYellow) {
    frameNumberFruitYellow = 0;
    if ((frameNumberFruitYellow = totalFramesFruitYellow)) {
      frameNumberFruitYellow = totalFramesFruitYellow;
    }
  } else {
    frameNumberFruitYellow = frameNumberFruitYellow + 1;
  }
}

// 열매 - Orange
var frameNumberFruitOrange = 0;
function fruitOrange() {
  var $fruitOrange = $(".fruit-animation.orange");
  var imagePathFruitOrange = "/@resource/images/event/sequence/fruit_orange/";
  var totalFramesFruitOrange = 14;
  var animationDurationFruitOrange = 1500;
  var timePerFrameFruitOrange = timePerFrameFruitOrange / totalFramesFruitOrange;

  //$fruitOrange.attr("src", imagePathFruitOrange + `fruit_orange_${frameNumberFruitOrange}.png`);
  $fruitOrange.attr("src", imageArray[5] && imageArray[5][frameNumberFruitOrange]?.currentSrc);
  if (frameNumberFruitOrange >= totalFramesFruitOrange) {
    frameNumberFruitOrange = 0;
    if ((frameNumberFruitOrange = totalFramesFruitOrange)) {
      frameNumberFruitOrange = totalFramesFruitOrange;
    }
  } else {
    frameNumberFruitOrange = frameNumberFruitOrange + 1;
  }
}

// 열매 - Pink
var frameNumberFruitPink = 0;
function fruitPink() {
  var $fruitPink = $(".fruit-animation.pink");
  var imagePathFruitPink = "/@resource/images/event/sequence/fruit_pink/";
  var totalFramesFruitPink = 14;
  var animationDurationFruitPink = 1500;
  var timePerFrameFruitPink = timePerFrameFruitPink / totalFramesFruitPink;

  //$fruitPink.attr("src", imagePathFruitPink + `fruit_pink_${frameNumberFruitPink}.png`);
  $fruitPink.attr("src", imageArray[6] && imageArray[6][frameNumberFruitPink]?.currentSrc);
  if (frameNumberFruitPink >= totalFramesFruitPink) {
    frameNumberFruitPink = 0;
    if ((frameNumberFruitPink = totalFramesFruitPink)) {
      frameNumberFruitPink = totalFramesFruitPink;
    }
  } else {
    frameNumberFruitPink = frameNumberFruitPink + 1;
  }
}

// 열매 - Red
var frameNumberFruitRed = 0;
function fruitRed() {
  var $fruitRed = $(".fruit-animation.red");
  var imagePathFruitRed = "/@resource/images/event/sequence/fruit_red/";
  var totalFramesFruitRed = 14;
  var animationDurationFruitRed = 1500;
  var timePerFrameFruitRed = timePerFrameFruitRed / totalFramesFruitRed;

  //$fruitRed.attr("src", imagePathFruitRed + `fruit_red_${frameNumberFruitRed}.png`);
  $fruitRed.attr("src", imageArray[7] && imageArray[7][frameNumberFruitRed]?.currentSrc);
  if (frameNumberFruitRed >= totalFramesFruitRed) {
    frameNumberFruitRed = 0;
    if ((frameNumberFruitRed = totalFramesFruitRed)) {
      frameNumberFruitRed = totalFramesFruitRed;
    }
  } else {
    frameNumberFruitRed = frameNumberFruitRed + 1;
  }
}

// 열매 - Purple
var frameNumberFruitPurple = 0;
function fruitPurple() {
  var $fruitPurple = $(".fruit-animation.purple");
  var imagePathFruitPurple = "/@resource/images/event/sequence/fruit_purple/";
  var totalFramesFruitPurple = 14;
  var animationDurationFruitPurple = 1500;
  var timePerFrameFruitPurple = timePerFrameFruitPurple / totalFramesFruitPurple;

  //$fruitPurple.attr("src", imagePathFruitPurple + `fruit_purple_${frameNumberFruitPurple}.png`);
  $fruitPurple.attr("src", imageArray[8] && imageArray[8][frameNumberFruitPurple]?.currentSrc);
  if (frameNumberFruitPurple >= totalFramesFruitPurple) {
    frameNumberFruitPurple = 0;
    if ((frameNumberFruitPurple = totalFramesFruitPurple)) {
      frameNumberFruitPurple = totalFramesFruitPurple;
    }
  } else {
    frameNumberFruitPurple = frameNumberFruitPurple + 1;
  }
}

export const fn_first_init = () => {
  frameNumberPaper1 = 0;
  frameNumberPaper2 = 0;
  frameNumberWater = 0;
  frameNumberStep1 = 0;
  frameNumberHeart = 0;
  frameNumberStep1roop = 0;
  frameNumberStep2 = 0;
  frameNumberStep2roop = 0;
  frameNumberStep3 = 0;
  frameNumberStep3roop = 0;
  frameNumberStep4 = 0;
  frameNumber4roop = 0;
  frameNumberFruitYellow = 0;
  frameNumberFruitOrange = 0;
  frameNumberFruitPink = 0;
  frameNumberFruitRed = 0;
  frameNumberFruitPurple = 0;
};

var action_flag = false;
export const fn_action = (type) => {
  if (action_flag) return false;
  if (type === "sunshine") {
    // 햇빛
    if (!$(".game-sec").hasClass("sunshine")) {
      $(".game-sec").removeClass("water");
      $(".game-sec").removeClass("heart");
      $(".game-sec").addClass("sunshine");
      action_flag = true;
      setTimeout(function () {
        $(".game-sec").removeClass("sunshine");
        action_flag = false;
      }, 3500);
    }
  } else if (type === "water") {
    frameNumberWater = 0;

    if (!$(".game-sec").hasClass("water")) {
      $(".game-sec").removeClass("sunshine");
      $(".game-sec").removeClass("heart");
      $(".game-sec").addClass("water");
      action_flag = true;
      fn_interval12 = setInterval(function () {
        water();
      }, 30);

      setTimeout(function () {
        $(".game-sec").removeClass("water");
        clearInterval(fn_interval12);
        action_flag = false;
      }, 3300);
    }
  } else if (type === "heart") {
    frameNumberHeart = 0;
    if (!$(".game-sec").hasClass("heart")) {
      $(".game-sec").removeClass("sunshine");
      $(".game-sec").removeClass("water");
      $(".game-sec").addClass("heart");
      action_flag = true;
      var fn_interval13 = setInterval(function () {
        heart();
      }, 50);

      setTimeout(function () {
        $(".game-sec").removeClass("heart");
        clearInterval(fn_interval13);
        action_flag = false;
      }, 2700);
    }
  }
};

// 인트로 - 커피나무 키우러가기 버튼
export const fn_event_start = () => {
  treeStep();
  fruit();
};

export const fn_click_init = () => {
  $(".coffee-tree .close-modal").click(function () {
    var target = $(this).closest(".overlay");
    modalClose(target);
  });

  // 커피열매 교환 - red 열매 교환하기 버튼
  $(".btn.fruit-red").click(function () {
    $("#layerChange").addClass("active");
    fn_interval10 = setInterval(function () {
      paper1();
    }, 20);
  });
  // 커피열매 교환 - purple 열매 교환하기 버튼
  $(".btn.fruit-pruple").click(function () {
    $("#fruitPruple").addClass("active");
    fn_interval11 = setInterval(function () {
      paper2();
    }, 25);
  });

  // 나의 커피열매 현황 버튼
  $(".btn.game-state").click(function () {
    $("#myCoffeeTree").addClass("active");
  });

  // 이벤트 혜택 보기 버튼
  $(".btn.event-benefit").click(function () {
    $("#eventBenefit").addClass("active");
  });

  // 이벤트 안내 보기 버튼
  $(".btn.event-guide").click(function () {
    $("#eventGuide").addClass("active");
  });

  // 커피열매 교환 - 열매 교환하기 버튼
  $(".btn.fruit-change").click(function () {
    $("#fruitChange").addClass("active");
  });

  // 열매 따기 팝업 확인 후 커피나무 시퀀스 동작 실행
  $(".btn.harvest").click(function () {
    if ($(this).parent().hasClass("active")) {
      $("#layerHarvest").addClass("active");
      $(".game-sec").addClass("complete").removeClass("step2-roop").removeClass("step3-roop").removeClass("step4-roop").removeClass("fruit");

      // fn_interval14 = setInterval(function () {
      //   step4roop();
      // }, 20);
    } else {
      alert("수확 할 열매가 없습니다.");
    }
  });

  // 팝업 뒤로가기
  $("#CoffeeTreeIntro .btn.back").click(function () {
    $("#CoffeeTreeIntro").removeClass("active");
    $("#CoffeeTreeHome").addClass("active");
  });

  $("#myCoffeeTree .btn.back").click(function () {
    $("#myCoffeeTree").removeClass("active");
    $("#CoffeeTreeGame").addClass("active");
  });

  $("#fruitChange .btn.back").click(function () {
    $("#fruitChange").removeClass("active");
    $("#myCoffeeTree").addClass("active");
  });

  $("#fruitPruple .change-btn,#fruitPruple .btn.back").click(function () {
    $("#fruitPruple").removeClass("active");
    $("#myCoffeeTree").addClass("active");
  });

  $("#eventBenefit .btn.back, #eventGuide .btn.back").click(function () {
    $("#eventBenefit").removeClass("active");
    $("#eventGuide").removeClass("active");
    $("#CoffeeTreeGame").addClass("active");
  });
};

export const fn_click_off = () => {
  $(".coffee-tree .close-modal").off("click");
  // 커피열매 교환 - red 열매 교환하기 버튼
  $(".btn.fruit-red").off("click");
  // 커피열매 교환 - purple 열매 교환하기 버튼
  $(".btn.fruit-pruple").off("click");

  // 메인  - 인트로 시작 버튼
  $("#CoffeeTreeHome .btn.webtoon-start").off("click");
  // 나의 커피열매 현황 버튼
  $(".btn.game-state").off("click");
  // 이벤트 혜택 보기 버튼
  $(".btn.event-benefit").off("click");
  // 이벤트 안내 보기 버튼
  $(".btn.event-guide").off("click");
  // 커피열매 교환 - 열매 교환하기 버튼
  $(".btn.fruit-change").off("click");
  // 인트로 - 커피나무 키우러가기 버튼
  $("#CoffeeTreeIntro .btn.event-start").off("click");
  // 열매 따기 팝업 확인 후 커피나무 시퀀스 동작 실행
  $(".btn.harvest").off("click");
  // 팝업 뒤로가기
  $("#CoffeeTreeIntro .btn.back").off("click");
  $("#myCoffeeTree .btn.back").off("click");
  $("#fruitChange .btn.back").off("click");
  $("#fruitPruple .change-btn,#fruitPruple .btn.back").off("click");
  $("#eventBenefit .btn.back, #eventGuide .btn.back").off("click");
};
