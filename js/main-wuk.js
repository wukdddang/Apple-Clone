// 전역변수 사용을 피하기 위한 즉시 실행함수 사용
(() => {
  let yOffset = 0; // 현재 웹 페이지 px 위치 저장용
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset) 이전의 스크롤 섹션들의 높이 값의 합
  let currentScene = 0; // 현재 활성화 된(눈 앞에 보고있는) scene (scroll-section)

  const sceneInfo = [
    {
      // 0번 scroll section
      type: "sticky",
      // 여러 디바이스에서도 열 수 있기 때문에, 높이를 고정값이 아닌 스크린 높이의 배수로 설정하려고 함
      heightNum: 5, // 브라우저 (웹 or 모바일) 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity: [0, 1]
      }
    },
    {
      type: "normal",
      // 1번 scroll section => 일반 (normal) 
      // 여러 디바이스에서도 열 수 있기 때문에, 높이를 고정값이 아닌 스크린 높이의 배수로 설정하려고 함
      heightNum: 5, // 브라우저 (웹 or 모바일) 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      type: "sticky",
      // 2번 scroll section
      // 여러 디바이스에서도 열 수 있기 때문에, 높이를 고정값이 아닌 스크린 높이의 배수로 설정하려고 함
      heightNum: 5, // 브라우저 (웹 or 모바일) 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      type: "sticky",
      // 3번 scroll section
      // 여러 디바이스에서도 열 수 있기 때문에, 높이를 고정값이 아닌 스크린 높이의 배수로 설정하려고 함
      heightNum: 5, // 브라우저 (웹 or 모바일) 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  // 각 스크롤 섹션의 높이 세팅
  function setLayout() {
    sceneInfo.forEach((scene) => {
      scene.scrollHeight = scene.heightNum * window.innerHeight; // window 전역 객체의 수평 스크롤 막대 높이를 포함한 창 내부 높이
      scene.objs.container.style.height = `${scene.scrollHeight}px`;
    });
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      // 앞서 선언한 변수 yOffset으로 현재 scene을 결정
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  // currentScrollY: 현재 scene에서 얼마나 스크롤 되었는지
  function calcValues(values, currentScrollY) {
    
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs
    const values = sceneInfo[currentScene].values;
    const currentScrollY = yOffset - prevScrollHeight;
    console.log(currentScene, currentScrollY)
    switch (currentScene) {
      case 0:
        // console.log('0 play')
        let messageA_opacity_0 = values.messageA_opacity[0]
        let messageA_opacity_1 = values.messageA_opacity[1]
        // console.log(messageA_opacity_0, messageA_opacity_1)
        console.log(calcValues(values.messageA_opacity, currentScrollY));
        // console.log(currentScrollY)
        break;
      case 1:
        // console.log('1 play')
        break;
      case 2:
        // console.log('2 play')
        break;
      case 3:
        // console.log('3 play')
        break;
    }
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) currentScene++;
    if (yOffset >= 0 && yOffset < prevScrollHeight) currentScene--;
    playAnimation();
    document.body.setAttribute('id', `show-scene-${currentScene}`)
  }

  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });
  // 창 크기가 바뀌면 화면 크기 재설정 (리렌더링)
  window.addEventListener("resize", setLayout);
  // 로드되면 크기 재설정
  window.addEventListener('load', setLayout);
  // window.addEventListener('DOMContentLoaded', setLayout); // 이거로 해도 됨 
  // load와 DOMContentLoaded의 차이 => 찾고 블로그 정리?
  // 이미지 외에 DOM 구조만 로드되면 실행하라는 건데, 우리는 영상과 이미지도 있고 하니까, load로 하는게 나음.
  setLayout();
})();
