export const toggleSidebar = () => {
  const leftSide = document.getElementById("left-sidebar");
  leftSide.classList.toggle("hide_side_bar");
  const mainPage = document.getElementsByClassName("page");
  for (let i = 0; i < mainPage.length; i++) {
    mainPage[i].classList.toggle('hide_side_bar');
  }
};
export const toggleGridbar = () => {
  const metismenu = document.querySelector(".metismenu");
    metismenu.classList.toggle('grid');
};
