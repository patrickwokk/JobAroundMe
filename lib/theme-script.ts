/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Kept in a plain module (not "use client") so the server layout can inline it.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem("jam.theme");var d=m==="dark"||(m!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})();`;
