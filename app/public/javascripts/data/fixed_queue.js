define(function() {

  // Pushes new elements onto the end and pops from the front

  function FixedQueue(maxSize) {
    this.data = [];
    this.maxlength = parseInt(maxSize);
  }

  FixedQueue.prototype.push = function(item) {
    if (this.data.length == this.maxlength) {
      this.pop();
    }
    this.data.push(item);

    return this.data.length;
  };

  FixedQueue.prototype.pop = function() {
    if (this.data.length == 0) {
      return null;
    }
    removed = this.data.splice(0, 1);

    return removed[0];
  };

  FixedQueue.prototype.allItems = function() {
    return this.data;
  };

  FixedQueue.prototype.randomItem = function() {
    return this.data[Math.floor(Math.random() * this.data.length)];
  };

  return FixedQueue;

});
