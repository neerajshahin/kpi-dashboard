/**
 * Export sub-modules so they can be imported from the dir path.
 */
export { FooterComponent } from './footer';
export { HeaderComponent } from './header';

/**
 * @type {Array} Export array of modules.
 */
export const UI_COMPONENTS = [
  exports.FooterComponent,
  exports.HeaderComponent
];

/**
 * _Explicitly_ export and declare the module.
 */
export module UIComponentsModule {
  // Export sub-modules as properties of this module.
  export const FooterComponent = exports.FooterComponent;
  export const HeaderComponent = exports.HeaderComponent;
}

/**
 * _Implicitly_ export the module.
 */
export default UIComponentsModule;
