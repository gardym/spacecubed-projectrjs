define(['layers/rect'], function(Rect) {

  function LayoutManager(width, height) {
    this.width = width;
    this.height = height;
    this.exclusionAreas = [];
    this.allocatedAreas = {};
  }

  LayoutManager.prototype.addExclusionArea = function(bounds) {
    this.exclusionAreas.push(bounds);
  };

  LayoutManager.prototype.allocateAreaOfDimensions = function(width, height) {
    var maxIterations = 16;
    var iteration = 0;
    while (iteration < maxIterations)
    {
      var area = this.getRandomAreaOfDimensions(width, height);
      if (this.areaIsAvailable(area)) 
      {
        var areaHandle = Math.random().toString().replace('.', '');
        this.allocatedAreas[areaHandle] = area;
        return  { handle: areaHandle, area: area }
      }
      iteration++;
    }
    return null;
  };

  LayoutManager.prototype.deallocateArea = function(areaKey)
  {
    delete this.allocatedAreas[areaKey];
  };


  LayoutManager.prototype.getRandomAreaOfDimensions = function(width, height)
  {
    return new Rect(
      Math.random() * (this.width - width),
      Math.random() * (this.height - height),
      width,
      height);
  };


  LayoutManager.prototype.areaIsAvailable = function(area)
  {
    for (var i = 0; i < this.exclusionAreas.length; i++)    
      if (this.exclusionAreas[i].intersects(area)) return false;
    for (var areaKey in this.allocatedAreas)
      if (this.allocatedArea[areaKey].intersects(area))
        return false;
    return true;
  };

  return LayoutManager;

});
