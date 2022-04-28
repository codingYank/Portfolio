;(function ($) {
  var baseCssClass = "cursor-trail",
    addPoint = function (
      pageX,
      pageY,
      cssClass,
      timeToGrow,
      timeToShrink,
      scale
    ) {
      var point = $("<div>", {
        class: cssClass,
        css: {
          left: pageX,
          top: pageY,
        },
      }).appendTo("body")
      point
        .transition({ scale: scale }, timeToGrow)
        .transition({ scale: 1 }, timeToShrink, function () {
          point.remove()
        })
    }

  $.fn.cursorTrail = function (options) {
    options = $.extend(
      {
        timeToGrow: 50,
        timeToShrink: 50,
        scale: 10,
        class: "",
      },
      options
    )
    var actualCssClass = baseCssClass
    if (options["class"]) {
      actualCssClass += " " + options["class"]
    }
    return this.bind("mousemove", function (e) {
      addPoint(
        e.pageX,
        e.pageY,
        actualCssClass,
        options.timeToGrow,
        options.timeToShrink,
        options.scale
      )
    })
  }
})(jQuery)

if (!$.support.transition) {
  $.fn.transition = $.fn.animate
}

$(".tail-grid-container").cursorTrail({
  class: "trail",
})
