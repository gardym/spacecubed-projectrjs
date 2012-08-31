define(['layers/rect'], function(Rect)
{
  function LayoutManager(width, height, margin) {
    this.width = width;
    this.height = height;
    this.margin = margin || 10;
    this.exclusionAreas = [];
    this.allocatedAreas = {};
  }

  LayoutManager.prototype.exclude = function(x, y, width, height) {
    this.addExclusionArea(new Rect(x, y, width, height));
  };

  LayoutManager.prototype.addExclusionArea = function(bounds) {
    this.exclusionAreas.push(bounds);
  };

  LayoutManager.prototype.allocateAreaOfDimensions = function(width, height, closeToX, closeToY) {
    var maxIterations = 64;
    var iteration = 0;
    var bestDistance = null;
    var bestArea = null;
    while (iteration < maxIterations)
    {
      var area = this.getRandomAreaOfDimensions(width, height);
      if (this.areaIsAvailable(area))
      {
        if (closeToX)
        {
          var distance = Math.pow((closeToX - (area.x + area.w / 2)), 2)
                       + Math.pow((closeToY - (area.y + area.h / 2)), 2);
          if (bestArea == null || distance < bestDistance) {
            bestDistance = distance;
            bestArea = area;
          }
        } else {
          bestArea = area;
          break;
        }
      }
      iteration++;
    }
    if(bestArea != null)
    {
      var areaHandle = Math.random().toString().replace('.', '');
      this.allocatedAreas[areaHandle] = bestArea;
      return  { handle: areaHandle, area: bestArea }
    } else {
      return null;
    }
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
      if (this.exclusionAreas[i].expand(this.margin, this.margin, this.margin, this.margin).intersects(area)) return false;
    for (var areaKey in this.allocatedAreas)
      if (this.allocatedAreas[areaKey].expand(this.margin, this.margin, this.margin, this.margin).intersects(area))
        return false;
    return true;
  };

  return LayoutManager;

});
