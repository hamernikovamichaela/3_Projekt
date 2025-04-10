/**
 * Skript pro změnu pozadí a ovládání responzivního hamburger menu.
 *
 * Tento skript:
 * - Cyklicky mění pozadí elementu s class "welcome" každých 5 sekund.
 * - Ovládá zobrazení responzivního menu: po kliknutí na ikonku hamburgeru se menu zobrazí nebo skryje,
 *   a ikonka se přepne mezi fa-bars a fa-xmark.
 * - Při kliknutí mimo menu se menu zavře a ikonka se resetuje.
 * - Při změně velikosti okna (desktop > 600px) se resetuje stav menu a ikonky.
 */

/* =============================
   ZMĚNA POZADÍ SEKCE WELCOME
   ============================= */

/**
 * Výběr elementu s class "welcome", který slouží jako sekce s pozadím.
 * @type {HTMLElement}
 */
const welcomeSection = document.querySelector(".welcome");

/**
 * Pole obrázků pozadí, které budou cyklicky použity.
 * Každý řetězec obsahuje URL obrázku a vlastnosti formátování.
 * @type {string[]}
 */
const backgrounds = [
  "url('img/background.webp') no-repeat center/cover",
  "url('img/harry-potter-20-vyroci.webp') no-repeat center/cover",
  "url('img/harry-potter-hbo-serial-hermiona-ron-bradavice-nahled.webp') no-repeat center/cover",
];

/**
 * Index aktuálně zobrazeného pozadí.
 * @type {number}
 */
let currentBgIndex = 0;

/**
 * Funkce pro změnu pozadí sekce.
 * Nastaví elementu welcomeSection nové pozadí dle aktuálního indexu,
 * a poté aktualizuje index pro cyklickou změnu (při dosažení konce pole se cyklus opakuje).
 */
function changeBackground() {
  // Nastavení pozadí na aktuální obrázek z pole backgrounds
  welcomeSection.style.background = backgrounds[currentBgIndex];

  // Zvýšení indexu pro příští obrázek s cyklickým přetečením
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
}

// Inicializace – nastavíme počáteční pozadí
changeBackground();

// Nastavení intervalu pro změnu pozadí každých 5 sekund (5000 ms)
setInterval(changeBackground, 5000);

/* =============================
   RESPOZIVNÍ HAMBURGER MENU
   ============================= */

/**
 * Výběr elementu, který obsahuje ikonku menu.
 * @type {HTMLElement}
 */
const menuIcon = document.querySelector(".menu-icon");

/**
 * Výběr elementu navigačního menu.
 * @type {HTMLElement}
 */
const menuList = document.querySelector("nav");

/**
 * Výběr elementu ikonky, která obsahuje class "fa-solid".
 * Používá se pro změnu mezi ikonou hamburgeru a křížku.
 * @type {HTMLElement}
 */
const hamburgerIcon = document.querySelector(".fa-solid");

/**
 * Event listener pro kliknutí na element menuIcon (hamburger).
 * Přepíná třídu "active" na navigaci a mění ikonu mezi hamburgerem a křížkem.
 */
menuIcon.addEventListener("click", () => {
  // Přepínání třídy active – pokud je přítomna, menu se zobrazí (podle CSS v query)
  menuList.classList.toggle("active");

  // Přepnutí ikonky – pokud obsahuje třídu "fa-bars", nahradíme ji třídou "fa-xmark"
  if (hamburgerIcon.classList.contains("fa-bars")) {
    hamburgerIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    // Jinak vrátíme ikonku na hamburger (fa-bars) a odstraníme fa-xmark
    hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

/**
 * Event listener, který zavře menu, když uživatel klikne mimo oblast menu nebo ikonky.
 */
document.addEventListener("click", (event) => {
  // Pokud kliknutí nebylo v elementu s class "menu-icon" nebo v "nav"
  if (!event.target.closest(".menu-icon") && !event.target.closest("nav")) {
    // Odebereme třídu active, což podle CSS způsobí skrytí menu
    menuList.classList.remove("active");
    // Reset ikonky na hamburger (fa-bars)
    hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

/**
 * Event listener pro změnu velikosti okna.
 * Pokud se šířka okna zvětší nad 600px, zajistí, že:
 * - Menu bude zobrazeno.
 * - Třída "active" bude odebrána z menu.
 * - Ikonka bude resetována na hamburger (fa-bars).
 */
window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    menuList.classList.remove("active");
    menuList.style.display = "block";

    if (hamburgerIcon.classList.contains("fa-xmark")) {
      hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
    }
  }
});
