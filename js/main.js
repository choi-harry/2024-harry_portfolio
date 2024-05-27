//  |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
//          fullpage : nav,dot 연결
//  |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|
//fullpage
var myFullpage = new fullpage('#fullpage', {
  anchors: ['section1', 'section2', 'section3', 'section4'],
  menu: '.mainMenu',
  continuousVertical: false,
  initialSlide: 0, // 첫 번째 섹션으로 시작
  navigation: true, //네비게이션 키고 끄기
  navigationPosition: 'right', //네비 위치 :left
  afterLoad: function (anchorLink, index) {
    console.log("AFTER LOAD - anchorLink:" + anchorLink + " index:" + index);
  },
  onLeave: function (index, nextIndex, direction) {
    console.log("ONLEAVE - index:" + index + " nextIndex:" + nextIndex + " direction:" + direction);
  },
});

var page = $('.fullpage').fullpage({
  // 스크롤 허용을 원하는 요소의 클래스를 적어줌
  normalScrollElements: '.scroll'
});

// let mainTitle = document.querySelector('.mainMenu');

// window.addEventListener('scroll',function(){
//     let scrollvalue = window.scrollY;
//     console.log('scrollY', value);
// });

//  |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
//              01 PAGE : main
//  |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|

// 1. 캐릭터 마우스호버 gif로 변경
  $(".hi_character").mouseenter(function () {
    $("#wink", this).attr('src', "./image/hi_character.gif");
  });
  $(".hi_character").mouseleave(function () {
    $("#wink", this).attr('src', "./image/hi_character.png");
  });

// 2. nav : menu 호버스타일
let mainMenu = $('.mainMenu>li');

mainMenu.mouseover(function () {
  // mainMenu.removeClass('activeOn');
  $(this).addClass('active');
}).mouseout(function () {
  $(this).removeClass('active');
});

//  |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
//              02 PAGE : about
//  |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|

// 1. tabmenu : 사이드 탭버튼 내용변경
let tabmenu = $('.tab_btn>li');
let tabcontent = $('.tab_content>li');

tabmenu.click(function (e) {
  e.preventDefault();
  tabmenu.removeClass('activeOn');
  $(this).addClass('activeOn');

  let target = $(this).find('a').attr('href');
  tabcontent.removeClass('activeOn');
  $(target).addClass('activeOn');
});

//2. sub tabmenu : 탭내부 세부내용 탭버튼
let subTab = $('.detail_tab>li');
let subTabContent = $('.sub_tab_container>ul');

subTab.click(function(e) {
  e.preventDefault();
  subTab.removeClass('activeOn');
  $(this).addClass('activeOn'); 

  let target = $(this).find('a').attr('href');
  subTabContent.removeClass('activeOn');
  $(target).addClass('activeOn');
});
//2-2. sub tabmenu : 탭내부 세부내용 탭버튼
let subTab2 = $('.detail_tab2>li');
let subTabContent2 = $('.stc2>ul');

subTab2.click(function(e) {
  e.preventDefault();
  subTab2.removeClass('activeOn');
  $(this).addClass('activeOn'); 

  let target = $(this).find('a').attr('href');
  subTabContent2.removeClass('activeOn');
  $(target).addClass('activeOn');
});

//  |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
//             03 PAGE : project
//  |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|

//modal popup 스크롤해제(강현주 포폴에서 참고함)
let projectNum = $('.slick_slider>.DetailedPage');  //[클릭할 대상] slider_box 중에서 인덱스페이지 제외한 프로젝트갤러리
let activePage = $('.project_popup>.scroll>li'); // [클릭시 나타날 대상] project_popup 개별창 li들 : 팝업의 내용
let projectName = $('.project_name');           //  [클릭시 나타날 대상]project_title_name >li : 팝업내용의 소제목

  projectNum.each(function(index) { //프로젝트 갤러리 요소를 클릭시
  $(this).find('a').on('click', function(e) { //해당요소의 a태그
    e.preventDefault(); // a태그 기본값 해제
    //$('.project_popup').addClass('activeOn'); //팝업창의 상위요소 : 배경
    $('.project_popup').css('display', 'block'); //팝업창의 상위요소 : 배경

    $('.scrolldownAni').animate({opacity:1},3000).fadeOut(); // 1. 마우스 스크롤 애니메이션 재생
    activePage.removeClass('active_on'); //팝업창들 전체 클래스제거
    activePage.eq(index).addClass('active_on'); //인덱스 페이지 팝업창만 클래스활성화
    projectName.css('display', 'none');
    projectName.eq(index).css('display', 'block'); //인덱스 페이지의 소제목 활성화
    //  --------------- 문제의 구간 ----------------------------
    // $.fn.fullpage.setAllowScrolling(false); //풀페이지 스크롤 해제
    // $('html, body').css({
    //   'overflow': 'hidden',
    //   'height': '100%'
    // });
    $('body').on('scroll touchmove mousewheel', function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  });
});

$('.project_popup .modal_close_btn').each(function() {
  $(this).on('click', function() {
    $('.project_popup').css('display', 'none');
    // $('.project_popup>.scroll li').eq(index).css('display', 'none');

    //  --------------- 문제의 구간 ----------------------------
    //$.fn.fullpage.setAllowScrolling(true); //풀페이지 스크롤 재개
    $('body').off('scroll touchmove mousewheel');
  });
});

$('.project_popup').each(function() {
  $(this).on('click', function(e) {
    if (this === e.target) //배경 클릭 시 창 닫기
      $(this).css('display', 'none');
    //  --------------- 문제의 구간 ----------------------------
    //$.fn.fullpage.setAllowScrolling(true);
    $('body').off('scroll touchmove mousewheel');
  });
});


//  |￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
//        03-2 PAGE : project-popup
//  |＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿|

//팝업 보조설명페이지 토글형태
let textBox =$('.right_DescriptionBox');

$(".modal_sm_btn").click(function(){
  textBox.toggle();
});

//슬라이드 이미지 디테일페이지
// 1.클릭할 대상
// let project = $('.slick_slider .DetailedPage a');
// let popupWrapper = $('.project_popup');
// let closeBtn = $('.modal_close_btn');
// // let act = $('.project_popup.scroll.activeOn');

// project.click(function(e){
//   //a태그 비활성화
//   e.preventDefault();
//   //해당하는 '프로젝트+인덱스'의 
//   //팝업창을 활성화 + 해당 상세페이지 내용을 열어라
//   popupWrapper.addClass('activeOn');
// });

// closeBtn.click(function(){
//   popupWrapper.removeClass('activeOn');
// })


//페이지의 스크롤을 없애는 스크립트


// 페이지 스크롤 비활성화
// function disableScroll() {
//   // 현재 스크롤 위치를 저장
//   var scrollPosition = [
//     self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
//     self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
//   ];
//   // body에 스크롤 위치 고정
//   var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
//   html.data('scroll-position', scrollPosition);
//   html.data('previous-overflow', html.css('overflow'));
//   html.css('overflow', 'hidden');
//   window.scrollTo(scrollPosition[0], scrollPosition[1]);
// }

//slickslide
// $('.slick_slider').slick({
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   dots: true, //슬라이드 네비게이션(페이징
//   autoplay: true,//슬라이드 자동
//   autoplaySpeed: 2000, //자동으로 돌아가는 시간 10000
// });
    // centerMode: true,
    // centerPadding: '60px',
    // slide: 'div',
    // dots: true,
    // infinite: true,
    // speed: 300,
    // arrows: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
    // slidesToShow: 4,
    // slidesToScroll: 4,
    // pauseOnHover: true,      // 슬라이드 이동   시 마우스 호버하면 슬라이더 멈추게 설정
    // vertical: false,      // 세로 방향 슬라이드 옵션
    // prevArrow: "<button type='button' class='slick-prev'>Previous</button>",// 이전 화살표 모양 설정
    // nextArrow: "<button type='button' class='slick-next'>Next</button>",// 다음 화살표 모양 설정
    // dotsClass: "slick-dots",    //아래 나오는 페이지네이션(점) css class 지정
    // draggable: true,    //드래그 가능 여부
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 3,
    //             infinite: true,
    //             dots: true
    //         }
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    //     // You can unslick at a given breakpoint now by adding:
    //     // settings: "unslick"
    //     // instead of a settings object
    // ]

  //   지우지 마시오




// // 페이지 로드 후 실행
// window.onload = function() {
//   // 네비게이션 링크 클릭 시 스크롤 이동
//   document.querySelectorAll('nav a').forEach(anchor => {
//       anchor.addEventListener('click', function(e) {
//           e.preventDefault();
//           const targetId = this.getAttribute('href').substring(1);
//           const targetElement = document.getElementById(targetId);
//           targetElement.scrollIntoView({ behavior: 'smooth' });
//       });
//   });
// };

