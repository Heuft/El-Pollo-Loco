class Keyboard {
  Left = false;
  Right = false;
  Space = false;
  Down = false;
  Up = false;
  D = false;

  touchEvent() {
    let btnLeft = document.getElementById("btnLeft");
    let btnRight = document.getElementById("btnRight");
    let btnJump = document.getElementById("btnJump");
    let btnThrow = document.getElementById("btnThrow");

    if (btnLeft) {
      btnLeft.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.Left = true;
      });
      btnLeft.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.Left = false;
      });
    }

    if (btnRight) {
      btnRight.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.Right = true;
      });
      btnRight.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.Right = false;
      });
    }

    if (btnJump) {
      btnJump.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.Space = true;
      });
      btnJump.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.Space = false;
      });
    }
    if (btnThrow) {
      btnThrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.D = true;
      });
      btnThrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.D = false;
      });
    }
  }
}
