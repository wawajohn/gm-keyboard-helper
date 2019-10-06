// ==UserScript==
// @name     Keyboard Helper
// @description	利用左右方向進行上下頁翻頁。
// @version  1.1.3
// @downloadURL https://raw.githubusercontent.com/wawajohn/gm-keyboard-helper/master/gm-keyboard-helper.user.js
// @updateURL https://raw.githubusercontent.com/wawajohn/gm-keyboard-helper/master/gm-keyboard-helper.user.js
// @grant    none
// @require	https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js
// @icon https://wp.ix.market/bt/images/favicon-96x96.png
// @run-at document-end
// ==/UserScript==


const go_debug = false;

// Get current page domain name
	var this_page = window.location.hostname;


// Define site list
/*
  site: site domain name
  pre_page: get pre page method
  next_page: get next page method
*/
  const sites = [
    {site: "ithelp.ithome.com.tw",
     pre_page: $(".article-series-page__arrow--left").parent().attr("href") || $("ul.pagination > li ").first().children().attr("href"),
     next_page: $(".article-series-page__arrow--right").parent().attr("href") || $("ul.pagination > li ").last().children().attr("href")
    },
    {site: "www.ptt.cc",
     pre_page: $(".btn-group-paging > a").eq(1).attr("href"),
     next_page: $(".btn-group-paging > a").eq(2).attr("href")
    },
    {site: "www.mobile01.com",
     pre_page: $(".c-pagination--prev").attr("href") || $(".u-gapBottom--max .l-pagination .is-active").prev().children().attr("href"),
     next_page: $(".c-pagination--next").attr("href") || $(".u-gapBottom--max .l-pagination .is-active").next().children().attr("href")
    },
  ]
 



// Get domain name index
  
  dn_index = $.map(sites, function(item, index) {
    return item.site;
  }).indexOf(this_page);

if (dn_index > -1) {
	var pre_page = sites[dn_index].pre_page;
	var next_page = sites[dn_index].next_page;



  $("*").keydown( function(event) {
    let bind_key = event.which;
      switch(bind_key) {
        case 37:
          if (pre_page) {
          	location.href = pre_page;
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
  console.table([{"dn_index": dn_index, "pre_page": pre_page, "next_page": next_page}]);
}