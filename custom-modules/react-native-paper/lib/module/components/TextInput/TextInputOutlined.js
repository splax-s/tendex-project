import * as React from 'react';
import { View, TextInput as NativeTextInput, StyleSheet, I18nManager, Platform } from 'react-native';
import color from 'color';
import TextInputAdornment, { getAdornmentConfig, getAdornmentStyleAdjustmentForNativeInput } from './Adornment/TextInputAdornment';
import InputLabel from './Label/InputLabel';
import LabelBackground from './Label/LabelBackground';
import { MAXIMIZED_LABEL_FONT_SIZE, MINIMIZED_LABEL_FONT_SIZE, LABEL_WIGGLE_X_OFFSET, ADORNMENT_SIZE, ADORNMENT_OFFSET } from './constants';
import { calculateLabelTopPosition, calculateInputHeight, calculatePadding, adjustPaddingOut, interpolatePlaceholder, calculateOutlinedIconAndAffixTopPosition } from './helpers';
import { AdornmentType, AdornmentSide } from './Adornment/enums';
const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -6;
const LABEL_PADDING_TOP = 8;
const MIN_HEIGHT = 64;
const MIN_DENSE_HEIGHT = 48;
const INPUT_PADDING_HORIZONTAL = 14;

const TextInputOutlined = _ref => {
  let {
    disabled = false,
    editable = true,
    label,
    error = false,
    selectionColor,
    underlineColor: _underlineColor,
    outlineColor: customOutlineColor,
    activeOutlineColor,
    dense,
    style,
    theme,
    render = props => /*#__PURE__*/React.createElement(NativeTextInput, props),
    multiline = false,
    parentState,
    innerRef,
    onFocus,
    forceFocus,
    onBlur,
    onChangeText,
    onLayoutAnimatedText,
    onLeftAffixLayoutChange,
    onRightAffixLayoutChange,
    left,
    right,
    placeholderTextColor,
    ...rest
  } = _ref;
  const adornmentConfig = getAdornmentConfig({
    left,
    right
  });
  const {
    colors,
    fonts
  } = theme;
  const font = fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const {
    fontSize: fontSizeStyle,
    fontWeight,
    fontVariant,
    lineHeight,
    height,
    backgroundColor = colors.background,
    textAlign,
    ...viewStyle
  } = StyleSheet.flatten(style) || {};
  const fontSize = fontSizeStyle || MAXIMIZED_LABEL_FONT_SIZE;
  let inputTextColor, activeColor, outlineColor, placeholderColor, errorColor;

  if (disabled) {
    const isTransparent = color(customOutlineColor).alpha() === 0;
    inputTextColor = activeColor = color(colors.text).alpha(0.54).rgb().string();
    placeholderColor = colors.disabled;
    outlineColor = isTransparent ? customOutlineColor : colors.disabled;
  } else {
    inputTextColor = colors.text;
    activeColor = error ? colors.error : activeOutlineColor || colors.primary;
    placeholderColor = colors.placeholder;
    outlineColor = customOutlineColor || colors.placeholder;
    errorColor = colors.error;
  }

  const labelScale = MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = MAXIMIZED_LABEL_FONT_SIZE / fontSize;
  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;
  const baseLabelTranslateX = (I18nManager.isRTL ? 1 : -1) * (labelHalfWidth - labelScale * labelWidth / 2 - (fontSize - MINIMIZED_LABEL_FONT_SIZE) * labelScale);
  let labelTranslationXOffset = 0;
  const isAdornmentLeftIcon = adornmentConfig.some(_ref2 => {
    let {
      side,
      type
    } = _ref2;
    return side === AdornmentSide.Left && type === AdornmentType.Icon;
  });

  if (isAdornmentLeftIcon) {
    labelTranslationXOffset = (I18nManager.isRTL ? -1 : 1) * (ADORNMENT_SIZE + ADORNMENT_OFFSET - 8);
  }

  const minInputHeight = (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT) - LABEL_PADDING_TOP;
  const inputHeight = calculateInputHeight(labelHeight, height, minInputHeight);
  const topPosition = calculateLabelTopPosition(labelHeight, inputHeight, LABEL_PADDING_TOP);

  if (height && typeof height !== 'number') {
    // eslint-disable-next-line
    console.warn('Currently we support only numbers in height prop');
  }

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: LABEL_PADDING_TOP,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    lineHeight,
    label,
    scale: fontScale,
    isAndroid: Platform.OS === 'android',
    styles: StyleSheet.flatten(dense ? styles.inputOutlinedDense : styles.inputOutlined)
  };
  const pad = calculatePadding(paddingSettings);
  const paddingOut = adjustPaddingOut({ ...paddingSettings,
    pad
  });
  const baseLabelTranslateY = -labelHalfHeight - (topPosition + OUTLINE_MINIMIZED_LABEL_Y_OFFSET);
  const placeholderOpacity = hasActiveOutline ? interpolatePlaceholder(parentState.labeled, hasActiveOutline) : parentState.labelLayout.measured ? 1 : 0;
  const labelProps = {
    label,
    onLayoutAnimatedText,
    placeholderOpacity,
    error,
    placeholderStyle: styles.placeholder,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    fontWeight,
    labelScale,
    wiggleOffsetX: LABEL_WIGGLE_X_OFFSET,
    topPosition,
    hasActiveOutline,
    activeColor,
    placeholderColor,
    backgroundColor: backgroundColor,
    errorColor,
    labelTranslationXOffset,
    roundness: theme.roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  };
  const minHeight = height || (dense ? MIN_DENSE_HEIGHT : MIN_HEIGHT);
  const {
    leftLayout,
    rightLayout
  } = parentState;
  const leftAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: minHeight,
    affixHeight: leftLayout.height || 0,
    labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const rightAffixTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: minHeight,
    affixHeight: rightLayout.height || 0,
    labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const iconTopPosition = calculateOutlinedIconAndAffixTopPosition({
    height: minHeight,
    affixHeight: ADORNMENT_SIZE,
    labelYOffset: -OUTLINE_MINIMIZED_LABEL_Y_OFFSET
  });
  const rightAffixWidth = right ? rightLayout.width || ADORNMENT_SIZE : ADORNMENT_SIZE;
  const leftAffixWidth = left ? leftLayout.width || ADORNMENT_SIZE : ADORNMENT_SIZE;
  const adornmentStyleAdjustmentForNativeInput = getAdornmentStyleAdjustmentForNativeInput({
    adornmentConfig,
    rightAffixWidth,
    leftAffixWidth,
    mode: 'outlined'
  });
  const affixTopPosition = {
    [AdornmentSide.Left]: leftAffixTopPosition,
    [AdornmentSide.Right]: rightAffixTopPosition
  };
  const onAffixChange = {
    [AdornmentSide.Left]: onLeftAffixLayoutChange,
    [AdornmentSide.Right]: onRightAffixLayoutChange
  };
  let adornmentProps = {
    adornmentConfig,
    forceFocus,
    topPosition: {
      [AdornmentType.Icon]: iconTopPosition,
      [AdornmentType.Affix]: affixTopPosition
    },
    onAffixChange,
    isTextInputFocused: parentState.focused,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  };

  if (adornmentConfig.length) {
    adornmentProps = { ...adornmentProps,
      left,
      right,
      textStyle: { ...font,
        fontSize,
        fontWeight
      },
      visible: parentState.labeled
    };
  }

  return /*#__PURE__*/React.createElement(View, {
    style: viewStyle
  }, /*#__PURE__*/React.createElement(Outline, {
    theme: theme,
    hasActiveOutline: hasActiveOutline,
    focused: parentState.focused,
    activeColor: activeColor,
    outlineColor: outlineColor,
    backgroundColor: backgroundColor
  }), /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.labelContainer, {
      paddingTop: LABEL_PADDING_TOP,
      minHeight
    }]
  }, /*#__PURE__*/React.createElement(InputLabel, {
    parentState: parentState,
    labelProps: labelProps,
    labelBackground: LabelBackground,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  }), render === null || render === void 0 ? void 0 : render({
    testID: 'text-input-outlined',
    ...rest,
    ref: innerRef,
    onChangeText,
    placeholder: label ? parentState.placeholder : rest.placeholder,
    placeholderTextColor: placeholderTextColor || placeholderColor,
    editable: !disabled && editable,
    selectionColor: typeof selectionColor === 'undefined' ? activeColor : selectionColor,
    onFocus,
    onBlur,
    underlineColorAndroid: 'transparent',
    multiline,
    style: [styles.input, !multiline || multiline && height ? {
      height: inputHeight
    } : {}, paddingOut, { ...font,
      fontSize,
      fontWeight,
      fontVariant,
      color: inputTextColor,
      textAlignVertical: multiline ? 'top' : 'center',
      textAlign: textAlign ? textAlign : I18nManager.isRTL ? 'right' : 'left'
    }, Platform.OS === 'web' && {
      outline: 'none'
    }, adornmentStyleAdjustmentForNativeInput]
  })), /*#__PURE__*/React.createElement(TextInputAdornment, adornmentProps)));
};

export default TextInputOutlined;

const Outline = _ref3 => {
  let {
    theme,
    hasActiveOutline,
    activeColor,
    outlineColor,
    focused,
    backgroundColor
  } = _ref3;
  return /*#__PURE__*/React.createElement(View, {
    testID: "text-input-outline",
    pointerEvents: "none",
    style: [styles.outline, // eslint-disable-next-line react-native/no-inline-styles
    {
      backgroundColor,
      borderRadius: theme.roundness,
      borderWidth: focused ? 2 : 1,
      borderColor: hasActiveOutline ? activeColor : outlineColor
    }]
  });
};

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL
  },
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0
  },
  labelContainer: {
    paddingBottom: 0
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
    margin: 0,
    zIndex: 1
  },
  inputOutlined: {
    paddingTop: 8,
    paddingBottom: 8
  },
  inputOutlinedDense: {
    paddingTop: 4,
    paddingBottom: 4
  }
});
//# sourceMappingURL=TextInputOutlined.js.map