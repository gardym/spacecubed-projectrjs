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

    var position = this.canvas.latLongToCartesian(data.coordinates);
    this.circularAnimation = new circularAnimation(position)
    this.circularAnimation.startAnimation(function() {});
  };

  InstagramView.prototype.setPosition = function(x, y)
  {
    this.x = x;
    this.y = y;
    this.element
    .css('left', this.x + 'px')
    .css('top', this.y + 'px');
  };

  InstagramView.prototype.remove = function()
  {
    this._destroyElement();    
  }

  InstagramView.prototype._createElement = function() 
  {
    this.element = $("#template-instagram").clone().children().appendTo(this.canvas.element);
    this.element.find(".image").prop("src", this.data.image);
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
  };

  InstagramView.prototype._onAnimationCompleted = function() 
  {
    this._destroyElement();
    if (this.onComplete) this.onComplete();
  }

  return InstagramView;
});
