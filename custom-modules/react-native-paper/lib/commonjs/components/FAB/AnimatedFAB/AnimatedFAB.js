"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _color = _interopRequireDefault(require("color"));

var _reactNative = require("react-native");

var _Surface = _interopRequireDefault(require("../../Surface"));

var _Icon = _interopRequireDefault(require("../../Icon"));

var _TouchableRipple = _interopRequireDefault(require("../../TouchableRipple/TouchableRipple"));

var _theming = require("../../../core/theming");

var _colors = require("../../../styles/colors");

var _AnimatedText = _interopRequireDefault(require("../../Typography/AnimatedText"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SIZE = 56;
const BORDER_RADIUS = SIZE / 2;
const SCALE = 0.9;

const AnimatedFAB = _ref => {
  let {
    icon,
    label,
    accessibilityLabel = label,
    accessibilityState,
    color: customColor,
    disabled,
    onPress,
    onLongPress,
    theme,
    style,
    visible = true,
    uppercase = true,
    testID,
    animateFrom = 'right',
    extended = false,
    iconMode = 'dynamic',
    ...rest
  } = _ref;
  const isIOS = _reactNative.Platform.OS === 'ios';
  const isAnimatedFromRight = animateFrom === 'right';
  const isIconStatic = iconMode === 'static';
  const {
    isRTL
  } = _reactNative.I18nManager;
  const {
    current: visibility
  } = React.useRef(new _reactNative.Animated.Value(visible ? 1 : 0));
  const {
    current: animFAB
  } = React.useRef(new _reactNative.Animated.Value(0));
  const {
    scale
  } = theme.animation;
  const [textWidth, setTextWidth] = React.useState(0);
  const [textHeight, setTextHeight] = React.useState(0);
  React.useEffect(() => {
    if (visible) {
      _reactNative.Animated.timing(visibility, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true
      }).start();
    } else {
      _reactNative.Animated.timing(visibility, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true
      }).start();
    }
  }, [visible, scale, visibility]);
  const disabledColor = (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.12).rgb().string();
  const {
    backgroundColor = disabled ? disabledColor : theme.colors.accent
  } = _reactNative.StyleSheet.flatten(style) || {};
  let foregroundColor;

  if (typeof customColor !== 'undefined') {
    foregroundColor = customColor;
  } else if (disabled) {
    foregroundColor = (0, _color.default)(theme.dark ? _colors.white : _colors.black).alpha(0.32).rgb().string();
  } else {
    foregroundColor = !(0, _color.default)(backgroundColor).isLight() ? _colors.white : 'rgba(0, 0, 0, .54)';
  }

  const rippleColor = (0, _color.default)(foregroundColor).alpha(0.32).rgb().string();
  const extendedWidth = textWidth + 1.5 * SIZE;
  const distance = isAnimatedFromRight ? -textWidth - BORDER_RADIUS : textWidth + BORDER_RADIUS;
  React.useEffect(() => {
    _reactNative.Animated.timing(animFAB, {
      toValue: !extended ? 0 : distance,
      duration: 150 * scale,
      useNativeDriver: true,
      easing: _reactNative.Easing.linear
    }).start();
  }, [animFAB, scale, distance, extended]);

  const onTextLayout = _ref2 => {
    let {
      nativeEvent
    } = _ref2;
    const currentWidth = Math.ceil(nativeEvent.lines[0].width);
    const currentHeight = Math.ceil(nativeEvent.lines[0].height);

    if (currentWidth !== textWidth || currentHeight !== textHeight) {
      setTextHeight(currentHeight);

      if (isIOS) {
        return setTextWidth(currentWidth - 12);
      }

      setTextWidth(currentWidth);
    }
  };

  const propForDirection = right => {
    if (isAnimatedFromRight) {
      return right;
    }

    return right.reverse();
  };

  const combinedStyles = (0, _utils.getCombinedStyles)({
    isAnimatedFromRight,
    isIconStatic,
    distance,
    animFAB
  });
  return /*#__PURE__*/React.createElement(_Surface.default, _extends({}, rest, {
    style: [{
      opacity: visibility,
      transform: [{
        scale: visibility
      }],
      elevation: isIOS ? 6 : 0
    }, styles.container, disabled && styles.disabled, style]
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [{
      transform: [{
        scaleY: animFAB.interpolate({
          inputRange: propForDirection([distance, 0]),
          outputRange: propForDirection([SCALE, 1])
        })
      }]
    }, styles.standard]
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.shadowWrapper]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, styles.shadow, {
      width: extendedWidth,
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.9 * distance, 0]),
        outputRange: propForDirection([1, 0.15, 0])
      })
    }]
  }), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, styles.shadow, {
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.9 * distance, 0]),
        outputRange: propForDirection([0, 0.85, 1])
      }),
      width: SIZE,
      borderRadius: animFAB.interpolate({
        inputRange: propForDirection([distance, 0]),
        outputRange: propForDirection([SIZE / (extendedWidth / SIZE), BORDER_RADIUS])
      })
    }, combinedStyles.absoluteFill]
  })), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: "box-none",
    style: [styles.innerWrapper]
  }, /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.standard, {
      width: extendedWidth,
      backgroundColor
    }, combinedStyles.innerWrapper]
  }, /*#__PURE__*/React.createElement(_TouchableRipple.default, {
    borderless: true,
    onPress: onPress,
    onLongPress: onLongPress,
    rippleColor: rippleColor,
    disabled: disabled,
    accessibilityLabel: accessibilityLabel // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
    ,
    accessibilityTraits: disabled ? ['button', 'disabled'] : 'button',
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: { ...accessibilityState,
      disabled
    },
    testID: testID,
    style: styles.touchable
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.standard, {
      width: extendedWidth
    }]
  }))))), /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.iconWrapper, combinedStyles.iconWrapper],
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_Icon.default, {
    source: icon,
    size: 24,
    color: foregroundColor
  })), /*#__PURE__*/React.createElement(_reactNative.View, {
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(_AnimatedText.default, {
    numberOfLines: 1,
    onTextLayout: isIOS ? onTextLayout : undefined,
    ellipsizeMode: 'tail',
    style: [{
      [isAnimatedFromRight || isRTL ? 'right' : 'left']: isIconStatic ? isIOS ? SIZE - 10 : SIZE - 12 : BORDER_RADIUS
    }, {
      minWidth: textWidth,
      top: -BORDER_RADIUS - textHeight / 2,
      opacity: animFAB.interpolate({
        inputRange: propForDirection([distance, 0.7 * distance, 0]),
        outputRange: propForDirection([1, 0, 0])
      }),
      transform: [{
        translateX: animFAB.interpolate({
          inputRange: propForDirection([distance, 0]),
          outputRange: propForDirection([0, SIZE])
        })
      }]
    }, styles.label, uppercase && styles.uppercaseLabel, {
      color: foregroundColor,
      ...theme.fonts.medium
    }]
  }, label)), !isIOS &&
  /*#__PURE__*/
  // Method `onTextLayout` on Android returns sizes of text visible on the screen,
  // however during render the text in `FAB` isn't fully visible. In order to get
  // proper text measurements there is a need to additionaly render that text, but
  // wrapped in absolutely positioned `ScrollView` which height is 0.
  React.createElement(_reactNative.ScrollView, {
    style: styles.textPlaceholderContainer
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    onTextLayout: onTextLayout
  }, label)));
};

const styles = _reactNative.StyleSheet.create({
  standard: {
    height: SIZE,
    borderRadius: BORDER_RADIUS
  },
  disabled: {
    elevation: 0
  },
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS
  },
  innerWrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS
  },
  shadowWrapper: {
    elevation: 0
  },
  shadow: {
    elevation: 6,
    borderRadius: BORDER_RADIUS
  },
  touchable: {
    borderRadius: BORDER_RADIUS
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: SIZE,
    width: SIZE
  },
  label: {
    position: 'absolute'
  },
  uppercaseLabel: {
    textTransform: 'uppercase'
  },
  textPlaceholderContainer: {
    height: 0,
    position: 'absolute'
  }
});

var _default = (0, _theming.withTheme)(AnimatedFAB);

exports.default = _default;
//# sourceMappingURL=AnimatedFAB.js.map