import {
  Swiper,
  defaults
} from "./chunk-TFADTHH2.js";
import "./chunk-2YKHTQQ7.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-N6ESDQJH.js";

// node_modules/swiper/shared/update-swiper.mjs
var paramsList = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "swiperElementNodeName",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "breakpointsBase",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopAdditionalSlides",
  "loopAddBlankSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideFullyVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "slideBlankClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  // modules
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control"
];
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object" && !o.__swiper__;
}
function extend(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined") target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];
      else extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params) {
  if (params === void 0) {
    params = {};
  }
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params) {
  if (params === void 0) {
    params = {};
  }
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params) {
  if (params === void 0) {
    params = {};
  }
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function attrToProp(attrName) {
  if (attrName === void 0) {
    attrName = "";
  }
  return attrName.replace(/-[a-z]/g, (l) => l.toUpperCase().replace("-", ""));
}
function updateSwiper(_ref) {
  let {
    swiper,
    slides,
    passedParams,
    changedParams,
    nextEl,
    prevEl,
    scrollbarEl,
    paginationEl
  } = _ref;
  const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
  const {
    params: currentParams,
    pagination,
    navigation,
    scrollbar,
    virtual,
    thumbs
  } = swiper;
  let needThumbsInit;
  let needControllerInit;
  let needPaginationInit;
  let needScrollbarInit;
  let needNavigationInit;
  let loopNeedDestroy;
  let loopNeedEnable;
  let loopNeedReloop;
  if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && !passedParams.thumbs.swiper.destroyed && currentParams.thumbs && (!currentParams.thumbs.swiper || currentParams.thumbs.swiper.destroyed)) {
    needThumbsInit = true;
  }
  if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
    needControllerInit = true;
  }
  if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
    needPaginationInit = true;
  }
  if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
    needScrollbarInit = true;
  }
  if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
    needNavigationInit = true;
  }
  const destroyModule = (mod) => {
    if (!swiper[mod]) return;
    swiper[mod].destroy();
    if (mod === "navigation") {
      if (swiper.isElement) {
        swiper[mod].prevEl.remove();
        swiper[mod].nextEl.remove();
      }
      currentParams[mod].prevEl = void 0;
      currentParams[mod].nextEl = void 0;
      swiper[mod].prevEl = void 0;
      swiper[mod].nextEl = void 0;
    } else {
      if (swiper.isElement) {
        swiper[mod].el.remove();
      }
      currentParams[mod].el = void 0;
      swiper[mod].el = void 0;
    }
  };
  if (changedParams.includes("loop") && swiper.isElement) {
    if (currentParams.loop && !passedParams.loop) {
      loopNeedDestroy = true;
    } else if (!currentParams.loop && passedParams.loop) {
      loopNeedEnable = true;
    } else {
      loopNeedReloop = true;
    }
  }
  updateParams.forEach((key) => {
    if (isObject(currentParams[key]) && isObject(passedParams[key])) {
      Object.assign(currentParams[key], passedParams[key]);
      if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) {
        destroyModule(key);
      }
    } else {
      const newValue = passedParams[key];
      if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
        if (newValue === false) {
          destroyModule(key);
        }
      } else {
        currentParams[key] = passedParams[key];
      }
    }
  });
  if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
    virtual.slides = slides;
    virtual.update(true);
  } else if (changedParams.includes("virtual") && virtual && currentParams.virtual.enabled) {
    if (slides) virtual.slides = slides;
    virtual.update(true);
  }
  if (changedParams.includes("children") && slides && currentParams.loop) {
    loopNeedReloop = true;
  }
  if (needThumbsInit) {
    const initialized = thumbs.init();
    if (initialized) thumbs.update(true);
  }
  if (needControllerInit) {
    swiper.controller.control = currentParams.controller.control;
  }
  if (needPaginationInit) {
    if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
      paginationEl = document.createElement("div");
      paginationEl.classList.add("swiper-pagination");
      paginationEl.part.add("pagination");
      swiper.el.appendChild(paginationEl);
    }
    if (paginationEl) currentParams.pagination.el = paginationEl;
    pagination.init();
    pagination.render();
    pagination.update();
  }
  if (needScrollbarInit) {
    if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
      scrollbarEl = document.createElement("div");
      scrollbarEl.classList.add("swiper-scrollbar");
      scrollbarEl.part.add("scrollbar");
      swiper.el.appendChild(scrollbarEl);
    }
    if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
    scrollbar.init();
    scrollbar.updateSize();
    scrollbar.setTranslate();
  }
  if (needNavigationInit) {
    if (swiper.isElement) {
      if (!nextEl || typeof nextEl === "string") {
        nextEl = document.createElement("div");
        nextEl.classList.add("swiper-button-next");
        nextEl.innerHTML = swiper.hostEl.constructor.nextButtonSvg;
        nextEl.part.add("button-next");
        swiper.el.appendChild(nextEl);
      }
      if (!prevEl || typeof prevEl === "string") {
        prevEl = document.createElement("div");
        prevEl.classList.add("swiper-button-prev");
        prevEl.innerHTML = swiper.hostEl.constructor.prevButtonSvg;
        prevEl.part.add("button-prev");
        swiper.el.appendChild(prevEl);
      }
    }
    if (nextEl) currentParams.navigation.nextEl = nextEl;
    if (prevEl) currentParams.navigation.prevEl = prevEl;
    navigation.init();
    navigation.update();
  }
  if (changedParams.includes("allowSlideNext")) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes("allowSlidePrev")) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes("direction")) {
    swiper.changeDirection(passedParams.direction, false);
  }
  if (loopNeedDestroy || loopNeedReloop) {
    swiper.loopDestroy();
  }
  if (loopNeedEnable || loopNeedReloop) {
    swiper.loopCreate();
  }
  swiper.update();
}

// node_modules/swiper/shared/get-element-params.mjs
var formatValue = (val) => {
  if (parseFloat(val) === Number(val)) return Number(val);
  if (val === "true") return true;
  if (val === "") return true;
  if (val === "false") return false;
  if (val === "null") return null;
  if (val === "undefined") return void 0;
  if (typeof val === "string" && val.includes("{") && val.includes("}") && val.includes('"')) {
    let v;
    try {
      v = JSON.parse(val);
    } catch (err) {
      v = val;
    }
    return v;
  }
  return val;
};
var modulesParamsList = ["a11y", "autoplay", "controller", "cards-effect", "coverflow-effect", "creative-effect", "cube-effect", "fade-effect", "flip-effect", "free-mode", "grid", "hash-navigation", "history", "keyboard", "mousewheel", "navigation", "pagination", "parallax", "scrollbar", "thumbs", "virtual", "zoom"];
function getParams(element, propName, propValue) {
  const params = {};
  const passedParams = {};
  extend(params, defaults);
  const localParamsList = [...paramsList, "on"];
  const allowedParams = localParamsList.map((key) => key.replace(/_/, ""));
  localParamsList.forEach((paramName) => {
    paramName = paramName.replace("_", "");
    if (typeof element[paramName] !== "undefined") {
      passedParams[paramName] = element[paramName];
    }
  });
  const attrsList = [...element.attributes];
  if (typeof propName === "string" && typeof propValue !== "undefined") {
    attrsList.push({
      name: propName,
      value: isObject(propValue) ? __spreadValues({}, propValue) : propValue
    });
  }
  attrsList.forEach((attr) => {
    const moduleParam = modulesParamsList.filter((mParam) => attr.name.indexOf(`${mParam}-`) === 0)[0];
    if (moduleParam) {
      const parentObjName = attrToProp(moduleParam);
      const subObjName = attrToProp(attr.name.split(`${moduleParam}-`)[1]);
      if (typeof passedParams[parentObjName] === "undefined") passedParams[parentObjName] = {};
      if (passedParams[parentObjName] === true) {
        passedParams[parentObjName] = {
          enabled: true
        };
      }
      passedParams[parentObjName][subObjName] = formatValue(attr.value);
    } else {
      const name = attrToProp(attr.name);
      if (!allowedParams.includes(name)) return;
      const value = formatValue(attr.value);
      if (passedParams[name] && modulesParamsList.includes(attr.name) && !isObject(value)) {
        if (passedParams[name].constructor !== Object) {
          passedParams[name] = {};
        }
        passedParams[name].enabled = !!value;
      } else {
        passedParams[name] = value;
      }
    }
  });
  extend(params, passedParams);
  if (params.navigation) {
    params.navigation = __spreadValues({
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next"
    }, params.navigation !== true ? params.navigation : {});
  } else if (params.navigation === false) {
    delete params.navigation;
  }
  if (params.scrollbar) {
    params.scrollbar = __spreadValues({
      el: ".swiper-scrollbar"
    }, params.scrollbar !== true ? params.scrollbar : {});
  } else if (params.scrollbar === false) {
    delete params.scrollbar;
  }
  if (params.pagination) {
    params.pagination = __spreadValues({
      el: ".swiper-pagination"
    }, params.pagination !== true ? params.pagination : {});
  } else if (params.pagination === false) {
    delete params.pagination;
  }
  return {
    params,
    passedParams
  };
}

// node_modules/swiper/swiper-element.mjs
var SwiperCSS = `:host{--swiper-theme-color:#007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{width:100%;height:100%;margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);box-sizing:content-box}.swiper-android ::slotted(swiper-slide),.swiper-ios ::slotted(swiper-slide),.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}::slotted(swiper-slide){flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}::slotted(.swiper-slide-invisible-blank){visibility:hidden}.swiper-autoheight,.swiper-autoheight ::slotted(swiper-slide){height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden ::slotted(swiper-slide){transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d ::slotted(swiper-slide){transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode ::slotted(swiper-slide){scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode ::slotted(swiper-slide){scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered ::slotted(swiper-slide){scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal ::slotted(swiper-slide):first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical ::slotted(swiper-slide):first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}`;
var SwiperSlideCSS = `::slotted(.swiper-slide-shadow),::slotted(.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-top){position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}::slotted(.swiper-slide-shadow){background:rgba(0,0,0,.15)}::slotted(.swiper-slide-shadow-left){background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-right){background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-top){background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-bottom){background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear;width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-zoom-container){width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}::slotted(.swiper-zoom-container)>canvas,::slotted(.swiper-zoom-container)>img,::slotted(.swiper-zoom-container)>svg{max-width:100%;max-height:100%;object-fit:contain}`;
var DummyHTMLElement = class {
};
var ClassToExtend = typeof window === "undefined" || typeof HTMLElement === "undefined" ? DummyHTMLElement : HTMLElement;
var arrowSvg = `<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>
    `;
var addStyle = (shadowRoot, styles) => {
  if (typeof CSSStyleSheet !== "undefined" && shadowRoot.adoptedStyleSheets) {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    shadowRoot.adoptedStyleSheets = [styleSheet];
  } else {
    const style = document.createElement("style");
    style.rel = "stylesheet";
    style.textContent = styles;
    shadowRoot.appendChild(style);
  }
};
var SwiperContainer = class extends ClassToExtend {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
  }
  static get nextButtonSvg() {
    return arrowSvg;
  }
  static get prevButtonSvg() {
    return arrowSvg.replace("/></svg>", ' transform-origin="center" transform="rotate(180)"/></svg>');
  }
  cssStyles() {
    return [
      SwiperCSS,
      // eslint-disable-line
      ...this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []
    ].join("\n");
  }
  cssLinks() {
    return this.injectStylesUrls || [];
  }
  calcSlideSlots() {
    const currentSideSlots = this.slideSlots || 0;
    const slideSlotChildren = [...this.querySelectorAll(`[slot^=slide-]`)].map((child) => {
      return parseInt(child.getAttribute("slot").split("slide-")[1], 10);
    });
    this.slideSlots = slideSlotChildren.length ? Math.max(...slideSlotChildren) + 1 : 0;
    if (!this.rendered) return;
    if (this.slideSlots > currentSideSlots) {
      for (let i = currentSideSlots; i < this.slideSlots; i += 1) {
        const slideEl = document.createElement("swiper-slide");
        slideEl.setAttribute("part", `slide slide-${i + 1}`);
        const slotEl = document.createElement("slot");
        slotEl.setAttribute("name", `slide-${i + 1}`);
        slideEl.appendChild(slotEl);
        this.shadowRoot.querySelector(".swiper-wrapper").appendChild(slideEl);
      }
    } else if (this.slideSlots < currentSideSlots) {
      const slides = this.swiper.slides;
      for (let i = slides.length - 1; i >= 0; i -= 1) {
        if (i > this.slideSlots) {
          slides[i].remove();
        }
      }
    }
  }
  render() {
    if (this.rendered) return;
    this.calcSlideSlots();
    let localStyles = this.cssStyles();
    if (this.slideSlots > 0) {
      localStyles = localStyles.replace(/::slotted\(([a-z-0-9.]*)\)/g, "$1");
    }
    if (localStyles.length) {
      addStyle(this.shadowRoot, localStyles);
    }
    this.cssLinks().forEach((url) => {
      const linkExists = this.shadowRoot.querySelector(`link[href="${url}"]`);
      if (linkExists) return;
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.href = url;
      this.shadowRoot.appendChild(linkEl);
    });
    const el = document.createElement("div");
    el.classList.add("swiper");
    el.part = "container";
    el.innerHTML = `
      <slot name="container-start"></slot>
      <div class="swiper-wrapper" part="wrapper">
        <slot></slot>
        ${Array.from({
      length: this.slideSlots
    }).map((_, index) => `
        <swiper-slide part="slide slide-${index}">
          <slot name="slide-${index}"></slot>
        </swiper-slide>
        `).join("")}
      </div>
      <slot name="container-end"></slot>
      ${needsNavigation(this.passedParams) ? `
        <div part="button-prev" class="swiper-button-prev">${this.constructor.prevButtonSvg}</div>
        <div part="button-next" class="swiper-button-next">${this.constructor.nextButtonSvg}</div>
      ` : ""}
      ${needsPagination(this.passedParams) ? `
        <div part="pagination" class="swiper-pagination"></div>
      ` : ""}
      ${needsScrollbar(this.passedParams) ? `
        <div part="scrollbar" class="swiper-scrollbar"></div>
      ` : ""}
    `;
    this.shadowRoot.appendChild(el);
    this.rendered = true;
  }
  initialize() {
    var _this = this;
    if (this.initialized) return;
    this.initialized = true;
    const {
      params: swiperParams,
      passedParams
    } = getParams(this);
    this.swiperParams = swiperParams;
    this.passedParams = passedParams;
    delete this.swiperParams.init;
    this.render();
    this.swiper = new Swiper(this.shadowRoot.querySelector(".swiper"), __spreadProps(__spreadValues(__spreadValues({}, swiperParams.virtual ? {} : {
      observer: true
    }), swiperParams), {
      touchEventsTarget: "container",
      onAny: function(name) {
        if (name === "observerUpdate") {
          _this.calcSlideSlots();
        }
        const eventName = swiperParams.eventsPrefix ? `${swiperParams.eventsPrefix}${name.toLowerCase()}` : name.toLowerCase();
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        const event = new CustomEvent(eventName, {
          detail: args,
          bubbles: name !== "hashChange",
          cancelable: true
        });
        _this.dispatchEvent(event);
      }
    }));
  }
  connectedCallback() {
    if (this.initialized && this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM) {
      return;
    }
    if (this.init === false || this.getAttribute("init") === "false") {
      return;
    }
    this.initialize();
  }
  disconnectedCallback() {
    if (this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM) {
      return;
    }
    if (this.swiper && this.swiper.destroy) {
      this.swiper.destroy();
    }
    this.initialized = false;
  }
  updateSwiperOnPropChange(propName, propValue) {
    const {
      params: swiperParams,
      passedParams
    } = getParams(this, propName, propValue);
    this.passedParams = passedParams;
    this.swiperParams = swiperParams;
    if (this.swiper && this.swiper.params[propName] === propValue) {
      return;
    }
    updateSwiper(__spreadValues(__spreadValues(__spreadValues({
      swiper: this.swiper,
      passedParams: this.passedParams,
      changedParams: [attrToProp(propName)]
    }, propName === "navigation" && passedParams[propName] ? {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next"
    } : {}), propName === "pagination" && passedParams[propName] ? {
      paginationEl: ".swiper-pagination"
    } : {}), propName === "scrollbar" && passedParams[propName] ? {
      scrollbarEl: ".swiper-scrollbar"
    } : {}));
  }
  attributeChangedCallback(attr, prevValue, newValue) {
    if (!this.initialized) return;
    if (prevValue === "true" && newValue === null) {
      newValue = false;
    }
    this.updateSwiperOnPropChange(attr, newValue);
  }
  static get observedAttributes() {
    const attrs = paramsList.filter((param) => param.includes("_")).map((param) => param.replace(/[A-Z]/g, (v) => `-${v}`).replace("_", "").toLowerCase());
    return attrs;
  }
};
paramsList.forEach((paramName) => {
  if (paramName === "init") return;
  paramName = paramName.replace("_", "");
  Object.defineProperty(SwiperContainer.prototype, paramName, {
    configurable: true,
    get() {
      return (this.passedParams || {})[paramName];
    },
    set(value) {
      if (!this.passedParams) this.passedParams = {};
      this.passedParams[paramName] = value;
      if (!this.initialized) return;
      this.updateSwiperOnPropChange(paramName, value);
    }
  });
});
var SwiperSlide = class extends ClassToExtend {
  constructor() {
    super();
    this.attachShadow({
      mode: "open"
    });
  }
  render() {
    const lazy = this.lazy || this.getAttribute("lazy") === "" || this.getAttribute("lazy") === "true";
    addStyle(this.shadowRoot, SwiperSlideCSS);
    this.shadowRoot.appendChild(document.createElement("slot"));
    if (lazy) {
      const lazyDiv = document.createElement("div");
      lazyDiv.classList.add("swiper-lazy-preloader");
      lazyDiv.part.add("preloader");
      this.shadowRoot.appendChild(lazyDiv);
    }
  }
  initialize() {
    this.render();
  }
  connectedCallback() {
    this.initialize();
  }
};
var register = () => {
  if (typeof window === "undefined") return;
  if (!window.customElements.get("swiper-container")) window.customElements.define("swiper-container", SwiperContainer);
  if (!window.customElements.get("swiper-slide")) window.customElements.define("swiper-slide", SwiperSlide);
};
if (typeof window !== "undefined") {
  window.SwiperElementRegisterParams = (params) => {
    paramsList.push(...params);
  };
}
export {
  SwiperContainer,
  SwiperSlide,
  register
};
//# sourceMappingURL=swiper_element.js.map
