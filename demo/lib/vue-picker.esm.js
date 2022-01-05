import { inject, ref, provide, onUnmounted, onMounted, onUpdated, nextTick, onBeforeUnmount, toRefs, watch, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, withDirectives, vShow, withKeys, withModifiers } from 'vue';

function useDropdown () {
  var isShown = ref(false);

  var _unlistenOuterClick = function () { };
  var _onShowSubs = [];
  var _onHideSubs = [];

  var _clickOutTarget;
  var useClickOutTarget = function (el) {
    _clickOutTarget = el;
  };

  var toggle = function () {
    isShown.value ? hide() : show();
  };

  var show = function () {
    isShown.value = true;
    _unlistenOuterClick = _onClickOut(_clickOutTarget, function () { return hide(true); });
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
    return function () {
      _onShowSubs = _onShowSubs.filter(function (el) { return el !== cb; });
    }
  };

  var onHide = function (cb) {
    _onHideSubs.push(cb);
    return function () {
      _onHideSubs = _onHideSubs.filter(function (el) { return el !== cb; });
    }
  };

  provide('dropdownHide', function () { return hide(); });

  onUnmounted(function () {
    _unlistenOuterClick();
    _onShowSubs = [];
    _onHideSubs = [];
  });

  return {
    isShown: isShown,
    toggle: toggle,
    show: show,
    hide: hide,
    onShow: onShow,
    onHide: onHide,
    useClickOutTarget: useClickOutTarget,
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

function useOptions (optsContRef) {
  var current = ref(null);
  var _options = {};

  var _nodes = [];
  var _nodesUpdateRequired = false;
  var _currentIdx = -1;

  var _onSelectSubs = [];
  function onSelect (cb) {
    _onSelectSubs.push(cb);
    return function () {
      _onSelectSubs = _onSelectSubs.filter(function (el) { return el !== cb; });
    }
  }

  var selectByValue = function (value) {
    if ( value === void 0 ) value = '';

    var opt = _options[value];
    if (opt === current.value) { return }

    if (current.value) { current.value.setIsSelected(false); }

    if (!opt) {
      selectNone();
      return
    }

    opt.setIsSelected(true);
    current.value = opt;
    _currentIdx = _getNodeIdx(opt.value);
    _onSelectSubs.forEach(function (cb) { return cb(opt.value); });
  };

  var selectNone = function () {
    current.value = null;
    _currentIdx = -1;
    _onSelectSubs.forEach(function (cb) { return cb(null); });
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
  onBeforeUnmount(function () { _onSelectSubs = []; });

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
    onSelect: onSelect,
    selectByValue: selectByValue,
    selectNone: selectNone,
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

function useKeyboard (dropdown, options, customOnKeyDown) {
  var listener = function (event) {
    if (customOnKeyDown && !customOnKeyDown(event, dropdown, options)) { return }
    _onKeyDown(event, dropdown, options);
  };

  var listenOn = function (htmlEl) {
    htmlEl.addEventListener('keydown', listener);
  };

  var unlistenOn = function (htmlEl) {
    htmlEl.removeEventListener('keydown', listener);
  };

  return { listenOn: listenOn, unlistenOn: unlistenOn }
}

function _onKeyDown (event, dropdown, options) {
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
    onKeyDown: { type: Function, default: undefined },
  },

  setup: function setup (props, ref$1) {
    var emit = ref$1.emit;

    var ref$2 = toRefs(props);
    var modelValue = ref$2.modelValue;
    var placeholder = ref$2.placeholder;
    var isAutofocus = ref$2.isAutofocus;
    var rootRef = ref();
    var openerRef = ref();
    var dropdownRef = ref();

    var dropdown = useDropdown();
    var options = useOptions(dropdownRef);
    var keyboard = useKeyboard(dropdown, options, props.onKeyDown);

    options.onSelect(function (value) {
      if (dropdown.isShown.value) { return }
      _emitModelValue(value !== undefined ? value : modelValue.value);
    });

    watch(modelValue, function (nV, oV) { nV !== oV && options.selectByValue(nV); });

    onMounted(function () {
      keyboard.listenOn(openerRef.value);

      dropdown.useClickOutTarget(rootRef.value);
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
        nextTick(function () { return openerRef.value && openerRef.value.focus(); });
        _emitModelValue();
        emit('close', isOuterClick);
      });

      if (isAutofocus.value) { openerRef.value && openerRef.value.focus(); }
      if (modelValue.value) { options.selectByValue(modelValue.value); }
    });

    onBeforeUnmount(function () {
      keyboard.unlistenOn(openerRef.value);
      keyboard.unlistenOn(document);
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
      rootRef: rootRef,
      openerRef: openerRef,
      dropdownRef: dropdownRef,
      dropdownIsShown: dropdown.isShown,
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

var _hoisted_1$1 = ["disabled"];
var _hoisted_2 = ["innerHTML"];
var _hoisted_3 = /*#__PURE__*/createElementVNode("i", { class: "vue-picker__opener-ico" }, null, -1 /* HOISTED */);
var _hoisted_4 = {
  ref: "dropdownRef",
  class: "vue-picker__dropdown"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    ref: "rootRef",
    class: normalizeClass(["vue-picker", {
      'vue-picker_open': $setup.dropdownIsShown,
      'vue-picker_disabled': $props.isDisabled,
      'vue-picker_has-val': $props.placeholder ? $props.modelValue : $setup.curOptVal,
    }])
  }, [
    createElementVNode("button", {
      ref: "openerRef",
      class: "vue-picker__opener",
      type: "button",
      onClick: _cache[0] || (_cache[0] = function ($event) { return ($setup.dropdownToggle()); }),
      disabled: $props.isDisabled
    }, [
      renderSlot(_ctx.$slots, "opener", {
        opener: {
          value: $setup.curOpt && $setup.curOpt.value,
          text: $setup.openerTxt,
          opt: $setup.curOpt,
        }
      }, function () { return [
        createElementVNode("span", {
          class: "vue-picker__opener-txt",
          innerHTML: $setup.openerHtml
        }, null, 8 /* PROPS */, _hoisted_2)
      ]; }),
      renderSlot(_ctx.$slots, "openerIco", {}, function () { return [
        _hoisted_3
      ]; })
    ], 8 /* PROPS */, _hoisted_1$1),
    withDirectives(createElementVNode("div", _hoisted_4, [
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
        return props.text || btnHtml || props.value
      }),
      optTxt: computed(function () {
        var btnText = btnRef.value && btnRef.value.innerText;
        return props.text || btnText || props.value
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

var _hoisted_1 = ["disabled", "data-value"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("button", {
    ref: "btnRef",
    class: normalizeClass(["vue-picker-option", { 'vue-picker-option_cur': $setup.isSelected }]),
    type: "button",
    onClick: _cache[0] || (_cache[0] = function ($event) { return ($setup.selectMyValue($event)); }),
    onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers(function () {}, ["prevent","stop"]), ["space"])),
    disabled: $props.isDisabled,
    "data-value": $props.value
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_1))
}

script.render = render;
script.__file = "src/components/VuePickerOption.vue";

function install (vm) {
  if (install.installed) { return }
  install.installed = true;
  vm.component('VuePicker', script$1);
  vm.component('VuePickerOption', script);
}

if (typeof window !== 'undefined') {
  window.VuePicker = install;
} else if (typeof global !== 'undefined') {
  global.VuePicker = install;
}

export { script$1 as VuePicker, script as VuePickerOption, install };
