define(['jquery', 'visualisations/animations/circular'], function($, circularAnimation)
{
  function InstagramView(canvas, data, x, y)
  {
    this.canvas = canvas;
    this.data = data;
    this.x = x || 0;
    this.y = y || 0;
    this._createElement();
    this._bindEvents();

    this.latLongPosition = this.canvas.latLongToCartesian(data.coordinates);
    this.circularAnimation = new circularAnimation(this.latLongPosition)
    this.circularAnimation.startAnimation(function() {});

  };

  InstagramView.prototype.setPosition = function(x, y)
  {
    this.x = x;
    this.y = y;
    this.element
    .css('left', this.x + 'px')
    .css('top', this.y + 'px');

    var that = this;
    this.element.find(".image").bind("load", function() {
      that._animate();
    });

    this.element.find(".image").prop("src", this.data.image);
  };

  InstagramView.prototype._animate = function() {
    var lx = this.x + this.element.width() / 2;
    var ly = this.y + this.element.height() / 2;

    var s = this.latLongPosition;

    this.line = window.mapPaper
                      .path("M "+s.x+" "+ s.y +" L "+s.x+" "+ (s.y + 5))
                      .attr({ "stroke": "#FFFFFF", "stroke-width": 2})
                      .attr({"opacity":"0"});

    var that = this;
    // Animate trail
    setTimeout(function() {
      var animateStep1 = Raphael.animation({path:"M "+s.x+" "+ s.y+" L " + (lx - 20) + " "+ly, "opacity": "1"},
                                           2000,
                                           Raphael.easing_formulas[">"]);
      that.line.animate(animateStep1);
    }, 0);

    setTimeout(function() {
      var animateStep2 = Raphael.animation({path:"M "+s.x+" "+s.y+" L " + (lx + 20) + " "+ly},
                                           16000);
      that.line.animate(animateStep2);
    }, 2000);

    setTimeout(function() {
      var animateStep3 = Raphael.animation({path:"M " + (lx + 100) + " " + ly + " L " + (lx + 100) + " " + ly, "opacity": "0"},
                                           2000,
                                           Raphael.easing_formulas["<"]);
      that.line.animate(animateStep3);
    }, 18000);

    this.element.addClass("animation");
  };

  InstagramView.prototype.remove = function()
  {
    this._destroyElement();
  }

  InstagramView.prototype._createElement = function()
  {
    this.element = $("#template-instagram").clone().children().appendTo(this.canvas.element);
    this.element
    .css('left', this.x + 'px')
    .css('top', this.y + 'px')
  };

  InstagramView.prototype._getTextHtml = function()
  {
    var text = this.data.text;
    text = text.replace(/(@[a-zA-Z0-9_]+)/g, '<span class="mention">$1</span>');
    text = text.replace(/(#[a-zA-Z0-9_]+)/g, '<span class="hashtag">$1</span>');
    text = text.replace(/(http:\/\/[^\s]+)/g, '<span class="link">$1</span>');
    return text;
  }

  InstagramView.prototype._bindEvents = function()
  {
    var self = this;
    var listener = function()
    {
      self.element.get(0).removeEventListener('webkitAnimationEnd', listener, false);
      self.element.get(0).style.webkitAnimationName = '';
      self._onAnimationCompleted();
    };
    this.element.get(0).addEventListener('webkitAnimationEnd', listener, false);
  }

  InstagramView.prototype._destroyElement = function()
  {
    this.circularAnimation.remove();
    this.element.remove();
    if (this.line) this.line.remove();
  };

  InstagramView.prototype._onAnimationCompleted = function()
  {
    this._destroyElement();
    if (this.onComplete) this.onComplete();
  }

  return InstagramView;
});
