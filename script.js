const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstpageanim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })

    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })

    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

var timeout;
var xprev = 0;
var yprev = 0;

window.addEventListener("mousemove", function (dets) {

  clearTimeout(timeout);

  var xdiff = dets.clientX - xprev;
  var ydiff = dets.clientY - yprev;

  xprev = dets.clientX;
  yprev = dets.clientY;

  var xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
  var yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

  document.querySelector("#minicircle").style.transform =
    `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

  timeout = setTimeout(function () {
    document.querySelector("#minicircle").style.transform =
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
  }, 100);
});

firstpageanim();
document.querySelectorAll(".elem").forEach(function (elem) {

  var rotate = 0;

  elem.addEventListener("mousemove", function (dets) {

    var bounds = elem.getBoundingClientRect();

    var x = dets.clientX - bounds.left;
    var y = dets.clientY - bounds.top;

    var diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      top: y,
      left: x,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      ease: "power3.out",
      duration: 0.5,
    });

  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: "power3.out",
      duration: 0.3
    });
  });

});