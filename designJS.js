var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'_'+'</span>';

  var that = this;
  var delta = 100 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "designDARK.css";
  css.innerHTML = ".txt-rotate > .wrap { }";
  document.body.appendChild(css);
};

// document.querySelectorAll('a[href="'+document.URL+'"]').forE‌​ach(function(elem){e‌​lem.className += ' current-link'});



function getCurrentLinkFrom(links){

    var curPage = document.URL;
    curPage = curPage.substr(curPage.lastIndexOf("/")) ;

    links.each(function(){
        var linkPage = $(this).attr("href");
        linkPage = linkPage.substr(linkPage.lastIndexOf("/"));
        if (curPage == linkPage){
            return $(this);
        }
    });
};

$(document).ready(function(){
    var currentLink = getCurrentLinkFrom($("navbar a"));
    currentLink.addClass("current_link") ;
});

