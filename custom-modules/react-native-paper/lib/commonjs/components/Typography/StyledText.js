"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _color = _interopRequireDefault(require("color"));

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Text = _interopRequireDefault(require("./Text"));

var _theming = require("../../core/theming");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledText = _ref => {
  let {
    theme,
    alpha,
    family,
    style,
    ...rest
  } = _ref;
  const textColor = (0, _color.default)(theme.colors.text).alpha(alpha).rgb().string();
  const font = theme.fonts[family];
  const writingDirection = _reactNative.I18nManager.isRTL ? 'rtl' : 'ltr';
  return /*#__PURE__*/React.createElement(_Text.default, _extends({}, rest, {
    style: [styles.text, {
      color: textColor,
      ...font,
      writingDirection
    }, style]
  }));
};

const styles = _reactNative.StyleSheet.create({
  text: {
    textAlign: 'left'
  }
});

var _default = (0, _theming.withTheme)(StyledText);

exports.default = _default;
//# sourceMappingURL=StyledText.js.map