import { ref, onUnmounted, toRefs, watch, onMounted, nextTick, onBeforeUnmount, provide, computed, openBlock, createBlock, createVNode, renderSlot, withDirectives, vShow, inject } from 'vue';

/**
 * @callback HideFunc
 * @param {boolean} [isOuterClick]
 */

/**
 * @callback OnShowFunc
 * @param {Function} cb
 */

/**
 * @callback OnHideFunc
 * @param {OnHideCallback} cb
 */

/**
 * @callback OnHideCallback
 * @param {boolean} [isOuterClick]
 */

/**
 * @typedef {object} DropdownHookResult
 * @property {import('vue').Ref<boolean>} isShown
 * @property {import('vue').Ref<HTMLElement>} clickOutRef
 * @property {Function} toggle
 * @property {Function} show
 * @property {HideFunc} hide
 * @property {OnShowFunc} OnShowFunc
 * @property {OnHideFunc} onHide
 */

/**
 * @returns {DropdownHookResult}
 */
function useDropdown () {
  var isShown = ref(false);
  var clickOutRef = ref();

  var _unlistenOuterClick = function () { };
  var _onShowSubs = [];
  var _onHideSubs = [];
  var _unsubs = [];

  var toggle = function () {
    isShown.value ? hide() : show();
  };

  var show = function () {
    console.log('SHOW');
    isShown.value = true;
    _unlistenOuterClick = _onClickOut(clickOutRef.value, function () { return hide(true); });
    _onShowSubs.forEach(function (cb) { return cb(); });
  };

  var hide = function (isOuterClick) {
    if ( isOuterClick === void 0 ) isOuterClick = false;

    console.log('HIDE');
    isShown.value = false;
    _unlistenOuterClick();
    _onHideSubs.forEach(function (cb) { return cb(isOuterClick); });
  };

  var onShow = function (cb) {
    _onShowSubs.push(cb);
    _unsubs.push(function () {
      _onShowSubs = _onShowSubs.filter(function (el) { return el !== cb; });
    });
  };

  var onHide = function (cb) {
    _onHideSubs.push(cb);
    _unsubs.push(function () {
      _onHideSubs = _onHideSubs.filter(function (el) { return el !== cb; });
    });
  };

  onUnmounted(function () {
    _unlistenOuterClick();
    _unsubs.forEach(function (unsub) { return unsub(); });
  });

  return {
    isShown: isShown,
    clickOutRef: clickOutRef,
    toggle: toggle,
    show: show,
    hide: hide,
    onShow: onShow,
    onHide: onHide,
  }
}

function _onClickOut (el, cb) {
  var handler = function (e) {
    if (!el.contains(e.target)) { cb(); }
  };

  document.addEventListener('click', handler, false);
  return function () { document.removeEventListener('click', handler, false); }
}

/**
 * @typedef {object} VuePickerOption
 * @property {string} value
 * @property {boolean} isDisabled
 * @property {Function} setIsSelected
 * @property {Function} focus
 * @property {import('vue').ComputedRef<string>} optTxt
 * @property {import('vue').ComputedRef<string>} optHtml
 */

/**
 * @callback OnSelectFunc
 * @param {OnSelectCallback} cb
 */

/**
 * @callback SelectByValueFunc
 * @param {string} value
 */

/**
 * @callback OnSelectCallback
 * @param {string} value
 */

/**
 * @callback RegisterOptionFunc
 * @param {VuePickerOption} option
 */

/**
 * @typedef {object} OptionsHookResult
 * @property {import('vue').Ref<VuePickerOption>} current
 * @property {import('vue').Ref<string>} currentValue
 * @property {OnSelectFunc} onSelect
 * @property {RegisterOptionFunc} registerOption
 * @property {SelectByValueFunc} selectByValue
 * @property {Function} selectNext
 * @property {Function} selectPrev
 * @property {Function} selectFirst
 * @property {Function} selectLast
 */

/**
 * @returns {OptionsHookResult}
 */
function useOptions () {
  /** @type {import('vue').Ref<VuePickerOption>} */
  var current = ref(null);
  /** @type {import('vue').Ref<string} */
  var currentValue = ref(null);
  /** @type {VuePickerOption[]} */
  var _options = [];
  var _currentIdx = -1;
  var _onSelect = function () { };

  var selectByValue = function (value) {
    if ( value === void 0 ) value = '';

    var idx = _options.findIndex(function (el) { return el.value === value; });
    if (_currentIdx === idx) { return }

    var opt = _options[idx];
    if (!opt) { return _selectByIdx(-1) }
    _selectByIdx(idx);
  };

  var selectNext = function (offset, startIdx) {
    if ( offset === void 0 ) offset = 1;
    if ( startIdx === void 0 ) startIdx = _currentIdx;

    var nextIdx = startIdx + offset;
    var nextOpt = _options[nextIdx];
    console.log('NEXT');
    if (!nextOpt) { return }
    if (nextOpt.isDisabled) { return selectNext(offset, nextIdx) }
    _selectByIdx(nextIdx);
  };

  var selectPrev = function () {
    console.log('PREV');
    if (_currentIdx < 0) { return selectLast() }
    selectNext(-1);
  };

  var selectFirst = function () {
    console.log('FIRST');
    selectNext(1, -1);
  };

  var selectLast = function () {
    console.log('LAST');
    selectNext(-1, _options.length);
  };

  var _selectByIdx = function (idx) {
    if (current.value) { current.value.setIsSelected(false); }

    _currentIdx = idx;
    var option = _options[idx];

    if (option) {
      option.focus();
      option.setIsSelected(true);
    }

    current.value = option;
    currentValue.value = option && option.value;
    _onSelect(option && option.value);
  };

  var registerOption = function (opt) { _options.push(opt); };
  var unregisterOption = function (opt) {
    var idx = _options.indexOf(opt);
    if (idx >= 0) { _options.splice(idx, 1); }
  };
  var onSelect = function (cb) {
  if ( cb === void 0 ) cb = function () { };
 _onSelect = cb; };

  return {
    current: current,
    currentValue: currentValue,
    onSelect: onSelect,
    registerOption: registerOption,
    unregisterOption: unregisterOption,
    selectByValue: selectByValue,
    selectNext: selectNext,
    selectPrev: selectPrev,
    selectFirst: selectFirst,
    selectLast: selectLast,
    _options: _options,
  }
}

/**
 * @callback ListenUnlistenCallback
 * @param {HTMLElement} element
 */

/**
 * @typedef {object} KeyboardHookResult
 * @property {ListenUnlistenCallback} listenOn
 * @property {ListenUnlistenCallback} unlistenOn
 */

/**
 * @param {import('./useDropdown').DropdownHookResult} dropdown
 * @param {import('./useOptions').OptionsHookResult} options
 * @returns {KeyboardHookResult}
 */
function useKeyboard (dropdown, options) {
  var listener = function (event) { _onKeyDown(dropdown, options, event); };

  /** @type {ListenUnlistenCallback} */
  var listenOn = function (htmlEl) {
    htmlEl.addEventListener('keydown', listener);
  };

  /** @type {ListenUnlistenCallback} */
  var unlistenOn = function (htmlEl) {
    htmlEl.removeEventListener('keydown', listener);
  };

  return { listenOn: listenOn, unlistenOn: unlistenOn }
}

/**
 * @param {import('./useDropdown').DropdownHookResult} dropdown
 * @param {import('./useOptions').OptionsHookResult} options
 * @param {KeyboardEvent} event
 */
function _onKeyDown (dropdown, options, event) {
  switch (event.key) {
    case 'Esc':
    case 'Escape':
    case 'Tab':
      if (!dropdown.isShown.value) { break }
      event.preventDefault();
      event.stopPropagation();
      dropdown.hide();
      break

    case 'Enter':
      event.preventDefault();
      event.stopPropagation();
      dropdown.toggle();
      break

    case 'Up':
    case 'ArrowUp':
      event.preventDefault();
      event.stopPropagation();
      if (event.altKey) {
        dropdown.toggle();
      } else {
        options.selectPrev();
      }
      break

    case 'Down':
    case 'ArrowDown':
      event.preventDefault();
      event.stopPropagation();
      if (event.altKey) {
        dropdown.toggle();
      } else {
        options.selectNext();
      }
      break

    case 'Home':
      event.preventDefault();
      event.stopPropagation();
      options.selectFirst();
      break

    case 'End':
      event.preventDefault();
      event.stopPropagation();
      options.selectLast();
      break
  }
}

// spell-checker:words unregister

var script$1 = {
  name: 'VuePicker',

  emits: ['open', 'close', 'update:modelValue'],

  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    isAutofocus: { type: Boolean, default: false },
  },

  setup: function setup (props, ref$1) {
    var emit = ref$1.emit;

    var ref$2 = toRefs(props);
    var modelValue = ref$2.modelValue;
    var placeholder = ref$2.placeholder;
    var isAutofocus = ref$2.isAutofocus;
    var openerRef = ref();

    var dropdown = useDropdown();
    var options = useOptions();
    var keyboard = useKeyboard(dropdown, options);

    options.onSelect(function (value) {
      if (dropdown.isShown.value) { return }
      _emitModelValue(value !== undefined ? value : modelValue.value);
    });

    watch(modelValue, function (nV, oV) { nV !== oV && options.selectByValue(nV); });

    onMounted(function () {
      keyboard.listenOn(openerRef.value);

      dropdown.onShow(function () {
        keyboard.listenOn(document);
        if (options.current.value) {
          nextTick(function () { return options.current.value.focus(); });
        } else {
          openerRef.value.blur();
        }
        emit('open');
      });

      dropdown.onHide(function (isOuterClick) {
        keyboard.unlistenOn(document);
        if (!isOuterClick) { openerRef.value.focus(); }
        _emitModelValue();
        emit('close', isOuterClick);
      });

      if (isAutofocus.value) { openerRef.value.focus(); }
      if (modelValue.value) { options.selectByValue(modelValue.value); }
    });

    onBeforeUnmount(function () {
      keyboard.unlistenOn(openerRef.value);
      keyboard.unlisten(document);
    });

    provide('pickerContext', {
      selectByValue: function (value) {
      if ( value === void 0 ) value = '';
 options.selectByValue(value); },
      registerOption: function (opt) { options.registerOption(opt); },
      unregisterOption: function (opt) { options.unregisterOption(opt); },
      hideDropdown: function () { dropdown.hide(); },
    });

    var _emitModelValue = function (val) {
      if ( val === void 0 ) val = options.currentValue.value;

      if (typeof val !== 'string') { return }
      emit('update:modelValue', val);
    };

    return {
      openerRef: openerRef,
      dropdownIsShown: dropdown.isShown,
      dropdownClickOutRef: dropdown.clickOutRef,
      dropdownToggle: function () { return dropdown.toggle(); },
      curOpt: options.current,
      curOptVal: options.currentValue,
      openerTxt: computed(function () {
        if (!modelValue.value && placeholder.value) { return placeholder.value }
        return options.current.value && options.current.value.optTxt
      }),
      openerHtml: computed(function () {
        if (!modelValue.value && placeholder.value) { return placeholder.value }
        return options.current.value && options.current.value.optHtml
      }),
      _options: options._options
    }
  },
};

var _hoisted_1 = /*#__PURE__*/createVNode("i", { class: "vue-picker__opener-ico" }, null, -1 /* HOISTED */);
var _hoisted_2 = { class: "vue-picker__dropdown" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: ["vue-picker", {
      'vue-picker_open': $setup.dropdownIsShown,
      'vue-picker_disabled': $props.isDisabled,
      'vue-picker_has-val': $props.placeholder ? $props.modelValue : $setup.curOptVal,
    }],
    ref: "dropdownClickOutRef"
  }, [
    createVNode("button", {
      class: "vue-picker__opener",
      type: "button",
      onClick: _cache[1] || (_cache[1] = function ($event) { return ($setup.dropdownToggle()); }),
      disabled: $props.isDisabled,
      ref: "openerRef"
    }, [
      renderSlot(_ctx.$slots, "opener", {
        opener: { value: $setup.curOptVal, text: $setup.openerTxt, opt: $setup.curOpt }
      }, function () { return [
        createVNode("span", {
          class: "vue-picker__opener-txt",
          innerHTML: $setup.openerHtml
        }, null, 8 /* PROPS */, ["innerHTML"])
      ]; }),
      renderSlot(_ctx.$slots, "openerIco", {}, function () { return [
        _hoisted_1
      ]; })
    ], 8 /* PROPS */, ["disabled"]),
    withDirectives(createVNode("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "dropdownInner", {}, function () { return [
        renderSlot(_ctx.$slots, "default")
      ]; })
    ], 512 /* NEED_PATCH */), [
      [vShow, $setup.dropdownIsShown]
    ])
  ], 2 /* CLASS */))
}

script$1.render = render$1;
script$1.__file = "src/components/VuePicker.vue";

// TODO: test if dynamically add options works
// TODO: refactor provide-inject https://v3.vuejs.org/guide/composition-api-provide-inject.html
// TODO: cleanup comments: https://github.com/aMarCruz/rollup-plugin-cleanup
// TODO: space should not close the dropdown

// spell-checker:words unregister

var script = {
  name: 'VuePickerOption',

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },

  setup: function setup (props) {
    var ref$1 = toRefs(props);
    var value = ref$1.value;
    var text = ref$1.text;
    var btnRef = ref();
    var isSelected = ref(false);

    var option = {
      value: value.value,
      isDisabled: props.isDisabled,
      optHtml: computed(function () {
        var btnHtml = btnRef.value && btnRef.value.innerHTML;
        return text.value || btnHtml || value.value
      }),
      optTxt: computed(function () {
        var btnText = btnRef.value && btnRef.value.innerText;
        return text.value || btnText || value.value
      }
      ),
      setIsSelected: function (val) { isSelected.value = val; },
      focus: function () { btnRef.value && btnRef.value.focus(); },
    };

    var picker = inject('pickerContext');

    var selectMyValue = function () {
      picker.selectByValue(value.value);
      picker.hideDropdown();
    };

    onMounted(function () {
      console.log('Mounted', option);
      picker.registerOption(option);
    });

    onBeforeUnmount(function () {
      console.log('Unmounted', option);
      picker.unregisterOption(option);
    });

    return {
      btnRef: btnRef,
      isSelected: isSelected,
      selectMyValue: selectMyValue,
    }
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", {
    class: ["vue-picker-option", { 'vue-picker-option_cur': $setup.isSelected }],
    type: "button",
    onClick: _cache[1] || (_cache[1] = function ($event) { return ($setup.selectMyValue($event)); }),
    disabled: $props.isDisabled,
    ref: "btnRef"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10 /* CLASS, PROPS */, ["disabled"]))
}

script.render = render;
script.__file = "src/components/VuePickerOption.vue";

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;
  Vue.component('VuePicker', script$1);
  Vue.component('VuePickerOption', script);
}

if (typeof window !== 'undefined') {
  window.VuePicker = install;
} else if (typeof global !== 'undefined') {
  global.VuePicker = install;
}

export { script$1 as VuePicker, script as VuePickerOption, install };
