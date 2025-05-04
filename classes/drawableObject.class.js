class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /**
   * Loads a single image and assigns it to the object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws a debug frame around the object for development.
   * Only visible for characters and chickens.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws the object's current image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
