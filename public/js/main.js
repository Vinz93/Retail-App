// Highlight the top nav as scrolling occurs
// $('body').scrollspy({
//     target: '.navbar-fixed-top'
// });

//jQuery for page scrolling feature - requires jQuery Easing plugin
// $(function() {
//     $('a.page-scroll').bind('click', function(event) {
//         var $anchor = $(this);
//         $('html, body').stop().animate({
//             scrollTop: $($anchor.attr('href')).offset().top
//         }, 1500, 'easeInOutExpo');
//         //  $('html, body').stop();
//
//         event.preventDefault();
//     });
// });

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
   if ($(".navbar").offset().top > 50) {
       $(".navbar-fixed-top").addClass("navbar-solid");
   } else {
       $(".navbar-fixed-top").removeClass("navbar-solid");
   }
}
$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});
