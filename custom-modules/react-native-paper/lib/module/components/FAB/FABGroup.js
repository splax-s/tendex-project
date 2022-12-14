import * as React from 'react';
import { StyleSheet, Animated, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import color from 'color';
import FAB from './FAB';
import Text from '../Typography/Text';
import Card from '../Card/Card';
import { withTheme } from '../../core/theming';

/**
 * A component to display a stack of FABs with related actions in a speed dial.
 * To render the group above other components, you'll need to wrap it with the [`Portal`](portal.html) component.
 *
 * <div class="screenshots">
 *   <img src="screenshots/fab-group.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { FAB, Portal, Provider } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [state, setState] = React.useState({ open: false });
 *
 *   const onStateChange = ({ open }) => setState({ open });
 *
 *   const { open } = state;
 *
 *   return (
 *     <Provider>
 *       <Portal>
 *         <FAB.Group
 *           open={open}
 *           icon={open ? 'calendar-today' : 'plus'}
 *           actions={[
 *             { icon: 'plus', onPress: () => console.log('Pressed add') },
 *             {
 *               icon: 'star',
 *               label: 'Star',
 *               onPress: () => console.log('Pressed star'),
 *             },
 *             {
 *               icon: 'email',
 *               label: 'Email',
 *               onPress: () => console.log('Pressed email'),
 *             },
 *             {
 *               icon: 'bell',
 *               label: 'Remind',
 *               onPress: () => console.log('Pressed notifications'),
 *               small: false,
 *             },
 *           ]}
 *           onStateChange={onStateChange}
 *           onPress={() => {
 *             if (open) {
 *               // do something if the speed dial is open
 *             }
 *           }}
 *         />
 *       </Portal>
 *     </Provider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const FABGroup = _ref => {
  let {
    actions,
    icon,
    open,
    onPress,
    accessibilityLabel,
    theme,
    style,
    fabStyle,
    visible,
    testID,
    onStateChange,
    color: colorProp,
    backdropColor
  } = _ref;
  const {
    current: backdrop
  } = React.useRef(new Animated.Value(0));
  const animations = React.useRef(actions.map(() => new Animated.Value(open ? 1 : 0)));
  const [prevActions, setPrevActions] = React.useState(null);
  const {
    scale
  } = theme.animation;
  React.useEffect(() => {
    if (open) {
      Animated.parallel([Animated.timing(backdrop, {
        toValue: 1,
        duration: 250 * scale,
        useNativeDriver: true
      }), Animated.stagger(50 * scale, animations.current.map(animation => Animated.timing(animation, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true
      })).reverse())]).start();
    } else {
      Animated.parallel([Animated.timing(backdrop, {
        toValue: 0,
        duration: 200 * scale,
        useNativeDriver: true
      }), ...animations.current.map(animation => Animated.timing(animation, {
        toValue: 0,
        duration: 150 * scale,
        useNativeDriver: true
      }))]).start();
    }
  }, [open, actions, backdrop, scale]);

  const close = () => onStateChange({
    open: false
  });

  const toggle = () => onStateChange({
    open: !open
  });

  const {
    colors
  } = theme;
  const labelColor = theme.dark ? colors.text : color(colors.text).fade(0.54).rgb().string();
  const backdropOpacity = open ? backdrop.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1]
  }) : backdrop;
  const opacities = animations.current;
  const scales = opacities.map(opacity => open ? opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  }) : 1);

  if (actions.length !== (prevActions === null || prevActions === void 0 ? void 0 : prevActions.length)) {
    animations.current = actions.map((_, i) => animations.current[i] || new Animated.Value(open ? 1 : 0));
    setPrevActions(actions);
  }

  return /*#__PURE__*/React.createElement(View, {
    pointerEvents: "box-none",
    style: [styles.container, style]
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: close
  }, /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: open ? 'auto' : 'none',
    style: [styles.backdrop, {
      opacity: backdropOpacity,
      backgroundColor: backdropColor || colors.backdrop
    }]
  })), /*#__PURE__*/React.createElement(SafeAreaView, {
    pointerEvents: "box-none",
    style: styles.safeArea
  }, /*#__PURE__*/React.createElement(View, {
    pointerEvents: open ? 'box-none' : 'none'
  }, actions.map((it, i) => {
    var _it$labelTextColor;

    return /*#__PURE__*/React.createElement(View, {
      key: i // eslint-disable-line react/no-array-index-key
      ,
      style: [styles.item, {
        marginHorizontal: typeof it.small === 'undefined' || it.small ? 24 : 16
      }],
      pointerEvents: open ? 'box-none' : 'none'
    }, it.label && /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Card, {
      style: [styles.label, {
        transform: [{
          scale: scales[i]
        }],
        opacity: opacities[i]
      }, it.labelStyle],
      onPress: () => {
        it.onPress();
        close();
      },
      accessibilityLabel: it.accessibilityLabel !== 'undefined' ? it.accessibilityLabel : it.label // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      ,
      accessibilityTraits: "button",
      accessibilityComponentType: "button",
      accessibilityRole: "button"
    }, /*#__PURE__*/React.createElement(Text, {
      style: {
        color: (_it$labelTextColor = it.labelTextColor) !== null && _it$labelTextColor !== void 0 ? _it$labelTextColor : labelColor
      }
    }, it.label))), /*#__PURE__*/React.createElement(FAB, {
      small: typeof it.small !== 'undefined' ? it.small : true,
      icon: it.icon,
      color: it.color,
      style: [{
        transform: [{
          scale: scales[i]
        }],
        opacity: opacities[i],
        backgroundColor: theme.colors.surface
      }, it.style],
      onPress: () => {
        it.onPress();
        close();
      },
      accessibilityLabel: typeof it.accessibilityLabel !== 'undefined' ? it.accessibilityLabel : it.label // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      ,
      accessibilityTraits: "button",
      accessibilityComponentType: "button",
      accessibilityRole: "button",
      testID: it.testID,
      visible: open
    }));
  })), /*#__PURE__*/React.createElement(FAB, {
    onPress: () => {
      onPress === null || onPress === void 0 ? void 0 : onPress();
      toggle();
    },
    icon: icon,
    color: colorProp,
    accessibilityLabel: accessibilityLabel // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
    ,
    accessibilityTraits: "button",
    accessibilityComponentType: "button",
    accessibilityRole: "button",
    accessibilityState: {
      expanded: open
    },
    style: [styles.fab, fabStyle],
    visible: visible,
    testID: testID
  })));
};

FABGroup.displayName = 'FAB.Group';
export default withTheme(FABGroup); // @component-docs ignore-next-line

const FABGroupWithTheme = withTheme(FABGroup); // @component-docs ignore-next-line

export { FABGroupWithTheme as FABGroup };
const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'flex-end'
  },
  container: { ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  fab: {
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 0
  },
  backdrop: { ...StyleSheet.absoluteFillObject
  },
  label: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2
  },
  item: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
//# sourceMappingURL=FABGroup.js.map