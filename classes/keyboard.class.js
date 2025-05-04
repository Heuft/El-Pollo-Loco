class Keyboard {
  Left = false;
  Right = false;
  Space = false;
  Down = false;
  Up = false;
  D = false;

  /**
   * Initializes touch events for available on-screen buttons.
   * Binds event listeners for movement, jumping, and throwing.
   */
  touchEvent() {
    const btnLeft = document.getElementById("btnLeft");
    const btnRight = document.getElementById("btnRight");
    const btnJump = document.getElementById("btnJump");
    const btnThrow = document.getElementById("btnThrow");

    if (btnLeft) this.goLeft(btnLeft);
    if (btnRight) this.goRight(btnRight);
    if (btnJump) this.keyJump(btnJump);
    if (btnThrow) this.keyThrow(btnThrow);
  }

  /**
   * Binds touch events to the left movement button.
   *
   * @param {HTMLElement} button - The button element for moving left.
   */
  goLeft(button) {
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.Left = true;
    });
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.Left = false;
    });
  }

  /**
   * Binds touch events to the right movement button.
   *
   * @param {HTMLElement} button - The button element for moving right.
   */
  goRight(button) {
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.Right = true;
    });
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.Right = false;
    });
  }

  /**
   * Binds touch events to the jump button.
   *
   * @param {HTMLElement} button - The button element for jumping.
   */
  keyJump(button) {
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.Space = true;
    });
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.Space = false;
    });
  }

  /**
   * Binds touch events to the throw button.
   *
   * @param {HTMLElement} button - The button element for throwing.
   */
  keyThrow(button) {
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });
    button.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}
