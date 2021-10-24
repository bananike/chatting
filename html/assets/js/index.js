const GLOBAL = {
    hiddenStatus: false,
    liveStatus: 0, // 0: 방송시작전, 1: 라이브방송중, 2: 라이브종료
    FUCNTION: {
        checkHiddenItem: function () {
            const item = $('[data-hidden-item]');
            for (let i = 0; item.length > i; i++) {
                const status = $(item[i]).attr('data-hidden-item') === 'false' ? false : true;
                $(item[i]).attr('data-hidden-item', !status);
            }
            $('[data-hidden-item]').attr('data-hidden-item');
        },
        timeoutRemoveClass1: function (ele, className) {
            ele.closest('.slide_wrap').removeClass('active');
            ele.closest('.slide_wrap').find('.slide_back').removeClass(className);
            ele.closest('.slide_wrap').find('.slide_box').removeClass(className);
        },
        timeoutRemoveClass2: function (ele, className) {
            ele.find('.slide_back').removeClass(className);
            ele.find('.slide_box').removeClass(className);
        },
        fixedScrollBottom: function () {
            $('.chatting_wrap').scrollTop($('.chatting_wrap')[0].scrollHeight);
        },
        repositionPopupBtn: function () {
            const btn = $('#onClickClosePopup');
            const container = $('#onClickClosePopup').closest('.img_box');
            const target = $('#onClickClosePopup').closest('.img_box').find('img');
            btn.css('right', container.width() / 2 - target.width() / 2 + btn.width() / 2);
            btn.attr('hidden', false);
        },
    },
};
$(window).on('load', function () {
    // 팝업 생성 후 클로즈 버튼 위치 초기화
    GLOBAL.FUCNTION.repositionPopupBtn();
    // 로딩 후 채팅창 하단 스크롤
    GLOBAL.FUCNTION.fixedScrollBottom();
});
$(document).ready(function () {
    // 알림설정
    $('#onClickAlarm, #onClickAlarm2').on('click', function () {
        alert('alarm');
    });

    // 음소거
    $('#onClickMute').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).addClass('off');
        } else {
            $(this).removeClass('off');
            $(this).addClass('on');
        }
    });

    // 공유
    $('#onClickShare').on('click', function () {
        const target = $('#slideModal_Share');
        target.addClass('active');
        target.find('.slide_back').addClass('opening');
        target.find('.slide_box').addClass('opening');
        setTimeout(GLOBAL.FUCNTION.timeoutRemoveClass2, 300, target, 'opening');
    });

    // 세팅
    $('#onClickSetting').on('click', function () {
        alert('setting');
    });

    // 전체 닫기
    $('#onClickClose').on('click', function () {
        alert('close');
    });

    // 라이브 정보 확인
    $('#onClickLiveInfo').on('click', function () {
        const target = $('#slideModal_LiveInfo');
        target.addClass('active');
        target.find('.slide_back').addClass('opening');
        target.find('.slide_box').addClass('opening');
        setTimeout(GLOBAL.FUCNTION.timeoutRemoveClass2, 300, target, 'opening');
    });

    // 채팅
    $('#onClickComment').on('click', function () {
        const target = $('#slideModal_Comment');
        target.addClass('active');
        target.find('.slide_back').addClass('opening');
        target.find('.slide_box').addClass('opening');
        $('.tag_item').attr('data-hidden-item', true);
        $('.bottom_btn_group').attr('data-hidden-item', true);
        $('.chatting_wrap').css({ bottom: '95px', 'z-index': 106 });
        $('.chatting_notice').css({ bottom: '265px', 'z-index': 106 });
        setTimeout(GLOBAL.FUCNTION.timeoutRemoveClass2, 300, target, 'opening');
    });

    // 상품 더보기
    $('#onClickProduct').on('click', function () {
        const target = $('#slideModal_Product');
        target.addClass('active');
        target.find('.slide_back').addClass('opening');
        target.find('.slide_box').addClass('opening');
        setTimeout(GLOBAL.FUCNTION.timeoutRemoveClass2, 300, target, 'opening');
    });

    // 백그라운드 클릭 요소 숨김
    $('#hidden_toggler').on('click', function () {
        GLOBAL.FUCNTION.checkHiddenItem();
    });

    // slide close
    $('.onclickCloseSlide, .slideModalBackground').on('click', function () {
        $(this).closest('.slide_wrap').find('.slide_back').addClass('closing');
        $(this).closest('.slide_wrap').find('.slide_box').addClass('closing');
        $('.tag_item').attr('data-hidden-item', false);
        $('.bottom_btn_group').attr('data-hidden-item', false);
        $('.chatting_wrap').css({ bottom: '90px', 'z-index': 101 });
        $('.chatting_notice').css({ bottom: '260px', 'z-index': 101 });
        setTimeout(GLOBAL.FUCNTION.timeoutRemoveClass1, 300, $(this), 'closing');
    });

    // tab change
    $('[class^=tab_btn]').on('click', function () {
        $(this).parent('.tab_group').find('[class^=tab_btn]').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.slide_box').find('.slide_content').removeClass('active');
        $;
        $(this)
            .closest('.slide_box')
            .find('[data-tab=' + $(this).attr('data-tab-btn').split('_').pop() + ']')
            .addClass('active');
    });

    // 질문모드 변경
    $('#onClickChattingMode').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('#chattingInput').attr('placeholder', '실시간 채팅에 참여하세요');
        } else {
            $(this).addClass('active');
            $('#chattingInput').attr('placeholder', '궁금한 점을 질문해보세요');
        }
    });

    // 채팅창 높이 변경
    $('.chatting_wrap').on('click', function () {
        if ($(this).hasClass('long')) {
            $(this).removeClass('long');
            $('.chatting_notice').css('margin-bottom', '0px');
        } else {
            $(this).addClass('long');
            $('.chatting_notice').css('margin-bottom', '140px');
        }
        setTimeout(function () {
            GLOBAL.FUCNTION.fixedScrollBottom();
        }, 300);
    });

    // popup close
    $('#onClickClosePopup, #onClickClosePopupBack').on('click', function () {
        $(this).closest('.center_popup').css('display', 'none');
    });
});
