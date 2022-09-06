// ==UserScript==
// @name     Keyboard Helper
// @description	利用左右方向進行上下頁翻頁。
// @version  1.2.4
// @downloadURL https://raw.githubusercontent.com/wawajohn/gm-keyboard-helper/master/gm-keyboard-helper.user.js
// @updateURL https://raw.githubusercontent.com/wawajohn/gm-keyboard-helper/master/gm-keyboard-helper.user.js
// @grant    none
// @require	https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @icon https://raw.githubusercontent.com/wawajohn/gm-keyboard-helper/master/favicon-96x96.png
// @run-at document-end
// @match https://ithelp.ithome.com.tw/*
// @match https://*.ptt.cc/*
// @match https://*.mobile01.com/*
// @match https://*.commonhealth.com.tw/*
// @match https://*.gq.com.tw/*
// ==/UserScript==


const go_debug = false;

// Get current page domain name
	var this_page = window.location.hostname;


// Define site list
/*
  site: site domain name
  prev_page: get pre page method
  next_page: get next page method
*/
  const sites = [
	// ithome
    {
        site: "ithelp.ithome.com.tw",
        prev_page: $(".article-series-page__arrow--left").parent().attr("href") || $("ul.pagination > li ").first().children().attr("href"),    next_page: $(".article-series-page__arrow--right").parent().attr("href") || $("ul.pagination > li ").last().children().attr("href")
    },
	// ptt
    {
        site: "www.ptt.cc",
        prev_page: $(".btn-group-paging > a").eq(1).attr("href"),
        next_page: $(".btn-group-paging > a").eq(2).attr("href")
    },
	// mobile01
    {
        site: "www.mobile01.com",
        prev_page: $(".c-pagination--prev").attr("href") || $(".u-gapBottom--max .l-pagination .is-active").prev().children().attr("href"),
        next_page: $(".c-pagination--next").attr("href") || $(".u-gapBottom--max .l-pagination .is-active").next().children().attr("href")
    },
	// google search
    {
        site: "www.google.com.tw",
        prev_page: $(".cur").prev().children().attr("href"),
        next_page: $(".cur").next().children().attr("href")
    },
	// 康健
    {
        site: "www.commonhealth.com.tw",
        prev_page: $(".pagination a.prev").attr("href"),
        next_page: $(".pagination a.next").attr("href")
    },
	// 每日時報
    {
        site: "wubaiqing.github.io",
        prev_page: $(".page-nav a.prev").attr("href") || $(".page-nav .prev").children().attr("href"),
        next_page: $(".page-nav a.next").attr("href") || $(".page-nav .next").children().attr("href")
    },
  // GQ Taiwan
    {
        site: "www.gq.com.tw",
        prev_page: $(".pagination .previous > a").attr("href"),
        next_page: $(".pagination .next > a").attr("href")
    },
  // 猴子 Git
    {
      site: "backlog.com",
      pre_page: $(".Paging .Nav-prev > a").attr("href"),
      next_page: $(".Paging .Nav-next > a").attr("href")
    }
  ]  



// Get domain name index
  
  dn_index = $.map(sites, function(item, index) {
    return item.site;
  }).indexOf(this_page);

if (dn_index > -1) {
	var prev_page = sites[dn_index].prev_page;
    var next_page = sites[dn_index].next_page;
    };
    
if ( $("link[rel=next]").length > 0 ) {
    var next_page = $("link[rel=next]").attr("href");
}

if ( $("link[rel=prev]").length > 0 ) {
    var prev_page = $("link[rel=prev]").attr("href");
}

bindkey();

function bindkey () {
  $("*").keydown( function(event) {
    let bind_key_no = event.which;
      switch(bind_key_no) {
        case 37:
          if (prev_page) {
          	location.href = prev_page;
          }
          break;
        case 39:
          if (next_page) {
          	location.href = next_page;
          }
          break;
      }
  });
}


if (go_debug) {
    console.table(sites);
    console.table(
        [{"dn_index": dn_index, "prev_page": prev_page, "next_page": next_page}]
        );
}
