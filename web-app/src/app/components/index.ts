/**
 * Export sub-modules so they can be imported from the dir path.
 */
import * as uiComponents from './ui';

/**
 * @type {Array} Export array of modules.
 */
export const COMPONENTS = [].concat(
  uiComponents.UI_COMPONENTS
);

/**
 * _Explicitly_ export and declare the module.
 */
export module ComponentsModule {
  // Export sub-modules as properties of this module.
  export const ui = uiComponents;
}

/**
 * _Implicitly_ export the module.
 */
export default ComponentsModule;
