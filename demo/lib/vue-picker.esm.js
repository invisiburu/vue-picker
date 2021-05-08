import { inject, ref, provide, onUnmounted, onMounted, onUpdated, nextTick, toRefs, watch, onBeforeUnmount, computed, openBlock, createBlock, createVNode, renderSlot, withDirectives, vShow, withKeys, withModifiers } from 'vue';

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
    isShown.value = true;
    _unlistenOuterClick = _onClickOut(clickOutRef.value, function () { return hide(true); });
    _onShowSubs.forEach(function (cb) { return cb(); });
  };

  var hide = function (isOuterClick) {
    if ( isOuterClick === void 0 ) isOuterClick = false;

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

  provide('dropdownHide', function () { return hide(); });

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

function useDropdownAsChild () {
  return {
    hide: inject('dropdownHide', function () { }),
  }
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
 * @returns {Function}
 */

/**
 * @typedef {object} OptionsHookResult
 * @property {import('vue').Ref<VuePickerOption>} current
 * @property {OnSelectFunc} onSelect
 * @property {SelectByValueFunc} selectByValue
 * @property {Function} selectNext
 * @property {Function} selectPrev
 * @property {Function} selectFirst
 * @property {Function} selectLast
 */

/**
 * @param {import('vue').Ref<HTMLElement>} optsContRef
 * @returns {OptionsHookResult}
 */
function useOptions (optsContRef) {
  /** @type {import('vue').Ref<VuePickerOption>} */
  var current = ref(null);
  /** @type {Object<string,VuePickerOption>} */
  var _options = {};
  /** @type {NodeListOf<HTMLButtonElement>} */
  var _nodes = [];
  var _nodesUpdateRequired = false;
  var _currentIdx = -1;
  var _onSelect = function () { };

  var selectByValue = function (value) {
    if ( value === void 0 ) value = '';

    var opt = _options[value];
    if (opt === current.value) { return }

    if (current.value) { current.value.setIsSelected(false); }

    if (!opt) {
      current.value = null;
      _currentIdx = -1;
      _onSelect(null);
      return
    }

    opt.setIsSelected(true);
    current.value = opt;
    _currentIdx = _getNodeIdx(opt.value);
    _onSelect(opt.value);
  };

  var selectNext = function (offset, startIdx) {
    if ( offset === void 0 ) offset = 1;
    if ( startIdx === void 0 ) startIdx = _currentIdx;

    var nextIdx = startIdx + offset;
    var nextNode = _nodes[startIdx + offset];
    if (!nextNode) { return }

    if (nextNode.disabled) { return selectNext(offset, nextIdx) }

    var nextVal = nextNode.dataset.value;
    selectByValue(nextVal);
    current.value.focus();
  };

  var selectPrev = function () { return _currentIdx < 0 ? selectLast() : selectNext(-1); };
  var selectFirst = function () { return selectNext(1, -1); };
  var selectLast = function () { return selectNext(-1, _nodes.length); };

  provide('registerOption', function (opt) {
    _nodesUpdateRequired = true;
    _options[opt.value] = _options[opt.value] || opt;
    return function () {
      _nodesUpdateRequired = true;
      delete _options[opt.value];
    }
  });
  provide('selectByValue', selectByValue);

  onMounted(function () { return _updateNodes(); });
  onUpdated(function () { return nextTick(_updateNodes); });

  var _getNodeIdx = function (value) {
    for (var idx = 0; idx < _nodes.length; idx++) {
      var node = _nodes[idx];
      if (node.dataset.value === value) { return idx }
    }
    return -1
  };

  var _updateNodes = function () {
    if (!_nodesUpdateRequired) { return }
    _nodesUpdateRequired = false;
    _nodes = optsContRef.value.querySelectorAll('.vue-picker-option');
    if (current.value) { _currentIdx = _getNodeIdx(current.value); }
  };

  return {
    current: current,
    onSelect: function (cb) {
    if ( cb === void 0 ) cb = function () { };
 _onSelect = cb; },
    selectByValue: selectByValue,
    selectNext: selectNext,
    selectPrev: selectPrev,
    selectFirst: selectFirst,
    selectLast: selectLast,
  }
}

function useOptionsAsChild () {
  return {
    registerOption: inject('registerOption', function (opt) { return function () { }; }),
    selectByValue: inject('selectByValue', function (val) { })
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
    var dropdownRef = ref();

    var dropdown = useDropdown();
    var options = useOptions(dropdownRef);
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
        nextTick(function () { return openerRef.value.focus(); });
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

    var _emitModelValue = function (val) {
      if ( val === void 0 ) val = _curOptVal();

      if (typeof val !== 'string') { return }
      emit('update:modelValue', val);
    };

    var _curOptVal = function () {
      return options.current.value && options.current.value.value
    };

    return {
      openerRef: openerRef,
      dropdownRef: dropdownRef,
      dropdownIsShown: dropdown.isShown,
      dropdownClickOutRef: dropdown.clickOutRef,
      dropdownToggle: function () { return dropdown.toggle(); },
      curOpt: options.current,
      curOptVal: computed(function () { return _curOptVal(); }),
      openerTxt: computed(function () {
        if (!modelValue.value && placeholder.value) { return placeholder.value }
        return options.current.value && options.current.value.optTxt
      }),
      openerHtml: computed(function () {
        if (!modelValue.value && placeholder.value) { return placeholder.value }
        return options.current.value && options.current.value.optHtml
      }),
    }
  },
};

var _hoisted_1 = /*#__PURE__*/createVNode("i", { class: "vue-picker__opener-ico" }, null, -1 /* HOISTED */);
var _hoisted_2 = {
  ref: "dropdownRef",
  class: "vue-picker__dropdown"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    ref: "dropdownClickOutRef",
    class: ["vue-picker", {
      'vue-picker_open': $setup.dropdownIsShown,
      'vue-picker_disabled': $props.isDisabled,
      'vue-picker_has-val': $props.placeholder ? $props.modelValue : $setup.curOptVal,
    }]
  }, [
    createVNode("button", {
      ref: "openerRef",
      class: "vue-picker__opener",
      type: "button",
      onClick: _cache[1] || (_cache[1] = function ($event) { return ($setup.dropdownToggle()); }),
      disabled: $props.isDisabled
    }, [
      renderSlot(_ctx.$slots, "opener", {
        opener: {
          value: $setup.curOpt && $setup.curOpt.value,
          text: $setup.openerTxt,
          opt: $setup.curOpt,
        }
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

// TODO: refactor provide-inject https://v3.vuejs.org/guide/composition-api-provide-inject.html
// TODO: cleanup comments: https://github.com/aMarCruz/rollup-plugin-cleanup
// TODO: unit tests
// TODO: test optHtml, optTxt, props reactivity

var script = {
  name: 'VuePickerOption',

  props: {
    value: { type: String, default: '' },
    text: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },

  setup: function setup (props) {
    var btnRef = ref();
    var isSelected = ref(false);

    var ref$1 = useOptionsAsChild();
    var registerOption = ref$1.registerOption;
    var selectByValue = ref$1.selectByValue;
    var ref$2 = useDropdownAsChild();
    var hideDropdown = ref$2.hide;

    var option = {
      value: props.value,
      optHtml: computed(function () {
        var btnHtml = btnRef.value && btnRef.value.innerHTML;
        return props.text.value || btnHtml || props.value.value
      }),
      optTxt: computed(function () {
        var btnText = btnRef.value && btnRef.value.innerText;
        return props.text.value || btnText || props.value.value
      }
      ),
      setIsSelected: function (val) { isSelected.value = val; },
      focus: function () { btnRef.value && btnRef.value.focus(); },
    };

    var unregOpt = registerOption(option);
    onBeforeUnmount(unregOpt);

    return {
      btnRef: btnRef,
      isSelected: isSelected,
      selectMyValue: function () {
        selectByValue(props.value);
        hideDropdown();
      },
    }
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", {
    ref: "btnRef",
    class: ["vue-picker-option", { 'vue-picker-option_cur': $setup.isSelected }],
    type: "button",
    onClick: _cache[1] || (_cache[1] = function ($event) { return ($setup.selectMyValue($event)); }),
    onKeydown: _cache[2] || (_cache[2] = withKeys(withModifiers(function () {}, ["prevent","stop"]), ["space"])),
    disabled: $props.isDisabled,
    "data-value": $props.value
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["disabled", "data-value"]))
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
