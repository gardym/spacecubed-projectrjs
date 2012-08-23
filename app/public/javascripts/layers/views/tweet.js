define(['jquery'], function($)
{
  function TweetView(layer, data, x, y) 
  {
    this.layer = layer;
    this.data = data;
    this.x = x || 0;
    this.y = y || 0;
    this._createElement();
    this._bindEvents();
  };

  TweetView.prototype.setPosition = function(x, y)
  {
    this.x = x;
    this.y = y;
    this.element
    .css('left', this.x + 'px')
    .css('top', this.y + 'px');
  };

  TweetView.prototype.remove = function()
  {
    this._destroyElement();    
  }

  TweetView.prototype._createElement = function() 
  {
    this.element = $("#template-tweet").clone().children().appendTo(this.layer.canvas.element);
    this.element.find(".text").html(this._getTextHtml());
    this.element.find(".username").text(this.data.username);
    this.element.find(".name").text(this.data.name);
    this.element.find(".avatar").prop("src", this.data.profile_image);
    this.element
    .css('left', this.x + 'px')
    .css('top', this.y + 'px')
  };

  TweetView.prototype._getTextHtml = function() 
  {
    var text = this.data.text;
    text = text.replace(/(@[a-zA-Z0-9_]+)/g, '<span class="mention">$1</span>');
    text = text.replace(/(#[a-zA-Z0-9_]+)/g, '<span class="hashtag">$1</span>');
    text = text.replace(/(http:\/\/[^\s]+)/g, '<span class="link">$1</span>');
    return text;
  }

  TweetView.prototype._bindEvents = function() 
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

  TweetView.prototype._destroyElement = function() 
  {
    this.element.remove();
  };

  TweetView.prototype._onAnimationCompleted = function() 
  {
    this._destroyElement();
    if (this.onComplete) this.onComplete();
  }

  return TweetView;
});
