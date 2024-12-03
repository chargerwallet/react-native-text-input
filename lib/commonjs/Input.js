"use strict";

var _usePressability = _interopRequireDefault(require("react-native/Libraries/Pressability/usePressability"));
var _flattenStyle = _interopRequireDefault(require("react-native/Libraries/StyleSheet/flattenStyle"));
var _StyleSheet = _interopRequireDefault(require("react-native/Libraries/StyleSheet/StyleSheet"));
var _Text = _interopRequireDefault(require("react-native/Libraries/Text/Text"));
var _TextAncestor = _interopRequireDefault(require("react-native/Libraries/Text/TextAncestor"));
var _Platform = _interopRequireDefault(require("react-native/Libraries/Utilities/Platform"));
var _useMergeRefs = _interopRequireDefault(require("react-native/Libraries/Utilities/useMergeRefs"));
var _TextInputState = _interopRequireDefault(require("react-native/Libraries/Components/TextInput/TextInputState"));
var _invariant = _interopRequireDefault(require("invariant"));
var _nullthrows = _interopRequireDefault(require("nullthrows"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable prettier/prettier */

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

let AndroidTextInput;
let AndroidTextInputCommands;
let RCTSinglelineTextInputView;
let RCTSinglelineTextInputNativeCommands;
let RCTMultilineTextInputView;
let RCTMultilineTextInputNativeCommands;
if (_Platform.default.OS === 'android') {
  AndroidTextInput = require('./TextInputViewNativeComponent').default;
  AndroidTextInputCommands = require('react-native/Libraries/Components/TextInput/AndroidTextInputNativeComponent').Commands;
} else if (_Platform.default.OS === 'ios') {
  RCTSinglelineTextInputView = require('react-native/Libraries/Components/TextInput/RCTSingelineTextInputNativeComponent').default;
  RCTSinglelineTextInputNativeCommands = require('react-native/Libraries/Components/TextInput/RCTSingelineTextInputNativeComponent').Commands;
  RCTMultilineTextInputView = require('react-native/Libraries/Components/TextInput/RCTMultilineTextInputNativeComponent').default;
  RCTMultilineTextInputNativeCommands = require('react-native/Libraries/Components/TextInput/RCTMultilineTextInputNativeComponent').Commands;
}
const emptyFunctionThatReturnsTrue = () => true;

/**
 * A foundational component for inputting text into the app via a
 * keyboard. Props provide configurability for several features, such as
 * auto-correction, auto-capitalization, placeholder text, and different keyboard
 * types, such as a numeric keypad.
 *
 * The simplest use case is to plop down a `TextInput` and subscribe to the
 * `onChangeText` events to read the user input. There are also other events,
 * such as `onSubmitEditing` and `onFocus` that can be subscribed to. A simple
 * example:
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react';
 * import { AppRegistry, TextInput } from 'react-native';
 *
 * export default class UselessTextInput extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = { text: 'Useless Placeholder' };
 *   }
 *
 *   render() {
 *     return (
 *       <TextInput
 *         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
 *         onChangeText={(text) => this.setState({text})}
 *         value={this.state.text}
 *       />
 *     );
 *   }
 * }
 *
 * // skip this line if using Create React Native App
 * AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);
 * ```
 *
 * Two methods exposed via the native element are .focus() and .blur() that
 * will focus or blur the TextInput programmatically.
 *
 * Note that some props are only available with `multiline={true/false}`.
 * Additionally, border styles that apply to only one side of the element
 * (e.g., `borderBottomColor`, `borderLeftWidth`, etc.) will not be applied if
 * `multiline=false`. To achieve the same effect, you can wrap your `TextInput`
 * in a `View`:
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react';
 * import { AppRegistry, View, TextInput } from 'react-native';
 *
 * class UselessTextInput extends Component {
 *   render() {
 *     return (
 *       <TextInput
 *         {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
 *         editable={true}
 *         maxLength={40}
 *       />
 *     );
 *   }
 * }
 *
 * export default class UselessTextInputMultiline extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = {
 *       text: 'Useless Multiline Placeholder',
 *     };
 *   }
 *
 *   // If you type something in the text box that is a color, the background will change to that
 *   // color.
 *   render() {
 *     return (
 *      <View style={{
 *        backgroundColor: this.state.text,
 *        borderBottomColor: '#000000',
 *        borderBottomWidth: 1 }}
 *      >
 *        <UselessTextInput
 *          multiline={true}
 *          numberOfLines={4}
 *          onChangeText={(text) => this.setState({text})}
 *          value={this.state.text}
 *        />
 *      </View>
 *     );
 *   }
 * }
 *
 * // skip these lines if using Create React Native App
 * AppRegistry.registerComponent(
 *  'AwesomeProject',
 *  () => UselessTextInputMultiline
 * );
 * ```
 *
 * `TextInput` has by default a border at the bottom of its view. This border
 * has its padding set by the background image provided by the system, and it
 * cannot be changed. Solutions to avoid this is to either not set height
 * explicitly, case in which the system will take care of displaying the border
 * in the correct position, or to not display the border by setting
 * `underlineColorAndroid` to transparent.
 *
 * Note that on Android performing text selection in input can change
 * app's activity `windowSoftInputMode` param to `adjustResize`.
 * This may cause issues with components that have position: 'absolute'
 * while keyboard is active. To avoid this behavior either specify `windowSoftInputMode`
 * in AndroidManifest.xml ( https://developer.android.com/guide/topics/manifest/activity-element.html )
 * or control this param programmatically with native code.
 *
 */
function InternalTextInput(props) {
  const {
    'aria-busy': ariaBusy,
    'aria-checked': ariaChecked,
    'aria-disabled': ariaDisabled,
    'aria-expanded': ariaExpanded,
    'aria-selected': ariaSelected,
    accessibilityState,
    id,
    tabIndex,
    selection: propsSelection,
    selectionColor,
    selectionHandleColor,
    cursorColor,
    ...otherProps
  } = props;
  const inputRef = (0, _react.useRef)(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selection = propsSelection == null ? null : {
    start: propsSelection.start,
    end: propsSelection.end ?? propsSelection.start
  };
  const [mostRecentEventCount, setMostRecentEventCount] = (0, _react.useState)(0);
  const [lastNativeText, setLastNativeText] = (0, _react.useState)(props.value);
  const [lastNativeSelectionState, setLastNativeSelection] = (0, _react.useState)({
    selection: {
      start: -1,
      end: -1
    },
    mostRecentEventCount: mostRecentEventCount
  });
  const lastNativeSelection = lastNativeSelectionState.selection;
  let viewCommands;
  if (AndroidTextInputCommands) {
    viewCommands = AndroidTextInputCommands;
  } else {
    viewCommands = props.multiline === true ? RCTMultilineTextInputNativeCommands : RCTSinglelineTextInputNativeCommands;
  }
  const text = typeof props.value === 'string' ? props.value : typeof props.defaultValue === 'string' ? props.defaultValue : '';

  // This is necessary in case native updates the text and JS decides
  // that the update should be ignored and we should stick with the value
  // that we have in JS.
  (0, _react.useLayoutEffect)(() => {
    const nativeUpdate = {};
    if (lastNativeText !== props.value && typeof props.value === 'string') {
      nativeUpdate.text = props.value;
      setLastNativeText(props.value);
    }
    if (selection && lastNativeSelection && (lastNativeSelection.start !== selection.start || lastNativeSelection.end !== selection.end)) {
      nativeUpdate.selection = selection;
      setLastNativeSelection({
        selection,
        mostRecentEventCount
      });
    }
    if (Object.keys(nativeUpdate).length === 0) {
      return;
    }
    if (inputRef.current != null) {
      viewCommands.setTextAndSelection(inputRef.current, mostRecentEventCount, text, selection?.start ?? -1, selection?.end ?? -1);
    }
  }, [mostRecentEventCount, inputRef, props.value, props.defaultValue, lastNativeText, selection, lastNativeSelection, text, viewCommands]);
  (0, _react.useLayoutEffect)(() => {
    const inputRefValue = inputRef.current;
    if (inputRefValue != null) {
      _TextInputState.default.registerInput(inputRefValue);
      return () => {
        _TextInputState.default.unregisterInput(inputRefValue);
        if (_TextInputState.default.currentlyFocusedInput() === inputRefValue) {
          (0, _nullthrows.default)(inputRefValue).blur();
        }
      };
    }
  }, [inputRef]);
  const setLocalRef = (0, _react.useCallback)(instance => {
    inputRef.current = instance;

    /*
    Hi reader from the future. I'm sorry for this.
     This is a hack. Ideally we would forwardRef to the underlying
    host component. However, since TextInput has it's own methods that can be
    called as well, if we used the standard forwardRef then these
    methods wouldn't be accessible and thus be a breaking change.
     We have a couple of options of how to handle this:
    - Return a new ref with everything we methods from both. This is problematic
      because we need React to also know it is a host component which requires
      internals of the class implementation of the ref.
    - Break the API and have some other way to call one set of the methods or
      the other. This is our long term approach as we want to eventually
      get the methods on host components off the ref. So instead of calling
      ref.measure() you might call ReactNative.measure(ref). This would hopefully
      let the ref for TextInput then have the methods like `.clear`. Or we do it
      the other way and make it TextInput.clear(textInputRef) which would be fine
      too. Either way though is a breaking change that is longer term.
    - Mutate this ref. :( Gross, but accomplishes what we need in the meantime
      before we can get to the long term breaking change.
    */
    if (instance != null) {
      // $FlowFixMe[incompatible-use] - See the explanation above.
      Object.assign(instance, {
        clear() {
          if (inputRef.current != null) {
            viewCommands.setTextAndSelection(inputRef.current, mostRecentEventCount, '', 0, 0);
          }
        },
        // TODO: Fix this returning true on null === null, when no input is focused
        isFocused() {
          return _TextInputState.default.currentlyFocusedInput() === inputRef.current;
        },
        getNativeRef() {
          return inputRef.current;
        },
        setSelection(start, end) {
          if (inputRef.current != null) {
            viewCommands.setTextAndSelection(inputRef.current, mostRecentEventCount, null, start, end);
          }
        }
      });
    }
  }, [mostRecentEventCount, viewCommands]);
  const ref = (0, _useMergeRefs.default)(setLocalRef, props.forwardedRef);
  const _onChange = event => {
    const currentText = event.nativeEvent.text;
    props.onChange && props.onChange(event);
    props.onChangeText && props.onChangeText(currentText);
    if (inputRef.current == null) {
      // calling `props.onChange` or `props.onChangeText`
      // may clean up the input itself. Exits here.
      return;
    }
    setLastNativeText(currentText);
    // This must happen last, after we call setLastNativeText.
    // Different ordering can cause bugs when editing AndroidTextInputs
    // with multiple Fragments.
    // We must update this so that controlled input updates work.
    setMostRecentEventCount(event.nativeEvent.eventCount);
  };
  const _onSelectionChange = event => {
    props.onSelectionChange && props.onSelectionChange(event);
    if (inputRef.current == null) {
      // calling `props.onSelectionChange`
      // may clean up the input itself. Exits here.
      return;
    }
    setLastNativeSelection({
      selection: event.nativeEvent.selection,
      mostRecentEventCount
    });
  };
  const _onFocus = event => {
    _TextInputState.default.focusInput(inputRef.current);
    if (props.onFocus) {
      props.onFocus(event);
    }
  };
  const _onBlur = event => {
    _TextInputState.default.blurInput(inputRef.current);
    if (props.onBlur) {
      props.onBlur(event);
    }
  };
  const _onScroll = event => {
    props.onScroll && props.onScroll(event);
  };
  let textInput = null;
  const multiline = props.multiline ?? false;
  let submitBehavior;
  if (props.submitBehavior != null) {
    // `submitBehavior` is set explicitly
    if (!multiline && props.submitBehavior === 'newline') {
      // For single line text inputs, `'newline'` is not a valid option
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = props.submitBehavior;
    }
  } else if (multiline) {
    if (props.blurOnSubmit === true) {
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = 'newline';
    }
  } else {
    // Single line
    if (props.blurOnSubmit !== false) {
      submitBehavior = 'blurAndSubmit';
    } else {
      submitBehavior = 'submit';
    }
  }
  const accessible = props.accessible !== false;
  const focusable = props.focusable !== false;
  const {
    editable,
    hitSlop,
    onPress,
    onPressIn,
    onPressOut,
    rejectResponderTermination
  } = props;
  const config = React.useMemo(() => ({
    hitSlop,
    onPress: event => {
      onPress?.(event);
      if (editable !== false) {
        if (inputRef.current != null) {
          inputRef.current.focus();
        }
      }
    },
    onPressIn: onPressIn,
    onPressOut: onPressOut,
    cancelable: _Platform.default.OS === 'ios' ? !rejectResponderTermination : null
  }), [editable, hitSlop, onPress, onPressIn, onPressOut, rejectResponderTermination]);

  // Hide caret during test runs due to a flashing caret
  // makes screenshot tests flakey
  let caretHidden = props.caretHidden;
  if (_Platform.default.isTesting) {
    caretHidden = true;
  }

  // TextInput handles onBlur and onFocus events
  // so omitting onBlur and onFocus pressability handlers here.
  const {
    onBlur,
    onFocus,
    ...eventHandlers
  } = (0, _usePressability.default)(config) || {};
  let _accessibilityState;
  if (accessibilityState != null || ariaBusy != null || ariaChecked != null || ariaDisabled != null || ariaExpanded != null || ariaSelected != null) {
    _accessibilityState = {
      busy: ariaBusy ?? accessibilityState?.busy,
      checked: ariaChecked ?? accessibilityState?.checked,
      disabled: ariaDisabled ?? accessibilityState?.disabled,
      expanded: ariaExpanded ?? accessibilityState?.expanded,
      selected: ariaSelected ?? accessibilityState?.selected
    };
  }
  const style = (0, _flattenStyle.default)(props.style);
  if (typeof style?.fontWeight === 'number') {
    // $FlowFixMe[prop-missing]
    // $FlowFixMe[cannot-write]
    style.fontWeight = style?.fontWeight.toString();
  }
  if (_Platform.default.OS === 'ios') {
    const RCTTextInputView = props.multiline === true ? RCTMultilineTextInputView : RCTSinglelineTextInputView;
    const useMultilineDefaultStyle = props.multiline === true && (style == null || style.padding == null && style.paddingVertical == null && style.paddingTop == null);
    textInput = /*#__PURE__*/(0, _jsxRuntime.jsx)(RCTTextInputView
    // $FlowFixMe[incompatible-type] - Figure out imperative + forward refs.
    , {
      ref: ref,
      ...otherProps,
      ...eventHandlers,
      accessibilityState: _accessibilityState,
      accessible: accessible,
      submitBehavior: submitBehavior,
      caretHidden: caretHidden,
      dataDetectorTypes: props.dataDetectorTypes,
      focusable: tabIndex !== undefined ? !tabIndex : focusable,
      mostRecentEventCount: mostRecentEventCount,
      nativeID: id ?? props.nativeID,
      onBlur: _onBlur,
      onChange: _onChange,
      onContentSizeChange: props.onContentSizeChange,
      onFocus: _onFocus,
      onScroll: _onScroll,
      onSelectionChange: _onSelectionChange,
      onSelectionChangeShouldSetResponder: emptyFunctionThatReturnsTrue,
      selection: selection,
      selectionColor: selectionColor,
      style: _StyleSheet.default.compose(useMultilineDefaultStyle ? styles.multilineDefault : null, style),
      text: text
    });
  } else if (_Platform.default.OS === 'android') {
    const autoCapitalize = props.autoCapitalize || 'sentences';
    const _accessibilityLabelledBy = props?.['aria-labelledby'] ?? props?.accessibilityLabelledBy;
    const placeholder = props.placeholder ?? '';
    let children = props.children;
    const childCount = React.Children.count(children);
    (0, _invariant.default)(!(props.value != null && childCount), 'Cannot specify both value and children.');
    if (childCount > 1) {
      children = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Text.default, {
        children: children
      });
    }
    // For consistency with iOS set cursor/selectionHandle color as selectionColor
    const colorProps = {
      selectionColor,
      selectionHandleColor: selectionHandleColor === undefined ? selectionColor : selectionHandleColor,
      cursorColor: cursorColor === undefined ? selectionColor : cursorColor
    };
    textInput =
    /*#__PURE__*/
    /* $FlowFixMe[prop-missing] the types for AndroidTextInput don't match up
     * exactly with the props for TextInput. This will need to get fixed */
    /* $FlowFixMe[incompatible-type] the types for AndroidTextInput don't
     * match up exactly with the props for TextInput. This will need to get
     * fixed */
    /* $FlowFixMe[incompatible-type-arg] the types for AndroidTextInput don't
     * match up exactly with the props for TextInput. This will need to get
     * fixed */
    (0, _jsxRuntime.jsx)(AndroidTextInput
    // $FlowFixMe[incompatible-type] - Figure out imperative + forward refs.
    , {
      ref: ref,
      ...otherProps,
      ...colorProps,
      ...eventHandlers,
      accessibilityState: _accessibilityState,
      accessibilityLabelledBy: _accessibilityLabelledBy,
      accessible: accessible,
      autoCapitalize: autoCapitalize,
      submitBehavior: submitBehavior,
      caretHidden: caretHidden,
      children: children,
      disableFullscreenUI: props.disableFullscreenUI,
      focusable: tabIndex !== undefined ? !tabIndex : focusable,
      mostRecentEventCount: mostRecentEventCount,
      nativeID: id ?? props.nativeID,
      numberOfLines: props.rows ?? props.numberOfLines,
      onBlur: _onBlur,
      onChange: _onChange,
      onFocus: _onFocus
      /* $FlowFixMe[prop-missing] the types for AndroidTextInput don't match
       * up exactly with the props for TextInput. This will need to get fixed
       */
      /* $FlowFixMe[incompatible-type-arg] the types for AndroidTextInput
       * don't match up exactly with the props for TextInput. This will need
       * to get fixed */,
      onScroll: _onScroll,
      onSelectionChange: _onSelectionChange,
      placeholder: placeholder,
      style: style,
      text: text,
      textBreakStrategy: props.textBreakStrategy
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TextAncestor.default.Provider, {
    value: true,
    children: textInput
  });
}
const enterKeyHintToReturnTypeMap = {
  enter: 'default',
  done: 'done',
  go: 'go',
  next: 'next',
  previous: 'previous',
  search: 'search',
  send: 'send'
};
const inputModeToKeyboardTypeMap = {
  none: 'default',
  text: 'default',
  decimal: 'decimal-pad',
  numeric: 'number-pad',
  tel: 'phone-pad',
  search: _Platform.default.OS === 'ios' ? 'web-search' : 'default',
  email: 'email-address',
  url: 'url'
};

// Map HTML autocomplete values to Android autoComplete values
const autoCompleteWebToAutoCompleteAndroidMap = {
  'address-line1': 'postal-address-region',
  'address-line2': 'postal-address-locality',
  bday: 'birthdate-full',
  'bday-day': 'birthdate-day',
  'bday-month': 'birthdate-month',
  'bday-year': 'birthdate-year',
  'cc-csc': 'cc-csc',
  'cc-exp': 'cc-exp',
  'cc-exp-month': 'cc-exp-month',
  'cc-exp-year': 'cc-exp-year',
  'cc-number': 'cc-number',
  country: 'postal-address-country',
  'current-password': 'password',
  email: 'email',
  'honorific-prefix': 'name-prefix',
  'honorific-suffix': 'name-suffix',
  name: 'name',
  'additional-name': 'name-middle',
  'family-name': 'name-family',
  'given-name': 'name-given',
  'new-password': 'password-new',
  off: 'off',
  'one-time-code': 'sms-otp',
  'postal-code': 'postal-code',
  sex: 'gender',
  'street-address': 'street-address',
  tel: 'tel',
  'tel-country-code': 'tel-country-code',
  'tel-national': 'tel-national',
  username: 'username'
};

// Map HTML autocomplete values to iOS textContentType values
const autoCompleteWebToTextContentTypeMap = {
  'address-line1': 'streetAddressLine1',
  'address-line2': 'streetAddressLine2',
  bday: 'birthdate',
  'bday-day': 'birthdateDay',
  'bday-month': 'birthdateMonth',
  'bday-year': 'birthdateYear',
  'cc-csc': 'creditCardSecurityCode',
  'cc-exp-month': 'creditCardExpirationMonth',
  'cc-exp-year': 'creditCardExpirationYear',
  'cc-exp': 'creditCardExpiration',
  'cc-given-name': 'creditCardGivenName',
  'cc-additional-name': 'creditCardMiddleName',
  'cc-family-name': 'creditCardFamilyName',
  'cc-name': 'creditCardName',
  'cc-number': 'creditCardNumber',
  'cc-type': 'creditCardType',
  'current-password': 'password',
  country: 'countryName',
  email: 'emailAddress',
  name: 'name',
  'additional-name': 'middleName',
  'family-name': 'familyName',
  'given-name': 'givenName',
  nickname: 'nickname',
  'honorific-prefix': 'namePrefix',
  'honorific-suffix': 'nameSuffix',
  'new-password': 'newPassword',
  off: 'none',
  'one-time-code': 'oneTimeCode',
  organization: 'organizationName',
  'organization-title': 'jobTitle',
  'postal-code': 'postalCode',
  'street-address': 'fullStreetAddress',
  tel: 'telephoneNumber',
  url: 'URL',
  username: 'username'
};
const ExportedForwardRef = /*#__PURE__*/React.forwardRef(function TextInput({
  allowFontScaling = true,
  rejectResponderTermination = true,
  underlineColorAndroid = 'transparent',
  autoComplete,
  textContentType,
  readOnly,
  editable,
  enterKeyHint,
  returnKeyType,
  inputMode,
  showSoftInputOnFocus,
  keyboardType,
  ...restProps
}, forwardedRef) {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  let style = (0, _flattenStyle.default)(restProps.style);
  if (style?.verticalAlign != null) {
    // $FlowFixMe[prop-missing]
    // $FlowFixMe[cannot-write]
    style.textAlignVertical =
    // $FlowFixMe[invalid-computed-prop]
    verticalAlignToTextAlignVerticalMap[style.verticalAlign];
    // $FlowFixMe[prop-missing]
    // $FlowFixMe[cannot-write]
    delete style.verticalAlign;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(InternalTextInput, {
    allowFontScaling: allowFontScaling,
    rejectResponderTermination: rejectResponderTermination,
    underlineColorAndroid: underlineColorAndroid,
    editable: readOnly !== undefined ? !readOnly : editable,
    returnKeyType: enterKeyHint ? enterKeyHintToReturnTypeMap[enterKeyHint] : returnKeyType,
    keyboardType: inputMode ? inputModeToKeyboardTypeMap[inputMode] : keyboardType,
    showSoftInputOnFocus: inputMode == null ? showSoftInputOnFocus : inputMode !== 'none',
    autoComplete: _Platform.default.OS === 'android' ?
    // $FlowFixMe[invalid-computed-prop]
    // $FlowFixMe[prop-missing]
    autoCompleteWebToAutoCompleteAndroidMap[autoComplete] ?? autoComplete : undefined,
    textContentType: textContentType != null ? textContentType : _Platform.default.OS === 'ios' && autoComplete && autoComplete in autoCompleteWebToTextContentTypeMap ?
    // $FlowFixMe[invalid-computed-prop]
    // $FlowFixMe[prop-missing]
    autoCompleteWebToTextContentTypeMap[autoComplete] : textContentType,
    ...restProps,
    forwardedRef: forwardedRef,
    style: style
  });
});
ExportedForwardRef.displayName = 'TextInput';

// $FlowFixMe[prop-missing]
ExportedForwardRef.State = {
  currentlyFocusedInput: _TextInputState.default.currentlyFocusedInput,
  currentlyFocusedField: _TextInputState.default.currentlyFocusedField,
  focusTextInput: _TextInputState.default.focusTextInput,
  blurTextInput: _TextInputState.default.blurTextInput
};
const styles = _StyleSheet.default.create({
  multilineDefault: {
    // This default top inset makes RCTMultilineTextInputView seem as close as possible
    // to single-line RCTSinglelineTextInputView defaults, using the system defaults
    // of font size 17 and a height of 31 points.
    paddingTop: 5
  }
});
const verticalAlignToTextAlignVerticalMap = {
  auto: 'auto',
  top: 'top',
  bottom: 'bottom',
  middle: 'center'
};

// $FlowFixMe[unclear-type] Unclear type. Using `any` type is not safe.
module.exports = ExportedForwardRef;
//# sourceMappingURL=Input.js.map